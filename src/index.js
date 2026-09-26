#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import { analyzeTools } from "./rules.js";
import { toMarkdown } from "./report.js";

function makeServer() {
  const server = new McpServer({
    name: "agentshield-mcp-inspector-lite",
    version: "0.1.0-lite.1"
  });

  server.registerTool(
    "analyze_tools",
    {
      title: "Analyze MCP tool metadata",
      description: "Basic Lite-edition inspection of MCP tool names, descriptions and JSON Schemas without executing target tools.",
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
      return {
        content: [
          { type: "text", text: toMarkdown(report) },
          { type: "text", text: JSON.stringify(report, null, 2) }
        ]
      };
    }
  );

  return server;
}

serveStdio(() => makeServer());
