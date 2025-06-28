use anyhow::Result;
use log::LevelFilter;

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::builder()
        .filter_level(log::LevelFilter::Info)
        .filter_module("sqlx", LevelFilter::Warn)
        .parse_default_env()
        .init();
    hecate_mcp_server::serve().await?;
    Ok(())
}
