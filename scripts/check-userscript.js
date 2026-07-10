const fs = require("node:fs");
const path = require("node:path");

const scriptPath = path.join(__dirname, "..", "linkedin-auto-expand.user.js");
const source = fs.readFileSync(scriptPath, "utf8");

const requiredHeaders = [
  "// ==UserScript==",
  "// @name         LinkedIn Auto Expand",
  "// @version      1.0.0",
  "// @match        https://www.linkedin.com/*",
  "// @match        https://linkedin.com/*",
  "// @grant        none",
  "// ==/UserScript==",
];

const missingHeaders = requiredHeaders.filter((header) => !source.includes(header));

if (missingHeaders.length > 0) {
  console.error("Missing required userscript headers:");
  for (const header of missingHeaders) {
    console.error(`- ${header}`);
  }
  process.exit(1);
}

if (!source.includes("MutationObserver")) {
  console.error("Expected MutationObserver support for LinkedIn dynamic navigation.");
  process.exit(1);
}

if (!source.includes("EXPAND_TEXT_PATTERNS")) {
  console.error("Expected explicit expand text patterns.");
  process.exit(1);
}

console.log("Userscript metadata check passed.");
