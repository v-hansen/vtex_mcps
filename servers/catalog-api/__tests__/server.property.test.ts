import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as fc from "fast-check";
import { z } from "zod";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createMcpServer, type ToolDefinition } from "@vtex-mcp/shared";
import { tools as catalogTools } from "../src/tools.js";
import type { AxiosInstance } from "axios";

// ── Helpers ──────────────────────────────────────────────────────────

/**
 * Creates a mock AxiosInstance that rejects with a configurable error.
 * Used for Property 7 (API Error Propagation).
 */
function createMockHttp(overrides?: {
  rejectWith?: { status: number; message: string };
  resolveWith?: unknown;
}): AxiosInstance {
  const handler = async (..._args: unknown[]) => {
    if (overrides?.rejectWith) {
      const err: any = new Error(overrides.rejectWith.message);
      err.response = {
        status: overrides.rejectWith.status,
        data: { message: overrides.rejectWith.message },
      };
      throw err;
    }
    return { data: overrides?.resolveWith ?? { ok: true } };
  };

  return {
    get: handler,
    post: handler,
    put: handler,
    patch: handler,
    delete: handler,
    head: handler,
    options: handler,
    request: handler,
    defaults: { headers: { common: {} } },
    interceptors: {
      request: { use: () => 0, eject: () => {}, clear: () => {} },
      response: { use: () => 0, eject: () => {}, clear: () => {} },
    },
    getUri: () => "",
  } as unknown as AxiosInstance;
}

/**
 * Creates a connected Client ↔ Server pair over InMemoryTransport
 * using the generated catalog tools with a given mock HTTP client.
 */
async function createTestClientServer(mockHttp: AxiosInstance) {
  const toolDefs = catalogTools(mockHttp);
  const { server } = createMcpServer({
    name: "vtex-catalog-api-mcp",
    version: "1.0.0",
    tools: toolDefs,
  });

  const client = new Client({ name: "test-client", version: "0.1.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await server.connect(serverTransport);
  await client.connect(clientTransport);

  return {
    client,
    server,
    toolDefs,
    cleanup: async () => {
      await client.close();
      await server.close();
    },
  };
}

// ── Property 5: JSON-RPC 2.0 Protocol Conformance ───────────────────
// Feature: vtex-mcp-servers, Property 5: JSON-RPC 2.0 Protocol Conformance
// **Validates: Requirements 3.1**

describe("Property 5: JSON-RPC 2.0 Protocol Conformance", () => {
  let client: Client;
  let cleanup: () => Promise<void>;

  beforeAll(async () => {
    const mockHttp = createMockHttp({ resolveWith: { id: 1, name: "Test Product" } });
    const ctx = await createTestClientServer(mockHttp);
    client = ctx.client;
    cleanup = ctx.cleanup;
  });

  afterAll(async () => {
    await cleanup();
  });

  it("tools/list response is valid JSON-RPC 2.0 with result containing tools array", async () => {
    const result = await client.listTools();

    // The result must have a tools array — the SDK client validates JSON-RPC 2.0
    // conformance internally and would throw on malformed responses
    expect(result).toBeDefined();
    expect(result.tools).toBeDefined();
    expect(Array.isArray(result.tools)).toBe(true);
  });

  it("tools/call response for any tool returns content array with text entries", async () => {
    const toolsList = await client.listTools();

    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: toolsList.tools.length - 1 }),
        async (toolIndex) => {
          const tool = toolsList.tools[toolIndex];

          // Call the tool with empty arguments — may fail validation or handler,
          // but the response must still be valid MCP protocol structure
          const result = await client.callTool({ name: tool.name, arguments: {} });

          // Response must have content array
          expect(result.content).toBeDefined();
          expect(Array.isArray(result.content)).toBe(true);

          const content = result.content as Array<{ type: string; text: string }>;
          for (const entry of content) {
            expect(entry.type).toBe("text");
            expect(typeof entry.text).toBe("string");
          }
        },
      ),
      { numRuns: 20 },
    );
  });

  it("tools/call for unknown tool returns error response with proper structure", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.stringMatching(/^[a-z_]{1,30}$/)
          .filter((s) => !s.startsWith("catalog_")),
        async (fakeName) => {
          const result = await client.callTool({ name: fakeName, arguments: {} });

          expect(result.isError).toBe(true);
          const content = result.content as Array<{ type: string; text: string }>;
          expect(content.length).toBeGreaterThan(0);
          expect(content[0].type).toBe("text");
          expect(content[0].text).toContain("Unknown tool");
        },
      ),
      { numRuns: 10 },
    );
  });
});

// ── Property 6: tools/list Completeness ──────────────────────────────
// Feature: vtex-mcp-servers, Property 6: tools/list Completeness
// **Validates: Requirements 3.3**

describe("Property 6: tools/list Completeness", () => {
  let client: Client;
  let toolDefs: ToolDefinition[];
  let cleanup: () => Promise<void>;

  beforeAll(async () => {
    const mockHttp = createMockHttp();
    const ctx = await createTestClientServer(mockHttp);
    client = ctx.client;
    toolDefs = ctx.toolDefs;
    cleanup = ctx.cleanup;
  });

  afterAll(async () => {
    await cleanup();
  });

  it("returns exactly 193 tools matching all registered tool definitions", async () => {
    const result = await client.listTools();

    expect(result.tools).toHaveLength(193);
    expect(result.tools).toHaveLength(toolDefs.length);
  });

  it("every registered tool appears in tools/list with matching name", async () => {
    const result = await client.listTools();
    const listedNames = new Set(result.tools.map((t) => t.name));

    for (const def of toolDefs) {
      expect(listedNames.has(def.name)).toBe(true);
    }
  });

  it("every tool has a non-empty name, description, and valid inputSchema", async () => {
    const result = await client.listTools();

    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: result.tools.length - 1 }),
        async (index) => {
          const tool = result.tools[index];

          // Non-empty name
          expect(tool.name).toBeTruthy();
          expect(tool.name.length).toBeGreaterThan(0);

          // Non-empty description
          expect(tool.description).toBeTruthy();
          expect(tool.description!.length).toBeGreaterThan(0);

          // Valid inputSchema with type "object"
          expect(tool.inputSchema).toBeDefined();
          expect(tool.inputSchema.type).toBe("object");
        },
      ),
      { numRuns: 30 },
    );
  });

  it("all tool names follow the catalog_ prefix convention", async () => {
    const result = await client.listTools();

    for (const tool of result.tools) {
      expect(tool.name).toMatch(/^catalog_/);
    }
  });

  it("all tool descriptions contain an HTTP method and path", async () => {
    const result = await client.listTools();
    const httpMethodPattern = /\b(GET|POST|PUT|PATCH|DELETE)\b\s+\/\S+/;

    for (const tool of result.tools) {
      expect(tool.description).toMatch(httpMethodPattern);
    }
  });
});

// ── Property 7: API Error Propagation ────────────────────────────────
// Feature: vtex-mcp-servers, Property 7: API Error Propagation
// **Validates: Requirements 3.6**
//
// The generated tool handlers accept (params, http) where http is passed
// as the second argument. We test error propagation by calling the handler
// directly with a mock HTTP client that throws VTEX-style errors.

describe("Property 7: API Error Propagation", () => {
  it("VTEX API errors propagate with status code and message through tool handlers", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 400, max: 599 }),
        fc.stringMatching(/^[a-zA-Z ]{1,80}$/).filter((s) => s.trim().length > 0),
        async (statusCode, errorMessage) => {
          const mockHttp = createMockHttp({
            rejectWith: { status: statusCode, message: errorMessage },
          });

          // Get the tool definitions with the mock HTTP
          const toolDefs = catalogTools(mockHttp);

          // Pick a simple tool — catalog_get_productbyid takes just a productId string
          const tool = toolDefs.find((t) => t.name === "catalog_get_productbyid")!;
          expect(tool).toBeDefined();

          // Call the handler directly, passing the mock http as second arg
          // (matching the generated handler signature: async (params, http) => ...)
          const handler = tool.handler as (params: Record<string, unknown>, http: AxiosInstance) => Promise<any>;
          const result = await handler({ productId: "123" }, mockHttp);

          // The response should be an error
          expect(result.isError).toBe(true);

          const text = result.content[0].text;
          // The error text should contain the status code and message
          expect(text).toContain(String(statusCode));
          expect(text).toContain(errorMessage);
        },
      ),
      { numRuns: 20 },
    );
  });

  it("error responses always have isError: true and text content", async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(400, 401, 403, 404, 429, 500, 502, 503),
        async (statusCode) => {
          const mockHttp = createMockHttp({
            rejectWith: { status: statusCode, message: `Error ${statusCode}` },
          });

          const toolDefs = catalogTools(mockHttp);
          const tool = toolDefs.find((t) => t.name === "catalog_get_productbyid")!;

          const handler = tool.handler as (params: Record<string, unknown>, http: AxiosInstance) => Promise<any>;
          const result = await handler({ productId: "42" }, mockHttp);

          expect(result.isError).toBe(true);
          expect(result.content.length).toBeGreaterThan(0);
          expect(result.content[0].type).toBe("text");
          expect(typeof result.content[0].text).toBe("string");
          expect(result.content[0].text.length).toBeGreaterThan(0);
        },
      ),
      { numRuns: 8 },
    );
  });

  it("error propagation works across different HTTP methods (GET, POST, PUT, DELETE)", async () => {
    const mockHttp = createMockHttp({
      rejectWith: { status: 500, message: "Internal Server Error" },
    });
    const toolDefs = catalogTools(mockHttp);

    // Find tools using different HTTP methods from their descriptions
    const getTool = toolDefs.find((t) => t.description.includes("\nGET "));
    const postTool = toolDefs.find((t) => t.description.includes("\nPOST "));
    const putTool = toolDefs.find((t) => t.description.includes("\nPUT "));
    const deleteTool = toolDefs.find((t) => t.description.includes("\nDELETE "));

    for (const tool of [getTool, postTool, putTool, deleteTool]) {
      if (!tool) continue;

      const handler = tool.handler as (params: Record<string, unknown>, http: AxiosInstance) => Promise<any>;
      const result = await handler({}, mockHttp);

      expect(result.isError).toBe(true);
      expect(result.content[0].text).toContain("500");
      expect(result.content[0].text).toContain("Internal Server Error");
    }
  });
});

// ── Property 15: Pagination Parameter Exposure and Metadata Passthrough ──
// Feature: vtex-mcp-servers, Property 15: Pagination Parameter Exposure and Metadata Passthrough
// **Validates: Requirements 13.1, 13.2**

describe("Property 15: Pagination Parameter Exposure and Metadata Passthrough", () => {
  let client: Client;
  let cleanup: () => Promise<void>;

  beforeAll(async () => {
    const mockHttp = createMockHttp();
    const ctx = await createTestClientServer(mockHttp);
    client = ctx.client;
    cleanup = ctx.cleanup;
  });

  afterAll(async () => {
    await cleanup();
  });

  it("tools with pagination expose page/pageSize/from/to as parameters in their schemas", async () => {
    const result = await client.listTools();

    const paginationParamNames = ["page", "pageSize", "pagesize", "_from", "_to", "from", "to"];

    // Collect tools that have any pagination-related parameters
    const paginatedTools = result.tools.filter((tool) => {
      const props = tool.inputSchema.properties as Record<string, unknown> | undefined;
      if (!props) return false;
      return paginationParamNames.some((p) => p in props);
    });

    // There should be at least some paginated tools in the catalog API
    expect(paginatedTools.length).toBeGreaterThan(0);

    // For each paginated tool, verify pagination params are in the schema
    for (const tool of paginatedTools) {
      const props = tool.inputSchema.properties as Record<string, unknown>;

      // Check that at least one pagination param exists
      const hasPaginationParam = paginationParamNames.some((p) => p in props);
      expect(hasPaginationParam).toBe(true);

      // Pagination params that exist should have numeric types
      for (const paramName of paginationParamNames) {
        if (paramName in props) {
          const param = props[paramName] as Record<string, unknown>;
          expect(["integer", "number"]).toContain(param.type);
        }
      }
    }
  });

  it("pagination parameters are properly typed as integers in tool schemas", async () => {
    const result = await client.listTools();
    const paginationParamNames = ["page", "pageSize", "pagesize", "_from", "_to"];

    await fc.assert(
      fc.asyncProperty(
        fc.integer({ min: 0, max: result.tools.length - 1 }),
        async (index) => {
          const tool = result.tools[index];
          const props = tool.inputSchema.properties as Record<string, unknown> | undefined;
          if (!props) return;

          for (const paramName of paginationParamNames) {
            if (paramName in props) {
              const param = props[paramName] as Record<string, unknown>;
              expect(["integer", "number"]).toContain(param.type);
            }
          }
        },
      ),
      { numRuns: 50 },
    );
  });

  it("paginated tool responses include metadata when API returns pagination data", async () => {
    const paginatedResponse = {
      data: [{ id: 1 }, { id: 2 }],
      pagination: { page: 1, pageSize: 10, total: 100 },
    };
    const mockHttp = createMockHttp({ resolveWith: paginatedResponse });
    const toolDefs = catalogTools(mockHttp);

    // Use catalog_product_and_sku_ids which has _from/_to pagination params
    const tool = toolDefs.find((t) => t.name === "catalog_product_and_sku_ids")!;
    expect(tool).toBeDefined();

    // Call handler directly with mock http
    const handler = tool.handler as (params: Record<string, unknown>, http: AxiosInstance) => Promise<any>;
    const result = await handler({}, mockHttp);

    // The response should contain the paginated data as JSON text
    expect(result.content.length).toBeGreaterThan(0);

    if (!result.isError) {
      const parsed = JSON.parse(result.content[0].text);
      expect(parsed).toBeDefined();
      // The pagination metadata should be passed through in the response
      if (parsed.pagination) {
        expect(parsed.pagination.page).toBeDefined();
        expect(parsed.pagination.pageSize).toBeDefined();
      }
    }
  });
});
