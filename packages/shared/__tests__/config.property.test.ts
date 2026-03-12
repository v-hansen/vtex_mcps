import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import { loadConfig } from '../src/config.js';

/**
 * Feature: vtex-mcp-servers
 * Property 8: Configuration Loading from Environment Variables
 * Property 9: Missing Configuration Error Reporting
 */

// Arbitrary for non-empty alphanumeric strings (valid env var values)
const nonEmptyAlphanumeric = fc.stringMatching(/^[a-zA-Z0-9]{1,50}$/);

// Arbitrary for valid VTEX environment names
const vtexEnvironment = fc.constantFrom(
  'vtexcommercestable',
  'vtexcommercebeta',
  'vtexcommerce',
  'myvtex',
);

describe('Property 8: Configuration Loading from Environment Variables', () => {
  /** Validates: Requirements 4.1, 4.2, 4.5 */

  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.VTEX_ACCOUNT_NAME;
    delete process.env.VTEX_APP_KEY;
    delete process.env.VTEX_APP_TOKEN;
    delete process.env.VTEX_ENVIRONMENT;
    delete process.env.VTEX_AUTH_TOKEN;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('for any valid appKey+appToken env vars, loadConfig produces matching VtexConfig with correct base URL derivation', () => {
    /** Validates: Requirements 4.1, 4.2, 4.5 */
    fc.assert(
      fc.property(
        nonEmptyAlphanumeric,
        nonEmptyAlphanumeric,
        nonEmptyAlphanumeric,
        vtexEnvironment,
        (accountName, appKey, appToken, environment) => {
          process.env.VTEX_ACCOUNT_NAME = accountName;
          process.env.VTEX_APP_KEY = appKey;
          process.env.VTEX_APP_TOKEN = appToken;
          process.env.VTEX_ENVIRONMENT = environment;

          const config = loadConfig();

          expect(config.accountName).toBe(accountName);
          expect(config.appKey).toBe(appKey);
          expect(config.appToken).toBe(appToken);
          expect(config.environment).toBe(environment);

          // Verify derived base URL
          const expectedBaseUrl = `https://${accountName}.${environment}.com.br`;
          const derivedBaseUrl = `https://${config.accountName}.${config.environment}.com.br`;
          expect(derivedBaseUrl).toBe(expectedBaseUrl);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('for any valid authToken env vars, loadConfig produces matching VtexConfig', () => {
    /** Validates: Requirements 4.1, 4.6 */
    fc.assert(
      fc.property(nonEmptyAlphanumeric, nonEmptyAlphanumeric, (accountName, authToken) => {
        process.env.VTEX_ACCOUNT_NAME = accountName;
        process.env.VTEX_AUTH_TOKEN = authToken;
        delete process.env.VTEX_APP_KEY;
        delete process.env.VTEX_APP_TOKEN;

        const config = loadConfig();

        expect(config.accountName).toBe(accountName);
        expect(config.authToken).toBe(authToken);
      }),
      { numRuns: 100 },
    );
  });

  it('when VTEX_ENVIRONMENT is absent, environment defaults to vtexcommercestable', () => {
    /** Validates: Requirements 4.2 */
    fc.assert(
      fc.property(
        nonEmptyAlphanumeric,
        nonEmptyAlphanumeric,
        nonEmptyAlphanumeric,
        (accountName, appKey, appToken) => {
          process.env.VTEX_ACCOUNT_NAME = accountName;
          process.env.VTEX_APP_KEY = appKey;
          process.env.VTEX_APP_TOKEN = appToken;
          delete process.env.VTEX_ENVIRONMENT;

          const config = loadConfig();

          expect(config.environment).toBe('vtexcommercestable');

          const derivedBaseUrl = `https://${config.accountName}.${config.environment}.com.br`;
          expect(derivedBaseUrl).toBe(`https://${accountName}.vtexcommercestable.com.br`);
        },
      ),
      { numRuns: 100 },
    );
  });
});

describe('Property 9: Missing Configuration Error Reporting', () => {
  /** Validates: Requirements 4.3 */

  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.VTEX_ACCOUNT_NAME;
    delete process.env.VTEX_APP_KEY;
    delete process.env.VTEX_APP_TOKEN;
    delete process.env.VTEX_ENVIRONMENT;
    delete process.env.VTEX_AUTH_TOKEN;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('when VTEX_ACCOUNT_NAME is missing and no auth is provided, error message contains VTEX_ACCOUNT_NAME and all auth var names', () => {
    /** Validates: Requirements 4.3 */
    fc.assert(
      fc.property(fc.constant(null), () => {
        // No env vars set at all
        try {
          loadConfig();
          // Should not reach here
          expect.unreachable('loadConfig should have thrown');
        } catch (error) {
          const message = (error as Error).message;
          expect(message).toContain('VTEX_ACCOUNT_NAME');
          expect(message).toContain('VTEX_APP_KEY');
          expect(message).toContain('VTEX_APP_TOKEN');
          expect(message).toContain('VTEX_AUTH_TOKEN');
        }
      }),
      { numRuns: 1 },
    );
  });

  it('when only VTEX_ACCOUNT_NAME is missing (with appKey+appToken), error mentions VTEX_ACCOUNT_NAME', () => {
    /** Validates: Requirements 4.3 */
    fc.assert(
      fc.property(nonEmptyAlphanumeric, nonEmptyAlphanumeric, (appKey, appToken) => {
        delete process.env.VTEX_ACCOUNT_NAME;
        process.env.VTEX_APP_KEY = appKey;
        process.env.VTEX_APP_TOKEN = appToken;

        try {
          loadConfig();
          expect.unreachable('loadConfig should have thrown');
        } catch (error) {
          const message = (error as Error).message;
          expect(message).toContain('VTEX_ACCOUNT_NAME');
        }
      }),
      { numRuns: 100 },
    );
  });

  it('when VTEX_ACCOUNT_NAME is present but no auth credentials, error mentions all auth var names', () => {
    /** Validates: Requirements 4.3 */
    fc.assert(
      fc.property(nonEmptyAlphanumeric, (accountName) => {
        process.env.VTEX_ACCOUNT_NAME = accountName;
        delete process.env.VTEX_APP_KEY;
        delete process.env.VTEX_APP_TOKEN;
        delete process.env.VTEX_AUTH_TOKEN;

        try {
          loadConfig();
          expect.unreachable('loadConfig should have thrown');
        } catch (error) {
          const message = (error as Error).message;
          expect(message).toContain('VTEX_APP_KEY');
          expect(message).toContain('VTEX_APP_TOKEN');
          expect(message).toContain('VTEX_AUTH_TOKEN');
        }
      }),
      { numRuns: 100 },
    );
  });

  it('for any subset of missing required vars, error message contains every missing var name', () => {
    /** Validates: Requirements 4.1, 4.2, 4.3 */

    // Generate scenarios where we selectively omit required vars
    // hasAccountName: whether VTEX_ACCOUNT_NAME is set
    // authMode: 'none' | 'partial_key' | 'partial_token' — all invalid auth combos
    const missingScenario = fc.record({
      hasAccountName: fc.boolean(),
      authMode: fc.constantFrom(
        'none',
        'partial_key_only',
        'partial_token_only',
      ) as fc.Arbitrary<string>,
      accountName: nonEmptyAlphanumeric,
      appKey: nonEmptyAlphanumeric,
      appToken: nonEmptyAlphanumeric,
    });

    fc.assert(
      fc.property(missingScenario, (scenario) => {
        // Reset
        delete process.env.VTEX_ACCOUNT_NAME;
        delete process.env.VTEX_APP_KEY;
        delete process.env.VTEX_APP_TOKEN;
        delete process.env.VTEX_AUTH_TOKEN;

        const expectedMissing: string[] = [];

        if (scenario.hasAccountName) {
          process.env.VTEX_ACCOUNT_NAME = scenario.accountName;
        } else {
          expectedMissing.push('VTEX_ACCOUNT_NAME');
        }

        // Set up invalid auth scenarios (none of these provide complete auth)
        if (scenario.authMode === 'none') {
          // No auth at all — all three auth vars should be reported
          expectedMissing.push('VTEX_APP_KEY', 'VTEX_APP_TOKEN', 'VTEX_AUTH_TOKEN');
        } else if (scenario.authMode === 'partial_key_only') {
          // Only appKey, no appToken and no authToken
          process.env.VTEX_APP_KEY = scenario.appKey;
          expectedMissing.push('VTEX_APP_TOKEN', 'VTEX_AUTH_TOKEN');
        } else if (scenario.authMode === 'partial_token_only') {
          // Only appToken, no appKey and no authToken
          process.env.VTEX_APP_TOKEN = scenario.appToken;
          expectedMissing.push('VTEX_APP_KEY', 'VTEX_AUTH_TOKEN');
        }

        try {
          loadConfig();
          expect.unreachable('loadConfig should have thrown for missing vars');
        } catch (error) {
          const message = (error as Error).message;
          for (const varName of expectedMissing) {
            expect(message).toContain(varName);
          }
        }
      }),
      { numRuns: 100 },
    );
  });
});
