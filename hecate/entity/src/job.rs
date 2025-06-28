// #[derive(Clone, Serialize)]
// struct Job {
//     id: String,
//     name: String,
//     schema: InputSchema,
//     // created_at: DateTimeUtc,
// }
//
// impl Job {
//     fn new(id: String, name: String, schema: InputSchema) -> Self {
//         Self { id, name, schema }
//     }
// }

use schemars::JsonSchema;
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize)]
#[sea_orm(table_name = "job")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i64,
    pub name: String,
    pub created_at: DateTimeUtc,
    pub schema: Json,
    pub code: String,
    pub code_filename: Option<String>,
    pub cmakelists: Option<String>,
    pub status: JobStatus,
    pub compiler: Option<String>,
    pub cluster_access_name: Option<String>,
    pub scheduler: Option<JobScheduler>,
    pub cluster: Option<String>,
    pub queue: Option<String>,
    pub num_nodes: Option<i32>,
    pub walltime: Option<String>,
    pub remote_job_id: Option<String>,
}

#[derive(
    Clone, Debug, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize, Deserialize, JsonSchema,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "String(StringLen::None)",
    rename_all = "camelCase"
)]
#[serde(rename_all = "snake_case")]
pub enum JobScheduler {
    Oarsub,
    // IBMLsf,
}

/// # Job Status
/// The status of a job.
#[derive(
    Clone,
    Debug,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Serialize,
    Copy,
    Deserialize,
    JsonSchema,
)]
#[sea_orm(
    rs_type = "String",
    db_type = "String(StringLen::None)",
    rename_all = "snake_case"
)]
#[serde(rename_all = "snake_case")]
pub enum JobStatus {
    /// The job has been created and stored in the database.
    Created,
    /// The job is in the queue, waiting to be executed.
    Queued,
    /// The job is running.
    Running,
    /// The job has finished successfully.
    Finished,
    /// The job couldn't finish because of external interruption.
    Interupted,
    /// The job failed to be processed by the scheduler.
    SchedulerError,
    /// The job failed.
    Failed,
    /// The job was canceled.
    Canceled,
    /// The job is finishing, resources are being released.
    Finishing,
}

impl JobStatus {
    pub fn unfinished_variants() -> &'static [JobStatus] {
        &[
            JobStatus::Created,
            JobStatus::Queued,
            JobStatus::Running,
            JobStatus::Finishing,
        ]
    }

    pub fn unfinished_values() -> impl Iterator<Item = String> {
        JobStatus::unfinished_variants()
            .iter()
            .map(|v| v.to_value())
    }
    pub fn is_done(&self) -> bool {
        match self {
            JobStatus::Finished
            | JobStatus::Failed
            | JobStatus::Canceled
            | JobStatus::SchedulerError => true,
            _ => false,
        }
    }
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    // #[sea_orm(has_many = "super::fruit::Entity")]
    // Fruit,
}

// impl Related<super::fruit::Entity> for Entity {
//     fn to() -> RelationDef {
//         Relation::Fruit.def()
//     }
// }

impl ActiveModelBehavior for ActiveModel {}
