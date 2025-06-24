use chrono::Utc;
use entity::job::{self, JobStatus};
use entity::job::{Entity as Job, JobScheduler};
use hecate::codegen::input_schema::{CodeGenRes, InputSchema};
use migration::{ExprTrait, Migrator, MigratorTrait};
mod executor;
mod workflow;
use rmcp::{
    Error, RoleServer, ServiceExt,
    model::{
        CallToolResult, Content, GetPromptRequestParam, GetPromptResult, ListPromptsResult,
        PaginatedRequestParam, Prompt, PromptMessage, PromptMessageContent, PromptMessageRole,
        ServerCapabilities, ServerInfo,
    },
    service::RequestContext,
    tool, transport,
};
use sea_orm::prelude::DateTimeUtc;
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, Database, DatabaseConnection, EntityTrait, IntoSimpleExpr,
    QueryFilter,
};
use sea_orm::{
    ConnectionTrait, DbBackend, DerivePartialModel, FromQueryResult, Iterable, QuerySelect,
    QueryTrait,
};
use serde::Serialize;

use crate::executor::ExecutorError;
pub use std::error::Error as StdError;

trait ToJson {
    fn to_json(&self) -> String;
}

impl<T: Serialize> ToJson for T {
    fn to_json(&self) -> String {
        serde_json::to_string(self).expect("serializable object")
    }
}

#[derive(Clone)]
pub struct HecateSimulator {
    db: DatabaseConnection,
}

#[derive(Debug, thiserror::Error)]
pub enum HecateError {
    #[error("couldn't get home dir")]
    NoHomeDir,
}

impl<E: StdError> From<ExecutorError<E>> for rmcp::Error {
    fn from(value: ExecutorError<E>) -> Self {
        rmcp::Error::internal_error(value.to_string(), None)
    }
}

#[tool(tool_box)]
impl HecateSimulator {
    pub async fn new() -> anyhow::Result<Self> {
        let mut dir = dirs::home_dir().ok_or_else(|| HecateError::NoHomeDir)?;
        dir.push(".hecate");
        std::fs::create_dir_all(&dir)?;
        let res = HecateSimulator {
            db: Database::connect(format!("sqlite://{}/hecate.db?mode=rwc", dir.display())).await?,
        };

        Migrator::up(&res.db, None).await?;

        Ok(res)
    }
    #[tool(description = "Get the current weather")]
    fn get_weather() -> Result<CallToolResult, Error> {
        Ok(CallToolResult::success(vec![Content::text("Too hot")]))
    }

    #[tool(
        description = "Submit a new simulation job. If no number of num_nodes is provided and mpi is set to true in the schema, the number of nodes will be set to the number of available compute nodes.
        By default, don't use mpi when running locally, and don't set debug to true. Finally, make sure the cfl condition is respected.
        Cluster execution requires a scheduler, a cluster_access_name and a cluster name.
        This tool takes care of starting the workflow of the job, ie. compiling and running it.
        "
    )]
    pub async fn create_job(
        &self,
        #[tool(param)] name: String,
        #[tool(param)] schema: InputSchema,
        #[tool(param)] cluster_access_name: Option<String>,
        #[tool(param)] scheduler: Option<JobScheduler>,
        #[tool(param)] cluster: Option<String>,
        #[tool(param)] queue: Option<String>,
        #[tool(param)] num_nodes: Option<i32>,
    ) -> Result<CallToolResult, Error> {
        schema
            .validate()
            .map_err(|e| Error::invalid_params(e.to_string(), None))?;
        if cluster_access_name.is_some() && scheduler.is_none() {
            return Err(Error::invalid_params(
                "cluster execution requires a scheduler",
                None,
            ));
        }

        let CodeGenRes {
            code,
            file_name,
            cmakelists,
            schema: _,
        } = schema
            .generate_sources()
            .map_err(|e| Error::internal_error(e.to_string(), None))?;
        let job = job::ActiveModel {
            name: Set(name),
            code: Set(code),
            cmakelists: Set(cmakelists),
            code_filename: Set(Some(file_name)),
            schema: Set(serde_json::to_value(schema)
                .map_err(|e| Error::internal_error(e.to_string(), None))?),
            status: Set(JobStatus::Created),
            created_at: Set(Utc::now()),
            cluster_access_name: Set(cluster_access_name.clone()),
            scheduler: Set(scheduler),
            cluster: Set(cluster),
            queue: Set(queue),
            num_nodes: Set(num_nodes),
            ..Default::default()
        };

        let job = job
            .insert(&self.db)
            .await
            .map_err(|e| Error::internal_error(e.to_string(), None))?;
        let job_id = job.id;

        match cluster_access_name {
            Some(host) => {
                let executor = executor::SshExecutor::new(&host)
                    .await
                    .map_err(|e| ExecutorError::CreationFailed(e))?;
                tokio::spawn(workflow::run_job(job, self.db.clone(), executor));
            }
            None => {
                let executor = executor::LocalExecutor::new();
                tokio::spawn(workflow::run_job(job, self.db.clone(), executor));
            }
        }

        Ok(CallToolResult::success(vec![Content::text(format!(
            "id: {}",
            job_id
        ))]))
    }

    #[tool(description = "List simulation jobs")]
    async fn list_unfinished_jobs(&self) -> Result<CallToolResult, Error> {
        let sim_jobs = Job::find()
            .filter(job::Column::Status.into_simple_expr().not_equals("running"))
            .all(&self.db)
            .await
            .map_err(|e| Error::internal_error(e.to_string(), None))?;

        Ok(CallToolResult::success(vec![Content::text(
            sim_jobs.to_json(),
        )]))
    }

    #[tool(
        description = "Get partial information about a simulation job (excluding source files and input schema)"
    )]
    pub async fn sim_job_info(&self, #[tool(param)] job_id: i64) -> Result<CallToolResult, Error> {
        #[derive(FromQueryResult, Serialize, DerivePartialModel)]
        #[sea_orm(entity = "Job")]
        struct JobInfo {
            pub id: i64,
            pub name: String,
            pub created_at: DateTimeUtc,
            // pub schema: Json,
            // pub code: String,
            // pub code_filename: Option<String>,
            // pub cmakelists: Option<String>,
            pub status: JobStatus,
            pub cluster_access_name: Option<String>,
            pub scheduler: Option<JobScheduler>,
            pub cluster: Option<String>,
            pub queue: Option<String>,
            pub num_nodes: Option<i32>,
            pub remote_job_id: Option<String>,
        }
        let job_info = Job::find_by_id(job_id)
            .into_partial_model::<JobInfo>()
            .one(&self.db)
            .await
            .map_err(|e| Error::internal_error(e.to_string(), None))?
            .ok_or_else(|| Error::resource_not_found("Job not found", None))?;

        Ok(CallToolResult::success(vec![Content::text(
            job_info.to_json(),
        )]))
    }

    #[tool(description = "Get full information about a simulation job (including source files)")]
    pub async fn sim_job_full_info(
        &self,
        #[tool(param)] job_id: i64,
    ) -> Result<CallToolResult, Error> {
        let job = Job::find_by_id(job_id)
            .one(&self.db)
            .await
            .map_err(|e| Error::internal_error(e.to_string(), None))?;

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
        .await?
        .serve(transport::stdio())
        .await
        .inspect_err(|e| {
            println!("Error starting server: {e}");
        })?;
    service.waiting().await?;

    Ok(())
}
