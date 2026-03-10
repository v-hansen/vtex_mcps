#!/usr/bin/env node
import { parseArgs } from "node:util";
import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";
import { tools } from "./tools.js";

const { values } = parseArgs({
  options: {
    transport: { type: "string", default: "stdio" },
    port: { type: "string", default: "3000" },
  },
});

const config = loadConfig();
const httpClient = createHttpClient(config);
const server = createMcpServer({
  name: "vtex-promotions-and-taxes-api-mcp",
  version: "1.0.0",
  tools: tools(httpClient),
});

if (values.transport === "http") {
  server.startHttp({ port: parseInt(values.port!, 10) });
} else {
  server.startStdio();
}
