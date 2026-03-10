import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
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

  it("loads config with appKey + appToken auth", () => {
    process.env.VTEX_ACCOUNT_NAME = "mystore";
    process.env.VTEX_APP_KEY = "key123";
    process.env.VTEX_APP_TOKEN = "token456";

    const config = loadConfig();

    expect(config).toEqual({
      accountName: "mystore",
      environment: "vtexcommercestable",
      appKey: "key123",
      appToken: "token456",
    });
  });

  it("loads config with authToken auth", () => {
    process.env.VTEX_ACCOUNT_NAME = "mystore";
    process.env.VTEX_AUTH_TOKEN = "bearer-xyz";

    const config = loadConfig();

    expect(config).toEqual({
      accountName: "mystore",
      environment: "vtexcommercestable",
      authToken: "bearer-xyz",
    });
  });

  it("uses custom environment when VTEX_ENVIRONMENT is set", () => {
    process.env.VTEX_ACCOUNT_NAME = "mystore";
    process.env.VTEX_APP_KEY = "key123";
    process.env.VTEX_APP_TOKEN = "token456";
    process.env.VTEX_ENVIRONMENT = "vtexcommercebeta";

    const config = loadConfig();

    expect(config.environment).toBe("vtexcommercebeta");
  });

  it("includes both auth methods when all credentials are provided", () => {
    process.env.VTEX_ACCOUNT_NAME = "mystore";
    process.env.VTEX_APP_KEY = "key123";
    process.env.VTEX_APP_TOKEN = "token456";
    process.env.VTEX_AUTH_TOKEN = "bearer-xyz";

    const config = loadConfig();

    expect(config.appKey).toBe("key123");
    expect(config.appToken).toBe("token456");
    expect(config.authToken).toBe("bearer-xyz");
  });

  it("throws when VTEX_ACCOUNT_NAME is missing", () => {
    process.env.VTEX_APP_KEY = "key123";
    process.env.VTEX_APP_TOKEN = "token456";

    expect(() => loadConfig()).toThrow("VTEX_ACCOUNT_NAME");
  });

  it("throws when no auth credentials are provided", () => {
    process.env.VTEX_ACCOUNT_NAME = "mystore";

    expect(() => loadConfig()).toThrow("VTEX_APP_KEY");
    expect(() => loadConfig()).toThrow("VTEX_APP_TOKEN");
    expect(() => loadConfig()).toThrow("VTEX_AUTH_TOKEN");
  });

  it("throws listing all missing variables when nothing is set", () => {
    expect(() => loadConfig()).toThrow("VTEX_ACCOUNT_NAME");
    expect(() => loadConfig()).toThrow("VTEX_APP_KEY");
    expect(() => loadConfig()).toThrow("VTEX_APP_TOKEN");
    expect(() => loadConfig()).toThrow("VTEX_AUTH_TOKEN");
  });

  it("does not throw when only appKey is provided without appToken but authToken is set", () => {
    process.env.VTEX_ACCOUNT_NAME = "mystore";
    process.env.VTEX_APP_KEY = "key123";
    process.env.VTEX_AUTH_TOKEN = "bearer-xyz";

    const config = loadConfig();

    expect(config.accountName).toBe("mystore");
    expect(config.appKey).toBe("key123");
    expect(config.authToken).toBe("bearer-xyz");
  });
});
