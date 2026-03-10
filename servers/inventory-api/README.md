# VTEX Inventory Api

MCP server for the VTEX Inventory Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/inventory-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/inventory-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "inventory-api": {
      "command": "npx",
      "args": ["@vtex-mcp/inventory-api"],
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

This server exposes 55 tool(s):

- **inventory_get_api_logistics_pvt_shipping_policies_by_id** — Retrieve shipping policy by ID
- **inventory_delete_api_logistics_pvt_shipping_policies_by_id** — Delete shipping policy by ID
- **inventory_put_api_logistics_pvt_shipping_policies_by_id** — Update shipping policy by ID
- **inventory_get_api_logistics_pvt_shipping_policies** — List shipping policies
- **inventory_post_api_logistics_pvt_shipping_policies** — Create shipping policy
- **inventory_create/update_freight_values** — Create or update freight values
- **inventory_freight_values** — List freight values
- **inventory_retrieve_blocked_delivery_windows** — Retrieve blocked delivery windows
- **inventory_add_blocked_delivery_windows** — Add blocked delivery windows
- **inventory_remove_blocked_delivery_windows** — Remove blocked delivery windows
- **inventory_create/update_dock** — Create or update dock
- **inventory_all_docks** — List all docks
- **inventory_dock_by_id** — List dock by ID
- **inventory_dock** — Delete dock
- **inventory_activate_dock** — Activate dock
- **inventory_deactivate_dock** — Deactivate dock
- **inventory_create/update_warehouse** — Create or update warehouse
- **inventory_all_warehouses** — List all warehouses
- **inventory_warehouse_by_id** — List warehouse by ID
- **inventory_remove_warehouse** — Remove warehouse
- **inventory_activate_warehouse** — Activate warehouse
- **inventory_deactivate_warehouse** — Deactivate warehouse
- **inventory_inventory_by_sku** — List inventory by SKU
- **inventory_inventoryperwarehouse** — List inventory per warehouse
- **inventory_update_inventory_by_skuand_warehouse** — Update inventory by SKU and warehouse
- **inventory_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_quantity** — Update inventory quantity by SKU and warehouse
- **inventory_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_lead_time** — Update inventory lead time by SKU and warehouse
- **inventory_inventoryperdock** — List inventory per dock
- **inventory_inventoryperdockandwarehouse** — List inventory per dock and warehouse
- **inventory_getinventorywithdispatchedreservations** — List inventory with dispatched reservations
- **inventory_get_supply_lots** — List supply lots
- **inventory_save_supply_lot** — Save supply lot
- **inventory_transfer_supply_lot** — Transfer supply lot
- **inventory_create/update_holiday** — Create or update holiday
- **inventory_holiday_by_id** — List holiday by ID
- **inventory_holiday** — Delete holiday
- **inventory_all_holidays** — List all holidays
- **inventory_create_reservation** — Create reservation
- **inventory_reservation_by_id** — List reservation by ID
- **inventory_confirm_reservation** — Confirm reservation
- **inventory_acknowledgment_reservation** — Acknowledgment reservation
- **inventory_cancel_reservation** — Cancel reservation
- **inventory_reservationby_warehouseand_sku** — List reservation by warehouse and SKU
- **inventory_calculate_sla** — Calculate SLA
- **inventory_list_all_pickup_ppoints** — List pickup points
- **inventory_create_update_pickup_point** — Create or update pickup point
- **inventory_get_by_id** — List pickup point by ID
- **inventory_delete** — Delete pickup point
- **inventory_getpaged** — List paged pickup points
- **inventory_paged_polygons** — List paged polygons
- **inventory_create_update_polygon** — Create or update polygon
- **inventory_polygonby_id** — List polygon by ID
- **inventory_delete_polygon** — Delete polygon
- **inventory_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames** — Search capacity reservations in time range
- **inventory_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames_by_window_day_fby_window_start_time_tby_window_end_time** — Get capacity reservation usage by window
