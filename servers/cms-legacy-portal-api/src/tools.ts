import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "cms-legacy-portal_changeentireaccount(allwebsites)",
      description: "Update all account's websites internet communication protocol\nPUT /api/catalog_system/pvt/virtualfolder/changeurischema/{protocol}",
      inputSchema: z.object({
  protocol: z.string().describe("Internet communication protocol, it can be `HTTP` or `HTTPS`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/virtualfolder/changeurischema/${params.protocol}`;
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
      name: "cms-legacy-portal_changespecificwebsite",
      description: "Update specific website comunication protocol\nPUT /api/catalog_system/pvt/virtualfolder/site/{websiteId}/changeurischema/{protocol}",
      inputSchema: z.object({
  websiteId: z.string().describe("Specific website ID."),
  protocol: z.string().describe("Internet communication protocol, it can be `HTTP` or `HTTPS`.")
}),
      handler: async (params) => {
  try {
    const url = `/api/catalog_system/pvt/virtualfolder/site/${params.websiteId}/changeurischema/${params.protocol}`;
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
