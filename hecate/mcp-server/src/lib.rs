use hecate_entity::JobConfig;
use hecate_entity::job::{self, JobStatus};
use hecate_entity::job::{Entity as Job, JobScheduler};
use log::{error, info};
use migration::{ExprTrait, Migrator, MigratorTrait};
use rmcp::handler::server::tool::{Parameters, ToolRouter};
use rmcp::{
    ErrorData as McpError, RoleServer, ServiceExt,
    model::{
        CallToolResult, Content, GetPromptRequestParam, GetPromptResult, ListPromptsResult,
        PaginatedRequestParam, Prompt, PromptMessage, PromptMessageContent, PromptMessageRole,
        ServerCapabilities, ServerInfo,
    },
    service::RequestContext,
    tool, transport,
};
use rmcp::{tool_handler, tool_router};
use schemars::JsonSchema;
use sea_orm::prelude::DateTimeUtc;
use sea_orm::{ActiveModelBehavior, Condition, DerivePartialModel, FromQueryResult};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, Database, DatabaseConnection, EntityTrait, IntoSimpleExpr,
    QueryFilter,
};
use serde::{Deserialize, Serialize};
use symrs::{BoxExpr, Expr, Symbol};

use std::collections::HashMap;
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
    pub tool_router: ToolRouter<Self>,
}

#[derive(Debug, thiserror::Error)]
pub enum HecateError {
    #[error("couldn't get home dir")]
    NoHomeDir,
}

// impl<E: StdError> From<ExecutorError<E>> for rmcp::Error {
//     fn from(value: ExecutorError<E>) -> Self {
//         rmcp::Error::internal_error(value.to_string(), None)
//     }
// }

#[derive(JsonSchema, Deserialize)]
struct GreetRequest {
    /// Name of the person to greet
    name: String,
}

#[derive(JsonSchema, Deserialize)]
struct JobRequest {
    job_id: i64,
}

/// A request to evaluate a mathematical expression
/// Variables can be supplied to substitute the symbols with values
#[derive(JsonSchema, Deserialize)]
struct EvaluateExprRequest {
    /// Mathematical expression
    expr: String,

    /// Concretized symbol values (optional)
    vars: Option<HashMap<Symbol, BoxExpr>>,
}

#[tool_router]
impl HecateSimulator {
    pub fn db_connection(&self) -> DatabaseConnection {
        self.db.clone()
    }
    pub async fn new() -> anyhow::Result<Self> {
        info!("Initiating Hecate Job Manager");
        let mut dir = dirs::home_dir().ok_or_else(|| HecateError::NoHomeDir)?;
        dir.push(".hecate");
        std::fs::create_dir_all(&dir)?;
        let res = HecateSimulator {
            db: Database::connect(format!("sqlite://{}/hecate.db?mode=rwc", dir.display())).await?,
            tool_router: Self::tool_router(),
        };

        Migrator::up(&res.db, None).await?;

        // Identify jobs that are directly managed by Hecate, without a scheduler, that were
        // interrupted during the last execution, and tag them as such.
        let db = res.db.clone();
        tokio::spawn(async move {
            let mut job = job::ActiveModel::new();
            job.status = Set(JobStatus::Interupted);
            let update_res = Job::update_many().set(job).filter(
                Condition::all()
                    .add(
                        job::Column::Status
                            .into_simple_expr()
                            .in_tuples(JobStatus::unfinished_values()),
                    )
                    .add(job::Column::Scheduler.into_simple_expr().is_null()),
            );

            let update_res = update_res.exec(&db).await;
            match update_res {
                Ok(res) => {
                    info!("Identified {} new interruped jobs", res.rows_affected);
                }
                Err(e) => {
                    error!("Failed to identify interrupted jobs: {}", e);
                }
            }
        });

        // Start status poller for scheduler jobs
        let db = res.db.clone();
        tokio::spawn(async move {
            let unfinished_scheduler_jobs = Job::find().filter(
                Condition::all()
                    .add(
                        job::Column::Status
                            .into_simple_expr()
                            .in_tuples(JobStatus::unfinished_values()),
                    )
                    .add(job::Column::Scheduler.into_simple_expr().is_not_null()),
            );

            let unfinished_scheduler_jobs = unfinished_scheduler_jobs.all(&db).await;

            match &unfinished_scheduler_jobs {
                Ok(jobs) => {
                    info!("Identified {} unfinished scheduler jobs", jobs.len());
                }
                Err(e) => {
                    error!("Failed to identify unfinished scheduler jobs: {}", e);
                    return;
                }
            }
            let unfinished_scheduler_jobs = unfinished_scheduler_jobs.unwrap();

            if unfinished_scheduler_jobs.is_empty() {
                return;
            }
            info!(
                "Starting status pollers for {} unfinished scheduler jobs",
                unfinished_scheduler_jobs.len()
            );

            for job in unfinished_scheduler_jobs {
                let db = db.clone();
                tokio::spawn(async move {
                    let job_id = job.id;
                    let updated_job = job.clone().update_status(&db).await;
                    match updated_job {
                        Ok(job) => {
                            info!("Updated status for job {}", job.id);
                        }
                        Err(e) => {
                            error!("Failed to update status for job {job_id}: {e}");
                            info!("Setting status of job {job_id} to `Failed`");
                            match job.set_status(JobStatus::Failed, &db).await {
                                Ok(job) => info!("Set status `Failed` on job {}", job.id),
                                Err(e) => {
                                    error!("Failed to set status `Failed` on job {job_id} : {e}")
                                }
                            }
                        }
                    }
                });
            }
        });

        Ok(res)
    }
    /// Gets the current weather
    #[tool]
    fn get_weather() -> String {
        "Too hot".into()
    }

    /// Returns the creator's name
    #[tool]
    fn creator_name() -> String {
        "It's a secret ! Just kidding, it's Lyss.".into()
    }

    /// Greets a person
    #[tool]
    fn greet(Parameters(GreetRequest { name }): Parameters<GreetRequest>) -> String {
        format!("Hey there {name}!")
    }

    /// Evaluates a math expression
    #[tool]
    fn evaluate(
        Parameters(EvaluateExprRequest { expr, vars }): Parameters<EvaluateExprRequest>,
    ) -> Result<String, McpError> {
        let expr: Box<dyn Expr> = expr.parse().map_err(|e| {
            McpError::invalid_params(
                format!("Expression couldn't be parsed : {e}"),
                Some(serde_json::Value::String(expr)),
            )
        })?;
        let res = expr.evaluate(vars);

        Ok(res.str())
    }

    #[tool(
        description = "Submit a new simulation job. If no number of num_nodes is provided and mpi is set to true in the schema, the number of nodes will be set to the number of available compute nodes.
        By default, don't use mpi when running locally, and don't set debug to true. Finally, make sure the cfl condition is respected.
        Cluster execution requires a scheduler, a cluster_access_name and a cluster name.
        This tool takes care of starting the workflow of the job, ie. compiling and running it.
        If only one node of compute, don't use mpi.
        "
    )]
    pub async fn create_job(
        &self,
        Parameters(job_input): Parameters<JobConfig>,
    ) -> Result<CallToolResult, McpError> {
        let job = Job::new(job_input, &self.db).await?;
        let job_id = job.id;
        let db = self.db.clone();

        tokio::spawn(async move {
            match job.run(&db).await {
                Ok(_) => info!("Successfully initiated job {job_id}"),
                Err(e) => error!("Failed to run job: {e}"),
            }
        });

        Ok(CallToolResult::success(vec![Content::text(format!(
            "id: {}",
            job_id
        ))]))
    }

    #[tool(
        description = "Cancel a simulation job. For example, this can be useful when one wants to make some changes to the input schema, and then recreate a new job with the updated configuration."
    )]
    async fn cancel_job(
        &self,
        Parameters(JobRequest { job_id }): Parameters<JobRequest>,
    ) -> Result<CallToolResult, McpError> {
        let job = Job::find_by_id(job_id)
            .one(&self.db)
            .await
            .map_err(|e| McpError::internal_error(e.to_string(), None))?;
        if job.is_none() {
            return Err(McpError::invalid_request("job not found", None));
        }
        let job = job.unwrap();

        if job.status.is_done() {
            return Err(McpError::invalid_request(
                "job already reached completion",
                Some(
                    serde_json::to_value(job.status).expect("all status variants are serializable"),
                ),
            ));
        }
        if job.status == JobStatus::Canceled {
            return Err(McpError::invalid_request("job already canceled", None));
        }

        let mut job: job::ActiveModel = job.into();
        job.status = Set(JobStatus::Canceled);
        job.update(&self.db)
            .await
            .map_err(|e| McpError::internal_error(e.to_string(), None))?;
        Ok(CallToolResult::success(vec![Content::text(&format!(
            "cancelled job {job_id}"
        ))]))
    }

    #[tool(description = "List unfinished simulation jobs ids and status.")]
    async fn list_unfinished_jobs(&self) -> Result<CallToolResult, McpError> {
        #[derive(DerivePartialModel, FromQueryResult, Serialize)]
        #[sea_orm(entity = "Job")]
        struct JobIdAndStatus {
            id: i64,
            status: JobStatus,
        }

        let sim_jobs = Job::find()
            .filter(
                job::Column::Status
                    .into_simple_expr()
                    .is_in(JobStatus::unfinished_values()),
            )
            .into_partial_model::<JobIdAndStatus>()
            .all(&self.db)
            .await
            .map_err(|e| McpError::internal_error(e.to_string(), None))?;

        Ok(CallToolResult::success(vec![Content::text(
            sim_jobs.to_json(),
        )]))
    }

    #[tool(
        description = "Get partial information about a simulation job (excluding source files and input schema)"
    )]
    pub async fn sim_job_info(
        &self,
        Parameters(JobRequest { job_id }): Parameters<JobRequest>,
    ) -> Result<CallToolResult, McpError> {
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
            pub compiler: Option<String>,
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
            .map_err(|e| McpError::internal_error(e.to_string(), None))?
            .ok_or_else(|| McpError::resource_not_found("Job not found", None))?;

        Ok(CallToolResult::success(vec![Content::text(
            job_info.to_json(),
        )]))
    }

    #[tool(description = "Get full information about a simulation job (including source files)")]
    pub async fn sim_job_full_info(
        &self,
        Parameters(JobRequest { job_id }): Parameters<JobRequest>,
    ) -> Result<CallToolResult, McpError> {
        let job = Job::find_by_id(job_id)
            .one(&self.db)
            .await
            .map_err(|e| McpError::internal_error(e.to_string(), None))?;

        Ok(CallToolResult::success(vec![Content::text(job.to_json())]))
    }
}

#[tool_handler]
impl rmcp::ServerHandler for HecateSimulator {
    fn get_info(&self) -> ServerInfo {
        ServerInfo {
            instructions: Some("Hecate Simulation Service".into()),
            capabilities: ServerCapabilities::builder()
                .enable_tools()
                .enable_prompts()
                .enable_resources()
                .build(),
            ..Default::default()
        }
    }

    async fn get_prompt(
        &self,
        GetPromptRequestParam { name, arguments: _ }: GetPromptRequestParam,
        _context: RequestContext<RoleServer>,
    ) -> Result<GetPromptResult, McpError> {
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
            _ => Err(McpError::invalid_params("prompt not found", None)),
        }
    }

    async fn list_prompts(
        &self,
        _request: Option<PaginatedRequestParam>,
        _context: RequestContext<RoleServer>,
    ) -> Result<ListPromptsResult, McpError> {
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
