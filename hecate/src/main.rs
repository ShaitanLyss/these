use std::fs;

use anyhow::Result;
use hecate::{self, codegen::input_schema::InputSchema, BuildingBlock};

use clap::{Parser, Subcommand};

/// The world ain't ready for Hecate!
#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Args {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    Cpp,
    #[command(name = "bblock")]
    BuildingBlock,
    #[command(name = "schema")]
    ParseInputSchema { schema_file: String},
    Test,
    Matrixify,
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<()> {
    let args = Args::parse();

    match &args.command {
        Commands::ParseInputSchema { schema_file} => {
            let s = fs::read_to_string(&schema_file)?;
            let schema: InputSchema = serde_yaml::from_str(&s)?;
            println!("{schema:#?}");
            let sources = schema.generate_cpp_sources();
            println!("{sources:#?}");
        }
        Commands::BuildingBlock => {
            let bblock: BuildingBlock = serde_yaml::from_str(
                r#"
                includes:
                    - deal.II/SparseMatrix
                "#,
            )?;
            println!("{bblock:#?}");
        }
        Commands::Cpp => unsafe {
            println!("{}", hecate::add(-12, 24));
        },
        Commands::Test => {
            hecate::js::test_js().await?;
        }
        Commands::Matrixify => {
            use hecate::symbolic::*;
            let x = &Symbol::new_box("x");
            let y = &Symbol::new_box("y");
            let z = &Symbol::new_box("z");
            let u = &Func::new("u", []).clone_box();
            let t = &Symbol::new_box("t");
            let f = &Func::new("f", []).clone_box();
            // let nabla = &Symbol::new("nabla");
            let c = &Symbol::new_box("c");
            let laplacian = &Symbol::new_box("laplacian");
            let addition = Mul::new_box(vec![
                &Integer::new_box(2),
                &Add::new_box(vec![&x, &x, &y, &z]),
            ]);

            println!("{:?}", addition);
            println!("{}", addition);
            let test_subs = addition.subs(&vec![[x.clone_box(), y.clone_box()]]);
            println!("Substitution: \n{}", test_subs);

            println!("{}", Integral::new(f));
            println!("x == x : {}", Symbol::new_box("x") == Symbol::new_box("x"));

            let eq = &Eq::into_new(&(Diff::new(u, vec![t, t]) - c.ipow(2) * laplacian * u), f);
            println!("\nWave Equation:\n{}", eq as &dyn Expr);

            let system = System::new(["u"], ["f"], [eq]);
            print!("\n{system:#}\n");

            let system = system.to_first_order_in_time();
            println!("\n{system:#}");

            let system = system.time_discretized();
            println!("\n{system:#}");

            let system = system.simplified();
            println!("\n{system:#}");

            let system = system.factor();
            println!("\n{system:#}");

            let system = system.matrixify();
            println!("\n{system:#}");

            let system = system.to_constant_mesh();
            println!("\nTo constant mesh:\n\n{system:#}");

            let system = system.to_crank_nikolson();
            println!("\nTo crank-nikolson:\n\n{system:#}");
        }
    }
    Ok(())
}
