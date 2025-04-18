use hecate;

use clap::{Parser, Subcommand};

/// The world ain't ready for Hecate!
#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Args {

    #[command(subcommand)]
    command: Commands
}

#[derive(Subcommand)]
enum Commands {
    Cpp
}

fn main() {
    let args = Args::parse();

    match &args.command {
        Commands::Cpp => unsafe {
            println!("{}", hecate::add(-12, 24));
        },
    }
}
