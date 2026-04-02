# Design Document: VTEX CLI MCP Server

## Overview

This design describes a new MCP Server (`@vtex-mcp/vtex-cli`) that wraps the VTEX CLI (toolbelt) as MCP tools. Unlike the existing servers in the monorepo that proxy HTTP REST API calls, this server executes VTEX CLI commands as child processes and returns structured results.

The key architectural difference is the introduction of a **CLI_Executor** module that replaces the HTTP client used by other servers. This module handles safe command execution via `child_process.execFile`, output capture, timeout management, ANSI stripping, and security sanitization.

The server follows the same package structure, naming conventions, and shared utilities (`@vtex-mcp/shared`) as all other servers in the monorepo, ensuring consistency for developers navigating the codebase.

## Architecture

```mermaid
graph TD
    A[MCP Client] -->|JSON-RPC stdio/SSE| B[MCP Server<br/>@vtex-mcp/vtex-cli]
    B --> C[Tool Definitions<br/>tools.ts]
    C --> D[CLI_Executor<br/>cli-executor.ts]
    D -->|execFile with args array| E[VTEX CLI Binary<br/>vtex]
    E --> F[VTEX Platform]
    
    B --> G[@vtex-mcp/shared]
    G --> G1[server-factory]
    G --> G2[validation]
    G --> G3[errors]

    D --> H[Command_Output]
    H -->|stdout, stderr,<br/>exitCode, success| C
    C -->|ToolResult| B
```

### Key Design Decisions

1. **`execFile` over `exec`**: We use `execFile` with an argument array instead of `exec` with a shell string. This prevents shell injection by avoiding shell interpolation entirely. Arguments are passed as an array, never concatenated into a command string.

2. **Dedicated CLI_Executor module**: Rather than embedding child_process logic in each tool handler, a single `cli-executor.ts` module centralizes execution, timeout handling, output sanitization, and error formatting. This keeps tool definitions clean and testable.

3. **No HTTP client dependency**: Unlike other servers, this server does not use `createHttpClient` or `loadConfig` from shared. It only uses `createMcpServer`, `validateParams`, and `formatMcpError`. The VTEX CLI handles its own authentication and API communication.

4. **Startup validation**: The server validates that the `vtex` binary is available at startup (via `which` or direct path check) rather than failing on first tool call. This provides immediate feedback.

5. **Output size limits**: stdout and stderr are capped at 1MB to prevent memory exhaustion from unexpectedly verbose commands.

## Components and Interfaces

### Package Structure

```
servers/vtex-cli/
├── src/
│   ├── cli.ts              # CLI entry point (stdio/http transport)
│   ├── index.ts             # Server instance export
│   ├── tools.ts             # MCP tool definitions (all VTEX CLI tools)
│   └── cli-executor.ts      # CLI_Executor module (child_process wrapper)
├── __tests__/
│   ├── cli-executor.test.ts          # Unit tests for CLI_Executor
│   ├── cli-executor.property.test.ts # Property-based tests
│   ├── tools.test.ts                 # Unit tests for tool definitions
│   └── sanitize.test.ts              # Sanitization tests
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

### CLI_Executor Module (`cli-executor.ts`)

This is the core new component. It wraps `child_process.execFile` with safety, timeout, and output processing.

```typescript
interface CommandOutput {
  stdout: string;
  stderr: string;
  exitCode: number;
  success: boolean;
}

interface ExecutorOptions {
  cliPath?: string;       // Path to vtex binary (default: "vtex")
  timeout?: number;        // Timeout in ms (default: 120000)
  cwd?: string;           // Working directory for commands
  maxOutputSize?: number;  // Max bytes for stdout/stderr (default: 1MB)
}

// Core function
function executeCommand(
  subcommand: string,
  args: string[],
  options?: Partial<ExecutorOptions>
): Promise<CommandOutput>;

// Startup check
function validateCliAvailable(cliPath?: string): Promise<string>;

// Output sanitization
function stripAnsi(text: string): string;
function sanitizeArg(arg: string): string;
function containsDangerousChars(arg: string): boolean;
```

### Tool Definitions (`tools.ts`)

Each tool follows this pattern:

```typescript
function tools(executor: CliExecutor): ToolDefinition[]
```

Instead of receiving an `AxiosInstance` like other servers, tools receive a `CliExecutor` instance. Each tool:
1. Defines a Zod input schema for parameter validation
2. Maps parameters to CLI arguments
3. Calls `executor.executeCommand()` 
4. Returns the structured output as MCP `ToolResult`

### Entry Points

**`cli.ts`** — Follows the same pattern as other servers:
- Parses `--transport` (stdio|http) and `--port` flags
- Reads `VTEX_CLI_PATH`, `VTEX_CLI_TIMEOUT`, `VTEX_CLI_CWD` environment variables
- Validates CLI availability at startup
- Creates the MCP server via `createMcpServer` from shared

**`index.ts`** — Exports the server instance for programmatic use.

### Tool Inventory

The server exposes the following MCP tools organized by domain:

| Domain | Tools |
|--------|-------|
| Workspace | `vtex_cli_workspace_list`, `vtex_cli_workspace_create`, `vtex_cli_workspace_delete`, `vtex_cli_workspace_use`, `vtex_cli_workspace_reset`, `vtex_cli_workspace_status`, `vtex_cli_workspace_promote` |
| App Dev | `vtex_cli_link`, `vtex_cli_unlink`, `vtex_cli_list`, `vtex_cli_install`, `vtex_cli_uninstall` |
| Publishing | `vtex_cli_publish`, `vtex_cli_deploy`, `vtex_cli_release`, `vtex_cli_deprecate`, `vtex_cli_undeprecate` |
| Account | `vtex_cli_whoami`, `vtex_cli_switch`, `vtex_cli_login`, `vtex_cli_logout` |
| Dependencies | `vtex_cli_deps_list`, `vtex_cli_deps_update`, `vtex_cli_deps_diff`, `vtex_cli_settings_set`, `vtex_cli_settings_get`, `vtex_cli_infra_list`, `vtex_cli_infra_install` |
| Navigation | `vtex_cli_browse`, `vtex_cli_logs`, `vtex_cli_inspect` |
| Redirects | `vtex_cli_redirects_import`, `vtex_cli_redirects_export`, `vtex_cli_redirects_delete`, `vtex_cli_url` |
| Edition | `vtex_cli_edition_get`, `vtex_cli_edition_set`, `vtex_cli_init` |


## Data Models

### CommandOutput

The structured result returned by every CLI execution:

```typescript
interface CommandOutput {
  stdout: string;   // Captured stdout, ANSI-stripped, truncated to maxOutputSize
  stderr: string;   // Captured stderr, ANSI-stripped, truncated to maxOutputSize
  exitCode: number; // Process exit code (0 = success)
  success: boolean; // true if exitCode === 0
}
```

### ExecutorOptions

Configuration for the CLI_Executor, populated from environment variables:

```typescript
interface ExecutorOptions {
  cliPath: string;        // VTEX_CLI_PATH or "vtex"
  timeout: number;         // VTEX_CLI_TIMEOUT or 120000 (ms)
  cwd: string;            // VTEX_CLI_CWD or process.cwd()
  maxOutputSize: number;   // 1MB (1_048_576 bytes)
}
```

### Zod Schemas for Tool Parameters

Each tool defines a Zod schema. Examples of key validation patterns:

```typescript
// Workspace name: alphanumeric and hyphens only
const workspaceNameSchema = z.string()
  .regex(/^[a-zA-Z0-9-]+$/, "Workspace name must contain only alphanumeric characters and hyphens");

// App name: vendor.appname or vendor.appname@version
const appNameSchema = z.string()
  .regex(/^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(@\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?)?$/,
    "App name must follow VTEX format: vendor.appname or vendor.appname@version");

// Release type
const releaseTypeSchema = z.enum(["major", "minor", "patch"]);

// File path for redirects (CSV)
const csvFilePathSchema = z.string().min(1, "CSV file path is required");
```

### Dangerous Characters Set

Characters that are sanitized from input parameters before CLI execution:

```typescript
const DANGEROUS_CHARS = /[;|&`$(){}[\]<>!#~]/g;
```

### MCP ToolResult

Reuses the existing `ToolResult` interface from `@vtex-mcp/shared`:

```typescript
interface ToolResult {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
}
```

Tool handlers convert `CommandOutput` to `ToolResult`:
- On success: `{ content: [{ type: 'text', text: stdout }] }`
- On failure: `{ content: [{ type: 'text', text: errorMessage }], isError: true }`
- On stderr with success: `{ content: [{ type: 'text', text: stdout + '\n\nWarnings:\n' + stderr }] }`


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Command output structure invariant

*For any* CLI command execution (whether it succeeds or fails), the returned `CommandOutput` SHALL always contain all four fields: `stdout` (string), `stderr` (string), `exitCode` (number), and `success` (boolean), where `success === (exitCode === 0)`.

**Validates: Requirements 2.2, 2.5**

### Property 2: Tool-to-command mapping correctness

*For any* tool definition in the tool inventory and any valid set of input parameters, invoking the tool handler SHALL construct and execute the correct VTEX CLI subcommand with the correct argument array. The subcommand and arguments must match the mapping defined in the tool's specification (e.g., `vtex_cli_workspace_create` with `workspaceName="dev"` must execute `["workspace", "create", "dev"]`).

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 8.1, 8.2, 8.3, 9.1, 9.2, 9.3, 9.4, 16.1, 16.2, 16.3**

### Property 3: ANSI stripping idempotence

*For any* string, applying the `stripAnsi` function once should produce a string that contains no ANSI escape sequences, and applying it again should produce the identical string (idempotent). Formally: `stripAnsi(stripAnsi(s)) === stripAnsi(s)` and `stripAnsi(s)` contains no sequences matching the ANSI escape pattern.

**Validates: Requirements 10.4**

### Property 4: Output-to-result mapping

*For any* `CommandOutput`, the conversion to MCP `ToolResult` SHALL follow these rules: if `exitCode !== 0`, the result has `isError: true` and the text includes stderr and exit code; if `exitCode === 0` and stderr is non-empty, the result includes both stdout and stderr (as warning); if `exitCode === 0` and stderr is empty, the result contains only stdout.

**Validates: Requirements 10.1, 10.3**

### Property 5: Dangerous character sanitization

*For any* input string, after applying `sanitizeArg`, the resulting string SHALL contain none of the dangerous shell characters (`;`, `|`, `&`, `` ` ``, `$()`, `{}`, `[]`, `<>`, `!`, `#`, `~`). Formally: `DANGEROUS_CHARS.test(sanitizeArg(s)) === false` for all strings `s`.

**Validates: Requirements 12.3**

### Property 6: Binary restriction

*For any* command string or path passed to the executor, the CLI_Executor SHALL only execute the configured `vtex` binary. Any attempt to execute a different binary SHALL be rejected with an error.

**Validates: Requirements 12.2**

### Property 7: Workspace name validation

*For any* string, the workspace name Zod schema SHALL accept it if and only if it matches `^[a-zA-Z0-9-]+$`. Strings containing spaces, special characters, or empty strings SHALL be rejected.

**Validates: Requirements 11.3**

### Property 8: App name format validation

*For any* string, the app name Zod schema SHALL accept it if and only if it matches the VTEX format `vendor.appname` or `vendor.appname@major.minor.patch`. Strings not matching this pattern SHALL be rejected.

**Validates: Requirements 11.4**

### Property 9: Parameter validation rejects invalid input

*For any* tool Zod schema and any input object missing required fields or containing fields with incorrect types, the validation SHALL fail and return descriptive error messages listing the specific issues.

**Validates: Requirements 11.1, 11.2**

## Error Handling

### CLI Execution Errors

| Scenario | Behavior |
|----------|----------|
| Non-zero exit code | Return `ToolResult` with `isError: true`, include stderr and exit code in message |
| Process killed by signal (SIGTERM, SIGKILL) | Return error indicating signal name and that the process was terminated |
| Timeout exceeded | Kill child process, return error with timeout duration and command that was running |
| CLI binary not found | Return error with installation instructions (`npm install -g vtex` or `yarn global add vtex`) |
| Interactive command detected | Return error stating the command requires manual interaction |
| Output exceeds 1MB | Truncate output and append `[output truncated at 1MB]` |
| stderr with zero exit code | Include stderr as warning alongside stdout |

### Input Validation Errors

| Scenario | Behavior |
|----------|----------|
| Missing required parameters | Zod validation returns error listing missing fields (handled by shared `validateParams`) |
| Type mismatch | Zod validation returns error describing expected vs received type |
| Invalid workspace name | Zod regex validation rejects with descriptive message |
| Invalid app name format | Zod regex validation rejects with descriptive message |
| Dangerous characters in input | `sanitizeArg` removes them; if the sanitized result is empty or fundamentally changed, reject with error |

### Credential Safety

The server inherits the `sanitizeCredentials` function from `@vtex-mcp/shared` errors module, which redacts `VTEX_APP_KEY`, `VTEX_APP_TOKEN`, and `VTEX_AUTH_TOKEN` values from any error messages. Additionally, the CLI_Executor must ensure these values are not leaked through stdout/stderr of child processes.

## Testing Strategy

### Testing Framework

- **Unit tests**: Vitest (consistent with the monorepo)
- **Property-based tests**: fast-check (already a devDependency in the monorepo)
- **Minimum iterations**: 100 per property test

### Unit Tests

Unit tests cover specific examples, edge cases, and integration points:

1. **CLI_Executor unit tests** (`cli-executor.test.ts`):
   - Executes a simple command and verifies output structure
   - Handles timeout by killing the process
   - Returns error when binary is not found
   - Handles signal termination (SIGTERM, SIGKILL)
   - Truncates output exceeding 1MB
   - Strips ANSI codes from output
   - Rejects non-vtex binaries

2. **Tool definition tests** (`tools.test.ts`):
   - Each tool constructs the correct CLI command (spot-check examples)
   - Optional parameters are handled correctly (omitted vs provided)
   - Zod schemas reject invalid input with correct messages

3. **Sanitization tests** (`sanitize.test.ts`):
   - Specific dangerous character examples
   - Empty string after sanitization
   - Unicode and multi-byte character handling

### Property-Based Tests

Each property test references its design document property and runs a minimum of 100 iterations.

1. **Feature: vtex-cli-server, Property 1: Command output structure invariant**
   - Generate random exit codes, stdout, and stderr strings
   - Verify CommandOutput always has all four fields with correct types
   - Verify `success === (exitCode === 0)`

2. **Feature: vtex-cli-server, Property 2: Tool-to-command mapping correctness**
   - For each tool definition, generate valid random parameters
   - Mock the executor to capture the subcommand and args
   - Verify the captured command matches the expected mapping

3. **Feature: vtex-cli-server, Property 3: ANSI stripping idempotence**
   - Generate random strings with embedded ANSI escape sequences
   - Verify `stripAnsi(stripAnsi(s)) === stripAnsi(s)`
   - Verify result contains no ANSI escape patterns

4. **Feature: vtex-cli-server, Property 4: Output-to-result mapping**
   - Generate random CommandOutput values (varying exitCode, stdout, stderr)
   - Verify the ToolResult follows the mapping rules (isError, content)

5. **Feature: vtex-cli-server, Property 5: Dangerous character sanitization**
   - Generate random strings containing dangerous characters
   - Verify `sanitizeArg` output contains none of them

6. **Feature: vtex-cli-server, Property 6: Binary restriction**
   - Generate random binary names (not "vtex")
   - Verify the executor rejects them

7. **Feature: vtex-cli-server, Property 7: Workspace name validation**
   - Generate random strings (alphanumeric+hyphens and non-matching)
   - Verify the Zod schema accepts/rejects correctly

8. **Feature: vtex-cli-server, Property 8: App name format validation**
   - Generate random strings in valid and invalid VTEX app name formats
   - Verify the Zod schema accepts/rejects correctly

9. **Feature: vtex-cli-server, Property 9: Parameter validation rejects invalid input**
   - For each tool schema, generate inputs with missing required fields and wrong types
   - Verify validation fails with descriptive error messages
