import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "tax-service-provider-protocol_get_order_form_configuration",
      description: "Get orderForm configuration\nGET /api/checkout/pvt/configuration/orderForm",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pvt/configuration/orderForm";
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 401:
        throw new Error("Unauthorized");
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
      name: "tax-service-provider-protocol_update_order_form_configuration",
      description: "Update orderForm configuration\nPOST /api/checkout/pvt/configuration/orderForm",
      inputSchema: z.object({
  body: z.object({ taxConfiguration: z.object({ url: z.string().optional(), authorizationHeader: z.string().optional(), appId: z.string().optional(), isMarketplaceResponsibleForTaxes: z.boolean().optional() }).optional() })
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pvt/configuration/orderForm";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 401:
        throw new Error("Unauthorized");
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
