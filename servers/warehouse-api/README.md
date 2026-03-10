# VTEX Warehouse Api

MCP server for the VTEX Warehouse Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/warehouse-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/warehouse-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "warehouse-api": {
      "command": "npx",
      "args": ["@vtex-mcp/warehouse-api"],
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

- **warehouse_get_api_logistics_pvt_shipping_policies_by_id** — Retrieve shipping policy by ID
- **warehouse_delete_api_logistics_pvt_shipping_policies_by_id** — Delete shipping policy by ID
- **warehouse_put_api_logistics_pvt_shipping_policies_by_id** — Update shipping policy by ID
- **warehouse_get_api_logistics_pvt_shipping_policies** — List shipping policies
- **warehouse_post_api_logistics_pvt_shipping_policies** — Create shipping policy
- **warehouse_create/update_freight_values** — Create or update freight values
- **warehouse_freight_values** — List freight values
- **warehouse_retrieve_blocked_delivery_windows** — Retrieve blocked delivery windows
- **warehouse_add_blocked_delivery_windows** — Add blocked delivery windows
- **warehouse_remove_blocked_delivery_windows** — Remove blocked delivery windows
- **warehouse_create/update_dock** — Create or update dock
- **warehouse_all_docks** — List all docks
- **warehouse_dock_by_id** — List dock by ID
- **warehouse_dock** — Delete dock
- **warehouse_activate_dock** — Activate dock
- **warehouse_deactivate_dock** — Deactivate dock
- **warehouse_create/update_warehouse** — Create or update warehouse
- **warehouse_all_warehouses** — List all warehouses
- **warehouse_warehouse_by_id** — List warehouse by ID
- **warehouse_remove_warehouse** — Remove warehouse
- **warehouse_activate_warehouse** — Activate warehouse
- **warehouse_deactivate_warehouse** — Deactivate warehouse
- **warehouse_inventory_by_sku** — List inventory by SKU
- **warehouse_inventoryperwarehouse** — List inventory per warehouse
- **warehouse_update_inventory_by_skuand_warehouse** — Update inventory by SKU and warehouse
- **warehouse_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_quantity** — Update inventory quantity by SKU and warehouse
- **warehouse_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_lead_time** — Update inventory lead time by SKU and warehouse
- **warehouse_inventoryperdock** — List inventory per dock
- **warehouse_inventoryperdockandwarehouse** — List inventory per dock and warehouse
- **warehouse_getinventorywithdispatchedreservations** — List inventory with dispatched reservations
- **warehouse_get_supply_lots** — List supply lots
- **warehouse_save_supply_lot** — Save supply lot
- **warehouse_transfer_supply_lot** — Transfer supply lot
- **warehouse_create/update_holiday** — Create or update holiday
- **warehouse_holiday_by_id** — List holiday by ID
- **warehouse_holiday** — Delete holiday
- **warehouse_all_holidays** — List all holidays
- **warehouse_create_reservation** — Create reservation
- **warehouse_reservation_by_id** — List reservation by ID
- **warehouse_confirm_reservation** — Confirm reservation
- **warehouse_acknowledgment_reservation** — Acknowledgment reservation
- **warehouse_cancel_reservation** — Cancel reservation
- **warehouse_reservationby_warehouseand_sku** — List reservation by warehouse and SKU
- **warehouse_calculate_sla** — Calculate SLA
- **warehouse_list_all_pickup_ppoints** — List pickup points
- **warehouse_create_update_pickup_point** — Create or update pickup point
- **warehouse_get_by_id** — List pickup point by ID
- **warehouse_delete** — Delete pickup point
- **warehouse_getpaged** — List paged pickup points
- **warehouse_paged_polygons** — List paged polygons
- **warehouse_create_update_polygon** — Create or update polygon
- **warehouse_polygonby_id** — List polygon by ID
- **warehouse_delete_polygon** — Delete polygon
- **warehouse_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames** — Search capacity reservations in time range
- **warehouse_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames_by_window_day_fby_window_start_time_tby_window_end_time** — Get capacity reservation usage by window
