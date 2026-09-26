export function toMarkdown(report) {
  const lines = [];
  lines.push("# AgentShield MCP Security Report", "");
  lines.push(`- **Version:** ${report.version}`);
  lines.push(`- **Generated:** ${report.generatedAt}`);
  lines.push(`- **Overall:** ${report.overall}`);
  lines.push(`- **Tools:** ${report.summary.total}`);
  lines.push(`- **SAFE:** ${report.summary.safe}`);
  lines.push(`- **REVIEW:** ${report.summary.review}`);
  lines.push(`- **HIGH RISK:** ${report.summary.highRisk}`, "");

  for (const tool of report.tools) {
    lines.push(`## ${tool.name}`);
    lines.push(`**Verdict:** ${tool.verdict}  `);
    lines.push(`**Score:** ${tool.score}`);
    if (tool.description) lines.push(`**Description:** ${tool.description}`);
    if (!tool.findings.length) {
      lines.push("", "No heuristic risk indicators matched.", "");
      continue;
    }
    lines.push("", "### Findings");
    for (const f of tool.findings) lines.push(`- **${f.severity} — ${f.id}:** ${f.reason}`);
    lines.push("");
  }

  lines.push("---", "", `> ${report.disclaimer}`);
  return lines.join("\n");
}
