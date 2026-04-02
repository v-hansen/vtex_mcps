# Implementation Plan: VTEX CLI MCP Server

## Overview

Incrementally build the `@vtex-mcp/vtex-cli` MCP server that wraps the VTEX CLI (toolbelt) as MCP tools. The implementation starts with the CLI_Executor core module, then adds tool definitions by domain, wires everything together with entry points, and finishes with documentation. Each step builds on the previous one, ensuring no orphaned code.

## Tasks

- [x] 1. Set up package structure and configuration files
  - Create `servers/vtex-cli/` directory with `package.json`, `tsconfig.json`, and `Dockerfile`
  - `package.json`: name `@vtex-mcp/vtex-cli`, bin entry `vtex-mcp-vtex-cli`, dependencies on `@vtex-mcp/shared` and `zod`, devDependencies on `vitest`, `fast-check`, `typescript`, `@types/node`, `@modelcontextprotocol/sdk`
  - `tsconfig.json`: extend `../../tsconfig.base.json`, outDir `dist`, rootDir `src`
  - `Dockerfile`: follow the same pattern as other servers (e.g., `servers/catalog-api/Dockerfile`)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Implement CLI_Executor module
  - [x] 2.1 Create `src/cli-executor.ts` with core interfaces and functions
    - Define `CommandOutput` interface (`stdout`, `stderr`, `exitCode`, `success`)
    - Define `ExecutorOptions` interface (`cliPath`, `timeout`, `cwd`, `maxOutputSize`)
    - Implement `sanitizeArg(arg: string): string` that removes dangerous shell characters (`;|&\`$(){}[]<>!#~`)
    - Implement `containsDangerousChars(arg: string): boolean`
    - Implement `stripAnsi(text: string): string` to remove ANSI escape sequences
    - Implement `executeCommand(subcommand: string, args: string[], options?: Partial<ExecutorOptions>): Promise<CommandOutput>` using `child_process.execFile` with argument array (no shell)
    - Enforce binary restriction: only allow the configured `vtex` binary
    - Handle timeout (default 120s), signal termination, output truncation at 1MB
    - Pass `--verbose` flag when available
    - Implement `validateCliAvailable(cliPath?: string): Promise<string>` to check vtex binary at startup
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 10.2, 10.4, 10.5, 12.1, 12.2, 12.3, 12.4, 12.5, 13.1, 13.2, 13.3, 13.4_

  - [x] 2.2 Write property test: Command output structure invariant
    - **Property 1: Command output structure invariant**
    - Generate random exit codes, stdout, and stderr strings
    - Verify CommandOutput always has all four fields with correct types
    - Verify `success === (exitCode === 0)`
    - **Validates: Requirements 2.2, 2.5**

  - [x] 2.3 Write property test: ANSI stripping idempotence
    - **Property 3: ANSI stripping idempotence**
    - Generate random strings with embedded ANSI escape sequences
    - Verify `stripAnsi(stripAnsi(s)) === stripAnsi(s)`
    - Verify result contains no ANSI escape patterns
    - **Validates: Requirements 10.4**

  - [x] 2.4 Write property test: Dangerous character sanitization
    - **Property 5: Dangerous character sanitization**
    - Generate random strings containing dangerous characters
    - Verify `sanitizeArg` output contains none of them
    - **Validates: Requirements 12.3**

  - [x] 2.5 Write property test: Binary restriction
    - **Property 6: Binary restriction**
    - Generate random binary names (not "vtex")
    - Verify the executor rejects them with an error
    - **Validates: Requirements 12.2**

  - [x] 2.6 Write unit tests for CLI_Executor
    - Test successful command execution returns correct CommandOutput structure
    - Test timeout kills the process and returns timeout error
    - Test binary-not-found returns descriptive error with installation instructions
    - Test signal termination (SIGTERM, SIGKILL) returns signal error
    - Test output truncation at 1MB
    - Test ANSI stripping on output
    - Test rejection of non-vtex binaries
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 10.2, 12.2_

- [x] 3. Implement Zod validation schemas and tool result helpers
  - [x] 3.1 Create shared Zod schemas and helper functions in `src/tools.ts`
    - Define `workspaceNameSchema` (alphanumeric and hyphens: `/^[a-zA-Z0-9-]+$/`)
    - Define `appNameSchema` (VTEX format: `vendor.appname` or `vendor.appname@version`)
    - Define `releaseTypeSchema` (`z.enum(["major", "minor", "patch"])`)
    - Define `csvFilePathSchema` (`z.string().min(1)`)
    - Implement `commandOutputToToolResult(output: CommandOutput): ToolResult` helper that maps exit codes and stderr to the correct ToolResult shape
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 10.1, 10.3_

  - [x] 3.2 Write property test: Workspace name validation
    - **Property 7: Workspace name validation**
    - Generate random strings (alphanumeric+hyphens and non-matching)
    - Verify the Zod schema accepts/rejects correctly
    - **Validates: Requirements 11.3**

  - [x] 3.3 Write property test: App name format validation
    - **Property 8: App name format validation**
    - Generate random strings in valid and invalid VTEX app name formats
    - Verify the Zod schema accepts/rejects correctly
    - **Validates: Requirements 11.4**

  - [x] 3.4 Write property test: Output-to-result mapping
    - **Property 4: Output-to-result mapping**
    - Generate random CommandOutput values (varying exitCode, stdout, stderr)
    - Verify the ToolResult follows the mapping rules (isError, content)
    - **Validates: Requirements 10.1, 10.3**

  - [x] 3.5 Write property test: Parameter validation rejects invalid input
    - **Property 9: Parameter validation rejects invalid input**
    - For each tool schema, generate inputs with missing required fields and wrong types
    - Verify validation fails with descriptive error messages
    - **Validates: Requirements 11.1, 11.2**

- [x] 4. Checkpoint - Ensure core modules compile and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement MCP tool definitions by domain
  - [x] 5.1 Implement Workspace tools
    - Define `vtex_cli_workspace_list`, `vtex_cli_workspace_create`, `vtex_cli_workspace_delete`, `vtex_cli_workspace_use`, `vtex_cli_workspace_reset`, `vtex_cli_workspace_status`, `vtex_cli_workspace_promote`
    - Each tool: Zod input schema, handler that calls `executeCommand` with correct subcommand and args, returns `commandOutputToToolResult`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 5.2 Implement App Development tools
    - Define `vtex_cli_link`, `vtex_cli_unlink`, `vtex_cli_list`, `vtex_cli_install`, `vtex_cli_uninstall`
    - Handle optional parameters (e.g., `unlink --all` vs `unlink {appName}`)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 5.3 Implement Publishing and Deployment tools
    - Define `vtex_cli_publish`, `vtex_cli_deploy`, `vtex_cli_release`, `vtex_cli_deprecate`, `vtex_cli_undeprecate`
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 5.4 Implement Account and Authentication tools
    - Define `vtex_cli_whoami`, `vtex_cli_switch`, `vtex_cli_login`, `vtex_cli_logout`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 5.5 Implement Dependency and Configuration tools
    - Define `vtex_cli_deps_list`, `vtex_cli_deps_update`, `vtex_cli_deps_diff`, `vtex_cli_settings_set`, `vtex_cli_settings_get`, `vtex_cli_infra_list`, `vtex_cli_infra_install`
    - Handle optional parameters (e.g., `deps update` with or without appName)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [x] 5.6 Implement Navigation and Debugging tools
    - Define `vtex_cli_browse`, `vtex_cli_logs`, `vtex_cli_inspect`
    - `vtex_cli_logs` should use a shorter timeout to capture limited log output
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 5.7 Implement Redirects and URL tools
    - Define `vtex_cli_redirects_import`, `vtex_cli_redirects_export`, `vtex_cli_redirects_delete`, `vtex_cli_url`
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 5.8 Implement Edition and Template tools
    - Define `vtex_cli_edition_get`, `vtex_cli_edition_set`, `vtex_cli_init`
    - _Requirements: 16.1, 16.2, 16.3_

  - [x] 5.9 Write property test: Tool-to-command mapping correctness
    - **Property 2: Tool-to-command mapping correctness**
    - For each tool definition, generate valid random parameters
    - Mock the executor to capture the subcommand and args
    - Verify the captured command matches the expected mapping
    - **Validates: Requirements 3.1–3.7, 4.1–4.5, 5.1–5.5, 6.1–6.4, 7.1–7.7, 8.1–8.3, 9.1–9.4, 16.1–16.3**

  - [x] 5.10 Write unit tests for tool definitions
    - Spot-check each domain: verify correct CLI command construction for representative tools
    - Test optional parameter handling (omitted vs provided)
    - Test Zod schema rejection with correct error messages for invalid inputs
    - _Requirements: 3.1–3.7, 4.1–4.5, 5.1–5.5, 6.1–6.4, 7.1–7.7, 8.1–8.3, 9.1–9.4, 16.1–16.3_

- [x] 6. Checkpoint - Ensure all tool definitions compile and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Wire entry points and server configuration
  - [x] 7.1 Create `src/cli.ts` entry point
    - Parse `--transport` (stdio|http) and `--port` CLI flags using `node:util` `parseArgs`
    - Read `VTEX_CLI_PATH`, `VTEX_CLI_TIMEOUT`, `VTEX_CLI_CWD` environment variables
    - Call `validateCliAvailable()` at startup; exit with installation instructions if not found
    - Check VTEX CLI version via `vtex version`
    - Create CLI_Executor instance with resolved options
    - Create MCP server via `createMcpServer` from `@vtex-mcp/shared` with `tools(executor)`
    - Start stdio or HTTP transport based on flag
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 14.1, 14.2, 14.3, 14.4_

  - [x] 7.2 Create `src/index.ts` programmatic export
    - Export the server instance for programmatic use, following the same pattern as other servers
    - _Requirements: 1.1, 1.4_

- [x] 8. Create README.md documentation
  - [x] 8.1 Write `servers/vtex-cli/README.md`
    - Setup instructions and prerequisites (VTEX CLI installed)
    - Environment variables (`VTEX_CLI_PATH`, `VTEX_CLI_TIMEOUT`, `VTEX_CLI_CWD`)
    - MCP client configuration examples (Claude Desktop, Cursor)
    - Complete list of available tools with name, description, parameters, and usage examples
    - Troubleshooting section (CLI not found, expired session, insufficient permissions)
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [x] 9. Final checkpoint - Ensure all tests pass and project builds
  - Ensure all tests pass, ask the user if questions arise.
  - Run `tsc` to verify the project compiles without errors.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The CLI_Executor is the core differentiator from other servers — it replaces the HTTP client pattern
- All tool definitions follow the same `ToolDefinition` interface from `@vtex-mcp/shared`
