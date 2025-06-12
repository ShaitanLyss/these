use super::quantity::QUANTITY_RE;
use schemars::
    JsonSchema
;
use std::str::FromStr;

use serde::{Deserialize, Serialize, de::Error};
use std::error::Error as StdError;
use thiserror::Error;

use super::RawRepr;

#[derive(Debug, Clone, PartialEq, JsonSchema)]
pub struct WithReference<T> {
    reference: bool,
    value: T,
    raw: String,
}

// impl<T> JsonSchema for WithReference<T> {
//     fn schema_name() -> Cow<'static, str> {
//         Cow::from("ReferenceQuantity")
//     }
//
//     fn json_schema(_gen: &mut schemars::SchemaGenerator) -> schemars::Schema {
//         let mut schema = Schema::default();
//         //schema.instance_type = Some(SingleOrVec::Single(Box::new(InstanceType::String)));
//         schema.subschemas = Some(Box::new(SubschemaValidation {
//             one_of: Some(vec![
//                 // Schema for string type
//                 Schema::Object(SchemaObject {
//                     instance_type: Some(SingleOrVec::Single(Box::new(InstanceType::String))),
//                     string: Some(Box::new(StringValidation {
//                         pattern: Some(QUANTITY_PATTERN.to_string()),
//                         ..Default::default()
//                     })),
//                     ..Default::default()
//                 }),
//                 // Schema for number type
//                 Schema::Object(SchemaObject {
//                     instance_type: Some(SingleOrVec::Single(Box::new(InstanceType::Number))),
//                     ..Default::default()
//                 }),
//             ]),
//             ..Default::default()
//         }));
//
//         schema
//     }
// }
impl<T> RawRepr for WithReference<T> {
    fn raw(&self) -> &str {
        &self.raw
    }
}

//const REFERENCE_PATTERN: &str = r"^\s*(?:(reference|ref)\s)?\s*([^\s].*?)\s*$";

//lazy_static! {
//    static ref REFERENCE_RE: Regex = Regex::new(formatcp!(r"^{QUANTITY_RE}"))
//        .expect("Builtin regex should be valid");
//}

#[derive(Debug, Error)]
pub enum ParseReferenceError<E: std::error::Error> {
    #[error("invalid format, it should be [REF|REFERENCE] value")]
    InvalidFormat,
    #[error("invalid value: {0}")]
    InvalidValue(#[from] E),
}

impl<T: FromStr> FromStr for WithReference<T>
where
    T::Err: StdError,
{
    type Err = ParseReferenceError<T::Err>;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if let Some(captures) = QUANTITY_RE.captures(s) {
            let reference = captures.get(1).is_some();
            let value = &captures[2];
            Ok(WithReference {
                raw: captures
                    .get(1)
                    .map(|c| c.as_str())
                    .unwrap_or("")
                    .to_string(),
                reference,
                value: value.parse()?,
            })
        } else {
            Err(ParseReferenceError::InvalidFormat)
        }
    }
}

impl<T: ToString> Serialize for WithReference<T> {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut prefix = String::from("");
        if self.reference {
            prefix += &self.raw[..];
            prefix += " ";
        }
        serializer.serialize_str(&format!("{prefix}{}", self.value.to_string()))
    }
}

impl<'de, T: FromStr> Deserialize<'de> for WithReference<T>
where
    T::Err: StdError,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let raw: String = Deserialize::deserialize(deserializer)?;
        raw.parse().map_err(|e| D::Error::custom(e))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_yaml;
    use std::str::FromStr;

    #[derive(Debug, PartialEq, Serialize, Deserialize)]
    struct TestValue(i32);

    impl FromStr for TestValue {
        type Err = std::num::ParseIntError;

        fn from_str(s: &str) -> Result<Self, Self::Err> {
            s.parse::<i32>().map(TestValue)
        }
    }

    impl ToString for TestValue {
        fn to_string(&self) -> String {
            return self.0.to_string();
        }
    }

    #[test]
    fn test_parse_with_reference() {
        let input = "ref 42";
        let result: Result<WithReference<TestValue>, _> = input.parse();
        assert!(result.is_ok());

        let parsed = result.unwrap();
        assert_eq!(parsed.raw, "ref");
        assert!(parsed.reference);
        assert_eq!(parsed.value, TestValue(42));
    }

    #[test]
    fn test_parse_without_reference() {
        let input = " 42";
        let result: Result<WithReference<TestValue>, _> = input.parse();
        assert!(result.is_ok());

        let parsed = result.unwrap();
        assert_eq!(parsed.raw, "");
        assert!(!parsed.reference);
        assert_eq!(parsed.value, TestValue(42));
    }

    #[test]
    fn test_parse_invalid_format() {
        let input = "invalid_format";
        let result: Result<WithReference<TestValue>, _> = input.parse();
        assert!(result.is_err());
    }

    #[test]
    fn test_serialize_with_reference() {
        let value = WithReference {
            raw: "ref".to_string(),
            reference: true,
            value: 42,
        };

        let serialized = serde_yaml::to_string(&value).unwrap();
        assert_eq!(serialized.trim(), "ref 42");
    }
    //
    #[test]
    fn test_serialize_without_reference() {
        let value = WithReference {
            raw: "".to_string(),
            reference: false,
            value: 42,
        };

        let serialized = serde_yaml::to_string(&value).unwrap();
        assert_eq!(serialized.trim(), "'42'");
    }
    #[test]
    fn test_serialize_with_reference_with_prefix() {
        let value = WithReference {
            raw: "reference".to_string(),
            reference: true,
            value: 100,
        };

        let serialized = serde_yaml::to_string(&value).unwrap();
        assert_eq!(serialized.trim(), "reference 100");
    }

    #[test]
    fn test_serialize_with_empty_string_value() {
        let value = WithReference {
            raw: "".to_string(),
            reference: false,
            value: "",
        };

        let serialized = serde_yaml::to_string(&value).unwrap();
        assert_eq!(serialized.trim(), "''");
    }

    #[test]
    fn test_serialize_with_special_characters() {
        let value = WithReference {
            raw: "ref".to_string(),
            reference: true,
            value: "!@#$%^&*()",
        };

        let serialized = serde_yaml::to_string(&value).unwrap();
        assert_eq!(serialized.trim(), "ref !@#$%^&*()");
    }

    #[test]
    fn test_serialize_with_complex_value() {
        let value = WithReference {
            raw: "".to_string(),
            reference: false,
            value: TestValue(12345),
        };

        let serialized = serde_yaml::to_string(&value).unwrap();
        assert_eq!(serialized.trim(), "'12345'");
    }
}
