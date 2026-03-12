// @vtex-mcp/shared — barrel export

// Configuration
export { VtexConfig, loadConfig } from './config.js';

// HTTP Client
export { createHttpClient } from './http-client.js';

// Error Handling
export { VtexApiError, formatMcpError } from './errors.js';

// Validation
export { validateParams } from './validation.js';

// Pagination
export {
  PaginationParams,
  PaginatedResponse,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from './pagination.js';

// MCP Server Factory
export {
  createMcpServer,
  ToolDefinition,
  ToolResult,
  McpServerInstance,
} from './server-factory.js';
