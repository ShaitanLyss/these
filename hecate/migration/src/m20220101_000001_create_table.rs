use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Job::Table)
                    .if_not_exists()
                    .col(pk_auto(Job::Id))
                    .col(string(Job::Name))
                    .col(string(Job::Status))
                    .col(json(Job::Schema))
                    .col(date_time(Job::CreatedAt))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Job::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
enum Job {
    Table,
    Id,
    Name,
    Status,
    Schema,
    CreatedAt,
}

