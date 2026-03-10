# VTEX Antifraud Provider Api

MCP server for the VTEX Antifraud Provider Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/antifraud-provider-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/antifraud-provider-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "antifraud-provider-api": {
      "command": "npx",
      "args": ["@vtex-mcp/antifraud-provider-api"],
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

This server exposes 10 tool(s):

- **antifraud-provider_send_antifraud_pre_analysis_data** — Send anti-fraud pre-analysis data (optional)
- **antifraud-provider_send_antifraud_data** — Send anti-fraud data
- **antifraud-provider_update_antifraud_transactions(optional)** — Update anti-fraud transactions (optional)
- **antifraud-provider_manifest** — List anti-fraud provider manifest
- **antifraud-provider_get_antifraud_status** — Get anti-fraud status
- **antifraud-provider_stop_antifraud_analysis(optional)** — Stop anti-fraud analysis (optional)
- **antifraud-provider_1.retrieve_token** — 1. Retrieve token
- **antifraud-provider_2.redirect** — 2. Redirect
- **antifraud-provider_3.returnto_vtex** — 3. Return to VTEX
- **antifraud-provider_4.get_credentials** — 4. Get credentials
