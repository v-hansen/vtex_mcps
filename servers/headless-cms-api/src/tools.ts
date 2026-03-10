import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "headless-cms_get_all_content_types",
      description: "Get all content types\nGET /_v/cms/api/{projectId}",
      inputSchema: z.object({
  projectId: z.string().describe("Project ID specified in the settings of the CMS (alpha) app.")
}),
      handler: async (params) => {
  try {
    const url = `/_v/cms/api/${params.projectId}`;
    const response = await http.get(url);
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "headless-cms_get_pagesby_content_type",
      description: "Get all CMS pages by content type\nGET /_v/cms/api/{projectId}/{content-type}",
      inputSchema: z.object({
  projectId: z.string().describe("Project ID specified in the settings of the CMS (alpha) app."),
  "content-type": z.string().describe("Content type identifier defined in the FastStore project."),
  page: z.string().optional().describe("The page number to retrieve in a paginated list of results. If not specified, the default return is 10 items per page."),
  versionId: z.string().optional().describe("Version ID presented in the URL path of a CMS preview."),
  releaseId: z.string().optional().describe("Release ID presented in the URL path of a CMS preview."),
  "filters[{field}]": z.string().optional().describe("Filter results by a property of the page (e.g., `filters[status]`) or by a nested custom field of the `parameters` object (e.g., `filters[parameters.collection.sort]`).\n*Replace {field} with the desired property.*")
}),
      handler: async (params) => {
  try {
    const url = `/_v/cms/api/${params.projectId}/${params["content-type"]}`;
    const queryParams: Record<string, unknown> = {};
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.versionId !== undefined) queryParams["versionId"] = params.versionId;
    if (params.releaseId !== undefined) queryParams["releaseId"] = params.releaseId;
    if (params["filters[{field}]"] !== undefined) queryParams["filters[{field}]"] = params["filters[{field}]"];
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
      name: "headless-cms_get_cm_spage",
      description: "Get CMS page\nGET /_v/cms/api/{projectId}/{content-type}/{document-id}",
      inputSchema: z.object({
  projectId: z.string().describe("Project ID specified in the settings of the CMS (alpha) app."),
  "content-type": z.string().describe("Content type ID defined in the FastStore project."),
  "document-id": z.string().describe("Document ID presented in the URL path of a CMS preview."),
  versionId: z.string().optional().describe("Version ID presented in the URL path of a CMS preview."),
  releaseId: z.string().optional().describe("Release ID presented in the URL path of a CMS preview.")
}),
      handler: async (params) => {
  try {
    const url = `/_v/cms/api/${params.projectId}/${params["content-type"]}/${params["document-id"]}`;
    const queryParams: Record<string, unknown> = {};
    if (params.versionId !== undefined) queryParams["versionId"] = params.versionId;
    if (params.releaseId !== undefined) queryParams["releaseId"] = params.releaseId;
    const response = await http.get(url, { params: queryParams });
    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
      case 404:
        throw new Error("Not Found");
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
    }
  ];
}
