# VTEX Checkout Api

MCP server for the VTEX Checkout Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/checkout-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/checkout-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "checkout-api": {
      "command": "npx",
      "args": ["@vtex-mcp/checkout-api"],
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

This server exposes 39 tool(s):

- **checkout_cart_simulation** — Cart simulation
- **checkout_create_a_new_cart** — Get current or create a new cart
- **checkout_get_cart_information_by_id** — Get cart information by ID
- **checkout_remove_all_items** — Remove all items from shopping cart
- **checkout_removeallpersonaldata** — Remove all personal data from shopping cart
- **checkout_items_update** — Update cart items
- **checkout_items** — Add cart items
- **checkout_items_handle** — Handle cart items
- **checkout_price_change** — Change price of an SKU in a cart
- **checkout_ignore_profile_data** — Ignore profile data on checkout
- **checkout_get_client_profile_by_email** — Get client profile by email
- **checkout_add_client_profile** — Add client profile
- **checkout_add_shipping_address** — Add shipping address and select delivery option
- **checkout_add_client_preferences** — Add client preferences
- **checkout_add_marketing_data** — Add marketing data
- **checkout_add_payment_data** — Add payment data
- **checkout_add_merchant_context_data** — Add merchant context data
- **checkout_post_api_checkout_pub_order_form_by_order_form_id_attachments_invoice_data** — Attach invoice data
- **checkout_set_multiple_custom_field_values** — Set multiple custom field values
- **checkout_set_single_custom_field_value** — Set single custom field value
- **checkout_removesinglecustomfieldvalue** — Remove single custom field value
- **checkout_put_api_checkout_pub_order_form_by_order_form_id_custom_fields** — Batch add custom fields
- **checkout_put_api_checkout_pub_order_form_by_order_form_id_custom_fields_order** — Add order custom field
- **checkout_put_api_checkout_pub_order_form_by_order_form_id_custom_fields_item_by_item_id** — Add item custom field
- **checkout_delete_api_checkout_pub_order_form_by_order_form_id_custom_fields_item_by_item_id** — Remove item custom field
- **checkout_put_api_checkout_pub_order_form_by_order_form_id_custom_fields_address_by_address_id** — Add address custom field
- **checkout_getorder_formconfiguration** — Get order form configuration
- **checkout_updateorder_formconfiguration** — Update order form configuration
- **checkout_get_window_to_change_seller** — Get window to change seller
- **checkout_update_window_to_change_seller** — Update window to change seller
- **checkout_clearorder_form_messages** — Clear order form messages
- **checkout_get_cart_installments** — Cart installments
- **checkout_add_coupons** — Add coupons to the cart
- **checkout_list_pickup_ppoints_by_location** — List pickup points by location
- **checkout_get_address_by_postal_code** — Get address by postal code
- **checkout_place_order_from_existing_order_form** — Place order from an existing cart
- **checkout_place_order** — Place order
- **checkout_process_order** — Process order
- **checkout_get_sellers_by_region** — Get sellers by region or address
