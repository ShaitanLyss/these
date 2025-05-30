use anyhow::Result;
use llrt_modules::module_builder::ModuleBuilder;
use rquickjs::{AsyncContext, AsyncRuntime, async_with, embed, loader::Bundle};

/// load the `my_module.js` file and name it myModule
#[rust_analyzer::skip]
static BUNDLE: Bundle = embed! {
    "bundle": "js/build/bundle.js",
};

// fn print(s: String) {
//     println!("{s}");
// }
//
// fn printstderr(s: String) {
//     eprintln!("{s}");
// }

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

pub async fn test_js() -> Result<()> {
    let runtime = AsyncRuntime::new().unwrap();
    let context = AsyncContext::full(&runtime).await.unwrap();

    let module_builder = ModuleBuilder::default();
    let (module_resolver, module_loader, global_attachment) = module_builder.build();
    // let module_resolver = module_resolver.add_name("bundle");
    // let global_attachment = global_attachment.add_name("bundle");
    // module_loader.add_module("bundle", BUNDLE);
    runtime
        .set_loader((BUNDLE, module_resolver), (BUNDLE, module_loader))
        .await;

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
