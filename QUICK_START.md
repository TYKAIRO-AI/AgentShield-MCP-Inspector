# Quick Start — AgentShield Lite

Requirements: Node.js 20+

```bash
npm install
npm test
npm run scan:sample
```

Export a Lite report:

```bash
node src/cli.js scan-json examples/sample-tools.json --md-out report.md --json-out report.json
```

Run AgentShield Lite as an MCP server:

```bash
node src/index.js
```

The public Lite edition performs static metadata/schema analysis only.

Direct local MCP discovery, advanced rules, policies, CI/CD gates, scan diff, and extended reports are reserved for AgentShield Pro.
