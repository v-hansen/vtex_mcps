# VTEX Message Center Api

MCP server for the VTEX Message Center Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/message-center-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/message-center-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "message-center-api": {
      "command": "npx",
      "args": ["@vtex-mcp/message-center-api"],
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

This server exposes 1 tool(s):

- **message-center_create_dkim** — Generate DKIM keys
