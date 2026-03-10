# VTEX Pricing Api

MCP server for the VTEX Pricing Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/pricing-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/pricing-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "pricing-api": {
      "command": "npx",
      "args": ["@vtex-mcp/pricing-api"],
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

This server exposes 16 tool(s):

- **pricing_get_price** — Get price by SKU ID
- **pricing_delete_price** — Delete price all base and fixed prices of an SKU
- **pricing_create_update_price_or_fixed_price** — Create or update base price or fixed price
- **pricing_get_fixed_prices** — Get fixed prices
- **pricing_create_update_price_or_fixed_price_no_remove** — Create or update base price or fixed price
- **pricing_createorupdatefixedpricesonpricetableortradepolicy** — Create or update fixed prices on a price table or trade policy
- **pricing_get_fixed_pricesonapricetable** — Get fixed prices on a price table or trade policy
- **pricing_deletefixedpricesonapricetableortradepolicy** — Delete fixed prices on a price table or trade policy
- **pricing_get_computed_pricebypricetable** — Get computed price by price table or trade policy
- **pricing_get_pricing_config** — Get pricing configuration
- **pricing_get_pricingv2_status** — Get pricing v2 status
- **pricing_getrulesforapricetable** — Get rules for a price table
- **pricing_put_pricing_pipeline_catalog_by_price_table_id** — Update rules for a price table
- **pricing_put_pricing_tables_by_price_table_id** — Create price table
- **pricing_getallpricetablesandrules** — Get all price tables and their rules
- **pricing_listpricetables** — List price tables
