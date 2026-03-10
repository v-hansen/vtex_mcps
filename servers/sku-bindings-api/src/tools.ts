import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "sku-bindings_getby_sku_id",
      description: "Get SKU bindings by SKU ID\nGET /sku-binding/pvt/skusellers/{skuId}",
      inputSchema: z.object({
  skuId: z.string().describe("SKU's unique identifier in the marketplace.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skusellers/${params.skuId}`;
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
      name: "sku-bindings_getpagedadmin",
      description: "Get SKU bindings information\nGET /sku-binding/pvt/skuseller/admin",
      inputSchema: z.object({
  sellerId: z.string().optional().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the Admin to get the correct ID."),
  skuId: z.string().optional().describe("SKU's unique identifier in the marketplace."),
  sellerSkuId: z.string().optional().describe("SKU ID in the seller's store."),
  isActive: z.boolean().optional().describe("Defines if the SKU binding is active."),
  size: z.string().optional().describe("Amount of results.")
}),
      handler: async (params) => {
  try {
    const url = "/sku-binding/pvt/skuseller/admin";
    const queryParams: Record<string, unknown> = {};
    if (params.sellerId !== undefined) queryParams["sellerId"] = params.sellerId;
    if (params.skuId !== undefined) queryParams["skuId"] = params.skuId;
    if (params.sellerSkuId !== undefined) queryParams["sellerSkuId"] = params.sellerSkuId;
    if (params.isActive !== undefined) queryParams["isActive"] = params.isActive;
    if (params.size !== undefined) queryParams["size"] = params.size;
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
      name: "sku-bindings_get_sk_useller",
      description: "Get details of a seller's SKU\nGET /sku-binding/pvt/skuseller/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the VTEX Admin to get the correct ID."),
  sellerSkuId: z.string().describe("SKU ID in the seller's store.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/${params.sellerId}/${params.sellerSkuId}`;
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
      name: "sku-bindings_bindtoanothersku",
      description: "Bind a seller's SKU to another SKU\nPUT /sku-binding/pvt/skuseller/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the VTEX Admin to get the correct ID."),
  sellerSkuId: z.string().describe("SKU ID in the seller's store."),
  body: z.object({ StockKeepingUnitId: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/${params.sellerId}/${params.sellerSkuId}`;
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
      name: "sku-bindings_getallby_seller_id",
      description: "Get all SKU bindings by seller ID\nGET /sku-binding/pvt/skuseller/list/bysellerId/{sellerId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the VTEX Admin to get the correct ID.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/list/bysellerId/${params.sellerId}`;
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
      name: "sku-bindings_getpagedby_seller_id",
      description: "Get paged SKU bindings by seller ID\nGET /sku-binding/pvt/skuseller/paged/sellerid/{sellerId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the VTEX Admin to get the correct ID."),
  page: z.string().describe("Page number."),
  size: z.string().describe("Amount of results per page.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/paged/sellerid/${params.sellerId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.size !== undefined) queryParams["size"] = params.size;
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
      name: "sku-bindings_change_notification",
      description: "Change notification with SKU ID\nPOST /sku-binding/pvt/skuseller/changenotification/{skuId}",
      inputSchema: z.object({
  skuId: z.string().describe("A string that identifies the SKU in the marketplace. This is the ID that the marketplace will use to look for the SKU whose change the seller wants to inform. If the marketplace finds this ID, it responds with status code `200`. Otherwise, it responds with status code `404`.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/changenotification/${params.skuId}`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 403:
        throw new Error("Forbidden");
      case 404:
        throw new Error("Not found");
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
      name: "sku-bindings_post_sku_binding_pvt_skuseller_changenotification_by_seller_id_by_seller_sku_id",
      description: "Change notification with seller ID and seller SKU ID\nPOST /sku-binding/pvt/skuseller/changenotification/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the VTEX Admin to get the correct ID."),
  sellerSkuId: z.string().describe("ID of the binding of the seller with the SKU.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/changenotification/${params.sellerId}/${params.sellerSkuId}`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 403:
        throw new Error("Forbidden");
      case 404:
        throw new Error("Not found");
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
      name: "sku-bindings_insert_sku_binding",
      description: "Insert SKU binding\nPOST /sku-binding/pvt/skuseller/insertion",
      inputSchema: z.object({
  body: z.object({ StockKeepingUnitId: z.number().int(), IsActive: z.boolean(), SellerId: z.string(), SellerStockKeepingUnitId: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/sku-binding/pvt/skuseller/insertion";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 409:
        throw new Error("Conflict");
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
      name: "sku-bindings_activate_sku_binding",
      description: "Activate SKU binding\nPOST /sku-binding/pvt/skuseller/activate/{sellerId}/{skuSellerId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the VTEX Admin to get the correct ID."),
  skuSellerId: z.string().describe("SKU ID in the seller's store.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/activate/${params.sellerId}/${params.skuSellerId}`;
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
      name: "sku-bindings_deactivate_sku_binding",
      description: "Deactivate SKU binding\nPOST /sku-binding/pvt/skuseller/inactivate/{sellerId}/{skuSellerId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the VTEX Admin to get the correct ID."),
  skuSellerId: z.string().describe("SKU ID in the seller's store.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/inactivate/${params.sellerId}/${params.skuSellerId}`;
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
      name: "sku-bindings_delete_sk_usellerassociation",
      description: "Remove a seller's SKU binding\nPOST /sku-binding/pvt/skuseller/remove/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the VTEX Admin to get the correct ID."),
  sellerSkuId: z.string().describe("SKU ID in the seller's store.")
}),
      handler: async (params) => {
  try {
    const url = `/sku-binding/pvt/skuseller/remove/${params.sellerId}/${params.sellerSkuId}`;
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
    }
  ];
}
