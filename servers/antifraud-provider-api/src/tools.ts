import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "antifraud-provider_send_antifraud_pre_analysis_data",
      description: "Send anti-fraud pre-analysis data (optional)\nPOST /pre-analysis",
      inputSchema: z.object({
  body: z.object({ id: z.string(), reference: z.string(), value: z.number().int(), ip: z.string(), store: z.string(), deviceFingerprint: z.string(), miniCart: z.object({ buyer: z.object({ id: z.string(), firstName: z.string(), lastName: z.string(), document: z.string(), documentType: z.string(), email: z.string(), phone: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }), shipping: z.object({ value: z.number(), estimatedDate: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }), items: z.array(z.object({ id: z.string(), name: z.string(), price: z.number(), quantity: z.number().int(), deliveryType: z.string(), deliverySlaInMinutes: z.number().int(), categoryId: z.string(), categoryName: z.string(), discount: z.number(), sellerId: z.string() })), taxValue: z.number(), listRegistry: z.object({ name: z.string(), deliveryToOwner: z.boolean() }) }), payments: z.array(z.object({ id: z.string(), method: z.string(), name: z.string().optional(), value: z.number(), currencyIso4217: z.string(), installments: z.number().int(), details: z.object({ bin: z.string(), lastDigits: z.string(), holder: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }).optional() })), hook: z.string(), transactionStartDate: z.string(), merchantSettings: z.array(z.object({ name: z.string(), value: z.string() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = "/pre-analysis";
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
      name: "antifraud-provider_send_antifraud_data",
      description: "Send anti-fraud data\nPOST /transactions",
      inputSchema: z.object({
  body: z.object({ id: z.string(), reference: z.string(), value: z.number().int(), ip: z.string(), store: z.string(), deviceFingerprint: z.string(), miniCart: z.object({ buyer: z.object({ id: z.string(), firstName: z.string(), lastName: z.string(), document: z.string(), documentType: z.string(), email: z.string(), phone: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }), shipping: z.object({ value: z.number(), estimatedDate: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }), items: z.array(z.object({ id: z.string(), name: z.string(), price: z.number(), quantity: z.number().int(), deliveryType: z.string(), deliverySlaInMinutes: z.number().int(), categoryId: z.string(), categoryName: z.string(), discount: z.number(), sellerId: z.string() })), taxValue: z.number(), listRegistry: z.object({ name: z.string(), deliveryToOwner: z.boolean() }) }), payments: z.array(z.object({ id: z.string(), method: z.string(), name: z.string().optional(), value: z.number(), currencyIso4217: z.string(), installments: z.number().int(), details: z.object({ bin: z.string(), lastDigits: z.string(), holder: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }).optional() })), hook: z.string(), transactionStartDate: z.string(), merchantSettings: z.array(z.object({ name: z.string(), value: z.string() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = "/transactions";
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
      name: "antifraud-provider_update_antifraud_transactions(optional)",
      description: "Update anti-fraud transactions (optional)\nPUT /transactions/{transactionId}",
      inputSchema: z.object({
  "transactions.Id": z.string().describe("VTEX transaction ID. This parameter is the same `id` sent in the request body of the [Send Anti-fraud Data endpoint](https://developers.vtex.com/docs/api-reference/antifraud-provider-protocol#post-/transactions)."),
  body: z.object({ id: z.string(), reference: z.string(), value: z.number().int(), ip: z.string(), store: z.string(), deviceFingerprint: z.string(), miniCart: z.object({ buyer: z.object({ id: z.string(), firstName: z.string(), lastName: z.string(), document: z.string(), documentType: z.string(), email: z.string(), phone: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }), shipping: z.object({ value: z.number(), estimatedDate: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }), items: z.array(z.object({ id: z.string(), name: z.string(), price: z.number(), quantity: z.number().int(), deliveryType: z.string(), deliverySlaInMinutes: z.number().int(), categoryId: z.string(), categoryName: z.string(), discount: z.number(), sellerId: z.string() })), taxValue: z.number(), listRegistry: z.object({ name: z.string(), deliveryToOwner: z.boolean() }) }), payments: z.array(z.array(z.object({ id: z.string(), method: z.string(), name: z.string().optional(), value: z.number(), currencyIso4217: z.string(), installments: z.number().int(), details: z.object({ bin: z.string(), lastDigits: z.string(), holder: z.string(), address: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }) }).optional() }))), hook: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/transactions/${params.transactionId}`;
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
      name: "antifraud-provider_manifest",
      description: "List anti-fraud provider manifest\nGET /manifest",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/manifest";
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
      name: "antifraud-provider_get_antifraud_status",
      description: "Get anti-fraud status\nGET /transactions/{transactions.id}",
      inputSchema: z.object({
  "transactions.Id": z.string().describe("VTEX transaction ID. This parameter is the same `id` sent in the request body of the [Send Anti-fraud Data endpoint](https://developers.vtex.com/docs/api-reference/antifraud-provider-protocol#post-/transactions).")
}),
      handler: async (params) => {
  try {
    const url = `/transactions/${params["transactions.id"]}`;
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
      name: "antifraud-provider_stop_antifraud_analysis(optional)",
      description: "Stop anti-fraud analysis (optional)\nDELETE /transactions/{transactions.Id}",
      inputSchema: z.object({
  "transactions.Id": z.string().describe("VTEX transaction ID. This parameter is the same `id` sent in the request body of the [Send Anti-fraud Data endpoint](https://developers.vtex.com/docs/api-reference/antifraud-provider-protocol#post-/transactions).")
}),
      handler: async (params) => {
  try {
    const url = `/transactions/${params["transactions.Id"]}`;
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
      name: "antifraud-provider_1.retrieve_token",
      description: "1. Retrieve token\nPOST /authorization/token",
      inputSchema: z.object({
  body: z.object({ applicationId: z.string(), returnUrl: z.string() })
}),
      handler: async (params) => {
  try {
    const url = "/authorization/token";
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
      name: "antifraud-provider_2.redirect",
      description: "2. Redirect\nGET /redirect",
      inputSchema: z.object({
  token: z.string().describe("Token information."),
  applicationId: z.string().describe("VTEX application identifier.")
}),
      handler: async (params) => {
  try {
    const url = "/redirect";
    const queryParams: Record<string, unknown> = {};
    if (params.token !== undefined) queryParams["token"] = params.token;
    if (params.applicationId !== undefined) queryParams["applicationId"] = params.applicationId;
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
      name: "antifraud-provider_3.returnto_vtex",
      description: "3. Return to VTEX\nGET /authorizationCode",
      inputSchema: z.object({
  providerAuthorizationCode: z.string().describe("Provider authorization code information.")
}),
      handler: async (params) => {
  try {
    const url = "/authorizationCode";
    const queryParams: Record<string, unknown> = {};
    if (params.providerAuthorizationCode !== undefined) queryParams["providerAuthorizationCode"] = params.providerAuthorizationCode;
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
      name: "antifraud-provider_4.get_credentials",
      description: "4. Get credentials\nGET /authorization/credentials",
      inputSchema: z.object({
  authorizationCode: z.string().describe("Code generate by affiliation that will be used to identify the merchant authorization."),
  applicationId: z.string().describe("VTEX application identifier.")
}),
      handler: async (params) => {
  try {
    const url = "/authorization/credentials";
    const queryParams: Record<string, unknown> = {};
    if (params.authorizationCode !== undefined) queryParams["authorizationCode"] = params.authorizationCode;
    if (params.applicationId !== undefined) queryParams["applicationId"] = params.applicationId;
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
