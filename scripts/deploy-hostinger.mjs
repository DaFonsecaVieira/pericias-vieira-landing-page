/**
 * Deploy script for Hostinger Node.js hosting.
 * Uses the Hostinger API to upload source archive and trigger a Node.js build.
 *
 * Flow:
 *  1. Get upload credentials (upload URL + auth tokens)
 *  2. Upload archive via TUS protocol
 *  3. Trigger Node.js build referencing the uploaded archive
 *
 * Usage: node scripts/deploy-hostinger.mjs <archive-path>
 * Env:   HOSTINGER_API_TOKEN, HOSTINGER_DOMAIN, HOSTINGER_USERNAME
 */

import fs from "fs";
import path from "path";
import { createReadStream, statSync } from "fs";

const API_BASE = "https://api.hostinger.com";
const TOKEN = process.env.HOSTINGER_API_TOKEN;
const DOMAIN = process.env.HOSTINGER_DOMAIN;
const USERNAME = process.env.HOSTINGER_USERNAME;
const ARCHIVE_PATH = process.argv[2];

if (!TOKEN) { console.error("Missing HOSTINGER_API_TOKEN"); process.exit(1); }
if (!DOMAIN) { console.error("Missing HOSTINGER_DOMAIN"); process.exit(1); }
if (!USERNAME) { console.error("Missing HOSTINGER_USERNAME"); process.exit(1); }
if (!ARCHIVE_PATH) { console.error("Missing archive path argument (usage: node deploy-hostinger.mjs <path>)"); process.exit(1); }

if (!fs.existsSync(ARCHIVE_PATH)) {
  console.error(`Archive not found: ${ARCHIVE_PATH}`);
  process.exit(1);
}

console.log(`Archive: ${ARCHIVE_PATH} (${(fs.statSync(ARCHIVE_PATH).size / 1024).toFixed(0)} KB)`);
console.log(`Domain: ${DOMAIN} | Username: ${USERNAME}`);

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

async function fetchJson(url, options = {}) {
  const res = await fetch(url, { ...options, headers: { ...headers, ...options.headers } });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${url}: ${JSON.stringify(data)}`);
  }
  return data;
}

// Step 1: Get upload credentials
console.log("1/3 Fetching upload credentials...");
const creds = await fetchJson(`${API_BASE}/api/hosting/v1/files/upload-urls`, {
  method: "POST",
  body: JSON.stringify({ username: USERNAME, domain: DOMAIN }),
});

const uploadUrl = creds.url;
const authKey = creds.auth_key;
const restAuthKey = creds.rest_auth_key;
const archiveBasename = path.basename(ARCHIVE_PATH);
const stats = statSync(ARCHIVE_PATH);

// Step 2: Upload via TUS (two-phase: POST to create + PATCH to send bytes)
console.log(`2/3 Uploading ${archiveBasename} (${(stats.size / 1024).toFixed(0)} KB)...`);
const tusUrl = `${uploadUrl.replace(/\/$/, "")}/${archiveBasename}?override=true`;
const tusHeaders = {
  "X-Auth": authKey,
  "X-Auth-Rest": restAuthKey,
  "upload-length": String(stats.size),
  "upload-offset": "0",
};

// Create upload slot
const createRes = await fetch(tusUrl, { method: "POST", headers: tusHeaders, body: "" });
if (createRes.status !== 201) {
  throw new Error(`TUS create failed: HTTP ${createRes.status}`);
}

// Send file bytes via PATCH
const fileBuffer = fs.readFileSync(ARCHIVE_PATH);
const patchRes = await fetch(tusUrl, {
  method: "PATCH",
  headers: {
    ...tusHeaders,
    "Content-Type": "application/offset+octet-stream",
    "Content-Length": String(stats.size),
  },
  body: fileBuffer,
});

if (patchRes.status !== 204 && patchRes.status !== 200) {
  throw new Error(`TUS patch failed: HTTP ${patchRes.status}`);
}
console.log("   Upload complete.");

// Step 3: Trigger Node.js build
console.log("3/3 Triggering Node.js build...");
const buildPayload = {
  node_version: 22,
  app_type: "next",
  build_script: "build",
  output_directory: ".next",
  package_manager: "npm",
  source_type: "archive",
  source_options: { archive_path: archiveBasename },
};

const buildResult = await fetchJson(
  `${API_BASE}/api/hosting/v1/accounts/${USERNAME}/websites/${DOMAIN}/nodejs/builds`,
  { method: "POST", body: JSON.stringify(buildPayload) }
);

console.log(`Build triggered: uuid=${buildResult.uuid} state=${buildResult.state}`);
console.log("Deploy initiated successfully. Monitor at: hpanel.hostinger.com");
