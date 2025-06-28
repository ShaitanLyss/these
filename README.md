# Hecate
**A thesis on running simulations without writing a single line of code**


## Prerequisites
Hecate depends on external libs to compile the code it generates.
Hecate supports multiple targets, install the ones you need.

At the time, only deal.II is supported so you need to install it.

- [deal.II](https://www.dealii.org/) (required)

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

