# VTEX Policies System Api

MCP server for the VTEX Policies System Api, providing AI assistants access to VTEX e-commerce APIs.

## Setup

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VTEX_ACCOUNT_NAME` | Yes | Your VTEX account name |
| `VTEX_APP_KEY` | Yes* | VTEX app key for authentication |
| `VTEX_APP_TOKEN` | Yes* | VTEX app token for authentication |
| `VTEX_AUTH_TOKEN` | No | Alternative auth token (replaces app key/token) |
| `VTEX_ENVIRONMENT` | No | VTEX environment (default: `vtexcommercestable`) |

\* Required unless `VTEX_AUTH_TOKEN` is provided.

### Running via npx

```bash
npx @vtex-mcp/policies-system-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/policies-system-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "policies-system-api": {
      "command": "npx",
      "args": ["@vtex-mcp/policies-system-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

## Available Tools

This server exposes 6 tool(s):

- **policies-system_policy_list** — Get policy list
- **policies-system_policy_evaluate** — Evaluate policies
- **policies-system_policy_get** — Get policy by ID
- **policies-system_policy_create_or_update** — Create policy
- **policies-system_policy_update** — Update policy
- **policies-system_policy_delete** — Delete policy by ID
