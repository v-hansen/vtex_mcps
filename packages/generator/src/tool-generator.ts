import type { ParsedOperation } from "./parser.js";
import { jsonSchemaToZod } from "./schema-converter.js";

// --- Exported Interfaces ---

export interface GeneratedTool {
  name: string;
  description: string;
  inputSchemaCode: string;
  handlerCode: string;
}

// --- Pagination Detection ---

const PAGINATION_PARAM_NAMES = new Set(["page", "pageSize", "from", "to"]);

export function isPaginatedOperation(op: ParsedOperation): boolean {
  return op.parameters.some(
    (p) => p.in === "query" && PAGINATION_PARAM_NAMES.has(p.name),
  );
}

// --- Snake Case Conversion ---

export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
}

// --- Input Schema Code Generation ---


function safePropertyName(name: string): string {
  // If the name is a valid JS identifier, use it as-is
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
    return name;
  }
  // Otherwise, quote it
  return JSON.stringify(name);
}

function buildInputSchemaCode(operation: ParsedOperation): string {
  const fields: string[] = [];

  // Path parameters - always required
  for (const param of operation.parameters.filter((p) => p.in === "path")) {
    const zodType = jsonSchemaToZod(param.schema);
    const desc = param.description
      ? `.describe(${JSON.stringify(param.description)})`
      : "";
    fields.push(`${safePropertyName(param.name)}: ${zodType}${desc}`);
  }

  // Query parameters - optional with defaults
  for (const param of operation.parameters.filter((p) => p.in === "query")) {
    let zodType = jsonSchemaToZod(param.schema);
    const desc = param.description
      ? `.describe(${JSON.stringify(param.description)})`
      : "";
    if (!param.required && !zodType.includes(".default(")) {
      zodType += ".optional()";
    }
    fields.push(`${safePropertyName(param.name)}: ${zodType}${desc}`);
  }

  // Request body - nested object
  if (operation.requestBody) {
    const bodyZod = jsonSchemaToZod(operation.requestBody.schema);
    if (operation.requestBody.required) {
      fields.push(`body: ${bodyZod}`);
    } else {
      fields.push(`body: ${bodyZod}.optional()`);
    }
  }

  if (fields.length === 0) {
    return "z.object({})";
  }
  return `z.object({\n  ${fields.join(",\n  ")}\n})`;
}

// --- Handler Code Generation ---

function buildPathExpression(path: string): string {
  if (!path.includes("{")) {
    return JSON.stringify(path);
  }
  const template = path.replace(/\{([^}]+)\}/g, (_, name) => {
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
      return "${params." + name + "}";
    }
    return "${params[" + JSON.stringify(name) + "]}";
  });
  return "`" + template + "`";
}

function buildErrorHandlers(operation: ParsedOperation): string {
  const errorCodes = Object.keys(operation.responses).filter(
    (code) => code.startsWith("4") || code.startsWith("5"),
  );
  if (errorCodes.length === 0) return "";

  const cases = errorCodes.map((code) => {
    const resp = operation.responses[code];
    const desc = resp.description
      ? resp.description.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r')
      : "HTTP " + code + " error";
    return '      case ' + code + ':\n        throw new Error("' + desc + '");';
  });

  return [
    "    if (error.response) {",
    "      switch (error.response.status) {",
    ...cases,
    "      }",
    "    }",
  ].join("\n");
}

function buildHandlerCode(operation: ParsedOperation): string {
  const method = operation.method.toLowerCase();
  const pathExpr = buildPathExpression(operation.path);
  const queryParams = operation.parameters.filter((p) => p.in === "query");
  const hasQueryParams = queryParams.length > 0;
  const hasBody = !!operation.requestBody;

  const lines: string[] = [];
  lines.push("async (params) => {");
  lines.push("  try {");
  lines.push("    const url = " + pathExpr + ";");

  if (hasQueryParams) {
    lines.push("    const queryParams: Record<string, unknown> = {};");
    for (const qp of queryParams) {
      const accessor = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(qp.name)
        ? "params." + qp.name
        : "params[" + JSON.stringify(qp.name) + "]";
      lines.push(
        "    if (" + accessor + " !== undefined) queryParams[" + JSON.stringify(qp.name) + "] = " + accessor + ";",
      );
    }
  }

  const configParts: string[] = [];
  if (hasQueryParams) {
    configParts.push("params: queryParams");
  }
  const configStr = configParts.length > 0
    ? ", { " + configParts.join(", ") + " }"
    : "";

  if (hasBody && (method === "post" || method === "put" || method === "patch")) {
    lines.push("    const response = await http." + method + "(url, params.body" + configStr + ");");
  } else {
    lines.push("    const response = await http." + method + "(url" + configStr + ");");
  }

  lines.push('    return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };');

  const errorHandlers = buildErrorHandlers(operation);
  lines.push("  } catch (error: any) {");
  if (errorHandlers) {
    lines.push(errorHandlers);
  }
  lines.push('    const message = error.response?.data?.message ?? error.message ?? "Unknown error";');
  lines.push("    const status = error.response?.status ?? 500;");
  lines.push("    return {");
  lines.push('      content: [{ type: "text" as const, text: `VTEX API error ${status}: ${message}` }],');
  lines.push("      isError: true,");
  lines.push("    };");
  lines.push("  }");
  lines.push("}");

  return lines.join("\n");
}

// --- Main Export ---

/**
 * Converts a ParsedOperation into a GeneratedTool containing
 * the tool name, description, Zod input schema code, and handler code.
 */
export function operationToTool(
  operation: ParsedOperation,
  apiGroupPrefix: string,
): GeneratedTool {
  const snakePrefix = toSnakeCase(apiGroupPrefix);
  const snakeOpId = toSnakeCase(operation.operationId);
  const name = snakePrefix + "_" + snakeOpId;

  const summary = operation.summary || operation.operationId;
  const description = summary + "\n" + operation.method + " " + operation.path;

  const inputSchemaCode = buildInputSchemaCode(operation);
  const handlerCode = buildHandlerCode(operation);

  return { name, description, inputSchemaCode, handlerCode };
}
