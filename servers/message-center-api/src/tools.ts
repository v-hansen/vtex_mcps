import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "message-center_create_dkim",
      description: "Generate DKIM keys\nPOST /api/mail-service/pvt/providers/{EmailProvider}/dkim",
      inputSchema: z.object({
  EmailProvider: z.string().describe("Email address for the sender that was set up in VTEX mail servers.")
}),
      handler: async (params) => {
  try {
    const url = `/api/mail-service/pvt/providers/${params.EmailProvider}/dkim`;
    const response = await http.post(url);
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
    }
  ];
}
