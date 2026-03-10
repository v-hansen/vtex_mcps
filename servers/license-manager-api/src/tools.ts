import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "license-manager_get_user",
      description: "Get user information by user ID\nGET /api/license-manager/users/{userId}",
      inputSchema: z.object({
  userId: z.string().describe("ID from queried user.")
}),
      handler: async (params) => {
  try {
    const url = `/api/license-manager/users/${params.userId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request");
      case 405:
        throw new Error("Method Not Allowed - A null `userId` sends the request to a path that is not allowed.");
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
      name: "license-manager_delete_api_license_manager_users_by_user_id",
      description: "Delete user\nDELETE /api/license-manager/users/{userId}",
      inputSchema: z.object({
  userId: z.string().describe("ID from queried user.")
}),
      handler: async (params) => {
  try {
    const url = `/api/license-manager/users/${params.userId}`;
    const response = await http.delete(url);
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
      name: "license-manager_create_user",
      description: "Create user\nPOST /api/license-manager/users",
      inputSchema: z.object({
  body: z.object({ name: z.string().optional(), email: z.string() })
}),
      handler: async (params) => {
  try {
    const url = "/api/license-manager/users";
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
      name: "license-manager_get_list_users",
      description: "Get list of users\nGET /api/license-manager/site/pvt/logins/list/paged",
      inputSchema: z.object({
  numItems: z.number().int().optional().describe("Number of items in the returned page."),
  pageNumber: z.number().int().optional().describe("Which page from the whole list will be returned."),
  sort: z.string().optional().describe("Chooses the field that the list will be sorted by."),
  sortType: z.string().optional().describe("Defines the sorting order. `ASC` is used for ascendant order. `DSC` is used for descendant order.")
}),
      handler: async (params) => {
  try {
    const url = "/api/license-manager/site/pvt/logins/list/paged";
    const queryParams: Record<string, unknown> = {};
    if (params.numItems !== undefined) queryParams["numItems"] = params.numItems;
    if (params.pageNumber !== undefined) queryParams["pageNumber"] = params.pageNumber;
    if (params.sort !== undefined) queryParams["sort"] = params.sort;
    if (params.sortType !== undefined) queryParams["sortType"] = params.sortType;
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
      name: "license-manager_put_rolesin_user",
      description: "Add roles to user or API Key\nPUT /api/license-manager/users/{userId}/roles",
      inputSchema: z.object({
  userId: z.string().describe("ID of the user."),
  body: z.array(z.number().int())
}),
      handler: async (params) => {
  try {
    const url = `/api/license-manager/users/${params.userId}/roles`;
    const response = await http.put(url, params.body);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request - A userId or role list with invalid format. The message on the body of the response will contain further information.");
      case 500:
        throw new Error("Unexpected error - One possible reason is that the userId is not present on the database.");
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
      name: "license-manager_get_rolesby_user",
      description: "Get roles by user ID or API Key\nGET /api/license-manager/users/{userId}/roles",
      inputSchema: z.object({
  userId: z.string().describe("ID of the user.")
}),
      handler: async (params) => {
  try {
    const url = `/api/license-manager/users/${params.userId}/roles`;
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
      name: "license-manager_get_rolesby_user",
      description: "Get user information by user email\nGET /api/license-manager/users/{userEmail}/roles",
      inputSchema: z.object({
  userEmail: z.string().describe("Email of the user.")
}),
      handler: async (params) => {
  try {
    const url = `/api/license-manager/users/${params.userEmail}/roles`;
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
      name: "license-manager_remove_rolefrom_user",
      description: "Remove role from user or API Key\nDELETE /api/license-manager/users/{userId}/roles/{roleId}",
      inputSchema: z.object({
  userId: z.string().describe("ID of the user."),
  roleId: z.string().describe("ID of the role which will be removed from the user.")
}),
      handler: async (params) => {
  try {
    const url = `/api/license-manager/users/${params.userId}/roles/${params.roleId}`;
    const response = await http.delete(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 400:
        throw new Error("Bad Request - A userId or role list with invalid format. The message on the body of the response will contain further information.");
      case 405:
        throw new Error("Method Not Allowed");
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
      name: "license-manager_get_list_roles",
      description: "Get list of roles\nGET /api/license-manager/site/pvt/roles/list/paged",
      inputSchema: z.object({
  numItems: z.number().int().optional().describe("Number of items in the returned page."),
  pageNumber: z.number().int().optional().describe("Which page from the whole list will be returned."),
  sort: z.string().optional().describe("Chooses the field that the list will be sorted by."),
  sortType: z.string().optional().describe("Defines the sorting order. `ASC` is used for ascendant order. `DSC` is used for descendant order.")
}),
      handler: async (params) => {
  try {
    const url = "/api/license-manager/site/pvt/roles/list/paged";
    const queryParams: Record<string, unknown> = {};
    if (params.numItems !== undefined) queryParams["numItems"] = params.numItems;
    if (params.pageNumber !== undefined) queryParams["pageNumber"] = params.pageNumber;
    if (params.sort !== undefined) queryParams["sort"] = params.sort;
    if (params.sortType !== undefined) queryParams["sortType"] = params.sortType;
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
      name: "license-manager_createnewappkey",
      description: "Create new API Key\nPOST /api/vlm/appkeys",
      inputSchema: z.object({
  body: z.object({ label: z.string() })
}),
      handler: async (params) => {
  try {
    const url = "/api/vlm/appkeys";
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
      name: "license-manager_getappkeysfromaccount",
      description: "Get API keys from account\nGET /api/vlm/appkeys",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/vlm/appkeys";
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
      name: "license-manager_updateappkey",
      description: "Update API Key\nPUT /api/vlm/appkeys/{id}",
      inputSchema: z.object({
  id: z.string().describe("ID from the API Key which will be updated"),
  body: z.object({ isActive: z.boolean() })
}),
      handler: async (params) => {
  try {
    const url = `/api/vlm/appkeys/${params.id}`;
    const response = await http.put(url, params.body);
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
      name: "license-manager_get_by_account",
      description: "Get stores\nGET /api/vlm/account/stores",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/vlm/account/stores";
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
      name: "license-manager_get_account",
      description: "Get information about account\nGET /api/vlm/account",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/vlm/account";
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
