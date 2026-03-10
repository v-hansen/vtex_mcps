import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { operationToTool, toSnakeCase } from "../src/tool-generator.js";
import type { ParsedOperation, ParsedParameter, ParsedResponse } from "../src/parser.js";

/**
 * Feature: vtex-mcp-servers
 * Properties 2, 3, 4: Tool Naming/Description, Parameter Mapping, Error Response Coverage
 *
 * Validates: Requirements 2.2, 2.3, 2.4, 10.1, 10.2, 10.3, 10.4, 10.5
 */

// --- Arbitraries ---

/** Alphanumeric identifier starting with a letter (camelCase-friendly) */
const identifierArb = fc
  .tuple(
    fc.stringMatching(/^[a-z]$/),
    fc.stringMatching(/^[a-zA-Z0-9]{0,20}$/),
  )
  .map(([first, rest]) => first + rest);

/** API group prefix (camelCase or simple lowercase) */
const apiGroupArb = fc.oneof(
  fc.stringMatching(/^[a-z]{2,10}$/),
  fc
    .tuple(
      fc.stringMatching(/^[a-z]{2,8}$/),
      fc.stringMatching(/^[A-Z][a-z]{1,6}$/),
    )
    .map(([a, b]) => a + b),
);

/** HTTP methods */
const methodArb = fc.constantFrom(
  "GET" as const,
  "POST" as const,
  "PUT" as const,
  "PATCH" as const,
  "DELETE" as const,
);

/** Non-empty summary text */
const summaryArb = fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,40}$/);

/** Simple path segment */
const pathSegmentArb = fc.stringMatching(/^[a-z]{1,10}$/);

/** Path with optional path parameters */
const pathArb = fc
  .tuple(
    fc.array(pathSegmentArb, { minLength: 1, maxLength: 3 }),
    fc.array(fc.stringMatching(/^[a-zA-Z]{2,10}$/), { minLength: 0, maxLength: 2 }),
  )
  .map(([segments, paramNames]) => {
    const parts = segments.map((s) => "/" + s);
    for (const p of paramNames) {
      parts.push("/{" + p + "}");
    }
    return parts.join("");
  });

/** JSON Schema type for parameters */
const schemaTypeArb = fc.constantFrom("string", "integer", "number", "boolean");

/** A path parameter */
const pathParamArb = fc
  .tuple(fc.stringMatching(/^[a-zA-Z]{2,12}$/), schemaTypeArb)
  .map(
    ([name, type]): ParsedParameter => ({
      name,
      in: "path",
      required: true,
      schema: { type },
    }),
  );

/** A query parameter (may be required or optional, may have a default) */
const queryParamArb = fc
  .tuple(
    fc.stringMatching(/^[a-zA-Z]{2,12}$/),
    schemaTypeArb,
    fc.boolean(),
    fc.option(fc.oneof(fc.constant(1), fc.constant("default"), fc.constant(true)), { nil: undefined }),
  )
  .map(
    ([name, type, required, defaultVal]): ParsedParameter => ({
      name,
      in: "query",
      required,
      schema: defaultVal !== undefined ? { type, default: defaultVal } : { type },
    }),
  );

/** Error response codes (4xx, 5xx) */
const errorCodeArb = fc.constantFrom("400", "401", "403", "404", "409", "422", "429", "500", "502", "503");

/** Success response codes */
const successCodeArb = fc.constantFrom("200", "201", "204");

/** A responses object with at least one success and variable error codes */
const responsesArb = fc
  .tuple(
    successCodeArb,
    fc.uniqueArray(errorCodeArb, { minLength: 0, maxLength: 5 }),
  )
  .map(([successCode, errorCodes]) => {
    const responses: Record<string, ParsedResponse> = {};
    responses[successCode] = { statusCode: successCode, description: "Success" };
    for (const code of errorCodes) {
      responses[code] = { statusCode: code, description: `Error ${code}` };
    }
    return responses;
  });

/** Build a full ParsedOperation from parts */
function buildOperation(opts: {
  operationId: string;
  method: ParsedOperation["method"];
  path: string;
  summary: string;
  pathParams: ParsedParameter[];
  queryParams: ParsedParameter[];
  responses: Record<string, ParsedResponse>;
  requestBody?: ParsedOperation["requestBody"];
}): ParsedOperation {
  return {
    operationId: opts.operationId,
    method: opts.method,
    path: opts.path,
    summary: opts.summary,
    parameters: [...opts.pathParams, ...opts.queryParams],
    requestBody: opts.requestBody,
    responses: opts.responses,
  };
}

// --- Property 2: Tool Naming and Description from OpenAPI ---

describe("Property 2: Tool Naming and Description from OpenAPI", () => {
  /** Validates: Requirements 2.3, 10.1, 10.2, 10.5 */

  it("tool name follows {apiGroup}_{operationId} in snake_case", () => {
    /** Validates: Requirements 10.1 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        methodArb,
        pathArb,
        summaryArb,
        (apiGroup, operationId, method, path, summary) => {
          const op = buildOperation({
            operationId,
            method,
            path,
            summary,
            pathParams: [],
            queryParams: [],
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);

          const expectedPrefix = toSnakeCase(apiGroup);
          const expectedSuffix = toSnakeCase(operationId);
          expect(tool.name).toBe(`${expectedPrefix}_${expectedSuffix}`);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("tool name is entirely lowercase with underscores", () => {
    /** Validates: Requirements 10.1 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        methodArb,
        pathArb,
        summaryArb,
        (apiGroup, operationId, method, path, summary) => {
          const op = buildOperation({
            operationId,
            method,
            path,
            summary,
            pathParams: [],
            queryParams: [],
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);
          expect(tool.name).toMatch(/^[a-z0-9_]+$/);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("tool description contains the operation summary", () => {
    /** Validates: Requirements 10.2 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        methodArb,
        pathArb,
        summaryArb,
        (apiGroup, operationId, method, path, summary) => {
          const op = buildOperation({
            operationId,
            method,
            path,
            summary,
            pathParams: [],
            queryParams: [],
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);
          expect(tool.description).toContain(summary);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("tool description contains METHOD and path", () => {
    /** Validates: Requirements 10.5 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        methodArb,
        pathArb,
        summaryArb,
        (apiGroup, operationId, method, path, summary) => {
          const op = buildOperation({
            operationId,
            method,
            path,
            summary,
            pathParams: [],
            queryParams: [],
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);
          expect(tool.description).toContain(`${method} ${path}`);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// --- Property 3: Parameter Mapping Completeness ---

describe("Property 3: Parameter Mapping Completeness", () => {
  /** Validates: Requirements 2.2, 10.3, 10.4 */

  it("every path parameter appears in the input schema as required", () => {
    /** Validates: Requirements 2.2, 10.3 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        fc.uniqueArray(pathParamArb, {
          minLength: 1,
          maxLength: 3,
          comparator: (a, b) => a.name === b.name,
        }),
        (apiGroup, operationId, pathParams) => {
          const op = buildOperation({
            operationId,
            method: "GET",
            path: "/api/" + pathParams.map((p) => `{${p.name}}`).join("/"),
            summary: "Test",
            pathParams,
            queryParams: [],
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);

          for (const param of pathParams) {
            // The param name must appear in the schema code
            expect(tool.inputSchemaCode).toContain(`${param.name}:`);
            // Path params must NOT be optional
            const paramRegex = new RegExp(
              `${param.name}:\\s*[^,}]+\\.optional\\(\\)`,
            );
            expect(tool.inputSchemaCode).not.toMatch(paramRegex);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("every query parameter appears in the input schema", () => {
    /** Validates: Requirements 2.2 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        fc.uniqueArray(queryParamArb, {
          minLength: 1,
          maxLength: 3,
          comparator: (a, b) => a.name === b.name,
        }),
        (apiGroup, operationId, queryParams) => {
          const op = buildOperation({
            operationId,
            method: "GET",
            path: "/api/test",
            summary: "Test",
            pathParams: [],
            queryParams,
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);

          for (const param of queryParams) {
            expect(tool.inputSchemaCode).toContain(`${param.name}:`);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("optional query params without defaults are marked optional", () => {
    /** Validates: Requirements 10.3 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        fc.stringMatching(/^[a-zA-Z]{2,12}$/),
        schemaTypeArb,
        (apiGroup, operationId, paramName, schemaType) => {
          const queryParam: ParsedParameter = {
            name: paramName,
            in: "query",
            required: false,
            schema: { type: schemaType },
          };

          const op = buildOperation({
            operationId,
            method: "GET",
            path: "/api/test",
            summary: "Test",
            pathParams: [],
            queryParams: [queryParam],
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);

          // Extract the line for this param
          const lines = tool.inputSchemaCode.split("\n");
          const paramLine = lines.find((l) => l.trimStart().startsWith(`${paramName}:`));
          expect(paramLine).toBeDefined();
          expect(paramLine).toContain(".optional()");
        },
      ),
      { numRuns: 100 },
    );
  });

  it("query params with default values preserve the default", () => {
    /** Validates: Requirements 10.4 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        fc.stringMatching(/^[a-zA-Z]{2,12}$/),
        fc.constantFrom(1, 10, 42),
        (apiGroup, operationId, paramName, defaultVal) => {
          const queryParam: ParsedParameter = {
            name: paramName,
            in: "query",
            required: false,
            schema: { type: "integer", default: defaultVal },
          };

          const op = buildOperation({
            operationId,
            method: "GET",
            path: "/api/test",
            summary: "Test",
            pathParams: [],
            queryParams: [queryParam],
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);

          expect(tool.inputSchemaCode).toContain(`.default(${defaultVal})`);
        },
      ),
      { numRuns: 100 },
    );
  });

  it("request body appears in the input schema when present", () => {
    /** Validates: Requirements 2.2 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        fc.constantFrom("POST" as const, "PUT" as const, "PATCH" as const),
        fc.boolean(),
        (apiGroup, operationId, method, bodyRequired) => {
          const op = buildOperation({
            operationId,
            method,
            path: "/api/test",
            summary: "Test",
            pathParams: [],
            queryParams: [],
            responses: { "200": { statusCode: "200", description: "OK" } },
            requestBody: {
              required: bodyRequired,
              contentType: "application/json",
              schema: {
                type: "object",
                properties: { name: { type: "string" } },
                required: ["name"],
              },
            },
          });

          const tool = operationToTool(op, apiGroup);

          expect(tool.inputSchemaCode).toContain("body:");
          if (!bodyRequired) {
            expect(tool.inputSchemaCode).toMatch(/body:.*\.optional\(\)/);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("correct Zod type is generated for each schema type", () => {
    /** Validates: Requirements 2.2 */
    const typeToZod: Record<string, string> = {
      string: "z.string()",
      integer: "z.number().int()",
      number: "z.number()",
      boolean: "z.boolean()",
    };

    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        fc.stringMatching(/^[a-zA-Z]{2,12}$/),
        schemaTypeArb,
        (apiGroup, operationId, paramName, schemaType) => {
          const pathParam: ParsedParameter = {
            name: paramName,
            in: "path",
            required: true,
            schema: { type: schemaType },
          };

          const op = buildOperation({
            operationId,
            method: "GET",
            path: `/api/{${paramName}}`,
            summary: "Test",
            pathParams: [pathParam],
            queryParams: [],
            responses: { "200": { statusCode: "200", description: "OK" } },
          });

          const tool = operationToTool(op, apiGroup);
          const expectedZod = typeToZod[schemaType];
          expect(tool.inputSchemaCode).toContain(`${paramName}: ${expectedZod}`);
        },
      ),
      { numRuns: 100 },
    );
  });
});

// --- Property 4: Error Response Code Coverage in Generation ---

describe("Property 4: Error Response Code Coverage in Generation", () => {
  /** Validates: Requirements 2.4 */

  it("every documented error response code has handling logic in the handler", () => {
    /** Validates: Requirements 2.4 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        methodArb,
        pathArb,
        responsesArb.filter((r) =>
          Object.keys(r).some((c) => c.startsWith("4") || c.startsWith("5")),
        ),
        (apiGroup, operationId, method, path, responses) => {
          const op = buildOperation({
            operationId,
            method,
            path,
            summary: "Test",
            pathParams: [],
            queryParams: [],
            responses,
          });

          const tool = operationToTool(op, apiGroup);

          const errorCodes = Object.keys(responses).filter(
            (code) => code.startsWith("4") || code.startsWith("5"),
          );

          for (const code of errorCodes) {
            expect(tool.handlerCode).toContain(`case ${code}`);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("error handler includes the description for each error code", () => {
    /** Validates: Requirements 2.4 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        methodArb,
        pathArb,
        fc.uniqueArray(errorCodeArb, { minLength: 1, maxLength: 4 }),
        (apiGroup, operationId, method, path, errorCodes) => {
          const responses: Record<string, ParsedResponse> = {
            "200": { statusCode: "200", description: "OK" },
          };
          for (const code of errorCodes) {
            responses[code] = {
              statusCode: code,
              description: `Error ${code}`,
            };
          }

          const op = buildOperation({
            operationId,
            method,
            path,
            summary: "Test",
            pathParams: [],
            queryParams: [],
            responses,
          });

          const tool = operationToTool(op, apiGroup);

          for (const code of errorCodes) {
            expect(tool.handlerCode).toContain(`Error ${code}`);
          }
        },
      ),
      { numRuns: 100 },
    );
  });

  it("handler has no error switch when only success responses exist", () => {
    /** Validates: Requirements 2.4 */
    fc.assert(
      fc.property(
        apiGroupArb,
        identifierArb,
        methodArb,
        pathArb,
        successCodeArb,
        (apiGroup, operationId, method, path, successCode) => {
          const responses: Record<string, ParsedResponse> = {
            [successCode]: { statusCode: successCode, description: "Success" },
          };

          const op = buildOperation({
            operationId,
            method,
            path,
            summary: "Test",
            pathParams: [],
            queryParams: [],
            responses,
          });

          const tool = operationToTool(op, apiGroup);

          // No switch statement when there are no error codes
          expect(tool.handlerCode).not.toContain("switch");
        },
      ),
      { numRuns: 100 },
    );
  });
});
