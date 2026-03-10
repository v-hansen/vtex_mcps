import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";
import { tools } from "./tools.js";

const config = loadConfig();
const httpClient = createHttpClient(config);

export const server = createMcpServer({
  name: "vtex-sku-bindings-api-mcp",
  version: "1.0.0",
  tools: tools(httpClient),
});

// VTEX Sku Bindings Api MCP Server
