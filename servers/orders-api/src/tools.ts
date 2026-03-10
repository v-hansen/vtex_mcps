import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "orders_get_order",
      description: "Get order\nGET /api/oms/pvt/orders/{orderId}",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID is a unique code that identifies an order. Instead of using `orderId`, you can also make the request using the sequence, a six-digit string that follows the order ID. For example, in order 1268540501456-01 (501456), the sequence is 501456. To use this parameter, replace the value between `{ }` keys in `seq{sequence-number}` with the sequence. For example: `seq501456`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}`;
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
      name: "orders_get_api_oms_pvt_orders_order_group_by_order_group",
      description: "Get orders by order group ID\nGET /api/oms/pvt/orders/order-group/{orderGroup}",
      inputSchema: z.object({
  orderGroup: z.string().describe("Order group ID is a part of the order ID that groups all orders related to the same purchase. For example, when an order is fullfilled by multiple sellers, each seller has its own order ID (`v71021570str-01` and `v71021570str-02`), but they share the same order group ID (`v71021570str`).")
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/order-group/${params.orderGroup}`;
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
      name: "orders_list_orders",
      description: "List orders\nGET /api/oms/pvt/orders",
      inputSchema: z.object({
  orderBy: z.string().optional().describe("You can retrieve orders lists filtering by an `OrderField` combined with an `OrderType`. To do so, you have to concatenate them: `orderBy={{OrderField}},{{OrderType}}`. \r\n- `OrderField` values accepted: `creationDate`, `orderId`, `items`, `totalValue` and `origin`. \r\n- `OrderType` values accepted: `asc` and `desc`."),
  page: z.number().int().optional().describe("Define the number of pages you wish to retrieve, restricted to the limit of 30 pages."),
  per_page: z.number().int().optional().describe("Quantity of orders for each page, the default value is 15 and it goes up to 100 orders per page. Be aware that the limit of retrieval ofthis endpoint is 30 pages."),
  f_hasInputInvoice: z.boolean().optional().describe("Filters list to return only orders with non `null` values for the `invoiceInput` field."),
  q: z.string().optional().describe("This parameter filters using Fulltext and accepts the values below. Be aware that the `+` caracter is not allowed in Fulltext Search. \r\n- Order Id \r\n- Client email \r\n- Client document \r\n- Client name \r\n\r\n B2B Buyer Portal users can search for contact information fields, which includes the values below: \r\n- User email. \r\n- User first name. \r\n- User last name. \r\n- User phone number. \r\n- User document ID. \r\n- User document type."),
  f_shippingEstimate: z.string().optional().describe("You can filter orders by shipping estimate time in days by concatenating the desired number of days with the sufix `.days`. For example: \r\n- Next 7 days: `7.days` \r\n- Tomorrow: `1.days` \r\n- Today: `0.days` \r\n- Late: `-1.days`"),
  f_invoicedDate: z.string().optional().describe("You can filter orders by invoiced date by concatenating the sufix `invoicedDate:` with the range date in Timestamp format. For example: \r\n- 1 Day: `invoicedDate:[2022-01-01T02:00:00.000Z TO 2022-01-02T01:59:59.999Z]`\r\n- 1 Month: `invoicedDate:[2022-01-01T02:00:00.000Z TO 2022-02-01T01:59:59.999Z]` \r\n- 1 Year: `invoicedDate:[2022-01-01T02:00:00.000Z TO 2022-01-01T01:59:59.999Z]`"),
  f_creationDate: z.string().optional().describe("You can filter orders by creation date by concatenating the sufix `creationDate:` with the range date in Timestamp format. For example: \r\n- 1 Day: `creationDate:[2022-01-01T02:00:00.000Z TO 2022-01-02T01:59:59.999Z]`\r\n- 1 Month: `creationDate:[2022-01-01T02:00:00.000Z TO 2022-02-01T01:59:59.999Z]` \r\n- 1 Year: `creationDate:[2022-01-01T02:00:00.000Z TO 2022-01-01T01:59:59.999Z]`"),
  f_authorizedDate: z.string().optional().describe("You can filter orders by creation date by concatenating the sufix `authorizedDate:` with the range date in Timestamp format. For example: \r\n- 1 Day: `authorizedDate:[2022-01-01T02:00:00.000Z TO 2022-01-02T01:59:59.999Z]`\r\n- 1 Month: `authorizedDate:[2022-01-01T02:00:00.000Z TO 2022-02-01T01:59:59.999Z]` \r\n- 1 Year: `authorizedDate:[2022-01-01T02:00:00.000Z TO 2022-01-01T01:59:59.999Z]`"),
  f_UtmSource: z.string().optional().describe("You can filter orders by Urchin Tracking Module (UTM) source."),
  f_sellerNames: z.string().optional().describe("You can filter orders by using a seller's name."),
  f_callCenterOperatorName: z.string().optional().describe("You can filter orders by using a Call Center Operator's identification."),
  f_salesChannel: z.string().optional().describe("You can filter orders by sales channel's ([or trade policy](https://help.vtex.com/en/tutorial/how-trade-policies-work--6Xef8PZiFm40kg2STrMkMV)) name."),
  salesChannelId: z.string().optional().describe("You can filter orders by sales channel's ([or trade policy](https://help.vtex.com/en/tutorial/how-trade-policies-work--6Xef8PZiFm40kg2STrMkMV)) ID."),
  f_affiliateId: z.string().optional().describe("You can filter orders by affiliate ID."),
  f_status: z.string().optional().describe("You can filter orders by the following [order status](https://help.vtex.com/en/tutorial/order-flow-and-status--tutorials_196): \r\n- `waiting-for-sellers-confirmation` \r\n- `payment-pending` \r\n- `payment-approved` \r\n- `ready-for-handling` \r\n- `handling` \r\n- `invoiced` \r\n- `canceled`"),
  incompleteOrders: z.boolean().optional().describe("When set as `true`, you retrieve [incomplete orders](https://help.vtex.com/en/tutorial/understanding-incomplete-orders), when set as `false`, you retrieve orders that are not incomplete."),
  f_paymentNames: z.string().optional().describe("You can filter orders by payment type."),
  f_RnB: z.string().optional().describe("You can filter orders by rates and benefits (promotions)."),
  searchField: z.string().optional().describe("You can search orders by using one of the following criterias: \r\n- SKU ID - `sku_Ids&sku_Ids` \r\n- Gift List ID - `listId&listId` \r\n- Transaction ID (TID) - `tid&tid` \r\n- PCI Connector's Transaction ID (TID) - `pci_tid&pci_tid` \r\n- Payment ID (PID) - `paymentId&paymentId` \r\n- Connector's NSU - `nsu&nsu`"),
  f_isInstore: z.boolean().optional().describe("When set as `true`, this parameter filters orders made via [inStore](https://help.vtex.com/en/tracks/what-is-instore--zav76TFEZlAjnyBVL5tRc), and when set as `false`, it filters orders that were not made via inStore.")
}),
      handler: async (params) => {
  try {
    const url = "/api/oms/pvt/orders";
    const queryParams: Record<string, unknown> = {};
    if (params.orderBy !== undefined) queryParams["orderBy"] = params.orderBy;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.per_page !== undefined) queryParams["per_page"] = params.per_page;
    if (params.f_hasInputInvoice !== undefined) queryParams["f_hasInputInvoice"] = params.f_hasInputInvoice;
    if (params.q !== undefined) queryParams["q"] = params.q;
    if (params.f_shippingEstimate !== undefined) queryParams["f_shippingEstimate"] = params.f_shippingEstimate;
    if (params.f_invoicedDate !== undefined) queryParams["f_invoicedDate"] = params.f_invoicedDate;
    if (params.f_creationDate !== undefined) queryParams["f_creationDate"] = params.f_creationDate;
    if (params.f_authorizedDate !== undefined) queryParams["f_authorizedDate"] = params.f_authorizedDate;
    if (params.f_UtmSource !== undefined) queryParams["f_UtmSource"] = params.f_UtmSource;
    if (params.f_sellerNames !== undefined) queryParams["f_sellerNames"] = params.f_sellerNames;
    if (params.f_callCenterOperatorName !== undefined) queryParams["f_callCenterOperatorName"] = params.f_callCenterOperatorName;
    if (params.f_salesChannel !== undefined) queryParams["f_salesChannel"] = params.f_salesChannel;
    if (params.salesChannelId !== undefined) queryParams["salesChannelId"] = params.salesChannelId;
    if (params.f_affiliateId !== undefined) queryParams["f_affiliateId"] = params.f_affiliateId;
    if (params.f_status !== undefined) queryParams["f_status"] = params.f_status;
    if (params.incompleteOrders !== undefined) queryParams["incompleteOrders"] = params.incompleteOrders;
    if (params.f_paymentNames !== undefined) queryParams["f_paymentNames"] = params.f_paymentNames;
    if (params.f_RnB !== undefined) queryParams["f_RnB"] = params.f_RnB;
    if (params.searchField !== undefined) queryParams["searchField"] = params.searchField;
    if (params.f_isInstore !== undefined) queryParams["f_isInstore"] = params.f_isInstore;
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
      name: "orders_start_handling",
      description: "Start handling order\nPOST /api/oms/pvt/orders/{orderId}/start-handling",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID is a unique code that identifies an order.")
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/start-handling`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 401:
        throw new Error("[Unauthorized](https://httpstatuses.com/401)");
      case 403:
        throw new Error("[Forbidden](https://httpstatuses.com/403)");
      case 404:
        throw new Error("[Not found](https://httpstatuses.com/404)");
      case 409:
        throw new Error("[Conflict](https://httpstatuses.com/409)");
      case 429:
        throw new Error("[Too many requests](https://httpstatuses.com/429)");
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
      name: "orders_cancel_order",
      description: "Cancel order\nPOST /api/oms/pvt/orders/{orderId}/cancel",
      inputSchema: z.object({
  orderId: z.string().describe("ID that identifies the order in the seller."),
  body: z.object({ reason: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/cancel`;
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 403:
        throw new Error("[The credentials are not enabled to access the service](https://httpstatuses.com/403)");
      case 404:
        throw new Error("[Value not found](https://httpstatuses.com/404)");
      case 429:
        throw new Error("[Too many requests](https://httpstatuses.com/429)");
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
      name: "orders_register_change",
      description: "Register modifications on order\nPOST /api/oms/pvt/orders/{orderId}/changes",
      inputSchema: z.object({
  orderId: z.string().describe("ID that identifies the order in the seller."),
  body: z.object({ requestId: z.string(), reason: z.string(), discountValue: z.number().int(), incrementValue: z.number().int(), itemsRemoved: z.array(z.object({ id: z.string(), price: z.number().int(), quantity: z.number().int() })).optional(), itemsAdded: z.array(z.object({ id: z.string(), price: z.number().int(), quantity: z.number().int() })).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/changes`;
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
      name: "orders_add_log",
      description: "Add log in orders\nPOST /api/oms/pvt/orders/{orderId}/interactions",
      inputSchema: z.object({
  orderId: z.string().describe("Unique code that identifies an order."),
  body: z.object({ source: z.string(), message: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/interactions`;
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
      name: "orders_invoice_notification",
      description: "Order invoice notification\nPOST /api/oms/pvt/orders/{orderId}/invoice",
      inputSchema: z.object({
  orderId: z.string().describe("Unique code that identifies the order whose invoice is being sent."),
  body: z.object({ type: z.enum(["Output", "Input"]), issuanceDate: z.string(), invoiceNumber: z.string(), invoiceValue: z.string(), invoiceKey: z.string().optional(), invoiceUrl: z.string().optional(), embeddedInvoice: z.string().optional(), courier: z.string().optional(), trackingNumber: z.string().optional(), trackingUrl: z.string().optional(), dispatchedDate: z.string().optional(), items: z.array(z.object({ id: z.string(), price: z.number().int(), description: z.string().optional(), quantity: z.number().int() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/invoice`;
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
      name: "orders_updatepartialinvoice.send_tracking_number",
      description: "Update order's partial invoice (send tracking number)\nPATCH /api/oms/pvt/orders/{orderId}/invoice/{invoiceNumber}",
      inputSchema: z.object({
  orderId: z.string().describe("Unique code that identifies the order whose invoice is being sent."),
  invoiceNumber: z.string().describe("Number that identifies the invoice."),
  body: z.object({ trackingNumber: z.string(), trackingUrl: z.string(), dispatchedDate: z.string(), courier: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/invoice/${params.invoiceNumber}`;
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
      name: "orders_update_tracking_status",
      description: "Update order tracking status\nPUT /api/oms/pvt/orders/{orderId}/invoice/{invoiceNumber}/tracking",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID is a unique code that identifies an order."),
  invoiceNumber: z.string().describe("Number that identifies the invoice."),
  body: z.object({ isDelivered: z.boolean(), deliveredDate: z.string(), events: z.array(z.object({ city: z.string(), state: z.string(), description: z.string(), date: z.string() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/invoice/${params.invoiceNumber}/tracking`;
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
      name: "orders_get_conversation",
      description: "Retrieve order conversation\nGET /api/oms/pvt/orders/{orderId}/conversation-message",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID is a unique code that identifies an order.")
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/conversation-message`;
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
      name: "orders_get_paymenttransaction",
      description: "Retrieve payment transaction\nGET /api/oms/pvt/orders/{orderId}/payment-transaction",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID is a unique code that identifies an order.")
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/payment-transaction`;
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
      name: "orders_send_payment_notification",
      description: "Send payment notification\nPOST /api/oms/pvt/orders/{orderId}/payments/{paymentId}/payment-notification",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID is a unique code that identifies an order."),
  paymentId: z.string().describe("VTEX payment identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/pvt/orders/${params.orderId}/payments/${params.paymentId}/payment-notification`;
    const response = await http.post(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("[Bad request](https://httpstatuses.com/400)");
      case 403:
        throw new Error("[The credentials are not enabled to access the service](https://httpstatuses.com/403)");
      case 404:
        throw new Error("[Value not found](https://httpstatuses.com/404)");
      case 429:
        throw new Error("[Too many requests](https://httpstatuses.com/429)");
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
      name: "orders_getfeedorderstatus",
      description: "Get feed order status\nGET /api/oms/pvt/feed/orders/status",
      inputSchema: z.object({
  maxLot: z.string().describe("Maximum lot.")
}),
      handler: async (params) => {
  try {
    const url = "/api/oms/pvt/feed/orders/status";
    const queryParams: Record<string, unknown> = {};
    if (params.maxLot !== undefined) queryParams["maxLot"] = params.maxLot;
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
      name: "orders_get_feed_configuration",
      description: "Get feed configuration\nGET /api/orders/feed/config",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/orders/feed/config";
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
      name: "orders_feed_configuration",
      description: "Create or update feed configuration\nPOST /api/orders/feed/config",
      inputSchema: z.object({
  body: z.object({ filter: z.object({ type: z.string(), status: z.array(z.string()).optional(), expression: z.string().optional(), disableSingleFire: z.boolean().optional() }), queue: z.object({ visibilityTimeoutInSeconds: z.number().int(), MessageRetentionPeriodInSeconds: z.number().int() }) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/orders/feed/config";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 403:
        throw new Error("The credentials are not enabled to access the service");
      case 404:
        throw new Error("Value not found");
      case 429:
        throw new Error("Too many requests");
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
      name: "orders_feed_configuration_delete",
      description: "Delete feed configuration\nDELETE /api/orders/feed/config",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/orders/feed/config";
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad request - Unable to check address / Only https scheme is accepted");
      case 403:
        throw new Error("The credentials are not enabled to access the service");
      case 404:
        throw new Error("Value not found");
      case 429:
        throw new Error("Too many requests");
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
      name: "orders_getfeedorderstatus1",
      description: "Retrieve feed items\nGET /api/orders/feed",
      inputSchema: z.object({
  maxlot: z.string().describe("Lot quantity to retrieve. Maximum accepted value is 10.")
}),
      handler: async (params) => {
  try {
    const url = "/api/orders/feed";
    const queryParams: Record<string, unknown> = {};
    if (params.maxlot !== undefined) queryParams["maxlot"] = params.maxlot;
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
      name: "orders_commititemfeedorderstatus",
      description: "Commit feed items\nPOST /api/orders/feed",
      inputSchema: z.object({
  body: z.object({ handles: z.array(z.string()) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/orders/feed";
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
      name: "orders_get_hook_configuration",
      description: "Get hook configuration\nGET /api/orders/hook/config",
      inputSchema: z.object({
  clientEmail: z.string().optional().describe("Customer email."),
  page: z.string().optional().describe("Page number for result pagination."),
  per_page: z.string().optional().describe("Page quantity for result pagination.")
}),
      handler: async (params) => {
  try {
    const url = "/api/orders/hook/config";
    const queryParams: Record<string, unknown> = {};
    if (params.clientEmail !== undefined) queryParams["clientEmail"] = params.clientEmail;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.per_page !== undefined) queryParams["per_page"] = params.per_page;
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
      name: "orders_hook_configuration",
      description: "Create or update hook configuration\nPOST /api/orders/hook/config",
      inputSchema: z.object({
  body: z.object({ filter: z.object({ type: z.string(), status: z.array(z.string()).optional(), expression: z.string().optional(), disableSingleFire: z.boolean().optional() }), hook: z.object({ url: z.string(), headers: z.object({ key: z.string() }) }) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/orders/hook/config";
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
      name: "orders_delete_hook_configuration",
      description: "Delete hook configuration\nDELETE /api/orders/hook/config",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/orders/hook/config";
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 403:
        throw new Error("[The credentials are not enabled to access the service](https://httpstatuses.com/403)");
      case 404:
        throw new Error("[Value not found](https://httpstatuses.com/404)");
      case 429:
        throw new Error("[Too many requests](https://httpstatuses.com/429)");
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
      name: "orders_get_change_summary",
      description: "Get order modifications summary\nGET /api/orders/pvt/document/{orderId}/change-summary",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID.")
}),
      handler: async (params) => {
  try {
    const url = `/api/orders/pvt/document/${params.orderId}/change-summary`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 401:
        throw new Error("[Unauthorized - Invalid or missing authentication](https://httpstatuses.com/401)");
      case 403:
        throw new Error("[Forbidden - Insufficient permissions](https://httpstatuses.com/403)");
      case 404:
        throw new Error("[Order not found](https://httpstatuses.com/404)");
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
      name: "orders_userorderslist",
      description: "Retrieve user's orders\nGET /api/oms/user/orders",
      inputSchema: z.object({
  clientEmail: z.string().optional().describe("Customer email. This field is exclusive for B2C users."),
  page: z.string().optional().describe("Page number for result pagination."),
  per_page: z.string().optional().describe("Page quantity for result pagination."),
  text: z.string().optional().describe("Filter by text in existing order fields, custom fields, and contact information fields. This field is exclusive for B2B Buyer Portal users."),
  status: z.string().optional().describe("Order status. You can provide multiple values by repeating the query parameter. For example: \r\n\r\n - `status=payment-pending&status=handling` \r\n\r\n This field is exclusive for B2B Buyer Portal users."),
  creation_date: z.string().optional().describe("You can filter orders by creation date by concatenating the sufix `creationDate` with the range date in Timestamp format. This field accepts the value `*` for open ranges. For example: \r\n\r\n - `creationDate:[* TO 2025-04-08T23:59:59.999Z]` \r\n - `creationDate:[2025-01-01T02:00:00.000Z TO *]` \r\n\r\n This field is exclusive for B2B Buyer Portal users."),
  purchase_agent_id: z.string().optional().describe("ID of the purchase agent. You can provide multiple values by repeating the query parameter. For example: \r\n\r\n - `purchase_agent_id=848a994a-1b6b-4dbd-5555-0455af24e0f2&purchase_agent_id=848a994a-1b6b-4444-8498-0455af24e0f2` \r\n\r\n This field is exclusive for B2B Buyer Portal users."),
  my_pending_approvals: z.boolean().optional().describe("You can filter orders that are pending approval by the current user or by an organizational unit associated with the current user if it has `ViewMyOrgUnitOrders` permission. This field is exclusive for B2B Buyer Portal users.")
}),
      handler: async (params) => {
  try {
    const url = "/api/oms/user/orders";
    const queryParams: Record<string, unknown> = {};
    if (params.clientEmail !== undefined) queryParams["clientEmail"] = params.clientEmail;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.per_page !== undefined) queryParams["per_page"] = params.per_page;
    if (params.text !== undefined) queryParams["text"] = params.text;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.creation_date !== undefined) queryParams["creation_date"] = params.creation_date;
    if (params.purchase_agent_id !== undefined) queryParams["purchase_agent_id"] = params.purchase_agent_id;
    if (params.my_pending_approvals !== undefined) queryParams["my_pending_approvals"] = params.my_pending_approvals;
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
      name: "orders_userorderdetails",
      description: "Retrieve user order details\nGET /api/oms/user/orders/{orderId}",
      inputSchema: z.object({
  orderId: z.string().describe("Order ID is a unique code that identifies an order."),
  clientEmail: z.string().optional().describe("Customer email. This field is exclusive for B2C users."),
  text: z.string().optional().describe("Filter by text in existing order fields, custom fields, and contact information fields. This field is exclusive for B2B Buyer Portal users."),
  status: z.string().optional().describe("Order status. You can provide multiple values by repeating the query parameter. For example: \r\n\r\n - `status=payment-pending&status=handling` \r\n\r\n This field is exclusive for B2B Buyer Portal users."),
  creation_date: z.string().optional().describe("You can filter orders by creation date by concatenating the sufix `creationDate` with the range date in Timestamp format. This field accepts the value `*` for open ranges. For example: \r\n\r\n - `creationDate:[* TO 2025-04-08T23:59:59.999Z]` \r\n - `creationDate:[2025-01-01T02:00:00.000Z TO *]` \r\n\r\n This field is exclusive for B2B Buyer Portal users."),
  purchase_agent_id: z.string().optional().describe("ID of the purchase agent. You can provide multiple values by repeating the query parameter. For example: \r\n\r\n - `purchase_agent_id=848a994a-1b6b-4dbd-5555-0455af24e0f2&purchase_agent_id=848a994a-1b6b-4444-8498-0455af24e0f2` \r\n\r\n This field is exclusive for B2B Buyer Portal users."),
  my_pending_approvals: z.boolean().optional().describe("You can filter orders that are pending approval by the current user or by an organizational unit associated with the current user if it has `ViewMyOrgUnitOrders` permission. This field is exclusive for B2B Buyer Portal users.")
}),
      handler: async (params) => {
  try {
    const url = `/api/oms/user/orders/${params.orderId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.clientEmail !== undefined) queryParams["clientEmail"] = params.clientEmail;
    if (params.text !== undefined) queryParams["text"] = params.text;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.creation_date !== undefined) queryParams["creation_date"] = params.creation_date;
    if (params.purchase_agent_id !== undefined) queryParams["purchase_agent_id"] = params.purchase_agent_id;
    if (params.my_pending_approvals !== undefined) queryParams["my_pending_approvals"] = params.my_pending_approvals;
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
      name: "orders_test_jso_nata_expression",
      description: "Test JSONata expression\nPOST /api/orders/expressions/jsonata",
      inputSchema: z.object({
  body: z.object({ Expression: z.string(), Document: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/orders/expressions/jsonata";
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
      name: "orders_get_window_to_change_seller",
      description: "Get window to change seller\nGET /api/checkout/pvt/configuration/window-to-change-seller",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pvt/configuration/window-to-change-seller";
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
      name: "orders_update_window_to_change_seller",
      description: "Update window to change seller\nPOST /api/checkout/pvt/configuration/window-to-change-seller",
      inputSchema: z.object({
  body: z.object({ waitingTime: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pvt/configuration/window-to-change-seller";
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
      name: "orders_createchange",
      description: "Create order modifications\nPATCH /api/order-system/orders/{changeOrderId}/changes",
      inputSchema: z.object({
  changeOrderId: z.string().describe("Order ID of the order you wish to modify."),
  accountName: z.string().describe("Name of the VTEX account that created the order."),
  body: z.object({ reason: z.string(), replace: z.array(z.object({ from: z.object({ items: z.array(z.object({ id: z.string(), uniqueId: z.string().optional(), quantity: z.number().int(), price: z.number().int().optional() })), customData: z.object({ customFields: z.array(z.object({ linkedEntity: z.object({ type: z.string().optional(), id: z.string().optional() }).optional(), fields: z.array(z.object({ name: z.string().optional(), value: z.string().optional() })).optional() })).optional() }).optional() }), to: z.object({ items: z.array(z.object({ id: z.string(), uniqueId: z.string().optional(), quantity: z.number().int(), measurementUnit: z.string().optional(), unitMultiplier: z.number().optional(), manualDiscountValue: z.number().int().optional(), manualIncrementValue: z.number().int().optional(), clientProfileData: z.array(z.object({ firstName: z.string().optional(), lastName: z.string().optional(), documentType: z.string().optional(), document: z.string().optional(), phone: z.string().optional(), corporateName: z.string().optional(), tradeName: z.string().optional(), corporateDocument: z.string().optional(), stateInscription: z.string().optional(), corporatePhone: z.string().optional(), isCorporate: z.boolean().optional() })).optional() })), customData: z.object({ customFields: z.array(z.object({ linkedEntity: z.object({ type: z.string().optional(), id: z.string().optional() }).optional(), fields: z.array(z.object({ name: z.string().optional(), value: z.string().optional() })).optional() })).optional() }).optional(), shippingData: z.object({ logisticsInfo: z.array(z.object({ itemIndex: z.number().int(), selectedSla: z.string(), selectedDeliveryChannel: z.enum(["delivery", "pickup-in-point"]), addressId: z.string(), price: z.number().int() })) }).optional() }) })).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/order-system/orders/${params.changeOrderId}/changes`;
    const queryParams: Record<string, unknown> = {};
    if (params.accountName !== undefined) queryParams["accountName"] = params.accountName;
    const response = await http.patch(url, params.body, { params: queryParams });
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
      name: "orders_get_change_history",
      description: "Get order modifications history\nGET /api/order-system/orders/{changeOrderId}/changes",
      inputSchema: z.object({
  changeOrderId: z.string().describe("Order ID of the order you wish to get the modifications history."),
  an: z.string().describe("Name of the VTEX account that created the order.")
}),
      handler: async (params) => {
  try {
    const url = `/api/order-system/orders/${params.changeOrderId}/changes`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
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
      name: "orders_get_change_detail",
      description: "Get order modifications details\nGET /api/order-system/orders/{changeOrderId}/changes/{changeRequestId}",
      inputSchema: z.object({
  changeOrderId: z.string().describe("Order ID of the order you wish to get the modification detail."),
  changeRequestId: z.string().describe("Once you make an order modification, you generate a `requestId` code that identifies the modifications made to that order. This field should be filled with that code. There are no limits to modifications you can perform using the same `changeRequestId`, and we recommend keeping all modifications of a given order grouped by the same `changeRequestId`, so you will have a unified modification history."),
  an: z.string().describe("Name of the VTEX account that created the order.")
}),
      handler: async (params) => {
  try {
    const url = `/api/order-system/orders/${params.changeOrderId}/changes/${params.changeRequestId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
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
      name: "orders_preview_change",
      description: "Preview order modifications\nPOST /api/order-system/orders/{changeOrderId}/changes/preview",
      inputSchema: z.object({
  changeOrderId: z.string().describe("Order ID of the order you wish to preview modification."),
  an: z.string().describe("Name of the VTEX account that created the order."),
  body: z.object({ reason: z.string(), replace: z.array(z.object({ from: z.object({ items: z.array(z.object({ id: z.string(), uniqueId: z.string().optional(), quantity: z.number().int(), price: z.number().int().optional() })), customData: z.object({ customFields: z.array(z.object({ linkedEntity: z.object({ type: z.string().optional(), id: z.string().optional() }).optional(), fields: z.array(z.object({ name: z.string().optional(), value: z.string().optional() })).optional() })).optional() }).optional() }), to: z.object({ items: z.array(z.object({ id: z.string(), uniqueId: z.string().optional(), quantity: z.number().int(), measurementUnit: z.string().optional(), unitMultiplier: z.number().optional(), manualDiscountValue: z.number().int().optional(), manualIncrementValue: z.number().int().optional(), clientProfileData: z.array(z.object({ firstName: z.string().optional(), lastName: z.string().optional(), documentType: z.string().optional(), document: z.string().optional(), phone: z.string().optional(), corporateName: z.string().optional(), tradeName: z.string().optional(), corporateDocument: z.string().optional(), stateInscription: z.string().optional(), corporatePhone: z.string().optional(), isCorporate: z.boolean().optional() })).optional() })), customData: z.object({ customFields: z.array(z.object({ linkedEntity: z.object({ type: z.string().optional(), id: z.string().optional() }).optional(), fields: z.array(z.object({ name: z.string().optional(), value: z.string().optional() })).optional() })).optional() }).optional(), shippingData: z.object({ logisticsInfo: z.array(z.object({ itemIndex: z.number().int(), selectedSla: z.string(), selectedDeliveryChannel: z.enum(["delivery", "pickup-in-point"]), addressId: z.string(), price: z.number().int() })) }).optional() }) })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/order-system/orders/${params.changeOrderId}/changes/preview`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
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
      name: "orders_retry_change",
      description: "Retry order modifications\nPOST /api/order-system/orders/{changeOrderId}/changes/{changeRequestId}/retry",
      inputSchema: z.object({
  changeOrderId: z.string().describe("Order ID of the order you wish to retry modification."),
  changeRequestId: z.string().describe("Once you make an order modification, you generate a `requestId` code that identifies the modifications made to that order. This field should be filled with that code.\r\n\r\nThere are no limits to modifications you can perform using the same `changeRequestId`, and we recommend keeping all modifications of a given order grouped by the same `changeRequestId`, so you will have a unified modification history."),
  an: z.string().describe("Name of the VTEX account that created the order."),
  body: z.object({ reason: z.string(), replace: z.array(z.object({ from: z.object({ items: z.array(z.object({ id: z.string(), uniqueId: z.string().optional(), quantity: z.number().int(), price: z.number().int().optional() })), customData: z.object({ customFields: z.array(z.object({ linkedEntity: z.object({ type: z.string().optional(), id: z.string().optional() }).optional(), fields: z.array(z.object({ name: z.string().optional(), value: z.string().optional() })).optional() })).optional() }).optional() }), to: z.object({ items: z.array(z.object({ id: z.string(), uniqueId: z.string().optional(), quantity: z.number().int(), measurementUnit: z.string().optional(), unitMultiplier: z.number().optional(), manualDiscountValue: z.number().int().optional(), manualIncrementValue: z.number().int().optional(), clientProfileData: z.array(z.object({ firstName: z.string().optional(), lastName: z.string().optional(), documentType: z.string().optional(), document: z.string().optional(), phone: z.string().optional(), corporateName: z.string().optional(), tradeName: z.string().optional(), corporateDocument: z.string().optional(), stateInscription: z.string().optional(), corporatePhone: z.string().optional(), isCorporate: z.boolean().optional() })).optional() })), customData: z.object({ customFields: z.array(z.object({ linkedEntity: z.object({ type: z.string().optional(), id: z.string().optional() }).optional(), fields: z.array(z.object({ name: z.string().optional(), value: z.string().optional() })).optional() })).optional() }).optional(), shippingData: z.object({ logisticsInfo: z.array(z.object({ itemIndex: z.number().int(), selectedSla: z.string(), selectedDeliveryChannel: z.enum(["delivery", "pickup-in-point"]), addressId: z.string(), price: z.number().int() })) }).optional() }) })).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/order-system/orders/${params.changeOrderId}/changes/${params.changeRequestId}/retry`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
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
      name: "orders_cancel_change_stoppedon_error",
      description: "Cancel order modifications\nPOST /api/order-system/orders/{changeOrderId}/changes/{changeRequestId}/cancel",
      inputSchema: z.object({
  changeOrderId: z.string().describe("Order ID of the order with the modifications you wish to cancel."),
  changeRequestId: z.string().describe("Once you make an order modification, you generate a `requestId` code that identifies the modifications made to that order. This field should be filled with that code. After cancelling an order modification, the `changeRequestId` will no longer be valid."),
  an: z.string().describe("Name of the VTEX account that created the order."),
  body: z.object({ reason: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/order-system/orders/${params.changeOrderId}/changes/${params.changeRequestId}/cancel`;
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
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
      name: "orders_put_api_order_system_orders_changes_settings",
      description: "Update Order modifications settings\nPUT /api/order-system/orders/changes/settings",
      inputSchema: z.object({
  an: z.string().describe("VTEX [account name](https://help.vtex.com/en/tutorial/what-is-an-account-name--i0mIGLcg3QyEy8OCicEoC)."),
  body: z.object({ paymentConfiguration: z.object({ customPaymentSystemsAllowed: z.array(z.string()).optional() }).optional(), rolloutConfiguration: z.object({ enableApi: z.boolean().default(false).optional(), enableAdminOrders: z.object({ enabledWorkspaces: z.array(z.string()).optional() }).optional(), enableMyOrders: z.object({ enabledWorkspaces: z.array(z.string()).optional() }).optional() }).optional(), pipelineConfiguration: z.object({ enableTaxHubRecalculation: z.boolean().default(false).optional(), compensateShippingChanges: z.boolean().default(false).optional() }).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/order-system/orders/changes/settings";
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
    const response = await http.put(url, params.body, { params: queryParams });
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
      name: "orders_get_api_order_system_orders_changes_settings",
      description: "Get Order modifications settings\nGET /api/order-system/orders/changes/settings",
      inputSchema: z.object({
  an: z.string().describe("VTEX [account name](https://help.vtex.com/en/tutorial/what-is-an-account-name--i0mIGLcg3QyEy8OCicEoC).")
}),
      handler: async (params) => {
  try {
    const url = "/api/order-system/orders/changes/settings";
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
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
