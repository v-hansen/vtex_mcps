import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "customer-credit_searchallinvoices",
      description: "Search all invoices\nGET /api/creditcontrol/invoices",
      inputSchema: z.object({
  from: z.string().optional().describe("Indicates the starting position of the invoice to be searched in the invoice list. For example, the value `1` indicates that the first invoice in the list will be returned."),
  to: z.string().optional().describe("Indicates the final position of the invoice to be searched in the invoice list. For example, if the value of `from` is equal to `1` and `to` is `300`, information from 300 invoices will be displayed in the response body of the request."),
  createdDateFrom: z.string().optional().describe("Indicates the initial creation date of invoices that should be searched in the invoice list based on their creation date. The dates should be in ISO8601 format."),
  createdDateTo: z.string().optional().describe("Indicates the final creation date of invoices that should be searched in the invoice list based on their creation date. The dates should be in ISO8601 format."),
  dueDateFrom: z.string().optional().describe("Indicates the initial due date of invoices that should be searched in the invoice list based on their creation date. The dates should be in ISO8601 format."),
  dueDateTo: z.string().optional().describe("Indicates the final due date of invoices that should be searched in the invoice list based on their creation date. The dates should be in ISO8601 format."),
  value: z.number().optional().describe("Indicates the value of the invoices to be searched for. It must be completed with a decimal value."),
  status: z.enum(["Opened", "Paid", "Cancelled"]).optional().describe("Indicates the status of the invoices to be searched for."),
  friendlyId: z.string().optional().describe("Simplified identification of an invoice. This code is created automatically, always associated with an existing invoice. It consists of an 8-digit random ID (of numbers and letters) and the installment."),
  observation: z.string().optional().describe("Observation notes about the invoice."),
  creditAccountId: z.string().describe("Credit account identification.")
}),
      handler: async (params) => {
  try {
    const url = "/api/creditcontrol/invoices";
    const queryParams: Record<string, unknown> = {};
    if (params.from !== undefined) queryParams["from"] = params.from;
    if (params.to !== undefined) queryParams["to"] = params.to;
    if (params.createdDateFrom !== undefined) queryParams["createdDateFrom"] = params.createdDateFrom;
    if (params.createdDateTo !== undefined) queryParams["createdDateTo"] = params.createdDateTo;
    if (params.dueDateFrom !== undefined) queryParams["dueDateFrom"] = params.dueDateFrom;
    if (params.dueDateTo !== undefined) queryParams["dueDateTo"] = params.dueDateTo;
    if (params.value !== undefined) queryParams["value"] = params.value;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.friendlyId !== undefined) queryParams["friendlyId"] = params.friendlyId;
    if (params.observation !== undefined) queryParams["observation"] = params.observation;
    if (params.creditAccountId !== undefined) queryParams["creditAccountId"] = params.creditAccountId;
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
      name: "customer-credit_retrieve_invoiceby_id",
      description: "Retrieve invoice by ID\nGET /api/creditcontrol/accounts/{creditAccountId}/invoices/{invoiceId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  invoiceId: z.string().describe("Invoice identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}`;
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
      name: "customer-credit_change_invoice",
      description: "Change invoice\nPUT /api/creditcontrol/accounts/{creditAccountId}/invoices/{invoiceId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  invoiceId: z.string().describe("Invoice identification."),
  friendlyId: z.string().optional().describe("Simplified identification of an invoice. This code is created automatically, always associated with an existing invoice. It consists of an 8-digit random ID (of numbers and letters) and the installment."),
  body: z.object({ status: z.enum(["Opened", "Paid", "Cancelled"]), observation: z.string().optional(), paymentLink: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.friendlyId !== undefined) queryParams["friendlyId"] = params.friendlyId;
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
      name: "customer-credit_cancel_invoice",
      description: "Cancel invoice\nDELETE /api/creditcontrol/accounts/{creditAccountId}/invoices/{invoiceId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  invoiceId: z.string().describe("Invoice identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}`;
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
      name: "customer-credit_searchallinvoicesofa_account",
      description: "Retrieve invoices by Customer Credit account ID\nGET /api/creditcontrol/accounts/{creditAccountId}/invoices",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/invoices`;
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
      name: "customer-credit_markaninvoiceas_paid",
      description: "Mark an invoice as paid\nPOST /api/creditcontrol/accounts/{creditAccountId}/invoices/{invoiceId}/payments",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  invoiceId: z.string().describe("Invoice identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}/payments`;
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
      name: "customer-credit_postponeaninvoice",
      description: "Postpone an invoice\nPUT /api/creditcontrol/accounts/{creditAccountId}/invoices/{invoiceId}/postponement",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  invoiceId: z.string().describe("Invoice identification."),
  body: z.object({ dueDays: z.number() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/invoices/${params.invoiceId}/postponement`;
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
      name: "customer-credit_searchallaccounts",
      description: "Search all accounts\nGET /api/creditcontrol/accounts",
      inputSchema: z.object({
  from: z.string().optional().describe("Indicates the starting position of the credit customer account to be searched in the account list. Example, value `1` indicates that the first account in the list will be returned."),
  to: z.string().optional().describe("Indicates the final position of the credit customer account to be searched in the account list. Example, if the value of `from` is equal to `1` and `to` is `40`, information from 40 accounts will be displayed in the response body of the request."),
  status: z.enum(["Opened", "Paid", "Cancelled"]).optional().describe("Indicates the status of the accounts to be searched for."),
  email: z.string().optional().describe("Indicates the email registered to the account to be searched.")
}),
      handler: async (params) => {
  try {
    const url = "/api/creditcontrol/accounts";
    const queryParams: Record<string, unknown> = {};
    if (params.from !== undefined) queryParams["from"] = params.from;
    if (params.to !== undefined) queryParams["to"] = params.to;
    if (params.status !== undefined) queryParams["status"] = params.status;
    if (params.email !== undefined) queryParams["email"] = params.email;
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
      name: "customer-credit_openan_account",
      description: "Open an account\nPOST /api/creditcontrol/accounts",
      inputSchema: z.object({
  body: z.object({ document: z.string(), documentType: z.enum(["CPF", "CNPJ", "Other"]), email: z.string(), creditLimit: z.string(), description: z.string(), tolerance: z.string() })
}),
      handler: async (params) => {
  try {
    const url = "/api/creditcontrol/accounts";
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
      name: "customer-credit_retrievea_accountby_id",
      description: "Retrieve an account by ID\nGET /api/creditcontrol/accounts/{creditAccountId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}`;
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
      name: "customer-credit_closean_account",
      description: "Close an account\nDELETE /api/creditcontrol/accounts/{creditAccountId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  body: z.object({ document: z.string().optional(), documentType: z.enum(["CPF", "CNPJ", "Other"]).optional(), email: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}`;
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
      name: "customer-credit_updateemailanddescriptionofaaccount",
      description: "Update account information\nPUT /api/creditcontrol/accounts/{creditAccountId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  body: z.object({ email: z.string(), document: z.string(), documentType: z.enum(["CPF", "CNPJ", "Other"]), creditLimit: z.number().optional(), tolerance: z.number().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}`;
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
      name: "customer-credit_accountstatements",
      description: "Get account statements\nGET /api/creditcontrol/accounts/{creditAccountId}/statements",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/statements`;
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
      name: "customer-credit_changecreditlimitofan_account",
      description: "Change credit limit of an account\nPUT /api/creditcontrol/accounts/{creditAccountId}/creditlimit",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  body: z.object({ value: z.number() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/creditlimit`;
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
      name: "customer-credit_decreasebalanceofanaccount",
      description: "Decrease balance of an account\nPUT /api/creditcontrol/accounts/{creditAccountId}/statements/{statementId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  statementId: z.string().describe("Statement identification. This is the same `transactionId` value obtained from the [Account statements](https://developers.vtex.com/docs/api-reference/customer-credit-api#get-/api/creditcontrol/accounts/-creditAccountId-) endpoint response body."),
  body: z.object({ value: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/statements/${params.statementId}`;
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
      name: "customer-credit_createor_update_settlement",
      description: "Create or update settlement\nPUT /api/creditcontrol/accounts/{creditAccountId}/transactions/{transactionId}/settlement",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  transactionId: z.string().describe("Pre-authorization identification."),
  body: z.object({ value: z.number() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/transactions/${params.transactionId}/settlement`;
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
      name: "customer-credit_createa_pre_authorization",
      description: "Create a pre-authorization\nPOST /api/creditcontrol/accounts/{creditAccountId}/transactions",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  body: z.object({ value: z.number(), settle: z.boolean(), installments: z.number(), expirationDate: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/transactions`;
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
      name: "customer-credit_createa_pre_authorization(usingid)",
      description: "Update a pre-authorization\nPUT /api/creditcontrol/accounts/{creditAccountId}/transactions/{transactionId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  transactionId: z.string().describe("Pre-authorization identification."),
  body: z.object({ value: z.number(), settle: z.boolean(), installments: z.number() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/transactions/${params.transactionId}`;
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
      name: "customer-credit_cancela_pre_authorization",
      description: "Cancel a pre-authorization\nDELETE /api/creditcontrol/accounts/{creditAccountId}/transactions/{transactionId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  transactionId: z.string().describe("Pre-authorization identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/transactions/${params.transactionId}`;
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
      name: "customer-credit_addanaccount_holder",
      description: "Add an account holder\nPOST /api/creditcontrol/accounts/{creditAccountId}/holders",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  body: z.object({ claims: z.object({ email: z.string() }) })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/holders`;
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
      name: "customer-credit_deleteanaccountholder",
      description: "Delete an account holder\nDELETE /api/creditcontrol/accounts/{creditAccountId}/holders/{holderId}",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  holderId: z.string().describe("Holder identification.")
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/holders/${params.holderId}`;
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
      name: "customer-credit_changetoleranceofanaccount",
      description: "Change tolerance of an account\nPUT /api/creditcontrol/accounts/{creditAccountId}/tolerance",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  body: z.object({ value: z.number() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/tolerance`;
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
      name: "customer-credit_partialor_total_refunda_settlement",
      description: "Partially or totally refund a settlement\nPOST /api/creditcontrol/accounts/{creditAccountId}/transactions/{transactionId}/refunds",
      inputSchema: z.object({
  creditAccountId: z.string().describe("Credit account identification."),
  transactionId: z.string().describe("Pre-authorization identification."),
  body: z.object({ value: z.number() })
}),
      handler: async (params) => {
  try {
    const url = `/api/creditcontrol/accounts/${params.creditAccountId}/transactions/${params.transactionId}/refunds`;
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
      name: "customer-credit_retrievestoreconfiguration",
      description: "Retrieve store configuration\nGET /api/creditcontrol/storeconfig",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/creditcontrol/storeconfig";
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
      name: "customer-credit_createorchangestoreconfiguration",
      description: "Create or change store configuration\nPUT /api/creditcontrol/storeconfig",
      inputSchema: z.object({
  body: z.object({ dailyInterestRate: z.number(), invoicePostponementLimit: z.number(), taxRate: z.number(), maxPostponementDays: z.number(), defaultCreditValue: z.number(), maxPreAuthorizationGrowthRate: z.number(), myCreditsEnabled: z.boolean(), toleranceEnabled: z.boolean(), automaticCheckingAccountCreationEnabled: z.boolean(), postponementEnabled: z.boolean(), notificationsSettings: z.object({ daysPrior: z.array(z.object({ days: z.number().int(), timeOfDay: z.string() })).optional(), daysAfter: z.array(z.object({ days: z.number().int(), timeOfDay: z.string() })).optional() }).optional() })
}),
      handler: async (params) => {
  try {
    const url = "/api/creditcontrol/storeconfig";
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
    }
  ];
}
