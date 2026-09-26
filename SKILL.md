---
name: agentshield-mcp-inspector-lite
description: Perform basic static MCP tool metadata and schema inspection for risky capabilities.
version: 0.1.0-lite.1
publisher: Mahmoud Hisham
---

# AgentShield MCP Inspector Lite

Use AgentShield Lite when the user wants a basic security review of an MCP tool list or MCP schemas already available as metadata.

## Workflow

1. Use `analyze_tools` for a provided tool list.
2. Do not claim that Lite performs direct MCP server discovery.
3. Report results as SAFE, REVIEW, or HIGH RISK.
4. For every REVIEW or HIGH RISK result, state the matched capability and reason.
5. Remind the user that heuristic metadata inspection cannot prove safety.

## Pro boundary

Direct MCP discovery, expanded rules, policy files, CI/CD gates, scan diff, and advanced reporting are reserved for AgentShield Pro.

## Ownership

Publisher: Mahmoud Hisham  
Product: AgentShield MCP Inspector Lite v0.1.0-lite.1

Republishing, resale, redistribution, public re-upload, sublicensing, or distributing modified copies as a competing product is prohibited.
