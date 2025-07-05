use log::{debug, error};
use tokio::process::Command;

use crate::{Executor, ExecutorError, utils::BoxFuture};

pub struct LocalExecutor;

use ExecutorError::*;

impl Executor for LocalExecutor {
    fn execute<'a>(&'a self, cmd: &'a str) -> BoxFuture<'a, Result<String, ExecutorError>> {
        Box::pin(async {
            let mut args = cmd.trim().split_whitespace();
            let cmd = args.next().ok_or(ExecutorError::EmptyCommand)?;
            let mut cmd = Command::new(cmd);
            cmd.args(args);

            let output = cmd.output().await.map_err(|e| ExecuteFailed(Box::new(e)))?;
            let stdout = String::from_utf8_lossy(&output.stdout);
            Ok(stdout.to_string())
        })
    }

    fn mkdirs<'a>(&'a self, path: &'a str) -> BoxFuture<'a, Result<(), ExecutorError>> {
        Box::pin(async move {
            async_fs::create_dir_all(path)
                .await
                .map_err(|e| ExecutorError::MkdirsFailed(e.into()))
        })
    }

    fn write_file<'a>(
        &'a self,
        path: &'a str,
        content: &'a str,
    ) -> BoxFuture<'a, Result<(), ExecutorError>> {
        Box::pin(async move {
            async_fs::write(path, content)
                .await
                .inspect(|()| debug!("wrote local file {path}"))
                .inspect_err(|e| error!("failed to write local file {path}: {e}"))
                .map_err(|e| ExecutorError::FileWriteFailed(Box::new(e)))
        })
    }

    // async fn write_file<F: AsRef<Path>>(
    //     &self,
    //     file: F,
    //     content: &str,
    // ) -> Result<(), ExecutorError<Self::Error>> {
    //     std::fs::write(&file, content).map_err(|e| ExecutorError::FileWriteFailed(e))?;
    //     debug!("wrote local file {}", file.as_ref().display());
    //     Ok(())
    // }
    //
}
