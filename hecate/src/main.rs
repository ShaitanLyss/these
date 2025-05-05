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

fn print(s: String) {
    println!("{s}");
}

fn printstderr(s: String) {
    eprintln!("{s}");
}

use rquickjs::{embed, loader::Bundle, CatchResultExt, Context, Function, Module, Runtime};

/// load the `my_module.js` file and name it myModule
#[rust_analyzer::skip]
static BUNDLE: Bundle = embed! {
    "bundle": "js/build/bundle.js",
};

fn test_js() {
    let rt = Runtime::new().unwrap();
    let ctx = Context::full(&rt).unwrap();

    rt.set_loader(BUNDLE, BUNDLE);
    ctx.with(|ctx| {
        let global = ctx.globals();
        global.set(
            "__print",
            Function::new(ctx.clone(), print).unwrap().with_name("__print").unwrap(),
        ).unwrap();
        global.set(
            "__printerr",
            Function::new(ctx.clone(), printstderr)
                .unwrap()
                .with_name("__printerr")
                .unwrap(),
        ).unwrap();
        ctx.eval::<(), _>(
            r#"
globalThis.console = {
  log(...v) {
    globalThis.__print(`${v.join(" ")}`)
  },
  error(...v) {
    globalThis.__printerr(`${v.join(" ")}`)
  },
    warn(...v) {
    globalThis.__print(`${v.join(" ")}`)
  },
  info(...v) {
    globalThis.__print(`${v.join(" ")}`)
  },
  debug(...v) {
    globalThis.__print(`${v.join(" ")}`)
  }
}
"#,
        ).unwrap();
        Module::evaluate(
            ctx.clone(),
            "testModule",
            r#"
            import { get_cpp_sources_from_graph } from 'bundle';
            console.log(get_cpp_sources_from_graph());

        "#,
        )
        .unwrap()
        .finish::<()>()
        .catch(&ctx)
        .unwrap();
        let res: i32 = ctx.eval("2 + 2").unwrap();
        println!("2 + 2 = {}", res);
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
