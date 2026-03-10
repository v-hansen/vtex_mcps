import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";
import { tools } from "./tools.js";

const config = loadConfig();
const httpClient = createHttpClient(config);

export const server = createMcpServer({
  name: "vtex-master-data-api-v2-mcp",
  version: "1.0.0",
  tools: tools(httpClient),
});

// VTEX Master Data Api V2 MCP Server
