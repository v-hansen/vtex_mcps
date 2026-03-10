# VTEX Promotions And Taxes Api

MCP server for the VTEX Promotions And Taxes Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/promotions-and-taxes-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/promotions-and-taxes-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "promotions-and-taxes-api": {
      "command": "npx",
      "args": ["@vtex-mcp/promotions-and-taxes-api"],
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

This server exposes 31 tool(s):

- **promotions-and-taxes_create_multiple_coupons** — Create multiple coupons
- **promotions-and-taxes_create_or_update_coupon** — Create or update coupon
- **promotions-and-taxes_getall** — Get all coupons
- **promotions-and-taxes_getbycouponcode** — Get coupon by coupon code
- **promotions-and-taxes_getarchivedbycouponcode** — Get archived coupon by coupon code
- **promotions-and-taxes_archivebycouponcode** — Archive coupon by coupon code
- **promotions-and-taxes_massive_generation** — Generate coupons in bulk
- **promotions-and-taxes_getusage** — Get coupon usage
- **promotions-and-taxes_unarchivebycouponcode** — Unarchive coupon by coupon code
- **promotions-and-taxes_get_all_benefits** — Get all promotions
- **promotions-and-taxes_search_promotion** — Search promotion by name
- **promotions-and-taxes_get_all_taxes** — Get all taxes
- **promotions-and-taxes_get_calculator_configuration_by_id** — Get promotion or tax by ID
- **promotions-and-taxes_opt_seller_in_or_out_of_promotion** — Seller opt-in or opt-out
- **promotions-and-taxes_create_or_update_calculator_configuration** — Create or update promotion or tax
- **promotions-and-taxes_create_multiple_sku_promotion** — Create multiple SKU promotion
- **promotions-and-taxes_update_multiple_sku_promotion** — Update multiple SKU promotion
- **promotions-and-taxes_archive_promotion** — Archive promotion or tax
- **promotions-and-taxes_unarchive_promotion** — Unarchive promotion or tax
- **promotions-and-taxes_get_archived_promotions** — List archived promotions
- **promotions-and-taxes_get_archived_taxes** — List archived taxes
- **promotions-and-taxes_pricebysku_id** — Get price by SKU ID
- **promotions-and-taxes_deletebysku_id** — Delete price by SKU ID
- **promotions-and-taxes_getallpaged** — Get all paged prices
- **promotions-and-taxes_pricebycontext** — Get price by context
- **promotions-and-taxes_pricebysku_idandtrade_policy** — Get price by SKU ID and trade policy
- **promotions-and-taxes_saveprice** — Save price
- **promotions-and-taxes_calculatediscountsandtaxes(bundles)** — Calculate discounts and taxes bundles
- **promotions-and-taxes_getcampaignconfiguration** — Get campaign audience configuration
- **promotions-and-taxes_getcampaignaudiences** — Get all campaign audiences
- **promotions-and-taxes_setcampaignconfiguration** — Create campaign audience
