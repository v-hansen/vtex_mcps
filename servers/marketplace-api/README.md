# VTEX Marketplace Api

MCP server for the VTEX Marketplace Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/marketplace-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/marketplace-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "marketplace-api": {
      "command": "npx",
      "args": ["@vtex-mcp/marketplace-api"],
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

This server exposes 26 tool(s):

- **marketplace_price_notification** — Notify marketplace of price update
- **marketplace_inventory_notification** — Notify marketplace of inventory update
- **marketplace_getofferslist** — Get matched offers list
- **marketplace_get_sk_uoffers** — Get matched offers' data by SKU ID
- **marketplace_get_productoffers** — Get matched offers' data by product ID
- **marketplace_create_seller_lead** — Invite seller lead
- **marketplace_list_seller_leads** — List seller leads
- **marketplace_accept_seller_lead** — Accept seller lead
- **marketplace_retrieve_seller_lead** — Get seller lead's data by ID
- **marketplace_remove_seller_lead** — Delete seller lead
- **marketplace_create_seller_from_seller_lead** — Create seller from lead
- **marketplace_resend_seller_lead_request** — Resend seller lead invite
- **marketplace_list_seller_commissions** — List seller commissions by seller ID
- **marketplace_bulk_upsert_seller_commissions** — Upsert seller commissions in bulk
- **marketplace_remove_seller_commissions** — Remove seller commissions by category ID
- **marketplace_retrieve_seller_commissions** — Get seller commissions by category ID
- **marketplace_upsert_seller_request** — Configure seller account
- **marketplace_get_list_sellers** — List sellers
- **marketplace_update_seller** — Update seller by seller ID
- **marketplace_get_retrieve_seller** — Get seller data by ID
- **marketplace_upsert_mapping** — Upsert sales channel mapping
- **marketplace_retrieve_mapping** — Get sales channel mapping data
- **marketplace_get_fulfillment_pvt_affiliates** — List affiliates
- **marketplace_get_fulfillment_pvt_affiliates_by_affiliate_id** — Get affiliate by ID
- **marketplace_put_fulfillment_pvt_affiliates_by_affiliate_id** — Update affiliate by ID
- **marketplace_delete_fulfillment_pvt_affiliates_by_affiliate_id** — Delete affiliate by ID
