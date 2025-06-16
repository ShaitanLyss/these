use rmcp::{model::CallToolResult, tool, transport, Error, ServiceExt};

#[derive(Clone)]
struct WeatherHandler;

#[tool(tool_box)]
impl WeatherHandler {
    #[tool(description = "Get the current weather")]
    fn get_weather() -> Result<CallToolResult, Error> {
        todo!()
    }
}

#[tool(tool_box)]
impl rmcp::ServerHandler for WeatherHandler {

}

pub async fn serve() -> anyhow::Result<()> {
    let service = WeatherHandler.serve(transport::stdio()).await.inspect_err(|e| {
        println!("Error starting server: {e}");
    })?;
    service.waiting().await?;

    Ok(())
    
}
