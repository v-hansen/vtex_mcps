// @vtex-mcp/generator — Code generator for VTEX MCP server packages
// Parses OpenAPI specs and scaffolds fully functional MCP server packages

// --- Re-exports from sub-modules ---

export {
  parseOpenApiSpec,
  type ParsedOperation,
  type ParsedParameter,
  type ParsedRequestBody,
  type ParsedResponse,
  type JSONSchema,
} from "./parser.js";

export { jsonSchemaToZod } from "./schema-converter.js";

export {
  operationToTool,
  type GeneratedTool,
  toSnakeCase,
  isPaginatedOperation,
} from "./tool-generator.js";

export {
  generatePackage,
  type PackageGeneratorOptions,
} from "./package-generator.js";

// --- Convenience pipeline function ---

import { parseOpenApiSpec } from "./parser.js";
import { operationToTool } from "./tool-generator.js";
import { generatePackage } from "./package-generator.js";

/**
 * Options for the end-to-end server generation pipeline.
 */
export interface GeneratorOptions {
  specPath: string;
  outputDir: string;
  packageName: string;
  serverName: string;
}

/**
 * Convenience function that wires the full generation pipeline:
 * parseOpenApiSpec → operationToTool → generatePackage.
 */
export async function generateServer(options: GeneratorOptions): Promise<void> {
  const { specPath, outputDir, packageName, serverName } = options;

  // Derive apiGroupPrefix from package name: "@vtex-mcp/catalog-api" → "catalog"
  const apiGroupPrefix = packageName
    .replace(/^@vtex-mcp\//, "")
    .replace(/-api$/, "");

  const operations = await parseOpenApiSpec(specPath);
  const tools = operations.map((op) => operationToTool(op, apiGroupPrefix));

  await generatePackage({
    outputDir,
    packageName,
    serverName,
    tools,
  });
}
