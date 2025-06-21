use chrono::Utc;
use entity::job::{self, JobStatus};
use entity::job::{Entity as Job, JobScheduler};
use hecate::codegen::input_schema::InputSchema;
use migration::{ExprTrait, Migrator, MigratorTrait};
use rmcp::{
    Error, ServiceExt,
    model::{CallToolResult, Content, ServerCapabilities, ServerInfo},
    tool, transport,
};
use sea_orm::{
    ActiveModelTrait, ActiveValue::Set, Database, DatabaseConnection, EntityTrait, IntoSimpleExpr,
    QueryFilter,
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

#[derive(Clone)]
struct HecateSimulator {
    db: DatabaseConnection,
}

#[derive(Debug, thiserror::Error)]
pub enum HecateError {
    #[error("couldn't get home dir")]
    NoHomeDir,
}

#[tool(tool_box)]
impl HecateSimulator {
    async fn new() -> anyhow::Result<Self> {
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
        By default, don't use mpi when running locally, and don't set debug to true."
    )]
    async fn create_job(
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

        let job = job::ActiveModel {
            name: Set(name),
            code: Set(schema
                .generate_cpp_sources()
                .map_err(|e| Error::internal_error(e.to_string(), None))?),
            schema: Set(serde_json::to_value(schema)
                .map_err(|e| Error::internal_error(e.to_string(), None))?),
            status: Set(JobStatus::Created),
            created_at: Set(Utc::now()),
            cluster_access_name: Set(cluster_access_name),
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
        Ok(CallToolResult::success(vec![Content::text(format!(
            "id: {}",
            job.id
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

    #[tool(description = "Get information about a simulation job")]
    async fn sim_job_info(&self, #[tool(param)] job_id: i64) -> Result<CallToolResult, Error> {
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
            capabilities: ServerCapabilities::builder().enable_tools().build(),
            ..Default::default()
        }
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
