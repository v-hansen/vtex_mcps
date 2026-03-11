# VTEX Tax Service Provider Protocol

MCP server for the VTEX Tax Service Provider Protocol, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/tax-service-provider-protocol
```

### Running with HTTP transport

```bash
npx @vtex-mcp/tax-service-provider-protocol --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "tax-service-provider-protocol": {
      "command": "npx",
      "args": ["@vtex-mcp/tax-service-provider-protocol"],
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

This server exposes 2 tool(s):

- **tax-service-provider-protocol_get_order_form_configuration** — Get orderForm configuration
- **tax-service-provider-protocol_update_order_form_configuration** — Update orderForm configuration
