mod oarsub;
use std::sync::LazyLock;

use entity::job::{self, JobScheduler, JobStatus};
use regex::Regex;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum SchedulerError {}

use job::JobScheduler::*;

pub trait Scheduler {
    fn create_job_cmd(&self, config: SchedulerJobConfig) -> String;

    fn parse_job_id(&self, response: &str) -> Option<String>;

    fn job_status_cmd(&self, job_id: &str) -> String;
    fn parse_job_status(&self, response: &str) -> Option<JobStatus>;
}

#[derive(Default)]
pub struct SchedulerJobConfig<'a> {
    pub command: &'a str,
    pub name: Option<&'a str>,
    pub num_nodes: Option<i32>,
    pub cluster: Option<&'a str>,
    pub queue: Option<&'a str>,
    pub walltime: Option<&'a str>,
    pub dir: Option<&'a str>,
}

impl Scheduler for JobScheduler {
    fn create_job_cmd(
        &self,
        SchedulerJobConfig {
            command,
            dir,
            name,
            num_nodes,
            cluster,
            queue,
            walltime,
        }: SchedulerJobConfig<'_>,
    ) -> String {
        match self {
            Oarsub => {
                let mut res = String::from("oarsub");

                if let Some(name) = name {
                    res += &format!(" -n {name}");
                }

                if let Some(dir) = dir {
                    res += &format!(" -d {dir}");
                }

                if let Some(queue) = queue {
                    res += &format!(" -q {queue}");
                }

                if let Some(cluster) = cluster {
                    res += &format!(" -p {cluster}");
                }

                // Collect -l args
                let mut args: Vec<String> = Vec::new();

                if let Some(num_nodes) = num_nodes {
                    args.push(format!("nodes={num_nodes}"));
                }

                let walltime = walltime.unwrap_or("2");
                args.push(format!("walltime={walltime}"));

                if !args.is_empty() {
                    res += &format!(" -l {}", args.join(","));
                }

                res += &format!(" \"{}\"", command);

                res
            }
        }
    }

    fn parse_job_id(&self, response: &str) -> Option<String> {
        match self {
            Oarsub => OARSUB_PARSE_ID_RE
                .captures(response)
                .and_then(|cap| cap.get(1).map(|m| m.as_str().to_string())),
        }
    }

    fn job_status_cmd(&self, job_id: &str) -> String {
        format!(r"oarstat -j {job_id} -f | grep -e exit_code -e 'state\s*='")
    }

    fn parse_job_status(&self, response: &str) -> Option<JobStatus> {
        if response.contains("Running") {
            Some(JobStatus::Running)
        } else if response.contains("Waiting") {
            Some(JobStatus::Queued)
        } else if response.contains("Terminated") {
            if let Some(exit_code) = OARSUB_EXIT_CODE_RE.captures(response) {
                let exit_code = exit_code[1].parse::<i32>().expect("valid integer");

                if exit_code == 0 {
                    Some(JobStatus::Finished)
                } else {
                    Some(JobStatus::Failed)
                }
            } else {
                Some(JobStatus::Finished)
            }
        } else if response.contains("Error") {
            Some(JobStatus::SchedulerError)
        } else if response.contains("Failed") {
            Some(JobStatus::Failed)
        } else if response.contains("Finishing") {
            Some(JobStatus::Finishing)
        } else {
            None
        }
    }
}

static OARSUB_PARSE_ID_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"OAR_JOB_ID=?\s*(\d*)").unwrap());

static OARSUB_EXIT_CODE_RE: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"exit_code\s*=\s*(\d*)").unwrap());

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn oarsub_create_job() {
        let cmd = Oarsub.create_job_cmd(SchedulerJobConfig {
            name: Some("billie"),
            dir: Some("eillish"),
            command: "mpirun ilomilo",
            num_nodes: Some(12),
            cluster: Some("grvingt"),
            queue: Some("abaca"),
            walltime: Some("0:30"),
        });

        assert_eq!(
            "oarsub -n billie -d eillish -q abaca -p grvingt -l nodes=12,walltime=0:30 \"mpirun ilomilo\"",
            cmd
        );
    }

    #[test]
    fn oarsub_parse_job_id() {
        let response = "# Setting queue to: p3
# Set walltime to default (3600 s).
OAR_JOB_ID=5548155
# Interactive mode: waiting...";

        assert_eq!(Some("5548155"), Oarsub.parse_job_id(response).as_deref());
    }

    #[test]
    fn oarsub_job_status() {
        let response = "5636368: Waiting";
        assert_eq!(Some(JobStatus::Queued), Oarsub.parse_job_status(response));
    }

    #[test]
    fn oarsub_failed_job_status() {
        let response = "state = Terminated
    exit_code = 512 (2,0,0)";
        assert_eq!(Some(JobStatus::Failed), Oarsub.parse_job_status(response));
    }
}
