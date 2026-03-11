# VTEX Gift Card Provider Protocol

MCP server for the VTEX Gift Card Provider Protocol, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/gift-card-provider-protocol
```

### Running with HTTP transport

```bash
npx @vtex-mcp/gift-card-provider-protocol --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "gift-card-provider-protocol": {
      "command": "npx",
      "args": ["@vtex-mcp/gift-card-provider-protocol"],
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

- **gift-card-provider-protocol_list_all_gift_cards** — List all gift cards
- **gift-card-provider-protocol_get_gift_cardby_id** — Get a gift card by ID
- **gift-card-provider-protocol_create_gift_card** — Create a gift card
- **gift-card-provider-protocol_create_gift_card_transaction** — Create a gift card transaction
- **gift-card-provider-protocol_list_all_gift_card_transactions** — List all gift card transactions
- **gift-card-provider-protocol_get_gift_card_transactionby_id** — Get a gift card transaction by ID
- **gift-card-provider-protocol_get_gift_card_transaction_authorization** — Get a gift card transaction authorization
- **gift-card-provider-protocol_create_gift_card_transaction_cancellation** — Cancel a gift card transaction
- **gift-card-provider-protocol_list_all_gift_card_transactions_cancellations** — List all gift card transactions cancellations
- **gift-card-provider-protocol_create_gift_card_transaction_settlement** — Settle a gift card transaction
- **gift-card-provider-protocol_list_all_gift_card_transactions_settlements** — List all gift card transactions settlements
