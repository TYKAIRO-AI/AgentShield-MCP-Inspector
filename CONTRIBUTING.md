# Contributing to AgentShield MCP Inspector Lite

Thanks for helping improve the public Lite edition.

## Good contributions

We especially welcome:

- new safe test cases
- false-positive / false-negative reports
- improvements to explanations and evidence output
- MCP schema edge cases
- documentation improvements
- portability fixes for Node.js environments

## Before opening a pull request

1. Fork the repository.
2. Create a focused branch.
3. Keep changes limited to the public Lite edition.
4. Run:

```bash
npm test
npm run scan:sample
```

5. Explain what changed and why.

## Security-sensitive reports

Do not publish exploitable security details in a public issue. Follow [SECURITY.md](SECURITY.md).

## Scope

The proprietary AgentShield Pro implementation, private detection rules, and commercial assets are not part of this repository.
