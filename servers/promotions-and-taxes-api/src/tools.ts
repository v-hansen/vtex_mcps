import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "promotions-and-taxes_create_multiple_coupons",
      description: "Create multiple coupons\nPOST /api/rnb/pvt/multiple-coupons",
      inputSchema: z.object({
  body: z.array(z.object({ quantity: z.number().int(), couponConfiguration: z.object({ utmSource: z.string(), utmCampaign: z.string(), couponCode: z.string(), isArchived: z.boolean().optional(), maxItemsPerClient: z.number().int(), expirationIntervalPerUse: z.string(), maxUsage: z.number().int().optional() }) })).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/multiple-coupons";
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
      name: "promotions-and-taxes_create_or_update_coupon",
      description: "Create or update coupon\nPOST /api/rnb/pvt/coupon",
      inputSchema: z.object({
  body: z.object({ utmSource: z.string(), utmCampaign: z.string().optional(), couponCode: z.string(), isArchived: z.boolean().optional(), maxItemsPerClient: z.number().int(), expirationIntervalPerUse: z.string(), maxUsage: z.number().int().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/coupon";
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
      name: "promotions-and-taxes_getall",
      description: "Get all coupons\nGET /api/rnb/pvt/coupon",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/coupon";
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
      name: "promotions-and-taxes_getbycouponcode",
      description: "Get coupon by coupon code\nGET /api/rnb/pvt/coupon/{couponCode}",
      inputSchema: z.object({
  couponCode: z.string().describe("Coupon Code")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/coupon/${params.couponCode}`;
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
      name: "promotions-and-taxes_getarchivedbycouponcode",
      description: "Get archived coupon by coupon code\nGET /api/rnb/pvt/archive/coupon/{couponCode}",
      inputSchema: z.object({
  couponCode: z.string().describe("Coupon Code")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/archive/coupon/${params.couponCode}`;
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
      name: "promotions-and-taxes_archivebycouponcode",
      description: "Archive coupon by coupon code\nPOST /api/rnb/pvt/archive/coupon/{couponCode}",
      inputSchema: z.object({
  couponCode: z.string().describe("Coupon Code")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/archive/coupon/${params.couponCode}`;
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
      name: "promotions-and-taxes_massive_generation",
      description: "Generate coupons in bulk\nPOST /api/rnb/pvt/coupons",
      inputSchema: z.object({
  quantity: z.number().int().describe("Number of coupons to create, which can be from `1` to `1000`. For a single coupon (`1`), the code will be the `couponCode` value. For multiple coupons (more than `1`), codes will be the `couponCode` value with a random suffix."),
  body: z.object({ utmSource: z.string(), utmCampaign: z.string(), couponCode: z.string(), maxItemsPerClient: z.number().int(), expirationIntervalPerUse: z.string() })
}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/coupons";
    const queryParams: Record<string, unknown> = {};
    if (params.quantity !== undefined) queryParams["quantity"] = params.quantity;
    const response = await http.post(url, params.body, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "promotions-and-taxes_getusage",
      description: "Get coupon usage\nGET /api/rnb/pvt/coupon/usage/{couponCode}",
      inputSchema: z.object({
  couponCode: z.string().describe("Coupon Code")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/coupon/usage/${params.couponCode}`;
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
      name: "promotions-and-taxes_unarchivebycouponcode",
      description: "Unarchive coupon by coupon code\nPOST /api/rnb/pvt/unarchive/coupon/{couponCode}",
      inputSchema: z.object({
  couponCode: z.string().describe("Coupon Code")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/unarchive/coupon/${params.couponCode}`;
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
      name: "promotions-and-taxes_get_all_benefits",
      description: "Get all promotions\nGET /api/rnb/pvt/benefits/calculatorconfiguration",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/benefits/calculatorconfiguration";
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
      name: "promotions-and-taxes_search_promotion",
      description: "Search promotion by name\nGET /api/rnb/pvt/benefits/calculatorconfiguration/search",
      inputSchema: z.object({
  byName: z.string().describe("Search term used to find a promotion by name.")
}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/benefits/calculatorconfiguration/search";
    const queryParams: Record<string, unknown> = {};
    if (params.byName !== undefined) queryParams["byName"] = params.byName;
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
      name: "promotions-and-taxes_get_all_taxes",
      description: "Get all taxes\nGET /api/rnb/pvt/taxes/calculatorconfiguration",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/taxes/calculatorconfiguration";
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
      name: "promotions-and-taxes_get_calculator_configuration_by_id",
      description: "Get promotion or tax by ID\nGET /api/rnb/pvt/calculatorconfiguration/{idCalculatorConfiguration}",
      inputSchema: z.object({
  idCalculatorConfiguration: z.string().describe("Promotion ID or tax ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/calculatorconfiguration/${params.idCalculatorConfiguration}`;
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
      name: "promotions-and-taxes_opt_seller_in_or_out_of_promotion",
      description: "Seller opt-in or opt-out\nPOST /api/rnb/pvt/calculatorconfiguration/{promotionId}/seller-opt",
      inputSchema: z.object({
  promotionId: z.string().describe("The ID of the promotion."),
  an: z.string().describe("The VTEX account name that owns the promotion."),
  body: z.object({ sellerIds: z.array(z.string()), operation: z.enum(["OptIn", "OptOut"]) })
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/calculatorconfiguration/${params.promotionId}/seller-opt`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
    const response = await http.post(url, params.body, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 401:
        throw new Error("Unauthorized");
      case 404:
        throw new Error("Not Found");
      case 412:
        throw new Error("Precondition Failed");
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
      name: "promotions-and-taxes_create_or_update_calculator_configuration",
      description: "Create or update promotion or tax\nPOST /api/rnb/pvt/calculatorconfiguration",
      inputSchema: z.object({
  body: z.object({ idCalculatorConfiguration: z.string().optional(), name: z.string().optional(), description: z.string().optional(), beginDateUtc: z.string(), endDateUtc: z.string().optional(), lastModified: z.string().optional(), daysAgoOfPurchases: z.number().int().optional(), isActive: z.boolean(), isArchived: z.boolean().optional(), isFeatured: z.boolean().optional(), disableDeal: z.boolean().optional(), activeDaysOfWeek: z.array(z.string()).optional(), offset: z.number().int().optional(), activateGiftsMultiplier: z.boolean().optional(), newOffset: z.number().optional(), maxPricesPerItems: z.array(z.string()).optional(), cumulative: z.boolean().optional(), discountType: z.string().optional(), nominalShippingDiscountValue: z.number().optional(), absoluteShippingDiscountValue: z.number().optional(), nominalDiscountValue: z.number().optional(), nominalDiscountType: z.string().optional(), maximumUnitPriceDiscount: z.number().optional(), percentualDiscountValue: z.number().optional(), rebatePercentualDiscountValue: z.number().optional(), percentualShippingDiscountValue: z.number(), percentualTax: z.number().optional(), shippingPercentualTax: z.number().optional(), percentualDiscountValueList1: z.number().optional(), percentualDiscountValueList2: z.number().optional(), skusGift: z.object({ quantitySelectable: z.number().int().optional(), gifts: z.array(z.string()).optional() }).optional(), nominalRewardValue: z.number().optional(), percentualRewardValue: z.number().optional(), orderStatusRewardValue: z.string().optional(), maxNumberOfAffectedItems: z.number().int().optional(), maxNumberOfAffectedItemsGroupKey: z.enum(["perProductId", "perCart", "perSku"]).optional(), applyToAllShippings: z.boolean().optional(), nominalTax: z.number().optional(), origin: z.string(), idSeller: z.string().optional(), idSellerIsInclusive: z.boolean().optional(), idsSalesChannel: z.array(z.string()).optional(), areSalesChannelIdsExclusive: z.boolean().optional(), marketingTags: z.array(z.string()).optional(), marketingTagsAreNotInclusive: z.boolean().optional(), paymentsMethods: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), stores: z.array(z.string()).optional(), campaigns: z.array(z.string()).optional(), conditionsIds: z.array(z.string()).optional(), storesAreInclusive: z.boolean().optional(), categories: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), categoriesAreInclusive: z.boolean().optional(), brands: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), brandsAreInclusive: z.boolean().optional(), products: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), productsAreInclusive: z.boolean().optional(), skus: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), skusAreInclusive: z.boolean().optional(), utmSource: z.string().optional(), utmCampaign: z.string().optional(), collections1BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), collections2BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), minimumQuantityBuyTogether: z.number().int().optional(), quantityToAffectBuyTogether: z.number().int().optional(), enableBuyTogetherPerSku: z.boolean().optional(), listSku1BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), listSku2BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), coupon: z.array(z.string()).optional(), totalValueFloor: z.number().optional(), totalValueCeling: z.number().optional(), totalValueIncludeAllItems: z.boolean().optional(), totalValueMode: z.string().optional(), collections: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), collectionsIsInclusive: z.boolean().optional(), restrictionsBins: z.array(z.string()).optional(), cardIssuers: z.array(z.string()).optional(), totalValuePurchase: z.number().optional(), slasIds: z.array(z.string()).optional(), isSlaSelected: z.boolean().optional(), isFirstBuy: z.boolean().optional(), firstBuyIsProfileOptimistic: z.boolean().optional(), compareListPriceAndPrice: z.boolean().optional(), isDifferentListPriceAndPrice: z.boolean().optional(), zipCodeRanges: z.array(z.object({ zipCodeFrom: z.string().optional(), zipCodeTo: z.string().optional(), inclusive: z.boolean().optional() })).optional(), itemMaxPrice: z.number().optional(), itemMinPrice: z.number().optional(), installment: z.number().int().optional(), isMinMaxInstallments: z.boolean().optional(), minInstallment: z.number().int().optional(), maxInstallment: z.number().int().optional(), merchants: z.array(z.string()).optional(), clusterExpressions: z.array(z.string()).optional(), paymentsRules: z.array(z.string()).optional(), giftListTypes: z.array(z.string()).optional(), productsSpecifications: z.array(z.string()).optional(), affiliates: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), maxUsage: z.number().int().optional(), maxUsagePerClient: z.number().int().optional(), shouldDistributeDiscountAmongMatchedItems: z.boolean().optional(), multipleUsePerClient: z.boolean().optional(), accumulateWithManualPrice: z.boolean().optional(), type: z.string(), useNewProgressiveAlgorithm: z.boolean().optional(), percentualDiscountValueList: z.array(z.number()).optional(), optIn: z.object({ sellers: z.array(z.string()).optional() }).optional() })
}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/calculatorconfiguration";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad request.");
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
      name: "promotions-and-taxes_create_multiple_sku_promotion",
      description: "Create multiple SKU promotion\nPOST /api/rnb/pvt/import/calculatorConfiguration",
      inputSchema: z.object({
  body: z.string().optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/import/calculatorConfiguration";
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
      name: "promotions-and-taxes_update_multiple_sku_promotion",
      description: "Update multiple SKU promotion\nPUT /api/rnb/pvt/import/calculatorConfiguration/{promotionId}",
      inputSchema: z.object({
  promotionId: z.string().describe("Promotion unique identifier."),
  body: z.string().optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/import/calculatorConfiguration/${params.promotionId}`;
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
      name: "promotions-and-taxes_archive_promotion",
      description: "Archive promotion or tax\nPOST /api/rnb/pvt/archive/calculatorConfiguration/{idCalculatorConfiguration}",
      inputSchema: z.object({
  idCalculatorConfiguration: z.string().describe("Promotion ID or tax ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/archive/calculatorConfiguration/${params.idCalculatorConfiguration}`;
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
      name: "promotions-and-taxes_unarchive_promotion",
      description: "Unarchive promotion or tax\nPOST /api/rnb/pvt/unarchive/calculatorConfiguration/{idCalculatorConfiguration}",
      inputSchema: z.object({
  idCalculatorConfiguration: z.string().describe("Promotion ID or tax ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/unarchive/calculatorConfiguration/${params.idCalculatorConfiguration}`;
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
      name: "promotions-and-taxes_get_archived_promotions",
      description: "List archived promotions\nGET /api/rnb/pvt/archive/benefits/calculatorConfiguration",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/archive/benefits/calculatorConfiguration";
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
      name: "promotions-and-taxes_get_archived_taxes",
      description: "List archived taxes\nGET /api/rnb/pvt/archive/taxes/calculatorConfiguration",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/archive/taxes/calculatorConfiguration";
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
      name: "promotions-and-taxes_pricebysku_id",
      description: "Get price by SKU ID\nGET /price-sheet/{skuId}",
      inputSchema: z.object({
  skuId: z.string().describe("SKU ID."),
  an: z.string().describe("VTEX account name.")
}),
      handler: async (params) => {
  try {
    const url = `/price-sheet/${params.skuId}`;
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
      name: "promotions-and-taxes_deletebysku_id",
      description: "Delete price by SKU ID\nDELETE /price-sheet/{skuId}",
      inputSchema: z.object({
  skuId: z.string().describe("SKU ID."),
  an: z.string().describe("VTEX account name.")
}),
      handler: async (params) => {
  try {
    const url = `/price-sheet/${params.skuId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
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
      name: "promotions-and-taxes_getallpaged",
      description: "Get all paged prices\nGET /price-sheet/all/{page}/{pageSize}",
      inputSchema: z.object({
  page: z.string().describe("Page number for pagination."),
  pageSize: z.string().describe("Size of each page for pagination."),
  an: z.string().describe("VTEX account name.")
}),
      handler: async (params) => {
  try {
    const url = `/price-sheet/all/${params.page}/${params.pageSize}`;
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
      name: "promotions-and-taxes_pricebycontext",
      description: "Get price by context\nPOST /price-sheet/context",
      inputSchema: z.object({
  an: z.string().describe("VTEX account name."),
  body: z.object({ id: z.number().int(), itemId: z.number().int(), salesChannel: z.number().int(), sellerId: z.string(), validFrom: z.string(), validTo: z.string() })
}),
      handler: async (params) => {
  try {
    const url = "/price-sheet/context";
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
    const response = await http.post(url, params.body, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "promotions-and-taxes_pricebysku_idandtrade_policy",
      description: "Get price by SKU ID and trade policy\nGET /price-sheet/{skuId}/{tradePolicy}",
      inputSchema: z.object({
  skuId: z.string().describe("SKU ID."),
  tradePolicy: z.string().describe("Trade policy name."),
  an: z.string().describe("Account name.")
}),
      handler: async (params) => {
  try {
    const url = `/price-sheet/${params.skuId}/${params.tradePolicy}`;
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
      name: "promotions-and-taxes_saveprice",
      description: "Save price\nPOST /price-sheet",
      inputSchema: z.object({
  an: z.string().describe("VTEX account name."),
  body: z.array(z.object({ itemId: z.number().int(), salesChannel: z.number().int(), sellerId: z.number().int(), price: z.number().int(), listPrice: z.number().int(), validFrom: z.string(), validTo: z.string() }))
}),
      handler: async (params) => {
  try {
    const url = "/price-sheet";
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
    const response = await http.post(url, params.body, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    const message = error.response?.data?.message ?? error.message ?? "Unknown error";
    const status = error.response?.status ?? 500;
    return {
      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],
      isError: true,
    };
  }
},
    },
    {
      name: "promotions-and-taxes_calculatediscountsandtaxes(bundles)",
      description: "Calculate discounts and taxes bundles\nPOST /pub/bundles",
      inputSchema: z.object({
  body: z.object({ isShoppingCart: z.boolean(), origin: z.string(), salesChannel: z.string(), profileId: z.string(), items: z.array(z.object({ index: z.number().int(), id: z.string(), quantity: z.number().int(), isGift: z.boolean(), measurementUnit: z.string(), unitMultiplier: z.number().int(), priceTags: z.array(z.string()), params: z.array(z.object({ name: z.string(), value: z.string() })), priceSheet: z.array(z.string()), logisticsInfos: z.array(z.string()), sellerId: z.string(), productSpecifications: z.array(z.string()) })) })
}),
      handler: async (params) => {
  try {
    const url = "/pub/bundles";
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
      name: "promotions-and-taxes_getcampaignconfiguration",
      description: "Get campaign audience configuration\nGET /api/rnb/pvt/campaignConfiguration/{campaignId}",
      inputSchema: z.object({
  campaignId: z.string().describe("Campaign audience unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rnb/pvt/campaignConfiguration/${params.campaignId}`;
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
      name: "promotions-and-taxes_getcampaignaudiences",
      description: "Get all campaign audiences\nGET /api/rnb/pvt/campaignConfiguration",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/campaignConfiguration";
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
      name: "promotions-and-taxes_setcampaignconfiguration",
      description: "Create campaign audience\nPOST /api/rnb/pvt/campaignConfiguration",
      inputSchema: z.object({
  body: z.object({ beginDateUtc: z.string().optional(), endDateUtc: z.string().optional(), id: z.string().optional(), name: z.string().optional(), isActive: z.boolean().optional(), isAndOperator: z.boolean().optional(), isArchived: z.boolean().optional(), lastModified: z.object({ dateUtc: z.string().optional(), user: z.string().optional() }).optional(), targetConfigurations: z.array(z.object({ featured: z.boolean().optional(), id: z.string().optional(), name: z.string().optional(), daysAgoOfPurchases: z.number().int().optional(), origin: z.string().optional(), idSellerIsInclusive: z.boolean().optional(), idsSalesChannel: z.array(z.string()).optional(), areSalesChannelIdsExclusive: z.boolean().optional(), marketingTags: z.array(z.string()).optional(), marketingTagsAreNotInclusive: z.boolean().optional(), paymentsMethods: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), stores: z.array(z.string()).optional(), campaigns: z.array(z.string()).optional(), storesAreInclusive: z.boolean().optional(), categories: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), categoriesAreInclusive: z.boolean().optional(), brands: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), brandsAreInclusive: z.boolean().optional(), products: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), productsAreInclusive: z.boolean().optional(), skus: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), skusAreInclusive: z.boolean().optional(), collections1BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), collections2BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), minimumQuantityBuyTogether: z.number().int().optional(), quantityToAffectBuyTogether: z.number().int().optional(), enableBuyTogetherPerSku: z.boolean().optional(), listSku1BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), listSku2BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), listBrand1BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), listCategory1BuyTogether: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), coupon: z.array(z.string()).optional(), totalValueFloor: z.number().optional(), totalValueCeling: z.number().optional(), totalValueIncludeAllItems: z.boolean().optional(), totalValueMode: z.string().optional(), collections: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), collectionsIsInclusive: z.boolean().optional(), restrictionsBins: z.array(z.string()).optional(), cardIssuers: z.array(z.string()).optional(), totalValuePurchase: z.number().optional(), slasIds: z.array(z.string()).optional(), isSlaSelected: z.boolean().optional(), isFirstBuy: z.boolean().optional(), firstBuyIsProfileOptimistic: z.boolean().optional(), compareListPriceAndPrice: z.boolean().optional(), isDifferentListPriceAndPrice: z.boolean().optional(), zipCodeRanges: z.array(z.object({ zipCodeFrom: z.string().optional(), zipCodeTo: z.string().optional(), inclusive: z.boolean().optional() })).optional(), itemMaxPrice: z.number().optional(), itemMinPrice: z.number().optional(), installment: z.number().int().optional(), isMinMaxInstallments: z.boolean().optional(), minInstallment: z.number().int().optional(), maxInstallment: z.number().int().optional(), merchants: z.array(z.string()).optional(), clusterExpressions: z.array(z.string()).optional(), clusterOperator: z.string().optional(), paymentsRules: z.array(z.string()).optional(), giftListTypes: z.array(z.string()).optional(), productsSpecifications: z.array(z.string()).optional(), affiliates: z.array(z.object({ id: z.string().optional(), name: z.string().optional() })).optional(), maxUsage: z.number().int().optional(), maxUsagePerClient: z.number().int().optional(), shouldDistributeDiscountAmongMatchedItems: z.boolean().optional(), multipleUsePerClient: z.boolean().optional(), useNewProgressiveAlgorithm: z.boolean().optional(), percentualDiscountValueList: z.array(z.number()).optional(), type: z.enum(["regular", "combo", "forThePriceOf", "progressive", "buyAndWin", "campaign", "tax"]).optional(), idTypeDiscountBuyTogether: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).optional() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = "/api/rnb/pvt/campaignConfiguration";
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
    }
  ];
}
