# VTEX Gift Card Hub Api

MCP server for the VTEX Gift Card Hub Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/giftcard-hub-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/giftcard-hub-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "giftcard-hub-api": {
      "command": "npx",
      "args": ["@vtex-mcp/giftcard-hub-api"],
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

This server exposes 15 tool(s):

- **gift-card-hub_list_all_gift_card_providers** — List all gift card providers
- **gift-card-hub_get_gift_card_providerby_id** — Get a gift card provider by ID
- **gift-card-hub_create/update_gift_card_providerby_id** — Create or update a gift card provider by ID
- **gift-card-hub_delete_gift_card_providerby_id** — Delete a gift card provider by ID
- **gift-card-hub_create_gift_cardin_gift_card_provider** — Create a gift card at a gift card provider
- **gift-card-hub_get_gift_cardfrom_gift_card_provider** — Get a gift card from a gift card provider
- **gift-card-hub_get_gift_cardfrom_gift_card_providerby_id** — Get a gift card from a gift card provider by ID
- **gift-card-hub_list_all_gift_card_transactions** — List all gift card transactions
- **gift-card-hub_create_gift_card_transaction** — Create a gift card transaction
- **gift-card-hub_get_gift_card_transactionby_id** — Get a gift card transaction by ID
- **gift-card-hub_get_gift_card_authorization_transaction** — Get a gift card transaction authorization
- **gift-card-hub_list_all_gift_card_settlement_transactions** — List all gift card transactions settlements
- **gift-card-hub_create_gift_card_settlement_transaction** — Settle a gift card transaction
- **gift-card-hub_list_all_gift_card_cancellation_transactions** — List all gift card transactions cancellations
- **gift-card-hub_create_gift_card_cancellation_transaction** — Cancel a gift card transaction
