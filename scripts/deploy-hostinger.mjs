/**
 * Deploy to Hostinger Node.js hosting via the Hostinger API.
 * Uses axios + form-data (same libs as hostinger-api-mcp) to bypass Cloudflare bot protection.
 *
 * Flow: upload archive (TUS) -> auto-detect build settings -> trigger Node.js build
 *
 * Usage: node scripts/deploy-hostinger.mjs <archive-path>
 * Env:   HOSTINGER_API_TOKEN, HOSTINGER_DOMAIN, HOSTINGER_USERNAME
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const axios = require("axios");
const FormData = require("form-data");
import fs from "fs";
import path from "path";

const API_BASE = "https://developers.hostinger.com";
const TOKEN = process.env.HOSTINGER_API_TOKEN;
const DOMAIN = process.env.HOSTINGER_DOMAIN;
const USERNAME = process.env.HOSTINGER_USERNAME;
const ARCHIVE_PATH = process.argv[2];

if (!TOKEN) { console.error("Missing HOSTINGER_API_TOKEN"); process.exit(1); }
if (!DOMAIN) { console.error("Missing HOSTINGER_DOMAIN"); process.exit(1); }
if (!USERNAME) { console.error("Missing HOSTINGER_USERNAME"); process.exit(1); }
if (!ARCHIVE_PATH) { console.error("Missing archive path argument"); process.exit(1); }
if (!fs.existsSync(ARCHIVE_PATH)) { console.error(`Archive not found: ${ARCHIVE_PATH}`); process.exit(1); }

const archiveSize = (fs.statSync(ARCHIVE_PATH).size / 1024).toFixed(0);
const archiveBasename = path.basename(ARCHIVE_PATH);
console.log(`Archive: ${ARCHIVE_PATH} (${archiveSize} KB)`);
console.log(`Domain: ${DOMAIN} | Username: ${USERNAME}`);

const authHeaders = {
  "Authorization": `Bearer ${TOKEN}`,
  "Accept": "application/json",
  "User-Agent": "hostinger-api-mcp/0.2.20",
};

// Step 1: Get upload credentials
console.log("1/3 Fetching upload credentials...");
const credsRes = await axios.post(
  `${API_BASE}/api/hosting/v1/files/upload-urls`,
  { username: USERNAME, domain: DOMAIN },
  { headers: authHeaders }
);
const { url: uploadBaseUrl, auth_key: authKey, rest_auth_key: restAuthKey } = credsRes.data;

// Step 2: Upload via TUS (POST to create slot, PATCH to send bytes)
console.log(`2/3 Uploading ${archiveBasename} (${archiveSize} KB)...`);
const tusUrl = `${uploadBaseUrl.replace(/\/$/, "")}/${archiveBasename}?override=true`;
const stats = fs.statSync(ARCHIVE_PATH);
const tusHeaders = {
  "X-Auth": authKey,
  "X-Auth-Rest": restAuthKey,
  "upload-length": String(stats.size),
  "upload-offset": "0",
};

await axios.post(tusUrl, "", {
  headers: tusHeaders,
  validateStatus: (s) => s === 201,
  timeout: 60000,
});

const fileBuffer = fs.readFileSync(ARCHIVE_PATH);
await axios.patch(tusUrl, fileBuffer, {
  headers: {
    ...tusHeaders,
    "Content-Type": "application/offset+octet-stream",
    "Content-Length": String(stats.size),
  },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  timeout: 120000,
});
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

const buildRes = await axios.post(
  `${API_BASE}/api/hosting/v1/accounts/${USERNAME}/websites/${DOMAIN}/nodejs/builds`,
  buildPayload,
  { headers: authHeaders }
);

console.log(`Build triggered: uuid=${buildRes.data.uuid} state=${buildRes.data.state}`);
console.log("Deploy initiated successfully. Monitor at: hpanel.hostinger.com");
