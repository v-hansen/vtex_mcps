import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import type { ZodSchema } from "zod";
import { validateParams } from "./validation.js";
import { formatMcpError } from "./errors.js";

/**
 * A single MCP tool definition with Zod-based input validation.
 */
export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: ZodSchema;
  handler: (params: Record<string, unknown>) => Promise<ToolResult>;
}

/**
 * The result shape returned by tool handlers.
 */
export interface ToolResult {
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

/**
 * The object returned by `createMcpServer`, exposing transport starters
 * and the underlying SDK Server for advanced use.
 */
export interface McpServerInstance {
  server: Server;
  startStdio: () => Promise<void>;
  startHttp: (options: { port: number }) => Promise<void>;
}

/**
 * Creates an MCP server instance with registered tools and transport helpers.
 *
 * Wraps `@modelcontextprotocol/sdk` Server, registers tools/list and tools/call
 * handlers, and provides `startStdio()` and `startHttp()` for transport setup.
 */
export function createMcpServer(options: {
  name: string;
  version: string;
  tools: ToolDefinition[];
}): McpServerInstance {
  const { name, version, tools } = options;

  const server = new Server(
    { name, version },
    { capabilities: { tools: {} } },
  );

  // --- tools/list handler ---
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: zodToJsonSchema(t.inputSchema, {
        target: "openApi3",
        $refStrategy: "none",
      }) as Record<string, unknown>,
    })),
  }));

  // --- tools/call handler ---
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name: toolName, arguments: args } = request.params;
    const tool = tools.find((t) => t.name === toolName);

    if (!tool) {
      return {
        content: [{ type: "text" as const, text: `Unknown tool: ${toolName}` }],
        isError: true,
      } as const;
    }

    const params = (args ?? {}) as Record<string, unknown>;
    const validation = validateParams(params, tool.inputSchema);

    if (!validation.success) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Invalid parameters: ${validation.errors.join("; ")}`,
          },
        ],
        isError: true,
      } as const;
    }

    try {
      const result = await tool.handler(validation.data);
      return { content: result.content, isError: result.isError };
    } catch (error: unknown) {
      return formatMcpError(error);
    }
  });

  // --- transport helpers ---

  async function startStdio(): Promise<void> {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  }

  async function startHttp({ port }: { port: number }): Promise<void> {
    const express = await import("express");
    const app = express.default();

    // Map of sessionId → SSEServerTransport for routing POST messages
    const transports = new Map<string, SSEServerTransport>();

    // GET /sse — establish SSE connection
    app.get("/sse", async (req, res) => {
      const transport = new SSEServerTransport("/messages", res);
      transports.set(transport.sessionId, transport);

      res.on("close", () => {
        transports.delete(transport.sessionId);
      });

      await server.connect(transport);
    });

    // POST /messages — receive client-to-server messages
    app.post("/messages", async (req, res) => {
      const sessionId =
        typeof req.query.sessionId === "string" ? req.query.sessionId : undefined;

      if (!sessionId || !transports.has(sessionId)) {
        res.status(400).json({ error: "Invalid or missing sessionId" });
        return;
      }

      const transport = transports.get(sessionId)!;
      await transport.handlePostMessage(req, res);
    });

    await new Promise<void>((resolve) => {
      app.listen(port, () => resolve());
    });
  }

  return { server, startStdio, startHttp };
}
