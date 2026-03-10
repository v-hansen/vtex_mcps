import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "checkout_cart_simulation",
      description: "Cart simulation\nPOST /api/checkout/pub/orderForms/simulation",
      inputSchema: z.object({
  RnbBehavior: z.number().int().optional().describe("This parameter defines which promotions apply to the simulation. Use `0` for simulations at cart stage, which means all promotions apply. In case of window simulation use `1`, which indicates promotions that apply nominal discounts over the total purchase value shouldn't be considered on the simulation.\n\r\n\rNote that if this not sent, the parameter is `1`."),
  sc: z.number().int().optional().describe("Trade Policy (Sales Channel) identification."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ items: z.array(z.object({ id: z.string(), quantity: z.number().int(), seller: z.string() })).optional(), country: z.string().optional(), postalCode: z.string().optional(), geoCoordinates: z.array(z.number()).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pub/orderForms/simulation";
    const queryParams: Record<string, unknown> = {};
    if (params.RnbBehavior !== undefined) queryParams["RnbBehavior"] = params.RnbBehavior;
    if (params.sc !== undefined) queryParams["sc"] = params.sc;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_create_a_new_cart",
      description: "Get current or create a new cart\nGET /api/checkout/pub/orderForm",
      inputSchema: z.object({
  forceNewCart: z.boolean().optional().describe("Use this query parameter to create a new empty shopping cart."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pub/orderForm";
    const queryParams: Record<string, unknown> = {};
    if (params.forceNewCart !== undefined) queryParams["forceNewCart"] = params.forceNewCart;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_get_cart_information_by_id",
      description: "Get cart information by ID\nGET /api/checkout/pub/orderForm/{orderFormId}",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm corresponding to the cart whose information you want to retrieve."),
  refreshOutdatedData: z.boolean().optional().describe("It is possible to use the [Update cart items request](https://developers.vtex.com/vtex-rest-api/reference/cart-update#itemsupdate) so as to allow outdated information in the `orderForm`, which may improve performance in some cases. To guarantee that all cart information is updated, send this request with this parameter as `true`. We recommend doing this in the final stages of the shopping experience, starting from the checkout page."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.refreshOutdatedData !== undefined) queryParams["refreshOutdatedData"] = params.refreshOutdatedData;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_remove_all_items",
      description: "Remove all items from shopping cart\nPOST /api/checkout/pub/orderForm/{orderFormId}/items/removeAll",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm corresponding to the cart whose items you want to remove."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({}).default({}).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/items/removeAll`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_removeallpersonaldata",
      description: "Remove all personal data from shopping cart\nGET /checkout/changeToAnonymousUser/{orderFormId}",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm corresponding to the cart whose user's personal data you want to remove."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = `/checkout/changeToAnonymousUser/${params.orderFormId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_items_update",
      description: "Update cart items\nPOST /api/checkout/pub/orderForm/{orderFormId}/items/update",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the `orderForm` corresponding to the cart whose items you want to update."),
  allowedOutdatedData: z.array(z.string()).optional().describe("In order to optimize performance, this parameter allows some information to not be updated when there are changes in the minicart. For instance, if a shopper adds another unit of a given SKU to the cart, it may not be necessary to recalculate payment information, which could impact performance.\n\r\n\rThis array accepts strings and currently the only possible value is `”paymentData”`."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ orderItems: z.array(z.object({ quantity: z.number().int().optional(), index: z.number().int().optional() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/items/update`;
    const queryParams: Record<string, unknown> = {};
    if (params.allowedOutdatedData !== undefined) queryParams["allowedOutdatedData"] = params.allowedOutdatedData;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_items",
      description: "Add cart items\nPOST /api/checkout/pub/orderForm/{orderFormId}/items",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm corresponding to the cart in which the new item will be added."),
  allowedOutdatedData: z.array(z.string()).optional().describe("In order to optimize performance, this parameter allows some information to not be updated when there are changes in the minicart. For instance, if a shopper adds another unit of a given SKU to the cart, it may not be necessary to recalculate payment information, which could impact performance.\n\r\n\rThis array accepts strings and currently the only possible value is `”paymentData”`."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ orderItems: z.array(z.object({ quantity: z.number().int(), seller: z.string(), id: z.string(), index: z.number().int(), price: z.number().int().optional() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/items`;
    const queryParams: Record<string, unknown> = {};
    if (params.allowedOutdatedData !== undefined) queryParams["allowedOutdatedData"] = params.allowedOutdatedData;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_items_handle",
      description: "Handle cart items\nPATCH /api/checkout/pub/orderForm/{orderFormId}/items",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm corresponding to the cart in which items will be handled."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ orderItems: z.array(z.object({ id: z.string(), quantity: z.number().int(), seller: z.string(), index: z.number().int().optional(), price: z.number().int().optional(), attachments: z.array(z.object({ name: z.string().optional(), content: z.object({ content: z.string().optional() }).optional() })).optional(), noSplitItem: z.boolean().optional(), allowedOutdatedData: z.array(z.string()).optional() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/items`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_price_change",
      description: "Change price of an SKU in a cart\nPUT /api/checkout/pub/orderForm/{orderFormId}/items/{itemIndex}/price",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm corresponding to the cart whose items will have the price changed."),
  itemIndex: z.string().describe("The index of the item in the cart. Each cart item is identified by an index, starting in 0."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ price: z.number().int() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/items/${params.itemIndex}/price`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_ignore_profile_data",
      description: "Ignore profile data on checkout\nPATCH /api/checkout/pub/orderForm/{orderFormId}/profile",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm corresponding to the cart whose items will have the price changed."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ ignoreProfileData: z.boolean().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/profile`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_get_client_profile_by_email",
      description: "Get client profile by email\nGET /api/checkout/pub/profiles",
      inputSchema: z.object({
  email: z.string().describe("Client's email address to be searched."),
  ensureComplete: z.boolean().optional().describe("Indicates whether the returned profiles must be complete or not."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pub/profiles";
    const queryParams: Record<string, unknown> = {};
    if (params.email !== undefined) queryParams["email"] = params.email;
    if (params.ensureComplete !== undefined) queryParams["ensureComplete"] = params.ensureComplete;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_add_client_profile",
      description: "Add client profile\nPOST /api/checkout/pub/orderForm/{orderFormId}/attachments/clientProfileData",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive client profile information."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ email: z.string(), firstName: z.string(), lastName: z.string(), documentType: z.string(), document: z.string(), phone: z.string().optional(), corporateName: z.string().optional(), tradeName: z.string().optional(), corporateDocument: z.string().optional(), stateInscription: z.string().optional(), corporatePhone: z.string().optional(), isCorporate: z.boolean().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/clientProfileData`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_add_shipping_address",
      description: "Add shipping address and select delivery option\nPOST /api/checkout/pub/orderForm/{orderFormId}/attachments/shippingData",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive client profile information."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ clearAddressIfPostalCodeNotFound: z.boolean().optional(), selectedAddresses: z.array(z.object({ addressType: z.string().optional(), receiverName: z.string().optional(), addressId: z.string().optional(), postalCode: z.string().optional(), city: z.string().optional(), state: z.string().optional(), country: z.string().optional(), street: z.string().optional(), number: z.string().optional(), neighborhood: z.string().optional(), complement: z.string().optional(), reference: z.string().optional(), geoCoordinates: z.array(z.number()).optional() })).optional(), logisticsInfo: z.array(z.object({ itemIndex: z.number().int().optional(), selectedDeliveryChannel: z.string().optional(), selectedSla: z.string().optional() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/shippingData`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_add_client_preferences",
      description: "Add client preferences\nPOST /api/checkout/pub/orderForm/{orderFormId}/attachments/clientPreferencesData",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive client profile information."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ locale: z.string().optional(), optinNewsLetter: z.boolean().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/clientPreferencesData`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_add_marketing_data",
      description: "Add marketing data\nPOST /api/checkout/pub/orderForm/{orderFormId}/attachments/marketingData",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive client profile information."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ coupon: z.string().optional(), marketingTags: z.array(z.string()).optional(), utmSource: z.string().optional(), utmMedium: z.string().optional(), utmCampaign: z.string().optional(), utmiPage: z.string().optional(), utmiPart: z.string().optional(), utmiCampaign: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/marketingData`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_add_payment_data",
      description: "Add payment data\nPOST /api/checkout/pub/orderForm/{orderFormId}/attachments/paymentData",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive client profile information."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ payments: z.array(z.object({ paymentSystem: z.number().int().optional(), paymentSystemName: z.string().optional(), group: z.string().optional(), installments: z.number().int().optional(), installmentsInterestRate: z.number().optional(), installmentsValue: z.number().int().optional(), value: z.number().int().optional(), referenceValue: z.number().int().optional(), hasDefaultBillingAddress: z.boolean().optional() })).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/paymentData`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_add_merchant_context_data",
      description: "Add merchant context data\nPOST /api/checkout/pub/orderForm/{orderFormId}/attachments/merchantContextData",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive the relevant information added by the merchant."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ salesAssociateData: z.object({ salesAssociateId: z.string().optional() }) })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/merchantContextData`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_post_api_checkout_pub_order_form_by_order_form_id_attachments_invoice_data",
      description: "Attach invoice data\nPOST /api/checkout/pub/orderForm/{orderFormId}/attachments/invoiceData",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the `orderForm` that will receive the invoice data."),
  body: z.object({ address: z.object({ addressType: z.string().optional(), city: z.string().optional(), complement: z.string().optional(), country: z.string().optional(), geoCoordinates: z.array(z.number()), neighborhood: z.string().optional(), number: z.string().optional(), postalCode: z.string(), reference: z.string().optional(), state: z.string().optional(), street: z.string().optional() }) })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/attachments/invoiceData`;
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
      name: "checkout_set_multiple_custom_field_values",
      description: "Set multiple custom field values\nPUT /api/checkout/pub/orderForm/{orderFormId}/customData/{appId}",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive the new custom field values."),
  appId: z.string().describe("ID of the app created with the configuration API."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({})
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/customData/${params.appId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_set_single_custom_field_value",
      description: "Set single custom field value\nPUT /api/checkout/pub/orderForm/{orderFormId}/customData/{appId}/{appFieldName}",
      inputSchema: z.object({
  orderFormId: z.string().describe("The ID of the orderForm whose custom field's value you want to change."),
  appId: z.string().describe("ID of the app created through the Update orderForm Configuration endpoint."),
  appFieldName: z.string().describe("Name of the app's field created through the Update orderForm Configuration endpoint."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ value: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/customData/${params.appId}/${params.appFieldName}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_removesinglecustomfieldvalue",
      description: "Remove single custom field value\nDELETE /api/checkout/pub/orderForm/{orderFormId}/customData/{appId}/{appFieldName}",
      inputSchema: z.object({
  orderFormId: z.string().describe("The ID of the orderForm from which you want to remove the custom field value."),
  appId: z.string().describe("ID of the app created through the Update orderForm Configuration endpoint."),
  appFieldName: z.string().describe("Name of the app's field created through the Update orderForm Configuration endpoint and which will be deleted."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/customData/${params.appId}/${params.appFieldName}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
    const response = await http.delete(url, { params: queryParams });
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
      name: "checkout_put_api_checkout_pub_order_form_by_order_form_id_custom_fields",
      description: "Batch add custom fields\nPUT /api/checkout/pub/orderForm/{orderFormId}/customFields",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive the new custom fields."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.array(z.object({ linkedEntity: z.object({ type: z.enum(["order", "item", "address"]), id: z.string().optional() }), fields: z.array(z.object({ name: z.string(), value: z.string(), refId: z.string().optional() })) }))
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/customFields`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_put_api_checkout_pub_order_form_by_order_form_id_custom_fields_order",
      description: "Add order custom field\nPUT /api/checkout/pub/orderForm/{orderFormId}/customFields/order",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ name: z.string(), value: z.string(), refId: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/customFields/order`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_put_api_checkout_pub_order_form_by_order_form_id_custom_fields_item_by_item_id",
      description: "Add item custom field\nPUT /api/checkout/pub/orderForm/{orderFormId}/customFields/item/{itemId}",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm."),
  itemId: z.string().describe("Unique ID of the item in the cart. This ID is generated by VTEX and is used to identify the item in the cart."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ name: z.string(), value: z.string(), refId: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/customFields/item/${params.itemId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_delete_api_checkout_pub_order_form_by_order_form_id_custom_fields_item_by_item_id",
      description: "Remove item custom field\nDELETE /api/checkout/pub/orderForm/{orderFormId}/customFields/item/{itemId}",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm."),
  itemId: z.string().describe("Unique ID of the item in the cart. This ID is generated by VTEX and is used to identify the item in the cart."),
  fieldName: z.string().describe("Name of the custom field to remove."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/customFields/item/${params.itemId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
    const response = await http.delete(url, { params: queryParams });
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
      name: "checkout_put_api_checkout_pub_order_form_by_order_form_id_custom_fields_address_by_address_id",
      description: "Add address custom field\nPUT /api/checkout/pub/orderForm/{orderFormId}/customFields/address/{addressId}",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm."),
  addressId: z.string().describe("ID of the address."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ name: z.string(), value: z.string(), refId: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/customFields/address/${params.addressId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_getorder_formconfiguration",
      description: "Get order form configuration\nGET /api/checkout/pvt/configuration/orderForm",
      inputSchema: z.object({
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pvt/configuration/orderForm";
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_updateorder_formconfiguration",
      description: "Update order form configuration\nPOST /api/checkout/pvt/configuration/orderForm",
      inputSchema: z.object({
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ paymentConfiguration: z.object({ requiresAuthenticationForPreAuthorizedPaymentOption: z.boolean(), allowInstallmentsMerge: z.boolean().optional(), blockPaymentSession: z.boolean().optional() }), taxConfiguration: z.object({ url: z.string().optional(), authorizationHeader: z.string().optional(), appId: z.string().optional(), isMarketplaceResponsibleForTaxes: z.unknown().optional() }), minimumQuantityAccumulatedForItems: z.number().int(), decimalDigitsPrecision: z.number().int(), minimumValueAccumulated: z.number().int(), apps: z.array(z.object({ id: z.string().optional(), fields: z.array(z.string()).optional(), major: z.number().int().optional() })), allowMultipleDeliveries: z.boolean(), allowManualPrice: z.boolean(), maxNumberOfWhiteLabelSellers: z.number().int().optional(), maskFirstPurchaseData: z.boolean().optional(), maskStateOnAddress: z.boolean().default(true).optional(), recaptchaValidation: z.string().optional(), paymentSystemToCheckFirstInstallment: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pvt/configuration/orderForm";
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_get_window_to_change_seller",
      description: "Get window to change seller\nGET /api/checkout/pvt/configuration/window-to-change-seller",
      inputSchema: z.object({
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pvt/configuration/window-to-change-seller";
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_update_window_to_change_seller",
      description: "Update window to change seller\nPOST /api/checkout/pvt/configuration/window-to-change-seller",
      inputSchema: z.object({
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ waitingTime: z.number().int() })
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pvt/configuration/window-to-change-seller";
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_clearorder_form_messages",
      description: "Clear order form messages\nPOST /api/checkout/pub/orderForm/{orderFormId}/messages/clear",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm corresponding to the cart whose messages you want to remove."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({}).default({}).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/messages/clear`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_get_cart_installments",
      description: "Cart installments\nGET /api/checkout/pub/orderForm/{orderFormId}/installments",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the `orderForm` to be consulted for installments."),
  paymentSystem: z.number().int().describe("ID of the payment method to be consulted for installments."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/installments`;
    const queryParams: Record<string, unknown> = {};
    if (params.paymentSystem !== undefined) queryParams["paymentSystem"] = params.paymentSystem;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_add_coupons",
      description: "Add coupons to the cart\nPOST /api/checkout/pub/orderForm/{orderFormId}/coupons",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the orderForm that will receive coupon information."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ text: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/coupons`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_list_pickup_ppoints_by_location",
      description: "List pickup points by location\nGET /api/checkout/pub/pickup-points",
      inputSchema: z.object({
  geoCoordinates: z.string().optional().describe("Geocoordinates (first longitude, then latitude) around which to search for pickup points. If you use this type of search, do not pass postal and country codes."),
  postalCode: z.string().optional().describe("Postal code around which to search for pickup points. If you use this type of search, make sure to pass a `countryCode` and do not pass `geoCoordinates`."),
  countryCode: z.string().optional().describe("Three letter country code refering to the `postalCode` field. Pass the country code only if you are searching pickup points by postal code."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pub/pickup-points";
    const queryParams: Record<string, unknown> = {};
    if (params.geoCoordinates !== undefined) queryParams["geoCoordinates"] = params.geoCoordinates;
    if (params.postalCode !== undefined) queryParams["postalCode"] = params.postalCode;
    if (params.countryCode !== undefined) queryParams["countryCode"] = params.countryCode;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_get_address_by_postal_code",
      description: "Get address by postal code\nGET /api/checkout/pub/postal-code/{countryCode}/{postalCode}",
      inputSchema: z.object({
  countryCode: z.string().describe("Three letter country code refering to the `postalCode` field."),
  postalCode: z.string().describe("Postal code."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/postal-code/${params.countryCode}/${params.postalCode}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_place_order_from_existing_order_form",
      description: "Place order from an existing cart\nPOST /api/checkout/pub/orderForm/{orderFormId}/transaction",
      inputSchema: z.object({
  orderFormId: z.string().describe("ID of the `orderForm` corresponding to the cart from which to place the order."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ referenceId: z.string(), savePersonalData: z.boolean().optional(), optinNewsLetter: z.boolean().optional(), value: z.number().int(), referenceValue: z.number().int(), interestValue: z.number().int() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/orderForm/${params.orderFormId}/transaction`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_place_order",
      description: "Place order\nPUT /api/checkout/pub/orders",
      inputSchema: z.object({
  sc: z.number().int().optional().describe("Trade Policy (Sales Channel) identification. This query can be used to create an order for a specific sales channel."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`."),
  body: z.object({ items: z.array(z.object({ id: z.string(), quantity: z.number().int(), seller: z.string(), commission: z.number().int().optional(), freightCommission: z.number().int().optional(), price: z.number().int().optional(), bundleItems: z.array(z.object({ type: z.string().optional(), id: z.string().optional(), name: z.string().optional(), price: z.number().int().optional() })).optional(), itemAttachment: z.object({ name: z.string().optional(), content: z.string().optional() }).optional(), attachments: z.array(z.string()).optional(), priceTags: z.array(z.object({ identifier: z.string().optional(), isPercentual: z.boolean().optional(), name: z.string().optional(), rawValue: z.number().optional(), value: z.number().int().optional() })).optional(), measurementUnit: z.string().optional(), unitMultiplier: z.number().int().optional(), isGift: z.boolean().optional() })), clientProfileData: z.object({ email: z.string(), firstName: z.string().optional(), lastName: z.string().optional(), documentType: z.string().optional(), document: z.string().optional(), phone: z.string().optional(), corporateName: z.string().optional(), tradeName: z.string().optional(), corporateDocument: z.string().optional(), stateInscription: z.string().optional(), corporatePhone: z.string().optional(), isCorporate: z.boolean().optional() }), shippingData: z.object({ address: z.object({ addressType: z.string().optional(), receiverName: z.string().optional(), addressId: z.string().optional(), postalCode: z.string().optional(), city: z.string().optional(), state: z.string().optional(), country: z.string().optional(), street: z.string().optional(), number: z.string().optional(), neighborhood: z.string().optional(), complement: z.string().optional(), reference: z.string().optional(), geoCoordinates: z.array(z.number()).optional() }).optional(), logisticsInfo: z.array(z.object({ itemIndex: z.number().int(), selectedSla: z.string(), selectedDeliveryChannel: z.string().optional(), lockTTL: z.string().optional(), shippingEstimate: z.string().optional(), price: z.number().int(), deliveryWindow: z.object({ startDateUtc: z.string().optional(), endDateUtc: z.string().optional(), price: z.number().int().optional(), lisPrice: z.number().int().optional(), tax: z.number().int().optional() }).optional() })).optional(), updateStatus: z.string().optional() }), paymentData: z.object({ giftCards: z.array(z.object({ redemptionCode: z.string(), value: z.number().int(), balance: z.number().int().optional(), name: z.string().optional(), id: z.string().optional(), inUse: z.boolean().optional(), isSpecialCard: z.boolean().optional() })).optional(), giftCardMessages: z.array(z.string()).optional(), paymentSystems: z.array(z.object({ id: z.number().int().optional(), name: z.string().optional(), groupName: z.string().optional(), validator: z.object({ regex: z.string().optional(), mask: z.string().optional(), cardCodeRegex: z.string().optional(), cardCodeMask: z.string().optional(), weights: z.array(z.number().int()).optional() }).optional(), stringId: z.string().optional(), template: z.string().optional(), requiresDocument: z.boolean().optional(), selected: z.boolean().optional(), isCustom: z.boolean().optional(), description: z.string().optional() })).optional(), payments: z.array(z.object({ accountId: z.string().optional(), bin: z.string().optional(), installments: z.number().int(), paymentSystem: z.number().int(), referenceValue: z.number().int(), value: z.number().int() })), updateStatus: z.string().optional() }), marketingData: z.object({ coupon: z.string().optional(), utmSource: z.string().optional(), utmMedium: z.string().optional(), utmCampaign: z.string().optional(), utmiPage: z.string().optional(), utmiPart: z.string().optional(), utmiCampaign: z.string().optional() }).optional(), openTextField: z.string().optional(), salesAssociateData: z.object({ salesAssociateId: z.string().optional() }).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/checkout/pub/orders";
    const queryParams: Record<string, unknown> = {};
    if (params.sc !== undefined) queryParams["sc"] = params.sc;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
      name: "checkout_process_order",
      description: "Process order\nPOST /api/checkout/pub/gatewayCallback/{orderGroup}",
      inputSchema: z.object({
  orderGroup: z.string().describe("Order group. It is the part of the `orderId` that comes before the `-`. For example, the `orderGroup` of the order `123456789-01` is `123456789`."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/gatewayCallback/${params.orderGroup}`;
    const queryParams: Record<string, unknown> = {};
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
    const response = await http.post(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 428:
        throw new Error("Precondition Required\r\n\r\nUsed to indicate that a payment redirection flow is required to complete the order.");
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
      name: "checkout_get_sellers_by_region",
      description: "Get sellers by region or address\nGET /api/checkout/pub/regions/{regionId}",
      inputSchema: z.object({
  regionId: z.string().describe("ID of the region corresponding to the shopper's location."),
  country: z.string().describe("Three letter country code refering to the `postalCode` field."),
  postalCode: z.string().optional().describe("Postal code corresponding to the shopper's location."),
  geoCoordinates: z.array(z.number()).optional().describe("Geocoordinates (first longitude, semicolon, then latitude) corresponding to the shopper's location."),
  individualShippingEstimates: z.boolean().optional().describe("Shows the product's estimated shipping date in the `shippingEstimate` field from the `orderForm`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/checkout/pub/regions/${params.regionId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.country !== undefined) queryParams["country"] = params.country;
    if (params.postalCode !== undefined) queryParams["postalCode"] = params.postalCode;
    if (params.geoCoordinates !== undefined) queryParams["geoCoordinates"] = params.geoCoordinates;
    if (params.individualShippingEstimates !== undefined) queryParams["individualShippingEstimates"] = params.individualShippingEstimates;
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
