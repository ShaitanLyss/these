use entity::job;
use log::{error, info};
use sea_orm::DatabaseConnection;

use crate::StdError;
use crate::executor::{Executor, ExecutorError};
use thiserror::Error;

#[derive(Debug, Error)]
pub enum RunJobError<E: StdError> {
    #[error("failed to compile job: {0}")]
    CompilationFailed(E),
    #[error("failed to execute job: {0}")]
    ExecutorError(#[from] ExecutorError<E>),
    #[error("unsupported project type : {0}")]
    UnsupportedProjectType(String),
}

impl<E: StdError + Sync + Send + 'static> From<RunJobError<E>> for rmcp::Error {
    fn from(value: RunJobError<E>) -> Self {
        let err = anyhow::Error::new(value);
        rmcp::Error::internal_error(format!("failed to run job: {err}"), None)
    }
}

pub async fn run_job<Exec: Executor>(
    job: job::Model,
    mut db: DatabaseConnection,
    executor: Exec,
) -> Result<(), RunJobError<Exec::Error>> {
    if job.cmakelists.is_none() {
        error!("missing cmakelists, aborting");
        return Err(RunJobError::UnsupportedProjectType(
            "Not a cmake project".to_string(),
        ));
    }
    executor.execute("touch duckies").await?;
    info!("duckies have appeared");

    executor.execute("oarsub -I").await?;
    Ok(())
}
