use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    hecate_mcp_server::serve().await?;
    Ok(())
}
