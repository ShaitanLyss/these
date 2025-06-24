use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::init();
    hecate_mcp_server::serve().await?;
    Ok(())
}
