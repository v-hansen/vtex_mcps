import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "master-data-api-v2_createnewdocument",
      description: "Create new document\nPOST /api/dataentities/{dataEntityName}/documents",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with. This field is required when using `_where` or `_fields` query parameters."),
  body: z.object({})
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents`;
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
      name: "master-data-api-v2_createorupdatepartialdocument",
      description: "Create partial document\nPATCH /api/dataentities/{dataEntityName}/documents",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with. This field is required when using `_where` or `_fields` query parameters."),
  body: z.object({})
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents`;
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
      name: "master-data-api-v2_getdocument",
      description: "Get document\nGET /api/dataentities/{dataEntityName}/documents/{id}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  id: z.string().describe("ID of the Document."),
  _fields: z.string().optional().describe("Fields that should be returned by document. Separate fields' names with commas. For example `_fields=email,firstName,document`. You can also use `_fields=_all` to fetch all fields."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with. This field is required when using `_where` or `_fields` query parameters.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents/${params.id}`;
    const queryParams: Record<string, unknown> = {};
    if (params._fields !== undefined) queryParams["_fields"] = params._fields;
    if (params._schema !== undefined) queryParams["_schema"] = params._schema;
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
      name: "master-data-api-v2_updateentiredocument",
      description: "Create document with custom ID or update entire document\nPUT /api/dataentities/{dataEntityName}/documents/{id}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  id: z.string().describe("ID of the document. If you inform an **unused ID**, this endpoint will create a new document with the informed custom ID, differently from the [Create new document](https://developers.vtex.com/docs/api-reference/master-data-api-v2#post-/api/dataentities/-dataEntityName-/documents) endpoint, which automatically generates the ID. If you inform an **existing ID**, this endpoint will update the entire document associated with the informed ID."),
  _where: z.string().optional().describe("Defines a condition the document must comply with. When referring to fields, you can use a nested field up to the first level (e.g. `wishlistProduct.productName`)."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with. This field is required when using `_where` or `_fields` query parameters."),
  body: z.object({})
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents/${params.id}`;
    const queryParams: Record<string, unknown> = {};
    if (params._where !== undefined) queryParams["_where"] = params._where;
    if (params._schema !== undefined) queryParams["_schema"] = params._schema;
    const response = await http.put(url, params.body, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request\n\nInvalid information in JSON.");
      case 403:
        throw new Error("Forbidden\n\nUnauthorized access.");
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
      name: "master-data-api-v2_updatepartialdocument",
      description: "Update partial document\nPATCH /api/dataentities/{dataEntityName}/documents/{id}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  id: z.string().describe("ID of the Document."),
  _where: z.string().optional().describe("Defines a condition the document must comply with. When referring to fields, you can use a nested field up to the first level (e.g. `wishlistProduct.productName`)."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with. This field is required when using `_where` or `_fields` query parameters."),
  body: z.object({})
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents/${params.id}`;
    const queryParams: Record<string, unknown> = {};
    if (params._where !== undefined) queryParams["_where"] = params._where;
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
      name: "master-data-api-v2_deletedocument",
      description: "Delete document\nDELETE /api/dataentities/{dataEntityName}/documents/{id}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  id: z.string().describe("ID of the Document.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents/${params.id}`;
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
      name: "master-data-api-v2_searchdocuments",
      description: "Search documents\nGET /api/dataentities/{dataEntityName}/search",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  _fields: z.string().optional().describe("Fields that should be returned by document. Separate fields' names with commas. For example `_fields=email,firstName,document`. You can also use `_fields=_all` to fetch all fields."),
  _where: z.string().optional().describe("Defines a condition the document must comply with. When referring to fields, you can use a nested field up to the first level (e.g. `wishlistProduct.productName`)."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with. This field is required when using `_where` or `_fields` query parameters."),
  _sort: z.string().optional().describe("Defines sorting mode in two parts. The first part is the name of the field you want to sort by. It can be a nested field up to the first level (e.g. `wishlistProduct.productName`). In the second part, use `ASC` for ascending order or `DESC` for descending order.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/search`;
    const queryParams: Record<string, unknown> = {};
    if (params._fields !== undefined) queryParams["_fields"] = params._fields;
    if (params._where !== undefined) queryParams["_where"] = params._where;
    if (params._schema !== undefined) queryParams["_schema"] = params._schema;
    if (params._sort !== undefined) queryParams["_sort"] = params._sort;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 403:
        throw new Error("Forbidden");
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
      name: "master-data-api-v2_scrolldocuments",
      description: "Scroll documents\nGET /api/dataentities/{dataEntityName}/scroll",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  _token: z.string().optional().describe("Value of the `X-VTEX-MD-TOKEN` token obtained in the response header of the first request, necessary on subsequent requests to continue scrolling through documents. The token expires after 20 minutes of inactivity, and each request made with the token during this time resets the expiration timer."),
  _size: z.number().int().default(100).describe("Inform the number of documents per request. Maximum value of `1000`."),
  _fields: z.string().optional().describe("Fields that should be returned by document. Separate fields' names with commas. For example `_fields=email,firstName,document`. You can also use `_fields=_all` to fetch all fields."),
  _where: z.string().optional().describe("Defines a condition the document must comply with. When referring to fields, you can use a nested field up to the first level (e.g. `wishlistProduct.productName`)."),
  _schema: z.string().optional().describe("Name of the [schema](https://developers.vtex.com/docs/guides/master-data-schema-lifecycle) that the document complies with. This field is required when using `_where` or `_fields` query parameters."),
  _sort: z.string().optional().describe("Defines sorting mode in two parts. The first part is the name of the field you want to sort by. It can be a nested field up to the first level (e.g. `wishlistProduct.productName`). In the second part, use `ASC` for ascending order or `DESC` for descending order.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/scroll`;
    const queryParams: Record<string, unknown> = {};
    if (params._token !== undefined) queryParams["_token"] = params._token;
    if (params._size !== undefined) queryParams["_size"] = params._size;
    if (params._fields !== undefined) queryParams["_fields"] = params._fields;
    if (params._where !== undefined) queryParams["_where"] = params._where;
    if (params._schema !== undefined) queryParams["_schema"] = params._schema;
    if (params._sort !== undefined) queryParams["_sort"] = params._sort;
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
      name: "master-data-api-v2_getschemas",
      description: "Get schemas\nGET /api/dataentities/{dataEntityName}/schemas",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/schemas`;
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
      name: "master-data-api-v2_getschemabyname",
      description: "Get schema by name\nGET /api/dataentities/{dataEntityName}/schemas/{schemaName}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  schemaName: z.string().describe("Name of the schema.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/schemas/${params.schemaName}`;
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
      name: "master-data-api-v2_saveschemabyname",
      description: "Save schema by name\nPUT /api/dataentities/{dataEntityName}/schemas/{schemaName}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  schemaName: z.string().describe("Name of the schema."),
  body: z.object({ properties: z.object({ name: z.object({ type: z.enum(["array", "boolean", "integer", "number", "object", "string"]) }).optional() }), "v-indexed": z.array(z.string()).optional() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/schemas/${params.schemaName}`;
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
      name: "master-data-api-v2_deleteschemabyname",
      description: "Delete schema by name\nDELETE /api/dataentities/{dataEntityName}/schemas/{schemaName}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  schemaName: z.string().describe("Name of the schema.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/schemas/${params.schemaName}`;
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
      name: "master-data-api-v2_getindices",
      description: "Get indices\nGET /api/dataentities/{dataEntityName}/indices",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/indices`;
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
      name: "master-data-api-v2_putindices",
      description: "Create index\nPUT /api/dataentities/{dataEntityName}/indices",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  body: z.object({ name: z.string(), multiple: z.boolean(), fields: z.string() })
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/indices`;
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
      name: "master-data-api-v2_getindexbyname",
      description: "Get index by name\nGET /api/dataentities/{dataEntityName}/indices/{index_name}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  index_name: z.string().describe("Name of the index.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/indices/${params.index_name}`;
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
      name: "master-data-api-v2_deleteindexbyname",
      description: "Delete index by name\nDELETE /api/dataentities/{dataEntityName}/indices/{index_name}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  index_name: z.string().describe("Name of the index.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/indices/${params.index_name}`;
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
      name: "master-data-api-v2_validatedocumentbyclusters",
      description: "Validate document by clusters\nPOST /api/dataentities/{dataEntityName}/documents/{id}/clusters",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  id: z.string().describe("ID of the Document."),
  body: z.array(z.object({ name: z.string().optional(), rule: z.string().optional() }))
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents/${params.id}/clusters`;
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
      name: "master-data-api-v2_listversions",
      description: "List versions\nGET /api/dataentities/{dataEntityName}/documents/{id}/versions",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  id: z.string().describe("ID of the Document."),
  load: z.boolean().default(true).describe("If true, return all the fields in each version of the document."),
  fields: z.string().default("id,dataEntityId,isNewsletterOptIn,createdBy").describe("If `load` is true, the response will return only these specific fields.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents/${params.id}/versions`;
    const queryParams: Record<string, unknown> = {};
    if (params.load !== undefined) queryParams["load"] = params.load;
    if (params.fields !== undefined) queryParams["fields"] = params.fields;
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
      name: "master-data-api-v2_getversion",
      description: "Get version\nGET /api/dataentities/{dataEntityName}/documents/{id}/versions/{versionId}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  id: z.string().describe("ID of the Document."),
  versionId: z.string().describe("ID of the version to update.")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents/${params.id}/versions/${params.versionId}`;
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
      name: "master-data-api-v2_putversion",
      description: "Update version\nPUT /api/dataentities/{dataEntityName}/documents/{id}/versions/{versionId}",
      inputSchema: z.object({
  dataEntityName: z.string().describe("Name of the data entity."),
  id: z.string().describe("ID of the Document."),
  versionId: z.string().describe("ID of the version to update")
}),
      handler: async (params) => {
  try {
    const url = `/api/dataentities/${params.dataEntityName}/documents/${params.id}/versions/${params.versionId}`;
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
    }
  ];
}
