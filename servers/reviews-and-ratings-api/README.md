# VTEX Reviews And Ratings Api

MCP server for the VTEX Reviews And Ratings Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/reviews-and-ratings-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/reviews-and-ratings-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "reviews-and-ratings-api": {
      "command": "npx",
      "args": ["@vtex-mcp/reviews-and-ratings-api"],
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

- **reviews-and-ratings_get_product_rating** — Get product rating
- **reviews-and-ratings_get_reviewby_review_id** — Get product review by review ID
- **reviews-and-ratings_delete_review** — Delete review
- **reviews-and-ratings_edit_review** — Update a review
- **reviews-and-ratings_getalistof_reviews** — Get list of reviews
- **reviews-and-ratings_save_multiple_reviews** — Create multiple reviews
- **reviews-and-ratings_delete_multiple_reviews** — Delete multiple reviews
- **reviews-and-ratings_save_review** — Create a review
