[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

# Hecate
**A thesis on running simulations without writing a single line of code.**

Hecate is a framework for generating HPC-ready simulation code from a mathematical problem definiton, as well as managing local and remote simulation jobs. It can be used as a command line interface *(hecate-cli)*, a MCP server for AI clients *(hecate-mcp-server)* or a rust library *(hecate-lib)*. A graphical interface is planned later on.

## Prerequisites
### A rust compiler
Hecate is developed with the Rust programming language, which is a low-level system language with high-level ergonomics. Thus, compiling Hecate requires a rust toolchain. It can easily be installed through rustup, a rust toolchain manager.

On linux you can install rustup and rust with the following :
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Alternatively, you can directly check alternative installation options on the rustup website : [https://rustup.rs/](https://rustup.rs/).

### Target libraries
Hecate can generate code for different targets without any external dependency (at the time only deal.II). However, if you want to compile and run the code it generates. You will need the relevant library installed. 

> [!NOTE]  
> If you only plan on running simulations remotely on HPC clusters, you don't need a local install of target libraries.

Supported targets
- [deal.II](https://www.dealii.org/)

## Installation
Once you've got the rust toolchain installed, the installation process is straightforward. You can install any binary using `cargo install BINARY` where `cargo` is the builtin package manager of Rust.

> [!NOTE]
> If running `cargo` commands fail because `cargo` isn't found, make sure that the environment was loaded. You can try restarting your shell if you just installed the rust toolchain with rustup, or manually load the appropriate cargo environment file in the `$HOME/.cargo` directory.

### Hecate CLI
```bash
cargo install hecate-cli
```

### Hecate MCP server
```bash
cargo install hecate-mcp-server
```


## Usage
### Hecate CLI
The Hecate CLI (Command Line Interface) is used to generate simulation code using Hecate.

```bash
hecate gen INPUT_SCHEMA_PATH
```

You can find example input schemas at hecate/input-schemas.

This will generate a CMake project with the simulation code.
Compiling it will generate an executable called `run_sim`.

### Hecate MCP

## Installation 
### From sources
You can install hecate from sources.

First, you need to install the rust compiler. You can achieve this with rustup.

#### Linux
Run this command in a terminal and follow instructions :
`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

#### Windows
Go to the [rustup website](https://rustup.rs/) and follow the instructions.

After installing rust, clone the repository.
```bash
git clone https://github.com/ShaitanLyss/these
```

Go into the hecate sources directory.
```bash
cd these/hecate
```

Then, you can install the different binaries with the following commands :

#### Hecate MCP Server (Model Context Protocol)
A MCP server is used for providing an AI assistant with tools it can use. In this instance, this server
is used to generate simulation code using Hecate and to manage simulation jobs both locally and on remote clusters through SSH.

```bash
cargo install --path mcp-server
```

#### Hecate CLI
The Hecate CLI (Command Line Interface) is used to generate simulation code using Hecate.
```bash
cargo install --path cli
```

