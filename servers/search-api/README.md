# VTEX Search Api

MCP server for the VTEX Search Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/search-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/search-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "search-api": {
      "command": "npx",
      "args": ["@vtex-mcp/search-api"],
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

- **search_get_top_searches** — Get list of the 10 most searched terms
- **search_get_autocomplete_suggestions** — Get list of suggested terms and attributes similar to the search term
- **search_get_correction_search** — Get attempt of correction of a misspelled term
- **search_get_banners_by_facets** — Get list of banners registered for query
- **search_get_search_suggestions** — Get list of suggested terms similar to the search term
- **search_get_product_search_by_facets** — Get list of products for a query
- **search_get_facets_by_facets** — Get list of the possible facets for a given query
- **search_get_pickup_point_availability_product_cluster_ids_by_product_cluster_ids_trade_policy_by_trade_policy** — Get pickup point availability for Delivery Promise
