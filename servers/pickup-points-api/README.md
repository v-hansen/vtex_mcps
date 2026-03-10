# VTEX Pickup Points Api

MCP server for the VTEX Pickup Points Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/pickup-points-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/pickup-points-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "pickup-points-api": {
      "command": "npx",
      "args": ["@vtex-mcp/pickup-points-api"],
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

- **pickup-points_get_api_logistics_pvt_shipping_policies_by_id** — Retrieve shipping policy by ID
- **pickup-points_delete_api_logistics_pvt_shipping_policies_by_id** — Delete shipping policy by ID
- **pickup-points_put_api_logistics_pvt_shipping_policies_by_id** — Update shipping policy by ID
- **pickup-points_get_api_logistics_pvt_shipping_policies** — List shipping policies
- **pickup-points_post_api_logistics_pvt_shipping_policies** — Create shipping policy
- **pickup-points_create/update_freight_values** — Create or update freight values
- **pickup-points_freight_values** — List freight values
- **pickup-points_retrieve_blocked_delivery_windows** — Retrieve blocked delivery windows
- **pickup-points_add_blocked_delivery_windows** — Add blocked delivery windows
- **pickup-points_remove_blocked_delivery_windows** — Remove blocked delivery windows
- **pickup-points_create/update_dock** — Create or update dock
- **pickup-points_all_docks** — List all docks
- **pickup-points_dock_by_id** — List dock by ID
- **pickup-points_dock** — Delete dock
- **pickup-points_activate_dock** — Activate dock
- **pickup-points_deactivate_dock** — Deactivate dock
- **pickup-points_create/update_warehouse** — Create or update warehouse
- **pickup-points_all_warehouses** — List all warehouses
- **pickup-points_warehouse_by_id** — List warehouse by ID
- **pickup-points_remove_warehouse** — Remove warehouse
- **pickup-points_activate_warehouse** — Activate warehouse
- **pickup-points_deactivate_warehouse** — Deactivate warehouse
- **pickup-points_inventory_by_sku** — List inventory by SKU
- **pickup-points_inventoryperwarehouse** — List inventory per warehouse
- **pickup-points_update_inventory_by_skuand_warehouse** — Update inventory by SKU and warehouse
- **pickup-points_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_quantity** — Update inventory quantity by SKU and warehouse
- **pickup-points_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_lead_time** — Update inventory lead time by SKU and warehouse
- **pickup-points_inventoryperdock** — List inventory per dock
- **pickup-points_inventoryperdockandwarehouse** — List inventory per dock and warehouse
- **pickup-points_getinventorywithdispatchedreservations** — List inventory with dispatched reservations
- **pickup-points_get_supply_lots** — List supply lots
- **pickup-points_save_supply_lot** — Save supply lot
- **pickup-points_transfer_supply_lot** — Transfer supply lot
- **pickup-points_create/update_holiday** — Create or update holiday
- **pickup-points_holiday_by_id** — List holiday by ID
- **pickup-points_holiday** — Delete holiday
- **pickup-points_all_holidays** — List all holidays
- **pickup-points_create_reservation** — Create reservation
- **pickup-points_reservation_by_id** — List reservation by ID
- **pickup-points_confirm_reservation** — Confirm reservation
- **pickup-points_acknowledgment_reservation** — Acknowledgment reservation
- **pickup-points_cancel_reservation** — Cancel reservation
- **pickup-points_reservationby_warehouseand_sku** — List reservation by warehouse and SKU
- **pickup-points_calculate_sla** — Calculate SLA
- **pickup-points_list_all_pickup_ppoints** — List pickup points
- **pickup-points_create_update_pickup_point** — Create or update pickup point
- **pickup-points_get_by_id** — List pickup point by ID
- **pickup-points_delete** — Delete pickup point
- **pickup-points_getpaged** — List paged pickup points
- **pickup-points_paged_polygons** — List paged polygons
- **pickup-points_create_update_polygon** — Create or update polygon
- **pickup-points_polygonby_id** — List polygon by ID
- **pickup-points_delete_polygon** — Delete polygon
- **pickup-points_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames** — Search capacity reservations in time range
- **pickup-points_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames_by_window_day_fby_window_start_time_tby_window_end_time** — Get capacity reservation usage by window
