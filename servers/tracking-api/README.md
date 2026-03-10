# VTEX Tracking Api

MCP server for the VTEX Tracking Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/tracking-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/tracking-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "tracking-api": {
      "command": "npx",
      "args": ["@vtex-mcp/tracking-api"],
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

This server exposes 8 tool(s):

- **tracking_post_auth** — Asynchronous login
- **tracking_put_services** — Remove packing list
- **tracking_post_services** — Post delivery service
- **tracking_get_services** — Get delivery services list
- **tracking_get_services_by_id_delivery_service** — Get delivery service by ID
- **tracking_post_delivery_service_with_route_async** — Post delivery service with route scheduling
- **tracking_get_services_routes** — Get delivery services list by route
- **tracking_get_services_invoice** — Get delivery service by invoice
