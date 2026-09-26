#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { analyzeTools } from "./rules.js";
import { toMarkdown } from "./report.js";

function help() {
  console.log(`
AgentShield MCP Inspector Lite v0.1.0-lite.1

Usage:
  agentshield-lite scan-json <tools.json> [--json-out report.json] [--md-out report.md]

The Lite edition performs static metadata/schema analysis only.
Direct MCP server discovery is reserved for AgentShield Pro.
`);
}

function parseArgs(argv) {
  const [mode, ...rest] = argv;
  const out = { mode, positional: [] };
  for (let i = 0; i < rest.length; i++) {
    const v = rest[i];
    if (v === "--json-out") out.jsonOut = rest[++i];
    else if (v === "--md-out") out.mdOut = rest[++i];
    else out.positional.push(v);
  }
  return out;
}

async function emit(report, opts) {
  const md = toMarkdown(report);
  console.log(md);
  if (opts.jsonOut) await fs.writeFile(path.resolve(opts.jsonOut), JSON.stringify(report, null, 2), "utf8");
  if (opts.mdOut) await fs.writeFile(path.resolve(opts.mdOut), md, "utf8");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.mode || ["-h", "--help", "help"].includes(opts.mode)) return help();

  if (opts.mode === "scan-json") {
    const file = opts.positional[0];
    if (!file) throw new Error("Missing tools.json path.");
    const raw = JSON.parse(await fs.readFile(path.resolve(file), "utf8"));
    const tools = Array.isArray(raw) ? raw : raw.tools;
    if (!Array.isArray(tools)) throw new Error("JSON must be an array of tools or an object with a tools array.");
    return emit(analyzeTools(tools), opts);
  }

  help();
  process.exitCode = 1;
}

main().catch((err) => {
  console.error(`[AgentShield Lite] ${err.message}`);
  process.exitCode = 1;
});
