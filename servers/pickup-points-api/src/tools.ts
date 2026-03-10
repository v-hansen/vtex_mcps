import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "pickup-points_get_api_logistics_pvt_shipping_policies_by_id",
      description: "Retrieve shipping policy by ID\nGET /api/logistics/pvt/shipping-policies/{id}",
      inputSchema: z.object({
  id: z.string().describe("[Shipping policy](https://help.vtex.com/en/tutorial/shipping-policy--tutorials_140) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/shipping-policies/${params.id}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_delete_api_logistics_pvt_shipping_policies_by_id",
      description: "Delete shipping policy by ID\nDELETE /api/logistics/pvt/shipping-policies/{id}",
      inputSchema: z.object({
  id: z.string().describe("ID of the shipping policy.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/shipping-policies/${params.id}`;
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_put_api_logistics_pvt_shipping_policies_by_id",
      description: "Update shipping policy by ID\nPUT /api/logistics/pvt/shipping-policies/{id}",
      inputSchema: z.object({
  id: z.string().describe("Shipping policy ID."),
  body: z.object({ name: z.string(), shippingMethod: z.string(), deliveryOnWeekends: z.boolean(), maxDimension: z.object({ largestMeasure: z.number(), maxMeasureSum: z.number() }), cubicWeightSettings: z.object({ volumetricFactor: z.number().optional(), minimunAcceptableVolumetricWeight: z.number().optional() }).optional(), modalSettings: z.object({ modals: z.array(z.enum(["CHEMICALS", "ELECTRONICS", "FURNITURE", "GLASS", "LIQUID", "MATTRESSES", "REFRIGERATED", "TIRES", "WHITE_GOODS", "FIREARMS"])).optional(), useOnlyItemsWithDefinedModal: z.boolean().optional() }).optional(), isActive: z.boolean(), deliveryScheduleSettings: z.object({ useDeliverySchedule: z.boolean(), maxRangeDelivery: z.number(), dayOfWeekForDelivery: z.array(z.object({ dayOfWeek: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]), deliveryRanges: z.array(z.object({ startTime: z.string(), endTime: z.string(), listPrice: z.number(), deliveryCapacity: z.array(z.object({ capacityType: z.string(), maxValue: z.number() })).optional() })) })) }).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/shipping-policies/${params.id}`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_get_api_logistics_pvt_shipping_policies",
      description: "List shipping policies\nGET /api/logistics/pvt/shipping-policies",
      inputSchema: z.object({
  page: z.number().int().optional().describe("Number of the starting page of the response. When no value is sent, it starts in page `1`."),
  perPage: z.number().int().optional().describe("Desired number of items per page, to retrieve information from your shipping policies.")
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/shipping-policies";
    const queryParams: Record<string, unknown> = {};
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.perPage !== undefined) queryParams["perPage"] = params.perPage;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_post_api_logistics_pvt_shipping_policies",
      description: "Create shipping policy\nPOST /api/logistics/pvt/shipping-policies",
      inputSchema: z.object({
  body: z.object({ id: z.string(), name: z.string(), shippingMethod: z.string(), weekendAndHolidays: z.object({ saturday: z.boolean(), sunday: z.boolean(), holiday: z.boolean() }), maxDimension: z.object({ largestMeasure: z.number(), maxMeasureSum: z.number() }), numberOfItemsPerShipment: z.number().int(), minimumValueAceptable: z.number(), maximumValueAceptable: z.number(), deliveryScheduleSettings: z.object({ useDeliverySchedule: z.boolean(), maxRangeDelivery: z.number(), dayOfWeekForDelivery: z.array(z.object({ dayOfWeek: z.number().int(), deliveryRanges: z.array(z.object({ startTime: z.string(), endTime: z.string(), listPrice: z.number(), deliveryCapacity: z.array(z.object({ capacityType: z.string(), maxValue: z.number() })).optional() })) })) }), carrierSchedule: z.array(z.object({ dayOfWeek: z.number().int().optional(), timeLimit: z.string().optional() })).optional(), cubicWeightSettings: z.object({ volumetricFactor: z.number(), minimunAcceptableVolumetricWeight: z.number() }), modalSettings: z.object({ modals: z.array(z.enum(["CHEMICALS", "ELECTRONICS", "FURNITURE", "GLASS", "LIQUID", "MATTRESSES", "REFRIGERATED", "TIRES", "WHITE_GOODS", "FIREARMS"])), useOnlyItemsWithDefinedModal: z.boolean() }), businessHourSettings: z.object({ carrierBusinessHours: z.array(z.object({ openingTime: z.string(), closingTime: z.string(), dayOfWeek: z.number().int() })), isOpenOutsideBusinessHours: z.boolean() }), pickupPointsSettings: z.object({ pickupPointIds: z.array(z.string()), pickupPointTags: z.array(z.string()), sellers: z.array(z.string()) }), isActive: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/shipping-policies";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_create/update_freight_values",
      description: "Create or update freight values\nPOST /api/logistics/pvt/configuration/freights/{carrierId}/values/update",
      inputSchema: z.object({
  carrierId: z.string().describe("Carrier ID."),
  body: z.array(z.object({ absoluteMoneyCost: z.string(), country: z.string(), maxVolume: z.number().int(), operationType: z.number().int(), pricePercent: z.number().int(), pricePercentByWeight: z.number().int(), timeCost: z.string(), weightEnd: z.number().int(), weightStart: z.number().int(), zipCodeEnd: z.string(), zipCodeStart: z.string(), polygon: z.string() })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/freights/${params.carrierId}/values/update`;
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_freight_values",
      description: "List freight values\nGET /api/logistics/pvt/configuration/freights/{carrierId}/{cep}/values",
      inputSchema: z.object({
  carrierId: z.string().describe("Carrier ID."),
  cep: z.string().describe("Postal code of the area in which you wish to retrieve freight values for a given carrier, according to your [shipping rate template](https://help.vtex.com/en/tutorial/shipping-rate-template--tutorials_127) configurations.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/freights/${params.carrierId}/${params.cep}/values`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_retrieve_blocked_delivery_windows",
      description: "Retrieve blocked delivery windows\nGET /api/logistics/pvt/configuration/carriers/{carrierId}/getdayofweekblocked",
      inputSchema: z.object({
  carrierId: z.string().describe("[Shipping policy](https://help.vtex.com/en/tutorial/shipping-policy--tutorials_140) ID (carrier ID).")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/carriers/${params.carrierId}/getdayofweekblocked`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_add_blocked_delivery_windows",
      description: "Add blocked delivery windows\nPOST /api/logistics/pvt/configuration/carriers/{carrierId}/adddayofweekblocked",
      inputSchema: z.object({
  carrierId: z.string().describe("[Shipping policy](https://help.vtex.com/en/tutorial/shipping-policy--tutorials_140) ID (carrier ID)."),
  body: z.string().optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/carriers/${params.carrierId}/adddayofweekblocked`;
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_remove_blocked_delivery_windows",
      description: "Remove blocked delivery windows\nPOST /api/logistics/pvt/configuration/carriers/{carrierId}/removedayofweekblocked",
      inputSchema: z.object({
  carrierId: z.string().describe("[Shipping policy](https://help.vtex.com/en/tutorial/shipping-policy--tutorials_140) ID (carrier ID)."),
  body: z.string().optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/carriers/${params.carrierId}/removedayofweekblocked`;
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_create/update_dock",
      description: "Create or update dock\nPOST /api/logistics/pvt/configuration/docks",
      inputSchema: z.object({
  body: z.object({ id: z.string(), name: z.string(), priority: z.number().int(), dockTimeFake: z.string(), timeFakeOverhead: z.string(), salesChannels: z.array(z.string()), salesChannel: z.string(), freightTableIds: z.array(z.string()), wmsEndPoint: z.string(), address: z.object({ postalCode: z.string(), country: z.object({ acronym: z.string(), name: z.string() }), city: z.string(), state: z.string(), neighborhood: z.string(), street: z.string(), number: z.string(), complement: z.string(), coordinates: z.array(z.array(z.number())) }) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/docks";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_all_docks",
      description: "List all docks\nGET /api/logistics/pvt/configuration/docks",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/docks";
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_dock_by_id",
      description: "List dock by ID\nGET /api/logistics/pvt/configuration/docks/{dockId}",
      inputSchema: z.object({
  dockId: z.string().describe("[Loading dock](https://help.vtex.com/en/tutorial/loading-dock--5DY8xHEjOLYDVL41Urd5qj) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/docks/${params.dockId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_dock",
      description: "Delete dock\nDELETE /api/logistics/pvt/configuration/docks/{dockId}",
      inputSchema: z.object({
  dockId: z.string().describe("[Loading dock](https://help.vtex.com/en/tutorial/loading-dock--5DY8xHEjOLYDVL41Urd5qj) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/docks/${params.dockId}`;
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_activate_dock",
      description: "Activate dock\nPOST /api/logistics/pvt/configuration/docks/{dockId}/activation",
      inputSchema: z.object({
  dockId: z.string().describe("[Loading dock](https://help.vtex.com/en/tutorial/loading-dock--5DY8xHEjOLYDVL41Urd5qj) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/docks/${params.dockId}/activation`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_deactivate_dock",
      description: "Deactivate dock\nPOST /api/logistics/pvt/configuration/docks/{dockId}/deactivation",
      inputSchema: z.object({
  dockId: z.string().describe("[Loading dock](https://help.vtex.com/en/tutorial/loading-dock--5DY8xHEjOLYDVL41Urd5qj) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/docks/${params.dockId}/deactivation`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_create/update_warehouse",
      description: "Create or update warehouse\nPOST /api/logistics/pvt/configuration/warehouses",
      inputSchema: z.object({
  body: z.object({ id: z.string(), name: z.string(), warehouseDocks: z.array(z.object({ dockId: z.string(), name: z.string(), time: z.string(), cost: z.string(), translateDays: z.string(), costToDisplay: z.string() })), priority: z.number().int().optional(), isActive: z.boolean().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/warehouses";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_all_warehouses",
      description: "List all warehouses\nGET /api/logistics/pvt/configuration/warehouses",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/warehouses";
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_warehouse_by_id",
      description: "List warehouse by ID\nGET /api/logistics/pvt/configuration/warehouses/{warehouseId}",
      inputSchema: z.object({
  warehouseId: z.string().describe("[Warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/warehouses/${params.warehouseId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_remove_warehouse",
      description: "Remove warehouse\nDELETE /api/logistics/pvt/configuration/warehouses/{warehouseId}",
      inputSchema: z.object({
  warehouseId: z.string().describe("[Warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/warehouses/${params.warehouseId}`;
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_activate_warehouse",
      description: "Activate warehouse\nPOST /api/logistics/pvt/configuration/warehouses/{warehouseId}/activation",
      inputSchema: z.object({
  warehouseId: z.string().describe("[Warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/warehouses/${params.warehouseId}/activation`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_deactivate_warehouse",
      description: "Deactivate warehouse\nPOST /api/logistics/pvt/configuration/warehouses/{warehouseId}/deactivation",
      inputSchema: z.object({
  warehouseId: z.string().describe("[Warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/warehouses/${params.warehouseId}/deactivation`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_inventory_by_sku",
      description: "List inventory by SKU\nGET /api/logistics/pvt/inventory/skus/{skuId}",
      inputSchema: z.object({
  skuId: z.string().describe("Every SKU has a unique identifier called SKU ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/skus/${params.skuId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_inventoryperwarehouse",
      description: "List inventory per warehouse\nGET /api/logistics/pvt/inventory/items/{skuId}/warehouses/{warehouseId}",
      inputSchema: z.object({
  skuId: z.string().describe("SKU unique identifier."),
  warehouseId: z.string().describe("Warehouse ID is the unique identifier of the [warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb).")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/items/${params.skuId}/warehouses/${params.warehouseId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_update_inventory_by_skuand_warehouse",
      description: "Update inventory by SKU and warehouse\nPUT /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}",
      inputSchema: z.object({
  skuId: z.string().describe("Unique identifier of the SKU you wish to update."),
  warehouseId: z.string().describe("Unique identifier of the [warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) of the SKU you wish to update."),
  body: z.object({ quantity: z.number().int(), unlimitedQuantity: z.boolean(), dateUtcOnBalanceSystem: z.string().optional(), leadTime: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/skus/${params.skuId}/warehouses/${params.warehouseId}`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 423:
        throw new Error("Locked");
      }
    }
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_quantity",
      description: "Update inventory quantity by SKU and warehouse\nPATCH /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}/quantity",
      inputSchema: z.object({
  skuId: z.string().describe("Unique identifier of the SKU you wish to update."),
  warehouseId: z.string().describe("Unique identifier of the [warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) of the SKU you wish to update."),
  body: z.object({ quantity: z.number().int(), unlimitedQuantity: z.boolean(), dateUtcOnBalanceSystem: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/skus/${params.skuId}/warehouses/${params.warehouseId}/quantity`;
    const response = await http.patch(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      }
    }
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_patch_api_logistics_pvt_inventory_skus_by_sku_id_warehouses_by_warehouse_id_lead_time",
      description: "Update inventory lead time by SKU and warehouse\nPATCH /api/logistics/pvt/inventory/skus/{skuId}/warehouses/{warehouseId}/lead-time",
      inputSchema: z.object({
  skuId: z.string().describe("Unique identifier of the SKU you wish to update."),
  warehouseId: z.string().describe("Unique identifier of the [warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) of the SKU you wish to update."),
  body: z.object({ leadTime: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/skus/${params.skuId}/warehouses/${params.warehouseId}/lead-time`;
    const response = await http.patch(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      }
    }
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_inventoryperdock",
      description: "List inventory per dock\nGET /api/logistics/pvt/inventory/items/{skuId}/docks/{dockId}",
      inputSchema: z.object({
  skuId: z.string().describe("SKU unique identifier."),
  dockId: z.string().describe("[Loading dock](https://help.vtex.com/en/tutorial/loading-dock--5DY8xHEjOLYDVL41Urd5qj) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/items/${params.skuId}/docks/${params.dockId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_inventoryperdockandwarehouse",
      description: "List inventory per dock and warehouse\nGET /api/logistics/pvt/inventory/items/{skuId}/docks/{dockId}/warehouses/{warehouseId}",
      inputSchema: z.object({
  skuId: z.string().describe("SKU unique identifier."),
  dockId: z.string().describe("[Loading dock](https://help.vtex.com/en/tutorial/loading-dock--5DY8xHEjOLYDVL41Urd5qj) ID."),
  warehouseId: z.string().describe("[Warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/items/${params.skuId}/docks/${params.dockId}/warehouses/${params.warehouseId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_getinventorywithdispatchedreservations",
      description: "List inventory with dispatched reservations\nGET /api/logistics/pvt/inventory/items/{itemId}/warehouses/{warehouseId}/dispatched",
      inputSchema: z.object({
  itemId: z.string().describe("SKU unique identifier called SKU ID. This field is an equivalent to `skuId`."),
  warehouseId: z.string().describe("Warehouse ID is the unique identifier of the [warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb).")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/items/${params.itemId}/warehouses/${params.warehouseId}/dispatched`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_get_supply_lots",
      description: "List supply lots\nGET /api/logistics/pvt/inventory/items/{skuId}/warehouses/{warehouseId}/supplyLots",
      inputSchema: z.object({
  skuId: z.string().describe("SKU ID."),
  warehouseId: z.string().describe("ID of the [warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) where the SKU is located.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/items/${params.skuId}/warehouses/${params.warehouseId}/supplyLots`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_save_supply_lot",
      description: "Save supply lot\nPUT /api/logistics/pvt/inventory/items/{skuId}/warehouses/{warehouseId}/supplyLots/{supplyLotId}",
      inputSchema: z.object({
  skuId: z.string().describe("SKU ID being scheduled for availability for sales."),
  warehouseId: z.string().describe("ID of the [warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) where the SKU will arrive."),
  supplyLotId: z.string().describe("ID of the supply lot of the SKU availability scheduling."),
  body: z.object({ quantity: z.number().int(), dateOfSupplyUtc: z.string(), keepSellingAfterExpiration: z.boolean().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/items/${params.skuId}/warehouses/${params.warehouseId}/supplyLots/${params.supplyLotId}`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_transfer_supply_lot",
      description: "Transfer supply lot\nPOST /api/logistics/pvt/inventory/items/{skuId}/warehouses/{warehouseId}/supplyLots/{supplyLotId}/transfer",
      inputSchema: z.object({
  skuId: z.string().describe("ID of the SKU."),
  warehouseId: z.string().describe("ID of the [warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) where the SKU is located."),
  supplyLotId: z.string().describe("ID of the supply lot in which the SKU is currently located and from where it will be transfered.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/items/${params.skuId}/warehouses/${params.warehouseId}/supplyLots/${params.supplyLotId}/transfer`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_create/update_holiday",
      description: "Create or update holiday\nPUT /api/logistics/pvt/configuration/holidays/{holidayId}",
      inputSchema: z.object({
  holidayId: z.string().describe("[Holiday](https://help.vtex.com/en/tutorial/registering-holidays--2ItOthSEAoyAmcwsuiO6Yk) ID."),
  body: z.object({ name: z.string(), startDate: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/holidays/${params.holidayId}`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_holiday_by_id",
      description: "List holiday by ID\nGET /api/logistics/pvt/configuration/holidays/{holidayId}",
      inputSchema: z.object({
  holidayId: z.string().describe("[Holiday](https://help.vtex.com/en/tutorial/registering-holidays--2ItOthSEAoyAmcwsuiO6Yk) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/holidays/${params.holidayId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_holiday",
      description: "Delete holiday\nDELETE /api/logistics/pvt/configuration/holidays/{holidayId}",
      inputSchema: z.object({
  holidayId: z.string().describe("[Holiday](https://help.vtex.com/en/tutorial/registering-holidays--2ItOthSEAoyAmcwsuiO6Yk) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/holidays/${params.holidayId}`;
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_all_holidays",
      description: "List all holidays\nGET /api/logistics/pvt/configuration/holidays",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/holidays";
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_create_reservation",
      description: "Create reservation\nPOST /api/logistics/pvt/inventory/reservations",
      inputSchema: z.object({
  body: z.object({ salesChannel: z.string(), lockId: z.string(), autorizationExpirationTTL: z.string(), deliveryItemOptions: z.array(z.object({ item: z.object({ id: z.string(), quantity: z.number().int(), kitItem: z.array(z.string()), price: z.number(), modal: z.enum(["CHEMICALS", "ELECTRONICS", "FURNITURE", "GLASS", "LIQUID", "MATTRESSES", "REFRIGERATED", "TIRES", "WHITE_GOODS", "FIREARMS"]).optional(), additionalHandlingTime: z.string(), dimension: z.object({ weight: z.number(), height: z.number(), width: z.number(), length: z.number() }) }), slaType: z.string(), slaTypeName: z.string(), listPrice: z.number(), promotionalPrice: z.number(), transitTime: z.string(), dockTime: z.string(), timeToDockPlusDockTime: z.string(), aditionalTimeBlockedDays: z.string(), totalTime: z.string(), deliveryWindows: z.array(z.object({ startDateUtc: z.string().optional(), endDateUtc: z.string().optional(), listPrice: z.string().optional() })), wareHouseId: z.string(), dockId: z.string(), location: z.object({ zipCode: z.string(), country: z.string(), inStore: z.object({ IsCheckedIn: z.boolean(), StoreId: z.string() }) }) })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/inventory/reservations";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_reservation_by_id",
      description: "List reservation by ID\nGET /api/logistics/pvt/inventory/reservations/{reservationId}",
      inputSchema: z.object({
  reservationId: z.string().describe("[Reservation](https://help.vtex.com/en/tutorial/how-the-reservation-works--tutorials_92) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/reservations/${params.reservationId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_confirm_reservation",
      description: "Confirm reservation\nPOST /api/logistics/pvt/inventory/reservations/{reservationId}/confirm",
      inputSchema: z.object({
  reservationId: z.string().describe("[Reservation](https://help.vtex.com/en/tutorial/how-the-reservation-works--tutorials_92) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/reservations/${params.reservationId}/confirm`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_acknowledgment_reservation",
      description: "Acknowledgment reservation\nPOST /api/logistics/pvt/inventory/reservations/{reservationId}/acknowledge",
      inputSchema: z.object({
  reservationId: z.string().describe("[Reservation](https://help.vtex.com/en/tutorial/how-the-reservation-works--tutorials_92) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/reservations/${params.reservationId}/acknowledge`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_cancel_reservation",
      description: "Cancel reservation\nPOST /api/logistics/pvt/inventory/reservations/{reservationId}/cancel",
      inputSchema: z.object({
  reservationId: z.string().describe("[Reservation](https://help.vtex.com/en/tutorial/how-the-reservation-works--tutorials_92) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/reservations/${params.reservationId}/cancel`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_reservationby_warehouseand_sku",
      description: "List reservation by warehouse and SKU\nGET /api/logistics/pvt/inventory/reservations/{warehouseId}/{skuId}",
      inputSchema: z.object({
  warehouseId: z.string().describe("[Warehouse](https://help.vtex.com/en/tutorial/warehouse--6oIxvsVDTtGpO7y6zwhGpb) ID."),
  skuId: z.string().describe("SKU ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/inventory/reservations/${params.warehouseId}/${params.skuId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_calculate_sla",
      description: "Calculate SLA\nPOST /api/logistics/pvt/shipping/calculate",
      inputSchema: z.object({
  body: z.array(z.object({ items: z.array(z.object({ id: z.string(), quantity: z.number().int(), price: z.number().optional(), modal: z.enum(["CHEMICALS", "ELECTRONICS", "FURNITURE", "GLASS", "LIQUID", "MATTRESSES", "REFRIGERATED", "TIRES", "WHITE_GOODS", "FIREARMS"]).optional(), additionalHandlingTime: z.string().optional(), dimension: z.object({ weight: z.number().optional(), height: z.number().optional(), width: z.number().optional(), length: z.number().optional(), maxSumDimension: z.number().optional() }), kitItem: z.array(z.object({ id: z.string(), groupItemId: z.string().optional(), kitItem: z.array(z.string()).optional(), quantity: z.number().int(), price: z.number().optional(), additionalHandlingTime: z.string().optional(), dimension: z.object({ weight: z.number().optional(), height: z.number().optional(), width: z.number().optional(), length: z.number().optional(), maxSumDimension: z.number().optional() }) })).optional(), dockId: z.string().optional(), wareHouseId: z.string().optional() })), location: z.object({ zipCode: z.string(), country: z.string(), point: z.array(z.number()).optional(), inStore: z.object({ IsCheckedIn: z.boolean().optional(), StoreId: z.string().optional() }).optional() }), salesChannel: z.string().optional(), deliveryChannel: z.string().optional() })).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/shipping/calculate";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_list_all_pickup_ppoints",
      description: "List pickup points\nGET /api/logistics/pvt/configuration/pickuppoints",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/pickuppoints";
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_create_update_pickup_point",
      description: "Create or update pickup point\nPUT /api/logistics/pvt/configuration/pickuppoints/{pickupPointId}",
      inputSchema: z.object({
  pickupPointId: z.string().describe("[Pickup point](https://help.vtex.com/en/tutorial/pickup-points--2fljn6wLjn8M4lJHA6HP3R) ID. Cannot contain spaces."),
  body: z.object({ id: z.string(), name: z.string(), description: z.string(), instructions: z.string(), formatted_address: z.string(), address: z.object({ postalCode: z.string(), country: z.object({ acronym: z.string(), name: z.string() }), city: z.string(), state: z.string(), neighborhood: z.string(), street: z.string(), number: z.string(), complement: z.string(), reference: z.string(), location: z.object({ latitude: z.number(), longitude: z.number() }) }), isActive: z.boolean(), businessHours: z.array(z.object({ dayOfWeek: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]), openingTime: z.string(), closingTime: z.string() })), tagsLabel: z.array(z.string()), isThirdPartyPickup: z.boolean().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/pickuppoints/${params.pickupPointId}`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_get_by_id",
      description: "List pickup point by ID\nGET /api/logistics/pvt/configuration/pickuppoints/{pickupPointId}",
      inputSchema: z.object({
  pickupPointId: z.string().describe("[Pickup point](https://help.vtex.com/en/tutorial/pickup-points--2fljn6wLjn8M4lJHA6HP3R) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/pickuppoints/${params.pickupPointId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_delete",
      description: "Delete pickup point\nDELETE /api/logistics/pvt/configuration/pickuppoints/{pickupPointId}",
      inputSchema: z.object({
  pickupPointId: z.string().describe("[Pickup point](https://help.vtex.com/en/tutorial/pickup-points--2fljn6wLjn8M4lJHA6HP3R) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/pickuppoints/${params.pickupPointId}`;
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_getpaged",
      description: "List paged pickup points\nGET /api/logistics/pvt/configuration/pickuppoints/_search",
      inputSchema: z.object({
  page: z.number().int().optional().describe("Number of the page of the response. When not informed, the default page returned is `1`, but you can use this parameter to retrieve a specific page. The response is limited to 100 pages."),
  pageSize: z.number().int().optional().describe("Number of [pickup points](https://help.vtex.com/en/tutorial/pickup-points--2fljn6wLjn8M4lJHA6HP3R) per page."),
  keyword: z.string().optional().describe("Search pickup points by using a keyword.")
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/pickuppoints/_search";
    const queryParams: Record<string, unknown> = {};
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.pageSize !== undefined) queryParams["pageSize"] = params.pageSize;
    if (params.keyword !== undefined) queryParams["keyword"] = params.keyword;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_paged_polygons",
      description: "List paged polygons\nGET /api/logistics/pvt/configuration/geoshape",
      inputSchema: z.object({
  page: z.number().int().optional().describe("Number of the page of the response."),
  perPage: z.number().int().optional().describe("Number of [polygons](https://help.vtex.com/en/tutorial/registering-geolocation--tutorials_138) per page.")
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/geoshape";
    const queryParams: Record<string, unknown> = {};
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.perPage !== undefined) queryParams["perPage"] = params.perPage;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_create_update_polygon",
      description: "Create or update polygon\nPUT /api/logistics/pvt/configuration/geoshape",
      inputSchema: z.object({
  body: z.object({ name: z.string(), geoShape: z.object({ coordinates: z.array(z.array(z.array(z.number()))) }) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/logistics/pvt/configuration/geoshape";
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      }
    }
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_polygonby_id",
      description: "List polygon by ID\nGET /api/logistics/pvt/configuration/geoshape/{polygonName}",
      inputSchema: z.object({
  polygonName: z.string().describe("[Polygon](https://help.vtex.com/en/tutorial/registering-geolocation--tutorials_138) ID (same as the polygon name).")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/geoshape/${params.polygonName}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_delete_polygon",
      description: "Delete polygon\nDELETE /api/logistics/pvt/configuration/geoshape/{polygonName}",
      inputSchema: z.object({
  polygonName: z.string().describe("[Polygon](https://help.vtex.com/en/tutorial/registering-geolocation--tutorials_138) ID (same as the polygon name).")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics/pvt/configuration/geoshape/${params.polygonName}`;
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames",
      description: "Search capacity reservations in time range\nGET /api/logistics-capacity/resources/carrier@{capacityType}@{shippingPolicyId}/time-frames",
      inputSchema: z.object({
  capacityType: z.string().describe("Defines how the [delivery capacity](https://help.vtex.com/en/tutorial/managing-delivery-capacity--2y217FQZCjD0I1n62yxVcz) is set in the [shipping policy](https://help.vtex.com/en/tutorial/shipping-policy--tutorials_140), which can be by maximum number of orders (`orders_quantity`) or items (`skus_quantity`)."),
  shippingPolicyId: z.string().describe("ID of the [shipping policy](https://help.vtex.com/en/tutorial/shipping-policy--tutorials_140) being searched for capacity reservation."),
  rangeStart: z.string().describe("Starting date range in the format `YYYY-MM-DD`."),
  rangeEnd: z.string().describe("Ending date range in the format `YYYY-MM-DD`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics-capacity/resources/carrier@${params.capacityType}@${params.shippingPolicyId}/time-frames`;
    const queryParams: Record<string, unknown> = {};
    if (params.rangeStart !== undefined) queryParams["rangeStart"] = params.rangeStart;
    if (params.rangeEnd !== undefined) queryParams["rangeEnd"] = params.rangeEnd;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "pickup-points_get_api_logistics_capacity_resources_carrier_by_capacity_type_by_shipping_policy_id_time_frames_by_window_day_fby_window_start_time_tby_window_end_time",
      description: "Get capacity reservation usage by window\nGET /api/logistics-capacity/resources/carrier@{capacityType}@{shippingPolicyId}/time-frames/{windowDay}F{windowStartTime}T{windowEndTime}",
      inputSchema: z.object({
  capacityType: z.string().describe("Defines how the [delivery capacity](https://help.vtex.com/en/tutorial/managing-delivery-capacity--2y217FQZCjD0I1n62yxVcz) is set in the [shipping policy](https://help.vtex.com/en/tutorial/shipping-policy--tutorials_140), which can be by maximum number of orders (`orders_quantity`) or items (`skus_quantity`)."),
  shippingPolicyId: z.string().describe("ID of the [shipping policy](https://help.vtex.com/en/tutorial/shipping-policy--tutorials_140) being searched for capacity reservation."),
  windowDay: z.string().describe("Date of the [scheduled delivery window](https://help.vtex.com/en/tutorial/scheduled-delivery--22g3HAVCGLFiU7xugShOBi) being consulted for reservations. The format is `YYYY-MM-DD`."),
  windowStartTime: z.string().describe("Starting time of the scheduled delivery window being consulted for reservations. The format is `HHMM`."),
  windowEndTime: z.string().describe("Ending time of the scheduled delivery window being consulted for reservations. The format is `HHMM`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/logistics-capacity/resources/carrier@${params.capacityType}@${params.shippingPolicyId}/time-frames/${params.windowDay}F${params.windowStartTime}T${params.windowEndTime}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    }
  ];
}
