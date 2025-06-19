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

use sea_orm::entity::prelude::*;
use serde::Serialize;

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize)]
#[sea_orm(table_name = "job")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: i64,
    pub name: String,
    pub created_at: DateTimeUtc,
    pub schema: Json,
    pub status: JobStatus,
}

#[derive(Clone, Debug, PartialEq, Eq, EnumIter, DeriveActiveEnum, Serialize)]
#[sea_orm(
    rs_type = "String",
    db_type = "String(StringLen::None)",
    rename_all = "camelCase"
)]
pub enum JobStatus {
    Created,
    Compiling,
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
