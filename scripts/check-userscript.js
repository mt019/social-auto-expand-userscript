const fs = require("node:fs");
const path = require("node:path");

const scriptPath = path.join(__dirname, "..", "linkedin-auto-expand.user.js");
const source = fs.readFileSync(scriptPath, "utf8");

const requiredHeaders = [
  "// ==UserScript==",
  "// @name         Social Auto Expand",
  "// @version      2.0.1",
  "// @match        https://www.linkedin.com/*",
  "// @match        https://linkedin.com/*",
  "// @match        https://www.facebook.com/*",
  "// @match        https://web.facebook.com/*",
  "// @match        https://m.facebook.com/*",
  "// @grant        none",
  "// ==/UserScript==",
];

const requiredCodeMarkers = [
  "SITE_PROFILES",
  "id: \"linkedin\"",
  "id: \"facebook\"",
  "MutationObserver",
  "COMMON_EXPAND_TEXT_PATTERNS",
  "preloadMoreContent",
];

const missingHeaders = requiredHeaders.filter((header) => !source.includes(header));
const missingCodeMarkers = requiredCodeMarkers.filter((marker) => !source.includes(marker));

if (missingHeaders.length > 0) {
  console.error("Missing required userscript headers:");
  for (const header of missingHeaders) {
    console.error(`- ${header}`);
  }
  process.exit(1);
}

if (missingCodeMarkers.length > 0) {
  console.error("Missing required implementation markers:");
  for (const marker of missingCodeMarkers) {
    console.error(`- ${marker}`);
  }
  process.exit(1);
}

console.log("Userscript metadata check passed.");
