import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";
import { tools } from "./tools.js";

const config = loadConfig();
const httpClient = createHttpClient(config);

export const server = createMcpServer({
  name: "vtex-category-api-mcp",
  version: "1.0.0",
  tools: tools(httpClient),
});

// VTEX Category Api MCP Server
