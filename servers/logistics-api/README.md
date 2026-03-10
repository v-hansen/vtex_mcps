# VTEX Logistics Api

MCP server for the VTEX Logistics Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/logistics-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/logistics-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "logistics-api": {
      "command": "npx",
      "args": ["@vtex-mcp/logistics-api"],
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

- **logistics_get_api_logistics_pvt_shipping_policies_by_id** — Retrieve shipping policy by ID
- **logistics_delete_api_logistics_pvt_shipping_policies_by_id** — Delete shipping policy by ID
- **logistics_put_api_logistics_pvt_shipping_policies_by_id** — Update shipping policy by ID
- **logistics_get_api_logistics_pvt_shipping_policies** — List shipping policies
- **logistics_post_api_logistics_pvt_shipping_policies** — Create shipping policy
- **logistics_create/update_freight_values** — Create or update freight values
- **logistics_freight_values** — List freight values
- **logistics_retrieve_blocked_delivery_windows** — Retrieve blocked delivery windows
- **logistics_add_blocked_delivery_windows** — Add blocked delivery windows
- **logistics_remove_blocked_delivery_windows** — Remove blocked delivery windows
- **logistics_create/update_dock** — Create or update dock
- **logistics_all_docks** — List all docks
- **logistics_dock_by_id** — List dock by ID
- **logistics_dock** — Delete dock
- **logistics_activate_dock** — Activate dock
- **logistics_deactivate_dock** — Deactivate dock
- **logistics_create/update_warehouse** — Create or update warehouse
- **logistics_all_warehouses** — List all warehouses
- **logistics_warehouse_by_id** — List warehouse by ID
- **logistics_remove_warehouse** — Remove warehouse
- **logistics_activate_warehouse** — Activate warehouse
- **logistics_deactivate_warehouse** — Deactivate warehouse
- **logistics_inventory_by_sku** — List inventory by SKU
- **logistics_inventoryperwarehouse** — List inventory per warehouse
- **logistics_update_inventory_by_skuand_warehouse** — Update inventory by SKU and warehouse
- **logistics_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_quantity** — Update inventory quantity by SKU and warehouse
- **logistics_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_lead_time** — Update inventory lead time by SKU and warehouse
- **logistics_inventoryperdock** — List inventory per dock
- **logistics_inventoryperdockandwarehouse** — List inventory per dock and warehouse
- **logistics_getinventorywithdispatchedreservations** — List inventory with dispatched reservations
- **logistics_get_supply_lots** — List supply lots
- **logistics_save_supply_lot** — Save supply lot
- **logistics_transfer_supply_lot** — Transfer supply lot
- **logistics_create/update_holiday** — Create or update holiday
- **logistics_holiday_by_id** — List holiday by ID
- **logistics_holiday** — Delete holiday
- **logistics_all_holidays** — List all holidays
- **logistics_create_reservation** — Create reservation
- **logistics_reservation_by_id** — List reservation by ID
- **logistics_confirm_reservation** — Confirm reservation
- **logistics_acknowledgment_reservation** — Acknowledgment reservation
- **logistics_cancel_reservation** — Cancel reservation
- **logistics_reservationby_warehouseand_sku** — List reservation by warehouse and SKU
- **logistics_calculate_sla** — Calculate SLA
- **logistics_list_all_pickup_ppoints** — List pickup points
- **logistics_create_update_pickup_point** — Create or update pickup point
- **logistics_get_by_id** — List pickup point by ID
- **logistics_delete** — Delete pickup point
- **logistics_getpaged** — List paged pickup points
- **logistics_paged_polygons** — List paged polygons
- **logistics_create_update_polygon** — Create or update polygon
- **logistics_polygonby_id** — List polygon by ID
- **logistics_delete_polygon** — Delete polygon
- **logistics_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames** — Search capacity reservations in time range
- **logistics_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames_by_window_day_fby_window_start_time_tby_window_end_time** — Get capacity reservation usage by window
