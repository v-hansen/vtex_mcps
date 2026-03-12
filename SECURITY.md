# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

**Do not open a public GitHub issue.**

Instead, open a private security advisory via GitHub with:

1. A description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested fix (if any)

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.

## Scope

This policy covers:

- The shared library (`@vtex-mcp/shared`) — especially credential handling and error sanitization
- The code generator (`@vtex-mcp/generator`)
- All generated MCP server packages (`@vtex-mcp/*`)
- CI/CD workflows and Docker configurations

## Security Measures

This project implements several security measures:

- **Credential sanitization**: All error messages are scanned for API key/token values and redacted before being returned to MCP clients
- **Environment-based configuration**: Credentials are never hardcoded — they're read from environment variables at runtime
- **Input validation**: All tool parameters are validated against Zod schemas before any API request is made
- **No credential logging**: The shared HTTP client and error handler never log raw credential values

## Supported Versions

| Version | Supported   |
| ------- | ----------- |
| Latest  | Yes         |
| Older   | Best effort |
