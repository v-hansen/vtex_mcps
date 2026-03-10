# VTEX Payments Api

MCP server for the VTEX Payments Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/payments-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/payments-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "payments-api": {
      "command": "npx",
      "args": ["@vtex-mcp/payments-api"],
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

This server exposes 25 tool(s):

- **payments_installmentsoptions** — Get installments options
- **payments_affiliations** — List all affiliations
- **payments_insert_affiliation** — Insert new affiliation
- **payments_update_affiliation** — Update affiliation by ID
- **payments_affiliation_by_id** — Get affiliation by ID
- **payments_rules** — List all payment rules
- **payments_insert_rule** — Insert a new payment rule
- **payments_rule_by_id** — Get payment rule by ID
- **payments_put_rule_by_id** — Update payment rule by ID
- **payments_rule** — Delete payment rule by ID
- **payments_available_payment_methods** — List all available payment methods
- **payments_get_card_token_by_id** — Get card data
- **payments_1.createanewtransaction** — Start a new transaction
- **payments_2.send_payments_public** — Send payments information
- **payments_3.send_additional_data** — Send additional data
- **payments_3.1_update_additional_data** — Update additional data (optional)
- **payments_4.doauthorization** — Authorize new transaction
- **payments_transaction_details** — Get transaction details
- **payments_payment_details** — Get payment details
- **payments_transaction_settlement_details** — Get transaction settlement details
- **payments_settlethetransaction** — Settle the transaction
- **payments_refundthetransaction** — Refund the transaction
- **payments_cancelthetransaction** — Cancel the transaction
- **payments_get_api_payments_pvt_payments_by_payment_id_payment_notification** — Send payment notification with payment ID
- **payments_post_api_payments_pvt_payments_by_payment_id_payment_notification** — Send payment notification with payment ID, date, and value paid
