import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "session-manager_createnewsession",
      description: "Create new session\nPOST /api/sessions",
      inputSchema: z.object({
  body: z.object({ public: z.object({ additionalProperties: z.object({ value: z.string().optional() }).optional() }) })
}),
      handler: async (params) => {
  try {
    const url = "/api/sessions";
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
      name: "session-manager_get_session",
      description: "Get session\nGET /api/sessions",
      inputSchema: z.object({
  items: z.string().describe("Items are the keys of the values you wish to get. They follow the format `namespace1.key1,namespace2.key2`.\n\r\n\rIf you wish to recover the data sent on [Create new session](https://developers.vtex.com/docs/api-reference/session-manager-api#post-/api/sessions), it should be `public.{key}`, replacing `{key}` with the name of the custom property you created. Following the example request presented in [Create new session](https://developers.vtex.com/docs/api-reference/session-manager-api#post-/api/sessions), it would be `public.variable1,public.variable2`.\n\r\n\rIf you want to retrieve all keys from Session Manager, you can use the wildcard operator (`*`) as a value for this query parameter.")
}),
      handler: async (params) => {
  try {
    const url = "/api/sessions";
    const queryParams: Record<string, unknown> = {};
    if (params.items !== undefined) queryParams["items"] = params.items;
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
      name: "session-manager_editsession",
      description: "Edit session\nPATCH /api/sessions",
      inputSchema: z.object({
  body: z.object({ public: z.object({ additionalProperties: z.object({ value: z.string().optional() }).optional() }) })
}),
      handler: async (params) => {
  try {
    const url = "/api/sessions";
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
      name: "session-manager_get_segment",
      description: "Get segment\nGET /api/segments",
      inputSchema: z.object({}),
      handler: async (params) => {
  try {
    const url = "/api/segments";
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
