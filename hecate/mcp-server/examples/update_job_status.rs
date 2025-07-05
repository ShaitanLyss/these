use anyhow::Result;
use clap::Parser;
use hecate_entity::job;
use log::{LevelFilter, info};

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    job_id: i64,
}

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::builder()
        .filter_module("update_job_status", LevelFilter::Debug)
        .filter_module("hecate_mcp_server", LevelFilter::Debug)
        .init();

    let args = Cli::try_parse()?;
    let job_id = args.job_id;
    let mcp = hecate_mcp_server::HecateSimulator::new().await?;
    let db = mcp.db_connection();
    let status = job::workflow::update_job_status(job_id, &db).await?;
    info!("status: {status:?}");

    Ok(())
}
