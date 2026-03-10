import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "suggestions_getauto_approvevaluefromconfig",
      description: "Get autoApprove status in account settings\nGET /suggestions/configuration/autoapproval/toggle",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace.")
}),
      handler: async (params) => {
  try {
    const url = "/suggestions/configuration/autoapproval/toggle";
    const queryParams: Record<string, unknown> = {};
    if (params.sellerId !== undefined) queryParams["sellerId"] = params.sellerId;
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
      name: "suggestions_saveautoapproveforaccount",
      description: "Activate autoApprove in marketplace's account\nPUT /suggestions/configuration/autoapproval/toggle",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account."),
  body: z.object({ Enabled: z.boolean() })
}),
      handler: async (params) => {
  try {
    const url = "/suggestions/configuration/autoapproval/toggle";
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
      name: "suggestions_getaccountconfig",
      description: "Get account's approval settings\nGET /suggestions/configuration",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account.")
}),
      handler: async (params) => {
  try {
    const url = "/suggestions/configuration";
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
      name: "suggestions_saveaccountconfig",
      description: "Save account's approval settings\nPUT /suggestions/configuration",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account."),
  body: z.object({ Score: z.object({ Approve: z.number().int().default(80), Reject: z.number().int().default(30) }), Matchers: z.array(z.object({ MatcherId: z.string().default("vtex-matcher"), "hook-base-address": z.string(), IsActive: z.boolean(), UpdatesNotificationEndpoint: z.string(), Description: z.string().optional() })), SpecificationsMapping: z.array(z.string()), MatchFlux: z.string().default("autoApprove") })
}),
      handler: async (params) => {
  try {
    const url = "/suggestions/configuration";
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
      name: "suggestions_getmatchconfig",
      description: "Get account's matcher settings\nGET /suggestions/configuration/account/config",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account.")
}),
      handler: async (params) => {
  try {
    const url = "/suggestions/configuration/account/config";
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
      name: "suggestions_getselleraccountconfig",
      description: "Get seller's approval settings\nGET /suggestions/configuration/seller/{sellerId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace.")
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/configuration/seller/${params.sellerId}`;
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
      name: "suggestions_putselleraccountconfig",
      description: "Save seller's approval settings\nPUT /suggestions/configuration/seller/{sellerId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace."),
  body: z.object({ sellerId: z.string(), mapping: z.object({}), matchFlux: z.string().default("autoApprove") })
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/configuration/seller/${params.sellerId}`;
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
      name: "suggestions_saveautoapproveforaccountseller",
      description: "Activate autoApprove setting for a seller\nPUT /suggestions/configuration/autoapproval/toggle/seller/{sellerId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace."),
  body: z.object({ Enabled: z.boolean().default(true) })
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/configuration/autoapproval/toggle/seller/${params.sellerId}`;
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
      name: "suggestions_getsuggestions",
      description: "Get all SKU suggestions\nGET /suggestions",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account. Used as part of the URL"),
  q: z.string().optional().describe("This field allows you to customize your search. You can fill in this query param if you want to narrow down your search using the available filters on Received SKU modules."),
  type: z.string().optional().describe("This field allows users to filter SKU suggestions, by searching only the new suggestions that were just sent, and suggestions that have already been sent, but were updated. Possible values for this field include `new` and `update`."),
  seller: z.string().optional().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller so it can call this endpoint."),
  status: z.string().optional().describe("Narrow down you search, filtering by status. Values allowed on this field include: `accepted`, `pending` and `denied.`"),
  hasmapping: z.string().optional().describe("This field allows you to filter SKUs that have mapping or not. Insert `true` to filter SKUs that have mapping, or `false` to retrieve SKUs that aren't mapped."),
  matcherid: z.string().default("vtex-matcher").describe("Identifies the matching entity. It can be either VTEX's matcher, or an external matcher developed by partners, for example. The `matcherId`'s value can be obtained through the [Get SKU Suggestion by ID](https://developers.vtex.com/vtex-rest-api/reference/getsuggestion) endpoint."),
  _from: z.number().int().optional().describe("Define your pagination range, by adding the pagination starting value. Values should be bigger than 0, with a maximum of 50 records per page."),
  _to: z.number().int().optional().describe("Define your pagination range, by adding the pagination ending value. Values should be bigger than 0, with a maximum of 50 records per page.")
}),
      handler: async (params) => {
  try {
    const url = "/suggestions";
    const queryParams: Record<string, unknown> = {};
    if (params.q !== undefined) queryParams["q"] = params.q;
    if (params.type !== undefined) queryParams["type"] = params.type;
    if (params.seller !== undefined) queryParams["seller"] = params.seller;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.hasmapping !== undefined) queryParams["hasmapping"] = params.hasmapping;
    if (params.matcherid !== undefined) queryParams["matcherid"] = params.matcherid;
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
      name: "suggestions_save_suggestion",
      description: "Send SKU suggestion\nPUT /suggestions/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account to which the seller wants to suggest a new SKU. It is used as part of the request URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  sellerSkuId: z.string().describe("A string that identifies the SKU in the seller. This is the ID that the marketplace will use for future references to this SKU, such as price and inventory notifications."),
  body: z.object({ ProductName: z.string(), ProductId: z.string(), ProductDescription: z.string(), BrandName: z.string(), SkuName: z.string(), SellerId: z.string(), Height: z.number().int(), Width: z.number().int(), Length: z.number().int(), Weight: z.number().int(), RefId: z.string().default("REF10"), EAN: z.string(), SellerStockKeepingUnitId: z.number().int().optional(), CategoryFullPath: z.string(), SkuSpecifications: z.array(z.object({ fieldName: z.string().optional(), fieldValues: z.array(z.string()).optional() })).optional(), ProductSpecifications: z.array(z.object({ fieldName: z.string().optional(), fieldValues: z.array(z.string()).optional() })).optional(), Images: z.array(z.object({ imageName: z.string(), imageUrl: z.string() })), MeasurementUnit: z.string().optional(), UnitMultiplier: z.number().int().optional(), AvailableQuantity: z.number().int(), Pricing: z.object({ Currency: z.string().optional(), SalePrice: z.number().int().optional(), CurrencySymbol: z.string().optional() }) })
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/${params.sellerId}/${params.sellerSkuId}`;
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
      name: "suggestions_get_suggestion",
      description: "Get SKU suggestion by ID\nGET /suggestions/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account. Used as part of the URL"),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  sellerSkuId: z.string().describe("A string that identifies the SKU in the marketplace. This is the ID that the marketplace will use for future references to this SKU, such as price and inventory notifications.")
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/${params.sellerId}/${params.sellerSkuId}`;
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
      name: "suggestions_delete_suggestion",
      description: "Delete SKU suggestion\nDELETE /suggestions/{sellerId}/{sellerSkuId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  sellerSkuId: z.string().describe("A string that identifies the SKU in the marketplace. This is the ID that the marketplace will use for future references to this SKU, such as price and inventory notifications.")
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/${params.sellerId}/${params.sellerSkuId}`;
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
      name: "suggestions_get_versions",
      description: "Get all versions\nGET /suggestions/{sellerId}/{sellerskuid}/versions",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account. Used as part of the URL"),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  sellerskuid: z.string().describe("A string that identifies the SKU in the marketplace. This is the ID that the marketplace will use for future references to this SKU, such as price and inventory notifications.")
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/${params.sellerId}/${params.sellerskuid}/versions`;
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
      name: "suggestions_get_suggestionbyversion",
      description: "Get version by ID\nGET /suggestions/{sellerId}/{sellerskuid}/versions/{version}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account. Used as part of the URL"),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  sellerskuid: z.string().describe("A string that identifies the SKU in the marketplace. This is the ID that the marketplace will use for future references to this SKU, such as price and inventory notifications."),
  version: z.string().describe("Whenever an SKU Suggestion is updated or changed, a new version of the original one is created. All versions are logged, so you can search for previous our current states of SKU suggestions. This field is the `versionId` associated to the version you choose to search for. You can get this field's value through the [Get SKU Suggestion by ID](https://developers.vtex.com/vtex-rest-api/reference/getsuggestion). through the `latestVersionId` field.")
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/${params.sellerId}/${params.sellerskuid}/versions/${params.version}`;
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
      name: "suggestions_match",
      description: "Match received SKUs individually\nPUT /suggestions/{sellerId}/{sellerskuid}/versions/{version}/matches/{matchid}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account. Used as part of the URL"),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  sellerskuid: z.string().describe("A string that identifies the SKU in the marketplace. This is the ID that the marketplace will use for future references to this SKU, such as price and inventory notifications."),
  version: z.string().describe("Whenever an SKU Suggestion is updated or changed, a new version of the original one is created. All versions are logged, so you can search for previous our current states of SKU suggestions. This field is the versionId associated to the version you choose to search for. You can get this field's value through the[Get SKU Suggestion by ID](https://developers.vtex.com/vtex-rest-api/reference/getsuggestion). through the `latestVersionId` field."),
  matchid: z.string().describe("Whenever an SKU suggestion is matched, it is associated to a unique ID. Fill in this field with the matchId you wish to filter by. The `matchId`'s value can be obtained through the *[Get SKU Suggestion by ID](https://developers.vtex.com/vtex-rest-api/reference/getsuggestion) endpoint."),
  body: z.object({ matcherId: z.string().default("vtex-matcher"), matchType: z.string(), score: z.string().default("80"), skuRef: z.string().optional(), productRef: z.string().optional(), product: z.object({ name: z.string(), description: z.string(), categoryId: z.number().int(), brandId: z.number().int(), specifications: z.object({}) }).optional(), sku: z.object({ name: z.string(), eans: z.array(z.string()), refId: z.string(), height: z.number().int(), width: z.number().int(), length: z.number().int(), weight: z.number().int(), images: z.object({ "imagem1.jpg": z.string().optional() }), unitMultiplier: z.number().int().default(1), measurementUnit: z.string().default("un"), specifications: z.object({ Packaging: z.string() }) }).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/${params.sellerId}/${params.sellerskuid}/versions/${params.version}/matches/${params.matchid}`;
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
      name: "suggestions_match_multiple",
      description: "Match multiple received SKUs\nPUT /suggestions/matches/action/{actionName}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account. Used as part of the URL"),
  actionName: z.enum(["newproduct", "skuassociation", "productassociation", "deny"]).describe("Operation to apply to received SKUs. Possible values include: \n\n* `newproduct`: match the SKU as a new product. \n\n* `skuassociation`: associate the received SKU to an existing SKU. \n\n* `productassociation`: associate the received SKU to an existing product. \n\n* `deny`: deny the received SKU."),
  body: z.unknown()
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/matches/action/${params.actionName}`;
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
      name: "suggestions_put_suggestions_configuration_by_seller_id_specifications",
      description: "Map seller specifications to marketplace catalog\nPUT /suggestions/configuration/{sellerID}/specifications",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account. Used as part of the URL"),
  sellerID: z.string().describe("Marketplace seller ID whose specifications will be mapped"),
  body: z.object({})
}),
      handler: async (params) => {
  try {
    const url = `/suggestions/configuration/${params.sellerID}/specifications`;
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
    }
  ];
}
