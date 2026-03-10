import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "payments-gateway_installmentsoptions",
      description: "Get installments options\nGET /api/pvt/installments",
      inputSchema: z.object({
  "request.value": z.number().int().describe("Value to be divided into installments."),
  "request.salesChannel": z.number().int().optional().describe("Sales channel identification. Attribute created by the seller in their VTEX store configuration."),
  "request.paymentDetails[0].id": z.number().int().optional().describe("Payment system identification."),
  "request.paymentDetails[0].value": z.number().int().optional().describe("Total value paid in installments. If applied in the search, it must be equal to the `request.value` field."),
  "request.paymentDetails[0].bin": z.number().int().optional().describe("First six digits of the card number.")
}),
      handler: async (params) => {
  try {
    const url = "/api/pvt/installments";
    const queryParams: Record<string, unknown> = {};
    if (params["request.value"] !== undefined) queryParams["request.value"] = params["request.value"];
    if (params["request.salesChannel"] !== undefined) queryParams["request.salesChannel"] = params["request.salesChannel"];
    if (params["request.paymentDetails[0].id"] !== undefined) queryParams["request.paymentDetails[0].id"] = params["request.paymentDetails[0].id"];
    if (params["request.paymentDetails[0].value"] !== undefined) queryParams["request.paymentDetails[0].value"] = params["request.paymentDetails[0].value"];
    if (params["request.paymentDetails[0].bin"] !== undefined) queryParams["request.paymentDetails[0].bin"] = params["request.paymentDetails[0].bin"];
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
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
      name: "payments-gateway_affiliations",
      description: "List all affiliations\nGET /api/pvt/affiliations",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/pvt/affiliations";
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
      name: "payments-gateway_insert_affiliation",
      description: "Insert new affiliation\nPOST /api/pvt/affiliations",
      inputSchema: z.object({
  body: z.object({ implementation: z.string(), name: z.string(), configuration: z.array(z.object({ name: z.string(), value: z.string() })), isdelivered: z.boolean(), isConfigured: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/pvt/affiliations";
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
      name: "payments-gateway_update_affiliation",
      description: "Update affiliation by ID\nPUT /api/pvt/affiliations/{affiliationId}",
      inputSchema: z.object({
  affiliationId: z.string().describe("Affiliation (payment or anti-fraud provider) identification."),
  body: z.object({ id: z.string(), implementation: z.string(), name: z.string(), configuration: z.array(z.object({ name: z.string(), value: z.string(), valueKey: z.string() })), isdelivered: z.boolean(), isConfigured: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/affiliations/${params.affiliationId}`;
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
      name: "payments-gateway_affiliation_by_id",
      description: "Get affiliation by ID\nGET /api/pvt/affiliations/{affiliationId}",
      inputSchema: z.object({
  affiliationId: z.string().describe("Affiliation (payment or anti-fraud provider) identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/affiliations/${params.affiliationId}`;
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
      name: "payments-gateway_rules",
      description: "List all payment rules\nGET /api/pvt/rules",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/pvt/rules";
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
      name: "payments-gateway_insert_rule",
      description: "Insert a new payment rule\nPOST /api/pvt/rules",
      inputSchema: z.object({
  body: z.object({ name: z.string(), salesChannels: z.array(z.object({ id: z.string() })), paymentSystem: z.object({ id: z.number(), name: z.string(), implementation: z.string() }), connector: z.object({ implementation: z.string(), affiliationId: z.string() }), issuer: z.object({ name: z.string() }), antifraud: z.object({ implementation: z.string(), affiliationId: z.string() }), installmentOptions: z.object({ dueDateType: z.union([z.literal(0), z.literal(1)]), interestRateMethod: z.union([z.literal(null), z.literal(0), z.literal(1), z.literal(2)]), minimumInstallmentValue: z.number(), installments: z.array(z.object({ ruleId: z.string(), quantity: z.number().int(), value: z.number(), interestRate: z.number(), isExternalInstallmentService: z.number(), interestTax: z.number() })) }), isSelfAuthorized: z.boolean(), requiresAuthentication: z.boolean(), enabled: z.boolean(), installmentsService: z.boolean(), isDefault: z.boolean(), beginDate: z.string(), endDate: z.string(), condition: z.object({ id: z.string(), pullRate: z.number(), name: z.string() }), multiMerchantList: z.array(z.string()), country: z.object({ name: z.string(), isoCode: z.string() }), dateIntervals: z.array(z.object({ start: z.string(), end: z.string() })), externalInterest: z.boolean().optional(), minimumValue: z.number().optional(), deadlines: z.array(z.object({ paymentOptions: z.array(z.object({ days: z.number(), interestRate: z.number() })) })).optional(), cobrand: z.object({ name: z.string() }).optional(), cardLevel: z.object({ name: z.string() }).optional(), excludedBinsRanges: z.number().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/pvt/rules";
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
      name: "payments-gateway_rule_by_id",
      description: "Get payment rule by ID\nGET /api/pvt/rules/{ruleId}",
      inputSchema: z.object({
  ruleId: z.string().describe("Rule identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/rules/${params.ruleId}`;
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
      name: "payments-gateway_put_rule_by_id",
      description: "Update payment rule by ID\nPUT /api/pvt/rules/{ruleId}",
      inputSchema: z.object({
  ruleId: z.string().describe("Rule identification."),
  body: z.object({ id: z.string(), name: z.string(), salesChannels: z.array(z.object({ id: z.string() })), paymentSystem: z.object({ id: z.number(), name: z.string(), implementation: z.string() }), connector: z.object({ implementation: z.string(), affiliationId: z.string() }), issuer: z.object({ name: z.string() }), antifraud: z.object({ implementation: z.string(), affiliationId: z.string() }), installmentOptions: z.object({ dueDateType: z.union([z.literal(0), z.literal(1)]), interestRateMethod: z.union([z.literal(null), z.literal(0), z.literal(1), z.literal(2)]), minimumInstallmentValue: z.number(), installments: z.array(z.object({ ruleId: z.string(), quantity: z.number().int(), value: z.number(), interestRate: z.number(), isExternalInstallmentService: z.number(), interestTax: z.number() })) }), isSelfAuthorized: z.boolean(), requiresAuthentication: z.boolean(), enabled: z.boolean(), installmentsService: z.boolean(), isDefault: z.boolean(), beginDate: z.string(), endDate: z.string(), condition: z.object({ id: z.string(), pullRate: z.number(), name: z.string() }), multiMerchantList: z.array(z.string()), country: z.object({ name: z.string(), isoCode: z.string() }), dateIntervals: z.array(z.object({ start: z.string(), end: z.string() })), externalInterest: z.boolean().optional(), minimumValue: z.number().optional(), deadlines: z.array(z.object({ paymentOptions: z.array(z.object({ days: z.number(), interestRate: z.number() })) })).optional(), cobrand: z.object({ name: z.string() }).optional(), cardLevel: z.object({ name: z.string() }).optional(), excludedBinsRanges: z.number().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/rules/${params.ruleId}`;
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
      name: "payments-gateway_rule",
      description: "Delete payment rule by ID\nDELETE /api/pvt/rules/{ruleId}",
      inputSchema: z.object({
  ruleId: z.string().describe("Rule identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/rules/${params.ruleId}`;
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
      name: "payments-gateway_available_payment_methods",
      description: "List all available payment methods\nGET /api/pvt/merchants/payment-systems",
      inputSchema: z.object({
  salesChannel: z.number().int().optional().describe("Sales channel ([trade policy](https://help.vtex.com/en/tutorial/how-trade-policies-work--6Xef8PZiFm40kg2STrMkMV)) identification. This parameter must be filled in if you wish to obtain information on payment methods available in a specific store sales channel.")
}),
      handler: async (params) => {
  try {
    const url = "/api/pvt/merchants/payment-systems";
    const queryParams: Record<string, unknown> = {};
    if (params.salesChannel !== undefined) queryParams["salesChannel"] = params.salesChannel;
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
      name: "payments-gateway_get_card_token_by_id",
      description: "Get card data\nGET /api/payments/pvt/account/{cardId}",
      inputSchema: z.object({
  cardId: z.string().describe("Card identification. This is the `accountId` associated with the client's profile, which can be viewed by accessing [Profile System](https://developers.vtex.com/docs/guides/profile-system#profile-system-api-reference). As a client can have more than one card registered in their profile, check the desired `accountId` and send it in this request.")
}),
      handler: async (params) => {
  try {
    const url = `/api/payments/pvt/account/${params.cardId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
      case 500:
        throw new Error("Internal Server Error - Payment system not found for the card.");
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
      name: "payments-gateway_1.createanewtransaction",
      description: "Start a new transaction\nPOST /api/pvt/transactions",
      inputSchema: z.object({
  body: z.object({ value: z.number(), referenceId: z.string(), channel: z.string(), urn: z.string().optional(), salesChannel: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/pvt/transactions";
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
      name: "payments-gateway_2.send_payments_public",
      description: "Send payments information\nPOST /api/payments/transactions/{transactionId}/payments",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification."),
  an: z.string().describe("Account name."),
  orderId: z.string().describe("Order identification."),
  body: z.array(z.object({ paymentSystem: z.number(), installments: z.number(), currencyCode: z.string(), value: z.number(), installmentsInterestRate: z.number(), installmentsValue: z.number(), referenceValue: z.number(), fields: z.object({ holderName: z.string(), cardNumber: z.string(), validationCode: z.string(), dueDate: z.string(), document: z.string(), accountId: z.string(), address: z.array(z.object({ addressType: z.string().optional(), receiverName: z.string().optional(), postalCode: z.string().optional(), city: z.string().optional(), state: z.string().optional(), country: z.string().optional(), street: z.string().optional(), number: z.number().optional(), neighborhood: z.string().optional(), complement: z.string().optional(), reference: z.string().optional(), geoCoordinates: z.array(z.number()).optional() })), callbackUrl: z.string() }), transaction: z.object({ id: z.string(), merchantName: z.string() }) })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/payments/transactions/${params.transactionId}/payments`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
    if (params.orderId !== undefined) queryParams["orderId"] = params.orderId;
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
      name: "payments-gateway_3.send_additional_data",
      description: "Send additional data\nPOST /api/pvt/transactions/{transactionId}/additional-data",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification."),
  body: z.array(z.object({ name: z.string(), value: z.string() })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}/additional-data`;
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
      name: "payments-gateway_3.1_update_additional_data",
      description: "Update additional data (optional)\nPATCH /api/pvt/transactions/{transactionId}/additional-data",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification."),
  body: z.array(z.object({ name: z.string(), value: z.string() })).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}/additional-data`;
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
      name: "payments-gateway_4.doauthorization",
      description: "Authorize new transaction\nPOST /api/pvt/transactions/{transactionId}/authorization-request",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification."),
  body: z.object({ transactionId: z.string(), softDescriptor: z.string(), prepareForRecurrency: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}/authorization-request`;
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
      name: "payments-gateway_transaction_details",
      description: "Get transaction details\nGET /api/pvt/transactions/{transactionId}",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}`;
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
      name: "payments-gateway_payment_details",
      description: "Get payment details\nGET /api/pvt/transactions/{transactionId}/payments/{paymentId}",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification."),
  paymentId: z.string().describe("Payment identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}/payments/${params.paymentId}`;
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
      name: "payments-gateway_transaction_settlement_details",
      description: "Get transaction settlement details\nGET /api/pvt/transactions/{transactionId}/settlements",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}/settlements`;
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
      name: "payments-gateway_settlethetransaction",
      description: "Settle the transaction\nPOST /api/pvt/transactions/{transactionId}/settlement-request",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification."),
  body: z.object({ value: z.number() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}/settlement-request`;
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
      name: "payments-gateway_refundthetransaction",
      description: "Refund the transaction\nPOST /api/pvt/transactions/{transactionId}/refunding-request",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification."),
  body: z.object({ value: z.number(), freight: z.number().optional(), tax: z.number().optional(), minicart: z.object({}).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}/refunding-request`;
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
      name: "payments-gateway_cancelthetransaction",
      description: "Cancel the transaction\nPOST /api/pvt/transactions/{transactionId}/cancellation-request",
      inputSchema: z.object({
  transactionId: z.string().describe("Transaction identification."),
  body: z.object({ value: z.number() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/pvt/transactions/${params.transactionId}/cancellation-request`;
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
      name: "payments-gateway_get_api_payments_pvt_payments_by_payment_id_payment_notification",
      description: "Send payment notification with payment ID\nGET /api/payments/pvt/payments/{paymentId}/payment-notification",
      inputSchema: z.object({
  paymentId: z.string().describe("Payment identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/payments/pvt/payments/${params.paymentId}/payment-notification`;
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
      name: "payments-gateway_post_api_payments_pvt_payments_by_payment_id_payment_notification",
      description: "Send payment notification with payment ID, date, and value paid\nPOST /api/payments/pvt/payments/{paymentId}/payment-notification",
      inputSchema: z.object({
  paymentId: z.string().describe("Payment identification."),
  body: z.object({ paymentDate: z.string(), valuePaid: z.number() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/payments/pvt/payments/${params.paymentId}/payment-notification`;
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
