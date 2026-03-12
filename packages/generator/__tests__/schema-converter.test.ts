import { describe, it, expect } from 'vitest';
import { jsonSchemaToZod } from '../src/schema-converter.js';

describe('jsonSchemaToZod', () => {
  it('converts string type', () => {
    expect(jsonSchemaToZod({ type: 'string' })).toBe('z.string()');
  });

  it('converts number type', () => {
    expect(jsonSchemaToZod({ type: 'number' })).toBe('z.number()');
  });

  it('converts integer type', () => {
    expect(jsonSchemaToZod({ type: 'integer' })).toBe('z.number().int()');
  });

  it('converts boolean type', () => {
    expect(jsonSchemaToZod({ type: 'boolean' })).toBe('z.boolean()');
  });

  it('converts string enum', () => {
    expect(jsonSchemaToZod({ type: 'string', enum: ['active', 'inactive'] })).toBe(
      'z.enum(["active", "inactive"])',
    );
  });

  it('converts string with minLength and maxLength', () => {
    expect(jsonSchemaToZod({ type: 'string', minLength: 1, maxLength: 100 })).toBe(
      'z.string().min(1).max(100)',
    );
  });

  it('converts string with pattern', () => {
    expect(jsonSchemaToZod({ type: 'string', pattern: '^[A-Z]{2}$' })).toBe(
      'z.string().regex(/^[A-Z]{2}$/)',
    );
  });

  it('converts object with required fields', () => {
    const result = jsonSchemaToZod({
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
    });
    expect(result).toBe('z.object({ name: z.string() })');
  });

  it('converts object with optional fields', () => {
    const result = jsonSchemaToZod({
      type: 'object',
      properties: { name: { type: 'string' } },
    });
    expect(result).toBe('z.object({ name: z.string().optional() })');
  });

  it('converts array with items', () => {
    expect(jsonSchemaToZod({ type: 'array', items: { type: 'string' } })).toBe(
      'z.array(z.string())',
    );
  });

  it('applies default values', () => {
    expect(jsonSchemaToZod({ type: 'number', default: 1 })).toBe('z.number().default(1)');
  });

  it('applies string default values', () => {
    expect(jsonSchemaToZod({ type: 'string', default: 'hello' })).toBe(
      'z.string().default("hello")',
    );
  });

  it('converts nested objects', () => {
    const result = jsonSchemaToZod({
      type: 'object',
      properties: {
        address: {
          type: 'object',
          properties: { city: { type: 'string' } },
          required: ['city'],
        },
      },
      required: ['address'],
    });
    expect(result).toBe('z.object({ address: z.object({ city: z.string() }) })');
  });

  it('converts array of objects', () => {
    const result = jsonSchemaToZod({
      type: 'array',
      items: {
        type: 'object',
        properties: { id: { type: 'integer' } },
        required: ['id'],
      },
    });
    expect(result).toBe('z.array(z.object({ id: z.number().int() }))');
  });

  it('handles empty object (no properties)', () => {
    expect(jsonSchemaToZod({ type: 'object' })).toBe('z.object({})');
  });

  it('handles array without items', () => {
    expect(jsonSchemaToZod({ type: 'array' })).toBe('z.array(z.unknown())');
  });

  it('handles null type', () => {
    expect(jsonSchemaToZod({ type: 'null' })).toBe('z.null()');
  });

  it('handles unknown/missing type', () => {
    expect(jsonSchemaToZod({})).toBe('z.unknown()');
  });

  it('handles null/undefined schema', () => {
    expect(jsonSchemaToZod(null as any)).toBe('z.unknown()');
    expect(jsonSchemaToZod(undefined as any)).toBe('z.unknown()');
  });

  it('combines string constraints', () => {
    const result = jsonSchemaToZod({
      type: 'string',
      minLength: 2,
      maxLength: 50,
      pattern: '^[a-z]+$',
    });
    expect(result).toBe('z.string().min(2).max(50).regex(/^[a-z]+$/)');
  });

  it('handles enum with default', () => {
    const result = jsonSchemaToZod({
      type: 'string',
      enum: ['a', 'b', 'c'],
      default: 'a',
    });
    expect(result).toBe('z.enum(["a", "b", "c"]).default("a")');
  });
});
