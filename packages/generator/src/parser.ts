import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3 } from 'openapi-types';

// --- Exported Interfaces ---

export type JSONSchema = Record<string, unknown>;

export interface ParsedParameter {
  name: string;
  in: 'path' | 'query' | 'header';
  required: boolean;
  schema: JSONSchema;
  description?: string;
}

export interface ParsedRequestBody {
  required: boolean;
  contentType: string;
  schema: JSONSchema;
}

export interface ParsedResponse {
  statusCode: string;
  description: string;
  schema?: JSONSchema;
}

export interface ParsedOperation {
  operationId: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  summary: string;
  description?: string;
  parameters: ParsedParameter[];
  requestBody?: ParsedRequestBody;
  responses: Record<string, ParsedResponse>;
}

// --- Internal Helpers ---

const SUPPORTED_METHODS = new Set(['get', 'post', 'put', 'patch', 'delete']);

function isOpenAPIV3(
  doc: Record<string, unknown>,
): doc is OpenAPIV3.Document & Record<string, unknown> {
  return 'openapi' in doc && typeof doc.openapi === 'string' && doc.openapi.startsWith('3.');
}

function extractParameters(
  params: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[] | undefined,
): ParsedParameter[] {
  if (!params) return [];

  return params
    .filter((p): p is OpenAPIV3.ParameterObject => !('$ref' in p))
    .filter((p) => p.in === 'path' || p.in === 'query' || p.in === 'header')
    .map((p) => {
      const param: ParsedParameter = {
        name: p.name,
        in: p.in as 'path' | 'query' | 'header',
        required: p.required ?? false,
        schema: (p.schema && !('$ref' in p.schema) ? p.schema : {}) as JSONSchema,
      };
      if (p.description) {
        param.description = p.description;
      }
      return param;
    });
}

function extractRequestBody(
  body: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined,
): ParsedRequestBody | undefined {
  if (!body || '$ref' in body) return undefined;

  const content = body.content;
  // Prefer application/json, fall back to first available content type
  const contentType = 'application/json' in content ? 'application/json' : Object.keys(content)[0];

  if (!contentType) return undefined;

  const mediaType = content[contentType];
  const schema = mediaType?.schema;

  return {
    required: body.required ?? false,
    contentType,
    schema: (schema && !('$ref' in schema) ? schema : {}) as JSONSchema,
  };
}

function extractResponses(
  responses: OpenAPIV3.ResponsesObject | undefined,
): Record<string, ParsedResponse> {
  if (!responses) return {};

  const result: Record<string, ParsedResponse> = {};

  for (const [statusCode, responseOrRef] of Object.entries(responses)) {
    if (!responseOrRef || '$ref' in responseOrRef) continue;

    const response = responseOrRef as OpenAPIV3.ResponseObject;
    const parsed: ParsedResponse = {
      statusCode,
      description: response.description,
    };

    if (response.content) {
      const contentType =
        'application/json' in response.content
          ? 'application/json'
          : Object.keys(response.content)[0];

      if (contentType) {
        const schema = response.content[contentType]?.schema;
        if (schema && !('$ref' in schema)) {
          parsed.schema = schema as JSONSchema;
        }
      }
    }

    result[statusCode] = parsed;
  }

  return result;
}

function generateOperationId(method: string, path: string): string {
  // Convert "/api/catalog/pvt/product/{productId}" → "get_api_catalog_pvt_product_by_productId"
  const sanitized = path
    .replace(/\{([^}]+)\}/g, 'by_$1')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return `${method}_${sanitized}`;
}

// --- Main Export ---

/**
 * Parses an OpenAPI spec file, dereferences all $ref pointers,
 * and extracts all operations as ParsedOperation[].
 */
export async function parseOpenApiSpec(specPath: string): Promise<ParsedOperation[]> {
  const api = await SwaggerParser.dereference(specPath);
  const doc = api as Record<string, unknown>;

  if (!isOpenAPIV3(doc)) {
    throw new Error(
      'Only OpenAPI 3.x specifications are supported. Received a Swagger 2.x or unknown format.',
    );
  }

  const operations: ParsedOperation[] = [];
  const paths = doc.paths ?? {};

  for (const [path, pathItem] of Object.entries(paths)) {
    if (!pathItem) continue;

    // Path-level parameters apply to all operations under this path
    const pathLevelParams = extractParameters(
      pathItem.parameters as (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[] | undefined,
    );

    for (const method of Object.keys(pathItem)) {
      if (!SUPPORTED_METHODS.has(method)) continue;

      const operation = (pathItem as Record<string, unknown>)[method] as
        | OpenAPIV3.OperationObject
        | undefined;
      if (!operation) continue;

      const operationId = operation.operationId ?? generateOperationId(method, path);

      // Merge path-level and operation-level parameters (operation-level wins on conflict)
      const opParams = extractParameters(operation.parameters);
      const mergedParams = mergeParameters(pathLevelParams, opParams);

      const parsed: ParsedOperation = {
        operationId,
        method: method.toUpperCase() as ParsedOperation['method'],
        path,
        summary: operation.summary ?? '',
        parameters: mergedParams,
        requestBody: extractRequestBody(operation.requestBody),
        responses: extractResponses(operation.responses),
      };

      if (operation.description) {
        parsed.description = operation.description;
      }

      operations.push(parsed);
    }
  }

  return operations;
}

/**
 * Merges path-level and operation-level parameters.
 * Operation-level parameters override path-level ones with the same name+in.
 */
function mergeParameters(
  pathLevel: ParsedParameter[],
  opLevel: ParsedParameter[],
): ParsedParameter[] {
  const opKeys = new Set(opLevel.map((p) => `${p.in}:${p.name}`));
  const fromPath = pathLevel.filter((p) => !opKeys.has(`${p.in}:${p.name}`));
  return [...fromPath, ...opLevel];
}
