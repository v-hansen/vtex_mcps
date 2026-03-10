import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "marketplace_price_notification",
      description: "Notify marketplace of price update\nPOST /notificator/{sellerId}/changenotification/{skuId}/price",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  skuId: z.string().describe("A string that identifies the seller's SKU that suffered the change. This is the ID that the marketplace will use for all  references to this SKU, such as price and inventory notifications.")
}),
      handler: async (params) => {
  try {
    const url = `/notificator/${params.sellerId}/changenotification/${params.skuId}/price`;
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
      name: "marketplace_inventory_notification",
      description: "Notify marketplace of inventory update\nPOST /notificator/{sellerId}/changenotification/{skuId}/inventory",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  skuId: z.string().describe("A string that identifies the seller's SKU that suffered the change. This is the ID that the marketplace will use for all  references to this SKU, such as price and inventory notifications.")
}),
      handler: async (params) => {
  try {
    const url = `/notificator/${params.sellerId}/changenotification/${params.skuId}/inventory`;
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
      name: "marketplace_getofferslist",
      description: "Get matched offers list\nGET /offer-manager/pvt/offers",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sort: z.string().optional().describe("Criteria used to sort the list of offers. For sorting values in ascending order, use `asc`, while for descending order, use `desc`. To fill in the field, insert the sorting criteria, followed by 'asc', or 'desc', separated by a comma. You can sort by the following criteria: \n\n- **price:** sorts offers by price. *Ascending* goes from lowest to highest price, while *Descending* goes from highest to lowest price. \n\n- **name:** sorts offers by *productName*, in alphabetical order. *Ascending* goes from *A* to *Z*, while *Descending* goes from *Z* to *A*. \n\n- **availability:** availability in the sales channel (sc). The default value is 1. \n\nEx. sort=availability,desc \n\nEx. sort=name,asc \n\nEx. price,desc"),
  rows: z.number().int().optional().describe("Number of rows included in the response. Each row corresponds to a single offer. The default amount of rows in the response is 1, and the maximum amount is 50. To have more than one offer listed in the response, please add the `rows` parameter with a number greater than 1."),
  start: z.number().int().default(0).describe("Number corresponding to the row from which the offer list will begin, used for pagination. Filters the list of offers by retrieving the offers starting from the row defined. The default value is 0, if the param is not included in the call."),
  fq: z.string().optional().describe("This filter query can be used to filter offers by the criteria described below. It should be filled in by following the format: `fq={{criteriaName}}:{{criteriaValue}}`. \n\n- **productId:** integer of the product ID \n\n- **productName:** string of the product's name \n\n- **skuId:** integer of the SKU ID \n\n- **eanId:** string of the EAN ID \n\n- **refId:** string of the Ref ID \n\n- **categoryId:** integer of the category ID \n\n- **brandId:** integer of the brand ID \n\n- **sellerId:** string of the seller ID \n\n- **sc:** integer of the sales channel's ID (trade policy in VTEX) \n\nEx: skuId:172 \n\nEx: categoryId:13 \n\nEx. productName:Product example-123")
}),
      handler: async (params) => {
  try {
    const url = "/offer-manager/pvt/offers";
    const queryParams: Record<string, unknown> = {};
    if (params.sort !== undefined) queryParams["sort"] = params.sort;
    if (params.rows !== undefined) queryParams["rows"] = params.rows;
    if (params.start !== undefined) queryParams["start"] = params.start;
    if (params.fq !== undefined) queryParams["fq"] = params.fq;
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
      name: "marketplace_get_sk_uoffers",
      description: "Get matched offers' data by SKU ID\nGET /offer-manager/pvt/product/{productId}/sku/{skuId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  productId: z.string().describe("A string that identifies the seller's product. This is the ID that the marketplace will use for all references to this product, such as price and inventory notifications."),
  skuId: z.string().describe("A string that identifies the seller's SKU that suffered the change. This is the ID that the marketplace will use for all  references to this SKU, such as price and inventory notifications.")
}),
      handler: async (params) => {
  try {
    const url = `/offer-manager/pvt/product/${params.productId}/sku/${params.skuId}`;
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
      name: "marketplace_get_productoffers",
      description: "Get matched offers' data by product ID\nGET /offer-manager/pvt/product/{productId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  productId: z.string().describe("A string that identifies the seller's product. This is the ID that the marketplace will use for all references to this product, such as price and inventory notifications.")
}),
      handler: async (params) => {
  try {
    const url = `/offer-manager/pvt/product/${params.productId}`;
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
      name: "marketplace_create_seller_lead",
      description: "Invite seller lead\nPOST /seller-register/pvt/seller-leads",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  body: z.object({ sellerEmail: z.string(), sellerName: z.string(), sellerAccountName: z.string(), salesChannel: z.string(), email: z.string(), sellerType: z.number().int(), accountId: z.string(), document: z.string(), hasAcceptedLegalTerms: z.boolean(), address: z.object({ postalcode: z.string(), complement: z.string(), street: z.string(), number: z.string(), neighborhood: z.string(), state: z.string(), city: z.string() }), accountable: z.object({ name: z.string(), email: z.string(), phone: z.string() }) })
}),
      handler: async (params) => {
  try {
    const url = "/seller-register/pvt/seller-leads";
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
      name: "marketplace_list_seller_leads",
      description: "List seller leads\nGET /seller-register/pvt/seller-leads",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  offset: z.number().int().default(0).describe("This field determines the limit used to retrieve the list of sellers. The response includes objects starting `from` the value inputted here."),
  limit: z.number().int().default(15).describe("This field determines the limit used to retrieve the list of sellers. The response includes objects until the value inputted here.            "),
  isConnected: z.string().default("").describe("Query param that enables results to be filter by whether the seller lead is already connected to the marketplace or not."),
  search: z.string().default("user email").describe("Custom search field, that filters sellers invited by specific marketplace operator's  email."),
  status: z.string().default("invited").describe("Seller Lead's status. Includes `accepted`, `connected` or `invited`."),
  orderBy: z.string().describe("Query param determining how data will be ordered in the response, ordering by name or ID in descending our ascending order. Includes the following values: \n\n`namesort` = desc/asc \n\n`idsort` = desc/asc")
}),
      handler: async (params) => {
  try {
    const url = "/seller-register/pvt/seller-leads";
    const queryParams: Record<string, unknown> = {};
    if (params.offset !== undefined) queryParams["offset"] = params.offset;
    if (params.limit !== undefined) queryParams["limit"] = params.limit;
    if (params.isConnected !== undefined) queryParams["isConnected"] = params.isConnected;
    if (params.search !== undefined) queryParams["search"] = params.search;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.orderBy !== undefined) queryParams["orderBy"] = params.orderBy;
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
      name: "marketplace_accept_seller_lead",
      description: "Accept seller lead\nPUT /seller-register/pvt/seller-leads/{sellerLeadId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  body: z.object({ sellerEmail: z.string(), sellerName: z.string(), sellerAccountName: z.string(), salesChannel: z.string(), email: z.string(), sellerType: z.number().int(), accountId: z.string(), document: z.string(), hasAcceptedLegalTerms: z.boolean(), address: z.object({ postalcode: z.string(), complement: z.string(), street: z.string(), number: z.string(), neighborhood: z.string(), state: z.string(), city: z.string() }), accountable: z.object({ name: z.string(), email: z.string(), phone: z.string() }) })
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/seller-leads/${params.sellerLeadId}`;
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
      name: "marketplace_retrieve_seller_lead",
      description: "Get seller lead's data by ID\nGET /seller-register/pvt/seller-leads/{sellerLeadId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built.")
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/seller-leads/${params.sellerLeadId}`;
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
      name: "marketplace_remove_seller_lead",
      description: "Delete seller lead\nDELETE /seller-register/pvt/seller-leads/{sellerLeadId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerLeadId: z.string().describe("ID of the Seller Lead invited to the marketplace.")
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/seller-leads/${params.sellerLeadId}`;
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
      name: "marketplace_create_seller_from_seller_lead",
      description: "Create seller from lead\nPUT /seller-register/pvt/seller-leads/{sellerLeadId}/seller",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  isActive: z.boolean().default(false).describe("Enables to filter sellers that are active (`true`) or unactive (`false`) in the marketplace.")
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/seller-leads/${params.sellerLeadId}/seller`;
    const queryParams: Record<string, unknown> = {};
    if (params.isActive !== undefined) queryParams["isActive"] = params.isActive;
    const response = await http.put(url, { params: queryParams });
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
      name: "marketplace_resend_seller_lead_request",
      description: "Resend seller lead invite\nPUT /seller-register/pvt/seller-leads/{sellerLeadId}/status",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  body: z.object({ status: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/seller-leads/${params.sellerLeadId}/status`;
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
      name: "marketplace_list_seller_commissions",
      description: "List seller commissions by seller ID\nGET /seller-register/pvt/sellers/{sellerId}/commissions",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built.")
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/sellers/${params.sellerId}/commissions`;
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
      name: "marketplace_bulk_upsert_seller_commissions",
      description: "Upsert seller commissions in bulk\nPUT /seller-register/pvt/sellers/{sellerId}/commissions",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  body: z.array(z.object({ categoryId: z.string(), categoryFullPath: z.string(), productCommissionPercentage: z.number(), freightCommissionPercentage: z.number() }))
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/sellers/${params.sellerId}/commissions`;
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
      name: "marketplace_remove_seller_commissions",
      description: "Remove seller commissions by category ID\nDELETE /seller-register/pvt/sellers/{sellerId}/commissions/{categoryId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  categoryId: z.string().default("6").describe("ID of the category in which the comission was applied")
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/sellers/${params.sellerId}/commissions/${params.categoryId}`;
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
      name: "marketplace_retrieve_seller_commissions",
      description: "Get seller commissions by category ID\nGET /seller-register/pvt/sellers/{sellerId}/commissions/{categoryId}",
      inputSchema: z.object({
  accountName: z.string().default("apiexamples").describe("Name of the VTEX account that belongs to the marketplace. All data extracted, and changes added will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().default("seller123").describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace."),
  categoryId: z.string().default("6").describe("ID of the category in which the comission was applied")
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/sellers/${params.sellerId}/commissions/${params.categoryId}`;
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
      name: "marketplace_upsert_seller_request",
      description: "Configure seller account\nPOST /seller-register/pvt/sellers",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  body: z.object({ id: z.string(), name: z.string(), isActive: z.boolean(), fulfillmentEndpoint: z.string(), allowHybridPayments: z.boolean(), taxCode: z.string(), email: z.string(), description: z.string(), sellerCommissionConfiguration: z.object({}), isBetterScope: z.boolean(), sellerType: z.number().int(), availableSalesChannels: z.array(z.object({ isSelected: z.boolean(), id: z.number().int(), name: z.string() })), CSCIdentification: z.string(), account: z.string(), channel: z.string(), salesChannel: z.string(), isVtex: z.boolean(), exchangeReturnPolicy: z.string(), deliveryPolicy: z.string(), securityPrivacyPolicy: z.string(), fulfillmentSellerId: z.string(), groups: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), user: z.string(), password: z.string(), catalogSystemEndpoint: z.string(), trustPolicy: z.string(), score: z.number() })
}),
      handler: async (params) => {
  try {
    const url = "/seller-register/pvt/sellers";
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
      name: "marketplace_get_list_sellers",
      description: "List sellers\nGET /seller-register/pvt/sellers",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  from: z.number().default(0).describe("The start number of pagination, being `0` the default value."),
  to: z.number().default(100).describe("The end number of pagination, being `100` the default value."),
  keyword: z.string().default("keyword").describe("Search sellers by a keyword in `sellerId` or `sellerName`."),
  integration: z.string().default("vtex-seller").describe("Filters sellers by the name of who made the integration, if VTEX or an external hub. The possible values for VTEX integrations are: `vtex-sellerportal`, `vtex-seller` and `vtex-franchise`."),
  "group ": z.string().default("Group").describe("Groups are defined by keywords that group sellers into categories defined by the marketplace."),
  isActive: z.boolean().default(false).describe("Enables to filter sellers that are active (`true`) or unactive (`false`) in the marketplace."),
  isBetterScope: z.boolean().default(false).describe("The flag `isBetterScope` is used by the VTEX Checkout to simulate shopping carts, products, and shipping only in sellers with the field set as `true`, avoiding performance issues. When used as a query param, `isBetterScope` filters sellers that have the flag set as `true` or `false`."),
  isVtex: z.boolean().default(false).describe("When set as `true`, the list returned will be of sellers who have a VTEX store configured. When set as `false`, the list will be of sellers who do not have a VTEX store configured."),
  sc: z.string().default("1").describe("Sales channel (or [trade policy](https://help.vtex.com/en/tutorial/how-trade-policies-work--6Xef8PZiFm40kg2STrMkMV)) associated to the seller account created."),
  sellerType: z.number().int().default(1).describe("Filters sellers by their type, which can be regular seller (`1`) or whitelabel seller (`2`)."),
  sort: z.string().optional().describe("Criteria used to sort the list of offers. For sorting values in ascending order, use `asc`, while for descending order, use `desc`. To fill in the field, insert the sorting criteria, followed by 'asc', or 'desc', separated by a comma. You can sort by the following criteria: \n\n- **price:** sorts offers by price. *Ascending* goes from lowest to highest price, while *Descending* goes from highest to lowest price. \n\n- **name:** sorts offers by *productName*, in alphabetical order. *Ascending* goes from *A* to *Z*, while *Descending* goes from *Z* to *A*. \n\n- **availability:** availability in the sales channel (sc). The default value is 1. \n\nEx. sort=availability,desc \n\nEx. sort=name,asc \n\nEx. price,desc")
}),
      handler: async (params) => {
  try {
    const url = "/seller-register/pvt/sellers";
    const queryParams: Record<string, unknown> = {};
    if (params.from !== undefined) queryParams["from"] = params.from;
    if (params.to !== undefined) queryParams["to"] = params.to;
    if (params.keyword !== undefined) queryParams["keyword"] = params.keyword;
    if (params.integration !== undefined) queryParams["integration"] = params.integration;
    if (params["group "] !== undefined) queryParams["group "] = params["group "];
    if (params.isActive !== undefined) queryParams["isActive"] = params.isActive;
    if (params.isBetterScope !== undefined) queryParams["isBetterScope"] = params.isBetterScope;
    if (params.isVtex !== undefined) queryParams["isVtex"] = params.isVtex;
    if (params.sc !== undefined) queryParams["sc"] = params.sc;
    if (params.sellerType !== undefined) queryParams["sellerType"] = params.sellerType;
    if (params.sort !== undefined) queryParams["sort"] = params.sort;
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
      name: "marketplace_update_seller",
      description: "Update seller by seller ID\nPATCH /seller-register/pvt/sellers/{sellerId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  body: z.array(z.object({ operation: z.string(), path: z.string(), value: z.boolean() })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/sellers/${params.sellerId}`;
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
      name: "marketplace_get_retrieve_seller",
      description: "Get seller data by ID\nGET /seller-register/pvt/sellers/{sellerId}",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  sc: z.string().default("1").describe("Sales channel (or [trade policy](https://help.vtex.com/en/tutorial/how-trade-policies-work--6Xef8PZiFm40kg2STrMkMV)) associated to the seller account created.")
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/sellers/${params.sellerId}`;
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
      name: "marketplace_upsert_mapping",
      description: "Upsert sales channel mapping\nPUT /seller-register/pvt/sellers/{sellerId}/sales-channel/mapping",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  an: z.string().default("apiexamples").describe("Marketplace's account name, the same one inputted on the endpoint's path."),
  body: z.array(z.object({ marketplaceSalesChannel: z.number().int(), sellerChannel: z.string() }))
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/sellers/${params.sellerId}/sales-channel/mapping`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
    const response = await http.put(url, params.body, { params: queryParams });
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
      name: "marketplace_retrieve_mapping",
      description: "Get sales channel mapping data\nGET /seller-register/pvt/sellers/{sellerId}/sales-channel/mapping",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  sellerId: z.string().describe("A string that identifies the seller in the marketplace. This ID must be created by the marketplace and informed to the seller before the integration is built."),
  an: z.string().default("apiexamples").describe("Marketplace's account name, the same one inputted on the endpoint's path.")
}),
      handler: async (params) => {
  try {
    const url = `/seller-register/pvt/sellers/${params.sellerId}/sales-channel/mapping`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
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
      name: "marketplace_get_fulfillment_pvt_affiliates",
      description: "List affiliates\nGET /fulfillment/pvt/affiliates",
      inputSchema: z.object({
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL.")
}),
      handler: async (params) => {
  try {
    const url = "/fulfillment/pvt/affiliates";
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
      name: "marketplace_get_fulfillment_pvt_affiliates_by_affiliate_id",
      description: "Get affiliate by ID\nGET /fulfillment/pvt/affiliates/{affiliateId}",
      inputSchema: z.object({
  affiliateId: z.string().min(3).max(3).describe("Three-letter identifier defined during the affiliate configuration creation. Vowels are not allowed."),
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL.")
}),
      handler: async (params) => {
  try {
    const url = `/fulfillment/pvt/affiliates/${params.affiliateId}`;
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
      name: "marketplace_put_fulfillment_pvt_affiliates_by_affiliate_id",
      description: "Update affiliate by ID\nPUT /fulfillment/pvt/affiliates/{affiliateId}",
      inputSchema: z.object({
  affiliateId: z.string().min(3).max(3).describe("Three-letter identifier defined during the affiliate configuration creation."),
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL."),
  body: z.object({ followUpEmail: z.string().optional(), useSellerPaymentMethod: z.boolean().optional(), name: z.string().optional(), salesChannel: z.string().optional(), searchURIEndpoint: z.string().optional(), searchURIEndpointVersion: z.string().default("1.x.x.").optional(), searchURIEndpointAvailableVersions: z.array(z.string().default("1.x.x.")).optional(), minimumValueAccumulated: z.number().int().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/fulfillment/pvt/affiliates/${params.affiliateId}`;
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
      name: "marketplace_delete_fulfillment_pvt_affiliates_by_affiliate_id",
      description: "Delete affiliate by ID\nDELETE /fulfillment/pvt/affiliates/{affiliateId}",
      inputSchema: z.object({
  affiliateId: z.string().min(3).max(3).describe("Three-letter identifier defined during the affiliate configuration creation."),
  accountName: z.string().describe("Name of the VTEX account that belongs to the marketplace. The notification will be posted into this account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to use. Used as part of the URL.")
}),
      handler: async (params) => {
  try {
    const url = `/fulfillment/pvt/affiliates/${params.affiliateId}`;
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
    }
  ];
}
