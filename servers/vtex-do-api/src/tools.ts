import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "vtex-do_new_note",
      description: "Create note\nPOST /notes",
      inputSchema: z.object({
  body: z.object({ target: z.object({ id: z.string().optional(), type: z.string().optional(), url: z.string().optional() }), domain: z.string(), description: z.string(), createdBy: z.object({ id: z.string().optional(), name: z.string().optional() }).optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/notes";
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
      name: "vtex-do_get_notesbyorder_id",
      description: "Get notes by order ID\nGET /notes",
      inputSchema: z.object({
  "target.id": z.string().describe("Order ID."),
  perPage: z.number().int().optional().describe("Number of notes per page. Maximum: 30."),
  page: z.number().int().optional().describe("Number of the page to be retrieved."),
  reason: z.string().optional().describe("This parameter is relevant only for accounts using [Data Protection Plus](https://developers.vtex.com/docs/guides/data-protection-plus). When sending requests to this endpoint, accounts with the [PII data architecture](https://developers.vtex.com/docs/guides/pii-data-architecture-specifications) can use this parameter to declare the reason for requesting unmasked data. Otherwise, this endpoint will return masked PII data.")
}),
      handler: async (params) => {
  try {
    const url = "/notes";
    const queryParams: Record<string, unknown> = {};
    if (params["target.id"] !== undefined) queryParams["target.id"] = params["target.id"];
    if (params.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.reason !== undefined) queryParams["reason"] = params.reason;
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
      name: "vtex-do_get_note",
      description: "Retrieve note\nGET /notes/{noteId}",
      inputSchema: z.object({
  noteId: z.string().describe("Note ID."),
  reason: z.string().optional().describe("This parameter is relevant only for accounts using [Data Protection Plus](https://developers.vtex.com/docs/guides/data-protection-plus). When sending requests to this endpoint, accounts with the [PII data architecture](https://developers.vtex.com/docs/guides/pii-data-architecture-specifications) can use this parameter to declare the reason for requesting unmasked data. Otherwise, this endpoint will return masked PII data.")
}),
      handler: async (params) => {
  try {
    const url = `/notes/${params.noteId}`;
    const queryParams: Record<string, unknown> = {};
    if (params.reason !== undefined) queryParams["reason"] = params.reason;
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
      name: "vtex-do_new_task",
      description: "Create task\nPOST /tasks",
      inputSchema: z.object({
  body: z.object({ target: z.array(z.object({ id: z.string(), type: z.string(), url: z.string() })), domain: z.string(), context: z.string(), name: z.string(), priority: z.string(), surrogateKey: z.string(), description: z.string().optional(), dueDate: z.string(), assignee: z.object({ id: z.string().optional(), name: z.string().optional(), email: z.string() }), followers: z.array(z.object({ id: z.string().optional(), name: z.string().optional(), email: z.string() })), parentTaskId: z.string().optional() }).optional()
}),
      handler: async (params) => {
  try {
    const url = "/tasks";
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
      name: "vtex-do_listtasksbyassignee",
      description: "List tasks\nGET /tasks",
      inputSchema: z.object({
  "assignee.email": z.string().optional().describe("If you wish to list tasks by assignee, insert the desired assignee's email and status."),
  "target.id": z.string().optional().describe("If you wish to list tasks by target, insert the desired `targetId` and `status`."),
  context: z.string().optional().describe("If you wish to list tasks by context, insert the desired context, `page`, `perPage` and `status`."),
  page: z.string().optional().describe("If you wish to list tasks by context, also insert the desired `page`."),
  perPage: z.string().optional().describe("If you wish to list tasks by context, also insert the desired `perPage` value."),
  status: z.string().optional().describe("If you wish to list tasks by context, also insert the desired `status`.")
}),
      handler: async (params) => {
  try {
    const url = "/tasks";
    const queryParams: Record<string, unknown> = {};
    if (params["assignee.email"] !== undefined) queryParams["assignee.email"] = params["assignee.email"];
    if (params["target.id"] !== undefined) queryParams["target.id"] = params["target.id"];
    if (params.context !== undefined) queryParams["context"] = params.context;
    if (params.page !== undefined) queryParams["page"] = params.page;
    if (params.perPage !== undefined) queryParams["perPage"] = params.perPage;
    if (params.status !== undefined) queryParams["status"] = params.status;
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
      name: "vtex-do_get_task",
      description: "Retrieve task\nGET /tasks/{taskId}",
      inputSchema: z.object({
  taskId: z.string().describe("Task ID.")
}),
      handler: async (params) => {
  try {
    const url = `/tasks/${params.taskId}`;
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
      name: "vtex-do_edit_task",
      description: "Update task\nPUT /tasks/{taskId}",
      inputSchema: z.object({
  taskId: z.string().describe("Task ID."),
  body: z.object({ status: z.enum(["Open", "Closed", "Suspended", "InProgress"]) }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/tasks/${params.taskId}`;
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
      name: "vtex-do_add_comment",
      description: "Add comment on a task\nPOST /tasks/{taskId}/comments",
      inputSchema: z.object({
  taskId: z.string().describe("Task ID."),
  body: z.object({ text: z.string() }).optional()
}),
      handler: async (params) => {
  try {
    const url = `/tasks/${params.taskId}/comments`;
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
