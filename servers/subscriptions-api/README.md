# VTEX Subscriptions Api

MCP server for the VTEX Subscriptions Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/subscriptions-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/subscriptions-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "subscriptions-api": {
      "command": "npx",
      "args": ["@vtex-mcp/subscriptions-api"],
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

This server exposes 20 tool(s):

- **subscriptions_get_api_rns_pub_cycles_by_cycle_id** — Get cycle details
- **subscriptions_get_api_rns_pub_cycles** — List cycles
- **subscriptions_post_api_rns_pub_cycles_by_cycle_id_retry** — Retry cycle
- **subscriptions_get_api_rns_pvt_plans** — List plans
- **subscriptions_get_api_rns_pvt_plans_by_id** — Get plan details
- **subscriptions_get_api_rns_pvt_reports** — List report templates
- **subscriptions_get_api_rns_pvt_reports_by_report_name_documents_by_document_id** — Get report document details
- **subscriptions_post_api_rns_pvt_reports_by_report_name_documents** — Generate report
- **subscriptions_get_api_rns_pub_subscriptions_by_id** — Get subscription details by ID
- **subscriptions_patch_api_rns_pub_subscriptions_by_id** — Update subscription by ID
- **subscriptions_get_api_rns_pub_subscriptions** — List subscriptions
- **subscriptions_post_api_rns_pub_subscriptions** — Create subscription
- **subscriptions_delete_api_rns_pub_subscriptions_by_id_items_by_item_id** — Remove item from subscription
- **subscriptions_patch_api_rns_pub_subscriptions_by_id_items_by_item_id** — Edit item from subscription
- **subscriptions_post_api_rns_pub_subscriptions_by_id_items** — Add item to subscription
- **subscriptions_post_api_rns_pub_subscriptions_by_id_simulate** — Calculate the current prices for a subscription
- **subscriptions_post_api_rns_pub_subscriptions_simulate** — Calculate the current prices for the provided subscription template
- **subscriptions_get_api_rns_pub_subscriptions_by_subscription_id_conversation_message** — Get conversation messages
- **subscriptions_get_settings** — Get subscriptions settings
- **subscriptions_edit_settings** — Edit subscriptions settings
