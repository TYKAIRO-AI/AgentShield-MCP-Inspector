#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import { analyzeTools } from "./rules.js";
import { scanStdio } from "./scanner.js";
import { toMarkdown } from "./report.js";

function makeServer() {
  const server = new McpServer({ name: "agentshield-mcp-inspector", version: "0.1.0" });

  server.registerTool(
    "analyze_tools",
    {
      title: "Analyze MCP tool metadata",
      description: "Analyze MCP tool names, descriptions and JSON Schemas without executing the target tools.",
      inputSchema: {
        tools: z.array(z.object({
          name: z.string(),
          description: z.string().optional(),
          inputSchema: z.any().optional()
        }))
      }
    },
    async ({ tools }) => {
      const report = analyzeTools(tools);
      return { content: [
        { type: "text", text: toMarkdown(report) },
        { type: "text", text: JSON.stringify(report, null, 2) }
      ] };
    }
  );

  server.registerTool(
    "scan_stdio_server",
    {
      title: "Discover and scan a local MCP server",
      description: "Starts a local MCP server command, lists its tools, then performs metadata/schema risk analysis. The target tools themselves are not invoked.",
      inputSchema: {
        command: z.string(),
        args: z.array(z.string()).default([])
      }
    },
    async ({ command, args }) => {
      const report = await scanStdio({ command, args });
      return { content: [
        { type: "text", text: toMarkdown(report) },
        { type: "text", text: JSON.stringify(report, null, 2) }
      ] };
    }
  );

  return server;
}

serveStdio(() => makeServer());
