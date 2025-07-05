use anyhow::Result;
use clap::Parser;
use hecate::InputSchema;
use hecate_entity::{JobConfig, job::JobScheduler};
use log::{LevelFilter, info};

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    /// Host to create the job on
    #[arg(long)]
    host: Option<String>,
    #[arg(short, long)]
    num_nodes: Option<i32>,
    #[arg(short, long)]
    cluster: Option<String>,
    #[arg(short, long)]
    queue: Option<String>,
    #[arg(short, long)]
    mpi: Option<bool>,
}

#[tokio::main]
async fn main() -> Result<()> {
    env_logger::builder()
        .filter_module("create_job", LevelFilter::Debug)
        .filter_module("hecate_mcp_server", LevelFilter::Debug)
        .init();

    let args = Cli::try_parse()?;
    let mcp = hecate_mcp_server::HecateSimulator::new().await?;
    let mut name = String::from("example_job");

    // if let Some(ref host) = args.host {
    //     name += "@";
    //     name += &host;
    // }

    // if let Some(ref queue) = args.queue {
    //     name += "_";
    //     name += &queue;
    // }

    if let Some(ref cluster) = args.cluster {
        name += "_";
        name += &cluster;
    }

    if let Some(ref num_nodes) = args.num_nodes {
        name += "_";
        name += &num_nodes.to_string();
    }
    let mut schema = InputSchema::from_yaml(include_str!(
        "../../hecate/input-schemas/wave-eq.hecate.yml"
    ))?;

    if let Some(mpi) = args.mpi {
        schema.gen_conf.mpi = mpi;
    }

    let resp = mcp
        .create_job(JobConfig {
            name,
            schema,
            compiler: None,
            cluster_access_name: args.host,
            scheduler: Some(JobScheduler::Oarsub),
            cluster: args.cluster,
            queue: args.queue,
            num_nodes: args.num_nodes,
        })
        .await?;

    info!("response: {:?}", resp.content);

    loop {}
}
