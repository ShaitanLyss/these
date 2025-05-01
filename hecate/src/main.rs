use hecate::{self};

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
    Test,
}

use rquickjs::{embed, loader::Bundle, CatchResultExt, Context, Module, Runtime};

/// load the `my_module.js` file and name it myModule
static BUNDLE: Bundle = embed! {
    "myModule": "my_module.js",
};

fn test_js() {
    let rt = Runtime::new().unwrap();
    let ctx = Context::full(&rt).unwrap();

    rt.set_loader(BUNDLE, BUNDLE);
    ctx.with(|ctx| {
        Module::evaluate(
            ctx.clone(),
            "testModule",
            r#"
            import { foo } from 'myModule';
            if(foo() !== 2){
                throw new Error("Function didn't return the correct value");
            }
        "#,
        )
        .unwrap()
        .finish::<()>()
        .catch(&ctx)
        .unwrap();
    })
}

fn main() {
    let args = Args::parse();

    match &args.command {
        Commands::Cpp => unsafe {
            println!("{}", hecate::add(-12, 24));
        },
        Commands::Test => {
            test_js();

          

        }
    }
}
