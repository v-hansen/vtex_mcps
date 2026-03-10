import type { ToolDefinition } from "@vtex-mcp/shared";
import { z } from "zod";
import type { AxiosInstance } from "axios";

export function tools(http: AxiosInstance): ToolDefinition[] {
  return [
    {
      name: "shipping-network_notify_carrierwith_app",
      description: "Notify carrier with app\nPOST /{app_name}/v{app_version}/{account}/{workspace}/notify",
      inputSchema: z.object({
  app_name: z.string().default("{{app name}}").describe("Name of the app developed by the carrier's integration."),
  app_version: z.string().default("{{version}}").describe("Version of the app developed by the carrier's integration."),
  account: z.string().default("VTEX Store example").describe("VTEX account dispatching the package."),
  workspace: z.string().default("master").describe("Workspace used in VTEX IO. "),
  body: z.object({ account: z.object({ name: z.string(), accountName: z.string(), isOperating: z.boolean(), defaultUrl: z.string(), district: z.string(), country: z.string(), complement: z.string(), companyName: z.string(), cnpj: z.string(), city: z.string(), address: z.string(), number: z.string(), postalCode: z.string(), state: z.string(), telephone: z.string(), tradingName: z.string() }), email: z.string(), dispatchOrder: z.object({ id: z.string(), packageIds: z.array(z.string()), sender: z.object({ cnpj: z.string(), fantasyName: z.string(), stateRegistration: z.string(), id: z.string(), name: z.string(), address: z.object({ postalCode: z.string(), country: z.object({ code: z.string(), name: z.string() }), subregion1: z.object({ code: z.string(), name: z.string() }), subregion2: z.object({ code: z.string(), name: z.string() }), subregion3: z.object({ code: z.string(), name: z.string() }), street: z.string(), number: z.string(), complement: z.string(), location: z.object({ lat: z.number(), lng: z.number() }) }), email: z.string(), phone: z.string() }), carrier: z.object({ cnpj: z.string(), fantasyName: z.string(), stateRegistration: z.string(), id: z.string(), name: z.string(), address: z.object({ postalCode: z.string(), country: z.object({ code: z.string(), name: z.string() }), subregion1: z.object({ code: z.string(), name: z.string() }), subregion2: z.object({ code: z.string(), name: z.string() }), subregion3: z.object({ code: z.string(), name: z.string() }), street: z.string(), number: z.string(), complement: z.string(), location: z.object({ lat: z.number(), lng: z.number() }) }), email: z.string(), phone: z.string() }) }) })
}),
      handler: async (params) => {
  try {
    const url = `/${params.app_name}/v${params.app_version}/${params.account}/${params.workspace}/notify`;
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
      name: "shipping-network_tracking_events",
      description: "Tracking events with app\nPOST /{app_name}/v{app_version}/{account}/{workspace}/tracking",
      inputSchema: z.object({
  app_name: z.string().default("{{app name}}").describe("Name of the app developed by the carrier's integration."),
  app_version: z.string().default("{{version}}").describe("Version of the app developed by the carrier's integration."),
  account: z.string().default("VTEX Store example").describe("VTEX account dispatching the package."),
  workspace: z.string().default("master").describe("Workspace used in VTEX IO. "),
  body: z.array(z.object({ trackingNumber: z.string() }))
}),
      handler: async (params) => {
  try {
    const url = `/${params.app_name}/v${params.app_version}/${params.account}/${params.workspace}/tracking`;
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
