import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { createHttpClient } from "../src/http-client.js";
import type { VtexConfig } from "../src/config.js";
import type { InternalAxiosRequestConfig } from "axios";

/**
 * Feature: vtex-mcp-servers
 * Property 10: Authentication Header Injection
 *
 * Validates: Requirements 4.4, 4.6
 *
 * For any VtexConfig with appKey+appToken credentials, the HTTP client should
 * include X-VTEX-API-AppKey and X-VTEX-API-AppToken headers. For any VtexConfig
 * with an authToken instead, the HTTP client should include the
 * VtexIdclientAutCookie header. In both cases, the header values should match
 * the config values exactly.
 */

// Arbitrary for non-empty alphanumeric strings (valid credential values)
const nonEmptyAlphanumeric = fc.stringMatching(/^[a-zA-Z0-9]{1,50}$/);

// Arbitrary for valid VTEX environment names
const vtexEnvironment = fc.constantFrom(
  "vtexcommercestable",
  "vtexcommercebeta",
  "vtexcommerce",
  "myvtex"
);

/**
 * Helper: runs a dummy request config through the client's request interceptor
 * chain and returns the resulting config with injected headers.
 */
async function getInterceptedHeaders(
  config: VtexConfig
): Promise<Record<string, string>> {
  const client = createHttpClient(config);

  // Access the registered request interceptor handlers
  const handlers = (client.interceptors.request as any).handlers as Array<{
    fulfilled: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig;
  }>;

  // Build a minimal request config to pass through the interceptor
  const { AxiosHeaders } = await import("axios");
  let reqConfig = {
    headers: new AxiosHeaders(),
  } as InternalAxiosRequestConfig;

  // Run through all request interceptors in order
  for (const handler of handlers) {
    if (handler.fulfilled) {
      reqConfig = handler.fulfilled(reqConfig);
    }
  }

  // Extract headers as a plain object
  const headers: Record<string, string> = {};
  if (reqConfig.headers) {
    const raw = reqConfig.headers.toJSON() as Record<string, unknown>;
    for (const [key, value] of Object.entries(raw)) {
      if (typeof value === "string") {
        headers[key] = value;
      }
    }
  }
  return headers;
}

describe("Property 10: Authentication Header Injection", () => {
  /** Validates: Requirements 4.4, 4.6 */

  it("for any config with appKey+appToken, headers contain X-VTEX-API-AppKey and X-VTEX-API-AppToken with matching values", () => {
    /** Validates: Requirements 4.4 */
    fc.assert(
      fc.asyncProperty(
        nonEmptyAlphanumeric,
        vtexEnvironment,
        nonEmptyAlphanumeric,
        nonEmptyAlphanumeric,
        async (accountName, environment, appKey, appToken) => {
          const config: VtexConfig = {
            accountName,
            environment,
            appKey,
            appToken,
          };

          const headers = await getInterceptedHeaders(config);

          expect(headers["x-vtex-api-appkey"]).toBe(appKey);
          expect(headers["x-vtex-api-apptoken"]).toBe(appToken);
          // Should NOT have authToken header
          expect(headers["vtexidclientautcookie"]).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("for any config with authToken, headers contain VtexIdclientAutCookie with matching value", () => {
    /** Validates: Requirements 4.6 */
    fc.assert(
      fc.asyncProperty(
        nonEmptyAlphanumeric,
        vtexEnvironment,
        nonEmptyAlphanumeric,
        async (accountName, environment, authToken) => {
          const config: VtexConfig = {
            accountName,
            environment,
            authToken,
          };

          const headers = await getInterceptedHeaders(config);

          expect(headers["vtexidclientautcookie"]).toBe(authToken);
          // Should NOT have appKey/appToken headers
          expect(headers["x-vtex-api-appkey"]).toBeUndefined();
          expect(headers["x-vtex-api-apptoken"]).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });

  it("appKey+appToken takes precedence when both appKey+appToken and authToken are present", () => {
    /** Validates: Requirements 4.4, 4.6 */
    fc.assert(
      fc.asyncProperty(
        nonEmptyAlphanumeric,
        vtexEnvironment,
        nonEmptyAlphanumeric,
        nonEmptyAlphanumeric,
        nonEmptyAlphanumeric,
        async (accountName, environment, appKey, appToken, authToken) => {
          const config: VtexConfig = {
            accountName,
            environment,
            appKey,
            appToken,
            authToken,
          };

          const headers = await getInterceptedHeaders(config);

          // appKey+appToken should take precedence
          expect(headers["x-vtex-api-appkey"]).toBe(appKey);
          expect(headers["x-vtex-api-apptoken"]).toBe(appToken);
          // authToken header should NOT be set when appKey+appToken is present
          expect(headers["vtexidclientautcookie"]).toBeUndefined();
        }
      ),
      { numRuns: 100 }
    );
  });
});
