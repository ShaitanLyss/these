use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .add_column(string_null(Job::Cluster))
                    .take(),
            )
            .await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .add_column(integer_null(Job::NumNodes).take())
                    .take(),
            )
            .await?;
        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .drop_column(Job::Cluster)
                    .take(),
            )
            .await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .drop_column(Job::NumNodes)
                    .take(),
            )
            .await?;
        Ok(())
    }
}

#[derive(DeriveIden)]
enum Job {
    Table,
    NumNodes,
    Cluster,
}
