import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";
import { tools } from "./tools.js";

const config = loadConfig();
const httpClient = createHttpClient(config);

export const server = createMcpServer({
  name: "vtex-intelligent-search-events-api-mcp",
  version: "1.0.0",
  tools: tools(httpClient),
});

// VTEX Intelligent Search Events Api MCP Server
