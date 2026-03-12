import { describe, it, expect } from 'vitest';
import { operationToTool, toSnakeCase, isPaginatedOperation } from '../src/tool-generator.js';
import type { ParsedOperation } from '../src/parser.js';

describe('toSnakeCase', () => {
  it('converts camelCase to snake_case', () => {
    expect(toSnakeCase('getProduct')).toBe('get_product');
  });

  it('converts multi-word camelCase', () => {
    expect(toSnakeCase('listOrderItems')).toBe('list_order_items');
  });

  it('handles consecutive uppercase letters', () => {
    expect(toSnakeCase('getHTTPResponse')).toBe('get_http_response');
  });

  it('keeps already lowercase strings unchanged', () => {
    expect(toSnakeCase('catalog')).toBe('catalog');
  });

  it('converts PascalCase', () => {
    expect(toSnakeCase('GetProduct')).toBe('get_product');
  });
});

describe('isPaginatedOperation', () => {
  it('returns true when operation has page query param', () => {
    const op = makeOperation({ queryParams: [{ name: 'page', required: false }] });
    expect(isPaginatedOperation(op)).toBe(true);
  });

  it('returns true when operation has pageSize query param', () => {
    const op = makeOperation({ queryParams: [{ name: 'pageSize', required: false }] });
    expect(isPaginatedOperation(op)).toBe(true);
  });

  it('returns true when operation has from query param', () => {
    const op = makeOperation({ queryParams: [{ name: 'from', required: false }] });
    expect(isPaginatedOperation(op)).toBe(true);
  });

  it('returns true when operation has to query param', () => {
    const op = makeOperation({ queryParams: [{ name: 'to', required: false }] });
    expect(isPaginatedOperation(op)).toBe(true);
  });

  it('returns false when no pagination params', () => {
    const op = makeOperation({ queryParams: [{ name: 'filter', required: false }] });
    expect(isPaginatedOperation(op)).toBe(false);
  });

  it('returns false for path params named page', () => {
    const op: ParsedOperation = {
      operationId: 'test',
      method: 'GET',
      path: '/test/{page}',
      summary: 'Test',
      parameters: [{ name: 'page', in: 'path', required: true, schema: { type: 'integer' } }],
      responses: {},
    };
    expect(isPaginatedOperation(op)).toBe(false);
  });
});

describe('operationToTool', () => {
  it('generates correct tool name in snake_case', () => {
    const op = makeOperation({ operationId: 'getProduct' });
    const tool = operationToTool(op, 'catalog');
    expect(tool.name).toBe('catalog_get_product');
  });

  it('generates tool name with snake_case prefix', () => {
    const op = makeOperation({ operationId: 'listItems' });
    const tool = operationToTool(op, 'catalogApi');
    expect(tool.name).toBe('catalog_api_list_items');
  });

  it('generates description with summary and METHOD path', () => {
    const op = makeOperation({
      operationId: 'getProduct',
      summary: 'Get product by ID',
      method: 'GET',
      path: '/api/catalog/pvt/product/{productId}',
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.description).toContain('Get product by ID');
    expect(tool.description).toContain('GET /api/catalog/pvt/product/{productId}');
  });

  it('uses operationId as fallback when summary is empty', () => {
    const op = makeOperation({ operationId: 'getProduct', summary: '' });
    const tool = operationToTool(op, 'catalog');
    expect(tool.description).toContain('getProduct');
  });

  it('maps path params as required in schema', () => {
    const op = makeOperation({
      pathParams: [{ name: 'productId', schema: { type: 'integer' } }],
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.inputSchemaCode).toContain('productId: z.number().int()');
    expect(tool.inputSchemaCode).not.toContain('productId: z.number().int().optional()');
  });

  it('maps query params as optional', () => {
    const op = makeOperation({
      queryParams: [{ name: 'filter', required: false, schema: { type: 'string' } }],
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.inputSchemaCode).toContain('filter: z.string().optional()');
  });

  it('preserves default values for query params', () => {
    const op = makeOperation({
      queryParams: [{ name: 'page', required: false, schema: { type: 'integer', default: 1 } }],
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.inputSchemaCode).toContain('page: z.number().int().default(1)');
    // Should not add .optional() when .default() is present
    expect(tool.inputSchemaCode).not.toContain('.default(1).optional()');
  });

  it('maps request body as nested object', () => {
    const op = makeOperation({
      requestBody: {
        required: true,
        contentType: 'application/json',
        schema: {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
        },
      },
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.inputSchemaCode).toContain('body: z.object(');
    expect(tool.inputSchemaCode).not.toContain('body: z.object({}).optional()');
  });

  it('maps optional request body', () => {
    const op = makeOperation({
      requestBody: {
        required: false,
        contentType: 'application/json',
        schema: { type: 'object', properties: {} },
      },
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.inputSchemaCode).toContain('.optional()');
  });

  it('generates empty z.object({}) for operations with no params', () => {
    const op = makeOperation({});
    const tool = operationToTool(op, 'catalog');
    expect(tool.inputSchemaCode).toBe('z.object({})');
  });

  it('generates handler with path parameter substitution', () => {
    const op = makeOperation({
      path: '/api/catalog/pvt/product/{productId}',
      pathParams: [{ name: 'productId', schema: { type: 'integer' } }],
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.handlerCode).toContain('${params.productId}');
  });

  it('generates handler with query params building', () => {
    const op = makeOperation({
      queryParams: [{ name: 'page', required: false }],
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.handlerCode).toContain('queryParams');
    expect(tool.handlerCode).toContain('params.page');
  });

  it('generates handler with body for POST requests', () => {
    const op = makeOperation({
      method: 'POST',
      requestBody: {
        required: true,
        contentType: 'application/json',
        schema: { type: 'object' },
      },
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.handlerCode).toContain('params.body');
    expect(tool.handlerCode).toContain('http.post');
  });

  it('generates error handling for documented error codes', () => {
    const op = makeOperation({
      responses: {
        '200': { statusCode: '200', description: 'OK' },
        '404': { statusCode: '404', description: 'Product not found' },
        '500': { statusCode: '500', description: 'Internal server error' },
      },
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.handlerCode).toContain('case 404');
    expect(tool.handlerCode).toContain('Product not found');
    expect(tool.handlerCode).toContain('case 500');
    expect(tool.handlerCode).toContain('Internal server error');
  });

  it('generates handler without error switch when no error responses', () => {
    const op = makeOperation({
      responses: {
        '200': { statusCode: '200', description: 'OK' },
      },
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.handlerCode).not.toContain('switch');
  });

  it('exposes pagination params for paginated endpoints', () => {
    const op = makeOperation({
      queryParams: [
        { name: 'page', required: false, schema: { type: 'integer', default: 1 } },
        { name: 'pageSize', required: false, schema: { type: 'integer', default: 10 } },
      ],
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.inputSchemaCode).toContain('page:');
    expect(tool.inputSchemaCode).toContain('pageSize:');
  });

  it('includes param descriptions when available', () => {
    const op = makeOperation({
      pathParams: [{ name: 'id', schema: { type: 'integer' }, description: 'The product ID' }],
    });
    const tool = operationToTool(op, 'catalog');
    expect(tool.inputSchemaCode).toContain('.describe("The product ID")');
  });
});

// --- Test Helpers ---

interface MakeOperationOpts {
  operationId?: string;
  method?: ParsedOperation['method'];
  path?: string;
  summary?: string;
  pathParams?: Array<{ name: string; schema?: Record<string, unknown>; description?: string }>;
  queryParams?: Array<{
    name: string;
    required?: boolean;
    schema?: Record<string, unknown>;
    description?: string;
  }>;
  requestBody?: ParsedOperation['requestBody'];
  responses?: ParsedOperation['responses'];
}

function makeOperation(opts: MakeOperationOpts): ParsedOperation {
  const parameters: ParsedOperation['parameters'] = [];

  for (const pp of opts.pathParams ?? []) {
    parameters.push({
      name: pp.name,
      in: 'path',
      required: true,
      schema: pp.schema ?? { type: 'string' },
      ...(pp.description ? { description: pp.description } : {}),
    });
  }

  for (const qp of opts.queryParams ?? []) {
    parameters.push({
      name: qp.name,
      in: 'query',
      required: qp.required ?? false,
      schema: qp.schema ?? { type: 'string' },
      ...(qp.description ? { description: qp.description } : {}),
    });
  }

  return {
    operationId: opts.operationId ?? 'testOperation',
    method: opts.method ?? 'GET',
    path: opts.path ?? '/api/test',
    summary: opts.summary ?? 'Test operation',
    parameters,
    requestBody: opts.requestBody,
    responses: opts.responses ?? {},
  };
}
