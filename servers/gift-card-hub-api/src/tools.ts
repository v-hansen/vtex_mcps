import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "gift-card-hub_list_all_gift_card_providers",
      description: "List all gift card providers\nGET /api/giftcardproviders",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/giftcardproviders";
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
      name: "gift-card-hub_get_gift_card_providerby_id",
      description: "Get a gift card provider by ID\nGET /api/giftcardproviders/{giftCardProviderId}",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 500:
        throw new Error("Object reference not set to an instance of an object (The gift card provider described does not exist).");
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
      name: "gift-card-hub_create/update_gift_card_providerby_id",
      description: "Create or update a gift card provider by ID\nPUT /api/giftcardproviders/{giftCardProviderId}",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  body: z.object({ id: z.string().optional(), serviceUrl: z.string(), oauthProvider: z.string(), preAuthEnabled: z.boolean(), cancelEnabled: z.boolean(), appKey: z.string(), appToken: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}`;
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
      name: "gift-card-hub_delete_gift_card_providerby_id",
      description: "Delete a gift card provider by ID\nDELETE /api/giftcardproviders/{giftCardProviderId}",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}`;
    const response = await http.delete(url);
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
      name: "gift-card-hub_create_gift_cardin_gift_card_provider",
      description: "Create a gift card at a gift card provider\nPOST /api/giftcardproviders/{giftCardProviderId}/giftcards",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  body: z.object({ relationName: z.string(), emissionDate: z.string(), expiringDate: z.string(), caption: z.string(), restrictedToOwner: z.boolean(), multipleRedemptions: z.boolean(), multipleCredits: z.boolean(), profileId: z.string(), currencyCode: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards`;
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
      name: "gift-card-hub_get_gift_cardfrom_gift_card_provider",
      description: "Get a gift card from a gift card provider\nPOST /api/giftcardproviders/{giftCardProviderId}/giftcards/_search",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  body: z.object({ client: z.object({ id: z.string().optional(), email: z.string().optional(), document: z.string().optional() }), cart: z.object({ grandTotal: z.number().int().optional(), relationName: z.string().optional(), redemptionCode: z.string().optional(), discounts: z.number().int().optional(), shipping: z.number().int().optional(), taxes: z.number().int().optional(), items: z.array(z.object({ productId: z.string().optional(), id: z.string().optional(), refId: z.string().optional(), name: z.string().optional(), price: z.number().int().optional(), quantity: z.number().int().optional() })).optional(), itemsTotal: z.number().int().optional() }) })
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/_search`;
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
      name: "gift-card-hub_get_gift_cardfrom_gift_card_providerby_id",
      description: "Get a gift card from a gift card provider by ID\nGET /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}`;
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
      name: "gift-card-hub_list_all_gift_card_transactions",
      description: "List all gift card transactions\nGET /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}/transactions",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions`;
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
      name: "gift-card-hub_create_gift_card_transaction",
      description: "Create a gift card transaction\nPOST /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}/transactions",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification."),
  body: z.object({ operation: z.string(), value: z.number(), description: z.string(), redemptionToken: z.string(), redemptionCode: z.string(), requestId: z.string(), orderInfo: z.object({ orderId: z.string().optional(), sequence: z.number().int().optional(), cart: z.object({ items: z.array(z.object({ id: z.string(), productId: z.string(), refId: z.string(), name: z.string(), value: z.number(), price: z.number(), quantity: z.number().int(), shippingDiscount: z.number().int(), discount: z.number(), priceTags: z.object({ name: z.string(), value: z.number().int() }) })), grandTotal: z.number().int(), discounts: z.number(), shipping: z.number(), taxes: z.number().int(), itemsTotal: z.number() }).optional(), clientProfile: z.object({ email: z.string(), firstName: z.string(), lastName: z.string(), document: z.string(), phone: z.string(), birthDate: z.string(), isCorporate: z.boolean() }).optional(), shipping: z.object({ receiverName: z.string(), postalCode: z.string(), city: z.string(), state: z.string(), country: z.string(), street: z.string(), number: z.string(), neighborhood: z.string(), complement: z.string(), reference: z.string() }).optional() }) })
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions`;
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
      name: "gift-card-hub_get_gift_card_transactionby_id",
      description: "Get a gift card transaction by ID\nGET /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}/transactions/{transactionId}",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification."),
  transactionId: z.string().describe("Transaction identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.transactionId}`;
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
      name: "gift-card-hub_get_gift_card_authorization_transaction",
      description: "Get a gift card transaction authorization\nGET /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}/transactions/{tId}/authorization",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification."),
  tId: z.string().describe("Transaction ID generated by the provider. It is different from the `transactionId` generated by VTEX.")
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/authorization`;
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
      name: "gift-card-hub_list_all_gift_card_settlement_transactions",
      description: "List all gift card transactions settlements\nGET /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}/transactions/{tId}/settlements",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification."),
  tId: z.string().describe("Transaction ID generated by the provider. It is different from the `transactionId` generated by VTEX.")
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/settlements`;
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
      name: "gift-card-hub_create_gift_card_settlement_transaction",
      description: "Settle a gift card transaction\nPOST /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}/transactions/{tId}/settlements",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification."),
  tId: z.string().describe("Transaction ID generated by the provider. It is different from the `transactionId` generated by VTEX."),
  body: z.object({ value: z.number(), requestId: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/settlements`;
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
      name: "gift-card-hub_list_all_gift_card_cancellation_transactions",
      description: "List all gift card transactions cancellations\nGET /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}/transactions/{tId}/cancellations",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification."),
  tId: z.string().describe("Transaction ID generated by the provider. It is different from the `transactionId` generated by VTEX.")
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/cancellations`;
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
      name: "gift-card-hub_create_gift_card_cancellation_transaction",
      description: "Cancel a gift card transaction\nPOST /api/giftcardproviders/{giftCardProviderId}/giftcards/{giftCardId}/transactions/{tId}/cancellations",
      inputSchema: z.object({
  giftCardProviderId: z.string().describe("Gift card provider identification."),
  giftCardId: z.string().describe("Gift card identification."),
  tId: z.string().describe("Transaction ID generated by the provider. It is different from the `transactionId` generated by VTEX."),
  body: z.object({ value: z.number(), requestId: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/api/giftcardproviders/${params.giftCardProviderId}/giftcards/${params.giftCardId}/transactions/${params.tId}/cancellations`;
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
