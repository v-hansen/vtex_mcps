import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";
import { tools } from "./tools.js";

const config = loadConfig();
const httpClient = createHttpClient(config);

export const server = createMcpServer({
  name: "vtex-reviews-and-ratings-api-mcp",
  version: "1.0.0",
  tools: tools(httpClient),
});

// VTEX Reviews And Ratings Api MCP Server
