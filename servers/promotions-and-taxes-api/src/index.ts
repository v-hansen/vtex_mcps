import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";
import { tools } from "./tools.js";

const config = loadConfig();
const httpClient = createHttpClient(config);

export const server = createMcpServer({
  name: "vtex-promotions-and-taxes-api-mcp",
  version: "1.0.0",
  tools: tools(httpClient),
});

// VTEX Promotions And Taxes Api MCP Server
