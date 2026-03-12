import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { z } from 'zod';
import { validateParams } from '../src/validation.js';

/**
 * Feature: vtex-mcp-servers
 * Property 14: Parameter Validation Rejects Invalid Input
 *
 * For any tool with a defined input schema, and for any input that violates
 * the schema (missing required fields, wrong types, values outside enum
 * constraints, strings violating pattern/length constraints), the validation
 * function should reject the input and return error messages describing each
 * violation.
 *
 * **Validates: Requirements 3.5, 12.1, 12.2, 12.3, 12.4**
 */

// ---------------------------------------------------------------------------
// Helpers & Arbitraries
// ---------------------------------------------------------------------------

/** Generates a valid field name (lowercase alpha, 1-12 chars). */
const fieldName = fc.stringMatching(/^[a-z][a-zA-Z0-9]{0,11}$/).filter((s) => s.length >= 1);

/** Generates a non-empty list of unique field names. */
const fieldNames = (min: number, max: number) =>
  fc.uniqueArray(fieldName, { minLength: min, maxLength: max }).filter((arr) => arr.length >= min);

/** Generates a value whose JS typeof is NOT the expected Zod type. */
function wrongTypeValue(expected: 'string' | 'number' | 'boolean'): fc.Arbitrary<unknown> {
  switch (expected) {
    case 'string':
      return fc.oneof(fc.integer(), fc.boolean(), fc.constant(null));
    case 'number':
      return fc.oneof(fc.string(), fc.boolean(), fc.constant(null));
    case 'boolean':
      return fc.oneof(fc.string(), fc.integer(), fc.constant(null));
  }
}

// ---------------------------------------------------------------------------
// Property Tests
// ---------------------------------------------------------------------------

describe('Property 14: Parameter Validation Rejects Invalid Input', () => {
  /** Validates: Requirements 3.5, 12.1, 12.2, 12.3, 12.4 */

  // -------------------------------------------------------------------------
  // 1. Missing required fields (Req 12.1)
  // -------------------------------------------------------------------------
  describe('missing required fields', () => {
    it('for any schema with required fields, omitting those fields produces rejection with each field named in errors', () => {
      fc.assert(
        fc.property(fieldNames(1, 5), (names) => {
          // Build a schema where every field is required
          const shape: Record<string, z.ZodTypeAny> = {};
          for (const name of names) {
            shape[name] = z.string();
          }
          const schema = z.object(shape);

          // Provide an empty object — all fields are missing
          const result = validateParams({}, schema);

          expect(result.success).toBe(false);
          if (!result.success) {
            // There should be at least one error per missing field
            expect(result.errors.length).toBeGreaterThanOrEqual(names.length);
            // Each missing field name must appear in at least one error message
            for (const name of names) {
              expect(result.errors.some((e) => e.includes(name))).toBe(true);
            }
          }
        }),
        { numRuns: 100 },
      );
    });

    it('for any schema with N required fields, providing only a subset still rejects with the missing ones named', () => {
      fc.assert(
        fc.property(fieldNames(2, 6), fc.integer({ min: 1 }), (names, seed) => {
          const shape: Record<string, z.ZodTypeAny> = {};
          for (const name of names) {
            shape[name] = z.number();
          }
          const schema = z.object(shape);

          // Provide values for only the first half of the fields
          const splitIdx = Math.max(1, Math.floor(names.length / 2));
          const provided: Record<string, unknown> = {};
          for (let i = 0; i < splitIdx; i++) {
            provided[names[i]] = seed;
          }
          const missing = names.slice(splitIdx);

          const result = validateParams(provided, schema);

          expect(result.success).toBe(false);
          if (!result.success) {
            for (const name of missing) {
              expect(result.errors.some((e) => e.includes(name))).toBe(true);
            }
          }
        }),
        { numRuns: 100 },
      );
    });
  });

  // -------------------------------------------------------------------------
  // 2. Type mismatches (Req 12.2)
  // -------------------------------------------------------------------------
  describe('type mismatches', () => {
    it('for any schema expecting a specific type, providing a different type produces rejection mentioning the field', () => {
      const typeAndWrong: Array<{
        label: string;
        zodType: z.ZodTypeAny;
        wrongArb: fc.Arbitrary<unknown>;
      }> = [
        { label: 'string', zodType: z.string(), wrongArb: wrongTypeValue('string') },
        { label: 'number', zodType: z.number(), wrongArb: wrongTypeValue('number') },
        { label: 'boolean', zodType: z.boolean(), wrongArb: wrongTypeValue('boolean') },
      ];

      for (const { label: _label, zodType, wrongArb } of typeAndWrong) {
        fc.assert(
          fc.property(fieldName, wrongArb, (name, wrongVal) => {
            const schema = z.object({ [name]: zodType });
            const result = validateParams({ [name]: wrongVal }, schema);

            expect(result.success).toBe(false);
            if (!result.success) {
              expect(result.errors.length).toBeGreaterThanOrEqual(1);
              // The error should reference the field name
              expect(result.errors.some((e) => e.includes(name))).toBe(true);
            }
          }),
          { numRuns: 100 },
        );
      }
    });
  });

  // -------------------------------------------------------------------------
  // 3. Enum violations (Req 12.3)
  // -------------------------------------------------------------------------
  describe('enum violations', () => {
    it('for any enum schema, providing a value not in the enum produces rejection listing allowed values', () => {
      // Generate a small set of allowed enum values and a value guaranteed not in the set
      const enumArb = fc
        .uniqueArray(fc.stringMatching(/^[a-z]{2,10}$/), { minLength: 2, maxLength: 6 })
        .filter((arr) => arr.length >= 2);

      fc.assert(
        fc.property(fieldName, enumArb, (name, allowedValues) => {
          // Create a value that is definitely not in the allowed set
          const invalidValue = allowedValues.join('_') + '_invalid';

          const schema = z.object({
            [name]: z.enum(allowedValues as [string, ...string[]]),
          });

          const result = validateParams({ [name]: invalidValue }, schema);

          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.errors.length).toBeGreaterThanOrEqual(1);
            // Error should mention the field
            expect(result.errors.some((e) => e.includes(name))).toBe(true);
            // Error should mention "must be one of"
            expect(result.errors.some((e) => e.includes('must be one of'))).toBe(true);
            // Error should list at least one of the allowed values
            expect(result.errors.some((e) => allowedValues.some((v) => e.includes(v)))).toBe(true);
          }
        }),
        { numRuns: 100 },
      );
    });
  });

  // -------------------------------------------------------------------------
  // 4. String constraint violations (Req 12.4)
  // -------------------------------------------------------------------------
  describe('string constraint violations', () => {
    it('for any minLength constraint, strings shorter than the minimum are rejected', () => {
      fc.assert(
        fc.property(fieldName, fc.integer({ min: 2, max: 50 }), (name, minLen) => {
          const schema = z.object({ [name]: z.string().min(minLen) });
          // Generate a string that is too short (0 to minLen-1 chars)
          const shortStr = 'x'.repeat(minLen - 1);

          const result = validateParams({ [name]: shortStr }, schema);

          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.errors.length).toBeGreaterThanOrEqual(1);
            expect(result.errors.some((e) => e.includes(name))).toBe(true);
            expect(result.errors.some((e) => e.includes('at least'))).toBe(true);
          }
        }),
        { numRuns: 100 },
      );
    });

    it('for any maxLength constraint, strings longer than the maximum are rejected', () => {
      fc.assert(
        fc.property(fieldName, fc.integer({ min: 1, max: 50 }), (name, maxLen) => {
          const schema = z.object({ [name]: z.string().max(maxLen) });
          // Generate a string that is too long
          const longStr = 'x'.repeat(maxLen + 1);

          const result = validateParams({ [name]: longStr }, schema);

          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.errors.length).toBeGreaterThanOrEqual(1);
            expect(result.errors.some((e) => e.includes(name))).toBe(true);
            expect(result.errors.some((e) => e.includes('at most'))).toBe(true);
          }
        }),
        { numRuns: 100 },
      );
    });

    it('for any regex pattern constraint, strings not matching the pattern are rejected', () => {
      fc.assert(
        fc.property(fieldName, (name) => {
          // Use a fixed pattern: exactly 2 uppercase letters
          const schema = z.object({ [name]: z.string().regex(/^[A-Z]{2}$/) });
          // Provide a lowercase string that won't match
          const invalidStr = 'abc';

          const result = validateParams({ [name]: invalidStr }, schema);

          expect(result.success).toBe(false);
          if (!result.success) {
            expect(result.errors.length).toBeGreaterThanOrEqual(1);
            expect(result.errors.some((e) => e.includes(name))).toBe(true);
            expect(result.errors.some((e) => e.includes('pattern'))).toBe(true);
          }
        }),
        { numRuns: 100 },
      );
    });
  });
});
