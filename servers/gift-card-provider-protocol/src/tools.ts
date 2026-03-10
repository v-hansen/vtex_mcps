import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "gift-card-provider-protocol_list_all_gift_cards",
      description: "List all gift cards\nPOST /giftcards/_search",
      inputSchema: z.object({
  body: z.object({ client: z.object({ id: z.string(), email: z.string(), document: z.string() }), cart: z.object({ grandTotal: z.number().int(), relationName: z.string(), redemptionCode: z.string(), discounts: z.number().int(), shipping: z.number().int(), taxes: z.number().int(), items: z.array(z.object({ productId: z.string(), id: z.string(), refId: z.string(), name: z.string(), price: z.number().int(), quantity: z.number().int() })), itemsTotal: z.number().int() }) })
}),
      handler: async (params) => {
  try {
    const url = "/giftcards/_search";
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
      name: "gift-card-provider-protocol_get_gift_cardby_id",
      description: "Get a gift card by ID\nGET /giftcards/{giftCardId}",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification.")
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}`;
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
      name: "gift-card-provider-protocol_create_gift_card",
      description: "Create a gift card\nPOST /giftcards",
      inputSchema: z.object({
  body: z.object({ relationName: z.string(), emissionDate: z.string().optional(), expiringDate: z.string().optional(), caption: z.string(), restrictedToOwner: z.boolean().optional(), multipleRedemptions: z.boolean().optional(), multipleCredits: z.boolean().optional(), profileId: z.string(), currencyCode: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = "/giftcards";
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
      name: "gift-card-provider-protocol_create_gift_card_transaction",
      description: "Create a gift card transaction\nPOST /giftcards/{giftCardId}/transactions",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification."),
  body: z.object({ operation: z.string(), value: z.number(), description: z.string(), redemptionToken: z.string(), redemptionCode: z.string(), requestId: z.string(), orderInfo: z.object({ orderId: z.string().optional(), sequence: z.number().int().optional(), cart: z.object({ items: z.array(z.object({ id: z.string(), productId: z.string(), refId: z.string(), name: z.string(), value: z.number(), price: z.number(), quantity: z.number().int(), shippingDiscount: z.number().int(), discount: z.number(), priceTags: z.array(z.object({ name: z.string(), value: z.number().int() })) })), grandTotal: z.number().int(), discounts: z.number(), shipping: z.number(), taxes: z.number().int(), itemsTotal: z.number() }).optional(), clientProfile: z.object({ email: z.string(), firstName: z.string(), lastName: z.string(), document: z.string(), phone: z.string(), birthDate: z.string(), isCorporate: z.boolean() }).optional(), shipping: z.object({ receiverName: z.string(), postalCode: z.string(), city: z.string(), state: z.string(), country: z.string(), street: z.string(), number: z.string(), neighborhood: z.string(), complement: z.string(), reference: z.string() }).optional() }) })
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}/transactions`;
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
      name: "gift-card-provider-protocol_list_all_gift_card_transactions",
      description: "List all gift card transactions\nGET /giftcards/{giftCardId}/transactions",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification.")
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}/transactions`;
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
      name: "gift-card-provider-protocol_get_gift_card_transactionby_id",
      description: "Get a gift card transaction by ID\nGET /giftcards/{giftCardId}/transactions/{transactionId}",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification."),
  transactionId: z.string().describe("Transaction identification.")
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}/transactions/${params.transactionId}`;
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
      name: "gift-card-provider-protocol_get_gift_card_transaction_authorization",
      description: "Get a gift card transaction authorization\nGET /giftcards/{giftCardId}/transactions/{transactionId}/authorization",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification."),
  transactionId: z.string().describe("Transaction identification.")
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/authorization`;
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
      name: "gift-card-provider-protocol_create_gift_card_transaction_cancellation",
      description: "Cancel a gift card transaction\nPOST /giftcards/{giftCardId}/transactions/{transactionId}/cancellations",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification."),
  transactionId: z.string().describe("Transaction identification."),
  body: z.object({ value: z.number(), requestId: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/cancellations`;
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
      name: "gift-card-provider-protocol_list_all_gift_card_transactions_cancellations",
      description: "List all gift card transactions cancellations\nGET /giftcards/{giftCardId}/transactions/{transactionId}/cancellations",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification."),
  transactionId: z.string().describe("Transaction identification.")
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}/transactions/${params.transactionId}/cancellations`;
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
      name: "gift-card-provider-protocol_create_gift_card_transaction_settlement",
      description: "Settle a gift card transaction\nPOST /giftcards/{giftCardId}/transactions/{tId}/settlements",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification."),
  tId: z.string().describe("Transaction ID generated by the provider. It is different from the `transactionId` generated by VTEX."),
  body: z.object({ value: z.number(), requestId: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}/transactions/${params.tId}/settlements`;
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
      name: "gift-card-provider-protocol_list_all_gift_card_transactions_settlements",
      description: "List all gift card transactions settlements\nGET /giftcards/{giftCardId}/transactions/{tId}/settlements",
      inputSchema: z.object({
  giftCardId: z.string().describe("Gift card identification."),
  tId: z.string().describe("Transaction ID generated by the provider. It is different from the `transactionId` generated by VTEX.")
}),
      handler: async (params) => {
  try {
    const url = `/giftcards/${params.giftCardId}/transactions/${params.tId}/settlements`;
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
    }
  ];
}
