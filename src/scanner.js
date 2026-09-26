import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { analyzeTools } from "./rules.js";

export async function discoverStdio({ command, args = [], env = {} }) {
  if (!command || typeof command !== "string") throw new Error("A target command is required.");

  const client = new Client(
    { name: "agentshield-inspector-client", version: "0.1.0" },
    { versionNegotiation: { mode: "auto" } }
  );

  const transport = new StdioClientTransport({
    command,
    args,
    env: { ...process.env, ...env }
  });

  try {
    await client.connect(transport);
    const response = await client.listTools();
    return response.tools ?? [];
  } finally {
    try { await client.close(); } catch {}
  }
}

export async function scanStdio(options) {
  return analyzeTools(await discoverStdio(options));
}
