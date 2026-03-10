import { describe, it, expect } from "vitest";
import { parseOpenApiSpec } from "../src/parser.js";
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function createTempSpec(spec: object): string {
  const dir = join(tmpdir(), `parser-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(dir, { recursive: true });
  const filePath = join(dir, "spec.json");
  writeFileSync(filePath, JSON.stringify(spec));
  return filePath;
}

function makeSpec(paths: Record<string, unknown> = {}): object {
  return {
    openapi: "3.0.3",
    info: { title: "Test API", version: "1.0.0" },
    paths,
  };
}

describe("parseOpenApiSpec", () => {
  it("parses a simple GET operation", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/products/{productId}": {
          get: {
            operationId: "getProduct",
            summary: "Get a product by ID",
            description: "Returns a single product",
            parameters: [
              {
                name: "productId",
                in: "path",
                required: true,
                schema: { type: "integer" },
                description: "The product ID",
              },
            ],
            responses: {
              "200": {
                description: "Successful response",
                content: {
                  "application/json": {
                    schema: { type: "object", properties: { id: { type: "integer" } } },
                  },
                },
              },
              "404": { description: "Product not found" },
            },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops).toHaveLength(1);

    const op = ops[0];
    expect(op.operationId).toBe("getProduct");
    expect(op.method).toBe("GET");
    expect(op.path).toBe("/api/products/{productId}");
    expect(op.summary).toBe("Get a product by ID");
    expect(op.description).toBe("Returns a single product");

    expect(op.parameters).toHaveLength(1);
    expect(op.parameters[0]).toEqual({
      name: "productId",
      in: "path",
      required: true,
      schema: { type: "integer" },
      description: "The product ID",
    });

    expect(op.responses["200"]).toEqual({
      statusCode: "200",
      description: "Successful response",
      schema: { type: "object", properties: { id: { type: "integer" } } },
    });
    expect(op.responses["404"]).toEqual({
      statusCode: "404",
      description: "Product not found",
    });

    expect(op.requestBody).toBeUndefined();
  });

  it("parses a POST operation with request body", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/products": {
          post: {
            operationId: "createProduct",
            summary: "Create a product",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      price: { type: "number" },
                    },
                    required: ["name"],
                  },
                },
              },
            },
            responses: {
              "201": { description: "Created" },
            },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops).toHaveLength(1);

    const op = ops[0];
    expect(op.operationId).toBe("createProduct");
    expect(op.method).toBe("POST");
    expect(op.requestBody).toBeDefined();
    expect(op.requestBody!.required).toBe(true);
    expect(op.requestBody!.contentType).toBe("application/json");
    expect(op.requestBody!.schema).toEqual({
      type: "object",
      properties: {
        name: { type: "string" },
        price: { type: "number" },
      },
      required: ["name"],
    });
  });

  it("extracts query parameters with optional/required", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/products": {
          get: {
            operationId: "listProducts",
            summary: "List products",
            parameters: [
              { name: "page", in: "query", required: false, schema: { type: "integer", default: 1 } },
              { name: "category", in: "query", required: true, schema: { type: "string" } },
            ],
            responses: { "200": { description: "OK" } },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops[0].parameters).toHaveLength(2);
    expect(ops[0].parameters[0].required).toBe(false);
    expect(ops[0].parameters[0].schema).toEqual({ type: "integer", default: 1 });
    expect(ops[0].parameters[1].required).toBe(true);
  });

  it("handles multiple HTTP methods on the same path", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/products/{id}": {
          get: {
            operationId: "getProduct",
            summary: "Get product",
            responses: { "200": { description: "OK" } },
          },
          put: {
            operationId: "updateProduct",
            summary: "Update product",
            responses: { "200": { description: "OK" } },
          },
          delete: {
            operationId: "deleteProduct",
            summary: "Delete product",
            responses: { "204": { description: "Deleted" } },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops).toHaveLength(3);

    const methods = ops.map((o) => o.method).sort();
    expect(methods).toEqual(["DELETE", "GET", "PUT"]);
  });

  it("generates operationId when missing", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/items/{itemId}": {
          get: {
            summary: "Get item",
            responses: { "200": { description: "OK" } },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops).toHaveLength(1);
    // Should have a generated operationId, not empty
    expect(ops[0].operationId).toBeTruthy();
    expect(ops[0].operationId.length).toBeGreaterThan(0);
  });

  it("merges path-level and operation-level parameters", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/stores/{storeId}/products": {
          parameters: [
            { name: "storeId", in: "path", required: true, schema: { type: "string" } },
          ],
          get: {
            operationId: "listStoreProducts",
            summary: "List store products",
            parameters: [
              { name: "page", in: "query", schema: { type: "integer" } },
            ],
            responses: { "200": { description: "OK" } },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops[0].parameters).toHaveLength(2);
    const names = ops[0].parameters.map((p) => p.name);
    expect(names).toContain("storeId");
    expect(names).toContain("page");
  });

  it("operation-level parameter overrides path-level with same name+in", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/{id}": {
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" }, description: "Path level" },
          ],
          get: {
            operationId: "getById",
            summary: "Get by ID",
            parameters: [
              { name: "id", in: "path", required: true, schema: { type: "integer" }, description: "Op level" },
            ],
            responses: { "200": { description: "OK" } },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops[0].parameters).toHaveLength(1);
    expect(ops[0].parameters[0].description).toBe("Op level");
    expect(ops[0].parameters[0].schema).toEqual({ type: "integer" });
  });

  it("returns empty array for spec with no paths", async () => {
    const specPath = createTempSpec(makeSpec({}));
    const ops = await parseOpenApiSpec(specPath);
    expect(ops).toEqual([]);
  });

  it("handles missing summary gracefully", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/health": {
          get: {
            operationId: "healthCheck",
            responses: { "200": { description: "OK" } },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops[0].summary).toBe("");
  });

  it("dereferences $ref pointers in parameters", async () => {
    const specPath = createTempSpec({
      openapi: "3.0.3",
      info: { title: "Test", version: "1.0.0" },
      paths: {
        "/api/items/{itemId}": {
          get: {
            operationId: "getItem",
            summary: "Get item",
            parameters: [{ $ref: "#/components/parameters/ItemId" }],
            responses: { "200": { description: "OK" } },
          },
        },
      },
      components: {
        parameters: {
          ItemId: {
            name: "itemId",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "The item identifier",
          },
        },
      },
    });

    const ops = await parseOpenApiSpec(specPath);
    expect(ops[0].parameters).toHaveLength(1);
    expect(ops[0].parameters[0].name).toBe("itemId");
    expect(ops[0].parameters[0].required).toBe(true);
    expect(ops[0].parameters[0].description).toBe("The item identifier");
  });

  it("rejects Swagger 2.x specs", async () => {
    const specPath = createTempSpec({
      swagger: "2.0",
      info: { title: "Old API", version: "1.0.0" },
      paths: {},
    });

    await expect(parseOpenApiSpec(specPath)).rejects.toThrow(
      /Only OpenAPI 3\.x specifications are supported/,
    );
  });

  it("skips unsupported HTTP methods (options, head, trace)", async () => {
    const specPath = createTempSpec(
      makeSpec({
        "/api/test": {
          options: {
            operationId: "optionsTest",
            summary: "Options",
            responses: { "200": { description: "OK" } },
          },
          get: {
            operationId: "getTest",
            summary: "Get test",
            responses: { "200": { description: "OK" } },
          },
        },
      }),
    );

    const ops = await parseOpenApiSpec(specPath);
    expect(ops).toHaveLength(1);
    expect(ops[0].method).toBe("GET");
  });
});
