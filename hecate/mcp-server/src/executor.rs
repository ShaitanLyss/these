use log::{debug, info};
use regex::Regex;
use russh::{
    ChannelMsg,
    client::{self},
    keys::PrivateKeyWithHashAlg,
};
use std::{
    io,
    path::Path,
    string::FromUtf8Error,
    sync::{LazyLock, mpsc::channel},
};
use tokio::process::Command;

use thiserror::Error;

use std::error::Error as StdError;

#[derive(Error, Debug)]
pub enum ExecutorError<E: StdError> {
    #[error("failed to execute command")]
    ExecuteFailed(#[source] E),
    #[error("failed to create command executor")]
    CreationFailed(#[source] E),
    #[error("empty command")]
    EmptyCommand,
    #[error("command returned non-zero exit code: {0} {1}")]
    NonZeroExitCode(u32, String),
    #[error("command returned no response")]
    NoResponse(String),
    #[error("failed to write file")]
    FileWriteFailed(#[source] E),
    #[error("failed to create directory")]
    MkdirsFailed(#[source] E),
}

pub trait Executor {
    type Error: StdError;
    async fn mkdirs<D: AsRef<Path>>(&self, dir: D) -> Result<(), ExecutorError<Self::Error>>;
    async fn execute(&self, cmd: &str) -> Result<String, ExecutorError<Self::Error>>;

    async fn write_file<F: AsRef<Path>>(
        &self,
        file: F,
        content: &str,
    ) -> Result<(), ExecutorError<Self::Error>>;
}

pub struct LocalExecutor;

impl LocalExecutor {
    pub fn new() -> Self {
        Self
    }
}

impl Executor for LocalExecutor {
    type Error = io::Error;

    async fn execute(&self, cmd: &str) -> Result<String, ExecutorError<Self::Error>> {
        let mut args = cmd.trim().split_whitespace();
        let cmd = args.next().ok_or(ExecutorError::EmptyCommand)?;
        let mut cmd = Command::new(cmd);
        cmd.args(args);

        let output = cmd
            .output()
            .await
            .map_err(|e| ExecutorError::ExecuteFailed(e))?;
        let stdout = String::from_utf8_lossy(&output.stdout);
        Ok(stdout.to_string())
    }

    async fn write_file<F: AsRef<Path>>(
        &self,
        file: F,
        content: &str,
    ) -> Result<(), ExecutorError<Self::Error>> {
        std::fs::write(&file, content).map_err(|e| ExecutorError::FileWriteFailed(e))?;
        debug!("wrote local file {}", file.as_ref().display());
        Ok(())
    }

    async fn mkdirs<D: AsRef<Path>>(&self, dir: D) -> Result<(), ExecutorError<Self::Error>> {
        std::fs::create_dir_all(dir).map_err(|e| ExecutorError::MkdirsFailed(e.into()))
    }
}

struct SshClient {}

impl russh::client::Handler for SshClient {
    type Error = russh::Error;

    async fn check_server_key(
        &mut self,
        _server_public_key: &russh::keys::ssh_key::PublicKey,
    ) -> Result<bool, Self::Error> {
        Ok(true)
    }
}

pub struct SshExecutor {
    session: russh::client::Handle<SshClient>,
}

#[derive(Error, Debug)]
pub enum SshExecutorError {
    #[error("failed to create stream")]
    StreamCreationFailed(#[source] io::Error),
    #[error("failed to connect via ssh")]
    ConnectionFailed(#[source] russh::Error),
    #[error("failed to read config")]
    ConfigParsingFailed(#[source] russh_config::Error),
    #[error("empty proxy command")]
    EmptyProxyCommand,
    #[error("failed to expand command")]
    CommandExpansionFailed(#[from] ExpandCommandError),
    #[error("ssh error")]
    SshError(#[from] russh::Error),
    #[error("failed to load private key at: {0}")]
    PrivateKeyLoadingError(String, #[source] russh::keys::Error),
    #[error("io error")]
    IoError(#[from] io::Error),
    #[error("test command failed")]
    TestCommandFailed,
}

use SshExecutorError::*;
// use russh::cipher;
// const CIPHER_ORDER: &[cipher::Name] = &[];

impl SshExecutor {
    pub async fn new(host: &str) -> Result<Self, SshExecutorError> {
        let key_path = shellexpand::full("~/.ssh/id_rsa").unwrap().to_string();
        let private_key = russh::keys::load_secret_key(&key_path, None)
            .map_err(|e| PrivateKeyLoadingError(key_path, e))?;

        let ssh_config =
            russh_config::parse_home(host).map_err(|e| SshExecutorError::ConfigParsingFailed(e))?;
        debug!("found ssh config : {ssh_config:#?}");

        let stream = match &ssh_config.proxy_command {
            Some(proxy_command) => {
                let proxy_command = proxy_command.trim();
                if proxy_command.is_empty() {
                    return Err(SshExecutorError::EmptyProxyCommand);
                }
                let proxy_command = proxy_command
                    .replace("%h", host)
                    .replace("%p", &ssh_config.port.to_string());
                let proxy_command = expand_command(&proxy_command).await?.replace("\"", "");
                debug!("Proxy Command: {proxy_command}");
                let pieces: Vec<_> = proxy_command.split(" ").collect();
                let cmd = pieces[0];
                let args = &pieces[1..];
                russh_config::Stream::proxy_command(cmd, args)
                    .await
                    .map_err(|e| SshExecutorError::StreamCreationFailed(e))?
            }
            None => todo!(),
        };

        let config = client::Config {
            preferred: russh::Preferred {
                // kex: (),
                // key: (),
                // cipher: CIPHER_ORDER.into(),
                // mac: (),
                // compression: (),
                ..Default::default()
            },
            ..Default::default()
        };
        let sh = SshClient {};
        let mut session = client::connect_stream(config.into(), stream, sh)
            .await
            .map_err(|e| SshExecutorError::ConnectionFailed(e))?;
        // Authenticate public key
        session
            .authenticate_publickey(
                ssh_config.user,
                PrivateKeyWithHashAlg::new(
                    private_key.into(),
                    session.best_supported_rsa_hash().await?.flatten(),
                ),
            )
            .await?;

        debug!("running test command");
        let mut channel = session.channel_open_session().await?;
        channel.exec(true, "whoami").await?;
        let mut code = None;
        let mut user = String::new();
        // Receive response
        loop {
            // There's an event available on the session channel
            let Some(msg) = channel.wait().await else {
                break;
            };
            match msg {
                // Write data to the terminal
                ChannelMsg::Data { ref data } => {
                    user = String::from_utf8_lossy(data).into();
                }
                // The command has returned an exit code
                ChannelMsg::ExitStatus { exit_status } => {
                    code = Some(exit_status);
                    // cannot leave the loop immediately, there might still be more data to receive
                }
                _ => {}
            }
        }

        match code {
            Some(code) if code == 0 => {
                debug!("test command succeeded");
                info!("connected to {host} as {user}");
                Ok(Self { session })
            }
            _ => Err(TestCommandFailed),
        }
    }
}

impl Executor for SshExecutor {
    type Error = SshExecutorError;

    async fn mkdirs<D: AsRef<Path>>(&self, dir: D) -> Result<(), ExecutorError<Self::Error>> {
        self.execute(&format!("mkdir -p {}", dir.as_ref().display()))
            .await?;
        Ok(())
    }

    async fn execute(&self, cmd: &str) -> Result<String, ExecutorError<SshExecutorError>> {
        let mut channel = self
            .session
            .channel_open_session()
            .await
            .map_err(|e| ExecutorError::ExecuteFailed(e.into()))?;
        debug!(
            "running command: {}",
            if cmd.starts_with("echo") {
                "echo [..]"
            } else {
                cmd
            }
        );
        channel
            .exec(true, cmd)
            .await
            .map_err(|e| ExecutorError::ExecuteFailed(e.into()))?;
        let mut code = None;
        let mut res = String::new();
        // Receive response
        loop {
            // There's an event available on the session channel
            let Some(msg) = channel.wait().await else {
                break;
            };
            match msg {
                // Write data to the terminal
                ChannelMsg::Data { ref data } => {
                    let data = String::from_utf8_lossy(data);
                    res.push_str(&data);
                    debug!("received data: {data}");
                }
                // The command has returned an exit code
                ChannelMsg::ExitStatus { exit_status } => {
                    code = Some(exit_status);
                    debug!("exit status: {exit_status}");
                    // cannot leave the loop immediately, there might still be more data to receive
                }
                _ => {}
            }
        }

        match code {
            Some(code) if code == 0 => Ok(res),
            Some(code) => Err(ExecutorError::NonZeroExitCode(code, cmd.to_string())),
            _ => Err(ExecutorError::NoResponse(cmd.to_string())),
        }
    }

    async fn write_file<F: AsRef<Path>>(
        &self,
        file: F,
        content: &str,
    ) -> Result<(), ExecutorError<Self::Error>> {
        let escaped_content = content.replace("\'", "\\\'");
        self.execute(&format!(
            "echo -n '{escaped_content}' > {}",
            file.as_ref().display()
        ))
        .await?;
        Ok(())
    }
}

static SHELL_COMMAND_EXPANSION_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"(.*?)\$\((.*?)\)").unwrap());

#[derive(Error, Debug)]
pub enum ExpandCommandError {
    #[error("failed to execute subcommand")]
    ExecutionFailed(#[from] io::Error),
    #[error("failed to read subcommand output as utf8")]
    OutputFailed(#[from] FromUtf8Error),
}

async fn expand_command(cmd: &str) -> Result<String, ExpandCommandError> {
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
