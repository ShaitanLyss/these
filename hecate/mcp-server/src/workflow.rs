// use std::path::PathBuf;
//
// use entity::Job;
// use entity::job::{self, JobStatus};
// use log::{debug, error, info};
// use sea_orm::ActiveValue::Set;
// use sea_orm::DatabaseConnection;
// use sea_orm::{ActiveModelTrait, EntityTrait};
//
// use crate::executor::{Executor, ExecutorError};
// use crate::scheduler::{Scheduler, SchedulerJobConfig};
// use crate::{StdError, executor};
// use thiserror::Error;
//
// #[derive(Debug, Error)]
// pub enum RunJobError<E: StdError> {
//     #[error("failed to compile job: {0}")]
//     CompilationFailed(E),
//     #[error("failed to execute job: {0}")]
//     ExecutorError(#[from] ExecutorError<E>),
//     #[error("unsupported project type : {0}")]
//     UnsupportedProjectType(String),
//     #[error("failed to get remote id")]
//     MissingRemoteId,
//     #[error("failed to update job in database")]
//     DatabaseError(#[from] sea_orm::DbErr),
// }
//
// impl<E: StdError + Sync + Send + 'static> From<RunJobError<E>> for rmcp::Error {
//     fn from(value: RunJobError<E>) -> Self {
//         let err = anyhow::Error::new(value);
//         rmcp::Error::internal_error(format!("failed to run job: {err}"), None)
//     }
// }
//
// pub async fn run_job<Exec: Executor>(
//     job: job::Model,
//     db: DatabaseConnection,
//     executor: Exec,
// ) -> Result<(), RunJobError<Exec::Error>> {
//     if job.cmakelists.is_none() {
//         error!("missing cmakelists, aborting");
//         return Err(RunJobError::UnsupportedProjectType(
//             "Not a cmake project".to_string(),
//         ));
//     }
//     let cmakelists = job.cmakelists.as_deref().unwrap();
//
//     // executor.execute("touch duckies").await?;
//     // info!("duckies have appeared");
//     let name = whoami::username();
//     let job_name = &job.name;
//     let job_id = job.id;
//
//     let job_dir = PathBuf::from(format!("hecate/{name}/{job_id}#{job_name}"));
//     let sources_dir = PathBuf::from("~").join(&job_dir);
//     let results_dir = sources_dir.join("results");
//
//     info!("creating sources and results dir: {results_dir:?}");
//     executor.mkdirs(&results_dir).await?;
//
//     info!("writing source code");
//     executor
//         .write_file(
//             sources_dir.join(job.code_filename.as_deref().unwrap_or_else(|| "main.cpp")),
//             &job.code,
//         )
//         .await?;
//
//     info!("writing cmakelists");
//     executor
//         .write_file(sources_dir.join("CMakeLists.txt"), &cmakelists)
//         .await?;
//
//     let compiler = job.compiler.as_deref().unwrap_or_else(|| "g++");
//     let build_dir = PathBuf::from("/tmp").join(&job_dir).join("build");
//     let cmake_cmd = format!(
//         "cmake -DCMAKE_CXX_COMPILER={compiler} -B {} {}",
//         build_dir.display(),
//         sources_dir.display()
//     );
//     debug!("cmake command: {cmake_cmd}");
//
//     let build_dir = build_dir.display();
//     let mut final_command = format!(
//         "source ~/.bashrc && {cmake_cmd} && cmake --build {build_dir} && OMP_PROC_BIND=spread OMP_PLACES=threads {build_dir}/run_sim"
//     );
//
//     if let Some(scheduler) = &job.scheduler {
//         final_command = scheduler.create_job_cmd(SchedulerJobConfig {
//             dir: Some(&results_dir.to_string_lossy()),
//             name: Some(&format!("{job_id}#{}", &job.name)),
//             queue: job.queue.as_deref(),
//             cluster: job.cluster.as_deref(),
//             num_nodes: job.num_nodes,
//             walltime: job.walltime.as_deref(),
//             command: &final_command,
//         });
//     }
//
//     let response = executor.execute(&final_command).await?;
//     let mut remote_id_opt: Option<String> = None;
//
//     if let Some(scheduler) = &job.scheduler {
//         let remote_id = scheduler
//             .parse_job_id(&response)
//             .ok_or_else(|| RunJobError::MissingRemoteId)?;
//         info!("remote job id: {remote_id}");
//         remote_id_opt = Some(remote_id);
//     }
//
//     let mut job: job::ActiveModel = job.into();
//
//     job.status = Set(JobStatus::Queued);
//     job.remote_job_id = Set(remote_id_opt);
//
//     job.update(&db).await?;
//
//     Ok(())
// }
//
// #[derive(Debug, Error)]
// pub enum JobError {
//     #[error("job {0} not found")]
//     JobNotFound(i64),
//     #[error("invalid job config: {0}")]
//     InvalidJobConfig(String),
//     #[error("database error")]
//     DatabaseError(#[from] sea_orm::DbErr),
//     #[error("executor error: {0}")]
//     ExecutorError(String),
//     #[error("TODO")]
//     NotImplemented,
// }
//
// impl<E: StdError> From<ExecutorError<E>> for JobError {
//     fn from(value: ExecutorError<E>) -> Self {
//         JobError::ExecutorError(value.to_string())
//     }
// }
//
// pub async fn update_job_status(job_id: i64, db: DatabaseConnection) -> Result<JobStatus, JobError> {
//     let job = Job::find_by_id(job_id)
//         .one(&db)
//         .await?
//         .ok_or_else(|| JobError::JobNotFound(job_id))?;
//
//     let mut status = job.status;
//     let mut new_status: Option<JobStatus> = None;
//     let job::Model {
//         scheduler,
//         remote_job_id,
//         cluster_access_name,
//         ..
//     } = &job;
//     if let Some(cluster_access_name) = cluster_access_name {
//         if scheduler.is_none() || remote_job_id.is_none() {
//             return Err(JobError::InvalidJobConfig(
//                 "missing scheduler or remote_job_id for fetching job status".into(),
//             ));
//         }
//         let scheduler = scheduler.as_ref().unwrap();
//         let remote_job_id = remote_job_id.as_ref().unwrap();
//
//         let executor = executor::SshExecutor::new(cluster_access_name)
//             .await
//             .map_err(|e| ExecutorError::CreationFailed(e))?;
//         let status_cmd = scheduler.job_status_cmd(remote_job_id);
//         let response = executor.execute(&status_cmd).await?;
//         new_status = scheduler.parse_job_status(&response);
//     } else {
//         // let executor = executor::LocalExecutor::new();
//         return Err(JobError::NotImplemented);
//     }
//     if let Some(new_status) = new_status
//         && new_status != status
//     {
//         let mut job: job::ActiveModel = job.into();
//         job.status = Set(new_status);
//         job.update(&db).await?;
//         status = new_status;
//     }
//
//     Ok(status)
// }
