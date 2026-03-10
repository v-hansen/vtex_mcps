export interface VtexConfig {
  accountName: string;
  environment: string;
  appKey?: string;
  appToken?: string;
  authToken?: string;
}

export function loadConfig(): VtexConfig {
  const accountName = process.env.VTEX_ACCOUNT_NAME;
  const appKey = process.env.VTEX_APP_KEY;
  const appToken = process.env.VTEX_APP_TOKEN;
  const environment = process.env.VTEX_ENVIRONMENT || "vtexcommercestable";
  const authToken = process.env.VTEX_AUTH_TOKEN;

  const missing: string[] = [];

  if (!accountName) {
    missing.push("VTEX_ACCOUNT_NAME");
  }

  const hasAppKeyAuth = appKey && appToken;
  const hasTokenAuth = authToken;

  if (!hasAppKeyAuth && !hasTokenAuth) {
    if (!appKey) missing.push("VTEX_APP_KEY");
    if (!appToken) missing.push("VTEX_APP_TOKEN");
    if (!authToken) missing.push("VTEX_AUTH_TOKEN");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required VTEX environment variables: ${missing.join(", ")}. ` +
        `Provide VTEX_ACCOUNT_NAME and either VTEX_APP_KEY + VTEX_APP_TOKEN or VTEX_AUTH_TOKEN.`
    );
  }

  return {
    accountName: accountName!,
    environment,
    ...(appKey ? { appKey } : {}),
    ...(appToken ? { appToken } : {}),
    ...(authToken ? { authToken } : {}),
  };
}
