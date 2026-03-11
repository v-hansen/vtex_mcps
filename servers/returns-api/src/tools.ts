import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "returns_create_return_invoice",
      description: "Create return invoice for order\nPOST /api/oms/pvt/orders/{orderId}/invoice",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID"),
  body: z.object({ type: z.enum(["Output", "Input"]), invoiceNumber: z.string(), invoiceValue: z.number().int(), invoiceKey: z.string().optional(), invoiceUrl: z.string().optional(), issuanceDate: z.string().optional(), items: z.array(z.object({ id: z.string(), quantity: z.number().int(), price: z.number().int() })) })
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/invoice`;
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request - Invalid invoice data");
      case 404:
        throw new Error("Order not found");
      case 409:
        throw new Error("Conflict - Invoice number already exists");
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
      name: "returns_get_order_with_return_info",
      description: "Get order details including return information\nGET /api/oms/pvt/orders/{orderId}",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID")
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Order not found");
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
