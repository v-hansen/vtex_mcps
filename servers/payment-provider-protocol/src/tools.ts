import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "payment-provider-protocol_manifest",
      description: "List Payment Provider Manifest\nGET /manifest",
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
      name: "payment-provider-protocol_create_payment",
      description: "Create payment\nPOST /payments",
      inputSchema: z.object({
  body: z.object({ reference: z.string(), orderId: z.string(), shopperInteraction: z.string(), verificationOnly: z.boolean().optional(), transactionId: z.string(), paymentId: z.string(), paymentMethod: z.string(), paymentMethodCustomCode: z.string(), merchantName: z.string(), value: z.number(), referenceValue: z.number().optional(), currency: z.string(), installments: z.number(), installmentsInterestRate: z.number().optional(), installmentsValue: z.number().optional(), deviceFingerprint: z.string(), ipAddress: z.string().optional(), card: z.object({ holder: z.string(), holderToken: z.string().optional(), number: z.string(), csc: z.string(), bin: z.string().optional(), numberToken: z.string().optional(), numberLength: z.number().optional(), cscToken: z.string().optional(), cscLength: z.number().optional(), expiration: z.object({ month: z.string(), year: z.string() }), document: z.string().optional(), paymentOrigin: z.string().optional(), cryptogram: z.string().optional(), eci: z.string().optional() }).optional(), miniCart: z.object({ shippingValue: z.number(), taxValue: z.number(), buyer: z.object({ id: z.string().optional(), firstName: z.string(), lastName: z.string(), document: z.string(), documentType: z.string(), email: z.string(), phone: z.string(), isCorporate: z.boolean().optional(), corporateName: z.string().optional(), tradeName: z.string().optional(), corporateDocument: z.string().optional(), createdDate: z.string().optional() }), shippingAddress: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string().optional(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }), billingAddress: z.object({ country: z.string(), street: z.string(), number: z.string(), complement: z.string().optional(), neighborhood: z.string(), postalCode: z.string(), city: z.string(), state: z.string() }), items: z.array(z.object({ id: z.string(), name: z.string(), price: z.number(), quantity: z.number().int(), discount: z.number().int(), deliveryType: z.string().optional(), categoryId: z.string().optional(), sellerId: z.string().optional(), taxRate: z.number().optional(), taxValue: z.number().optional() })) }), recipients: z.array(z.object({ id: z.string(), name: z.string(), documentType: z.string(), document: z.string(), role: z.string(), chargeProcessingFee: z.boolean().optional(), chargebackLiable: z.boolean().optional(), amount: z.number(), comissionAmount: z.number().optional() })).optional(), merchantSettings: z.array(z.object({ name: z.string(), value: z.string() })).optional(), url: z.string(), inboundRequestUrl: z.string().optional(), secureProxyUrl: z.string().optional(), sandBoxMode: z.boolean().optional(), totalCartValue: z.number().optional(), callbackUrl: z.string(), returnUrl: z.string(), connectorMetadata: z.array(z.object({ name: z.string(), value: z.string() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = "/payments";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
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
      name: "payment-provider-protocol_cancel_payment",
      description: "Cancel payment\nPOST /payments/{paymentId}/cancellations",
      inputSchema: z.object({
  paymentId: z.string().describe("VTEX payment identifier."),
  body: z.object({ paymentId: z.string(), requestId: z.string(), authorizationId: z.string(), tid: z.string().optional(), transactionId: z.string().optional(), value: z.number().optional(), nsu: z.string().optional(), sandboxMode: z.boolean().optional(), merchantSettings: z.array(z.object({ name: z.string(), value: z.string() })).optional(), connectorMetadata: z.array(z.object({ name: z.string(), value: z.string() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/payments/${params.paymentId}/cancellations`;
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 500:
        throw new Error("Internal Server Error");
      case 501:
        throw new Error("Not Implemented");
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
      name: "payment-provider-protocol_settle_payment",
      description: "Settle payment\nPOST /payments/{paymentId}/settlements",
      inputSchema: z.object({
  paymentId: z.string().describe("VTEX payment identifier."),
  body: z.object({ transactionId: z.string(), requestId: z.string(), paymentId: z.string(), value: z.number(), authorizationId: z.string(), tid: z.string().optional(), nsu: z.string().optional(), recipients: z.array(z.object({ id: z.string(), name: z.string(), documentType: z.string(), document: z.string(), role: z.string(), chargeProcessingFee: z.boolean().optional(), chargebackLiable: z.boolean().optional(), amount: z.number(), commissionAmount: z.number().optional() })).optional(), sandboxMode: z.boolean().optional(), merchantSettings: z.array(z.object({ name: z.string(), value: z.string() })).optional(), connectorMetadata: z.array(z.object({ name: z.string(), value: z.string() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/payments/${params.paymentId}/settlements`;
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
      name: "payment-provider-protocol_refund_payment",
      description: "Refund payment\nPOST /payments/{paymentId}/refunds",
      inputSchema: z.object({
  paymentId: z.string().describe("VTEX payment identifier."),
  body: z.object({ requestId: z.string(), settleId: z.string(), paymentId: z.string(), tid: z.string(), value: z.number(), transactionId: z.string(), authorizationId: z.string().optional(), nsu: z.string().optional(), recipients: z.array(z.object({ id: z.string(), name: z.string(), documentType: z.string(), document: z.string(), role: z.string(), chargeProcessingFee: z.boolean().optional(), chargebackLiable: z.boolean().optional(), amount: z.number(), comissionAmount: z.number().optional() })).optional(), sandboxMode: z.boolean().optional(), merchantSettings: z.array(z.object({ name: z.string(), value: z.string() })).optional(), connectorMetadata: z.array(z.object({ name: z.string(), value: z.string() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/payments/${params.paymentId}/refunds`;
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 500:
        throw new Error("Internal Server Error");
      case 501:
        throw new Error("Not Implemented");
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
      name: "payment-provider-protocol_inbound_request(beta)",
      description: "Inbound request (BETA)\nPOST /payments/{paymentId}/inbound/{action}",
      inputSchema: z.object({
  paymentId: z.string().describe("VTEX payment identifier."),
  action: z.string().describe("Describes the type of action that will be performed on the route (e.g. hook, enrollment, among others). It is the same `:action` information used in the `inboundRequestsUrl` provided in the [Create Payment](https://developers.vtex.com/docs/api-reference/payment-provider-protocol#post-/payments?endpoint=post-/payments) endpoint payload."),
  body: z.object({ requestId: z.string(), transactionId: z.string(), paymentId: z.string(), authorizationId: z.string(), nsu: z.string(), tid: z.string(), requestData: z.object({ body: z.string() }), merchantSettings: z.array(z.object({ name: z.string(), value: z.string() })).optional(), connectorMetadata: z.array(z.object({ name: z.string(), value: z.string() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/payments/${params.paymentId}/inbound/${params.action}`;
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
      name: "payment-provider-protocol_create_authorization_token",
      description: "Create authorization token\nPOST /authorization/token",
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
      name: "payment-provider-protocol_provider_authentication",
      description: "Provider authentication\nGET /authorization/redirect",
      inputSchema: z.object({
  applicationId: z.string().describe("VTEX application identifier."),
  token: z.string().describe("You must generate a token that will be used to identify the same context when we redirect the merchant to your application.")
}),
      handler: async (params) => {
  try {
    const url = "/authorization/redirect";
    const queryParams: Record<string, unknown> = {};
    if (params.applicationId !== undefined) queryParams["applicationId"] = params.applicationId;
    if (params.token !== undefined) queryParams["token"] = params.token;
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
      name: "payment-provider-protocol_get_credentials",
      description: "Get credentials\nGET /authorization/credentials",
      inputSchema: z.object({
  applicationId: z.string().describe("VTEX application identifier."),
  authorizationCode: z.string().describe("Code generate by affiliation that will be used to identify the merchant authorization.")
}),
      handler: async (params) => {
  try {
    const url = "/authorization/credentials";
    const queryParams: Record<string, unknown> = {};
    if (params.applicationId !== undefined) queryParams["applicationId"] = params.applicationId;
    if (params.authorizationCode !== undefined) queryParams["authorizationCode"] = params.authorizationCode;
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
