import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';
import { parseOpenApiSpec } from '../src/parser.js';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

/**
 * Feature: vtex-mcp-servers
 * Property 1: OpenAPI Spec Round-Trip Consistency
 *
 * For any valid OpenAPI specification, parsing the spec to generate MCP tool
 * definitions and then re-parsing the same spec should produce equivalent tool
 * definitions. The generation process must be deterministic and idempotent.
 *
 * Validates: Requirements 2.5
 */

// --- Temp file helpers ---

const tempDirs: string[] = [];

function createTempSpec(spec: object): string {
  const dir = join(tmpdir(), `parser-prop-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(dir, { recursive: true });
  tempDirs.push(dir);
  const filePath = join(dir, 'spec.json');
  writeFileSync(filePath, JSON.stringify(spec));
  return filePath;
}

afterEach(() => {
  for (const dir of tempDirs) {
    try {
      rmSync(dir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
  tempDirs.length = 0;
});

// --- Arbitraries for generating valid OpenAPI 3.x specs ---

/** Alphanumeric operationId (must start with a letter) */
const operationIdArb = fc
  .tuple(fc.stringMatching(/^[a-zA-Z]$/), fc.stringMatching(/^[a-zA-Z0-9]{0,20}$/))
  .map(([first, rest]) => first + rest);

/** Random path segment (plain or parameterized) */
const pathSegmentArb = fc.oneof(
  fc.stringMatching(/^[a-z]{1,10}$/).map((s) => s),
  fc.stringMatching(/^[a-zA-Z]{1,10}$/).map((s) => `{${s}}`),
);

/** Random API path like /api/resource/{id} */
const pathArb = fc
  .array(pathSegmentArb, { minLength: 1, maxLength: 4 })
  .map((segments) => '/' + segments.join('/'));

/** Supported HTTP methods */
const methodArb = fc.constantFrom('get', 'post', 'put', 'patch', 'delete');

/** Simple JSON Schema type */
const schemaTypeArb = fc.constantFrom('string', 'integer', 'number', 'boolean');

/** Parameter location */
const paramInArb = fc.constantFrom('query', 'header') as fc.Arbitrary<'path' | 'query' | 'header'>;

/** A single query/header parameter */
const parameterArb = fc
  .tuple(fc.stringMatching(/^[a-zA-Z]{1,12}$/), paramInArb, fc.boolean(), schemaTypeArb)
  .map(([name, location, required, type]) => ({
    name,
    in: location,
    required,
    schema: { type },
  }));

/** HTTP response status code */
const statusCodeArb = fc.constantFrom('200', '201', '204', '400', '404', '500');

/** A responses object */
const responsesArb = fc.array(statusCodeArb, { minLength: 1, maxLength: 3 }).chain((codes) => {
  const uniqueCodes = [...new Set(codes)];
  const responses: Record<string, { description: string }> = {};
  for (const code of uniqueCodes) {
    responses[code] = { description: `Response ${code}` };
  }
  return fc.constant(responses);
});

/** A single OpenAPI operation */
const operationArb = fc
  .tuple(
    operationIdArb,
    fc.stringMatching(/^[A-Za-z ]{1,30}$/),
    fc.array(parameterArb, { minLength: 0, maxLength: 3 }),
    responsesArb,
  )
  .map(([operationId, summary, parameters, responses]) => ({
    operationId,
    summary,
    parameters,
    responses,
  }));

/** A path item with one operation (method + operation) */
const pathItemArb = fc.tuple(pathArb, methodArb, operationArb).map(([path, method, operation]) => ({
  path,
  pathItem: { [method]: operation },
}));

/** A complete valid OpenAPI 3.x spec with 1-5 operations */
const openApiSpecArb = fc.array(pathItemArb, { minLength: 1, maxLength: 5 }).map((items) => {
  // Deduplicate paths — keep only the first occurrence of each path
  const paths: Record<string, Record<string, unknown>> = {};
  for (const { path, pathItem } of items) {
    if (!paths[path]) {
      paths[path] = pathItem;
    }
  }
  return {
    openapi: '3.0.3',
    info: { title: 'Generated Test API', version: '1.0.0' },
    paths,
  };
});

// --- Property Tests ---

describe('Property 1: OpenAPI Spec Round-Trip Consistency', () => {
  /** Validates: Requirements 2.5 */

  it('parsing the same spec twice produces identical ParsedOperation arrays (deterministic)', async () => {
    /** Validates: Requirements 2.5 */
    await fc.assert(
      fc.asyncProperty(openApiSpecArb, async (spec) => {
        const specPath = createTempSpec(spec);

        const firstParse = await parseOpenApiSpec(specPath);
        const secondParse = await parseOpenApiSpec(specPath);

        expect(firstParse).toEqual(secondParse);
      }),
      { numRuns: 100 },
    );
  });

  it("parsing produces stable operation count matching the spec's operations", async () => {
    /** Validates: Requirements 2.5 */
    await fc.assert(
      fc.asyncProperty(openApiSpecArb, async (spec) => {
        const specPath = createTempSpec(spec);

        const result = await parseOpenApiSpec(specPath);

        // Count expected operations from the spec
        let expectedCount = 0;
        const supportedMethods = new Set(['get', 'post', 'put', 'patch', 'delete']);
        for (const pathItem of Object.values(
          spec.paths as Record<string, Record<string, unknown>>,
        )) {
          for (const key of Object.keys(pathItem)) {
            if (supportedMethods.has(key)) expectedCount++;
          }
        }

        expect(result).toHaveLength(expectedCount);
      }),
      { numRuns: 100 },
    );
  });

  it('every parsed operation has a non-empty operationId, valid method, and non-empty path', async () => {
    /** Validates: Requirements 2.5 */
    const validMethods = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);

    await fc.assert(
      fc.asyncProperty(openApiSpecArb, async (spec) => {
        const specPath = createTempSpec(spec);
        const operations = await parseOpenApiSpec(specPath);

        for (const op of operations) {
          expect(op.operationId.length).toBeGreaterThan(0);
          expect(validMethods.has(op.method)).toBe(true);
          expect(op.path.startsWith('/')).toBe(true);
        }
      }),
      { numRuns: 100 },
    );
  });
});
