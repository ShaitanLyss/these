use std::{io, pin::Pin, string::FromUtf8Error, sync::LazyLock};
use tokio::process::Command;

use regex::Regex;
use thiserror::Error;

pub type BoxFuture<'a, T> = Pin<Box<dyn Future<Output = T> + Send + 'a>>;

static SHELL_COMMAND_EXPANSION_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"(.*?)\$\((.*?)\)").unwrap());

#[derive(Error, Debug)]
pub enum ExpandCommandError {
    #[error("failed to execute subcommand")]
    ExecutionFailed(#[from] io::Error),
    #[error("failed to read subcommand output as utf8")]
    OutputFailed(#[from] FromUtf8Error),
}

pub async fn expand_command(cmd: &str) -> Result<String, ExpandCommandError> {
    let mut new = String::with_capacity(cmd.len());
    let mut last = 0;

    for captures in SHELL_COMMAND_EXPANSION_RE.captures_iter(cmd) {
        new.push_str(&captures[1]);
        let sub_command = &captures[2];
        let output = Command::new("sh")
            .arg("-c")
            .arg(sub_command)
            .output()
            .await?;

        let res = String::from_utf8(output.stdout)?;
        new.push_str(res.trim());

        last = captures.get(0).unwrap().end();
    }

    new.push_str(&cmd[last..]);
    Ok(new)
}
