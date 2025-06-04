use std::process::Command;
use std::{env, path::PathBuf};

use bindgen;
use cmake;

fn main() {
    let target = env::var("TARGET").unwrap();

    // Check if the target architecture is wasm32
    if target.contains("wasm32") {
        // TODO consider setting cdylib here
        return;
    }

    let dst = cmake::build("cpp");
    println!("cargo:rustc-link-search=native={}/lib", dst.display());
    println!("cargo:rustc-link-lib=static=hecatecpp");

    // The bindgen::Builder is the main entry point
    // to bindgen, and lets you build up options for
    // the resulting bindings.
    let bindings = bindgen::Builder::default()
        // The input header we would like to generate
        // bindings for.
        .header("cpp/src/main.hpp")
        // Tell cargo to invalidate the built crate whenever any of the
        // included header files changed.
        .parse_callbacks(Box::new(bindgen::CargoCallbacks::new()))
        // Finish the builder and generate the bindings.
        .generate()
        // Unwrap the Result and panic on failure.
        .expect("Unable to generate bindings");

    // Write the bindings to the $OUT_DIR/bindings.rs file.
    let out_path = PathBuf::from(env::var("OUT_DIR").unwrap());
    bindings
        .write_to_file(out_path.join("bindings.rs"))
        .expect("Couldn't write bindings!");

    // Build js package with pnpm from js folder
    // Ensure pnpm is installed
    Command::new("pnpm")
        .arg("--version")
        .status()
        .expect("Failed to find pnpm. It is required to build js sources.");

    std::env::set_current_dir("js").expect("Failed to set current dir to js.");
    // Dependencies
    Command::new("pnpm")
        .arg("install")
        .status()
        .expect("Failed to install dependencies.");
    // Build
    Command::new("pnpm")
        .arg("build")
        .status()
        .expect("Failed to build js package.");
}
