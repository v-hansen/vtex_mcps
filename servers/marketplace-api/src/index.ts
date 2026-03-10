import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";
import { tools } from "./tools.js";

const config = loadConfig();
const httpClient = createHttpClient(config);

export const server = createMcpServer({
  name: "vtex-marketplace-api-mcp",
  version: "1.0.0",
  tools: tools(httpClient),
});

// VTEX Marketplace Api MCP Server
