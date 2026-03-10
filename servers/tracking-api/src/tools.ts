import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "tracking_post_auth",
      description: "Asynchronous login\nPOST /auth",
      inputSchema: z.object({
  body: z.object({ username: z.string(), password: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/auth";
    const response = await http.post(url, params.body);
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
      name: "tracking_put_services",
      description: "Remove packing list\nPUT /services",
      inputSchema: z.object({
  body: z.array(z.object({ invoice: z.string().optional(), serie: z.string().optional() })).optional()
}),
      handler: async (params) => {
  try {
    const url = "/services";
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
      name: "tracking_post_services",
      description: "Post delivery service\nPOST /services",
      inputSchema: z.object({
  body: z.array(z.object({ deliveryServiceType: z.string().min(0).max(11).optional(), idExternalShipperCustomer: z.string().min(0).max(30).optional(), shipperCustomer: z.object({ legalType: z.string().min(2).max(2), email: z.string().min(0).max(254).optional(), firstName: z.string().min(0).max(100).optional(), lastName: z.string().min(0).max(100).optional(), cpf: z.string().min(0).max(50).optional(), addressStreet: z.string().min(0).max(150), addressNumber: z.string().min(0).max(50).optional(), addressComplement: z.string().min(0).max(50).optional(), addressNeighborhood: z.string().min(0).max(150).optional(), addressCity: z.string().min(0).max(100).optional(), postalCode: z.string().min(0).max(9), state: z.string().min(2).max(2).optional(), companyName: z.string().min(0).max(150).optional(), cnpj: z.string().min(0).max(50).optional(), idExternalShipperCustomer: z.string().min(0).max(30).optional(), phoneAreaCode: z.string().min(0).max(3).optional(), phoneNumber: z.string().min(0).max(12).optional() }).optional(), invoiceOrderOfService: z.string().optional(), invoiceOrderOfServiceSerie: z.string().min(0).max(3).optional(), description: z.string().optional(), sender: z.string().optional(), cnpjShipperPartner: z.string().optional(), orderNumber: z.string().min(0).max(200).optional(), deliveryServiceHighLighter: z.string().min(0).max(11).optional(), latitude: z.number().optional(), longitude: z.number().optional(), deliveryServiceScheduling: z.object({ shipperCustomerSchedulingDateTime: z.string().optional(), shipperSchedulingDateTime: z.string().optional(), morningPeriod: z.boolean().optional(), afternoonPeriod: z.boolean().optional(), nightPeriod: z.boolean().optional(), origin: z.number().int().optional() }).optional(), cnpjcarrier: z.string().optional(), cnpjbranch: z.string().optional(), idExternal: z.string().min(0).max(30).optional(), idShippingCompany: z.number().int().optional(), packingList: z.string().min(0).max(50).optional(), packingListDateTime: z.string().optional(), integrationDateTime: z.string().optional() })).optional()
}),
      handler: async (params) => {
  try {
    const url = "/services";
    const response = await http.post(url, params.body);
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
      name: "tracking_get_services",
      description: "Get delivery services list\nGET /services",
      inputSchema: z.object({
  status: z.string().optional().describe("Current status of the delivery service. The status parameters are not case sensitive, you can write them with upper or lower case. This field includes the following statuses as possible values: `Ativo`, `Roteirizado`, `Realizado`, `EmAndamento`, `NaoRealizado`."),
  dateInit: z.string().optional().describe("Initial date of registration of the requested service. The date format is `yyyy-mm-dd`."),
  dateEnd: z.string().optional().describe("End date of registration of the requested service. The date format is `yyyy-mm-dd`.\n\r\n\rMake sure that the period of time between `dateInit` and `dateEnd` is not greater than 30 days."),
  pageSize: z.number().int().optional().describe("Number of items shown per consultation page. The default is `25`."),
  page: z.number().int().optional().describe("The consultation's desired page.")
}),
      handler: async (params) => {
  try {
    const url = "/services";
    const queryParams: Record<string, unknown> = {};
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.dateInit !== undefined) queryParams["dateInit"] = params.dateInit;
    if (params.dateEnd !== undefined) queryParams["dateEnd"] = params.dateEnd;
    if (params.pageSize !== undefined) queryParams["pageSize"] = params.pageSize;
    if (params.page !== undefined) queryParams["page"] = params.page;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
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
      name: "tracking_get_services_by_id_delivery_service",
      description: "Get delivery service by ID\nGET /services/{idDeliveryService}",
      inputSchema: z.object({
  idDeliveryService: z.number().int().describe("The delivery service's unique identifier.")
}),
      handler: async (params) => {
  try {
    const url = `/services/${params.idDeliveryService}`;
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
      name: "tracking_post_delivery_service_with_route_async",
      description: "Post delivery service with route scheduling\nPOST /services/routes",
      inputSchema: z.object({
  body: z.object({ deliveryService: z.array(z.array(z.object({ deliveryServiceType: z.string().min(0).max(11).optional(), idExternalShipperCustomer: z.string().min(0).max(30).optional(), shipperCustomer: z.object({ legalType: z.string().min(2).max(2), email: z.string().min(0).max(254).optional(), firstName: z.string().min(0).max(100).optional(), lastName: z.string().min(0).max(100).optional(), cpf: z.string().min(0).max(50).optional(), addressStreet: z.string().min(0).max(150), addressNumber: z.string().min(0).max(50).optional(), addressComplement: z.string().min(0).max(50).optional(), addressNeighborhood: z.string().min(0).max(150).optional(), addressCity: z.string().min(0).max(100).optional(), postalCode: z.string().min(0).max(9), state: z.string().min(2).max(2).optional(), companyName: z.string().min(0).max(150).optional(), cnpj: z.string().min(0).max(50).optional(), idExternalShipperCustomer: z.string().min(0).max(30).optional(), phoneAreaCode: z.string().min(0).max(3).optional(), phoneNumber: z.string().min(0).max(12).optional() }).optional(), invoiceOrderOfService: z.string().optional(), invoiceOrderOfServiceSerie: z.string().min(0).max(3).optional(), description: z.string().optional(), sender: z.string().optional(), cnpjShipperPartner: z.string().optional(), orderNumber: z.string().min(0).max(200).optional(), deliveryServiceHighLighter: z.string().min(0).max(11).optional(), latitude: z.number().optional(), longitude: z.number().optional(), deliveryServiceScheduling: z.object({ shipperCustomerSchedulingDateTime: z.string().optional(), shipperSchedulingDateTime: z.string().optional(), morningPeriod: z.boolean().optional(), afternoonPeriod: z.boolean().optional(), nightPeriod: z.boolean().optional(), origin: z.number().int().optional() }).optional(), cnpjcarrier: z.string().optional(), cnpjbranch: z.string().optional(), idExternal: z.string().min(0).max(30).optional(), idShippingCompany: z.number().int().optional(), packingList: z.string().min(0).max(50).optional(), packingListDateTime: z.string().optional(), integrationDateTime: z.string().optional() }))).optional(), deliveryServiceRoute: z.object({ carrier: z.object({ username: z.string().min(0).max(100), firstName: z.string().min(0).max(100).optional(), lastName: z.string().min(0).max(100).optional(), cpf: z.string().min(0).max(14).optional(), email: z.string().min(0).max(254).optional(), mobileAreaCode: z.string().min(0).max(3).optional(), mobile: z.string().min(0).max(10).optional(), phoneAreaCode: z.string().min(0).max(3).optional(), phone: z.string().min(0).max(10).optional(), idExternalCarrier: z.string().min(0).max(30).optional(), rg: z.string().min(0).max(12).optional(), idShipperBranch: z.number().int().optional(), idShippingCompany: z.number().int().optional() }), displacementType: z.string().min(0).max(15), vehicle: z.object({ registrationPlate: z.string().min(0).max(50).optional() }).optional(), deliveryServiceRouteTimeOfDay: z.string().min(0).max(10).optional(), deliveryServiceDate: z.string(), idExternalRoute: z.string().min(0).max(50).optional(), itinerantDate: z.string().optional(), addressStart: z.object({ addressStreet: z.string().optional(), addressNumber: z.string().optional(), postalCode: z.string().optional(), addressCity: z.string().optional(), state: z.string().min(0).max(2).optional() }).optional() }).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/services/routes";
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
      name: "tracking_get_services_routes",
      description: "Get delivery services list by route\nGET /services/routes",
      inputSchema: z.object({
  status: z.string().optional().describe("Current status of the delivery service. Includes the following statuses as possible values: `Ativo`, `Roteirizado`, `Realizado`, `EmAndamento`, `NaoRealizado`."),
  dateInit: z.string().optional().describe("Initial date of registration of the requested service. The date format is `yyyy-mm-dd`."),
  dateEnd: z.string().optional().describe("End date of registration of the requested service. The date format is `yyyy-mm-dd`.\n\r\n\rMake sure that the period of time between `dateInit` and `dateEnd` is not greater than 30 days."),
  pageSize: z.number().int().optional().describe("Number of items shown per consultation page. The default is `25`."),
  page: z.number().int().optional().describe("The desired page for the consultation.")
}),
      handler: async (params) => {
  try {
    const url = "/services/routes";
    const queryParams: Record<string, unknown> = {};
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.dateInit !== undefined) queryParams["dateInit"] = params.dateInit;
    if (params.dateEnd !== undefined) queryParams["dateEnd"] = params.dateEnd;
    if (params.pageSize !== undefined) queryParams["pageSize"] = params.pageSize;
    if (params.page !== undefined) queryParams["page"] = params.page;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
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
      name: "tracking_get_services_invoice",
      description: "Get delivery service by invoice\nGET /services/invoice",
      inputSchema: z.object({
  invoice: z.string().optional().describe("Invoice code.")
}),
      handler: async (params) => {
  try {
    const url = "/services/invoice";
    const queryParams: Record<string, unknown> = {};
    if (params.invoice !== undefined) queryParams["invoice"] = params.invoice;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
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
    }
  ];
}
