# VTEX Sku Bindings Api

MCP server for the VTEX Sku Bindings Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/sku-bindings-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/sku-bindings-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "sku-bindings-api": {
      "command": "npx",
      "args": ["@vtex-mcp/sku-bindings-api"],
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

This server exposes 12 tool(s):

- **sku-bindings_getby_sku_id** — Get SKU bindings by SKU ID
- **sku-bindings_getpagedadmin** — Get SKU bindings information
- **sku-bindings_get_sk_useller** — Get details of a seller's SKU
- **sku-bindings_bindtoanothersku** — Bind a seller's SKU to another SKU
- **sku-bindings_getallby_seller_id** — Get all SKU bindings by seller ID
- **sku-bindings_getpagedby_seller_id** — Get paged SKU bindings by seller ID
- **sku-bindings_change_notification** — Change notification with SKU ID
- **sku-bindings_post_sku_binding_pvt_skuseller_changenotification_by_seller_id_by_seller_sku_id** — Change notification with seller ID and seller SKU ID
- **sku-bindings_insert_sku_binding** — Insert SKU binding
- **sku-bindings_activate_sku_binding** — Activate SKU binding
- **sku-bindings_deactivate_sku_binding** — Deactivate SKU binding
- **sku-bindings_delete_sk_usellerassociation** — Remove a seller's SKU binding
