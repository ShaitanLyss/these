use std::sync::{Arc, Mutex};

use hecate::{IndexMap, codegen::input_schema::InputSchema};
use rmcp::{
    Error, RoleServer, ServiceExt,
    model::{
        CallToolResult, Content, GetPromptRequestMethod, GetPromptRequestParam, GetPromptResult,
        ListPromptsResult, PaginatedRequestParam, Prompt, PromptMessage, PromptMessageContent,
        PromptMessageRole, ServerCapabilities, ServerInfo,
    },
    service::RequestContext,
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

    // #[tool(description = "Validate an input schema (useful for simply checking a schema before submitting a job)")]
    // fn validate_schema(schema: InputSchema) -> Result<CallToolResult, Error> {
    //
    // }

    #[tool(description = "Submit a new simulation job")]
    fn create_job(
        &self,
        #[tool(param)] job_id: String,
        #[tool(param)] schema: InputSchema,
    ) -> Result<CallToolResult, Error> {
        schema
            .validate()
            .map_err(|e| Error::invalid_params(format!("invalid schema : {e}"), None))?;
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
            capabilities: ServerCapabilities::builder()
                .enable_tools()
                .enable_prompts()
                .build(),
            ..Default::default()
        }
    }

    async fn get_prompt(
        &self,
        GetPromptRequestParam { name, arguments }: GetPromptRequestParam,
        context: RequestContext<RoleServer>,
    ) -> Result<GetPromptResult, Error> {
        match name.as_str() {
            "system_prompt" => Ok(GetPromptResult {
                description: Some("This is the system prompt for Hecate.".into()),
                messages: vec![PromptMessage {
                    role: PromptMessageRole::User,
                    content: PromptMessageContent::text(
                        "The laplacian operator is available as laplacian. For instance laplacian u is laplacian * u. Derivatives are written with either diff(f, t, 2) or d^2(f)/dt^2. You can also use rounded d which might be better when relevant.",
                    ),
                }],
            }),
            _ => Err(Error::invalid_params("prompt not found", None)),
        }
    }

    async fn list_prompts(
        &self,
        request: Option<PaginatedRequestParam>,
        context: RequestContext<RoleServer>,
    ) -> Result<ListPromptsResult, Error> {
        Ok(ListPromptsResult {
            next_cursor: None,
            prompts: vec![Prompt::new(
                "system_prompt",
                Some("This is the system prompt for Hecate."),
                None,
            )],
        })
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
