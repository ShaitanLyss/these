use super::Entity as Job;
use hecate::InputSchema;
use hecate::codegen::input_schema::CodeGenRes;
use hecate_executor::{BoxExecutor, ExecutorConfig, ExecutorError};
use schemars::JsonSchema;
use sea_orm::ActiveValue::Set;
use sea_orm::sqlx::types::chrono::Utc;
use sea_orm::{
    ActiveModelTrait, ColumnTrait, DbConn, DbErr, DerivePartialModel, EntityTrait, FromQueryResult,
    IntoActiveModel, QueryFilter,
};
use serde::{Deserialize, Serialize};

use crate::JobError;
use crate::job::JobStatus;
use crate::job::{self, JobScheduler};

#[derive(DerivePartialModel, FromQueryResult)]
#[sea_orm(entity = "Job")]
pub struct ShortJobInfo {
    pub id: String,
    pub name: String,
    pub status: JobStatus,
}

impl Job {
    pub async fn unfinished_jobs(db: &DbConn) -> Result<Vec<ShortJobInfo>, DbErr> {
        Job::find()
            .filter(job::Column::Status.is_in(JobStatus::unfinished_values()))
            .into_partial_model()
            .all(db)
            .await
    }
}
impl job::Model {
    pub async fn set_status(self, status: JobStatus, db: &DbConn) -> Result<Self, DbErr> {
        let mut job = self.into_active_model();

        job.status = Set(status);
        Job::update(job).exec(db).await
    }

    pub async fn executor(&self) -> Result<BoxExecutor, ExecutorError> {
        let config = match &self.cluster_access_name {
            Some(host) => ExecutorConfig::Ssh { host },
            None => ExecutorConfig::Local,
        };
        config.into_executor().await
    }
}

#[derive(Debug, JsonSchema, Deserialize, Serialize)]
pub struct JobConfig {
    pub name: String,
    pub schema: InputSchema,
    pub compiler: Option<String>,
    pub cluster_access_name: Option<String>,
    pub scheduler: Option<JobScheduler>,
    pub cluster: Option<String>,
    pub queue: Option<String>,
    pub num_nodes: Option<i32>,
}

impl Job {
    pub async fn new(
        JobConfig {
            name,
            schema,
            compiler,
            cluster_access_name,
            scheduler,
            cluster,
            queue,
            num_nodes,
        }: JobConfig,
        db: &DbConn,
    ) -> Result<job::Model, JobError> {
        schema.validate()?;
        if cluster_access_name.is_some() && scheduler.is_none() {
            return Err(JobError::InvalidJobConfig(
                "cluster execution requires a scheduler".into(),
            ));
        }

        let CodeGenRes {
            code,
            file_name,
            cmakelists,
            schema: _,
        } = schema.generate_sources()?;
        let job = job::ActiveModel {
            name: Set(name),
            code: Set(code),
            cmakelists: Set(cmakelists),
            code_filename: Set(Some(file_name)),
            schema: Set(serde_json::to_value(schema)?),
            status: Set(JobStatus::Created),
            compiler: Set(compiler),
            created_at: Set(Utc::now()),
            cluster_access_name: Set(cluster_access_name.clone()),
            scheduler: Set(scheduler),
            cluster: Set(cluster),
            queue: Set(queue),
            num_nodes: Set(num_nodes),
            ..Default::default()
        };

        let job = job.insert(db).await?;
        Ok(job)
    }
}
