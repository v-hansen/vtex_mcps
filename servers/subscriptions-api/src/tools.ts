import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "subscriptions_get_api_rns_pub_cycles_by_cycle_id",
      description: "Get cycle details\nGET /api/rns/pub/cycles/{cycleId}",
      inputSchema: z.object({
  cycleId: z.string().describe("ID from the desired cycle.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/cycles/${params.cycleId}`;
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
      name: "subscriptions_get_api_rns_pub_cycles",
      description: "List cycles\nGET /api/rns/pub/cycles",
      inputSchema: z.object({
  beginDate: z.string().optional().describe("Lower limit for the date of creation of the cycle"),
  endDate: z.string().optional().describe("Upper limit for the date of creation of the cycle"),
  subscriptionId: z.string().optional().describe("Id from the subscription that generated the cycle"),
  customerEmail: z.string().optional().describe("Customer that owns the subscription. Defaults to the current logged user"),
  status: z.string().optional().describe("Current cycle status"),
  page: z.number().int().default(1).describe("Page used for pagination"),
  size: z.number().int().default(15).describe("Page size used for pagination")
}),
      handler: async (params) => {
  try {
    const url = "/api/rns/pub/cycles";
    const queryParams: Record<string, unknown> = {};
    if (params.beginDate !== undefined) queryParams["beginDate"] = params.beginDate;
    if (params.endDate !== undefined) queryParams["endDate"] = params.endDate;
    if (params.subscriptionId !== undefined) queryParams["subscriptionId"] = params.subscriptionId;
    if (params.customerEmail !== undefined) queryParams["customerEmail"] = params.customerEmail;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.size !== undefined) queryParams["size"] = params.size;
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
      name: "subscriptions_post_api_rns_pub_cycles_by_cycle_id_retry",
      description: "Retry cycle\nPOST /api/rns/pub/cycles/{cycleId}/retry",
      inputSchema: z.object({
  cycleId: z.string().describe("ID from the subscription cycle that will be retried.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/cycles/${params.cycleId}/retry`;
    const response = await http.post(url);
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
      name: "subscriptions_get_api_rns_pvt_plans",
      description: "List plans\nGET /api/rns/pvt/plans",
      inputSchema: z.object({
  periodicity: z.string().optional().describe("Filter [subscription plans](https://help.vtex.com/en/tutorial/subscription-plans-beta--5kczKRqHEsrs1tYtRcY8wR) by available periodicity."),
  interval: z.string().optional().describe("Filter [subscription plans](https://help.vtex.com/en/tutorial/subscription-plans-beta--5kczKRqHEsrs1tYtRcY8wR) by available interval."),
  page: z.number().int().optional().describe("Page used for pagination."),
  size: z.number().int().optional().describe("Desired number of [subscription plans](https://help.vtex.com/en/tutorial/subscription-plans-beta--5kczKRqHEsrs1tYtRcY8wR) in the response.")
}),
      handler: async (params) => {
  try {
    const url = "/api/rns/pvt/plans";
    const queryParams: Record<string, unknown> = {};
    if (params.periodicity !== undefined) queryParams["periodicity"] = params.periodicity;
    if (params.interval !== undefined) queryParams["interval"] = params.interval;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.size !== undefined) queryParams["size"] = params.size;
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
      name: "subscriptions_get_api_rns_pvt_plans_by_id",
      description: "Get plan details\nGET /api/rns/pvt/plans/{id}",
      inputSchema: z.object({
  id: z.string().describe("ID from the [subscription plan](https://help.vtex.com/en/tutorial/subscription-plans-beta--5kczKRqHEsrs1tYtRcY8wR).")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pvt/plans/${params.id}`;
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
      name: "subscriptions_get_api_rns_pvt_reports",
      description: "List report templates\nGET /api/rns/pvt/reports",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/rns/pvt/reports";
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
      name: "subscriptions_get_api_rns_pvt_reports_by_report_name_documents_by_document_id",
      description: "Get report document details\nGET /api/rns/pvt/reports/{reportName}/documents/{documentId}",
      inputSchema: z.object({
  reportName: z.string().describe("Name of the report type, which must be previously created for your store using the [Generate report](https://developers.vtex.com/docs/api-reference/subscriptions-api-v3#post-/api/rns/pvt/reports/-reportName-/documents) endpoint. The possible values are:\r\n- `subscriptionsWithStatus`\r\n- `subscriptionsScheduledBetweenDate`\r\n- `subscriptionsUpdatedBetweenDate`\r\n- `subscriptionsCreatedBetweenDate`\r\n- `executionsBetweenDate`"),
  documentId: z.string().describe("Report document ID. You get this value after you create a report template for your store using the [Generate report](https://developers.vtex.com/docs/api-reference/subscriptions-api-v3#post-/api/rns/pvt/reports/-reportName-/documents) endpoint.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pvt/reports/${params.reportName}/documents/${params.documentId}`;
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
      name: "subscriptions_post_api_rns_pvt_reports_by_report_name_documents",
      description: "Generate report\nPOST /api/rns/pvt/reports/{reportName}/documents",
      inputSchema: z.object({
  reportName: z.string().describe("Name of the type of report you wish to generate. The following values are accepted:\r\n- `subscriptionsWithStatus`\r\n- `subscriptionsScheduledBetweenDate`\r\n- `subscriptionsUpdatedBetweenDate`\r\n- `subscriptionsCreatedBetweenDate`\r\n- `executionsBetweenDate`"),
  email: z.string().optional().describe("The report will be sent to the email in this field. When no email is provided, the report is sent to the email of the user making the request."),
  status: z.string().optional().describe("Subscription cycle execution status. This field is required only for the `subscriptionsWithStatus` report type, and the possible values are:\r\n- `TRIGGERED`: Execution has been triggered.\r\n- `IN_PROCESS`: Execution is being processed by the system.\r\n- `FAILURE`: An internal error occurred during the subscription execution.\r\n- `SUCCESS`: Successful cycle processing.\r\n- `EXPIRED`: The subscription was not renewed, and the period for which it was valid has ended.\r\n- `ORDER_ERROR`: Cycle was not executed due to an error in order placement.\r\n- `PAYMENT_ERROR`: Cycle was not executed due to an error in the payment.\r\n- `SKIPED`: A subscription cycle execution was skipped, and the subscription will be executed in the next cycle.\r\n- `SUCCESS_WITH_NO_ORDER`: Cycle was executed successfully, and the linked order has no items.\r\n- `SUCCESS_WITH_PARTIAL_ORDER`: Cycle was executed successfully, and has a linked partial order.\r\n- `RE_TRIGGERED`: Execution retry was triggered manually.\r\n- `SCHEDULE_UPDATED`: The next subscription cycle execution date has been updated."),
  beginDate: z.string().optional().describe("Beginning date in the format `YYYY-MM-DD`. This field is required for all report types, except for the `subscriptionsWithStatus` type."),
  endDate: z.string().optional().describe("Ending date in the format `YYYY-MM-DD`. This field is required for all report types, except for the `subscriptionsWithStatus` type.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pvt/reports/${params.reportName}/documents`;
    const queryParams: Record<string, unknown> = {};
    if (params.email !== undefined) queryParams["email"] = params.email;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.beginDate !== undefined) queryParams["beginDate"] = params.beginDate;
    if (params.endDate !== undefined) queryParams["endDate"] = params.endDate;
    const response = await http.post(url, { params: queryParams });
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
      name: "subscriptions_get_api_rns_pub_subscriptions_by_id",
      description: "Get subscription details by ID\nGET /api/rns/pub/subscriptions/{id}",
      inputSchema: z.object({
  id: z.string().describe("[Subscription](https://help.vtex.com/en/tutorial/how-subscriptions-work--frequentlyAskedQuestions_4453) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/subscriptions/${params.id}`;
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
      name: "subscriptions_patch_api_rns_pub_subscriptions_by_id",
      description: "Update subscription by ID\nPATCH /api/rns/pub/subscriptions/{id}",
      inputSchema: z.object({
  id: z.string().describe("[Subscription](https://help.vtex.com/en/tutorial/how-subscriptions-work--frequentlyAskedQuestions_4453) ID."),
  body: z.object({ customerEmail: z.string(), title: z.string().optional(), status: z.enum(["ACTIVE", "PAUSED", "CANCELED", "EXPIRED", "MISSING"]).optional(), nextPurchaseDate: z.string().optional(), isSkipped: z.boolean().optional(), plan: z.object({ id: z.string(), frequency: z.object({ periodicity: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]), interval: z.number().int() }), validity: z.object({ begin: z.string().optional(), end: z.string().optional() }).optional(), purchaseDay: z.string().optional() }).optional(), shippingAddress: z.object({ addressId: z.string(), addressType: z.enum(["residential", "pickup"]) }).optional(), purchaseSettings: z.object({ paymentMethod: z.object({ paymentAccountId: z.string(), paymentSystem: z.string(), installments: z.number().int().optional(), paymentSystemName: z.string().optional(), paymentSystemGroup: z.string().optional() }), currencyCode: z.string().optional(), selectedSla: z.string().optional(), salesChannel: z.string(), seller: z.string().optional() }).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/subscriptions/${params.id}`;
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
      name: "subscriptions_get_api_rns_pub_subscriptions",
      description: "List subscriptions\nGET /api/rns/pub/subscriptions",
      inputSchema: z.object({
  customerEmail: z.string().optional().describe("Email of a customer that subscrived to your store."),
  status: z.string().optional().describe("Subscription status. The acceptable values are:\r\n- ACTIVE\r\n- PAUSED\r\n- CANCELED\r\n- EXPIRED\r\n- MISSING"),
  addressId: z.string().optional().describe("Subscription shipping address ID."),
  paymentId: z.string().optional().describe("[Payment method](https://help.vtex.com/en/tutorial/difference-between-payment-methods-and-payment-conditions--3azJenhGFyUy2gsocms42Q) ID. It corresponds to the `paymentAccountId` field."),
  planId: z.string().optional().describe("[Subscription plan](https://help.vtex.com/en/tutorial/subscription-plans-beta--5kczKRqHEsrs1tYtRcY8wR) ID."),
  nextPurchaseDate: z.string().optional().describe("Subscription next purchase date in the format `YYYY-MM-DD`."),
  originalOrderId: z.string().optional().describe("Order ID of when the customer subscribed."),
  page: z.number().int().optional().describe("Number of the starting page of the response. When no value is sent, it starts in page `1`."),
  size: z.number().int().optional().describe("Determines the number of subscriptions in the response. The maximum is equal to the default value, which is `15`.")
}),
      handler: async (params) => {
  try {
    const url = "/api/rns/pub/subscriptions";
    const queryParams: Record<string, unknown> = {};
    if (params.customerEmail !== undefined) queryParams["customerEmail"] = params.customerEmail;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.addressId !== undefined) queryParams["addressId"] = params.addressId;
    if (params.paymentId !== undefined) queryParams["paymentId"] = params.paymentId;
    if (params.planId !== undefined) queryParams["planId"] = params.planId;
    if (params.nextPurchaseDate !== undefined) queryParams["nextPurchaseDate"] = params.nextPurchaseDate;
    if (params.originalOrderId !== undefined) queryParams["originalOrderId"] = params.originalOrderId;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.size !== undefined) queryParams["size"] = params.size;
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
      name: "subscriptions_post_api_rns_pub_subscriptions",
      description: "Create subscription\nPOST /api/rns/pub/subscriptions",
      inputSchema: z.object({
  body: z.object({ customerEmail: z.string(), title: z.string().optional(), status: z.enum(["ACTIVE", "PAUSED", "CANCELED", "EXPIRED", "MISSING"]).optional(), nextPurchaseDate: z.string().optional(), catalogAttachment: z.string().optional(), plan: z.object({ id: z.string(), frequency: z.object({ periodicity: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]), interval: z.number().int() }), validity: z.object({ begin: z.string().optional(), end: z.string().optional() }).optional(), purchaseDay: z.string().optional() }), shippingAddress: z.object({ addressId: z.string(), addressType: z.enum(["residential", "pickup"]) }), purchaseSettings: z.object({ paymentMethod: z.object({ paymentAccountId: z.string(), paymentSystem: z.string(), installments: z.number().int().optional(), paymentSystemName: z.string().optional(), paymentSystemGroup: z.string().optional() }), currencyCode: z.string().optional(), selectedSla: z.string().optional(), salesChannel: z.string(), seller: z.string().optional() }), items: z.array(z.object({ skuId: z.string(), quantity: z.number().int(), manualPrice: z.number().optional(), attachments: z.array(z.object({ name: z.string(), content: z.object({}) })).optional() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/rns/pub/subscriptions";
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
      name: "subscriptions_delete_api_rns_pub_subscriptions_by_id_items_by_item_id",
      description: "Remove item from subscription\nDELETE /api/rns/pub/subscriptions/{id}/items/{itemId}",
      inputSchema: z.object({
  id: z.string().describe("[Subscription](https://help.vtex.com/en/tutorial/how-subscriptions-work--frequentlyAskedQuestions_4453) ID."),
  itemId: z.string().describe("Subscription item ID of the SKU being removed from the subscription.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/subscriptions/${params.id}/items/${params.itemId}`;
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
      name: "subscriptions_patch_api_rns_pub_subscriptions_by_id_items_by_item_id",
      description: "Edit item from subscription\nPATCH /api/rns/pub/subscriptions/{id}/items/{itemId}",
      inputSchema: z.object({
  id: z.string().describe("[Subscription](https://help.vtex.com/en/tutorial/how-subscriptions-work--frequentlyAskedQuestions_4453) ID."),
  itemId: z.string().describe("ID of the subscription item being edited."),
  body: z.object({ status: z.enum(["ACTIVE", "PAUSED", "CANCELED", "EXPIRED", "MISSING"]).optional(), isSkipped: z.boolean().optional(), quantity: z.number().int().optional(), manualPrice: z.number().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/subscriptions/${params.id}/items/${params.itemId}`;
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
      name: "subscriptions_post_api_rns_pub_subscriptions_by_id_items",
      description: "Add item to subscription\nPOST /api/rns/pub/subscriptions/{id}/items",
      inputSchema: z.object({
  id: z.string().describe("[Subscription](https://help.vtex.com/en/tutorial/how-subscriptions-work--frequentlyAskedQuestions_4453) ID."),
  body: z.object({ skuId: z.string(), quantity: z.number().int(), manualPrice: z.number().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/subscriptions/${params.id}/items`;
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
      name: "subscriptions_post_api_rns_pub_subscriptions_by_id_simulate",
      description: "Calculate the current prices for a subscription\nPOST /api/rns/pub/subscriptions/{id}/simulate",
      inputSchema: z.object({
  id: z.string().describe("[Subscription](https://help.vtex.com/en/tutorial/how-subscriptions-work--frequentlyAskedQuestions_4453) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/subscriptions/${params.id}/simulate`;
    const response = await http.post(url);
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
      name: "subscriptions_post_api_rns_pub_subscriptions_simulate",
      description: "Calculate the current prices for the provided subscription template\nPOST /api/rns/pub/subscriptions/simulate",
      inputSchema: z.object({
  body: z.object({ customerEmail: z.string(), title: z.string().optional(), status: z.enum(["ACTIVE", "PAUSED", "CANCELED", "EXPIRED", "MISSING"]).optional(), nextPurchaseDate: z.string().optional(), catalogAttachment: z.string().optional(), plan: z.object({ id: z.string(), frequency: z.object({ periodicity: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]), interval: z.number().int() }), validity: z.object({ begin: z.string().optional(), end: z.string().optional() }).optional(), purchaseDay: z.string().optional() }), shippingAddress: z.object({ addressId: z.string(), addressType: z.enum(["residential", "pickup"]) }), purchaseSettings: z.object({ paymentMethod: z.object({ paymentAccountId: z.string(), paymentSystem: z.string(), installments: z.number().int().optional(), paymentSystemName: z.string().optional(), paymentSystemGroup: z.string().optional() }), currencyCode: z.string().optional(), selectedSla: z.string().optional(), salesChannel: z.string(), seller: z.string().optional() }), items: z.array(z.object({ skuId: z.string(), quantity: z.number().int(), manualPrice: z.number().optional(), attachments: z.array(z.object({ name: z.string(), content: z.object({}) })).optional() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/rns/pub/subscriptions/simulate";
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
      name: "subscriptions_get_api_rns_pub_subscriptions_by_subscription_id_conversation_message",
      description: "Get conversation messages\nGET /api/rns/pub/subscriptions/{subscriptionId}/conversation-message",
      inputSchema: z.object({
  subscriptionId: z.string().default("123456789abc").describe("[Subscription](https://help.vtex.com/en/tutorial/how-subscriptions-work--frequentlyAskedQuestions_4453) ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/rns/pub/subscriptions/${params.subscriptionId}/conversation-message`;
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
      name: "subscriptions_get_settings",
      description: "Get subscriptions settings\nGET /api/rns/settings",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/rns/settings";
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
      name: "subscriptions_edit_settings",
      description: "Edit subscriptions settings\nPOST /api/rns/settings",
      inputSchema: z.object({
  body: z.object({ slaOption: z.enum(["NONE", "CHEAPEST", "CUSTOMER_CHOICE", "STORE_CHOICE"]), defaultSla: z.string(), isUsingV3: z.boolean(), onMigrationProcess: z.boolean(), executionHourInUtc: z.number().int(), workflowVersion: z.string(), deliveryChannels: z.array(z.enum(["delivery", "pickupInPoint"])), randomIdGeneration: z.boolean(), isMultipleInstallmentsEnabledOnCreation: z.boolean(), isMultipleInstallmentsEnabledOnUpdate: z.boolean(), attachmentPreferences: z.object({ enableAttachments: z.boolean().optional(), splitSameSkuWithDifferentAttachments: z.boolean().optional() }).optional(), orderCustomDataAppId: z.string(), postponeExpiration: z.boolean(), manualPriceAllowed: z.boolean(), useItemPriceFromOriginalOrder: z.boolean() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/rns/settings";
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
