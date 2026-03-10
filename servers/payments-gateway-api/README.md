# VTEX Payments Gateway Api

MCP server for the VTEX Payments Gateway Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/payments-gateway-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/payments-gateway-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "payments-gateway-api": {
      "command": "npx",
      "args": ["@vtex-mcp/payments-gateway-api"],
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

- **payments-gateway_installmentsoptions** — Get installments options
- **payments-gateway_affiliations** — List all affiliations
- **payments-gateway_insert_affiliation** — Insert new affiliation
- **payments-gateway_update_affiliation** — Update affiliation by ID
- **payments-gateway_affiliation_by_id** — Get affiliation by ID
- **payments-gateway_rules** — List all payment rules
- **payments-gateway_insert_rule** — Insert a new payment rule
- **payments-gateway_rule_by_id** — Get payment rule by ID
- **payments-gateway_put_rule_by_id** — Update payment rule by ID
- **payments-gateway_rule** — Delete payment rule by ID
- **payments-gateway_available_payment_methods** — List all available payment methods
- **payments-gateway_get_card_token_by_id** — Get card data
- **payments-gateway_1.createanewtransaction** — Start a new transaction
- **payments-gateway_2.send_payments_public** — Send payments information
- **payments-gateway_3.send_additional_data** — Send additional data
- **payments-gateway_3.1_update_additional_data** — Update additional data (optional)
- **payments-gateway_4.doauthorization** — Authorize new transaction
- **payments-gateway_transaction_details** — Get transaction details
- **payments-gateway_payment_details** — Get payment details
- **payments-gateway_transaction_settlement_details** — Get transaction settlement details
- **payments-gateway_settlethetransaction** — Settle the transaction
- **payments-gateway_refundthetransaction** — Refund the transaction
- **payments-gateway_cancelthetransaction** — Cancel the transaction
- **payments-gateway_get_api_payments_pvt_payments_by_payment_id_payment_notification** — Send payment notification with payment ID
- **payments-gateway_post_api_payments_pvt_payments_by_payment_id_payment_notification** — Send payment notification with payment ID, date, and value paid
