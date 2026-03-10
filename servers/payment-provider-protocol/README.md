# VTEX Payment Provider Protocol

MCP server for the VTEX Payment Provider Protocol, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/payment-provider-protocol
```

### Running with HTTP transport

```bash
npx @vtex-mcp/payment-provider-protocol --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "payment-provider-protocol": {
      "command": "npx",
      "args": ["@vtex-mcp/payment-provider-protocol"],
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

This server exposes 9 tool(s):

- **payment-provider-protocol_manifest** — List Payment Provider Manifest
- **payment-provider-protocol_create_payment** — Create payment
- **payment-provider-protocol_cancel_payment** — Cancel payment
- **payment-provider-protocol_settle_payment** — Settle payment
- **payment-provider-protocol_refund_payment** — Refund payment
- **payment-provider-protocol_inbound_request(beta)** — Inbound request (BETA)
- **payment-provider-protocol_create_authorization_token** — Create authorization token
- **payment-provider-protocol_provider_authentication** — Provider authentication
- **payment-provider-protocol_get_credentials** — Get credentials
