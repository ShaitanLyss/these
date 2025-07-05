use hecate::{CodeGenError, SchemaValidationError};
use hecate_executor::{BoxError, ExecutorError};
use rmcp::Error as RmcpError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum JobError {
    #[error("job {0} not found")]
    JobNotFound(i64),
    #[error("invalid job config: {0}")]
    InvalidJobConfig(String),
    #[error("database error")]
    DatabaseError(#[from] sea_orm::DbErr),
    #[error("executor error: {0}")]
    ExecutorError(#[from] ExecutorError),
    #[error("failed to parse status from response, received: {0}")]
    ParsingStatusFailed(String),
    #[error("failed to generate source code")]
    CodeGenError(#[from] CodeGenError),
    #[error("input schema is invalid")]
    SchemaValidationError(#[from] SchemaValidationError),
    #[error("internal error")]
    InternalError(#[from] BoxError),
    #[error("JSON serialization failed")]
    JSONSerializationError(#[from] serde_json::Error),
    #[error("job execution failed")]
    ExecutionFailed(#[from] RunJobError),
    #[error("TODO")]
    NotImplemented,
}

use JobError::*;

use crate::job::workflow::RunJobError;

impl From<JobError> for rmcp::Error {
    fn from(err: JobError) -> Self {
        match err {
            JobNotFound(_) => RmcpError::resource_not_found(err.to_string(), None),
            InvalidJobConfig(_) | SchemaValidationError(_) => {
                RmcpError::invalid_params(err.to_string(), None)
            }
            _ => RmcpError::internal_error(err.to_string(), None),
        }
    }
}
