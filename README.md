# AgentShield MCP Inspector

Local-first MCP security inspector for discovering tools, analyzing schemas, and flagging risky capabilities before an AI agent trusts them.

**Publisher:** Mahmoud Hisham  
**Version:** 0.1.0  
**Runtime:** Node.js 20+

## What it does

AgentShield inspects MCP tool names, descriptions, and input schemas and produces deterministic, explainable verdicts:

- `SAFE`
- `REVIEW`
- `HIGH RISK`

Current rules detect security-relevant capabilities including shell execution, destructive file actions, filesystem access, external network requests, secrets/environment access, database actions, package installation, browser automation, messaging, and financial actions.

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Try the sample

```bash
npm run scan:sample
```

## Scan MCP tool metadata from JSON

```bash
node src/cli.js scan-json examples/sample-tools.json --md-out report.md --json-out report.json
```

## Scan a local stdio MCP server

```bash
node src/cli.js scan-stdio --command node --arg ./server.js
```

> Warning: starting an unknown MCP server can execute startup code. Use a VM, container, or sandbox for untrusted software.

## Run AgentShield as an MCP server

```bash
node src/index.js
```

AgentShield exposes:

- `analyze_tools`
- `scan_stdio_server`

## Security model

AgentShield v0.1 is a heuristic metadata/schema inspector. A SAFE verdict is not a guarantee of safety, and AgentShield is not a sandbox, antivirus, or exploit detector.

## Roadmap

- Allowlist / blocklist policies
- Trusted-domain policy
- CI exit codes
- Scan diff
- SARIF export
- Remote MCP scanning
- Source/package analysis

## Ownership

Copyright © 2026 Mahmoud Hisham. All rights reserved. See `LICENSE.txt`.
