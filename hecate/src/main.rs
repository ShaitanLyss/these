use llrt_modules::module_builder::ModuleBuilder;
use rquickjs::{
    async_with, embed, loader::Bundle, AsyncContext, AsyncRuntime
};


use anyhow::Result;
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
    Matrixify
}

// fn print(s: String) {
//     println!("{s}");
// }
//
// fn printstderr(s: String) {
//     eprintln!("{s}");
// }


/// load the `my_module.js` file and name it myModule
#[rust_analyzer::skip]
static BUNDLE: Bundle = embed! {
    "bundle": "js/build/bundle.js",
};

// async fn get_config() -> Result<()> {
//     let runtime = AsyncRuntime::new()?;
//
//     let module_builder = ModuleBuilder::default();
//     let (module_resolver, module_loader, global_attachment) = module_builder.build();
//
//     runtime.set_loader(BUNDLE, BUNDLE).await;
//
//     let context = AsyncContext::full(&runtime).await?;
//
//     async_with!(context => |ctx| {
//         global_attachment.attach(&ctx)?;
//
//         let mut options = rquickjs::context::EvalOptions::default();
//         options.global = false;
//         // let promise = ctx.eval_promise(r"2")?;
//         // &promise.into_future::<rquickjs::Value>().await?;
//         // dbg!(promise.result::<f64>());
//         ctx.eval::<(), _>("import 'bundle'").inspect_err(|err| {
//             dbg!(err.source());
//
//         });
//
//
//         // match ctx.eval_promise(
//         //     r#"
//         //     2
//         //     // import { get_cpp_sources_from_graph } from 'bundle';
//         //     // await get_cpp_sources_from_graph();
//         //     "#
//         // ) {
//         //     Ok(res) => {
//         //         let res = res.into_future::<rquickjs::Promise>().await?;
//         //       println!("{res:?}");
//         //
//         //     },
//         //     Err(err) => {
//         //         println!("{err:?}");
//         //
//         //
//         //     },
//         // }
//
//         anyhow::Ok(())
//     })
//     .await?;
//
//     Ok(())
// }

async fn test_js() -> Result<()> {
    let runtime = AsyncRuntime::new().unwrap();
    let context = AsyncContext::full(&runtime).await.unwrap();

    let module_builder = ModuleBuilder::default();
    let (module_resolver, module_loader, global_attachment) = module_builder.build();
    // let module_resolver = module_resolver.add_name("bundle");
    // let global_attachment = global_attachment.add_name("bundle");
    // module_loader.add_module("bundle", BUNDLE);
    runtime.set_loader((BUNDLE, module_resolver,), (BUNDLE, module_loader,)).await;

    async_with!(context => |ctx| {
        global_attachment.attach(&ctx)?;
        ctx.eval::<(),_>("delete crypto['randomBytes']").map_err(|err| {
            dbg!(ctx.catch());
            err        })?;
        // let global = ctx.globals();

        // global
        //     .set(
        //         "__print",
        //         Function::new(ctx.clone(), print)
        //             .unwrap()
        //             .with_name("__print")
        //             .unwrap(),
        //     )
        //     .unwrap();
        // global
        //     .set(
        //         "__printerr",
        //         Function::new(ctx.clone(), printstderr)
        //             .unwrap()
        //             .with_name("__printerr")
        //             .unwrap(),
        //     )
        //     .unwrap();

//         ctx.eval::<(), _>(
//             r#"
// globalThis.console = {
//   log(...v) {
//     globalThis.__print(`${v.join(" ")}`)
//   },
//   error(...v) {
//     globalThis.__printerr(`${v.join(" ")}`)
//   },
//     warn(...v) {
//     globalThis.__print(`${v.join(" ")}`)
//   },
//   info(...v) {
//     globalThis.__print(`${v.join(" ")}`)
//   },
//   debug(...v) {
//     // globalThis.__print(`${v.join(" ")}`)
//   }
// }
// "#,
//         )
//         .unwrap();

        ctx.eval_promise("const {get_cpp_sources_from_graph} = await import('bundle')")?.into_future::<()>().await?;
        match ctx.eval_promise("const res = await get_cpp_sources_from_graph()")?.into_future::<()>().await {
            Ok(_res) => {
                // dbg!(res);

            },
            Err(_) => {
                dbg!(ctx.catch());
                

            }
        };
        let res: i32 = ctx.eval("res")?;
        // let res: i32 = ctx.eval("2 + 2")? ;
        println!("Through running the graph : {}", res);


        anyhow::Ok(())
    })
    .await?;

    runtime.idle().await;


    Ok(())
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<()> {
    let args = Args::parse();

    match &args.command {
        Commands::Cpp=>unsafe{println!("{}",hecate::add(-12,24));},
        Commands::Test=>{test_js().await?;}
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
            let addition = Mul::new_box(vec![&Integer::new_box(2), &Add::new_box(vec![&x, &x, &y, &z])]);

            
            println!("{:?}", addition);
            println!("{}",addition);
            let test_subs = addition.subs(&vec![[x.clone_box(), y.clone_box()]]);
            println!("Substitution: \n{}", test_subs);

            println!("{}", Integral::new(f));
            println!("x == x : {}", Symbol::new_box("x") == Symbol::new_box("x"));
        

            let eq = &Eq::into_new(&(Diff::new(u, vec!(t, t)) - c.ipow(2) * laplacian * u), f);
            println!("\nWave Equation:\n{}",eq as &dyn Expr);

            let system = System::new(["u"], ["f"], [eq]);
            print!("\n{system:#}\n");

            let system = system.to_first_order_in_time();
            println!("\n{system:#}");

            let system = system.time_discretized();
            println!("\n{system:#}");

            let system = system.simplified();
            println!("\n{system:#}");



        },
    }
    Ok(())
}
