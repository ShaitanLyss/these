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
    pub cluster_access_name: Option<String>,
    pub scheduler: Option<JobScheduler>,
    pub cluster: Option<String>,
    pub queue: Option<String>,
    pub num_nodes: Option<i32>,
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
    IBMLsf,
}

#[derive(Clone, Debug, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize)]
#[sea_orm(
    rs_type = "String",
    db_type = "String(StringLen::None)",
    rename_all = "camelCase"
)]
#[serde(rename_all = "snake_case")]
pub enum JobStatus {
    Created,
    Queued,
    Running,
    Finished,
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
