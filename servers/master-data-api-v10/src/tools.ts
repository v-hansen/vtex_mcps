import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "master-data-api-v10_listdataentities",
      description: "List data entities\nGET /api/dataentities",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/dataentities";
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 403:
        throw new Error("Forbidden");
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
      name: "master-data-api-v10_getdataentitystructure",
      description: "Get data entity structure\nGET /api/dataentities/{acronym}",
      inputSchema: z.object({
  acronym: z.string().describe("Data entity acronym.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 403:
        throw new Error("Forbidden");
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
      name: "master-data-api-v10_createnewdocument",
      description: "Create new document\nPOST /api/dataentities/{acronym}/documents",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  body: z.object({ "{fieldName}": z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents`;
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
      name: "master-data-api-v10_createorupdatepartialdocument",
      description: "Create partial document\nPATCH /api/dataentities/{acronym}/documents",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  body: z.object({ id: z.string().optional(), "{fieldName}": z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents`;
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
      name: "master-data-api-v10_getdocument",
      description: "Get document\nGET /api/dataentities/{acronym}/documents/{id}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  _fields: z.string().optional().describe("Names of the fields that will be returned per document, separated by a comma `,`. It is possible to fetch all fields using `_all` as the value of this query parameter. However, in order to avoid permission errors, we strongly recommend informing only the names of the exact fields that will be used.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}`;
    const queryParams: Record<string, unknown> = {};
    if (params._fields !== undefined) queryParams["_fields"] = params._fields;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 403:
        throw new Error("Forbidden");
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
      name: "master-data-api-v10_updateentiredocument",
      description: "Create document with custom ID or update entire document\nPUT /api/dataentities/{acronym}/documents/{id}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  body: z.object({ "{fieldName}": z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}`;
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
      name: "master-data-api-v10_updatepartialdocument",
      description: "Update partial document\nPATCH /api/dataentities/{acronym}/documents/{id}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  body: z.object({})
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}`;
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
      name: "master-data-api-v10_deletedocument",
      description: "Delete document\nDELETE /api/dataentities/{acronym}/documents/{id}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}`;
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
      name: "master-data-api-v10_listversions",
      description: "List versions\nGET /api/dataentities/{acronym}/documents/{id}/versions",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/versions`;
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
      name: "master-data-api-v10_getversion",
      description: "Get version\nGET /api/dataentities/{acronym}/documents/{id}/versions/{versionId}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  versionId: z.string().describe("Unique identifier of the version to retrieve.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/versions/${params.versionId}`;
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
      name: "master-data-api-v10_putversion",
      description: "Update version\nPUT /api/dataentities/{acronym}/documents/{id}/versions/{versionId}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  versionId: z.string().describe("Unique identifier of the version to update.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/versions/${params.versionId}`;
    const response = await http.put(url);
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
      name: "master-data-api-v10_scrolldocuments",
      description: "Scroll documents\nGET /api/dataentities/{acronym}/scroll",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  _fields: z.string().optional().describe("Names of the fields that will be returned per document, separated by a comma `,`. It is possible to fetch all fields using `_all` as the value of this query parameter. However, in order to avoid permission errors, we strongly recommend informing only the names of the exact fields that will be used."),
  _where: z.string().optional().describe("Defines a condition the document must comply with. When referring to fields, you can use a nested field up to the first level (e.g. `wishlistProduct.productName`)."),
  _sort: z.string().optional().describe("Defines sorting mode in two parts. The first part is the name of the field you want to sort by. It can be a nested field up to the first level (e.g. `wishlistProduct.productName`). In the second part, use `ASC` for ascending order or `DESC` for descending order."),
  _size: z.string().optional().describe("Maximum amount of documents returned per request. The maximum value you can set is `1000`."),
  _token: z.string().optional().describe("Value of the `X-VTEX-MD-TOKEN` token obtained in the response header of the first request, necessary on subsequent requests to continue scrolling through documents. The token expires after 20 minutes of inactivity, and each request made with the token during this time resets the expiration timer.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/scroll`;
    const queryParams: Record<string, unknown> = {};
    if (params._fields !== undefined) queryParams["_fields"] = params._fields;
    if (params._where !== undefined) queryParams["_where"] = params._where;
    if (params._sort !== undefined) queryParams["_sort"] = params._sort;
    if (params._size !== undefined) queryParams["_size"] = params._size;
    if (params._token !== undefined) queryParams["_token"] = params._token;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 429:
        throw new Error("Too Many Requests\n\nWildcard queries temporarily blocked due to excessive usage. Consider adjusting your code to remove them or reduce the rate of search requests with wildcards (*). This temporary block may also be due to excessive use of requests with the parameter `keyword`.");
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
      name: "master-data-api-v10_searchdocuments",
      description: "Search documents\nGET /api/dataentities/{acronym}/search",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  _fields: z.string().optional().describe("Names of the fields that will be returned per document, separated by a comma `,`. It is possible to fetch all fields using `_all` as the value of this query parameter. However, in order to avoid permission errors, we strongly recommend informing only the names of the exact fields that will be used."),
  _where: z.string().optional().describe("Defines a condition the document must comply with. When referring to fields, you can use a nested field up to the first level (e.g. `wishlistProduct.productName`)."),
  _sort: z.string().optional().describe("Defines sorting mode in two parts. The first part is the name of the field you want to sort by. It can be a nested field up to the first level (e.g. `wishlistProduct.productName`). In the second part, use `ASC` for ascending order or `DESC` for descending order.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/search`;
    const queryParams: Record<string, unknown> = {};
    if (params._fields !== undefined) queryParams["_fields"] = params._fields;
    if (params._where !== undefined) queryParams["_where"] = params._where;
    if (params._sort !== undefined) queryParams["_sort"] = params._sort;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 503:
        throw new Error("Service Unavailable\n\nWildcard queries temporarily blocked due to excessive usage. Consider adjusting your code to remove them or reduce the rate of search requests with wildcards (*). This temporary block may also be due to excessive use of requests with the parameter `keyword`.");
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
      name: "master-data-api-v10_retrieveattachment",
      description: "Retrieve attachment\nGET /api/dataentities/{acronym}/documents/{id}/{field}/attachments/{file-name}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  field: z.string().describe("Name of the field where the file is saved, as it appears on VTEX Admin."),
  "file-name": z.string().describe("File name and extension.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/${params.field}/attachments/${params["file-name"]}`;
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
      name: "master-data-api-v10_saveattachment",
      description: "Save attachment\nPOST /api/dataentities/{acronym}/documents/{id}/{field}/attachments",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  field: z.string().describe("Name of the field to attach the file to, as it appears in VTEX Admin."),
  body: z.object({ file: z.array(z.string()) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/${params.field}/attachments`;
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
      name: "master-data-api-v10_validate_documentby_clusters",
      description: "Validate document by clusters\nPOST /api/dataentities/{acronym}/documents/{id}/clusters",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  body: z.array(z.object({ name: z.string().optional(), rule: z.string().optional() }))
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/clusters`;
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
      name: "master-data-api-v10_putscores",
      description: "Update scores\nPUT /api/dataentities/{acronym}/documents/{id}/score",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  body: z.array(z.object({ field: z.string(), key: z.string(), point: z.number().int(), until: z.string() }))
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/score`;
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
      name: "master-data-api-v10_putscorebyfield",
      description: "Update score by field\nPUT /api/dataentities/{acronym}/documents/{id}/score/{field-name}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  "field-name": z.string().describe("Name of the field to score."),
  body: z.object({ key: z.string(), point: z.number().int(), until: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/score/${params["field-name"]}`;
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
      name: "master-data-api-v10_deletescorebyfield",
      description: "Delete score by field\nDELETE /api/dataentities/{acronym}/documents/{id}/score/{field-name}",
      inputSchema: z.object({
  acronym: z.string().describe("Two-letter string that identifies the data entity."),
  id: z.string().describe("Unique identifier of the document."),
  "field-name": z.string().describe("Name of the field to remove a key from."),
  body: z.object({ key: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.acronym}/documents/${params.id}/score/${params["field-name"]}`;
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
      name: "master-data-api-v10_create_new_customer_profilev2",
      description: "Create new customer profile\nPOST /api/dataentities/CL/documents",
      inputSchema: z.object({
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with.  This field is required when using `_where` or `_fields` query parameters."),
  body: z.object({ email: z.string().max(300).optional(), firstName: z.string().max(300).optional(), lastName: z.string().max(300).optional(), phone: z.string().optional(), documentType: z.string().max(300).optional(), document: z.string().max(300).optional(), isCorporate: z.boolean().optional(), isNewsletterOptIn: z.boolean().optional(), localeDefault: z.string().optional(), corporateDocument: z.string().max(300).optional(), homePhone: z.string().max(300).optional(), cellPhone: z.string().max(300).optional(), corporateName: z.string().max(300).optional(), tradeName: z.string().max(300).optional(), stateRegistration: z.string().max(300).optional(), isFreeStateRegistration: z.boolean().optional(), priceTables: z.string().max(50).optional(), restrictions: z.object({ "vtex.catalog": z.object({ collectionIds: z.array(z.string()).optional() }).optional(), "vtex.checkout": z.object({ creditCards: z.array(z.string()).optional() }).optional(), "vtex.payments": z.object({ paymentSystemIds: z.array(z.string()).optional() }).optional() }).optional() })
}),
      handler: async (params) => {
  try {
    const url = "/api/dataentities/CL/documents";
    const queryParams: Record<string, unknown> = {};
    if (params._schema !== undefined) queryParams["_schema"] = params._schema;
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
      name: "master-data-api-v10_update_customer_profile",
      description: "Update customer profile\nPATCH /api/dataentities/CL/documents/{id}",
      inputSchema: z.object({
  id: z.string().describe("Unique identifier of the document."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with.  This field is required when using `_where` or `_fields` query parameters."),
  body: z.object({ email: z.string().max(300).optional(), firstName: z.string().max(300).optional(), lastName: z.string().max(300).optional(), phone: z.string().optional(), documentType: z.string().max(300).optional(), document: z.string().max(300).optional(), isCorporate: z.boolean().optional(), isNewsletterOptIn: z.boolean().optional(), localeDefault: z.string().optional(), corporateDocument: z.string().max(300).optional(), homePhone: z.string().max(300).optional(), cellPhone: z.string().max(300).optional(), corporateName: z.string().max(300).optional(), tradeName: z.string().max(300).optional(), stateRegistration: z.string().max(300).optional(), isFreeStateRegistration: z.boolean().optional(), priceTables: z.string().max(50).optional(), restrictions: z.object({ "vtex.catalog": z.object({ collectionIds: z.array(z.string()).optional() }).optional(), "vtex.checkout": z.object({ creditCards: z.array(z.string()).optional() }).optional(), "vtex.payments": z.object({ paymentSystemIds: z.array(z.string()).optional() }).optional() }).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/CL/documents/${params.id}`;
    const queryParams: Record<string, unknown> = {};
    if (params._schema !== undefined) queryParams["_schema"] = params._schema;
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
      name: "master-data-api-v10_delete_customer_profile",
      description: "Delete customer profile\nDELETE /api/dataentities/CL/documents/{id}",
      inputSchema: z.object({
  id: z.string().describe("Unique identifier of the document.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/CL/documents/${params.id}`;
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
      name: "master-data-api-v10_create_new_customer_address",
      description: "Create new customer address\nPOST /api/dataentities/AD/documents",
      inputSchema: z.object({
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with.  This field is required when using `_where` or `_fields` query parameters."),
  body: z.object({ addressName: z.string().optional(), addressLabel: z.string().optional(), addressType: z.enum(["commercial", "invoice"]).optional(), receiverName: z.string().optional(), city: z.string().optional(), state: z.string().optional(), country: z.string().optional(), postalCode: z.string().optional(), street: z.string().optional(), number: z.string().optional(), neighborhood: z.string().optional(), complement: z.string().optional(), reference: z.string().optional(), geoCoordinate: z.string().optional(), userId: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = "/api/dataentities/AD/documents";
    const queryParams: Record<string, unknown> = {};
    if (params._schema !== undefined) queryParams["_schema"] = params._schema;
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
      name: "master-data-api-v10_get_api_dataentities_ad_documents_by_address_id",
      description: "Get address by ID\nGET /api/dataentities/AD/documents/{addressId}",
      inputSchema: z.object({
  addressId: z.string().describe("ID of the address to retrieve."),
  _fields: z.string().default("_all").describe("Specifies that all fields of the document should be included in the response.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/AD/documents/${params.addressId}`;
    const queryParams: Record<string, unknown> = {};
    if (params._fields !== undefined) queryParams["_fields"] = params._fields;
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
      name: "master-data-api-v10_update_customer_address",
      description: "Update address by ID\nPATCH /api/dataentities/AD/documents/{addressId}",
      inputSchema: z.object({
  addressId: z.string().describe("ID of the address to update."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with.  This field is required when using `_where` or `_fields` query parameters."),
  body: z.object({ addressName: z.string().optional(), addressLabel: z.string().optional(), addressType: z.enum(["commercial", "invoice"]).optional(), receiverName: z.string().optional(), city: z.string().optional(), state: z.string().optional(), country: z.string().optional(), postalCode: z.string().optional(), street: z.string().optional(), number: z.string().optional(), neighborhood: z.string().optional(), complement: z.string().optional(), reference: z.string().optional(), geoCoordinate: z.string().optional(), userId: z.string().optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/AD/documents/${params.addressId}`;
    const queryParams: Record<string, unknown> = {};
    if (params._schema !== undefined) queryParams["_schema"] = params._schema;
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
      name: "master-data-api-v10_delete_customer_ad",
      description: "Delete address by ID\nDELETE /api/dataentities/AD/documents/{addressId}",
      inputSchema: z.object({
  addressId: z.string().describe("ID of the address to be deleted.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/AD/documents/${params.addressId}`;
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
    }
  ];
}
