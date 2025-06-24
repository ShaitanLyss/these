use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.alter_table(Table::alter().table(Job::Table).add_column(string_null(Job::Walltime)).take()).await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.alter_table(Table::alter().table(Job::Table).drop_column(Job::Walltime).take()).await
    }
}

#[derive(DeriveIden)]
enum Job {
    Table,
    Walltime,
}
