#![allow(unused)]
use super::RawRepr;
use super::unit::{FormatUnitError, format_unit};
use crate::StdError;
use const_format::{concatcp, formatcp};
use derive_more::{Deref, DerefMut};
use dyn_clone::DynClone;
use itertools::Itertools;
use lazy_static::lazy_static;
use regex::Regex;
use schemars::{JsonSchema, Schema, json_schema};
use serde::de::Visitor;
use serde::{Deserialize, Serialize, de::Error};
use serde_yaml::Value;
use std::borrow::Cow;
use std::collections::HashMap;
use std::fmt::{Debug, Display};
use std::ops::Deref;
use std::str::FromStr;
use std::sync::LazyLock;
use thiserror::Error;
use ucfirst::ucfirst;

#[derive(Debug, PartialEq, PartialOrd, Clone, Deref, DerefMut)]
pub struct WithRawRepr<L> {
    raw: String,
    #[deref_mut]
    #[deref]
    parsed: L,
}

pub trait SchemaId {
    fn schema_id() -> Cow<'static, str>;
}

impl<T: JsonSchema> JsonSchema for WithRawRepr<T> {
    fn schema_name() -> Cow<'static, str> {
        T::schema_name()
    }

    fn schema_id() -> Cow<'static, str> {
        T::schema_id()
    }

    fn json_schema(r#gen: &mut schemars::SchemaGenerator) -> Schema {
        T::json_schema(r#gen)
    }
}

impl<T> Display for WithRawRepr<T> {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.raw)
    }
}

impl<L> RawRepr for WithRawRepr<L> {
    fn raw(&self) -> &str {
        &self.raw
    }
}

impl<T: FromStr> FromStr for WithRawRepr<T> {
    type Err = <T as FromStr>::Err;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let parsed: T = s.parse()?;
        Ok(WithRawRepr {
            raw: s.trim().to_string(),
            parsed,
        })
    }
}

impl<T> Serialize for WithRawRepr<T> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        // Only serialize the `raw` field as "value"
        serializer.serialize_str(&self.raw)
    }
}

struct WithRawReprVisitor<T> {
    _marker: std::marker::PhantomData<T>,
}

impl<'de, T: FromStr> Visitor<'de> for WithRawReprVisitor<T>
where
    <T as FromStr>::Err: std::fmt::Display,
{
    type Value = WithRawRepr<T>;

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a properly formatted quantity with 'value [unit]'")
    }

    fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
    where
        E: Error,
    {
        Ok(v.parse::<WithRawRepr<T>>().map_err(|e| E::custom(e))?)
    }
}

impl<'de, T> Deserialize<'de> for WithRawRepr<T>
where
    T: FromStr,
    <T as FromStr>::Err: std::fmt::Display,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        deserializer.deserialize_str(WithRawReprVisitor {
            _marker: std::marker::PhantomData,
        })
    }
}

// #[typetag::serde(tag = "type")]
// pub trait DynQuantity: DynClone + Debug {
//     fn si_value(&self) -> f64;
// }
// dyn_clone::clone_trait_object!(DynQuantity);

// pub fn parse_quantity(
//     raw: &str,
//     r#type: &str,
// ) -> Result<WithRawRepr<Box<dyn QuantityTrait>>, ParseQuantityError> {
//     match r#type {
//         "speed" => raw.parse()
//     }
// }
//
// impl JsonSchema for dyn QuantityTrait {
//     fn schema_name() -> Cow<'static, str> {
//         "Quantity".into()
//     }
//
//     fn json_schema(generator: &mut schemars::SchemaGenerator) -> Schema {
//         json_schema!({
//             "title": "Quantity",
//             "description": "A physical quantity with a unit. If no unit is specified, the default unit is used.",
//             "oneOf": [
//                 {
//                     "type": "string",
//                     "pattern": QUANTITY_PATTERN
//                 },
//                 {
//                     "type": "number"
//                 }
//             ]
//         })
//     }
// }

pub trait QuantityTrait: Clone + Debug + FromStr {
    // fn name(&self) -> Cow<'static, str> {
    // }
    // fn default_unit(&self) -> Cow<'static, str>;
    fn description() -> Cow<'static, str> {
        format!("A {}.", Self::name().to_lowercase()).into()
    }

    fn name() -> Cow<'static, str> {
        Self::type_id().split('_').map(ucfirst).join(" ").into()
    }

    fn type_id() -> Cow<'static, str>;

    fn si_value(&self) -> f64;
}

const PARTIAL_QUANTITY_PATTERN: &str =
    r"\s*([+-]?[\d_ ]*\.?[\d_ ]+?(?:e(?:\+|-)?[.\d]+)?)[ \t]*([^\d\s.](?:.*?[^.])?)?\s*";

pub const NO_REF_QUANTITY_PATTERN: &str = formatcp!("^{PARTIAL_QUANTITY_PATTERN}$");

const PARTIAL_REFERENCE_PATTERN: &str = concatcp!(r"\s*(reference|ref)?", PARTIAL_QUANTITY_PATTERN);
pub const QUANTITY_PATTERN: &str = formatcp!("^{PARTIAL_REFERENCE_PATTERN}$");

pub const RANGE_PATTERN: &str =
    formatcp!(r"^{PARTIAL_QUANTITY_PATTERN}\s*..\s*{PARTIAL_QUANTITY_PATTERN}$");

lazy_static! {
    pub static ref QUANTITY_RE: Regex = Regex::new(QUANTITY_PATTERN).unwrap();
}

pub fn get_unit(quantity: &str) -> Option<&str> {
    Some(QUANTITY_RE.captures(quantity)?.get(3)?.as_str())
}

#[derive(Debug, Error)]
pub enum ParseQuantityError {
    #[error("invalid quantity format : '{0}', should be 'value [unit]'")]
    InvalidFormat(String),
    #[error("this quantity can't be a reference, please remove the 'ref' or 'reference' keyword")]
    NoReference,
    #[error("invalid unit format: {0}")]
    InvalidUnitFormat(#[from] FormatUnitError),
    #[error("quantity not recognized: '{0}'")]
    Unrecognized(String),
}

#[derive(Debug, DerefMut, Deref, Clone, PartialEq, PartialOrd)]
pub struct Quantity<T: QuantityTrait>(T);

pub trait QuantitySchema {
    fn type_id() -> Cow<'static, str>;

    fn description() -> Cow<'static, str> {
        format!("A {}.", Self::type_id()).into()
    }
}

impl<T: QuantityTrait> JsonSchema for Quantity<T> {
    fn schema_name() -> Cow<'static, str> {
        T::type_id()
    }

    fn json_schema(generator: &mut schemars::SchemaGenerator) -> Schema {
        json_schema!({
            "title": ucfirst(&T::name()),
            "description": T::description(),
            "oneOf": [
                {
                    "type": "string",
                    "pattern": QUANTITY_PATTERN
                },
                {
                    "type": "number"
                }
            ]
        })
    }
}

impl<T: QuantityTrait + PartialEq> PartialEq<T> for Quantity<T> {
    fn eq(&self, other: &T) -> bool {
        self.0 == *other
    }
}

static UNITS: LazyLock<HashMap<Cow<'static, str>, Cow<'static, str>>> =
    LazyLock::new(|| [("length".into(), "m".into())].into());

impl<T: QuantityTrait> FromStr for Quantity<T>
where
    <T as FromStr>::Err: std::fmt::Display,
{
    type Err = ParseQuantityError;
    fn from_str(raw: &str) -> Result<Self, Self::Err> {
        if let Some(captures) = QUANTITY_RE.captures(raw) {
            if captures.get(1).is_some() {
                return Err(ParseQuantityError::NoReference);
            }
            let mut unit: String = UNITS
                .get(&T::type_id())
                .cloned()
                .unwrap_or_else(|| "".into())
                .to_string();
            if let Some(u) = captures.get(3) {
                unit = format_unit(u.as_str())?;
            }

            let value = &captures[2];
            let mut pretty_value = String::with_capacity(value.len());
            let mut prepped_value = String::with_capacity(value.len());

            for c in value.chars() {
                match c {
                    ' ' => pretty_value.push(' '),
                    '_' => pretty_value.push(' '),
                    _ => {
                        pretty_value.push(c);
                        prepped_value.push(c);
                    }
                }
            }

            let prepped_raw = format!("{} {}", prepped_value, &unit);

            Ok(Quantity(prepped_raw.parse().map_err(
                |e: <T as FromStr>::Err| ParseQuantityError::Unrecognized(e.to_string()),
            )?))
            //     raw: format!(
            //         "{}{}{}",
            //         pretty_value,
            //         if unit.len() > 0 { " " } else { "" },
            //         &unit
            //     ),
            // })
        } else {
            Err(ParseQuantityError::InvalidFormat(raw.to_string()))
        }
    }
}

// impl<T: QuantityTrait> QuantityTrait for Quantity<T> {
//     const DEFAULT_UNIT: &str = T::DEFAULT_UNIT;
//
//     const NAME: &str = T::DEFAULT_UNIT;
//
//     fn si_value(&self) -> f64 {
//         self.0.si_value()
//     }
// }

// impl<T: QuantityTrait> JsonSchema for Quantity<T> {
//     fn schema_name() -> Cow<'static, str> {
//         T::schema_name()
//     }
//
//     fn json_schema(generator: &mut schemars::SchemaGenerator) -> Schema {
//         T::json_schema(generator)
//     }
// }

// impl<T> WithRawRepr<T>
// where
//     T: FromStr<Err = UomParseError> + QuantityTrait,
// {
//     // Constructor to create a new ParsedValue
//     pub fn new(raw: &str) -> Result<Self, ParseQuantityError> {
//         if let Some(captures) = QUANTITY_RE.captures(raw) {
//             if captures.get(1).is_some() {
//                 return Err(ParseQuantityError::NoReference);
//             }
//             let mut unit: String = T::DEFAULT_UNIT.to_string();
//             if let Some(u) = captures.get(3) {
//                 unit = format_unit(u.as_str())?;
//             }
//
//             let value = &captures[2];
//             let mut pretty_value = String::with_capacity(value.len());
//             let mut prepped_value = String::with_capacity(value.len());
//
//             for c in value.chars() {
//                 match c {
//                     ' ' => pretty_value.push(' '),
//                     '_' => pretty_value.push(' '),
//                     _ => {
//                         pretty_value.push(c);
//                         prepped_value.push(c);
//                     }
//                 }
//             }
//
//             let prepped_raw = format!("{} {}", prepped_value, &unit);
//
//             Ok(WithRawRepr {
//                 parsed: prepped_raw.parse()?,
//                 raw: format!(
//                     "{}{}{}",
//                     pretty_value,
//                     if unit.len() > 0 { " " } else { "" },
//                     &unit
//                 ),
//             })
//         } else {
//             Err(ParseQuantityError::InvalidFormat(raw.to_string()))
//         }
//     }
//
//     /// Getter for the parsed quantity
//     pub fn parsed(&self) -> &T {
//         &self.parsed
//     }
//
//     /// Raw representation of the quantity as written by the user
//     pub fn raw(&self) -> &str {
//         &self.raw
//     }
// }

use uom::si::f64 as si;

pub trait DefaultUnit {
    const DEFAULT_UNIT: &str;
}

pub trait QuantityId {
    const QUANTITY_ID: &str;
}

/// Ratio (unit less value resulting from calculating the ratio of two quantities)
pub type Ratio = WithRawRepr<si::Ratio>;

impl DefaultUnit for si::Ratio {
    const DEFAULT_UNIT: &str = "";
}

/// Area (default: km²)
pub type Area = WithRawRepr<Quantity<si::Area>>;

impl QuantitySchema for si::Area {
    fn type_id() -> Cow<'static, str> {
        "area".into()
    }
}

impl QuantityTrait for si::Area {
    fn type_id() -> Cow<'static, str> {
        "area".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::area::square_meter>()
    }
}

/// # CustomQuantity
/// This allows defining custom quantities based on
/// the seven base quantities of the international system.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
pub struct CustomQuantity {
    #[serde(default)]
    pub length: isize,
    #[serde(default)]
    pub time: isize,
    #[serde(default)]
    pub mass: isize,
    #[serde(default)]
    pub current: isize,
    #[serde(default)]
    pub temperature: isize,
    #[serde(default)]
    pub amount: isize,
    #[serde(default)]
    pub luminous_intensity: isize,
    #[serde(default)]
    pub value: f64,
}

/// # Quantity
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(tag = "type", content = "value")]
#[serde(rename_all = "snake_case")]
pub enum QuantityEnum {
    Speed(Speed),
    Length(Length),
    Area(Area),
    Volume(Volume),
    Mass(Mass),
    Temperature(Temperature),
    DiffusionCoefficient(DiffusionCoefficient),
    Custom(CustomQuantity),
}

impl QuantityEnum {
    pub fn si_value(&self) -> f64 {
        match self {
            QuantityEnum::Speed(q) => q.value,
            QuantityEnum::Length(q) => q.value,
            QuantityEnum::DiffusionCoefficient(q) => q.value,
            QuantityEnum::Area(q) => q.value,
            QuantityEnum::Mass(q) => q.value,
            QuantityEnum::Volume(q) => q.value,
            QuantityEnum::Temperature(q) => q.value,
            QuantityEnum::Custom(q) => q.value,
        }
    }
}
//
// impl Deref for QuantityEnum {
//     type Target = dyn QuantityTrait;
//
//     fn deref(&self) -> &Self::Target {
//         todo!()
//     }
//
// }

// impl QuantityEnum {
//     pub fn si_value(&self) -> f64 {
//         match self {
//             QuantityEnum::Speed(v) => v.si_value(),
//         }
//     }
// }

pub type DiffusionCoefficient = WithRawRepr<Quantity<si::DiffusionCoefficient>>;
// impl DynQuantity for si::DiffusionCoefficient {
//     fn si_value(&self) -> f64 {
//         self.get::<uom::si::diffusion_coefficient::square_meter_per_second>()
//     }
// }
impl QuantityTrait for si::DiffusionCoefficient {
    fn type_id() -> Cow<'static, str> {
        "diffusion_coefficient".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::diffusion_coefficient::square_meter_per_second>()
    }
}

// /// Compressibility (default: Pa⁻¹)
// pub type Compressibility = Quantity<si::Compressibility>;
//
// impl DefaultUnit for si::Compressibility {
//     const DEFAULT_UNIT: &str = "Pa⁻¹";
// }

// /// HydraulicPermeability (default: darcy)
// pub type HydraulicPermeability = Quantity<si::HydraulicPermeability>;
//
// impl DefaultUnit for si::HydraulicPermeability {
//     const DEFAULT_UNIT: &str = "mD";
// }

/// Length (default: kilometers, since distances in geoscience are often measured in km)
pub type Length = WithRawRepr<Quantity<si::Length>>;

// impl DefaultUnit for si::Length {
//     const DEFAULT_UNIT: &str = "km";
// }
impl QuantityTrait for si::Length {
    fn type_id() -> Cow<'static, str> {
        "length".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::length::meter>()
    }
}

impl QuantitySchema for si::Length {
    fn type_id() -> Cow<'static, str> {
        "length".into()
    }
}

impl Quantity<si::Length> {
    pub fn meters(&self) -> f64 {
        self.get::<uom::si::length::meter>()
    }
}

pub type Speed = WithRawRepr<Quantity<si::Velocity>>;

// impl DefaultUnit for si::Velocity {
//     const DEFAULT_UNIT: &str = "m/s";
// }
// impl<T: QuantityTrait> SchemaId for T {
//     fn schema_id() -> Cow<'static, str> {
//         T::NAME.into()
//     }
// }

impl<T: SchemaId> SchemaId for WithRawRepr<T> {
    fn schema_id() -> Cow<'static, str> {
        T::schema_id()
    }
}

impl QuantityTrait for si::Velocity {
    fn si_value(&self) -> f64 {
        self.get::<uom::si::velocity::meter_per_second>()
    }

    fn type_id() -> Cow<'static, str> {
        "speed".into()
    }
}

impl QuantitySchema for si::Velocity {
    fn type_id() -> Cow<'static, str> {
        "speed".into()
    }
}

/// Mass (default: grams, since small mass quantities in geoscience, especially in analysis, use grams)
pub type Mass = WithRawRepr<Quantity<si::Mass>>;

impl QuantityTrait for si::Mass {
    fn type_id() -> Cow<'static, str> {
        "mass".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::mass::gram>()
    }
}

impl DefaultUnit for si::Mass {
    const DEFAULT_UNIT: &str = "g";
}

/// Time (default: seconds)
pub type Time = WithRawRepr<Quantity<si::Time>>;
impl Quantity<si::Time> {
    pub fn seconds(&self) -> f64 {
        self.si_value()
    }
}
impl QuantitySchema for si::Time {
    fn type_id() -> Cow<'static, str> {
        "time".into()
    }
}
impl QuantityTrait for si::Time {
    fn type_id() -> Cow<'static, str> {
        "time".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::time::second>()
    }
}

/// Temperature (default: Celsius, as temperature is often measured in Celsius in geoscience contexts)
pub type Temperature = WithRawRepr<Quantity<si::ThermodynamicTemperature>>;

impl DefaultUnit for si::ThermodynamicTemperature {
    const DEFAULT_UNIT: &'static str = "°C";
}

impl QuantityTrait for si::ThermodynamicTemperature {
    fn type_id() -> Cow<'static, str> {
        "temperature".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::thermodynamic_temperature::kelvin>()
    }
}

/// Pressure (default: pascal, as pressure is often measured in pascal in scientific contexts)
pub type Pressure = WithRawRepr<Quantity<si::Pressure>>;

impl DefaultUnit for si::Pressure {
    const DEFAULT_UNIT: &'static str = "Pa";
}

impl QuantityTrait for si::Pressure {
    fn type_id() -> Cow<'static, str> {
        "pressure".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::pressure::pascal>()
    }
}

/// Volume (default: cubic meters, which is the SI unit for volume)
pub type Volume = WithRawRepr<Quantity<si::Volume>>;

impl DefaultUnit for si::Volume {
    const DEFAULT_UNIT: &'static str = "m³";
}

impl QuantityTrait for si::Volume {
    fn type_id() -> Cow<'static, str> {
        "volume".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::volume::cubic_meter>()
    }
}

/// Molar Mass (default: grams per mole, as it's commonly used in geoscience)
pub type MolarMass = WithRawRepr<Quantity<si::MolarMass>>;

impl DefaultUnit for si::MolarMass {
    const DEFAULT_UNIT: &'static str = "g/mol";
}

impl QuantityTrait for si::MolarMass {
    fn type_id() -> Cow<'static, str> {
        "molar_mass".into()
    }
    fn si_value(&self) -> f64 {
        self.get::<uom::si::molar_mass::gram_per_mole>()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::str::FromStr;

    use crate::codegen::input_schema::quantity::Time;

    use super::{DefaultUnit, Pressure, QUANTITY_RE, WithRawRepr};
    use std::fmt::Debug;
    use uom::si::{f64::Length, length::*};

    fn make_parsed<L>(raw: &str, parsed: L) -> WithRawRepr<L>
    where
        L: FromStr,
    {
        WithRawRepr {
            raw: raw.to_string(),
            parsed,
        }
    }

    #[test]
    fn parse_length_with_valid_input() {
        fn make_length(raw: &str) -> super::Length {
            raw.parse().unwrap()
        }
        assert_eq!(
            make_length("10 m"),
            make_parsed("10 m", Quantity(Length::new::<meter>(10.)))
        );
        // assert_eq!(
        //     make_length("10m"),
        //     make_parsed("10 m", Quantity(Length::new::<meter>(10.)))
        // );
        // assert_eq!(
        //     make_length("10     m"),
        //     make_parsed("10 m", Quantity(Length::new::<meter>(10.)))
        // );
        // assert_eq!(
        //     make_length("10"),
        //     make_parsed("10 km", Quantity(Length::new::<kilometer>(10.)))
        // );
        assert_eq!(
            make_length("100 000 m"),
            make_parsed("100 000 m", Quantity(Length::new::<kilometer>(100.)))
        );
        assert_eq!(
            make_length("1 meter"),
            make_parsed("1 meter", Quantity(Length::new::<meter>(1.)))
        );
        assert_eq!(
            make_length("2 meters"),
            make_parsed("2 meters", Quantity(Length::new::<meter>(2.)))
        );
        assert_eq!(
            make_length("-1"),
            make_parsed("-1", Quantity(Length::new::<meter>(-1.)))
        );
        // assert_eq!(
        //     super::Compressibility::new("1e-09 Pa-1").expect("Valid quantity should be parsed."),
        //     Quantity {
        //         parsed: uom::si::f64::Compressibility::new::<uom::si::compressibility::pascal>(
        //             1e-09
        //         ),
        //         raw: "1e-09 Pa⁻¹".to_string()
        //     }
        // );
    }
    #[test]
    fn parse_length_with_invalid_input() {
        fn attempt_length_parse(raw: &str) {
            let result = raw.parse::<super::Length>();
            assert!(result.is_err(), "Expected error for input '{}'", raw);
        }

        attempt_length_parse("ten m"); // Invalid number format
        attempt_length_parse("10 xyz"); // Unrecognized unit
        attempt_length_parse(""); // Empty string
        //attempt_length_parse("10 10 m"); // Invalid format
        attempt_length_parse("reference m"); // Missing number
    }

    #[test]
    fn parse_reference_should_err() {
        let raw = "reference 5 000 000";
        assert!(raw.parse::<Pressure>().is_err());
    }

    #[test]
    fn parse_real_number() {
        let raw = "0.1 s";
        let time: Time = raw.parse().unwrap();
        assert_eq!(time.parsed.get::<uom::si::time::second>(), 0.1)
    }

    #[test]
    fn test_re() {
        assert!(QUANTITY_RE.captures("0.1 s").is_some())
    }
}
