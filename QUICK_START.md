# Quick Start

Requirements: Node.js 20+

```bash
npm install
npm test
npm run scan:sample
```

Export a report:

```bash
node src/cli.js scan-json examples/sample-tools.json --md-out report.md --json-out report.json
```

Scan a local stdio MCP server:

```bash
node src/cli.js scan-stdio --command node --arg ./server.js
```

Unknown MCP servers should be run in an isolated VM, container, or sandbox.
