# AgentShield MCP Inspector Lite

[![MCPize](https://mcpize.com/badge/@mahmoudhisham564/agentshield-inspector)](https://mcpize.com/mcp/agentshield-inspector)

Free public edition of AgentShield for basic MCP tool-metadata security inspection.

**Publisher:** Mahmoud Hisham  
**Edition:** Lite  
**Version:** 0.1.0-lite.1  
**Runtime:** Node.js 20+

## What Lite does

AgentShield Lite analyzes MCP tool names, descriptions, and input schemas and returns explainable verdicts:

- `SAFE`
- `REVIEW`
- `HIGH RISK`

Lite includes a deliberately limited starter ruleset for:

- Shell / OS command execution
- Destructive file operations
- Filesystem reads
- External network access
- Secrets / credential access

It supports static JSON scanning and also runs as an MCP server exposing the `analyze_tools` tool.

## What is reserved for AgentShield Pro

The paid Pro edition is being developed separately and is not included in this public repository. Planned Pro capabilities include:

- Direct stdio MCP discovery
- Expanded security rules
- Allowlist / blocklist policy files
- Trusted-domain policy
- Better network classification
- CI/CD exit codes and security gates
- Scan history and scan diff
- SARIF / advanced reporting
- Source and package inspection
- Remote MCP scanning
- Advanced evidence and policy controls

## Install

```bash
npm install
```

## Connect via MCPize

Use this MCP server instantly with no local installation:

```bash
npx -y mcpize connect @mahmoudhisham564/agentshield-inspector --client claude
```

Or connect at: **https://mcpize.com/mcp/agentshield-inspector**

## Test

```bash
npm test
```

## Try the sample

```bash
npm run scan:sample
```

## Scan tool metadata from JSON

```bash
node src/cli.js scan-json examples/sample-tools.json --md-out report.md --json-out report.json
```

## Run Lite as an MCP server

```bash
node src/index.js
```

The Lite MCP server exposes:

- `analyze_tools`

## Security note

AgentShield performs heuristic metadata/schema inspection. A SAFE verdict is not proof that software is safe.

## Pro

AgentShield Pro is kept outside this public repository. A purchase link will be added when the first Pro release is ready.

## Ownership

Copyright © 2026 Mahmoud Hisham. All rights reserved. See `LICENSE.txt`.