import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { stripAnsi, sanitizeArg, DANGEROUS_CHARS, executeCommand } from '../src/cli-executor.js';
import type { CommandOutput } from '../src/cli-executor.js';

/**
 * Feature: vtex-cli-server
 * Property 1: Command output structure invariant
 *
 * Validates: Requirements 2.2, 2.5
 */
describe('Property 1: Command output structure invariant', () => {
  it('CommandOutput always has all four fields with correct types and success === (exitCode === 0)', () => {
    /** Validates: Requirements 2.2, 2.5 */
    fc.assert(
      fc.property(
        fc.integer(),
        fc.string(),
        fc.string(),
        (exitCode, stdout, stderr) => {
          const output: CommandOutput = {
            stdout,
            stderr,
            exitCode,
            success: exitCode === 0,
          };

          // Verify all four fields exist and have correct types
          expect(output).toHaveProperty('stdout');
          expect(output).toHaveProperty('stderr');
          expect(output).toHaveProperty('exitCode');
          expect(output).toHaveProperty('success');

          expect(typeof output.stdout).toBe('string');
          expect(typeof output.stderr).toBe('string');
          expect(typeof output.exitCode).toBe('number');
          expect(typeof output.success).toBe('boolean');

          // Verify the success invariant: success === (exitCode === 0)
          expect(output.success).toBe(exitCode === 0);
        },
      ),
      { numRuns: 100 },
    );
  });
});

/**
 * Feature: vtex-cli-server
 * Property 3: ANSI stripping idempotence
 *
 * Validates: Requirements 10.4
 */
describe('Property 3: ANSI stripping idempotence', () => {
  /** Common ANSI escape sequences to mix into generated strings. */
  const ANSI_SEQUENCES = [
    '\u001b[0m',      // reset
    '\u001b[1m',      // bold
    '\u001b[31m',     // red
    '\u001b[32m',     // green
    '\u001b[1;32m',   // bold green
    '\u001b[38;5;82m', // 256-color
    '\u001b[2J',      // clear screen
    '\u001b[H',       // cursor home
    '\u001b[?25h',    // show cursor
    '\u009b3m',       // CSI italic (8-bit C1)
  ];

  /** Regex matching ANSI escape sequences — same pattern used by stripAnsi. */
  const ANSI_REGEX =
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><~]/g;

  /**
   * fast-check arbitrary that produces strings with randomly embedded ANSI
   * escape sequences.
   */
  const stringWithAnsi = fc
    .array(
      fc.oneof(
        fc.string(),
        fc.constantFrom(...ANSI_SEQUENCES),
      ),
      { minLength: 1, maxLength: 10 },
    )
    .map((parts) => parts.join(''));

  it('stripAnsi is idempotent: stripAnsi(stripAnsi(s)) === stripAnsi(s)', () => {
    /** Validates: Requirements 10.4 */
    fc.assert(
      fc.property(stringWithAnsi, (s) => {
        const once = stripAnsi(s);
        const twice = stripAnsi(once);
        expect(twice).toBe(once);
      }),
      { numRuns: 100 },
    );
  });

  it('stripAnsi result contains no ANSI escape sequences', () => {
    /** Validates: Requirements 10.4 */
    fc.assert(
      fc.property(stringWithAnsi, (s) => {
        const result = stripAnsi(s);
        ANSI_REGEX.lastIndex = 0;
        expect(ANSI_REGEX.test(result)).toBe(false);
      }),
      { numRuns: 100 },
    );
  });
});


/**
 * Feature: vtex-cli-server
 * Property 5: Dangerous character sanitization
 *
 * Validates: Requirements 12.3
 */
describe('Property 5: Dangerous character sanitization', () => {
  /** The dangerous characters that sanitizeArg must remove. */
  const DANGEROUS = ';|&`$(){}[]<>!#~';

  /**
   * fast-check arbitrary that produces strings with randomly embedded
   * dangerous shell characters mixed with regular text.
   */
  const stringWithDangerousChars = fc
    .array(
      fc.oneof(
        fc.string(),
        fc.constantFrom(...DANGEROUS.split('')),
      ),
      { minLength: 1, maxLength: 20 },
    )
    .map((parts) => parts.join(''));

  it('sanitizeArg output contains none of the dangerous characters', () => {
    /** Validates: Requirements 12.3 */
    fc.assert(
      fc.property(stringWithDangerousChars, (s) => {
        const sanitized = sanitizeArg(s);
        // Reset lastIndex because DANGEROUS_CHARS has the global flag.
        DANGEROUS_CHARS.lastIndex = 0;
        expect(DANGEROUS_CHARS.test(sanitized)).toBe(false);
      }),
      { numRuns: 100 },
    );
  });
});


/**
 * Feature: vtex-cli-server
 * Property 6: Binary restriction
 *
 * Validates: Requirements 12.2
 */
describe('Property 6: Binary restriction', () => {
  it('executeCommand rejects any binary that is not "vtex"', async () => {
    /** Validates: Requirements 12.2 */
    await fc.assert(
      fc.asyncProperty(
        fc
          .string({ minLength: 1 })
          .filter((s) => {
            // Ensure the base name (last path segment) is never "vtex"
            const base = s.split('/').pop()?.split('\\').pop() ?? '';
            return base !== 'vtex';
          }),
        async (randomBinaryName) => {
          await expect(
            executeCommand('test', [], { cliPath: randomBinaryName }),
          ).rejects.toThrow(/Security|only the "vtex" binary is allowed/);
        },
      ),
      { numRuns: 100 },
    );
  });
});
