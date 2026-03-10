# VTEX Rates And Benefits Api

MCP server for the VTEX Rates And Benefits Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/rates-and-benefits-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/rates-and-benefits-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "rates-and-benefits-api": {
      "command": "npx",
      "args": ["@vtex-mcp/rates-and-benefits-api"],
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

- **rates-and-benefits_create_multiple_coupons** — Create multiple coupons
- **rates-and-benefits_create_or_update_coupon** — Create or update coupon
- **rates-and-benefits_getall** — Get all coupons
- **rates-and-benefits_getbycouponcode** — Get coupon by coupon code
- **rates-and-benefits_getarchivedbycouponcode** — Get archived coupon by coupon code
- **rates-and-benefits_archivebycouponcode** — Archive coupon by coupon code
- **rates-and-benefits_massive_generation** — Generate coupons in bulk
- **rates-and-benefits_getusage** — Get coupon usage
- **rates-and-benefits_unarchivebycouponcode** — Unarchive coupon by coupon code
- **rates-and-benefits_get_all_benefits** — Get all promotions
- **rates-and-benefits_search_promotion** — Search promotion by name
- **rates-and-benefits_get_all_taxes** — Get all taxes
- **rates-and-benefits_get_calculator_configuration_by_id** — Get promotion or tax by ID
- **rates-and-benefits_opt_seller_in_or_out_of_promotion** — Seller opt-in or opt-out
- **rates-and-benefits_create_or_update_calculator_configuration** — Create or update promotion or tax
- **rates-and-benefits_create_multiple_sku_promotion** — Create multiple SKU promotion
- **rates-and-benefits_update_multiple_sku_promotion** — Update multiple SKU promotion
- **rates-and-benefits_archive_promotion** — Archive promotion or tax
- **rates-and-benefits_unarchive_promotion** — Unarchive promotion or tax
- **rates-and-benefits_get_archived_promotions** — List archived promotions
- **rates-and-benefits_get_archived_taxes** — List archived taxes
- **rates-and-benefits_pricebysku_id** — Get price by SKU ID
- **rates-and-benefits_deletebysku_id** — Delete price by SKU ID
- **rates-and-benefits_getallpaged** — Get all paged prices
- **rates-and-benefits_pricebycontext** — Get price by context
- **rates-and-benefits_pricebysku_idandtrade_policy** — Get price by SKU ID and trade policy
- **rates-and-benefits_saveprice** — Save price
- **rates-and-benefits_calculatediscountsandtaxes(bundles)** — Calculate discounts and taxes bundles
- **rates-and-benefits_getcampaignconfiguration** — Get campaign audience configuration
- **rates-and-benefits_getcampaignaudiences** — Get all campaign audiences
- **rates-and-benefits_setcampaignconfiguration** — Create campaign audience
