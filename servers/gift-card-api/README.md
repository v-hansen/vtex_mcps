# VTEX Gift Card Api

MCP server for the VTEX Gift Card Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/gift-card-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/gift-card-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "gift-card-api": {
      "command": "npx",
      "args": ["@vtex-mcp/gift-card-api"],
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

This server exposes 11 tool(s):

- **gift-card_create_gift_card** — Create a gift card
- **gift-card_get_gift_cardby_id** — Get a gift card by ID
- **gift-card_search_gift_cardsfromcartdata** — List all gift cards
- **gift-card_get_gift_card_transactions** — List all gift card transactions
- **gift-card_create_gift_card_transaction** — Create a gift card transaction
- **gift-card_get_gift_card_transactionby_id** — Get a gift card transaction by ID
- **gift-card_get_transaction_authorizations** — Get a gift card transaction authorization
- **gift-card_get_transaction_cancellations** — List all gift card transactions cancellations
- **gift-card_cancel_gift_card_transaction** — Cancel a gift card transaction
- **gift-card_get_transaction_settlements** — List all gift card transactions settlements
- **gift-card_settle_gift_card_transaction** — Settle a gift card transaction
