import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { z } from "zod";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createMcpServer, type ToolDefinition } from "../src/server-factory.js";

/**
 * Helper: creates a connected Client ↔ Server pair over InMemoryTransport.
 */
async function createTestClientServer(tools: ToolDefinition[]) {
  const { server } = createMcpServer({
    name: "test-server",
    version: "0.1.0",
    tools,
  });

  const client = new Client({ name: "test-client", version: "0.1.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await server.connect(serverTransport);
  await client.connect(clientTransport);

  return { client, server, cleanup: async () => {
    await client.close();
    await server.close();
  }};
}

// ── Shared fixtures ──────────────────────────────────────────────────

const echoTool: ToolDefinition = {
  name: "echo",
  description: "Echoes the input message back.",
  inputSchema: z.object({ message: z.string() }),
  handler: async (params) => ({
    content: [{ type: "text", text: params.message as string }],
  }),
};

const addTool: ToolDefinition = {
  name: "add_numbers",
  description: "Adds two numbers. GET /api/math/add",
  inputSchema: z.object({ a: z.number(), b: z.number() }),
  handler: async (params) => ({
    content: [{ type: "text", text: String((params.a as number) + (params.b as number)) }],
  }),
};

const failingTool: ToolDefinition = {
  name: "always_fail",
  description: "Always throws an error.",
  inputSchema: z.object({}),
  handler: async () => {
    throw new Error("Something went wrong");
  },
};

// ── Tests ────────────────────────────────────────────────────────────

describe("createMcpServer", () => {
  describe("initialize handshake (Req 3.7)", () => {
    it("returns server name, version, and tools capability", async () => {
      const { client, cleanup } = await createTestClientServer([echoTool]);

      const serverVersion = client.getServerVersion();
      expect(serverVersion).toBeDefined();
      expect(serverVersion!.name).toBe("test-server");
      expect(serverVersion!.version).toBe("0.1.0");

      const capabilities = client.getServerCapabilities();
      expect(capabilities).toBeDefined();
      expect(capabilities!.tools).toBeDefined();

      await cleanup();
    });
  });

  describe("tools/list (Req 3.1, 3.3)", () => {
    it("returns all registered tools with schemas", async () => {
      const { client, cleanup } = await createTestClientServer([echoTool, addTool]);

      const result = await client.listTools();
      expect(result.tools).toHaveLength(2);

      const names = result.tools.map((t) => t.name);
      expect(names).toContain("echo");
      expect(names).toContain("add_numbers");

      // Each tool has a description and inputSchema
      for (const tool of result.tools) {
        expect(tool.description).toBeTruthy();
        expect(tool.inputSchema).toBeDefined();
        expect(tool.inputSchema.type).toBe("object");
      }

      await cleanup();
    });

    it("returns empty list when no tools registered", async () => {
      const { client, cleanup } = await createTestClientServer([]);

      const result = await client.listTools();
      expect(result.tools).toHaveLength(0);

      await cleanup();
    });

    it("includes correct JSON Schema properties for tool inputs", async () => {
      const { client, cleanup } = await createTestClientServer([addTool]);

      const result = await client.listTools();
      const tool = result.tools[0];

      expect(tool.inputSchema.properties).toBeDefined();
      expect(tool.inputSchema.properties!["a"]).toBeDefined();
      expect(tool.inputSchema.properties!["b"]).toBeDefined();
      expect(tool.inputSchema.required).toContain("a");
      expect(tool.inputSchema.required).toContain("b");

      await cleanup();
    });
  });

  describe("tools/call with valid params (Req 3.4)", () => {
    it("executes handler and returns result", async () => {
      const { client, cleanup } = await createTestClientServer([echoTool]);

      const result = await client.callTool({ name: "echo", arguments: { message: "hello" } });
      expect(result.content).toBeDefined();
      expect(Array.isArray(result.content)).toBe(true);

      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].type).toBe("text");
      expect(content[0].text).toBe("hello");
      expect(result.isError).toBeFalsy();

      await cleanup();
    });

    it("passes validated params to handler", async () => {
      const { client, cleanup } = await createTestClientServer([addTool]);

      const result = await client.callTool({ name: "add_numbers", arguments: { a: 3, b: 7 } });
      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toBe("10");

      await cleanup();
    });

    it("returns isError when handler throws", async () => {
      const { client, cleanup } = await createTestClientServer([failingTool]);

      const result = await client.callTool({ name: "always_fail", arguments: {} });
      expect(result.isError).toBe(true);

      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain("Something went wrong");

      await cleanup();
    });
  });

  describe("tools/call with invalid params (Req 3.5)", () => {
    it("returns error for missing required params", async () => {
      const { client, cleanup } = await createTestClientServer([echoTool]);

      const result = await client.callTool({ name: "echo", arguments: {} });
      expect(result.isError).toBe(true);

      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain("Invalid parameters");
      expect(content[0].text).toContain("message");

      await cleanup();
    });

    it("returns error for wrong param types", async () => {
      const { client, cleanup } = await createTestClientServer([addTool]);

      const result = await client.callTool({
        name: "add_numbers",
        arguments: { a: "not-a-number", b: 5 },
      });
      expect(result.isError).toBe(true);

      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain("Invalid parameters");

      await cleanup();
    });

    it("returns error for unknown tool name", async () => {
      const { client, cleanup } = await createTestClientServer([echoTool]);

      const result = await client.callTool({ name: "nonexistent", arguments: {} });
      expect(result.isError).toBe(true);

      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain("Unknown tool");

      await cleanup();
    });
  });
});
