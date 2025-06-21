use anyhow::Result;
use hecate::InputSchema;

fn main() -> Result<()> {
    let schema: InputSchema =
        serde_yaml::from_str(include_str!("../input-schemas/heat-eq.hecate.yml"))?;

    let sources = schema.generate_sources()?;

    sources.write_to_dir("build/example-heat-eq")?;

    Ok(())
}

#[cfg(test)]
#[test]
fn heat_eq() {
    if let Err(err) = main() {
        panic!("{err}");
    }
}
