use anyhow::Result;
use hecate::InputSchema;

fn main() -> Result<()> {
    env_logger::builder()
        .filter_level(log::LevelFilter::Info)
        .parse_default_env()
        .init();
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
