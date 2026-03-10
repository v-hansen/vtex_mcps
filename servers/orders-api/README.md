# VTEX Orders Api

MCP server for the VTEX Orders Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/orders-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/orders-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "orders-api": {
      "command": "npx",
      "args": ["@vtex-mcp/orders-api"],
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

This server exposes 36 tool(s):

- **orders_get_order** — Get order
- **orders_get_api_oms_pvt_orders_order_group_by_order_group** — Get orders by order group ID
- **orders_list_orders** — List orders
- **orders_start_handling** — Start handling order
- **orders_cancel_order** — Cancel order
- **orders_register_change** — Register modifications on order
- **orders_add_log** — Add log in orders
- **orders_invoice_notification** — Order invoice notification
- **orders_updatepartialinvoice.send_tracking_number** — Update order's partial invoice (send tracking number)
- **orders_update_tracking_status** — Update order tracking status
- **orders_get_conversation** — Retrieve order conversation
- **orders_get_paymenttransaction** — Retrieve payment transaction
- **orders_send_payment_notification** — Send payment notification
- **orders_getfeedorderstatus** — Get feed order status
- **orders_get_feed_configuration** — Get feed configuration
- **orders_feed_configuration** — Create or update feed configuration
- **orders_feed_configuration_delete** — Delete feed configuration
- **orders_getfeedorderstatus1** — Retrieve feed items
- **orders_commititemfeedorderstatus** — Commit feed items
- **orders_get_hook_configuration** — Get hook configuration
- **orders_hook_configuration** — Create or update hook configuration
- **orders_delete_hook_configuration** — Delete hook configuration
- **orders_get_change_summary** — Get order modifications summary
- **orders_userorderslist** — Retrieve user's orders
- **orders_userorderdetails** — Retrieve user order details
- **orders_test_jso_nata_expression** — Test JSONata expression
- **orders_get_window_to_change_seller** — Get window to change seller
- **orders_update_window_to_change_seller** — Update window to change seller
- **orders_createchange** — Create order modifications
- **orders_get_change_history** — Get order modifications history
- **orders_get_change_detail** — Get order modifications details
- **orders_preview_change** — Preview order modifications
- **orders_retry_change** — Retry order modifications
- **orders_cancel_change_stoppedon_error** — Cancel order modifications
- **orders_put_api_order_system_orders_changes_settings** — Update Order modifications settings
- **orders_get_api_order_system_orders_changes_settings** — Get Order modifications settings
