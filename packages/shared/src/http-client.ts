import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosError } from "axios";
import type { VtexConfig } from "./config.js";

/**
 * Creates a pre-configured Axios HTTP client for VTEX API requests.
 *
 * - baseURL: https://{accountName}.{environment}.com.br
 * - 30s default timeout
 * - Auth headers injected via request interceptor
 * - Error normalization via response interceptor
 */
export function createHttpClient(config: VtexConfig): AxiosInstance {
  const client = axios.create({
    baseURL: `https://${config.accountName}.${config.environment}.com.br`,
    timeout: 30_000,
  });

  // Request interceptor: inject authentication headers
  client.interceptors.request.use((reqConfig: InternalAxiosRequestConfig) => {
    if (config.appKey && config.appToken) {
      reqConfig.headers.set("X-VTEX-API-AppKey", config.appKey);
      reqConfig.headers.set("X-VTEX-API-AppToken", config.appToken);
    } else if (config.authToken) {
      reqConfig.headers.set("VtexIdclientAutCookie", config.authToken);
    }
    return reqConfig;
  });

  // Response interceptor: normalize errors
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        const { status, data } = error.response;
        const endpoint = error.config?.url ?? "unknown";
        const method = error.config?.method?.toUpperCase() ?? "UNKNOWN";
        const vtexMessage =
          typeof data === "object" && data !== null && "message" in data
            ? String((data as Record<string, unknown>).message)
            : typeof data === "string"
              ? data
              : `HTTP ${status} error`;

        const normalized = new Error(
          `VTEX API error ${status} on ${method} ${endpoint}: ${vtexMessage}`
        );
        (normalized as any).statusCode = status;
        (normalized as any).endpoint = `${method} ${endpoint}`;
        (normalized as any).vtexMessage = vtexMessage;

        if (status === 429) {
          const retryAfter = error.response.headers["retry-after"];
          if (retryAfter) {
            (normalized as any).retryAfter = parseInt(retryAfter, 10);
          }
        }

        return Promise.reject(normalized);
      }

      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        const endpoint = error.config?.url ?? "unknown";
        const timeoutError = new Error(
          `Request to ${endpoint} timed out after 30s.`
        );
        (timeoutError as any).isTimeout = true;
        (timeoutError as any).endpoint = endpoint;
        return Promise.reject(timeoutError);
      }

      return Promise.reject(error);
    }
  );

  return client;
}
