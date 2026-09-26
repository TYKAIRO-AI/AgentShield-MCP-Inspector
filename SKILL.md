---
name: agentshield-mcp-inspector
description: Inspect MCP tool metadata and schemas for risky capabilities before connecting them to an AI agent.
version: 0.1.0
publisher: Mahmoud Hisham
---

# AgentShield MCP Inspector

Use AgentShield when the user wants to review an MCP server, MCP tool list, or MCP schema for security-relevant capabilities.

## Workflow

1. Prefer static analysis when tool metadata is already available.
2. Use `analyze_tools` for a provided tool list.
3. Use `scan_stdio_server` only when the user explicitly wants discovery from a local MCP command.
4. Never invoke the target server's discovered tools during a scan.
5. Report results as SAFE, REVIEW, or HIGH RISK.
6. For every REVIEW or HIGH RISK result, state the matched capability and practical reason.
7. Remind the user that heuristic inspection cannot prove safety.

## Ownership

Publisher: Mahmoud Hisham  
Product: AgentShield MCP Inspector v0.1.0

Republishing, resale, redistribution, public re-upload, sublicensing, or distributing modified copies is prohibited.
