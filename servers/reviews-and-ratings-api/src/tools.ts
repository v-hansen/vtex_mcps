import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "reviews-and-ratings_get_product_rating",
      description: "Get product rating\nGET /reviews-and-ratings/api/rating/{productId}",
      inputSchema: z.object({
  productId: z.string().describe("Product ID.")
}),
      handler: async (params) => {
  try {
    const url = `/reviews-and-ratings/api/rating/${params.productId}`;
    const response = await http.get(url);
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
      name: "reviews-and-ratings_get_reviewby_review_id",
      description: "Get product review by review ID\nGET /reviews-and-ratings/api/review/{reviewId}",
      inputSchema: z.object({
  reviewId: z.string().describe("Review ID.")
}),
      handler: async (params) => {
  try {
    const url = `/reviews-and-ratings/api/review/${params.reviewId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "reviews-and-ratings_delete_review",
      description: "Delete review\nDELETE /reviews-and-ratings/api/review/{reviewId}",
      inputSchema: z.object({
  reviewId: z.string().describe("Review ID.")
}),
      handler: async (params) => {
  try {
    const url = `/reviews-and-ratings/api/review/${params.reviewId}`;
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
      name: "reviews-and-ratings_edit_review",
      description: "Update a review\nPATCH /reviews-and-ratings/api/review/{reviewId}",
      inputSchema: z.object({
  reviewId: z.string().describe("Review ID."),
  body: z.object({ productId: z.string(), rating: z.number(), title: z.string(), text: z.string(), reviewerName: z.string(), shopperId: z.string().optional(), verifiedPurchaser: z.boolean().optional(), locale: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/reviews-and-ratings/api/review/${params.reviewId}`;
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
      name: "reviews-and-ratings_getalistof_reviews",
      description: "Get list of reviews\nGET /reviews-and-ratings/api/reviews",
      inputSchema: z.object({
  search_term: z.string().optional().describe("Returns Reviews that contain the search term in `productId`, `sku`, `shopperId`, or `reviewerName`."),
  from: z.string().optional().describe("Zero base starting record number, `0` is the default value."),
  to: z.string().optional().describe("Zero base ending record number, `3` is the default value."),
  order_by: z.string().optional().describe("Field name to order records. The field name must have the first letter uppercase. Allowed field names: `ProductId`, `ShopperId`, `Approved`, `ReviewDateTime`, `SearchDate`, `Rating`, `Locale`. Optionally add `:asc` or `:desc`."),
  status: z.boolean().optional().describe("Status of the review, approved (`true`) or not (`false`)."),
  product_id: z.string().optional().describe("Filter the reviews by product ID.")
}),
      handler: async (params) => {
  try {
    const url = "/reviews-and-ratings/api/reviews";
    const queryParams: Record<string, unknown> = {};
    if (params.search_term !== undefined) queryParams["search_term"] = params.search_term;
    if (params.from !== undefined) queryParams["from"] = params.from;
    if (params.to !== undefined) queryParams["to"] = params.to;
    if (params.order_by !== undefined) queryParams["order_by"] = params.order_by;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.product_id !== undefined) queryParams["product_id"] = params.product_id;
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
      name: "reviews-and-ratings_save_multiple_reviews",
      description: "Create multiple reviews\nPOST /reviews-and-ratings/api/reviews",
      inputSchema: z.object({
  body: z.array(z.object({ id: z.string().optional(), productId: z.string(), rating: z.number(), title: z.string(), text: z.string(), reviewerName: z.string(), approved: z.boolean() }))
}),
      handler: async (params) => {
  try {
    const url = "/reviews-and-ratings/api/reviews";
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
      name: "reviews-and-ratings_delete_multiple_reviews",
      description: "Delete multiple reviews\nDELETE /reviews-and-ratings/api/reviews",
      inputSchema: z.object({
  body: z.array(z.string()).optional()
}),
      handler: async (params) => {
  try {
    const url = "/reviews-and-ratings/api/reviews";
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
      name: "reviews-and-ratings_save_review",
      description: "Create a review\nPOST /reviews-and-ratings/api/review",
      inputSchema: z.object({
  body: z.object({ productId: z.string(), rating: z.number().int(), title: z.string(), text: z.string(), reviewerName: z.string(), approved: z.boolean() })
}),
      handler: async (params) => {
  try {
    const url = "/reviews-and-ratings/api/review";
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
