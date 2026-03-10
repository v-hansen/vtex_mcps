import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "brand_product_and_sku_ids",
      description: "Get product and SKU IDs\nGET /api/catalog_system/pvt/products/GetProductAndSkuIds",
      inputSchema: z.object({
  categoryId: z.number().int().optional().describe("ID of the category from which you need to retrieve products and SKUs."),
  _from: z.number().int().optional().describe("Insert the ID that will start the request result."),
  _to: z.number().int().optional().describe("Insert the ID that will end the request result.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/products/GetProductAndSkuIds";
    const queryParams: Record<string, unknown> = {};
    if (params.categoryId !== undefined) queryParams["categoryId"] = params.categoryId;
    if (params._from !== undefined) queryParams["_from"] = params._from;
    if (params._to !== undefined) queryParams["_to"] = params._to;
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
      name: "brand_get_productbyid",
      description: "Get product by ID\nGET /api/catalog/pvt/product/{productId}",
      inputSchema: z.object({
  productId: z.string().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}`;
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
      name: "brand_put_api_catalog_pvt_product_by_product_id",
      description: "Update product\nPUT /api/catalog/pvt/product/{productId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier."),
  body: z.object({ Name: z.string(), DepartmentId: z.number().int().optional(), CategoryId: z.number().int(), BrandId: z.number().int(), LinkId: z.string().optional(), RefId: z.string().optional(), IsVisible: z.boolean().optional(), Description: z.string().optional(), DescriptionShort: z.string().optional(), ReleaseDate: z.string().optional(), KeyWords: z.string().optional(), Title: z.string().optional(), IsActive: z.boolean().optional(), TaxCode: z.string().optional(), MetaTagDescription: z.string().optional(), SupplierId: z.number().int().optional(), ShowWithoutStock: z.boolean().optional(), AdWordsRemarketingCode: z.string().optional(), LomadeeCampaignCode: z.string().optional(), Score: z.number().int().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}`;
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
      name: "brand_productand_trade_policy",
      description: "Get product and its general context\nGET /api/catalog_system/pvt/products/productget/{productId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/products/productget/${params.productId}`;
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
      name: "brand_productby_ref_id",
      description: "Get product by reference ID\nGET /api/catalog_system/pvt/products/productgetbyrefid/{refId}",
      inputSchema: z.object({
  refId: z.string().describe("Product reference code.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/products/productgetbyrefid/${params.refId}`;
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
      name: "brand_product_variations",
      description: "Get product's SKUs by product ID\nGET /api/catalog_system/pub/products/variations/{productId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pub/products/variations/${params.productId}`;
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
      name: "brand_get_api_addon_pvt_review_get_product_rate_by_product_id",
      description: "Get product review rate by product ID\nGET /api/addon/pvt/review/GetProductRate/{productId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/addon/pvt/review/GetProductRate/${params.productId}`;
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
      name: "brand_post_api_catalog_pvt_product",
      description: "Create product with category and brand\nPOST /api/catalog/pvt/product",
      inputSchema: z.object({
  body: z.unknown().optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/product";
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
      name: "brand_get_product_specification",
      description: "Get product specifications by product ID\nGET /api/catalog_system/pvt/products/{productId}/specification",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/products/${params.productId}/specification`;
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
      name: "brand_update_product_specification",
      description: "Update product specification by product ID\nPOST /api/catalog_system/pvt/products/{productId}/specification",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique identifier."),
  body: z.array(z.object({ Value: z.array(z.string()), Id: z.number().int().optional(), Name: z.string().optional() })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/products/${params.productId}/specification`;
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
      name: "brand_get_product_specificationby_product_id",
      description: "Get product specifications and their information by product ID\nGET /api/catalog/pvt/product/{productId}/specification",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/specification`;
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
      name: "brand_post_api_catalog_pvt_product_by_product_id_specification",
      description: "Associate product specification\nPOST /api/catalog/pvt/product/{productId}/specification",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier."),
  body: z.object({ FieldId: z.number().int(), FieldValueId: z.number().int().optional(), Text: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/specification`;
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
      name: "brand_delete_all_product_specifications",
      description: "Delete all product specifications by product ID\nDELETE /api/catalog/pvt/product/{productId}/specification",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/specification`;
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
      name: "brand_deletea_product_specification",
      description: "Delete a product specification\nDELETE /api/catalog/pvt/product/{productId}/specification/{specificationId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier."),
  specificationId: z.number().int().describe("Product specification's unique numerical identifier. For radio, checkbox, or combo specifications, use the specification field ID (`specificationFieldId`) instead. You can retrieve these values using the endpoint [Get product specifications and their information by product ID](https://developers.vtex.com/docs/api-reference/catalog-api#get-/api/catalog/pvt/product/-productId-/specification). They correspond to the `Id` and `FieldId` values, respectively.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/specification/${params.specificationId}`;
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_product_by_product_id_specificationvalue",
      description: "Associate product specification using specification name and group name\nPUT /api/catalog/pvt/product/{productId}/specificationvalue",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier."),
  body: z.object({ FieldName: z.string(), GroupName: z.string(), RootLevelSpecification: z.boolean(), FieldValues: z.array(z.string()) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/specificationvalue`;
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
      name: "brand_listall_skui_ds",
      description: "List all SKU IDs\nGET /api/catalog_system/pvt/sku/stockkeepingunitids",
      inputSchema: z.object({
  page: z.number().int().describe("Number of the page from where you need to retrieve SKU IDs."),
  pagesize: z.number().int().describe("Size of the page from where you need retrieve SKU IDs. The maximum value is `1000`.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/sku/stockkeepingunitids";
    const queryParams: Record<string, unknown> = {};
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.pagesize !== undefined) queryParams["pagesize"] = params.pagesize;
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
      name: "brand_sku_context",
      description: "Get SKU and context\nGET /api/catalog_system/pvt/sku/stockkeepingunitbyid/{skuId}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique identifier number."),
  sc: z.number().int().optional().describe("Trade policy's unique identifier number.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/sku/stockkeepingunitbyid/${params.skuId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.sc !== undefined) queryParams["sc"] = params.sc;
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
      name: "brand_get_api_catalog_pvt_stockkeepingunit",
      description: "Get SKU by reference ID\nGET /api/catalog/pvt/stockkeepingunit",
      inputSchema: z.object({
  RefId: z.string().describe("SKU reference ID.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/stockkeepingunit";
    const queryParams: Record<string, unknown> = {};
    if (params.RefId !== undefined) queryParams["RefId"] = params.RefId;
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
      name: "brand_post_api_catalog_pvt_stockkeepingunit",
      description: "Create SKU\nPOST /api/catalog/pvt/stockkeepingunit",
      inputSchema: z.object({
  body: z.object({ Id: z.number().int().optional(), ProductId: z.number().int(), IsActive: z.boolean().optional(), ActivateIfPossible: z.boolean().optional(), Name: z.string(), RefId: z.string().optional(), PackagedHeight: z.number(), PackagedLength: z.number(), PackagedWidth: z.number(), PackagedWeightKg: z.number().int(), Height: z.number().optional(), Length: z.number().optional(), Width: z.number().optional(), WeightKg: z.number().optional(), CubicWeight: z.number().optional(), IsKit: z.boolean().optional(), CreationDate: z.string().optional(), RewardValue: z.number().optional(), EstimatedDateArrival: z.string().optional(), ManufacturerCode: z.string().optional(), CommercialConditionId: z.number().int().optional(), MeasurementUnit: z.enum(["un", "kg", "g", "mg", "m", "m²", "m³", "cm", "cm²", "cm³", "mm", "mm²", "mm³", "oz", "lb", "ft", "ft²", "ft³", "in", "in²", "in³"]).optional(), UnitMultiplier: z.number().optional(), ModalType: z.string().optional(), KitItensSellApart: z.boolean().optional(), Videos: z.array(z.string()).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/stockkeepingunit";
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
      name: "brand_sku_idby_ref_id",
      description: "Get SKU ID by reference ID\nGET /api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/{refId}",
      inputSchema: z.object({
  refId: z.string().describe("SKU reference ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/sku/stockkeepingunitidbyrefid/${params.refId}`;
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
      name: "brand_skuby_alternate_id",
      description: "Get SKU by alternate ID\nGET /api/catalog_system/pvt/sku/stockkeepingunitbyalternateId/{alternateId}",
      inputSchema: z.object({
  alternateId: z.number().int().describe("Product EAN or `RefId`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/sku/stockkeepingunitbyalternateId/${params.alternateId}`;
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
      name: "brand_skulistby_product_id",
      description: "Get SKU list by product ID\nGET /api/catalog_system/pvt/sku/stockkeepingunitByProductId/{productId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/sku/stockkeepingunitByProductId/${params.productId}`;
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
      name: "brand_sku_idlistby_ref_idlist",
      description: "Retrieve SKU ID list by reference ID list\nPOST /api/catalog_system/pub/sku/stockkeepingunitidsbyrefids",
      inputSchema: z.object({
  body: z.array(z.string()).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pub/sku/stockkeepingunitidsbyrefids";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 500:
        throw new Error("Internal Server Error");
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
      name: "brand_sku",
      description: "Get SKU\nGET /api/catalog/pvt/stockkeepingunit/{skuId}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU unique identifier number.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}`;
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id",
      description: "Update SKU\nPUT /api/catalog/pvt/stockkeepingunit/{skuId}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  body: z.object({ ProductId: z.number().int(), IsActive: z.boolean(), ActivateIfPossible: z.boolean().optional(), Name: z.string(), RefId: z.string().optional(), PackagedHeight: z.number(), PackagedLength: z.number(), PackagedWidth: z.number(), PackagedWeightKg: z.number().int(), Height: z.number().optional(), Length: z.number().optional(), Width: z.number().optional(), WeightKg: z.number().optional(), CubicWeight: z.number().optional(), IsKit: z.boolean().optional(), CreationDate: z.string().optional(), RewardValue: z.number().optional(), EstimatedDateArrival: z.string().optional(), ManufacturerCode: z.string().optional(), CommercialConditionId: z.number().int().optional(), MeasurementUnit: z.enum(["un", "kg", "g", "mg", "m", "m²", "m³", "cm", "cm²", "cm³", "mm", "mm²", "mm³", "oz", "lb", "ft", "ft²", "ft³", "in", "in²", "in³"]).optional(), UnitMultiplier: z.number().optional(), ModalType: z.string().optional(), KitItensSellApart: z.boolean().optional(), Videos: z.array(z.string()).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}`;
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
      name: "brand_get_sku_complementby_skuid",
      description: "Get SKU complement by SKU ID\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/complement",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/complement`;
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
      name: "brand_get_sku_complementsby_complement_type_id",
      description: "Get SKU complements by complement type ID\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/complement/{complementTypeId}",
      inputSchema: z.object({
  skuId: z.number().int().describe("ID of the SKU which will be inserted as a complement in the parent SKU."),
  complementTypeId: z.number().int().describe("Complement type ID. This represents the type of the complement. The possible values are: `1` for **Accessory**; `2` for **Suggestion**; `3` for **Similar product**; `5` for **Show together**.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/complement/${params.complementTypeId}`;
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
      name: "brand_get_sk_ucomplementsbytype",
      description: "Get SKU complements by type\nGET /api/catalog_system/pvt/sku/complements/{parentSkuId}/{type}",
      inputSchema: z.object({
  parentSkuId: z.number().int().describe("ID of the parent SKU, where the complement is inserted."),
  type: z.number().int().describe("Complement type ID. This represents the type of the complement. The possible values are: `1` for **Accessory**; `2` for **Suggestion**; `3` for **Similar product**; `5` for **Show together**.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/sku/complements/${params.parentSkuId}/${params.type}`;
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
      name: "brand_create_sku_complement",
      description: "Create SKU complement\nPOST /api/catalog/pvt/skucomplement",
      inputSchema: z.object({
  body: z.object({ ParentSkuId: z.number().int(), SkuId: z.number().int(), ComplementTypeId: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/skucomplement";
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
      name: "brand_get_sku_complementby_sku_complement_id",
      description: "Get SKU complement by SKU complement ID\nGET /api/catalog/pvt/skucomplement/{skuComplementId}",
      inputSchema: z.object({
  skuComplementId: z.number().int().describe("SKU complement's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skucomplement/${params.skuComplementId}`;
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
      name: "brand_delete_sku_complementby_sku_complement_id",
      description: "Delete SKU complement by SKU complement ID\nDELETE /api/catalog/pvt/skucomplement/{skuComplementId}",
      inputSchema: z.object({
  skuComplementId: z.number().int().describe("SKU complement's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skucomplement/${params.skuComplementId}`;
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
      name: "brand_skuby_ean",
      description: "Get SKU by EAN\nGET /api/catalog_system/pvt/sku/stockkeepingunitbyean/{ean}",
      inputSchema: z.object({
  ean: z.string().describe("EAN of the SKU which you need to retrieve details from.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/sku/stockkeepingunitbyean/${params.ean}`;
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
      name: "brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_ean",
      description: "Get EAN by SKU ID\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/ean",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/ean`;
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean",
      description: "Delete all SKU EAN values\nDELETE /api/catalog/pvt/stockkeepingunit/{skuId}/ean",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/ean`;
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
      name: "brand_post_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean",
      description: "Create SKU EAN\nPOST /api/catalog/pvt/stockkeepingunit/{skuId}/ean/{ean}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  ean: z.string().describe("EAN.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/ean/${params.ean}`;
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_ean_by_ean",
      description: "Delete SKU EAN\nDELETE /api/catalog/pvt/stockkeepingunit/{skuId}/ean/{ean}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  ean: z.string().describe("EAN number.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/ean/${params.ean}`;
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
      name: "brand_post_api_catalog_pvt_skuattachment",
      description: "Associate SKU attachment\nPOST /api/catalog/pvt/skuattachment",
      inputSchema: z.object({
  body: z.object({ AttachmentId: z.number().int(), SkuId: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/skuattachment";
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
      name: "brand_delete_api_catalog_pvt_skuattachment",
      description: "Dissociate attachments and SKUs\nDELETE /api/catalog/pvt/skuattachment",
      inputSchema: z.object({
  skuId: z.number().int().optional().describe("SKU ID. By using this query param, you can dissociate all the attachments from an SKU based on its SKU ID."),
  attachmentId: z.number().int().optional().describe("Attachment ID. By using this query param, you can dissociate the given attachment from all previously associated SKUs.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/skuattachment";
    const queryParams: Record<string, unknown> = {};
    if (params.skuId !== undefined) queryParams["skuId"] = params.skuId;
    if (params.attachmentId !== undefined) queryParams["attachmentId"] = params.attachmentId;
    const response = await http.delete(url, { params: queryParams });
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
      name: "brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attachment",
      description: "Get SKU attachments by SKU ID\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/attachment",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attachment`;
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
      name: "brand_delete_api_catalog_pvt_skuattachment_by_sku_attachment_association_id",
      description: "Delete SKU attachment by attachment association ID\nDELETE /api/catalog/pvt/skuattachment/{skuAttachmentAssociationId}",
      inputSchema: z.object({
  skuAttachmentAssociationId: z.number().int().describe("ID of the association between the attachment and the SKU, which corresponds to the `Id` in the response body of the [Associate SKU attachment](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-post-sku-attachment) and the [Get SKU attachment by SKU ID](https://developers.vtex.com/vtex-rest-api/reference/get_api-catalog-pvt-stockkeepingunit-skuid-attachment) endpoints.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuattachment/${params.skuAttachmentAssociationId}`;
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
      name: "brand_associateattachmentsto_sku",
      description: "Associate attachments to an SKU\nPOST /api/catalog_system/pvt/sku/associateattachments",
      inputSchema: z.object({
  body: z.object({ SkuId: z.number().int(), AttachmentNames: z.array(z.string()) })
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/sku/associateattachments";
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
      name: "brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file",
      description: "Get SKU files\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/file",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file`;
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
      name: "brand_post_api_catalog_pvt_stockkeepingunit_by_sku_id_file",
      description: "Create SKU file\nPOST /api/catalog/pvt/stockkeepingunit/{skuId}/file",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  body: z.object({ IsMain: z.boolean().optional(), Label: z.string().optional(), Name: z.string(), Text: z.string().optional(), Url: z.string(), Position: z.number().int().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file`;
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file",
      description: "Delete all SKU files\nDELETE /api/catalog/pvt/stockkeepingunit/{skuId}/file",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file`;
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id",
      description: "Update SKU file\nPUT /api/catalog/pvt/stockkeepingunit/{skuId}/file/{skuFileId}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  skuFileId: z.number().int().describe("ID of the association of the SKU and the image, which can be obtained by placing a request to the [Get SKU file](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-sku-file) endpoint and copying the `Id` field."),
  body: z.object({ IsMain: z.boolean().optional(), Label: z.string().optional(), Name: z.string(), Text: z.string().optional(), Url: z.string(), Position: z.number().int().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/${params.skuFileId}`;
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id",
      description: "Delete SKU image file\nDELETE /api/catalog/pvt/stockkeepingunit/{skuId}/file/{skuFileId}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  skuFileId: z.number().int().describe("ID of the association of the SKU and the image, which can be obtained by placing a request to the [Get SKU file](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-sku-file) endpoint and copying the `Id` field.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/${params.skuFileId}`;
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_reorder",
      description: "Reorder SKU files\nPUT /api/catalog/pvt/stockkeepingunit/{skuId}/file/reorder",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU unique numerical identifier."),
  body: z.array(z.object({ Id: z.number().int(), Position: z.number().int() })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/reorder`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad request. All files are required.");
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_copy_by_sku_idfrom_by_sku_idto_file",
      description: "Copy files from an SKU to another SKU\nPUT /api/catalog/pvt/stockkeepingunit/copy/{skuIdfrom}/{skuIdto}/file",
      inputSchema: z.object({
  skuIdfrom: z.number().int().describe("__Origin__ SKU's unique numerical identifier."),
  skuIdto: z.number().int().describe("__Target__ SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/copy/${params.skuIdfrom}/${params.skuIdto}/file`;
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunit_disassociate_by_sku_id_file_by_sku_file_id",
      description: "Disassociate SKU file\nDELETE /api/catalog/pvt/stockkeepingunit/disassociate/{skuId}/file/{skuFileId}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  skuFileId: z.number().int().describe("ID of the association of the SKU and the image, which can be obtained by placing a request to the [Get SKU file](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-sku-file) endpoint and copying the `Id` field.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/disassociate/${params.skuId}/file/${params.skuFileId}`;
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
      name: "brand_get_api_catalog_pvt_stockkeepingunitkit",
      description: "Get SKU kit by SKU ID or parent SKU ID\nGET /api/catalog/pvt/stockkeepingunitkit",
      inputSchema: z.object({
  skuId: z.number().int().optional().describe("SKU's unique numerical identifier."),
  parentSkuId: z.number().int().optional().describe("Parent SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/stockkeepingunitkit";
    const queryParams: Record<string, unknown> = {};
    if (params.skuId !== undefined) queryParams["skuId"] = params.skuId;
    if (params.parentSkuId !== undefined) queryParams["parentSkuId"] = params.parentSkuId;
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
      name: "brand_post_api_catalog_pvt_stockkeepingunitkit",
      description: "Create SKU kit\nPOST /api/catalog/pvt/stockkeepingunitkit",
      inputSchema: z.object({
  body: z.object({ StockKeepingUnitParent: z.number().int(), StockKeepingUnitId: z.number().int(), Quantity: z.number().int(), UnitPrice: z.number() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/stockkeepingunitkit";
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunitkit",
      description: "Delete SKU kit by SKU ID or parent SKU ID\nDELETE /api/catalog/pvt/stockkeepingunitkit",
      inputSchema: z.object({
  skuId: z.number().int().optional().describe("SKU's unique numerical identifier."),
  parentSkuId: z.number().int().optional().describe("Parent SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/stockkeepingunitkit";
    const queryParams: Record<string, unknown> = {};
    if (params.skuId !== undefined) queryParams["skuId"] = params.skuId;
    if (params.parentSkuId !== undefined) queryParams["parentSkuId"] = params.parentSkuId;
    const response = await http.delete(url, { params: queryParams });
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
      name: "brand_get_api_catalog_pvt_stockkeepingunitkit_by_kit_id",
      description: "Get SKU kit\nGET /api/catalog/pvt/stockkeepingunitkit/{kitId}",
      inputSchema: z.object({
  kitId: z.number().int().describe("Kit's unique numerical identifier")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunitkit/${params.kitId}`;
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunitkit_by_kit_id",
      description: "Delete SKU kit by kit ID\nDELETE /api/catalog/pvt/stockkeepingunitkit/{kitId}",
      inputSchema: z.object({
  kitId: z.number().int().describe("Kit's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunitkit/${params.kitId}`;
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
      name: "brand_get_sk_useller",
      description: "Get details of a seller's SKU\nGET /api/catalog_system/pvt/skuseller/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the Admin to get the correct ID."),
  sellerSkuId: z.string().describe("SKU ID in the seller's store.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/skuseller/${params.sellerId}/${params.sellerSkuId}`;
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
      name: "brand_delete_sk_usellerassociation",
      description: "Remove a seller's SKU binding\nPOST /api/catalog_system/pvt/skuseller/remove/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the Admin to get the correct ID."),
  sellerSkuId: z.string().describe("SKU ID in the seller's store.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/skuseller/remove/${params.sellerId}/${params.sellerSkuId}`;
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
      name: "brand_post_api_catalog_system_pvt_skuseller_changenotification_by_seller_id_by_seller_sku_id",
      description: "Change notification with seller ID and seller SKU ID\nPOST /api/catalog_system/pvt/skuseller/changenotification/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the Admin to get the correct ID."),
  sellerSkuId: z.string().describe("ID of the binding of the seller with the SKU.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/skuseller/changenotification/${params.sellerId}/${params.sellerSkuId}`;
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
      name: "brand_change_notification",
      description: "Change notification with SKU ID\nPOST /api/catalog_system/pvt/skuseller/changenotification/{skuId}",
      inputSchema: z.object({
  skuId: z.string().describe("A string that identifies the SKU in the marketplace. This is the ID that the marketplace will use to look for the SKU whose change the seller wants to inform. If the marketplace finds this ID, it responds with status code 200. Otherwise, it responds with status code 404.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/skuseller/changenotification/${params.skuId}`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
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
      name: "brand_get_api_catalog_pvt_skuservice_by_sku_service_id",
      description: "Get SKU service\nGET /api/catalog/pvt/skuservice/{skuServiceId}",
      inputSchema: z.object({
  skuServiceId: z.number().int().describe("SKU service unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservice/${params.skuServiceId}`;
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
      name: "brand_put_api_catalog_pvt_skuservice_by_sku_service_id",
      description: "Update SKU service\nPUT /api/catalog/pvt/skuservice/{skuServiceId}",
      inputSchema: z.object({
  skuServiceId: z.number().int().describe("SKU service unique identifier."),
  body: z.object({ SkuServiceTypeId: z.number().int(), SkuServiceValueId: z.number().int(), SkuId: z.number().int(), Name: z.string(), Text: z.string(), IsActive: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservice/${params.skuServiceId}`;
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
      name: "brand_delete_api_catalog_pvt_skuservice_by_sku_service_id",
      description: "Dissociate SKU service\nDELETE /api/catalog/pvt/skuservice/{skuServiceId}",
      inputSchema: z.object({
  skuServiceId: z.number().int().describe("SKU service unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservice/${params.skuServiceId}`;
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
      name: "brand_post_api_catalog_pvt_skuservice",
      description: "Associate SKU service\nPOST /api/catalog/pvt/skuservice",
      inputSchema: z.object({
  body: z.object({ SkuServiceTypeId: z.number().int(), SkuServiceValueId: z.number().int(), SkuId: z.number().int(), Name: z.string(), Text: z.string(), IsActive: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/skuservice";
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
      name: "brand_post_api_catalog_pvt_skuservicetypeattachment",
      description: "Associate SKU service attachment\nPOST /api/catalog/pvt/skuservicetypeattachment",
      inputSchema: z.object({
  body: z.object({ AttachmentId: z.number().int(), SkuServiceTypeId: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/skuservicetypeattachment";
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
      name: "brand_delete_api_catalog_pvt_skuservicetypeattachment",
      description: "Dissociate attachment by attachment ID or SKU service type ID\nDELETE /api/catalog/pvt/skuservicetypeattachment",
      inputSchema: z.object({
  attachmentId: z.number().int().optional().describe("SKU service attachment unique identifier."),
  skuServiceTypeId: z.number().int().optional().describe("SKU service type unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/skuservicetypeattachment";
    const queryParams: Record<string, unknown> = {};
    if (params.attachmentId !== undefined) queryParams["attachmentId"] = params.attachmentId;
    if (params.skuServiceTypeId !== undefined) queryParams["skuServiceTypeId"] = params.skuServiceTypeId;
    const response = await http.delete(url, { params: queryParams });
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
      name: "brand_delete_api_catalog_pvt_skuservicetypeattachment_by_sku_service_type_attachment_id",
      description: "Dissociate attachment from SKU service type\nDELETE /api/catalog/pvt/skuservicetypeattachment/{skuServiceTypeAttachmentId}",
      inputSchema: z.object({
  skuServiceTypeAttachmentId: z.number().int().describe("SKU service attachment unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicetypeattachment/${params.skuServiceTypeAttachmentId}`;
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
      name: "brand_post_api_catalog_pvt_skuservicetype",
      description: "Create SKU service type\nPOST /api/catalog/pvt/skuservicetype",
      inputSchema: z.object({
  body: z.object({ Name: z.string(), IsActive: z.boolean().default(true), ShowOnProductFront: z.boolean(), ShowOnCartFront: z.boolean(), ShowOnAttachmentFront: z.boolean(), ShowOnFileUpload: z.boolean(), IsGiftCard: z.boolean(), IsRequired: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/skuservicetype";
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
      name: "brand_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id",
      description: "Get SKU service type\nGET /api/catalog/pvt/skuservicetype/{skuServiceTypeId}",
      inputSchema: z.object({
  skuServiceTypeId: z.number().int().describe("SKU service type unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}`;
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
      name: "brand_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id",
      description: "Update SKU service type\nPUT /api/catalog/pvt/skuservicetype/{skuServiceTypeId}",
      inputSchema: z.object({
  skuServiceTypeId: z.number().int().describe("SKU service type unique identifier."),
  body: z.object({ Name: z.string(), IsActive: z.boolean().default(true), ShowOnProductFront: z.boolean(), ShowOnCartFront: z.boolean(), ShowOnAttachmentFront: z.boolean(), ShowOnFileUpload: z.boolean(), IsGiftCard: z.boolean(), IsRequired: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}`;
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
      name: "brand_delete_api_catalog_pvt_skuservicetype_by_sku_service_type_id",
      description: "Delete SKU service type\nDELETE /api/catalog/pvt/skuservicetype/{skuServiceTypeId}",
      inputSchema: z.object({
  skuServiceTypeId: z.number().int().describe("SKU service type unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}`;
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
      name: "brand_post_api_catalog_pvt_skuservicevalue",
      description: "Create SKU service value\nPOST /api/catalog/pvt/skuservicevalue",
      inputSchema: z.object({
  body: z.object({ SkuServiceTypeId: z.number().int(), Name: z.string(), Value: z.number(), Cost: z.number() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/skuservicevalue";
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
      name: "brand_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id",
      description: "Get SKU service value\nGET /api/catalog/pvt/skuservicevalue/{skuServiceValueId}",
      inputSchema: z.object({
  skuServiceValueId: z.number().int().describe("SKU service value unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}`;
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
      name: "brand_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id",
      description: "Update SKU service value\nPUT /api/catalog/pvt/skuservicevalue/{skuServiceValueId}",
      inputSchema: z.object({
  skuServiceValueId: z.number().int().describe("SKU service value unique identifier."),
  body: z.object({ SkuServiceTypeId: z.number().int(), Name: z.string(), Value: z.number(), Cost: z.number() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}`;
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
      name: "brand_delete_api_catalog_pvt_skuservicevalue_by_sku_service_value_id",
      description: "Delete SKU service value\nDELETE /api/catalog/pvt/skuservicevalue/{skuServiceValueId}",
      inputSchema: z.object({
  skuServiceValueId: z.number().int().describe("SKU service value unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}`;
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
      name: "brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_specification",
      description: "Get SKU specifications\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/specification",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification`;
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
      name: "brand_post_api_catalog_pvt_stockkeepingunit_by_sku_id_specification",
      description: "Associate SKU specification\nPOST /api/catalog/pvt/stockkeepingunit/{skuId}/specification",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  body: z.object({ FieldId: z.number().int(), FieldValueId: z.number().int().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification`;
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specification",
      description: "Update SKU specification\nPUT /api/catalog/pvt/stockkeepingunit/{skuId}/specification",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  body: z.object({ Id: z.number().int(), SkuId: z.number().int().optional(), FieldId: z.number().int(), FieldValueId: z.number().int(), Text: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification`;
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification",
      description: "Delete all SKU specifications\nDELETE /api/catalog/pvt/stockkeepingunit/{skuId}/specification",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification`;
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
      name: "brand_delete_api_catalog_pvt_stockkeepingunit_by_sku_id_specification_by_specification_id",
      description: "Delete SKU specification\nDELETE /api/catalog/pvt/stockkeepingunit/{skuId}/specification/{specificationId}",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  specificationId: z.number().int().describe("Specification's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specification/${params.specificationId}`;
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_specificationvalue",
      description: "Associate SKU specification using specification name and group name\nPUT /api/catalog/pvt/stockkeepingunit/{skuId}/specificationvalue",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier."),
  body: z.object({ FieldName: z.string(), GroupName: z.string(), RootLevelSpecification: z.boolean(), FieldValues: z.array(z.string()) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/specificationvalue`;
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
      name: "brand_post_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit",
      description: "Add SKU to subcollection\nPOST /api/catalog/pvt/subcollection/{subCollectionId}/stockkeepingunit",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection'''s unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid)."),
  body: z.object({ SkuId: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/stockkeepingunit`;
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
      name: "brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id_stockkeepingunit_by_sku_id",
      description: "Delete SKU from subcollection\nDELETE /api/catalog/pvt/subcollection/{subCollectionId}/stockkeepingunit/{skuId}",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid)."),
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/stockkeepingunit/${params.skuId}`;
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
      name: "brand_category_tree",
      description: "Get category tree\nGET /api/catalog_system/pub/category/tree/{categoryLevels}",
      inputSchema: z.object({
  categoryLevels: z.string().describe("Value of the category level you need to retrieve.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pub/category/tree/${params.categoryLevels}`;
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
      name: "brand_get_api_catalog_pvt_category_by_category_id",
      description: "Get category by ID\nGET /api/catalog/pvt/category/{categoryId}",
      inputSchema: z.object({
  categoryId: z.number().int().describe("Category's unique numerical identifier."),
  includeTreePath: z.boolean().optional().describe("When you use the `includeTreePath` query param set as `true`, the response body returns the existing values for the following fields:\r\n- `TreePath`\r\n- `TreePathIds`\r\n- `TreePathLinkIds`\r\n\r\nUsing this param is optional.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/category/${params.categoryId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.includeTreePath !== undefined) queryParams["includeTreePath"] = params.includeTreePath;
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
      name: "brand_put_api_catalog_pvt_category_by_category_id",
      description: "Update category\nPUT /api/catalog/pvt/category/{categoryId}",
      inputSchema: z.object({
  categoryId: z.number().int().describe("Category's unique numerical identifier."),
  body: z.object({ Name: z.string(), Keywords: z.string(), Title: z.string(), Description: z.string(), AdWordsRemarketingCode: z.string(), LomadeeCampaignCode: z.string(), FatherCategoryId: z.number().int(), GlobalCategoryId: z.number().int(), ShowInStoreFront: z.boolean(), IsActive: z.boolean(), ActiveStoreFrontLink: z.boolean(), ShowBrandFilter: z.boolean(), Score: z.number().int(), StockKeepingUnitSelectionMode: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/category/${params.categoryId}`;
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
      name: "brand_post_api_catalog_pvt_category",
      description: "Create category\nPOST /api/catalog/pvt/category",
      inputSchema: z.object({
  body: z.object({ Id: z.number().int().optional(), Name: z.string(), Keywords: z.string(), Title: z.string(), Description: z.string(), AdWordsRemarketingCode: z.string(), LomadeeCampaignCode: z.string(), FatherCategoryId: z.number().int(), GlobalCategoryId: z.number().int(), ShowInStoreFront: z.boolean(), IsActive: z.boolean(), ActiveStoreFrontLink: z.boolean(), ShowBrandFilter: z.boolean(), Score: z.number().int(), StockKeepingUnitSelectionMode: z.enum(["SPECIFICATION", "LIST"]) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/category";
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
      name: "brand_get_api_catalog_pvt_product_by_product_id_similarcategory",
      description: "Get similar categories\nGET /api/catalog/pvt/product/{productId}/similarcategory",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/similarcategory`;
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
      name: "brand_post_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id",
      description: "Add similar category\nPOST /api/catalog/pvt/product/{productId}/similarcategory/{categoryId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier."),
  categoryId: z.number().int().describe("Similar category's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/similarcategory/${params.categoryId}`;
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
      name: "brand_delete_api_catalog_pvt_product_by_product_id_similarcategory_by_category_id",
      description: "Delete similar category\nDELETE /api/catalog/pvt/product/{productId}/similarcategory/{categoryId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier."),
  categoryId: z.number().int().describe("Similar category's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/similarcategory/${params.categoryId}`;
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
      name: "brand_specifications_by_category_id",
      description: "Get specifications by category ID\nGET /api/catalog_system/pub/specification/field/listByCategoryId/{categoryId}",
      inputSchema: z.object({
  categoryId: z.number().int().describe("Category ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pub/specification/field/listByCategoryId/${params.categoryId}`;
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
      name: "brand_specifications_tree_by_category_id",
      description: "Get specifications tree by category ID\nGET /api/catalog_system/pub/specification/field/listTreeByCategoryId/{categoryId}",
      inputSchema: z.object({
  categoryId: z.number().int().describe("Category ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pub/specification/field/listTreeByCategoryId/${params.categoryId}`;
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
      name: "brand_post_api_catalog_pvt_subcollection_by_sub_collection_id_category",
      description: "Associate category to subcollection\nPOST /api/catalog/pvt/subcollection/{subCollectionId}/category",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection's unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid)."),
  body: z.object({ CategoryId: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/category`;
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
      name: "brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id_category_by_category_id",
      description: "Delete category from subcollection\nDELETE /api/catalog/pvt/subcollection/{subCollectionId}/category/{categoryId}",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection's unique numerical identifier, which can be obtained by placing a request to [Get subcollection by dollection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid)."),
  categoryId: z.number().int().describe("Category's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/category/${params.categoryId}`;
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
      name: "brand_brand_list",
      description: "Get brand list\nGET /api/catalog_system/pvt/brand/list",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/brand/list";
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
      name: "brand_brand_list_per_page",
      description: "Get paginated brand list\nGET /api/catalog_system/pvt/brand/pagedlist",
      inputSchema: z.object({
  pageSize: z.number().int().describe("Quantity of brands per page."),
  page: z.number().int().describe("Page number of the brand list.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/brand/pagedlist";
    const queryParams: Record<string, unknown> = {};
    if (params.pageSize !== undefined) queryParams["pageSize"] = params.pageSize;
    if (params.page !== undefined) queryParams["page"] = params.page;
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
      name: "brand_brand",
      description: "Get brand by ID\nGET /api/catalog_system/pvt/brand/{brandId}",
      inputSchema: z.object({
  brandId: z.string().describe("Brand ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/brand/${params.brandId}`;
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
      name: "brand_post_api_catalog_pvt_brand",
      description: "Create brand\nPOST /api/catalog/pvt/brand",
      inputSchema: z.object({
  body: z.object({ Id: z.number().int(), Name: z.string(), Text: z.string().optional(), Keywords: z.string().optional(), SiteTitle: z.string().optional(), AdWordsRemarketingCode: z.string().optional(), LomadeeCampaignCode: z.string().optional(), Score: z.number().int().optional(), MenuHome: z.boolean().optional(), Active: z.boolean().optional(), LinkId: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/brand";
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
      name: "brand_get_api_catalog_pvt_brand_by_brand_id",
      description: "Get brand and context\nGET /api/catalog/pvt/brand/{brandId}",
      inputSchema: z.object({
  brandId: z.string().describe("Brand ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/brand/${params.brandId}`;
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
      name: "brand_put_api_catalog_pvt_brand_by_brand_id",
      description: "Update brand\nPUT /api/catalog/pvt/brand/{brandId}",
      inputSchema: z.object({
  brandId: z.string().describe("Brand's unique numerical identifier."),
  body: z.object({ Id: z.number().int(), Name: z.string(), Text: z.string().optional(), Keywords: z.string().optional(), SiteTitle: z.string().optional(), AdWordsRemarketingCode: z.string().optional(), LomadeeCampaignCode: z.string().optional(), Score: z.number().int().optional(), MenuHome: z.boolean().optional(), Active: z.boolean().optional(), LinkId: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/brand/${params.brandId}`;
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
      name: "brand_delete_api_catalog_pvt_brand_by_brand_id",
      description: "Delete brand\nDELETE /api/catalog/pvt/brand/{brandId}",
      inputSchema: z.object({
  brandId: z.string().describe("Brand's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/brand/${params.brandId}`;
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
      name: "brand_post_api_catalog_pvt_subcollection_by_sub_collection_id_brand",
      description: "Associate brand to subcollection\nPOST /api/catalog/pvt/subcollection/{subCollectionId}/brand",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection's unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid)."),
  body: z.object({ BrandId: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/brand`;
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
      name: "brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id_brand_by_brand_id",
      description: "Delete brand from subcollection\nDELETE /api/catalog/pvt/subcollection/{subCollectionId}/brand/{brandId}",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection's unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid)."),
  brandId: z.number().int().describe("Brand's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/brand/${params.brandId}`;
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
      name: "brand_get_api_catalog_pvt_attachment_by_attachmentid",
      description: "Get attachment by ID\nGET /api/catalog/pvt/attachment/{attachmentid}",
      inputSchema: z.object({
  attachmentid: z.string().describe("Attachment ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/attachment/${params.attachmentid}`;
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
      name: "brand_put_api_catalog_pvt_attachment_by_attachmentid",
      description: "Update attachment\nPUT /api/catalog/pvt/attachment/{attachmentid}",
      inputSchema: z.object({
  attachmentid: z.string().describe("Attachment ID."),
  body: z.object({ Name: z.string(), IsRequired: z.boolean(), IsActive: z.boolean(), Domains: z.array(z.object({ FieldName: z.string().optional(), MaxCaracters: z.string().optional(), DomainValues: z.string().optional() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/attachment/${params.attachmentid}`;
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
      name: "brand_delete_api_catalog_pvt_attachment_by_attachmentid",
      description: "Delete attachment\nDELETE /api/catalog/pvt/attachment/{attachmentid}",
      inputSchema: z.object({
  attachmentid: z.string().describe("Attachment ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/attachment/${params.attachmentid}`;
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
      name: "brand_post_api_catalog_pvt_attachment",
      description: "Create attachment\nPOST /api/catalog/pvt/attachment",
      inputSchema: z.object({
  body: z.object({ Name: z.string(), IsRequired: z.boolean(), IsActive: z.boolean(), Domains: z.array(z.object({ FieldName: z.string().optional(), MaxCaracters: z.string().optional(), DomainValues: z.string().optional() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/attachment";
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
      name: "brand_get_api_catalog_pvt_attachments",
      description: "Get all attachments\nGET /api/catalog/pvt/attachments",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/attachments";
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
      name: "brand_get-all_inactive_collections",
      description: "Get all inactive collections\nGET /api/catalog/pvt/collection/inactive",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/collection/inactive";
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
      name: "brand_post-create_collection",
      description: "Create collection\nPOST /api/catalog/pvt/collection",
      inputSchema: z.object({
  body: z.object({ Name: z.string(), Description: z.string(), Searchable: z.boolean(), Highlight: z.boolean(), DateFrom: z.string(), DateTo: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/collection";
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
      name: "brand_get-importfileexample",
      description: "Import collection file example\nGET /api/catalog/pvt/collection/stockkeepingunit/importfileexample",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/collection/stockkeepingunit/importfileexample";
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
      name: "brand_post-addproductsbyimportfile",
      description: "Add products to collection by imported file\nPOST /api/catalog/pvt/collection/{collectionId}/stockkeepingunit/importinsert",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Collection's unique identifier."),
  body: z.object({ file: z.unknown().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}/stockkeepingunit/importinsert`;
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
      name: "brand_post-removeproductsbyimportfile",
      description: "Remove products from collection by imported file\nPOST /api/catalog/pvt/collection/{collectionId}/stockkeepingunit/importexclude",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Collection's unique identifier."),
  body: z.object({ file: z.unknown().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}/stockkeepingunit/importexclude`;
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
      name: "brand_get-productsfromacollection",
      description: "Get products from a collection\nGET /api/catalog/pvt/collection/{collectionId}/products",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Collection's unique identifier."),
  page: z.number().int().optional().describe("Page number."),
  pageSize: z.number().int().optional().describe("Number of the items of the page."),
  Filter: z.string().optional().describe("Filter used to refine the collection's products."),
  Active: z.boolean().optional().describe("Defines if the status of the product is active or not."),
  Visible: z.boolean().optional().describe("Defines if the product is visible on the store or not."),
  CategoryId: z.number().int().optional().describe("Product's category unique identifier."),
  BrandId: z.number().int().optional().describe("Product's brand unique identifier."),
  SupplierId: z.number().int().optional().describe("Product's supplier unique identifier."),
  SalesChannelId: z.number().int().optional().describe("Product's trade policy unique identifier."),
  ReleaseFrom: z.string().optional().describe("Product past release date."),
  ReleaseTo: z.string().optional().describe("Product future release date."),
  SpecificationProduct: z.string().optional().describe("Product specification field Value. You must also fill in `SpecificationFieldId` to use this parameter."),
  SpecificationFieldId: z.number().int().optional().describe("Product specification field unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}/products`;
    const queryParams: Record<string, unknown> = {};
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.pageSize !== undefined) queryParams["pageSize"] = params.pageSize;
    if (params.Filter !== undefined) queryParams["Filter"] = params.Filter;
    if (params.Active !== undefined) queryParams["Active"] = params.Active;
    if (params.Visible !== undefined) queryParams["Visible"] = params.Visible;
    if (params.CategoryId !== undefined) queryParams["CategoryId"] = params.CategoryId;
    if (params.BrandId !== undefined) queryParams["BrandId"] = params.BrandId;
    if (params.SupplierId !== undefined) queryParams["SupplierId"] = params.SupplierId;
    if (params.SalesChannelId !== undefined) queryParams["SalesChannelId"] = params.SalesChannelId;
    if (params.ReleaseFrom !== undefined) queryParams["ReleaseFrom"] = params.ReleaseFrom;
    if (params.ReleaseTo !== undefined) queryParams["ReleaseTo"] = params.ReleaseTo;
    if (params.SpecificationProduct !== undefined) queryParams["SpecificationProduct"] = params.SpecificationProduct;
    if (params.SpecificationFieldId !== undefined) queryParams["SpecificationFieldId"] = params.SpecificationFieldId;
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
      name: "brand_get_api_catalog_pvt_collection_by_collection_id",
      description: "Get collection by ID\nGET /api/catalog/pvt/collection/{collectionId}",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Collection's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}`;
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
      name: "brand_put_api_catalog_pvt_collection_by_collection_id",
      description: "Update collection\nPUT /api/catalog/pvt/collection/{collectionId}",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Collection's unique numerical identifier."),
  body: z.object({ Name: z.string(), Searchable: z.boolean(), Highlight: z.boolean(), DateFrom: z.string(), DateTo: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}`;
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
      name: "brand_delete_api_catalog_pvt_collection_by_collection_id",
      description: "Delete collection\nDELETE /api/catalog/pvt/collection/{collectionId}",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Collection's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}`;
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
      name: "brand_get_api_catalog_pvt_collection_by_collection_id_subcollection",
      description: "Get subcollection by collection ID\nGET /api/catalog/pvt/collection/{collectionId}/subcollection",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Collection's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}/subcollection`;
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
      name: "brand_get_api_catalog_pvt_subcollection_by_sub_collection_id",
      description: "Get subcollection by subcollection ID\nGET /api/catalog/pvt/subcollection/{subCollectionId}",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection's unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}`;
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
      name: "brand_put_api_catalog_pvt_subcollection_by_sub_collection_id",
      description: "Update subcollection\nPUT /api/catalog/pvt/subcollection/{subCollectionId}",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection's unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid)."),
  body: z.object({ CollectionId: z.number().int(), Name: z.string(), Type: z.string(), PreSale: z.boolean(), Release: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}`;
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
      name: "brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id",
      description: "Delete subcollection\nDELETE /api/catalog/pvt/subcollection/{subCollectionId}",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection's unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}`;
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
      name: "brand_post_api_catalog_pvt_subcollection",
      description: "Create subcollection\nPOST /api/catalog/pvt/subcollection",
      inputSchema: z.object({
  body: z.object({ CollectionId: z.number().int(), Name: z.string(), Type: z.string(), PreSale: z.boolean(), Release: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/subcollection";
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
      name: "brand_post_api_catalog_pvt_collection_by_collection_id_position",
      description: "Reposition SKU on the subcollection\nPOST /api/catalog/pvt/collection/{collectionId}/position",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Collection's unique numerical identifier."),
  body: z.object({ skuId: z.number().int(), position: z.number().int(), subCollectionId: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}/position`;
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
      name: "brand_get_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue",
      description: "Get specification values by subcollection ID\nGET /api/catalog/pvt/subcollection/{subCollectionId}/specificationvalue",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/specificationvalue`;
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
      name: "brand_post_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue",
      description: "Use specification value in subcollection by ID\nPOST /api/catalog/pvt/subcollection/{subCollectionId}/specificationvalue",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid)."),
  body: z.object({ SubCollectionId: z.number().int(), SpecificationValueId: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/specificationvalue`;
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
      name: "brand_delete_api_catalog_pvt_subcollection_by_sub_collection_id_specificationvalue",
      description: "Delete specification value from subcollection by ID\nDELETE /api/catalog/pvt/subcollection/{subCollectionId}/specificationvalue",
      inputSchema: z.object({
  subCollectionId: z.number().int().describe("Subcollection unique numerical identifier, which can be obtained by placing a request to [Get subcollection by collection ID](https://developers.vtex.com/vtex-rest-api/reference/catalog-api-get-subcollection-collectionid).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/subcollection/${params.subCollectionId}/specificationvalue`;
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
      name: "brand_get_api_catalog_pvt_specification_by_specification_id",
      description: "Get specification by specification ID\nGET /api/catalog/pvt/specification/{specificationId}",
      inputSchema: z.object({
  specificationId: z.number().int().describe("Specification's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specification/${params.specificationId}`;
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
      name: "brand_put_api_catalog_pvt_specification_by_specification_id",
      description: "Update specification\nPUT /api/catalog/pvt/specification/{specificationId}",
      inputSchema: z.object({
  specificationId: z.number().int().describe("Specification's unique numerical identifier."),
  body: z.object({ FieldTypeId: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9)]), CategoryId: z.number().int(), FieldGroupId: z.number().int(), Name: z.string(), Description: z.string(), Position: z.number().int(), IsFilter: z.boolean(), IsRequired: z.boolean(), IsOnProductDetails: z.boolean(), IsStockKeepingUnit: z.boolean(), IsWizard: z.boolean(), IsActive: z.boolean(), IsTopMenuLinkActive: z.boolean(), IsSideMenuLinkActive: z.boolean(), DefaultValue: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specification/${params.specificationId}`;
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
      name: "brand_post_api_catalog_pvt_specification",
      description: "Create specification\nPOST /api/catalog/pvt/specification",
      inputSchema: z.object({
  body: z.object({ FieldTypeId: z.union([z.literal(1), z.literal(2), z.literal(4), z.literal(5), z.literal(6), z.literal(7), z.literal(8), z.literal(9)]), CategoryId: z.number().int().optional(), FieldGroupId: z.number().int(), Name: z.string(), Description: z.string().optional(), Position: z.number().int().optional(), IsFilter: z.boolean().optional(), IsRequired: z.boolean().optional(), IsOnProductDetails: z.boolean().optional(), IsStockKeepingUnit: z.boolean().optional(), IsWizard: z.boolean().optional(), IsActive: z.boolean().optional(), IsTopMenuLinkActive: z.boolean().optional(), IsSideMenuLinkActive: z.boolean().optional(), DefaultValue: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/specification";
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
      name: "brand_specifications_field",
      description: "Get specification field\nGET /api/catalog_system/pub/specification/fieldGet/{fieldId}",
      inputSchema: z.object({
  fieldId: z.number().int().describe("Specification field ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pub/specification/fieldGet/${params.fieldId}`;
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
      name: "brand_specifications_insert_field",
      description: "Create specification field\nPOST /api/catalog_system/pvt/specification/field",
      inputSchema: z.object({
  body: z.object({ Name: z.string(), CategoryId: z.number().int(), FieldId: z.number().int(), IsActive: z.boolean(), IsRequired: z.boolean(), FieldTypeId: z.number().int(), FieldValueId: z.number().int(), Description: z.string(), IsStockKeepingUnit: z.boolean(), IsFilter: z.boolean(), IsOnProductDetails: z.boolean(), Position: z.number().int(), IsWizard: z.boolean(), IsTopMenuLinkActive: z.boolean(), IsSideMenuLinkActive: z.boolean(), DefaultValue: z.string(), FieldGroupId: z.number().int(), FieldGroupName: z.string() })
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/specification/field";
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
      name: "brand_specifications_insert_field_update",
      description: "Update specification field\nPUT /api/catalog_system/pvt/specification/field",
      inputSchema: z.object({
  body: z.object({ Name: z.string(), CategoryId: z.number().int(), FieldId: z.number().int(), IsActive: z.boolean(), IsRequired: z.boolean(), FieldTypeId: z.number().int(), FieldValueId: z.number().int().optional(), Description: z.string(), IsStockKeepingUnit: z.boolean(), IsFilter: z.boolean(), IsOnProductDetails: z.boolean(), Position: z.number().int(), IsWizard: z.boolean(), IsTopMenuLinkActive: z.boolean(), IsSideMenuLinkActive: z.boolean(), DefaultValue: z.string(), FieldGroupId: z.number().int(), FieldGroupName: z.string() })
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/specification/field";
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
      name: "brand_specifications_get_field_value",
      description: "Get specification field value\nGET /api/catalog_system/pvt/specification/fieldValue/{fieldValueId}",
      inputSchema: z.object({
  fieldValueId: z.string().describe("Specification value ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/specification/fieldValue/${params.fieldValueId}`;
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
      name: "brand_specifications_values_by_field_id",
      description: "Get specification values by specification field ID\nGET /api/catalog_system/pub/specification/fieldvalue/{fieldId}",
      inputSchema: z.object({
  fieldId: z.number().int().describe("Specification field ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pub/specification/fieldvalue/${params.fieldId}`;
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
      name: "brand_specifications_insert_field_value",
      description: "Create specification field value\nPOST /api/catalog_system/pvt/specification/fieldValue",
      inputSchema: z.object({
  body: z.object({ FieldId: z.number().int(), Name: z.string(), Text: z.string(), IsActive: z.boolean(), Position: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/specification/fieldValue";
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
      name: "brand_specifications_update_field_value",
      description: "Update specification field value\nPUT /api/catalog_system/pvt/specification/fieldValue",
      inputSchema: z.object({
  body: z.object({ FieldId: z.number().int(), Name: z.string(), Text: z.string(), IsActive: z.boolean(), Position: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/specification/fieldValue";
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
      name: "brand_get_api_catalog_pvt_specificationvalue_by_specification_value_id",
      description: "Get specification value\nGET /api/catalog/pvt/specificationvalue/{specificationValueId}",
      inputSchema: z.object({
  specificationValueId: z.number().int().describe("Specification value's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specificationvalue/${params.specificationValueId}`;
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
      name: "brand_put_api_catalog_pvt_specificationvalue_by_specification_value_id",
      description: "Update specification value\nPUT /api/catalog/pvt/specificationvalue/{specificationValueId}",
      inputSchema: z.object({
  specificationValueId: z.number().int().describe(" specification value's unique numerical identifier."),
  body: z.object({ FieldId: z.number().int(), Name: z.string(), Text: z.string().optional(), IsActive: z.boolean().optional(), Position: z.number().int().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specificationvalue/${params.specificationValueId}`;
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
      name: "brand_post_api_catalog_pvt_specificationvalue",
      description: "Create specification value\nPOST /api/catalog/pvt/specificationvalue",
      inputSchema: z.object({
  body: z.object({ FieldId: z.number().int(), Name: z.string(), Text: z.string().optional(), IsActive: z.boolean().optional(), Position: z.number().int().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/specificationvalue";
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
      name: "brand_specifications_group_listby_category",
      description: "List specification group by category\nGET /api/catalog_system/pvt/specification/groupbycategory/{categoryId}",
      inputSchema: z.object({
  categoryId: z.string().describe("Category ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/specification/groupbycategory/${params.categoryId}`;
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
      name: "brand_specifications_group_get",
      description: "Get specification group\nGET /api/catalog_system/pub/specification/groupGet/{groupId}",
      inputSchema: z.object({
  groupId: z.string().describe("Specification group ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pub/specification/groupGet/${params.groupId}`;
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
      name: "brand_specification_group_insert2",
      description: "Create specification group\nPOST /api/catalog/pvt/specificationgroup",
      inputSchema: z.object({
  body: z.object({ CategoryId: z.number().int(), Name: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/specificationgroup";
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
      name: "brand_put_api_catalog_pvt_specificationgroup_by_group_id",
      description: "Update specification group\nPUT /api/catalog/pvt/specificationgroup/{groupId}",
      inputSchema: z.object({
  groupId: z.number().int().describe("Group's unique numerical identifier."),
  body: z.object({ CategoryId: z.number().int(), Id: z.number().int(), Name: z.string(), Position: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specificationgroup/${params.groupId}`;
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
      name: "brand_get_api_catalog_pvt_specification_nonstructured_by_id",
      description: "Get non-structured specification by ID\nGET /api/catalog/pvt/specification/nonstructured/{Id}",
      inputSchema: z.object({
  Id: z.number().int().describe("Non-structured specification's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specification/nonstructured/${params.Id}`;
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
      name: "brand_delete_api_catalog_pvt_specification_nonstructured_by_id",
      description: "Delete non-structured specification\nDELETE /api/catalog/pvt/specification/nonstructured/{Id}",
      inputSchema: z.object({
  Id: z.number().int().describe("Non-structured specification's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specification/nonstructured/${params.Id}`;
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
      name: "brand_get_api_catalog_pvt_specification_nonstructured",
      description: "Get non-structured specification by SKU ID\nGET /api/catalog/pvt/specification/nonstructured",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/specification/nonstructured";
    const queryParams: Record<string, unknown> = {};
    if (params.skuId !== undefined) queryParams["skuId"] = params.skuId;
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
      name: "brand_delete_api_catalog_pvt_specification_nonstructured",
      description: "Delete non-structured specification by SKU ID\nDELETE /api/catalog/pvt/specification/nonstructured",
      inputSchema: z.object({
  skuId: z.number().int().describe("SKU's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/specification/nonstructured";
    const queryParams: Record<string, unknown> = {};
    if (params.skuId !== undefined) queryParams["skuId"] = params.skuId;
    const response = await http.delete(url, { params: queryParams });
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
      name: "brand_sales_channel_list",
      description: "Get sales channel list\nGET /api/catalog_system/pvt/saleschannel/list",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/saleschannel/list";
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
      name: "brand_sales_channelby_id",
      description: "Get sales channel by ID\nGET /api/catalog_system/pub/saleschannel/{salesChannelId}",
      inputSchema: z.object({
  salesChannelId: z.string().describe("Trade policy ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pub/saleschannel/${params.salesChannelId}`;
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
      name: "brand_seller_list",
      description: "Get seller list\nGET /api/catalog_system/pvt/seller/list",
      inputSchema: z.object({
  sc: z.number().int().optional().describe("Trade policy ID."),
  sellerType: z.number().int().optional().describe("There are two possible values for this parameter:\n\r- `1`: Regular sellers\n\r- `2`: [White label sellers](https://help.vtex.com/en/tutorial/seller-white-label--5orlGHyDHGAYciQ64oEgKa)"),
  isBetterScope: z.boolean().optional().describe("If the seller is better scope.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/seller/list";
    const queryParams: Record<string, unknown> = {};
    if (params.sc !== undefined) queryParams["sc"] = params.sc;
    if (params.sellerType !== undefined) queryParams["sellerType"] = params.sellerType;
    if (params.isBetterScope !== undefined) queryParams["isBetterScope"] = params.isBetterScope;
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
      name: "brand_get_sellerby_id",
      description: "Get seller by ID\nGET /api/catalog_system/pvt/seller/{sellerId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the Admin to get the correct ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/seller/${params.sellerId}`;
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
      name: "brand_update_seller",
      description: "Update seller\nPUT /api/catalog_system/pvt/seller",
      inputSchema: z.object({
  body: z.object({ SellerId: z.string(), Name: z.string(), Email: z.string(), Description: z.string(), ExchangeReturnPolicy: z.string(), DeliveryPolicy: z.string(), UseHybridPaymentOptions: z.boolean(), UserName: z.string(), Password: z.string(), SecutityPrivacyPolicy: z.string(), CNPJ: z.string(), CSCIdentification: z.string(), ArchiveId: z.number().int(), UrlLogo: z.string(), ProductCommissionPercentage: z.number(), FreightCommissionPercentage: z.number(), CategoryCommissionPercentage: z.string().optional(), FulfillmentEndpoint: z.string(), CatalogSystemEndpoint: z.string(), IsActive: z.boolean(), MerchantName: z.string().optional(), FulfillmentSellerId: z.number().int(), SellerType: z.number().int(), IsBetterScope: z.boolean(), TrustPolicy: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/seller";
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
      name: "brand_create_seller",
      description: "Create seller\nPOST /api/catalog_system/pvt/seller",
      inputSchema: z.object({
  body: z.object({ SellerId: z.string(), Name: z.string(), Email: z.string(), Description: z.string(), ExchangeReturnPolicy: z.string(), DeliveryPolicy: z.string(), UseHybridPaymentOptions: z.boolean(), UserName: z.string(), Password: z.string(), SecutityPrivacyPolicy: z.string(), CNPJ: z.string(), CSCIdentification: z.string(), ArchiveId: z.number().int(), UrlLogo: z.string(), ProductCommissionPercentage: z.number(), FreightCommissionPercentage: z.number(), CategoryCommissionPercentage: z.string().optional(), FulfillmentEndpoint: z.string(), CatalogSystemEndpoint: z.string(), IsActive: z.boolean(), MerchantName: z.string().optional(), FulfillmentSellerId: z.number().int(), SellerType: z.number().int(), IsBetterScope: z.boolean(), TrustPolicy: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/seller";
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
      name: "brand_get_sellersby_id",
      description: "Get seller by ID\nGET /api/catalog_system/pvt/sellers/{sellerId}",
      inputSchema: z.object({
  sellerId: z.string().describe("ID that identifies the seller in the marketplace. It can be the same as the seller name or a unique number. Check the **Sellers management** section in the Admin to get the correct ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/sellers/${params.sellerId}`;
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
      name: "brand_post_api_catalog_pvt_supplier",
      description: "Create supplier\nPOST /api/catalog/pvt/supplier",
      inputSchema: z.object({
  body: z.object({ Name: z.string(), CorporateName: z.string(), StateInscription: z.string(), Cnpj: z.string(), Phone: z.string(), CellPhone: z.string(), CorportePhone: z.string(), Email: z.string(), IsActive: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog/pvt/supplier";
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
      name: "brand_put_api_catalog_pvt_supplier_by_supplier_id",
      description: "Update supplier\nPUT /api/catalog/pvt/supplier/{supplierId}",
      inputSchema: z.object({
  supplierId: z.number().int().describe("Supplier's unique numerical identifier."),
  body: z.object({ Name: z.string(), CorporateName: z.string(), StateInscription: z.string(), Cnpj: z.string(), Phone: z.string(), CellPhone: z.string(), CorportePhone: z.string(), Email: z.string(), IsActive: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/supplier/${params.supplierId}`;
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
      name: "brand_delete_api_catalog_pvt_supplier_by_supplier_id",
      description: "Delete supplier\nDELETE /api/catalog/pvt/supplier/{supplierId}",
      inputSchema: z.object({
  supplierId: z.number().int().describe("Supplier's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/supplier/${params.supplierId}`;
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
      name: "brand_get_api_catalog_pvt_product_by_product_id_salespolicy",
      description: "Get trade policies by product ID\nGET /api/catalog/pvt/product/{productId}/salespolicy",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/salespolicy`;
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
      name: "brand_post_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id",
      description: "Associate product with trade policy\nPOST /api/catalog/pvt/product/{productId}/salespolicy/{tradepolicyId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier."),
  tradepolicyId: z.number().int().describe("Trade policy's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/salespolicy/${params.tradepolicyId}`;
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
      name: "brand_delete_api_catalog_pvt_product_by_product_id_salespolicy_by_tradepolicy_id",
      description: "Remove product from trade policy\nDELETE /api/catalog/pvt/product/{productId}/salespolicy/{tradepolicyId}",
      inputSchema: z.object({
  productId: z.number().int().describe("Product's unique numerical identifier."),
  tradepolicyId: z.number().int().describe("Trade policy's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/salespolicy/${params.tradepolicyId}`;
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
      name: "brand_get_api_catalog_system_pvt_sku_stockkeepingunitidsbysaleschannel",
      description: "List all SKUs of a trade policy\nGET /api/catalog_system/pvt/sku/stockkeepingunitidsbysaleschannel",
      inputSchema: z.object({
  sc: z.number().int().describe("Trade policy's unique numerical identifier."),
  page: z.number().int().optional().describe("Page number."),
  pageSize: z.number().int().optional().describe("Number of items in the page."),
  onlyAssigned: z.boolean().optional().describe("If set as `false`, it allows the user to decide if the SKUs that are not assigned to a specific trade policy should be also returned.")
}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/sku/stockkeepingunitidsbysaleschannel";
    const queryParams: Record<string, unknown> = {};
    if (params.sc !== undefined) queryParams["sc"] = params.sc;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.pageSize !== undefined) queryParams["pageSize"] = params.pageSize;
    if (params.onlyAssigned !== undefined) queryParams["onlyAssigned"] = params.onlyAssigned;
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
      name: "brand_indexed_info",
      description: "Get product indexed information\nGET /api/catalog_system/pvt/products/GetIndexedInfo/{productId}",
      inputSchema: z.object({
  productId: z.string().describe("Product's unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/products/GetIndexedInfo/${params.productId}`;
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
      name: "brand_get_all_commercial_conditions",
      description: "Get all commercial conditions\nGET /api/catalog_system/pvt/commercialcondition/list",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/catalog_system/pvt/commercialcondition/list";
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
      name: "brand_get_commercial_conditions",
      description: "Get commercial condition\nGET /api/catalog_system/pvt/commercialcondition/{commercialConditionId}",
      inputSchema: z.object({
  commercialConditionId: z.number().int().describe("Commercial condition unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/commercialcondition/${params.commercialConditionId}`;
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
      name: "brand_get_gift_list",
      description: "Get gift list\nGET /api/addon/pvt/giftlist/get/{listId}",
      inputSchema: z.object({
  listId: z.number().int().describe("Gift list unique numerical identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/addon/pvt/giftlist/get/${params.listId}`;
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
      name: "brand_get_api_catalog_pvt_product_by_product_id_language",
      description: "Get product translation by product ID\nGET /api/catalog/pvt/product/{productId}/language",
      inputSchema: z.object({
  productId: z.number().int().describe("Unique identifier of the product."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_product_by_product_id_language",
      description: "Create or update product translation by product ID\nPUT /api/catalog/pvt/product/{productId}/language",
      inputSchema: z.object({
  productId: z.number().int().describe("Unique identifier of the product."),
  body: z.object({ Locale: z.string(), Name: z.string(), Title: z.string(), Description: z.string().optional(), MetaTagDescription: z.string().optional(), DescriptionShort: z.string().optional(), Keywords: z.string().optional(), LinkId: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/product/${params.productId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language",
      description: "Get product specification translation by product ID\nGET /api/catalog/pvt/products/{productId}/specification/{specificationId}/language",
      inputSchema: z.object({
  productId: z.number().int().describe("Unique identifier of the product."),
  specificationId: z.number().int().describe("Unique identifier of the specification."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/products/${params.productId}/specification/${params.specificationId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_products_by_product_id_specification_by_specification_id_language",
      description: "Create or update product specification translation by product ID\nPUT /api/catalog/pvt/products/{productId}/specification/{specificationId}/language",
      inputSchema: z.object({
  productId: z.number().int().describe("Unique identifier of the product."),
  specificationId: z.number().int().describe("Unique identifier of the specification."),
  body: z.object({ ProductId: z.number().int(), SpecificationId: z.number().int(), Locale: z.string(), Name: z.string(), Value: z.string(), Values: z.array(z.string()).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/products/${params.productId}/specification/${params.specificationId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_language",
      description: "Get SKU translation by SKU ID\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/language",
      inputSchema: z.object({
  skuId: z.number().int().describe("Unique identifier of the SKU."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_language",
      description: "Create or update SKU translation by SKU ID\nPUT /api/catalog/pvt/stockkeepingunit/{skuId}/language",
      inputSchema: z.object({
  skuId: z.number().int().describe("Unique identifier of the SKU."),
  body: z.object({ Locale: z.string(), Name: z.string(), MeasurementUnit: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language",
      description: "Get SKU attribute translation by SKU ID\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/attribute/{skuAttributeId}/language",
      inputSchema: z.object({
  skuId: z.number().int().describe("Unique identifier of the SKU."),
  skuAttributeId: z.number().int().describe("Unique identifier of the SKU attribute."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute/${params.skuAttributeId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_attribute_by_sku_attribute_id_language",
      description: "Create or update SKU attribute translation by SKU ID\nPUT /api/catalog/pvt/stockkeepingunit/{skuId}/attribute/{skuAttributeId}/language",
      inputSchema: z.object({
  skuId: z.number().int().describe("Unique identifier of the SKU."),
  skuAttributeId: z.number().int().describe("Unique identifier of the SKU attribute."),
  body: z.object({ Id: z.number().int(), Locale: z.string(), AttributeName: z.string(), AttributeValue: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/attribute/${params.skuAttributeId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language",
      description: "Get SKU file translation by SKU ID\nGET /api/catalog/pvt/stockkeepingunit/{skuId}/file/{skuFileId}/language",
      inputSchema: z.object({
  skuId: z.number().int().describe("Unique identifier of the SKU."),
  skuFileId: z.number().int().describe("Unique identifier of the SKU file."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/${params.skuFileId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_stockkeepingunit_by_sku_id_file_by_sku_file_id_language",
      description: "Create or update SKU file translation by SKU ID\nPUT /api/catalog/pvt/stockkeepingunit/{skuId}/file/{skuFileId}/language",
      inputSchema: z.object({
  skuId: z.number().int().describe("Unique identifier of the SKU."),
  skuFileId: z.number().int().describe("Unique identifier of the SKU file."),
  body: z.object({ Locale: z.string(), Label: z.string(), Name: z.string(), Text: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/stockkeepingunit/${params.skuId}/file/${params.skuFileId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_specificationgroup_by_specification_group_id_language",
      description: "Get specification group translation\nGET /api/catalog/pvt/specificationgroup/{specificationGroupId}/language",
      inputSchema: z.object({
  specificationGroupId: z.number().int().describe("Unique identifier of the specification group."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specificationgroup/${params.specificationGroupId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_specificationgroup_by_specification_group_id_language",
      description: "Create or update specification group translation\nPUT /api/catalog/pvt/specificationgroup/{specificationGroupId}/language",
      inputSchema: z.object({
  specificationGroupId: z.number().int().describe("Unique identifier of the specification group."),
  body: z.object({ Locale: z.string(), Name: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specificationgroup/${params.specificationGroupId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_specification_by_specification_id_language",
      description: "Get specification translation\nGET /api/catalog/pvt/specification/{specificationId}/language",
      inputSchema: z.object({
  specificationId: z.number().int().describe("Unique identifier of the specification."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specification/${params.specificationId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_specification_by_specification_id_language",
      description: "Create or update specification translation\nPUT /api/catalog/pvt/specification/{specificationId}/language",
      inputSchema: z.object({
  specificationId: z.number().int().describe("Unique identifier of the specification."),
  body: z.object({ Locale: z.string(), Name: z.string(), Description: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specification/${params.specificationId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_specificationvalue_by_value_id_language",
      description: "Get specification value translation\nGET /api/catalog/pvt/specificationvalue/{valueId}/language",
      inputSchema: z.object({
  valueId: z.number().int().describe("Unique identifier of the specification value."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specificationvalue/${params.valueId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_specificationvalue_by_value_id_language",
      description: "Create or update specification value translation\nPUT /api/catalog/pvt/specificationvalue/{valueId}/language",
      inputSchema: z.object({
  valueId: z.number().int().describe("Unique identifier of the specification value."),
  body: z.object({ Locale: z.string(), Name: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/specificationvalue/${params.valueId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_category_by_category_id_language",
      description: "Get category translation\nGET /api/catalog/pvt/category/{categoryId}/language",
      inputSchema: z.object({
  categoryId: z.number().int().describe("Unique identifier of the category."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/category/${params.categoryId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_category_by_category_id_language",
      description: "Create or update category translation\nPUT /api/catalog/pvt/category/{categoryId}/language",
      inputSchema: z.object({
  categoryId: z.number().int().describe("Unique identifier of the category."),
  body: z.object({ Locale: z.string(), Name: z.string(), Title: z.string().optional(), Description: z.string().optional(), Keywords: z.string().optional(), LinkId: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/category/${params.categoryId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_brand_by_brand_id_language",
      description: "Get brand translation\nGET /api/catalog/pvt/brand/{brandId}/language",
      inputSchema: z.object({
  brandId: z.number().int().describe("Unique identifier of the brand."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/brand/${params.brandId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_brand_by_brand_id_language",
      description: "Create or update brand translation\nPUT /api/catalog/pvt/brand/{brandId}/language",
      inputSchema: z.object({
  brandId: z.number().int().describe("Unique identifier of the brand."),
  body: z.object({ Locale: z.string(), Name: z.string(), Text: z.string().optional(), Keywords: z.string().optional(), SiteTitle: z.string().optional(), LinkId: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/brand/${params.brandId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_attachment_by_attachment_id_language",
      description: "Get attachment translation\nGET /api/catalog/pvt/attachment/{attachmentId}/language",
      inputSchema: z.object({
  attachmentId: z.number().int().describe("Unique identifier of the attachment."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/attachment/${params.attachmentId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_attachment_by_attachment_id_language",
      description: "Create or update attachment translation\nPUT /api/catalog/pvt/attachment/{attachmentId}/language",
      inputSchema: z.object({
  attachmentId: z.number().int().describe("Unique identifier of the attachment."),
  body: z.object({ Locale: z.string(), Name: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/attachment/${params.attachmentId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language",
      description: "Get SKU service type translation\nGET /api/catalog/pvt/skuservicetype/{skuServiceTypeId}/language",
      inputSchema: z.object({
  skuServiceTypeId: z.number().int().describe("Unique identifier of the SKU service type."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_skuservicetype_by_sku_service_type_id_language",
      description: "Create or update SKU service type translation\nPUT /api/catalog/pvt/skuservicetype/{skuServiceTypeId}/language",
      inputSchema: z.object({
  skuServiceTypeId: z.number().int().describe("Unique identifier of the SKU service type."),
  body: z.object({ Locale: z.string(), Name: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicetype/${params.skuServiceTypeId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_skuservice_by_skuservice_id_language",
      description: "Get SKU service translation\nGET /api/catalog/pvt/skuservice/{skuserviceId}/language",
      inputSchema: z.object({
  skuserviceId: z.number().int().describe("Unique identifier of the SKU service."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservice/${params.skuserviceId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_skuservice_by_skuservice_id_language",
      description: "Create or update SKU service translation\nPUT /api/catalog/pvt/skuservice/{skuserviceId}/language",
      inputSchema: z.object({
  skuserviceId: z.number().int().describe("Unique identifier of the SKU service."),
  body: z.object({ Locale: z.string(), Name: z.string(), Text: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservice/${params.skuserviceId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language",
      description: "Get SKU service value translation\nGET /api/catalog/pvt/skuservicevalue/{skuServiceValueId}/language",
      inputSchema: z.object({
  skuServiceValueId: z.number().int().describe("Unique identifier of the SKU service value."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_skuservicevalue_by_sku_service_value_id_language",
      description: "Create or update SKU service value translation\nPUT /api/catalog/pvt/skuservicevalue/{skuServiceValueId}/language",
      inputSchema: z.object({
  skuServiceValueId: z.number().int().describe("Unique identifier of the SKU service value."),
  body: z.object({ Locale: z.string(), Name: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/skuservicevalue/${params.skuServiceValueId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
      name: "brand_get_api_catalog_pvt_collection_by_collection_id_language",
      description: "Get collection translation\nGET /api/catalog/pvt/collection/{collectionId}/language",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Unique identifier of the collection."),
  locale: z.string().optional().describe("Code used to filter translations by a given language. When omitted, all configured languages are returned. The format follows the IETF BCP 47 standard, such as 'en-US' for English (United States), 'en-ES' for Spanish (Spain), or 'pt-BR' for Portuguese (Brazil).")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}/language`;
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "brand_put_api_catalog_pvt_collection_by_collection_id_language",
      description: "Create or update collection translation\nPUT /api/catalog/pvt/collection/{collectionId}/language",
      inputSchema: z.object({
  collectionId: z.number().int().describe("Unique identifier of the collection."),
  body: z.object({ Locale: z.string(), Name: z.string(), Description: z.string().optional(), LinkId: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog/pvt/collection/${params.collectionId}/language`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 404:
        throw new Error("Not Found");
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
    }
  ];
}
