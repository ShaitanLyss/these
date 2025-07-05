mod local_executor;
mod ssh_executor;
mod utils;

pub type BoxExecutor = Box<dyn Executor + 'static + Send>;
use local_executor::LocalExecutor;
use ssh_executor::SshExecutor;

use std::error::Error as StdError;

pub type BoxError = Box<dyn StdError + Send + Sync + 'static>;

use thiserror::Error;

pub enum ExecutorConfig<'a> {
    Local,
    Ssh { host: &'a str },
}

impl ExecutorConfig<'_> {
    pub async fn into_executor(&self) -> Result<BoxExecutor, ExecutorError> {
        create_executor(self).await
    }
}

#[derive(Error, Debug)]
pub enum ExecutorError {
    #[error("failed to execute command")]
    ExecuteFailed(#[source] BoxError),
    #[error("failed to create command executor")]
    CreationFailed(#[source] BoxError),
    #[error("empty command")]
    EmptyCommand,
    #[error("command returned non-zero exit code: {0} {1}")]
    NonZeroExitCode(u32, String),
    #[error("command returned no response")]
    NoResponse(String),
    #[error("failed to write file")]
    FileWriteFailed(#[source] BoxError),
    #[error("failed to create directory")]
    MkdirsFailed(#[source] BoxError),
}

use ExecutorError::*;

use crate::utils::BoxFuture;

pub trait Executor {
    fn execute<'a>(&'a self, cmd: &'a str) -> BoxFuture<'a, Result<String, ExecutorError>>;

    fn mkdirs<'a>(&'a self, path: &'a str) -> BoxFuture<'a, Result<(), ExecutorError>>;

    fn write_file<'a>(
        &'a self,
        path: &'a str,
        content: &'a str,
    ) -> BoxFuture<'a, Result<(), ExecutorError>>;
}

pub async fn create_executor<'a>(
    config: &ExecutorConfig<'a>,
) -> Result<BoxExecutor, ExecutorError> {
    Ok(match config {
        ExecutorConfig::Local => Box::new(LocalExecutor),
        ExecutorConfig::Ssh { host } => Box::new(
            SshExecutor::new(host)
                .await
                .map_err(|e| CreationFailed(Box::new(e)))?,
        ),
    })
}
