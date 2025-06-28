use anyhow::Result;
use hecate::InputSchema;

fn main() -> Result<()> {
    env_logger::builder()
        .filter_level(log::LevelFilter::Info)
        .format_timestamp(None)
        .parse_default_env()
        .init();
    let schema: InputSchema =
        serde_yaml::from_str(include_str!("../input-schemas/wave-eq.hecate.yml"))?;

    let res = schema.generate_sources()?;

    res.write_to_dir("build/example-wave-eq")?;

    Ok(())
}

#[cfg(test)]
#[test]
fn wave_eq() {
    assert!(main().is_ok())
}
