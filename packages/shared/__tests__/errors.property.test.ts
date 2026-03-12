import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fc from 'fast-check';
import { VtexApiError, formatMcpError } from '../src/errors.js';

/**
 * Feature: vtex-mcp-servers
 * Property 11: Credential Sanitization in Error Messages
 *
 * For any error that contains credential strings (appKey, appToken, or authToken
 * values), the formatMcpError function should produce an output that does not
 * contain any of those credential strings.
 *
 * **Validates: Requirements 7.5**
 */

// Arbitrary for credential-like strings: non-empty, no whitespace-only,
// printable ASCII to avoid regex edge cases in split/join sanitization.
const credentialString = fc.stringMatching(/^[a-zA-Z0-9_-]{4,60}$/).filter((s) => s.length >= 4);

// Arbitrary for filler text around credentials
const fillerText = fc.stringMatching(/^[a-zA-Z0-9 ]{1,40}$/);

describe('Property 11: Credential Sanitization in Error Messages', () => {
  /** Validates: Requirements 7.5 */

  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.VTEX_APP_KEY;
    delete process.env.VTEX_APP_TOKEN;
    delete process.env.VTEX_AUTH_TOKEN;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('for any error containing appKey and appToken values, formatMcpError output must not contain those credential strings', () => {
    fc.assert(
      fc.property(credentialString, credentialString, fillerText, (appKey, appToken, filler) => {
        process.env.VTEX_APP_KEY = appKey;
        process.env.VTEX_APP_TOKEN = appToken;
        delete process.env.VTEX_AUTH_TOKEN;

        const errorMsg = `${filler} ${appKey} failed with ${appToken} ${filler}`;
        const error = new Error(errorMsg);
        const result = formatMcpError(error);

        const outputText = result.content[0].text;
        expect(outputText).not.toContain(appKey);
        expect(outputText).not.toContain(appToken);
      }),
      { numRuns: 100 },
    );
  });

  it('for any error containing authToken value, formatMcpError output must not contain that credential string', () => {
    fc.assert(
      fc.property(credentialString, fillerText, (authToken, filler) => {
        delete process.env.VTEX_APP_KEY;
        delete process.env.VTEX_APP_TOKEN;
        process.env.VTEX_AUTH_TOKEN = authToken;

        const errorMsg = `Token ${authToken} is invalid ${filler}`;
        const error = new Error(errorMsg);
        const result = formatMcpError(error);

        const outputText = result.content[0].text;
        expect(outputText).not.toContain(authToken);
      }),
      { numRuns: 100 },
    );
  });

  it('for any VtexApiError whose message embeds credential values, formatMcpError output must not contain those credentials', () => {
    fc.assert(
      fc.property(
        credentialString,
        credentialString,
        credentialString,
        fc.constantFrom(400, 401, 403, 404, 429, 500, 502, 503),
        (appKey, appToken, authToken, statusCode) => {
          process.env.VTEX_APP_KEY = appKey;
          process.env.VTEX_APP_TOKEN = appToken;
          process.env.VTEX_AUTH_TOKEN = authToken;

          // Embed credentials in the vtexMessage field
          const vtexMessage = `key=${appKey} token=${appToken} auth=${authToken}`;
          const error = new VtexApiError(statusCode, 'GET /api/test', vtexMessage);
          const result = formatMcpError(error);

          const outputText = result.content[0].text;
          expect(outputText).not.toContain(appKey);
          expect(outputText).not.toContain(appToken);
          expect(outputText).not.toContain(authToken);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('for any error with all three credential types set, none appear in the output regardless of error type', () => {
    fc.assert(
      fc.property(
        credentialString,
        credentialString,
        credentialString,
        fc.constantFrom('plain-error', 'vtex-api-error', 'timeout-error'),
        (appKey, appToken, authToken, errorType) => {
          process.env.VTEX_APP_KEY = appKey;
          process.env.VTEX_APP_TOKEN = appToken;
          process.env.VTEX_AUTH_TOKEN = authToken;

          const credentialLaden = `${appKey} and ${appToken} and ${authToken}`;
          let error: unknown;

          if (errorType === 'plain-error') {
            error = new Error(`Failure: ${credentialLaden}`);
          } else if (errorType === 'vtex-api-error') {
            error = new VtexApiError(500, 'POST /api/data', credentialLaden);
          } else {
            const timeoutErr = new Error(`timeout ${credentialLaden}`) as Error & {
              isTimeout: boolean;
              endpoint: string;
            };
            timeoutErr.isTimeout = true;
            timeoutErr.endpoint = '/api/test';
            error = timeoutErr;
          }

          const result = formatMcpError(error);
          const outputText = result.content[0].text;

          expect(outputText).not.toContain(appKey);
          expect(outputText).not.toContain(appToken);
          expect(outputText).not.toContain(authToken);
          expect(result.isError).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });
});
