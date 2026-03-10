import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "vtex-id_post_api_authenticator_storefront_users",
      description: "Create storefront user\nPOST /api/authenticator/storefront/users",
      inputSchema: z.object({
  body: z.object({ identifiers: z.array(z.object({ type: z.enum(["username", "email", "phoneNumber"]), value: z.string() })) }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/authenticator/storefront/users";
    const response = await http.post(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request \n\n Invalid request format, missing required fields, or unsupported identifier type.");
      case 401:
        throw new Error("Unauthorized\n\nInvalid or missing authentication credentials.");
      case 403:
        throw new Error("Forbidden\n\nInsufficient permissions to create users.");
      case 409:
        throw new Error("Conflict\n\nOne or more of the provided identifiers already exist for another user.");
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
      name: "vtex-id_get_api_vtexid_pvt_user_info",
      description: "Get storefront user by identifier\nGET /api/vtexid/pvt/user/info",
      inputSchema: z.object({
  user: z.string().describe("URL-encoded storefront user identifier (username or email).")
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/pvt/user/info";
    const queryParams: Record<string, unknown> = {};
    if (params.user !== undefined) queryParams["user"] = params.user;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 401:
        throw new Error("Unauthorized\n\nNot authenticated.");
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
      name: "vtex-id_post_api_vtexid_apptoken_login",
      description: "Generate authentication token\nPOST /api/vtexid/apptoken/login",
      inputSchema: z.object({
  an: z.string().optional().describe("Name of your VTEX account."),
  body: z.object({ appkey: z.string(), apptoken: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/apptoken/login";
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
      name: "vtex-id_post_api_vtexid_audience_webstore_provider_oauth_exchange",
      description: "Exchange OAuth access token for VTEX credential\nPOST /api/vtexid/audience/webstore/provider/oauth/exchange",
      inputSchema: z.object({
  accountName: z.string().describe("Name of your VTEX account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to be used in the request."),
  body: z.object({ providerId: z.string(), accessToken: z.string(), duration: z.number().int().default(60).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/audience/webstore/provider/oauth/exchange";
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
      name: "vtex-id_post_api_vtexid_credential_validate",
      description: "Check authenticated user\nPOST /api/vtexid/credential/validate",
      inputSchema: z.object({
  environment: z.string().default("vtexcommercestable").describe("Environment to be used in the request."),
  an: z.string().optional().describe("Name of your VTEX account."),
  body: z.object({ token: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/credential/validate";
    const queryParams: Record<string, unknown> = {};
    if (params.an !== undefined) queryParams["an"] = params.an;
    const response = await http.post(url, params.body, { params: queryParams });
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
      name: "vtex-id_post_api_vtexid_pub_providers_setup_password_webstore_password",
      description: "Enable or disable repeated passwords\nPOST /api/vtexid/pub/providers/setup/password/webstore/password",
      inputSchema: z.object({
  accountName: z.string().describe("Name of your VTEX account."),
  body: z.object({ isActive: z.boolean().optional(), allowRepeated: z.boolean().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/pub/providers/setup/password/webstore/password";
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
      name: "vtex-id_post_api_vtexid_password_expire",
      description: "Expire user password\nPOST /api/vtexid/password/expire",
      inputSchema: z.object({
  accountName: z.string().describe("Name of your VTEX account."),
  environment: z.string().default("vtexcommercestable").describe("Environment to be used in the request."),
  email: z.string().describe("User email.")
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/password/expire";
    const queryParams: Record<string, unknown> = {};
    if (params.email !== undefined) queryParams["email"] = params.email;
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
      name: "vtex-id_patch_api_vtexid_apikey_by_api_key_apitoken_renew",
      description: "Initiate token renewal\nPATCH /api/vtexid/apikey/{apiKey}/apitoken/renew",
      inputSchema: z.object({
  apiKey: z.string().describe("API Key name.")
}),
      handler: async (params) => {
  try {
    const url = `/api/vtexid/apikey/${params.apiKey}/apitoken/renew`;
    const response = await http.patch(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request\n\nInvalid API key or API key not owned by tenant.");
      case 409:
        throw new Error("Conflict\n\nAlready has a renewed token pending.");
      case 500:
        throw new Error("Internal Server Error\n\nUnknown server error.");
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
      name: "vtex-id_patch_api_vtexid_apikey_by_api_key_apitoken_finish_renewal",
      description: "Complete token renewal\nPATCH /api/vtexid/apikey/{apiKey}/apitoken/finish-renewal",
      inputSchema: z.object({
  apiKey: z.string().describe("API Key name.")
}),
      handler: async (params) => {
  try {
    const url = `/api/vtexid/apikey/${params.apiKey}/apitoken/finish-renewal`;
    const response = await http.patch(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request\n\nInvalid API key or API key not owned by tenant.");
      case 404:
        throw new Error("Not Found\n\nNo renewed API token was found.");
      case 500:
        throw new Error("Internal Server Error\n\nUnknown server error.");
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
      name: "vtex-id_get_api_vtexid_pvt_user_id",
      description: "Get user ID by email\nGET /api/vtexid/pvt/user/id",
      inputSchema: z.object({
  usuario: z.string().describe("User email address.")
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/pvt/user/id";
    const queryParams: Record<string, unknown> = {};
    if (params.usuario !== undefined) queryParams["usuario"] = params.usuario;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 401:
        throw new Error("Unauthorized\n\nInvalid or missing VtexIdclientAutCookie.");
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
      name: "vtex-id_get_api_vtexid_pub_authentication_start",
      description: "Start authentication\nGET /api/vtexid/pub/authentication/start",
      inputSchema: z.object({
  scope: z.string().describe("Account name."),
  fingerprint: z.string().optional().describe("Optional device fingerprint for enhanced security. Generated client-side using JavaScript libraries that collect anonymized device and browser parameters to create a unique identifier. When submitted in this request, it must later be provided when making a request to [refresh token](https://developers.vtex.com/docs/api-reference/vtex-id-api#post-/api/vtexid/refreshtoken/webstore).")
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/pub/authentication/start";
    const queryParams: Record<string, unknown> = {};
    if (params.scope !== undefined) queryParams["scope"] = params.scope;
    if (params.fingerprint !== undefined) queryParams["fingerprint"] = params.fingerprint;
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
      name: "vtex-id_post_api_vtexid_pub_authentication_accesskey_send",
      description: "Send access key\nPOST /api/vtexid/pub/authentication/accesskey/send",
      inputSchema: z.object({
  email: z.string().describe("User email.")
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/pub/authentication/accesskey/send";
    const queryParams: Record<string, unknown> = {};
    if (params.email !== undefined) queryParams["email"] = params.email;
    const response = await http.post(url, { params: queryParams });
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
      name: "vtex-id_post_api_vtexid_pub_authentication_accesskey_validate",
      description: "Validate session\nPOST /api/vtexid/pub/authentication/accesskey/validate",
      inputSchema: z.object({
  body: z.object({ accessKey: z.string().optional(), login: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/pub/authentication/accesskey/validate";
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
      name: "vtex-id_post_api_vtexid_refreshtoken_webstore",
      description: "Refresh token\nPOST /api/vtexid/refreshtoken/webstore",
      inputSchema: z.object({
  body: z.object({ fingerprint: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/api/vtexid/refreshtoken/webstore";
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
