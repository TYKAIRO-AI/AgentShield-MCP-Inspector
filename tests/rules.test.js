import test from "node:test";
import assert from "node:assert/strict";
import { analyzeTool, analyzeTools } from "../src/rules.js";
import { toMarkdown } from "../src/report.js";

test("safe tool stays SAFE", () => {
  const r = analyzeTool({
    name: "calculator",
    description: "Add two numbers.",
    inputSchema: { type: "object", properties: { a: {type:"number"}, b:{type:"number"} } }
  });
  assert.equal(r.verdict, "SAFE");
});

test("shell execution is HIGH RISK", () => {
  const r = analyzeTool({
    name: "execute_command",
    description: "Execute a shell command.",
    inputSchema: { type: "object", properties: { command: {type:"string"} } }
  });
  assert.equal(r.verdict, "HIGH RISK");
});

test("filesystem read requires review", () => {
  const r = analyzeTool({
    name: "read_file",
    description: "Read file contents.",
    inputSchema: { type: "object", properties: { path: {type:"string"} } }
  });
  assert.equal(r.verdict, "REVIEW");
});

test("summary counts verdicts", () => {
  const report = analyzeTools([
    {name:"calculator",description:"Add numbers.",inputSchema:{type:"object",properties:{a:{type:"number"}}}},
    {name:"read_file",description:"Read file.",inputSchema:{type:"object",properties:{path:{type:"string"}}}},
    {name:"execute_command",description:"Execute shell.",inputSchema:{type:"object",properties:{command:{type:"string"}}}}
  ]);
  assert.equal(report.summary.total, 3);
  assert.equal(report.summary.safe, 1);
  assert.equal(report.summary.review, 1);
  assert.equal(report.summary.highRisk, 1);
});

test("markdown report contains headings", () => {
  const report = analyzeTools([{name:"calculator",description:"Add numbers.",inputSchema:{type:"object",properties:{a:{type:"number"}}}}]);
  assert.match(toMarkdown(report), /AgentShield MCP Security Report/);
});
