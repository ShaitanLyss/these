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
                    .add_column(string(Job::Code).default(""))
                    .take(),
            )
            .await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .add_column(string_null(Job::Cmakelists))
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
                    .drop_column(Job::Code)
                    .take(),
            )
            .await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Job::Table)
                    .drop_column(Job::Cmakelists)
                    .take(),
            )
            .await?;
        Ok(())
    }
}

#[derive(DeriveIden)]
enum Job {
    Table,
    Code,
    Cmakelists,
}
