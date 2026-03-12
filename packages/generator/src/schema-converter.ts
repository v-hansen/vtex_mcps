import type { JSONSchema } from './parser.js';

function safeKey(name: string): string {
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
    return name;
  }
  return JSON.stringify(name);
}

/**
 * Converts a JSON Schema object to a Zod schema code string.
 *
 * Handles: required/optional fields, enum constraints,
 * string pattern/minLength/maxLength, nested objects, arrays, and default values.
 */
export function jsonSchemaToZod(schema: JSONSchema): string {
  if (!schema || typeof schema !== 'object') {
    return 'z.unknown()';
  }

  // Handle enum at top level (before type check, since enum can appear with or without type)
  const enumValues = schema.enum as unknown[] | undefined;
  if (Array.isArray(enumValues) && enumValues.length > 0) {
    if (enumValues.every((v) => typeof v === 'string')) {
      return applyDefault(
        `z.enum([${enumValues.map((v) => JSON.stringify(v)).join(', ')}])`,
        schema,
      );
    }
    // Non-string enums: use z.union of literals (filter out non-primitive values)
    const primitiveValues = enumValues.filter(
      (v) => typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' || v === null,
    );
    if (primitiveValues.length === 0) {
      return applyDefault('z.unknown()', schema);
    }
    const literals = primitiveValues.map((v) => `z.literal(${JSON.stringify(v)})`);
    if (literals.length === 1) {
      return applyDefault(literals[0], schema);
    }
    return applyDefault(`z.union([${literals.join(', ')}])`, schema);
  }

  const type = schema.type as string | string[] | undefined;

  // Handle union types (type as array)
  if (Array.isArray(type)) {
    const types = type
      .filter((t) => t !== 'null')
      .map((t) => jsonSchemaToZod({ ...schema, type: t, enum: undefined }));
    const hasNull = type.includes('null');
    if (types.length === 1) {
      return applyDefault(hasNull ? `${types[0]}.nullable()` : types[0], schema);
    }
    const union = `z.union([${types.join(', ')}])`;
    return applyDefault(hasNull ? `${union}.nullable()` : union, schema);
  }

  switch (type) {
    case 'string':
      return applyDefault(buildStringSchema(schema), schema);

    case 'number':
      return applyDefault('z.number()', schema);

    case 'integer':
      return applyDefault('z.number().int()', schema);

    case 'boolean':
      return applyDefault('z.boolean()', schema);

    case 'object':
      return applyDefault(buildObjectSchema(schema), schema);

    case 'array':
      return applyDefault(buildArraySchema(schema), schema);

    case 'null':
      return 'z.null()';

    default:
      // No type specified — fallback to z.unknown()
      return applyDefault('z.unknown()', schema);
  }
}

function buildStringSchema(schema: JSONSchema): string {
  let code = 'z.string()';

  const minLength = schema.minLength as number | undefined;
  if (typeof minLength === 'number') {
    code += `.min(${minLength})`;
  }

  const maxLength = schema.maxLength as number | undefined;
  if (typeof maxLength === 'number') {
    code += `.max(${maxLength})`;
  }

  const pattern = schema.pattern as string | undefined;
  if (typeof pattern === 'string') {
    code += `.regex(/${pattern}/)`;
  }

  return code;
}

function buildObjectSchema(schema: JSONSchema): string {
  const properties = schema.properties as Record<string, JSONSchema> | undefined;
  if (!properties || Object.keys(properties).length === 0) {
    return 'z.object({})';
  }

  const requiredFields = new Set(
    Array.isArray(schema.required) ? (schema.required as string[]) : [],
  );

  const entries = Object.entries(properties).map(([key, propSchema]) => {
    let propCode = jsonSchemaToZod(propSchema);
    if (!requiredFields.has(key)) {
      propCode += '.optional()';
    }
    return `${safeKey(key)}: ${propCode}`;
  });

  return `z.object({ ${entries.join(', ')} })`;
}

function buildArraySchema(schema: JSONSchema): string {
  const items = schema.items as JSONSchema | undefined;
  if (items) {
    return `z.array(${jsonSchemaToZod(items)})`;
  }
  return 'z.array(z.unknown())';
}

function applyDefault(code: string, schema: JSONSchema): string {
  if (schema.default !== undefined) {
    return `${code}.default(${JSON.stringify(schema.default)})`;
  }
  return code;
}
