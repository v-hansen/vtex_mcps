#!/usr/bin/env node
import { parseArgs } from "node:util";
import { createMcpServer } from "@vtex-mcp/shared";
import { tools } from "./tools.js";
import { executeCommand, validateCliAvailable } from "./cli-executor.js";
import type { ExecutorOptions } from "./cli-executor.js";

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

const { values } = parseArgs({
  options: {
    transport: { type: "string", default: "stdio" },
    port: { type: "string", default: "3000" },
  },
});

// ---------------------------------------------------------------------------
// Environment variables
// ---------------------------------------------------------------------------

const cliPath = process.env.VTEX_CLI_PATH ?? "vtex";
const timeout = process.env.VTEX_CLI_TIMEOUT
  ? parseInt(process.env.VTEX_CLI_TIMEOUT, 10)
  : 120_000;
const cwd = process.env.VTEX_CLI_CWD ?? process.cwd();

// ---------------------------------------------------------------------------
// Startup validation
// ---------------------------------------------------------------------------

try {
  const version = await validateCliAvailable(cliPath);
  console.error(`[vtex-cli-mcp] VTEX CLI version: ${version}`);
} catch (error) {
  console.error(
    (error as Error).message ??
      "Failed to validate VTEX CLI availability.",
  );
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Executor options
// ---------------------------------------------------------------------------

const executorOptions: Partial<ExecutorOptions> = {
  cliPath,
  timeout,
  cwd,
};

const executor = {
  executeCommand: (subcommand: string, args: string[]) =>
    executeCommand(subcommand, args, executorOptions),
};

// ---------------------------------------------------------------------------
// MCP server
// ---------------------------------------------------------------------------

const server = createMcpServer({
  name: "vtex-cli-mcp",
  version: "1.0.0",
  tools: tools(executor),
});

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

if (values.transport === "http") {
  server.startHttp({ port: parseInt(values.port!, 10) });
} else {
  server.startStdio();
}
