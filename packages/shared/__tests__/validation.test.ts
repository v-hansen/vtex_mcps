import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { validateParams } from '../src/validation.js';

describe('validateParams', () => {
  describe('success cases', () => {
    it('returns success with parsed data for valid input', () => {
      const schema = z.object({ name: z.string(), age: z.number() });
      const result = validateParams({ name: 'Alice', age: 30 }, schema);
      expect(result).toEqual({ success: true, data: { name: 'Alice', age: 30 } });
    });

    it('applies defaults from schema', () => {
      const schema = z.object({ page: z.number().default(1) });
      const result = validateParams({}, schema);
      expect(result).toEqual({ success: true, data: { page: 1 } });
    });

    it('strips unknown keys with strict schema', () => {
      const schema = z.object({ id: z.number() }).strict();
      const result = validateParams({ id: 1, extra: 'nope' }, schema);
      expect(result.success).toBe(false);
    });
  });

  describe('missing required fields (Req 12.1)', () => {
    it('reports a single missing required field', () => {
      const schema = z.object({ productId: z.number() });
      const result = validateParams({}, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0]).toContain('Missing required field');
        expect(result.errors[0]).toContain('productId');
      }
    });

    it('reports multiple missing required fields', () => {
      const schema = z.object({ name: z.string(), age: z.number() });
      const result = validateParams({}, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toHaveLength(2);
        expect(result.errors.some((e) => e.includes('name'))).toBe(true);
        expect(result.errors.some((e) => e.includes('age'))).toBe(true);
      }
    });
  });

  describe('type mismatches (Req 12.2)', () => {
    it('reports type mismatch for string given as number', () => {
      const schema = z.object({ count: z.number() });
      const result = validateParams({ count: 'not-a-number' }, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0]).toContain('count');
        expect(result.errors[0]).toContain('number');
        expect(result.errors[0]).toContain('string');
      }
    });

    it('reports type mismatch for number given as string', () => {
      const schema = z.object({ label: z.string() });
      const result = validateParams({ label: 42 }, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0]).toContain('label');
        expect(result.errors[0]).toContain('string');
        expect(result.errors[0]).toContain('number');
      }
    });
  });

  describe('enum violations (Req 12.3)', () => {
    it('reports invalid enum value', () => {
      const schema = z.object({ status: z.enum(['active', 'inactive']) });
      const result = validateParams({ status: 'deleted' }, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0]).toContain('status');
        expect(result.errors[0]).toContain('must be one of');
        expect(result.errors[0]).toContain('active');
        expect(result.errors[0]).toContain('inactive');
      }
    });
  });

  describe('string constraint violations (Req 12.4)', () => {
    it('reports minLength violation', () => {
      const schema = z.object({ sku: z.string().min(3) });
      const result = validateParams({ sku: 'ab' }, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0]).toContain('sku');
        expect(result.errors[0]).toContain('at least 3');
      }
    });

    it('reports maxLength violation', () => {
      const schema = z.object({ code: z.string().max(5) });
      const result = validateParams({ code: 'toolong' }, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0]).toContain('code');
        expect(result.errors[0]).toContain('at most 5');
      }
    });

    it('reports regex pattern violation', () => {
      const schema = z.object({ country: z.string().regex(/^[A-Z]{2}$/) });
      const result = validateParams({ country: 'usa' }, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors[0]).toContain('country');
        expect(result.errors[0]).toContain('pattern');
      }
    });
  });

  describe('multiple errors', () => {
    it('collects all validation errors at once', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
        status: z.enum(['active', 'inactive']),
      });
      const result = validateParams({ age: 'not-a-number', status: 'bad' }, schema);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThanOrEqual(3);
      }
    });
  });
});
