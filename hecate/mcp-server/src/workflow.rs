use std::path::PathBuf;

use entity::job::{self, JobStatus};
use log::{debug, error, info};
use sea_orm::ActiveModelTrait;
use sea_orm::ActiveValue::Set;
use sea_orm::DatabaseConnection;

use crate::executor::{Executor, ExecutorError};
use crate::scheduler::{Scheduler, SchedulerJobConfig};
use crate::StdError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum RunJobError<E: StdError> {
    #[error("failed to compile job: {0}")]
    CompilationFailed(E),
    #[error("failed to execute job: {0}")]
    ExecutorError(#[from] ExecutorError<E>),
    #[error("unsupported project type : {0}")]
    UnsupportedProjectType(String),
    #[error("failed to get remote id")]
    MissingRemoteId,
    #[error("failed to update job in database")]
    DatabaseError(#[from] sea_orm::DbErr),
}

impl<E: StdError + Sync + Send + 'static> From<RunJobError<E>> for rmcp::Error {
    fn from(value: RunJobError<E>) -> Self {
        let err = anyhow::Error::new(value);
        rmcp::Error::internal_error(format!("failed to run job: {err}"), None)
    }
}

pub async fn run_job<Exec: Executor>(
    job: job::Model,
    db: DatabaseConnection,
    executor: Exec,
) -> Result<(), RunJobError<Exec::Error>> {
    if job.cmakelists.is_none() {
        error!("missing cmakelists, aborting");
        return Err(RunJobError::UnsupportedProjectType(
            "Not a cmake project".to_string(),
        ));
    }
    let cmakelists = job.cmakelists.as_deref().unwrap();

    // executor.execute("touch duckies").await?;
    // info!("duckies have appeared");
    let name = whoami::username();
    let job_name = &job.name;
    let job_id = job.id;

    let job_dir = PathBuf::from(format!("hecate/{name}/{job_id}#{job_name}"));
    let sources_dir = PathBuf::from("~").join(&job_dir);
    let results_dir = sources_dir.join("results");

    info!("creating sources and results dir: {results_dir:?}");
    executor.mkdirs(&results_dir).await?;

    info!("writing source code");
    executor
        .write_file(
            sources_dir.join(job.code_filename.as_deref().unwrap_or_else(|| "main.cpp")),
            &job.code,
        )
        .await?;

    info!("writing cmakelists");
    executor
        .write_file(sources_dir.join("CMakeLists.txt"), &cmakelists)
        .await?;

    let compiler = job.compiler.as_deref().unwrap_or_else(|| "g++");
    let build_dir = PathBuf::from("/tmp").join(&job_dir).join("build");
    let cmake_cmd = format!(
        "cmake -DCMAKE_CXX_COMPILER={compiler} -B {} {}",
        build_dir.display(),
        sources_dir.display()
    );
    debug!("cmake command: {cmake_cmd}");

    let build_dir = build_dir.display();
    let mut final_command = format!(
        "source ~/.bashrc && {cmake_cmd} && cmake --build {build_dir} && OMP_PROC_BIND=spread OMP_PLACES=threads {build_dir}/run_sim"
    );

    if let Some(scheduler) = &job.scheduler {
        final_command = scheduler.create_job_cmd(SchedulerJobConfig {
            dir: Some(&results_dir.to_string_lossy()),
            name: Some(&format!("{job_id}#{}", &job.name)),
            queue: job.queue.as_deref(),
            cluster: job.cluster.as_deref(),
            num_nodes: job.num_nodes,
            walltime: job.walltime.as_deref(),
            command: &final_command,
        });
    }

    let response = executor.execute(&final_command).await?;
    let mut remote_id_opt: Option<String> = None;

    if let Some(scheduler) = &job.scheduler {
        let remote_id = scheduler
            .parse_job_id(&response)
            .ok_or_else(|| RunJobError::MissingRemoteId)?;
        info!("remote job id: {remote_id}");
        remote_id_opt = Some(remote_id);
    }

    let mut job: job::ActiveModel = job.into();

    job.status = Set(JobStatus::Queued);
    job.remote_job_id = Set(remote_id_opt);

    job.update(&db).await?;

    Ok(())
}
