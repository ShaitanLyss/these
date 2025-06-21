use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let mut table_alter = Table::alter();
        table_alter
            .table(Job::Table)
            .add_column(string_null(Job::ClusterAccessName));
        manager.alter_table(table_alter).await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .add_column(string_null(Job::Scheduler))
                    .take(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .drop_column(Job::Scheduler)
                    .take(),
            )
            .await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .drop_column(Job::ClusterAccessName)
                    .take(),
            )
            .await
    }
}

#[derive(DeriveIden)]
enum Job {
    Table,
    ClusterAccessName,
    Scheduler,
}
