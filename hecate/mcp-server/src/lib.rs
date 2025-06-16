use std::sync::{Arc, Mutex};

use hecate::{IndexMap, codegen::input_schema::InputSchema};
use rmcp::{
    Error, ServiceExt,
    model::{CallToolResult, Content, ServerCapabilities, ServerInfo},
    tool, transport,
};
use serde::Serialize;

trait ToJson {
    fn to_json(&self) -> String;
}

impl<T: Serialize> ToJson for T {
    fn to_json(&self) -> String {
        serde_json::to_string(self).expect("serializable object")
    }
}

#[derive(Clone, Serialize)]
struct Job {}

impl Job {
    fn new() -> Self {
        Self {}
    }
}

#[derive(Clone)]
struct HecateSimulator {
    sim_jobs: Arc<Mutex<IndexMap<String, Job>>>,
}

#[tool(tool_box)]
impl HecateSimulator {
    fn new() -> Self {
        HecateSimulator {
            sim_jobs: Mutex::new(IndexMap::new()).into(),
        }
    }
    #[tool(description = "Get the current weather")]
    fn get_weather() -> Result<CallToolResult, Error> {
        Ok(CallToolResult::success(vec![Content::text("Too hot")]))
    }

    #[tool(description = "Submit a new simulation job")]
    fn create_job(
        &self,
        #[tool(param)] job_id: String,
        #[tool(param)] schema: InputSchema,
    ) -> Result<CallToolResult, Error> {
        let mut sim_jobs = self.sim_jobs.lock().unwrap();
        if sim_jobs.contains_key(&job_id) {
            Err(Error::invalid_params(
                "job already exists",
                Some(job_id.into()),
            ))
        } else {
            let res =
                CallToolResult::success(vec![Content::text(format!("Job {job_id} created!"))]);
            sim_jobs.insert(job_id, Job::new());
            Ok(res)
        }
    }

    #[tool(description = "List simulation jobs")]
    fn list_sim_jobs(&self) -> Result<CallToolResult, Error> {
        let sim_jobs = self.sim_jobs.lock().unwrap();
        let job_ids = sim_jobs.keys().map(|s| Content::text(s)).collect();

        Ok(CallToolResult::success(job_ids))
    }

    #[tool(description = "Get information about a simulation job")]
    fn sim_job_info(&self, #[tool(param)] job_id: String) -> Result<CallToolResult, Error> {
        let sim_jobs = self.sim_jobs.lock().unwrap();
        let job = sim_jobs
            .get(&job_id)
            .ok_or_else(|| Error::invalid_params("invalid job id", Some(job_id.into())))?;

        Ok(CallToolResult::success(vec![Content::text(job.to_json())]))
    }
}

#[tool(tool_box)]
impl rmcp::ServerHandler for HecateSimulator {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            instructions: Some("Hecate Simulation Service".into()),
            capabilities: ServerCapabilities::builder().enable_tools().build(),
            ..Default::default()
        }
    }
}

pub async fn serve() -> anyhow::Result<()> {
    let service = HecateSimulator::new()
        .serve(transport::stdio())
        .await
        .inspect_err(|e| {
            println!("Error starting server: {e}");
        })?;
    service.waiting().await?;

    Ok(())
}
