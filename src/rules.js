const RULES = [
  {
    id: "shell-exec",
    severity: "HIGH",
    score: 9,
    patterns: [/\b(shell|exec|execute[_ -]?command|command[_ -]?exec|powershell|cmd\.exe|bash|terminal|spawn|subprocess)\b/i],
    reason: "Can execute operating-system commands."
  },
  {
    id: "destructive-files",
    severity: "HIGH",
    score: 8,
    patterns: [/\b(delete|remove|unlink|rmdir|rm -rf|recursive deletion|wipe|erase)\b/i],
    reason: "May delete files or directories."
  },
  {
    id: "filesystem-write",
    severity: "REVIEW",
    score: 4,
    patterns: [/\b(write[_ -]?file|edit[_ -]?file|modify[_ -]?file|save[_ -]?file|filesystem write|create[_ -]?file|rename)\b/i],
    reason: "Can modify local filesystem state."
  },
  {
    id: "filesystem-read",
    severity: "REVIEW",
    score: 2,
    patterns: [/\b(read[_ -]?file|filesystem read|open[_ -]?file|list[_ -]?directory|glob|search[_ -]?files)\b/i],
    reason: "Can access local files."
  },
  {
    id: "network-egress",
    severity: "REVIEW",
    score: 4,
    patterns: [/\b(http|https|fetch|request|webhook|external url|remote endpoint|network|download|upload)\b/i],
    reason: "Can communicate with external network destinations."
  },
  {
    id: "secrets-env",
    severity: "HIGH",
    score: 7,
    patterns: [/\b(secret|token|api[_ -]?key|credential|password|private[_ -]?key|env(?:ironment)? variable|dotenv)\b/i],
    reason: "May access credentials, secrets, or environment variables."
  },
  {
    id: "database-write",
    severity: "REVIEW",
    score: 5,
    patterns: [/\b(insert|update|delete from|drop table|alter table|database write|execute sql|query database|sql)\b/i],
    reason: "May read or modify database state."
  },
  {
    id: "package-install",
    severity: "HIGH",
    score: 7,
    patterns: [/\b(npm install|pip install|package install|apt install|brew install|dependency install)\b/i],
    reason: "Can install or alter executable dependencies."
  },
  {
    id: "browser-control",
    severity: "REVIEW",
    score: 4,
    patterns: [/\b(browser|playwright|selenium|navigate|click|web automation)\b/i],
    reason: "Can control a browser or web session."
  },
  {
    id: "messaging-send",
    severity: "REVIEW",
    score: 4,
    patterns: [/\b(send email|send message|post message|slack|gmail|smtp|sms)\b/i],
    reason: "Can send messages or communications."
  },
  {
    id: "financial-action",
    severity: "HIGH",
    score: 9,
    patterns: [/\b(payment|transfer money|purchase|checkout|refund|invoice pay|bank transfer)\b/i],
    reason: "May initiate or affect financial actions."
  }
];

function schemaText(schema) {
  try { return JSON.stringify(schema ?? {}); } catch { return String(schema ?? ""); }
}

function normalizeTool(tool) {
  return {
    name: String(tool?.name ?? "unnamed_tool"),
    description: String(tool?.description ?? ""),
    inputSchema: tool?.inputSchema ?? tool?.input_schema ?? {}
  };
}

export function analyzeTool(rawTool) {
  const tool = normalizeTool(rawTool);
  const haystack = `${tool.name}\n${tool.description}\n${schemaText(tool.inputSchema)}`;
  const findings = [];
  let score = 0;

  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(haystack))) {
      findings.push({ id: rule.id, severity: rule.severity, score: rule.score, reason: rule.reason });
      score += rule.score;
    }
  }

  if (!tool.description.trim()) {
    findings.push({
      id: "missing-description",
      severity: "REVIEW",
      score: 2,
      reason: "Tool has no description, reducing auditability."
    });
    score += 2;
  }

  let verdict = "SAFE";
  if (score >= 7 || findings.some((f) => f.severity === "HIGH")) verdict = "HIGH RISK";
  else if (score >= 3 || findings.length > 0) verdict = "REVIEW";

  return { ...tool, score, verdict, findings };
}

export function analyzeTools(tools = []) {
  const results = tools.map(analyzeTool);
  const summary = {
    total: results.length,
    safe: results.filter((r) => r.verdict === "SAFE").length,
    review: results.filter((r) => r.verdict === "REVIEW").length,
    highRisk: results.filter((r) => r.verdict === "HIGH RISK").length
  };

  let overall = "SAFE";
  if (summary.highRisk > 0) overall = "HIGH RISK";
  else if (summary.review > 0) overall = "REVIEW";

  return {
    product: "AgentShield MCP Inspector",
    version: "0.1.0",
    generatedAt: new Date().toISOString(),
    overall,
    summary,
    tools: results,
    disclaimer: "Static heuristic analysis only. A SAFE result is not a guarantee of safety. Inspect source code and run untrusted MCP servers inside an isolated environment."
  };
}
