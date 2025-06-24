use anyhow::Result;
use clap::Parser;
use entity::job::JobScheduler;
use hecate::InputSchema;
use log::{LevelFilter, info};

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    /// Host to create the job on
    #[arg(long)]
    host: Option<String>,
}

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::builder()
        .filter_module("create_job", LevelFilter::Debug)
        .filter_module("hecate_mcp_server", LevelFilter::Debug)
        .init();

    let args = Cli::try_parse()?;
    let mcp = hecate_mcp_server::HecateSimulator::new().await?;

    let resp = mcp
        .create_job(
            "example_job".into(),
            InputSchema::from_yaml(include_str!(
                "../../hecate/input-schemas/wave-eq.hecate.yml"
            ))?,
            args.host,
            Some(JobScheduler::Oarsub),
            None,
            None,
            None,
        )
        .await?;

    info!("response: {:?}", resp.content);

    loop {}
}
