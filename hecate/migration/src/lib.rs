pub use sea_orm_migration::prelude::*;

mod m20220101_000001_create_table;
mod m20250619_072715_add_cluster;
mod m20250620_091631_add_cluster_and_num_nodes;
mod m20250620_094455_add_queue;
mod m20250620_232605_add_code_and_cmakelists;
mod m20250624_093459_add_code_filename;
mod m20250624_094955_add_remote_job_id;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_create_table::Migration),
            Box::new(m20250619_072715_add_cluster::Migration),
            Box::new(m20250620_091631_add_cluster_and_num_nodes::Migration),
            Box::new(m20250620_094455_add_queue::Migration),
            Box::new(m20250620_232605_add_code_and_cmakelists::Migration),
            Box::new(m20250624_093459_add_code_filename::Migration),
            Box::new(m20250624_094955_add_remote_job_id::Migration),
        ]
    }
}
