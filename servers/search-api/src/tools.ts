import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "search_get_top_searches",
      description: "Get list of the 10 most searched terms\nGET /top_searches",
      inputSchema: z.object({
  locale: z.string().optional().describe("Indicates the target language as a BCP 47 language code. The Intelligent Search must have indexed the account in the target language.")
}),
      handler: async (params) => {
  try {
    const url = "/top_searches";
    const queryParams: Record<string, unknown> = {};
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
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
      name: "search_get_autocomplete_suggestions",
      description: "Get list of suggested terms and attributes similar to the search term\nGET /autocomplete_suggestions",
      inputSchema: z.object({
  query: z.string().optional().describe("Search term. It can contain any character."),
  locale: z.string().optional().describe("Indicates the target language as a BCP 47 language code. The Intelligent Search must have indexed the account in the target language.")
}),
      handler: async (params) => {
  try {
    const url = "/autocomplete_suggestions";
    const queryParams: Record<string, unknown> = {};
    if (params.query !== undefined) queryParams["query"] = params.query;
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
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
      name: "search_get_correction_search",
      description: "Get attempt of correction of a misspelled term\nGET /correction_search",
      inputSchema: z.object({
  query: z.string().optional().describe("Search term. It can contain any character."),
  locale: z.string().optional().describe("Indicates the target language as a BCP 47 language code. The Intelligent Search must have indexed the account in the target language.")
}),
      handler: async (params) => {
  try {
    const url = "/correction_search";
    const queryParams: Record<string, unknown> = {};
    if (params.query !== undefined) queryParams["query"] = params.query;
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
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
      name: "search_get_banners_by_facets",
      description: "Get list of banners registered for query\nGET /banners/{facets}",
      inputSchema: z.object({
  facets: z.string().default("/").describe("## Format\r\n\r\nThe `facets` parameter follows the format: `/${facetKey1}/${facetValue1}/${facetKey2}/${facetValue2}/.../${facetKeyN}/${facetValueN}`.\r\n\r\nThe order in which the terms appear is not relevant to the search.\r\n\r\nYou can also repeat the same `facetKey` several times for different values. For example: `category-1/shoes/color/blue/color/red/color/yellow`.\r\n\r\n## General filters\r\n\r\nThe `facets` parameter also allows the following general filters:\r\n\r\n| `facetKey` | Description | Example |\r\n| - | - | - |\r\n| `price` | Filter the search by a price range, following the format `${minPrice}:${maxPrice}`. | `/color/blue/price/100:500?query=shirt` |\r\n| `category-${n}` | Filter the search by category, where `n` represents the category tree level (1 = department, 2 = category, 3 = subcategory, and so on). | `category-1/clothing/category-2/shirts` |\r\n| `productClusterIds` | Filter the search by collection, following the format `productClusterIds/{collectionId}`. | `productClusterIds/262` |\r\n| `trade-policy` |  Filter the search by trade policy (also known as sales channel), following the format `trade-policy/{tradePolicyId}`. | `trade-policy/2`|\n"),
  query: z.string().optional().describe("Search term. It can contain any character."),
  locale: z.string().optional().describe("Indicates the target language as a BCP 47 language code. The Intelligent Search must have indexed the account in the target language.")
}),
      handler: async (params) => {
  try {
    const url = `/banners/${params.facets}`;
    const queryParams: Record<string, unknown> = {};
    if (params.query !== undefined) queryParams["query"] = params.query;
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
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
      name: "search_get_search_suggestions",
      description: "Get list of suggested terms similar to the search term\nGET /search_suggestions",
      inputSchema: z.object({
  query: z.string().optional().describe("Search term. It can contain any character."),
  locale: z.string().optional().describe("Indicates the target language as a BCP 47 language code. The Intelligent Search must have indexed the account in the target language.")
}),
      handler: async (params) => {
  try {
    const url = "/search_suggestions";
    const queryParams: Record<string, unknown> = {};
    if (params.query !== undefined) queryParams["query"] = params.query;
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
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
      name: "search_get_product_search_by_facets",
      description: "Get list of products for a query\nGET /product_search/{facets}",
      inputSchema: z.object({
  facets: z.string().default("/").describe("## Format\r\n\r\nThe `facets` parameter follows the format: `/${facetKey1}/${facetValue1}/${facetKey2}/${facetValue2}/.../${facetKeyN}/${facetValueN}`.\r\n\r\nThe order in which the terms appear is not relevant to the search.\r\n\r\nYou can also repeat the same `facetKey` several times for different values. For example: `category-1/shoes/color/blue/color/red/color/yellow`.\r\n\r\n## General filters\r\n\r\nThe `facets` parameter also allows the following general filters:\r\n\r\n| `facetKey` | Description | Example |\r\n| - | - | - |\r\n| `price` | Filter the search by a price range, following the format `${minPrice}:${maxPrice}`. | `/color/blue/price/100:500?query=shirt` |\r\n| `category-${n}` | Filter the search by category, where `n` represents the category tree level (1 = department, 2 = category, 3 = subcategory, and so on). | `category-1/clothing/category-2/shirts` |\r\n| `productClusterIds` | Filter the search by collection, following the format `productClusterIds/{collectionId}`. | `productClusterIds/262` |\r\n| `trade-policy` |  Filter the search by trade policy (also known as sales channel), following the format `trade-policy/{tradePolicyId}`. | `trade-policy/2`|\n"),
  query: z.string().optional().describe("Search term. It can contain any character."),
  sponsoredCount: z.string().optional().describe("Amount of sponsored products to be returned. Applicable only to merchants using [VTEX Ad Network](https://help.vtex.com/en/tutorial/vtex-ad-network-beta--2cgqXcBuJmXN2livQvClur)."),
  advertisementPlacement: z.enum(["top_search", "middle_search", "search_shelf", "cart_shelf", "plp_shelf", "autocomplete", "homepage"]).optional().describe("Advertisement placement. Applicable only to merchants using [VTEX Ad Network](https://help.vtex.com/en/tutorial/vtex-ad-network-beta--2cgqXcBuJmXN2livQvClur)."),
  repeatSponsoredProducts: z.boolean().optional().describe("Defines if sponsored products can appear again as organic listings. When set as `true`, it allows the same product to be shown as both sponsored and organic. When set as `false`, it removes duplicates, ensuring a sponsored product does not appear again as organic. Applicable only to merchants using [VTEX Ad Network](https://help.vtex.com/en/tutorial/vtex-ad-network-beta--2cgqXcBuJmXN2livQvClur)."),
  simulationBehavior: z.enum(["default", "skip", "only1P"]).default("default").describe("Defines the simulation behavior.\n\n * `default` - Calls the simulation for every single seller.\n * `skip` - Never calls the simulation.\n * `only1P` - Only calls the simulation for first party sellers."),
  count: z.number().default(24).describe("Number of products per page."),
  page: z.number().default(1).describe("Current search page."),
  showSponsored: z.boolean().default(false).describe("Defines if sponsored products are listed (`true`) or not (`false`). Applicable to stores using [VTEX Ad Network](https://help.vtex.com/en/tutorial/vtex-ad-network-beta--2cgqXcBuJmXN2livQvClur) to offer ad space."),
  sort: z.enum(["price:desc", "price:asc", "orders:desc", "name:desc", "name:asc", "release:desc", "discount:desc"]).optional().describe("Defines the sort type. The possible values are: \r\n- `price:desc`: The results will be sorted by price in descending order, from highest to lowest.\r\n- `price:asc`: The results will be sorted by price in ascending order, from lowest to highest.\r\n- `orders:desc`: The results will be sorted by the amount of orders in the past 90 days, in descending order.\r\n- `name:desc`: The results will be sorted by name in descending alphabetical order.\r\n- `name:asc`: The results will be sorted by name in ascending alphabetical order.\r\n- `release:desc`: The results will be sorted by release date in descending order, from most recent to least recent.\r\n- `discount:desc`: The results will be sorted by discount percentage in descending order, from highest to lowest.\r\n\r\nIf this query parameter is not used, the products will be sorted by relevance."),
  locale: z.string().optional().describe("Indicates the target language as a BCP 47 language code. The Intelligent Search must have indexed the account in the target language."),
  hideUnavailableItems: z.boolean().default(false).describe("Defines whether the result should hide unavailable items (`true`), or not (`false`). When set to `true`, only products with stock are returned; when set to `false`, the API includes unavailable products as well. A product is considered unavailable when `availableQuantity = 0`, while `availableQuantity = 10000` indicates that the product is available. Retailers may choose to show unavailable items for commercial reasons (for example, to signal that they offer those products even if temporarily out-of-stock). The recommended default is `true`.")
}),
      handler: async (params) => {
  try {
    const url = `/product_search/${params.facets}`;
    const queryParams: Record<string, unknown> = {};
    if (params.query !== undefined) queryParams["query"] = params.query;
    if (params.sponsoredCount !== undefined) queryParams["sponsoredCount"] = params.sponsoredCount;
    if (params.advertisementPlacement !== undefined) queryParams["advertisementPlacement"] = params.advertisementPlacement;
    if (params.repeatSponsoredProducts !== undefined) queryParams["repeatSponsoredProducts"] = params.repeatSponsoredProducts;
    if (params.simulationBehavior !== undefined) queryParams["simulationBehavior"] = params.simulationBehavior;
    if (params.count !== undefined) queryParams["count"] = params.count;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.showSponsored !== undefined) queryParams["showSponsored"] = params.showSponsored;
    if (params.sort !== undefined) queryParams["sort"] = params.sort;
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    if (params.hideUnavailableItems !== undefined) queryParams["hideUnavailableItems"] = params.hideUnavailableItems;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request.");
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
      name: "search_get_facets_by_facets",
      description: "Get list of the possible facets for a given query\nGET /facets/{facets}",
      inputSchema: z.object({
  facets: z.string().default("/").describe("## Format\r\n\r\nThe `facets` parameter follows the format: `/${facetKey1}/${facetValue1}/${facetKey2}/${facetValue2}/.../${facetKeyN}/${facetValueN}`.\r\n\r\nThe order in which the terms appear is not relevant to the search.\r\n\r\nYou can also repeat the same `facetKey` several times for different values. For example: `category-1/shoes/color/blue/color/red/color/yellow`.\r\n\r\n## General filters\r\n\r\nThe `facets` parameter also allows the following general filters:\r\n\r\n| `facetKey` | Description | Example |\r\n| - | - | - |\r\n| `price` | Filter the search by a price range, following the format `${minPrice}:${maxPrice}`. | `/color/blue/price/100:500?query=shirt` |\r\n| `category-${n}` | Filter the search by category, where `n` represents the category tree level (1 = department, 2 = category, 3 = subcategory, and so on). | `category-1/clothing/category-2/shirts` |\r\n| `productClusterIds` | Filter the search by collection, following the format `productClusterIds/{collectionId}`. | `productClusterIds/262` |\r\n| `trade-policy` |  Filter the search by trade policy (also known as sales channel), following the format `trade-policy/{tradePolicyId}`. | `trade-policy/2`|\n"),
  query: z.string().optional().describe("Search term. It can contain any character."),
  locale: z.string().optional().describe("Indicates the target language as a BCP 47 language code. The Intelligent Search must have indexed the account in the target language."),
  hideUnavailableItems: z.boolean().default(false).describe("Defines whether the result should hide unavailable items (`true`), or not (`false`). When set to `true`, only products with stock are returned; when set to `false`, the API includes unavailable products as well. A product is considered unavailable when `availableQuantity = 0`, while `availableQuantity = 10000` indicates that the product is available. Retailers may choose to show unavailable items for commercial reasons (for example, to signal that they offer those products even if temporarily out-of-stock). The recommended default is `true`.")
}),
      handler: async (params) => {
  try {
    const url = `/facets/${params.facets}`;
    const queryParams: Record<string, unknown> = {};
    if (params.query !== undefined) queryParams["query"] = params.query;
    if (params.locale !== undefined) queryParams["locale"] = params.locale;
    if (params.hideUnavailableItems !== undefined) queryParams["hideUnavailableItems"] = params.hideUnavailableItems;
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
      name: "search_get_pickup_point_availability_product_cluster_ids_by_product_cluster_ids_trade_policy_by_trade_policy",
      description: "Get pickup point availability for Delivery Promise\nGET /pickup-point-availability/productClusterIds/{productClusterIds}/trade-policy/{tradePolicy}",
      inputSchema: z.object({
  productClusterIds: z.string().describe("Product cluster IDs (collections) separated by commas. These represent the products for which you want to check pickup point availability."),
  tradePolicy: z.string().describe("Trade policy ID (also known as sales channel)."),
  an: z.string().describe("Account name. The name of the VTEX account."),
  coordinates: z.string().optional().describe("Geographic coordinates in the format `latitude,longitude`. Used to calculate distance from pickup points and sort results by proximity. Required when using the country and ZIP code approach."),
  "zip-code": z.string().optional().describe("ZIP code or postal code. Required when using the country and ZIP code approach."),
  country: z.string().optional().describe("Three-letter country code in [ISO 3166 ALPHA-3](https://www.iban.com/country-codes) format. Required when using the country and ZIP code approach."),
  deliveryZonesHash: z.string().optional().describe("Pre-computed hash for delivery zones. Used for faster lookup. Required when using the hashes approach (alternative to country and ZIP code)."),
  pickupsHash: z.string().optional().describe("Pre-computed hash for pickups. Used for faster lookup. Required when using the hashes approach (alternative to country and ZIP code).")
}),
      handler: async (params) => {
  try {
    const url = `/pickup-point-availability/productClusterIds/${params.productClusterIds}/trade-policy/${params.tradePolicy}`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
    if (params.coordinates !== undefined) queryParams["coordinates"] = params.coordinates;
    if (params["zip-code"] !== undefined) queryParams["zip-code"] = params["zip-code"];
    if (params.country !== undefined) queryParams["country"] = params.country;
    if (params.deliveryZonesHash !== undefined) queryParams["deliveryZonesHash"] = params.deliveryZonesHash;
    if (params.pickupsHash !== undefined) queryParams["pickupsHash"] = params.pickupsHash;
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
    }
  ];
}
