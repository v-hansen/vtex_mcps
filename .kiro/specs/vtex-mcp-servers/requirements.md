# Requirements Document

## Introduction

This project creates a collection of MCP (Model Context Protocol) servers that expose ALL public VTEX e-commerce platform APIs. The project is organized to mirror the official VTEX API documentation grouping at https://developers.vtex.com/docs/api-reference. Each API group becomes a standalone MCP server that can be independently downloaded, configured, and deployed. The project is public on GitHub and follows international best practices for documentation, commit history, and developer experience.

## Glossary

- **MCP_Server**: A Model Context Protocol server that exposes a set of tools for AI assistants to interact with external APIs via JSON-RPC over stdio or HTTP transport
- **MCP_Tool**: A single callable function exposed by an MCP_Server, corresponding to one API endpoint
- **VTEX_API_Group**: A logical grouping of related VTEX API endpoints as defined in the official VTEX API reference documentation (e.g., Catalog API, Orders API, Payments API)
- **OpenAPI_Spec**: The OpenAPI/Swagger specification file published by VTEX for each API group, used as the source of truth for endpoint definitions
- **Transport_Layer**: The communication mechanism used by the MCP_Server to receive and respond to requests (stdio or HTTP/SSE)
- **Tool_Schema**: The JSON Schema definition describing the input parameters and expected output of an MCP_Tool
- **API_Credential**: The authentication credentials (App Key and App Token, or Bearer Token) required to authenticate requests to the VTEX platform
- **Monorepo**: A single Git repository containing multiple related packages/servers organized in a shared directory structure
- **Registry**: The npm package registry where individual MCP_Server packages can be published for distribution

## Requirements

### Requirement 1: VTEX API Group Coverage

**User Story:** As a developer, I want MCP servers for ALL public VTEX APIs, so that I can interact with any VTEX service through an AI assistant.

#### Acceptance Criteria

1. THE Monorepo SHALL contain one MCP_Server package for each of the following VTEX_API_Groups:
   - Catalog API
   - Orders API
   - Checkout API
   - Payments API
   - Payments Gateway API
   - Logistics API
   - Inventory API
   - Warehouse API
   - Pricing API
   - Promotions & Taxes API
   - Search API (VTEX Intelligent Search)
   - Suggestions API
   - Customer Credit API
   - Subscriptions API
   - Marketplace API (including Marketplace Protocol)
   - Master Data API v2
   - Master Data API v10.2
   - CMS (Legacy Portal)
   - VTEX ID API
   - License Manager API
   - Session Manager API
   - Antifraud Provider API
   - Gift Card API
   - Gift Card Hub API
   - Gift Card Provider Protocol
   - Payment Provider Protocol
   - Tax Service Provider Protocol
   - Rates and Benefits API
   - SKU Bindings API
   - Specification API
   - Brand API
   - Category API
   - Collection API (Beta)
   - Headless CMS API
   - VTEX DO API
   - Policies System API
   - Reviews and Ratings API
   - Message Center API
   - VTEX Tracking API
   - Returns API
   - Pickup Points API
   - Shipping Network API
   - Intelligent Search Events API

2. WHEN a new VTEX public API is identified that is not in the list above, THE Monorepo SHALL support adding a new MCP_Server package without modifying existing packages
3. THE Monorepo SHALL maintain the same logical grouping and naming conventions as the official VTEX API reference at https://developers.vtex.com/docs/api-reference

### Requirement 2: OpenAPI Spec-Driven Tool Generation

**User Story:** As a developer, I want MCP tools generated from official VTEX OpenAPI specs, so that the tools are accurate and stay in sync with the VTEX platform.

#### Acceptance Criteria

1. THE Code_Generator SHALL parse each VTEX_API_Group OpenAPI_Spec to produce MCP_Tool definitions
2. WHEN an OpenAPI_Spec defines an endpoint with path parameters, query parameters, and request body, THE Code_Generator SHALL map each parameter to the corresponding Tool_Schema input property
3. THE Code_Generator SHALL preserve the operationId, summary, and description from the OpenAPI_Spec as the MCP_Tool name and description
4. WHEN an OpenAPI_Spec defines multiple response codes for an endpoint, THE Code_Generator SHALL include error handling for each documented error response
5. FOR ALL generated MCP_Tools, parsing the OpenAPI_Spec then generating tools then re-parsing the spec SHALL produce equivalent tool definitions (round-trip consistency)

### Requirement 3: MCP Server Implementation

**User Story:** As a developer, I want each MCP server to follow the MCP protocol specification, so that any MCP-compatible AI assistant can use the tools.

#### Acceptance Criteria

1. THE MCP_Server SHALL implement the Model Context Protocol using JSON-RPC 2.0 message format
2. THE MCP_Server SHALL support stdio as the default Transport_Layer
3. WHEN an MCP_Server receives a `tools/list` request, THE MCP_Server SHALL return the complete list of MCP_Tools with their Tool_Schemas
4. WHEN an MCP_Server receives a `tools/call` request with valid parameters, THE MCP_Server SHALL execute the corresponding VTEX API call and return the response
5. IF an MCP_Server receives a `tools/call` request with invalid parameters, THEN THE MCP_Server SHALL return a JSON-RPC error with a descriptive message indicating which parameters are invalid
6. IF an MCP_Server receives a `tools/call` request and the VTEX API returns an error, THEN THE MCP_Server SHALL return the error status code and error message from the VTEX API response
7. THE MCP_Server SHALL declare its capabilities via the `initialize` handshake including server name, version, and supported tool list

### Requirement 4: Authentication and Configuration

**User Story:** As a developer, I want to configure VTEX credentials once and have all MCP servers use them, so that setup is simple and secure.

#### Acceptance Criteria

1. THE MCP_Server SHALL accept API_Credentials via environment variables: `VTEX_APP_KEY`, `VTEX_APP_TOKEN`, and `VTEX_ACCOUNT_NAME`
2. THE MCP_Server SHALL accept an optional `VTEX_ENVIRONMENT` environment variable to target different VTEX environments (default: `vtexcommercestable`)
3. IF the MCP_Server starts without required API_Credentials, THEN THE MCP_Server SHALL return a clear error message listing the missing environment variables
4. THE MCP_Server SHALL include the API_Credentials in the `X-VTEX-API-AppKey` and `X-VTEX-API-AppToken` headers for each VTEX API request
5. THE MCP_Server SHALL construct the base URL as `https://{VTEX_ACCOUNT_NAME}.{VTEX_ENVIRONMENT}.com.br` for API requests
6. THE MCP_Server SHALL accept an optional `VTEX_AUTH_TOKEN` environment variable as an alternative to App Key/Token authentication, using the `VtexIdclientAutCookie` header

### Requirement 5: Monorepo Project Structure

**User Story:** As a developer, I want a well-organized monorepo, so that I can easily find, build, and deploy individual MCP servers.

#### Acceptance Criteria

1. THE Monorepo SHALL use a workspace-based package manager (npm workspaces, pnpm workspaces, or yarn workspaces) to manage multiple MCP_Server packages
2. THE Monorepo SHALL organize MCP_Server packages under a `servers/` directory with one subdirectory per VTEX_API_Group
3. THE Monorepo SHALL contain a shared library package under `packages/shared/` for common utilities including HTTP client, authentication, error handling, and response formatting
4. THE Monorepo SHALL contain a `specs/` directory with the downloaded OpenAPI_Spec files for each VTEX_API_Group
5. WHEN a developer runs the build command from the repository root, THE Monorepo SHALL build all MCP_Server packages and the shared library
6. THE Monorepo SHALL use TypeScript as the implementation language for all packages

### Requirement 6: Individual Server Usability

**User Story:** As a developer, I want to install and run a single MCP server without needing the entire monorepo, so that I only use what I need.

#### Acceptance Criteria

1. THE MCP_Server package SHALL be publishable to the npm Registry as a standalone package with the naming convention `@vtex-mcp/{api-group-name}`
2. THE MCP_Server package SHALL include a `bin` entry so it can be run directly via `npx @vtex-mcp/{api-group-name}`
3. WHEN a developer installs a single MCP_Server package, THE package SHALL include all dependencies needed to run without the monorepo
4. THE MCP_Server package SHALL include a README.md with setup instructions, available tools list, and example MCP client configuration
5. WHEN a developer adds the MCP_Server to their MCP client configuration (e.g., Claude Desktop, Cursor), THE configuration SHALL require only the server command and environment variables

### Requirement 7: Error Handling and Resilience

**User Story:** As a developer, I want MCP servers to handle errors gracefully, so that my AI assistant gets useful error information instead of crashes.

#### Acceptance Criteria

1. IF the VTEX API returns an HTTP 429 (rate limit) response, THEN THE MCP_Server SHALL include the retry-after information in the error response
2. IF the VTEX API request times out, THEN THE MCP_Server SHALL return an error indicating the timeout and the endpoint that was called
3. IF the VTEX API returns an HTTP 401 or 403 response, THEN THE MCP_Server SHALL return an error indicating the authentication issue and suggest checking API_Credentials
4. THE MCP_Server SHALL set a default request timeout of 30 seconds for all VTEX API calls
5. IF the MCP_Server encounters an unexpected error during tool execution, THEN THE MCP_Server SHALL log the error details and return a sanitized error message without exposing API_Credentials

### Requirement 8: Documentation

**User Story:** As a developer, I want comprehensive documentation, so that I can quickly understand how to set up and use the MCP servers.

#### Acceptance Criteria

1. THE Monorepo SHALL contain a root README.md with project overview, architecture diagram, quick start guide, and links to individual server documentation
2. THE Monorepo SHALL contain a CONTRIBUTING.md with instructions for adding new MCP servers, coding standards, and pull request process
3. THE Monorepo SHALL contain a root MCP client configuration example file showing how to configure all servers simultaneously
4. WHEN a new MCP_Server package is added, THE package SHALL include a README.md listing all available MCP_Tools with their descriptions and parameter schemas
5. THE Monorepo SHALL contain a LICENSE file with an open-source license (MIT)

### Requirement 9: Developer Experience and Tooling

**User Story:** As a contributor, I want good developer tooling, so that I can develop and test MCP servers efficiently.

#### Acceptance Criteria

1. THE Monorepo SHALL include a code generator script that takes an OpenAPI_Spec file path and produces a new MCP_Server package scaffold
2. WHEN a developer runs the generator script with a valid OpenAPI_Spec, THE script SHALL create the server directory, tool definitions, package.json, tsconfig.json, and README.md
3. THE Monorepo SHALL include ESLint and Prettier configurations for consistent code formatting across all packages
4. THE Monorepo SHALL include a TypeScript project references configuration for incremental builds
5. WHEN a developer runs the test command, THE Monorepo SHALL execute tests for all packages and report results

### Requirement 10: Tool Naming and Description Quality

**User Story:** As an AI assistant user, I want MCP tools to have clear, descriptive names and descriptions, so that the AI can select the right tool for my request.

#### Acceptance Criteria

1. THE MCP_Tool name SHALL follow the pattern `{apiGroup}_{operationName}` using snake_case (e.g., `catalog_getProduct`, `orders_listOrders`)
2. THE MCP_Tool description SHALL include a one-line summary of what the tool does, derived from the OpenAPI_Spec operation summary
3. WHEN an MCP_Tool has required parameters, THE Tool_Schema SHALL mark those parameters as required in the JSON Schema
4. WHEN an MCP_Tool has optional parameters, THE Tool_Schema SHALL include default values from the OpenAPI_Spec where defined
5. THE MCP_Tool description SHALL include the HTTP method and path of the underlying VTEX API endpoint for transparency

### Requirement 11: HTTP Transport Support

**User Story:** As a developer, I want the option to run MCP servers over HTTP, so that I can deploy them as remote services.

#### Acceptance Criteria

1. WHERE HTTP transport is enabled, THE MCP_Server SHALL accept connections via Server-Sent Events (SSE) on a configurable port
2. THE MCP_Server SHALL accept a `--transport` CLI flag with values `stdio` (default) or `http`
3. WHERE HTTP transport is enabled, THE MCP_Server SHALL accept a `--port` CLI flag to configure the listening port (default: 3000)
4. WHERE HTTP transport is enabled, THE MCP_Server SHALL expose a `/sse` endpoint for SSE connections and a `/messages` endpoint for client-to-server messages

### Requirement 12: Request Parameter Validation

**User Story:** As a developer, I want input validation on all MCP tool calls, so that invalid requests are caught before hitting the VTEX API.

#### Acceptance Criteria

1. WHEN an MCP_Tool receives a call with missing required parameters, THE MCP_Server SHALL return an error listing the missing parameters before making any API request
2. WHEN an MCP_Tool receives a call with parameters of incorrect types, THE MCP_Server SHALL return an error describing the type mismatch
3. THE MCP_Server SHALL validate parameter values against any enum constraints defined in the OpenAPI_Spec
4. THE MCP_Server SHALL validate string parameters against any pattern, minLength, or maxLength constraints defined in the OpenAPI_Spec

### Requirement 13: Pagination Support

**User Story:** As a developer, I want MCP tools to handle paginated VTEX API responses, so that I can retrieve complete datasets through the AI assistant.

#### Acceptance Criteria

1. WHEN a VTEX API endpoint supports pagination, THE MCP_Tool SHALL expose pagination parameters (page, pageSize, from, to) as optional tool inputs
2. WHEN a paginated VTEX API response includes pagination metadata (total count, next page token), THE MCP_Tool SHALL include that metadata in the tool response
3. THE MCP_Tool SHALL use sensible default pagination values (e.g., page 1, pageSize 10) when pagination parameters are not provided

### Requirement 14: Build and Distribution

**User Story:** As a maintainer, I want automated build and packaging, so that releases are consistent and reliable.

#### Acceptance Criteria

1. THE Monorepo SHALL include a GitHub Actions CI workflow that builds and tests all packages on push to main and on pull requests
2. THE Monorepo SHALL compile TypeScript to JavaScript with declaration files for each MCP_Server package
3. WHEN a package version is bumped and tagged, THE CI workflow SHALL publish the package to the npm Registry
4. THE Monorepo SHALL include a Dockerfile for each MCP_Server that builds a minimal container image for deployment
5. THE Monorepo SHALL include a docker-compose.yml at the root that can start all MCP_Servers simultaneously for local development
