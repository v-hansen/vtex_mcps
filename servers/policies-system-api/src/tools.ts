import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "policies-system_policy_list",
      description: "Get policy list\nGET /api/policy-engine/policies",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/policy-engine/policies";
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
      name: "policies-system_policy_evaluate",
      description: "Evaluate policies\nPOST /api/policy-engine/evaluate",
      inputSchema: z.object({
  body: z.object({ resource: z.string(), context: z.object({}) })
}),
      handler: async (params) => {
  try {
    const url = "/api/policy-engine/evaluate";
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
      name: "policies-system_policy_get",
      description: "Get policy by ID\nGET /api/policy-engine/policies/{id}",
      inputSchema: z.object({
  id: z.string().describe("Policy ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/policy-engine/policies/${params.id}`;
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
      name: "policies-system_policy_create_or_update",
      description: "Create policy\nPOST /api/policy-engine/policies/{id}",
      inputSchema: z.object({
  id: z.string().describe("Policy ID."),
  body: z.object({ name: z.string(), description: z.string(), status: z.string().optional(), statements: z.array(z.object({ effect: z.string(), actions: z.array(z.object({ id: z.enum(["SendSlackMessage", "SendEmail", "DeactivatePromotions"]).optional(), metadata: z.object({}).optional() })).optional(), resource: z.string().optional(), condition: z.object({ operation: z.enum(["None", "stringEquals", "stringEqualsIgnoreCase", "numericEquals", "numericLessThan", "numericLessThanEquals", "numericGreaterThan", "numericGreaterThanEquals", "bool", "not", "or", "and", "dateTimeUtcGreaterThan", "dateTimeUtcLessThan", "between"]).optional(), conditions: z.array(z.object({ conditions: z.unknown().optional(), operation: z.enum(["None", "stringEquals", "stringEqualsIgnoreCase", "numericEquals", "numericLessThan", "numericLessThanEquals", "numericGreaterThan", "numericGreaterThanEquals", "bool", "not", "or", "and", "dateTimeUtcGreaterThan", "dateTimeUtcLessThan", "between"]).optional(), key: z.enum(["skuId", "brandId", "discountPercentage"]).optional(), values: z.array(z.string()).optional() })).optional() }).optional() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/policy-engine/policies/${params.id}`;
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
      name: "policies-system_policy_update",
      description: "Update policy\nPUT /api/policy-engine/policies/{id}",
      inputSchema: z.object({
  id: z.string().describe("Policy ID."),
  body: z.object({ name: z.string(), description: z.string(), status: z.string().optional(), statements: z.array(z.object({ effect: z.string(), actions: z.array(z.object({ id: z.enum(["SendSlackMessage", "SendEmail", "DeactivatePromotions"]).optional(), metadata: z.object({}).optional() })).optional(), resource: z.string().optional(), condition: z.object({ operation: z.enum(["None", "stringEquals", "stringEqualsIgnoreCase", "numericEquals", "numericLessThan", "numericLessThanEquals", "numericGreaterThan", "numericGreaterThanEquals", "bool", "not", "or", "and", "dateTimeUtcGreaterThan", "dateTimeUtcLessThan", "between"]).optional(), conditions: z.array(z.object({ conditions: z.unknown().optional(), operation: z.enum(["None", "stringEquals", "stringEqualsIgnoreCase", "numericEquals", "numericLessThan", "numericLessThanEquals", "numericGreaterThan", "numericGreaterThanEquals", "bool", "not", "or", "and", "dateTimeUtcGreaterThan", "dateTimeUtcLessThan", "between"]).optional(), key: z.enum(["skuId", "brandId", "discountPercentage"]).optional(), values: z.array(z.string()).optional() })).optional() }).optional() })) })
}),
      handler: async (params) => {
  try {
    const url = `/api/policy-engine/policies/${params.id}`;
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
      name: "policies-system_policy_delete",
      description: "Delete policy by ID\nDELETE /api/policy-engine/policies/{id}",
      inputSchema: z.object({
  id: z.string().describe("Policy ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/policy-engine/policies/${params.id}`;
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
