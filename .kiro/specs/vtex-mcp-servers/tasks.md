# Implementation Plan: VTEX MCP Servers

## Overview

Incremental build-up from monorepo foundation → shared library → code generator → generated servers → CI/CD and documentation. Each task builds on the previous, ensuring no orphaned code. TypeScript throughout, pnpm workspaces, vitest + fast-check for testing.

## Tasks

- [x] 1. Initialize monorepo structure and tooling
  - [x] 1.1 Create root workspace configuration
    - Initialize `package.json` with pnpm workspace config
    - Create `pnpm-workspace.yaml` with globs for `packages/*` and `servers/*`
    - Create `tsconfig.base.json` with shared TypeScript compiler options (strict, ES2022, NodeNext module resolution, declaration files)
    - Create `.eslintrc.json` and `.prettierrc` with shared lint/format rules
    - Create `specs/` directory for OpenAPI spec files
    - _Requirements: 5.1, 5.2, 5.4, 5.6, 9.3_

  - [x] 1.2 Scaffold shared library package skeleton
    - Create `packages/shared/package.json` with name `@vtex-mcp/shared`, dependencies on `@modelcontextprotocol/sdk`, `zod`, `axios`
    - Create `packages/shared/tsconfig.json` extending root tsconfig
    - Create `packages/shared/src/index.ts` barrel export (empty initially)
    - _Requirements: 5.3, 9.4_

  - [x] 1.3 Scaffold generator package skeleton
    - Create `packages/generator/package.json` with name `@vtex-mcp/generator`, dependency on `@apidevtools/swagger-parser`, `zod`
    - Create `packages/generator/tsconfig.json` extending root tsconfig
    - Create `packages/generator/src/index.ts` (empty initially)
    - _Requirements: 9.1_

- [x] 2. Implement shared library — configuration and HTTP client
  - [x] 2.1 Implement `packages/shared/src/config.ts`
    - Implement `loadConfig()` that reads `VTEX_ACCOUNT_NAME`, `VTEX_APP_KEY`, `VTEX_APP_TOKEN`, `VTEX_ENVIRONMENT` (default `vtexcommercestable`), `VTEX_AUTH_TOKEN` from environment variables
    - Throw descriptive error listing all missing required variables when `VTEX_ACCOUNT_NAME` is absent or neither appKey+appToken nor authToken is provided
    - Export `VtexConfig` interface
    - _Requirements: 4.1, 4.2, 4.3, 4.6_

  - [x] 2.2 Write property tests for config loading
    - **Property 8: Configuration Loading from Environment Variables**
    - **Property 9: Missing Configuration Error Reporting**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.5, 4.6**
    - Create `packages/shared/__tests__/config.property.test.ts` using fast-check
    - Property 8: For any valid env var set, `loadConfig` produces matching VtexConfig with correct base URL derivation
    - Property 9: For any subset of missing required vars, error message contains every missing var name

  - [x] 2.3 Implement `packages/shared/src/http-client.ts`
    - Implement `createHttpClient(config: VtexConfig): AxiosInstance`
    - Set `baseURL` to `https://{accountName}.{environment}.com.br`
    - Set 30s default timeout
    - Add request interceptor to inject auth headers: `X-VTEX-API-AppKey`/`X-VTEX-API-AppToken` or `VtexIdclientAutCookie` based on config
    - Add response interceptor for error normalization
    - _Requirements: 4.4, 4.5, 4.6, 7.4_

  - [x] 2.4 Write property tests for HTTP client auth headers
    - **Property 10: Authentication Header Injection**
    - **Validates: Requirements 4.4, 4.6**
    - Create `packages/shared/__tests__/http-client.property.test.ts` using fast-check
    - For any config with appKey+appToken, verify headers contain matching values
    - For any config with authToken, verify `VtexIdclientAutCookie` header matches

- [x] 3. Implement shared library — error handling and validation
  - [x] 3.1 Implement `packages/shared/src/errors.ts`
    - Implement `VtexApiError` class with `statusCode`, `endpoint`, `vtexMessage`, optional `retryAfter`
    - Implement `formatMcpError(error: unknown)` that returns sanitized MCP error content
    - Handle 401/403 (suggest checking credentials), 429 (include retry-after), timeouts (include endpoint), unexpected errors (strip credentials)
    - Credential sanitization: scan for appKey/appToken/authToken values and replace with `[REDACTED]`
    - _Requirements: 7.1, 7.2, 7.3, 7.5_

  - [x] 3.2 Write property tests for credential sanitization
    - **Property 11: Credential Sanitization in Error Messages**
    - **Validates: Requirements 7.5**
    - Create `packages/shared/__tests__/errors.property.test.ts` using fast-check
    - For any error containing credential strings, `formatMcpError` output must not contain those strings

  - [x] 3.3 Implement `packages/shared/src/validation.ts`
    - Implement `validateParams(params, schema)` using Zod schema validation
    - Return `{ success: true, data }` or `{ success: false, errors: string[] }` with descriptive messages for missing required fields, type mismatches, enum violations, string constraint violations
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x] 3.4 Write property tests for parameter validation
    - **Property 14: Parameter Validation Rejects Invalid Input**
    - **Validates: Requirements 3.5, 12.1, 12.2, 12.3, 12.4**
    - Create `packages/shared/__tests__/validation.property.test.ts` using fast-check
    - For any schema and any input violating it, validation rejects with descriptive errors

  - [x] 3.5 Implement `packages/shared/src/pagination.ts`
    - Export `PaginationParams` and `PaginatedResponse<T>` interfaces
    - Export default pagination values (page: 1, pageSize: 10)
    - _Requirements: 13.1, 13.2, 13.3_

- [x] 4. Implement shared library — MCP server factory
  - [x] 4.1 Implement `packages/shared/src/server-factory.ts`
    - Implement `createMcpServer(options)` wrapping `@modelcontextprotocol/sdk` Server
    - Register tools from `ToolDefinition[]` with validation and error handling
    - Implement `startStdio()` for stdio transport
    - Implement `startHttp({ port })` for HTTP/SSE transport with `/sse` and `/messages` endpoints
    - Declare server capabilities via `initialize` handshake (name, version, tools)
    - Export `ToolDefinition`, `ToolResult`, `McpServerInstance` types
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 11.1, 11.2, 11.3, 11.4_

  - [x] 4.2 Update `packages/shared/src/index.ts` barrel export
    - Re-export all public APIs from config, http-client, errors, validation, pagination, server-factory
    - _Requirements: 5.3_

  - [x] 4.3 Write unit tests for MCP server factory
    - Test `tools/list` returns all registered tools with schemas
    - Test `tools/call` with valid params executes handler
    - Test `tools/call` with invalid params returns JSON-RPC error
    - Test `initialize` handshake returns server capabilities
    - _Requirements: 3.1, 3.3, 3.4, 3.5, 3.7_

- [x] 5. Checkpoint — Shared library complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement code generator — OpenAPI parser
  - [x] 6.1 Implement `packages/generator/src/parser.ts`
    - Implement `parseOpenApiSpec(specPath)` using `@apidevtools/swagger-parser`
    - Dereference `$ref` pointers and extract all operations as `ParsedOperation[]`
    - Extract path parameters, query parameters, request body, and response definitions per operation
    - _Requirements: 2.1, 2.2_

  - [x] 6.2 Write property tests for OpenAPI parser
    - **Property 1: OpenAPI Spec Round-Trip Consistency**
    - **Validates: Requirements 2.5**
    - Create `packages/generator/__tests__/parser.property.test.ts` using fast-check
    - For any valid OpenAPI spec, parsing → generating → re-parsing produces equivalent tool definitions

  - [x] 6.3 Implement `packages/generator/src/schema-converter.ts`
    - Implement `jsonSchemaToZod(schema)` converting JSON Schema to Zod schema code strings
    - Handle: required/optional fields, enum constraints, string pattern/minLength/maxLength, nested objects, arrays, default values
    - _Requirements: 2.2, 10.3, 10.4, 12.3, 12.4_

  - [x] 6.4 Write unit tests for schema converter
    - Test enum → `z.enum(...)`, pattern → `z.string().regex(...)`, minLength/maxLength → `z.string().min().max()`
    - Test nested objects and arrays
    - Test default value preservation
    - _Requirements: 2.2, 10.4_

- [x] 7. Implement code generator — tool and package generation
  - [x] 7.1 Implement `packages/generator/src/tool-generator.ts`
    - Implement `operationToTool(operation, apiGroupPrefix)` mapping OpenAPI operations to `ToolDefinition` code
    - Generate tool name as `{apiGroup}_{operationId}` in snake_case
    - Generate description with summary + `{METHOD} {path}`
    - Map path params as required, query params as optional (with defaults), request body as nested object
    - Generate error handling for each documented error response code
    - Generate pagination parameter exposure for paginated endpoints
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 10.1, 10.2, 10.3, 10.4, 10.5, 13.1, 13.2_

  - [x] 7.2 Write property tests for tool generator
    - **Property 2: Tool Naming and Description from OpenAPI**
    - **Property 3: Parameter Mapping Completeness**
    - **Property 4: Error Response Code Coverage in Generation**
    - **Validates: Requirements 2.2, 2.3, 2.4, 10.1, 10.2, 10.3, 10.4, 10.5**
    - Create `packages/generator/__tests__/tool-generator.property.test.ts` using fast-check
    - Property 2: Name follows `{apiGroup}_{operationId}`, description contains summary and METHOD+path
    - Property 3: Every spec parameter appears in tool schema with correct type/required/default
    - Property 4: Every documented error response code has handling logic

  - [x] 7.3 Implement `packages/generator/src/package-generator.ts`
    - Implement file scaffolding: generate `src/index.ts`, `src/tools.ts`, `src/cli.ts`, `package.json` (with bin entry, `@vtex-mcp/{api-group}` name), `tsconfig.json`, `README.md` (with tool list and setup instructions), `Dockerfile`
    - `cli.ts` handles `--transport` (stdio/http) and `--port` flags
    - `package.json` includes bin entry for `npx` execution
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 9.2, 11.2, 11.3, 14.4_

  - [x] 7.4 Write property tests for package generator
    - **Property 12: Package Naming Convention**
    - **Property 13: Generator File Scaffolding Completeness**
    - **Validates: Requirements 6.1, 9.2**
    - Create `packages/generator/__tests__/package-generator.property.test.ts` using fast-check
    - Property 12: Package name follows `@vtex-mcp/{kebab-case-api-group}`
    - Property 13: Generated directory contains all required files (src/index.ts, src/tools.ts, src/cli.ts, package.json, tsconfig.json, README.md, Dockerfile)

  - [x] 7.5 Implement `packages/generator/src/cli.ts` — generator CLI entry point
    - Accept `--spec` (path to OpenAPI spec), `--output` (target dir), `--name` (package name), `--server-name` (human-readable name)
    - Wire together parser → schema-converter → tool-generator → package-generator
    - Add bin entry in generator's `package.json`
    - _Requirements: 9.1, 9.2_

  - [x] 7.6 Update `packages/generator/src/index.ts` barrel export
    - Export `generateServer`, `GeneratorOptions`, and sub-module functions
    - _Requirements: 9.1_

- [x] 8. Checkpoint — Generator complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Generate a sample MCP server to validate the pipeline
  - [x] 9.1 Download a sample VTEX OpenAPI spec (e.g., Catalog API) into `specs/catalog-api.json`
    - Use the official VTEX API reference OpenAPI spec
    - _Requirements: 1.1, 5.4_

  - [x] 9.2 Run the generator to produce `servers/catalog-api/`
    - Execute the generator CLI against the Catalog API spec
    - Verify generated files: `src/index.ts`, `src/tools.ts`, `src/cli.ts`, `package.json`, `tsconfig.json`, `README.md`, `Dockerfile`
    - Verify tool names follow `catalog_{operationId}` pattern
    - Verify tool descriptions include summary and HTTP method+path
    - _Requirements: 1.1, 2.1, 2.3, 6.1, 6.2, 9.2, 10.1, 10.2, 10.5_

  - [x] 9.3 Write integration tests for the generated server
    - **Property 5: JSON-RPC 2.0 Protocol Conformance**
    - **Property 6: tools/list Completeness**
    - **Property 7: API Error Propagation**
    - **Property 15: Pagination Parameter Exposure and Metadata Passthrough**
    - **Validates: Requirements 3.1, 3.3, 3.6, 13.1, 13.2**
    - Create `servers/catalog-api/__tests__/server.property.test.ts`
    - Property 5: All responses are valid JSON-RPC 2.0
    - Property 6: tools/list returns all registered tools with valid schemas
    - Property 7: VTEX API errors propagate with status code and message
    - Property 15: Paginated endpoints expose pagination params and pass through metadata

- [x] 10. Checkpoint — End-to-end pipeline validated
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Generate remaining VTEX MCP servers
  - [x] 11.1 Download OpenAPI specs for all remaining VTEX API groups into `specs/`
    - Download specs for all 42+ API groups listed in Requirement 1.1
    - _Requirements: 1.1, 5.4_

  - [x] 11.2 Run the generator for all remaining API groups
    - Execute the generator CLI for each spec to produce server packages under `servers/`
    - Verify each server builds and its tools/list returns expected tools
    - _Requirements: 1.1, 1.3, 2.1_

- [x] 12. CI/CD, Docker, and build configuration
  - [x] 12.1 Create GitHub Actions CI workflow
    - Create `.github/workflows/ci.yml` that builds and tests all packages on push to main and on pull requests
    - Use pnpm for install, run `pnpm build` and `pnpm test` across all workspaces
    - _Requirements: 14.1_

  - [x] 12.2 Create GitHub Actions publish workflow
    - Create `.github/workflows/publish.yml` that publishes packages to npm on version tag
    - _Requirements: 14.3_

  - [x] 12.3 Create root `docker-compose.yml`
    - Define services for all MCP servers for local development
    - Each service uses the server's Dockerfile
    - Pass environment variables for VTEX credentials
    - _Requirements: 14.5_

  - [x] 12.4 Verify TypeScript compilation produces declaration files
    - Ensure `pnpm build` from root compiles all packages with `.d.ts` output
    - Verify incremental builds via TypeScript project references
    - _Requirements: 5.5, 9.4, 14.2_

- [x] 13. Documentation
  - [x] 13.1 Create root `README.md`
    - Project overview, architecture diagram, quick start guide, links to individual server docs
    - MCP client configuration example (Claude Desktop, Cursor)
    - _Requirements: 8.1, 8.3_

  - [x] 13.2 Create `CONTRIBUTING.md`
    - Instructions for adding new MCP servers using the generator
    - Coding standards, PR process, testing guidelines
    - _Requirements: 8.2_

  - [x] 13.3 Create `LICENSE` file
    - MIT license
    - _Requirements: 8.5_

- [x] 14. Final checkpoint — All servers built, tested, and documented
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The generator is the key leverage point: once it works, 42+ servers are produced automatically
