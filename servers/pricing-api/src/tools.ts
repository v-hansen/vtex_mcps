import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "pricing_get_price",
      description: "Get price by SKU ID\nGET /pricing/prices/{itemId}",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU ID.")
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}`;
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
      name: "pricing_delete_price",
      description: "Delete price all base and fixed prices of an SKU\nDELETE /pricing/prices/{itemId}",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU ID.")
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}`;
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
      name: "pricing_create_update_price_or_fixed_price",
      description: "Create or update base price or fixed price\nPUT /pricing/prices/{itemId}",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU unique identifier number."),
  body: z.object({ markup: z.number().int().optional(), listPrice: z.number().optional(), basePrice: z.number().optional(), costPrice: z.number().optional(), fixedPrices: z.array(z.object({ tradePolicyId: z.string(), value: z.number(), listPrice: z.number().optional(), minQuantity: z.number().int(), dateRange: z.object({ from: z.string(), to: z.string() }).optional() })).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}`;
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
      name: "pricing_get_fixed_prices",
      description: "Get fixed prices\nGET /pricing/prices/{itemId}/fixed",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU ID.")
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}/fixed`;
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
      name: "pricing_create_update_price_or_fixed_price_no_remove",
      description: "Create or update base price or fixed price\nPATCH /pricing/prices/{itemId}/fixed",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU unique identifier number."),
  body: z.array(z.object({ tradePolicyId: z.string(), value: z.number(), listPrice: z.number().optional(), minQuantity: z.number().int().default(1), dateRange: z.object({ from: z.string(), to: z.string() }).optional() })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}/fixed`;
    const response = await http.patch(url, params.body);
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
      name: "pricing_createorupdatefixedpricesonpricetableortradepolicy",
      description: "Create or update fixed prices on a price table or trade policy\nPOST /pricing/prices/{itemId}/fixed/{priceTableId}",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU ID."),
  priceTableId: z.string().describe("SKU **price table** name or **trade policy** ID."),
  body: z.array(z.object({ value: z.number(), listPrice: z.number().optional(), minQuantity: z.number().int(), dateRange: z.object({ from: z.string(), to: z.string() }).optional() })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}/fixed/${params.priceTableId}`;
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
      name: "pricing_get_fixed_pricesonapricetable",
      description: "Get fixed prices on a price table or trade policy\nGET /pricing/prices/{itemId}/fixed/{priceTableId}",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU ID."),
  priceTableId: z.string().describe("Price Table Name")
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}/fixed/${params.priceTableId}`;
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
      name: "pricing_deletefixedpricesonapricetableortradepolicy",
      description: "Delete fixed prices on a price table or trade policy\nDELETE /pricing/prices/{itemId}/fixed/{priceTableId}",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU ID."),
  priceTableId: z.string().describe("Price Table or Trade Policy Name.")
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}/fixed/${params.priceTableId}`;
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
      name: "pricing_get_computed_pricebypricetable",
      description: "Get computed price by price table or trade policy\nGET /pricing/prices/{itemId}/computed/{priceTableId}",
      inputSchema: z.object({
  itemId: z.number().int().describe("SKU ID."),
  priceTableId: z.string().describe("SKU Price Table Name."),
  categoryIds: z.number().int().describe("Category ID."),
  brandId: z.number().int().describe("Brand ID."),
  quantity: z.number().int().describe("SKU quantity.")
}),
      handler: async (params) => {
  try {
    const url = `/pricing/prices/${params.itemId}/computed/${params.priceTableId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.categoryIds !== undefined) queryParams["categoryIds"] = params.categoryIds;
    if (params.brandId !== undefined) queryParams["brandId"] = params.brandId;
    if (params.quantity !== undefined) queryParams["quantity"] = params.quantity;
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
      name: "pricing_get_pricing_config",
      description: "Get pricing configuration\nGET /pricing/config",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/pricing/config";
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
      name: "pricing_get_pricingv2_status",
      description: "Get pricing v2 status\nGET /pricing/migration",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/pricing/migration";
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
      name: "pricing_getrulesforapricetable",
      description: "Get rules for a price table\nGET /pricing/pipeline/catalog/{priceTableId}",
      inputSchema: z.object({
  priceTableId: z.string().describe("Price Table Name.")
}),
      handler: async (params) => {
  try {
    const url = `/pricing/pipeline/catalog/${params.priceTableId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 401:
        throw new Error("Unauthorized");
      case 403:
        throw new Error("Forbidden");
      case 429:
        throw new Error("Too many requests");
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
      name: "pricing_put_pricing_pipeline_catalog_by_price_table_id",
      description: "Update rules for a price table\nPUT /pricing/pipeline/catalog/{priceTableId}",
      inputSchema: z.object({
  priceTableId: z.string().describe("Price Table Name."),
  body: z.object({ rules: z.array(z.object({ id: z.number().int(), context: z.object({ categories: z.object({}), brands: z.object({}), stockStatuses: z.object({}).optional(), internalCategories: z.object({}).optional(), markupRange: z.object({ from: z.number().int(), to: z.number().int() }), dateRange: z.object({ from: z.string(), to: z.string() }) }), percentualModifier: z.number() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/pricing/pipeline/catalog/${params.priceTableId}`;
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
      name: "pricing_put_pricing_tables_by_price_table_id",
      description: "Create price table\nPUT /pricing/tables/{priceTableId}",
      inputSchema: z.object({
  priceTableId: z.string().describe("Price Table Name.")
}),
      handler: async (params) => {
  try {
    const url = `/pricing/tables/${params.priceTableId}`;
    const response = await http.put(url);
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
      name: "pricing_getallpricetablesandrules",
      description: "Get all price tables and their rules\nGET /pricing/pipeline/catalog",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/pricing/pipeline/catalog";
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
      name: "pricing_listpricetables",
      description: "List price tables\nGET /pricing/tables",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/pricing/tables";
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
