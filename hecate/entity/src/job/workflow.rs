use std::path::PathBuf;

use hecate_executor::ExecutorError;
use log::{debug, error, info};
use sea_orm::{ActiveModelTrait, ActiveValue::Set, DbConn, EntityTrait, IntoActiveModel};
use thiserror::Error;

use crate::{
    Job, JobError,
    job::{self, JobStatus, scheduler::SchedulerJobConfig},
};

#[derive(Debug, Error)]
pub enum RunJobError {
    #[error("failed to compile job: {0}")]
    CompilationFailed(ExecutorError),
    #[error("failed to execute job: {0}")]
    ExecutorError(#[from] ExecutorError),
    #[error("unsupported project type : {0}")]
    UnsupportedProjectType(String),
    #[error("failed to get remote id")]
    MissingRemoteId,
    #[error("failed to update job in database")]
    DatabaseError(#[from] sea_orm::DbErr),
}

impl super::Model {
    pub async fn cancel_job(&self) {}

    pub async fn update_status(self, db: &DbConn) -> Result<super::Model, JobError> {
        let status = self.status;

        let new_status = match &self.scheduler {
            Some(scheduler) => {
                if self.remote_job_id.is_none() {
                    return Err(JobError::InvalidJobConfig(
                        "scheduler job id missing in database for scheduler job".into(),
                    ));
                }
                let remote_job_id = self.remote_job_id.as_ref().unwrap();

                let executor = self.executor().await?;
                let status_cmd = scheduler.job_status_cmd(remote_job_id);
                let response = executor.execute(&status_cmd).await?;
                scheduler
                    .parse_job_status(&response)
                    .ok_or_else(|| JobError::ParsingStatusFailed(response))?
            }
            None => status,
        };

        let job = if new_status != status {
            let mut job = self.into_active_model();
            job.status = Set(new_status);
            let job = job.update(db).await?;
            job
        } else {
            self
        };

        Ok(job)
    }

    pub async fn update_job_status(job_id: i64, db: &DbConn) -> Result<Self, JobError> {
        let job = Job::find_by_id(job_id)
            .one(db)
            .await?
            .ok_or_else(|| JobError::JobNotFound(job_id))?;
        job.update_status(db).await
    }

    pub async fn run(self, db: &DbConn) -> Result<Self, JobError> {
        let job = self;
        if job.cmakelists.is_none() {
            error!("missing cmakelists, aborting");
            Err(RunJobError::UnsupportedProjectType(
                "Not a cmake project".to_string(),
            ))?;
        }
        let cmakelists = job.cmakelists.as_deref().unwrap();

        // executor.execute("touch duckies").await?;
        // info!("duckies have appeared");
        let name = whoami::username();
        let job_name = &job.name;
        let job_id = job.id;

        let job_dir = String::from(format!("hecate/{name}/{job_id}#{job_name}"));
        let sources_dir = format!("~/{job_dir}");
        let results_dir = format!("{sources_dir}/results");
        let executor = job.executor().await?;

        info!("creating sources and results dir: {results_dir:?}");
        executor.mkdirs(&results_dir).await?;

        info!("writing source code");
        executor
            .write_file(
                &format!(
                    "{sources_dir}/{}",
                    job.code_filename.as_deref().unwrap_or_else(|| "main.cpp")
                ),
                &job.code,
            )
            .await?;

        info!("writing cmakelists");
        executor
            .write_file(&format!("{sources_dir}/CMakeLists.txt"), &cmakelists)
            .await?;

        let compiler = job.compiler.as_deref().unwrap_or_else(|| "g++");
        let build_dir = PathBuf::from("/tmp").join(&job_dir).join("build");
        let cmake_cmd = format!(
            "cmake -DCMAKE_CXX_COMPILER={compiler} -B {} {}",
            build_dir.display(),
            sources_dir
        );
        debug!("cmake command: {cmake_cmd}");

        let build_dir = build_dir.display();
        let mut final_command = format!(
            "source ~/.bashrc && {cmake_cmd} && cmake --build {build_dir} && OMP_PROC_BIND=spread OMP_PLACES=threads {build_dir}/run_sim"
        );

        if let Some(scheduler) = &job.scheduler {
            final_command = scheduler.create_job_cmd(SchedulerJobConfig {
                dir: Some(&results_dir),
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

        let mut job = job.into_active_model();

        job.status = Set(JobStatus::Queued);
        job.remote_job_id = Set(remote_id_opt);
        let job = job.update(db).await?;

        Ok(job)
    }
}
pub async fn update_job_status(job_id: i64, db: &DbConn) -> Result<job::Model, JobError> {
    let job = Job::find_by_id(job_id)
        .one(db)
        .await?
        .ok_or_else(|| JobError::JobNotFound(job_id))?;
    job.update_status(db).await
}
