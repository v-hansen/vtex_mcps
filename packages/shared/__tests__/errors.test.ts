import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { VtexApiError, formatMcpError } from "../src/errors.js";

describe("VtexApiError", () => {
  it("stores statusCode, endpoint, vtexMessage, and retryAfter", () => {
    const err = new VtexApiError(429, "GET /api/test", "Too many requests", 60);
    expect(err.statusCode).toBe(429);
    expect(err.endpoint).toBe("GET /api/test");
    expect(err.vtexMessage).toBe("Too many requests");
    expect(err.retryAfter).toBe(60);
    expect(err.name).toBe("VtexApiError");
    expect(err).toBeInstanceOf(Error);
  });

  it("works without retryAfter", () => {
    const err = new VtexApiError(500, "POST /api/data", "Server error");
    expect(err.retryAfter).toBeUndefined();
  });
});

describe("formatMcpError", () => {
  const savedEnv: Record<string, string | undefined> = {};

  beforeEach(() => {
    savedEnv.VTEX_APP_KEY = process.env.VTEX_APP_KEY;
    savedEnv.VTEX_APP_TOKEN = process.env.VTEX_APP_TOKEN;
    savedEnv.VTEX_AUTH_TOKEN = process.env.VTEX_AUTH_TOKEN;
  });

  afterEach(() => {
    process.env.VTEX_APP_KEY = savedEnv.VTEX_APP_KEY;
    process.env.VTEX_APP_TOKEN = savedEnv.VTEX_APP_TOKEN;
    process.env.VTEX_AUTH_TOKEN = savedEnv.VTEX_AUTH_TOKEN;
  });

  it("returns isError: true", () => {
    const result = formatMcpError(new Error("boom"));
    expect(result.isError).toBe(true);
  });

  it("returns content array with text type", () => {
    const result = formatMcpError(new Error("boom"));
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe("text");
  });

  describe("401/403 — authentication errors", () => {
    it("suggests checking credentials for 401", () => {
      const err = new VtexApiError(401, "GET /api/test", "Unauthorized");
      const result = formatMcpError(err);
      expect(result.content[0].text).toContain("Authentication failed");
      expect(result.content[0].text).toContain("401");
      expect(result.content[0].text).toContain("Check your VTEX_APP_KEY");
    });

    it("suggests checking credentials for 403", () => {
      const err = new VtexApiError(403, "GET /api/test", "Forbidden");
      const result = formatMcpError(err);
      expect(result.content[0].text).toContain("Authentication failed");
      expect(result.content[0].text).toContain("403");
      expect(result.content[0].text).toContain("VTEX_AUTH_TOKEN");
    });
  });

  describe("429 — rate limiting", () => {
    it("includes retry-after when present", () => {
      const err = new VtexApiError(429, "GET /api/test", "Rate limited", 120);
      const result = formatMcpError(err);
      expect(result.content[0].text).toContain("Rate limited");
      expect(result.content[0].text).toContain("Retry after 120s");
    });

    it("works without retry-after", () => {
      const err = new VtexApiError(429, "GET /api/test", "Rate limited");
      const result = formatMcpError(err);
      expect(result.content[0].text).toContain("Rate limited");
      expect(result.content[0].text).not.toContain("Retry after");
    });
  });

  describe("timeout errors", () => {
    it("handles timeout errors with endpoint", () => {
      const err = new Error("Request to /api/catalog timed out after 30s.") as any;
      err.isTimeout = true;
      err.endpoint = "/api/catalog";
      const result = formatMcpError(err);
      expect(result.content[0].text).toContain("timed out");
      expect(result.content[0].text).toContain("/api/catalog");
    });
  });

  describe("generic VTEX API errors", () => {
    it("includes status code and message", () => {
      const err = new VtexApiError(404, "GET /api/product/999", "Not found");
      const result = formatMcpError(err);
      expect(result.content[0].text).toContain("404");
      expect(result.content[0].text).toContain("Not found");
      expect(result.content[0].text).toContain("GET /api/product/999");
    });
  });

  describe("credential sanitization", () => {
    it("redacts appKey from error messages", () => {
      process.env.VTEX_APP_KEY = "vtexappkey-mystore-ABCDEF";
      process.env.VTEX_APP_TOKEN = "secret-token-12345";
      const err = new Error(
        "Failed with key vtexappkey-mystore-ABCDEF and token secret-token-12345"
      );
      const result = formatMcpError(err);
      expect(result.content[0].text).not.toContain("vtexappkey-mystore-ABCDEF");
      expect(result.content[0].text).not.toContain("secret-token-12345");
      expect(result.content[0].text).toContain("[REDACTED]");
    });

    it("redacts authToken from error messages", () => {
      process.env.VTEX_AUTH_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9";
      const err = new Error(
        "Token eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9 is invalid"
      );
      const result = formatMcpError(err);
      expect(result.content[0].text).not.toContain(
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9"
      );
      expect(result.content[0].text).toContain("[REDACTED]");
    });
  });

  describe("duck-typed http-client errors", () => {
    it("handles errors with statusCode property (401)", () => {
      const err = new Error("VTEX API error 401") as any;
      err.statusCode = 401;
      err.endpoint = "GET /api/test";
      err.vtexMessage = "Unauthorized";
      const result = formatMcpError(err);
      expect(result.content[0].text).toContain("Authentication failed");
      expect(result.content[0].text).toContain("Check your VTEX_APP_KEY");
    });

    it("handles errors with statusCode property (429 with retryAfter)", () => {
      const err = new Error("VTEX API error 429") as any;
      err.statusCode = 429;
      err.endpoint = "GET /api/test";
      err.retryAfter = 30;
      const result = formatMcpError(err);
      expect(result.content[0].text).toContain("Rate limited");
      expect(result.content[0].text).toContain("Retry after 30s");
    });
  });

  describe("unexpected errors", () => {
    it("handles non-Error objects", () => {
      const result = formatMcpError("string error");
      expect(result.content[0].text).toContain("Internal error");
      expect(result.isError).toBe(true);
    });

    it("handles null/undefined", () => {
      const result = formatMcpError(null);
      expect(result.content[0].text).toContain("Internal error");
    });
  });
});
