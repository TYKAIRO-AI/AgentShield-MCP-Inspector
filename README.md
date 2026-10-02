# 🛡️ AgentShield MCP Inspector Lite

> **A TYKAIRO AI product** — Founded by **Mahmoud Hisham**

**Free, local-first MCP security inspection for tool metadata, schemas, and high-risk capabilities.**

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-informational)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-security%20inspector-informational)](https://modelcontextprotocol.io/)
[![Edition](https://img.shields.io/badge/edition-Lite-informational)](#what-lite-does)
[![TYKAIRO AI](https://img.shields.io/badge/by-TYKAIRO%20AI-informational)](https://github.com/TYKAIRO-AI)

AgentShield MCP Inspector Lite analyzes MCP tool names, descriptions, and input schemas and returns explainable verdicts:

- `SAFE`
- `REVIEW`
- `HIGH RISK`

The goal is simple: **inspect an MCP tool surface before trusting it.**

> AgentShield is a risk-inspection tool. A verdict is not proof that software is safe or malicious.

## ⚡ Quick start

```bash
git clone https://github.com/TYKAIRO-AI/AgentShield-MCP-Inspector.git
cd AgentShield-MCP-Inspector
npm install
npm test
npm run scan:sample
```

Scan your own MCP tool metadata from JSON:

```bash
node src/cli.js scan-json examples/sample-tools.json --md-out report.md --json-out report.json
```

Or run Lite as an MCP server:

```bash
node src/index.js
```

The server exposes the `analyze_tools` tool.

## What Lite does

The starter ruleset looks for signals related to:

- Shell / OS command execution
- Destructive file operations
- Filesystem reads
- External network access
- Secrets / credential access

It supports both static JSON scanning and MCP-server use.

## Example workflow

```text
MCP tool metadata
      ↓
AgentShield Lite
      ↓
Capability + schema inspection
      ↓
SAFE / REVIEW / HIGH RISK
      ↓
Evidence explaining why
```

This makes it useful for developers, MCP publishers, reviewers, and teams that want a quick first-pass security check before deeper inspection.

## Lite vs Pro

Lite is intentionally focused and public. AgentShield Pro is developed separately and is not included in this repository.

Planned Pro capabilities include:

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

## Project status

**Edition:** Lite  
**Version:** 0.1.0-lite.1  
**Runtime:** Node.js 20+

Issues and feature ideas are welcome. If this project helps you evaluate MCP tools, consider starring the repository so more developers can discover it.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

For security-related reports, see [SECURITY.md](SECURITY.md).

## Ownership

**Publisher:** Mahmoud Hisham  
**Organization:** [TYKAIRO AI](https://github.com/TYKAIRO-AI)

Copyright © 2026 Mahmoud Hisham. All rights reserved. See `LICENSE.txt`.
