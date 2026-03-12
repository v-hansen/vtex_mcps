/**
 * Structured error for VTEX API failures.
 */
export class VtexApiError extends Error {
  constructor(
    public statusCode: number,
    public endpoint: string,
    public vtexMessage: string,
    public retryAfter?: number,
  ) {
    super(`VTEX API error ${statusCode} on ${endpoint}: ${vtexMessage}`);
    this.name = 'VtexApiError';
  }
}

/**
 * Replaces any occurrence of credential values with [REDACTED].
 */
function sanitizeCredentials(text: string): string {
  let result = text;

  // Pull live credential values from the environment
  const secrets: string[] = [];
  const envKeys = ['VTEX_APP_KEY', 'VTEX_APP_TOKEN', 'VTEX_AUTH_TOKEN'];
  for (const key of envKeys) {
    const val = process.env[key];
    if (val) {
      secrets.push(val);
    }
  }

  for (const secret of secrets) {
    // Only replace non-empty values that are long enough to be real credentials
    if (secret.length > 0) {
      result = result.split(secret).join('[REDACTED]');
    }
  }

  return result;
}

type McpErrorResult = {
  content: Array<{ type: 'text'; text: string }>;
  isError: true;
};

/**
 * Formats any error into a sanitized MCP error response.
 *
 * - 401/403: suggests checking credentials
 * - 429: includes retry-after info
 * - Timeouts: includes the endpoint
 * - Unexpected: strips credentials from the message
 */
export function formatMcpError(error: unknown): McpErrorResult {
  const makeResult = (text: string): McpErrorResult => ({
    content: [{ type: 'text' as const, text: sanitizeCredentials(text) }],
    isError: true,
  });

  // VtexApiError (structured)
  if (error instanceof VtexApiError) {
    const { statusCode, endpoint, vtexMessage, retryAfter } = error;

    if (statusCode === 401 || statusCode === 403) {
      return makeResult(
        `Authentication failed (${statusCode}) on ${endpoint}: ${vtexMessage}. ` +
          `Check your VTEX_APP_KEY and VTEX_APP_TOKEN (or VTEX_AUTH_TOKEN) credentials.`,
      );
    }

    if (statusCode === 429) {
      const retryMsg = retryAfter != null ? ` Retry after ${retryAfter}s.` : '';
      return makeResult(`Rate limited by VTEX API (429) on ${endpoint}.${retryMsg}`);
    }

    return makeResult(`VTEX API error ${statusCode} on ${endpoint}: ${vtexMessage}`);
  }

  // Errors produced by the http-client response interceptor (duck-typed)
  if (error instanceof Error) {
    const err = error as Error & {
      statusCode?: number;
      endpoint?: string;
      vtexMessage?: string;
      retryAfter?: number;
      isTimeout?: boolean;
    };

    // Timeout errors
    if (
      err.isTimeout ||
      err.message?.includes('timeout') ||
      err.message?.includes('ECONNABORTED')
    ) {
      const endpoint = err.endpoint ?? 'unknown';
      return makeResult(`Request to ${endpoint} timed out after 30s.`);
    }

    // HTTP errors with status code (from http-client interceptor)
    if (err.statusCode != null) {
      const endpoint = err.endpoint ?? 'unknown';
      const vtexMessage = err.vtexMessage ?? err.message;

      if (err.statusCode === 401 || err.statusCode === 403) {
        return makeResult(
          `Authentication failed (${err.statusCode}) on ${endpoint}: ${vtexMessage}. ` +
            `Check your VTEX_APP_KEY and VTEX_APP_TOKEN (or VTEX_AUTH_TOKEN) credentials.`,
        );
      }

      if (err.statusCode === 429) {
        const retryMsg = err.retryAfter != null ? ` Retry after ${err.retryAfter}s.` : '';
        return makeResult(`Rate limited by VTEX API (429) on ${endpoint}.${retryMsg}`);
      }

      return makeResult(`VTEX API error ${err.statusCode} on ${endpoint}: ${vtexMessage}`);
    }

    // Generic Error — sanitize and return
    return makeResult(`Internal error processing request: ${err.message}`);
  }

  // Completely unknown error type
  return makeResult('Internal error processing request.');
}
