import { existsSync, readFileSync } from "node:fs";

const API_BASE = "https://api.cron-job.org";
const JOB_TITLE = "VitaeSpark pending CV recovery";

loadEnvFile(".env.local");
loadEnvFile(".env");

const cronJobApiKey = requireEnv("CRON_JOB_API_KEY");
const cronSecret = requireEnv("CRON_SECRET");
const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL").replace(/\/+$/, "");
const jobUrl = `${siteUrl}/api/cron/recover-pending-cvs`;

const headers = {
  Authorization: `Bearer ${cronJobApiKey}`,
  "Content-Type": "application/json",
};

const desiredJob = {
  title: JOB_TITLE,
  url: jobUrl,
  enabled: true,
  saveResponses: true,
  requestTimeout: 300,
  redirectSuccess: false,
  requestMethod: 1,
  schedule: {
    timezone: "America/Argentina/Buenos_Aires",
    expiresAt: 0,
    hours: [-1],
    mdays: [-1],
    minutes: [15],
    months: [-1],
    wdays: [-1],
  },
  extendedData: {
    headers: {
      "x-cron-secret": cronSecret,
      "User-Agent": "cron-job.org/vitaespark",
    },
    body: "",
  },
};

const existingJob = await findExistingJob();

if (existingJob) {
  await request(`/jobs/${existingJob.jobId}`, {
    method: "PATCH",
    body: JSON.stringify({ job: desiredJob }),
  });

  console.log(
    `Updated cron-job.org job ${existingJob.jobId}: ${JOB_TITLE} -> ${jobUrl}`,
  );
} else {
  const created = await request("/jobs", {
    method: "PUT",
    body: JSON.stringify({ job: desiredJob }),
  });

  console.log(`Created cron-job.org job ${created.jobId}: ${JOB_TITLE} -> ${jobUrl}`);
}

async function findExistingJob() {
  const data = await request("/jobs", { method: "GET" });
  const jobs = Array.isArray(data.jobs) ? data.jobs : [];

  return (
    jobs.find((job) => job.title === JOB_TITLE) ??
    jobs.find((job) => job.url === jobUrl) ??
    null
  );
}

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : {};

  if (!res.ok) {
    throw new Error(
      `cron-job.org ${options.method} ${path} failed (${res.status}): ${JSON.stringify(data)}`,
    );
  }

  return data;
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const lines = readFileSync(path, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    process.env[key] = rawValue
      .trim()
      .replace(/^"(.*)"$/, "$1")
      .replace(/^'(.*)'$/, "$1");
  }
}
