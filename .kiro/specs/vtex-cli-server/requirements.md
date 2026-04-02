# Requirements Document

## Introduction

This document defines the requirements for creating a new MCP Server that wraps the VTEX CLI (toolbelt) — the official command-line tool for the VTEX platform used for app development, workspace management, deployment, linking, and publishing. Unlike the other servers in the monorepo that make HTTP calls to REST APIs, this server executes VTEX CLI commands via child processes (child_process) and returns the results as MCP tools. The server follows the same package structure, naming conventions, and configuration patterns as the existing servers in the monorepo.

The toolbelt reference repository is: https://github.com/vtex/toolbelt

## Glossary

- **MCP_Server**: Model Context Protocol server that exposes tools for AI assistants to interact with external systems via JSON-RPC over stdio or HTTP
- **MCP_Tool**: Individual function exposed by an MCP_Server, corresponding to a VTEX CLI command or subcommand
- **VTEX_CLI**: The official VTEX command-line tool (toolbelt), installed via `npm i -g vtex` or `yarn global add vtex`, used for development on the VTEX IO platform
- **Workspace**: Isolated environment on the VTEX platform where developers can test changes without affecting the production store (master)
- **VTEX_App**: Application developed for the VTEX IO platform, identified by vendor, name, and version (e.g., `vtex.store-theme@3.0.0`)
- **Link_Session**: Local development session where code changes are synchronized in real time with a VTEX workspace
- **CLI_Executor**: Module responsible for executing VTEX CLI commands as child processes and capturing stdout, stderr, and exit code
- **Command_Output**: Structured result of a CLI command execution containing stdout, stderr, exit code, and success status
- **Monorepo**: Single Git repository containing multiple packages/servers organized in a shared directory structure

## Requirements

### Requirement 1: Package Structure in the Monorepo

**User Story:** As a developer, I want the VTEX CLI server to follow the same structure as the other servers in the monorepo, so that maintenance and navigation are consistent.

#### Acceptance Criteria

1. THE MCP_Server SHALL be created in the `servers/vtex-cli/` directory following the standard structure: `src/cli.ts`, `src/index.ts`, `src/tools.ts`, `package.json`, `tsconfig.json`, `Dockerfile`, and `README.md`
2. THE MCP_Server SHALL be publishable to the npm Registry under the name `@vtex-mcp/vtex-cli`
3. THE MCP_Server SHALL include a `bin` entry in package.json for execution via `npx @vtex-mcp/vtex-cli`
4. THE MCP_Server SHALL use the `@vtex-mcp/shared` package for server factory, configuration, and error handling
5. THE MCP_Server SHALL extend the monorepo's `tsconfig.base.json` in its TypeScript configuration

### Requirement 2: CLI Command Execution

**User Story:** As a developer, I want the MCP Server to execute VTEX CLI commands securely and in a controlled manner, so that AI assistants can operate the toolbelt programmatically.

#### Acceptance Criteria

1. THE CLI_Executor SHALL execute VTEX CLI commands as child processes using `child_process.execFile` or `child_process.spawn`
2. WHEN the CLI_Executor executes a command, THE CLI_Executor SHALL capture stdout, stderr, and the process exit code
3. THE CLI_Executor SHALL define a default timeout of 120 seconds for CLI command execution
4. IF a CLI command exceeds the configured timeout, THEN THE CLI_Executor SHALL terminate the child process and return an error indicating timeout and the executed command
5. THE CLI_Executor SHALL return a structured Command_Output containing: stdout (string), stderr (string), exitCode (number), and success (boolean)
6. IF the VTEX CLI is not installed on the system, THEN THE MCP_Server SHALL return a descriptive error stating that the `vtex` command was not found and suggesting installation
7. THE CLI_Executor SHALL pass the `--verbose` flag when available to obtain more detailed command output

### Requirement 3: Workspace Management

**User Story:** As a developer, I want to manage VTEX workspaces through the AI assistant, so that I can create, list, switch, and delete workspaces without leaving the editor.

#### Acceptance Criteria

1. WHEN the `vtex_cli_workspace_list` tool is called, THE MCP_Server SHALL execute `vtex workspace list` and return the list of available workspaces
2. WHEN the `vtex_cli_workspace_create` tool is called with the workspaceName parameter, THE MCP_Server SHALL execute `vtex workspace create {workspaceName}` and return the result
3. WHEN the `vtex_cli_workspace_delete` tool is called with the workspaceName parameter, THE MCP_Server SHALL execute `vtex workspace delete {workspaceName}` and return the result
4. WHEN the `vtex_cli_workspace_use` tool is called with the workspaceName parameter, THE MCP_Server SHALL execute `vtex use {workspaceName}` and return the result
5. WHEN the `vtex_cli_workspace_reset` tool is called with the workspaceName parameter, THE MCP_Server SHALL execute `vtex workspace reset {workspaceName}` and return the result
6. WHEN the `vtex_cli_workspace_status` tool is called, THE MCP_Server SHALL execute `vtex workspace status` and return information about the current workspace
7. WHEN the `vtex_cli_workspace_promote` tool is called, THE MCP_Server SHALL execute `vtex workspace promote` to promote the current workspace to master

### Requirement 4: App Development and Linking

**User Story:** As a developer, I want to link, unlink, and manage VTEX apps through the AI assistant, to speed up the development cycle.

#### Acceptance Criteria

1. WHEN the `vtex_cli_link` tool is called, THE MCP_Server SHALL execute `vtex link` in the current working directory and return the initial operation result
2. WHEN the `vtex_cli_unlink` tool is called with the optional appName parameter, THE MCP_Server SHALL execute `vtex unlink {appName}` or `vtex unlink --all` and return the result
3. WHEN the `vtex_cli_list` tool is called, THE MCP_Server SHALL execute `vtex list` and return the list of installed and linked apps in the current workspace
4. WHEN the `vtex_cli_install` tool is called with the appName parameter, THE MCP_Server SHALL execute `vtex install {appName}` and return the result
5. WHEN the `vtex_cli_uninstall` tool is called with the appName parameter, THE MCP_Server SHALL execute `vtex uninstall {appName}` and return the result

### Requirement 5: App Publishing and Deployment

**User Story:** As a developer, I want to publish and deploy VTEX apps through the AI assistant, to automate the release workflow.

#### Acceptance Criteria

1. WHEN the `vtex_cli_publish` tool is called, THE MCP_Server SHALL execute `vtex publish` in the current working directory and return the result
2. WHEN the `vtex_cli_deploy` tool is called, THE MCP_Server SHALL execute `vtex deploy` in the current working directory and return the result
3. WHEN the `vtex_cli_release` tool is called with the releaseType parameter (major, minor, patch), THE MCP_Server SHALL execute `vtex release {releaseType}` and return the result
4. WHEN the `vtex_cli_deprecate` tool is called with the appName parameter, THE MCP_Server SHALL execute `vtex deprecate {appName}` and return the result
5. WHEN the `vtex_cli_undeprecate` tool is called with the appName parameter, THE MCP_Server SHALL execute `vtex undeprecate {appName}` and return the result

### Requirement 6: Account Information and Authentication

**User Story:** As a developer, I want to query VTEX account and session information through the AI assistant, to have visibility into the current working context.

#### Acceptance Criteria

1. WHEN the `vtex_cli_whoami` tool is called, THE MCP_Server SHALL execute `vtex whoami` and return the account, workspace, and email of the logged-in user
2. WHEN the `vtex_cli_switch` tool is called with the accountName parameter, THE MCP_Server SHALL execute `vtex switch {accountName}` and return the result
3. WHEN the `vtex_cli_login` tool is called with the accountName parameter, THE MCP_Server SHALL execute `vtex login {accountName}` and return the result
4. WHEN the `vtex_cli_logout` tool is called, THE MCP_Server SHALL execute `vtex logout` and return the result

### Requirement 7: Dependency and App Configuration Management

**User Story:** As a developer, I want to manage VTEX app dependencies and configurations through the AI assistant, to keep the development environment organized.

#### Acceptance Criteria

1. WHEN the `vtex_cli_deps_list` tool is called, THE MCP_Server SHALL execute `vtex deps list` and return the list of dependencies in the current workspace
2. WHEN the `vtex_cli_deps_update` tool is called with the optional appName parameter, THE MCP_Server SHALL execute `vtex deps update {appName}` and return the result
3. WHEN the `vtex_cli_deps_diff` tool is called, THE MCP_Server SHALL execute `vtex deps diff` and return the dependency differences between workspaces
4. WHEN the `vtex_cli_settings_set` tool is called with the appName, fieldName, and value parameters, THE MCP_Server SHALL execute `vtex settings set {appName} {fieldName} {value}` and return the result
5. WHEN the `vtex_cli_settings_get` tool is called with the appName and fieldName parameters, THE MCP_Server SHALL execute `vtex settings get {appName} {fieldName}` and return the result
6. WHEN the `vtex_cli_infra_list` tool is called, THE MCP_Server SHALL execute `vtex infra list` and return the list of available infrastructure services
7. WHEN the `vtex_cli_infra_install` tool is called with the serviceName parameter, THE MCP_Server SHALL execute `vtex infra install {serviceName}` and return the result

### Requirement 8: Navigation and Debugging

**User Story:** As a developer, I want to access URLs, logs, and debugging information through the AI assistant, to diagnose issues quickly.

#### Acceptance Criteria

1. WHEN the `vtex_cli_browse` tool is called with the optional path parameter, THE MCP_Server SHALL execute `vtex browse {path}` and return the generated URL for the current workspace
2. WHEN the `vtex_cli_logs` tool is called with the optional appName parameter, THE MCP_Server SHALL execute `vtex logs {appName}` with a limited timeout and return the captured log lines
3. WHEN the `vtex_cli_inspect` tool is called with the appName parameter, THE MCP_Server SHALL execute `vtex inspect {appName}` and return detailed app information

### Requirement 9: Redirects and URL Management

**User Story:** As a developer, I want to manage store redirects through the AI assistant, to configure URL redirections programmatically.

#### Acceptance Criteria

1. WHEN the `vtex_cli_redirects_import` tool is called with the csvFilePath parameter, THE MCP_Server SHALL execute `vtex redirects import {csvFilePath}` and return the result
2. WHEN the `vtex_cli_redirects_export` tool is called with the csvFilePath parameter, THE MCP_Server SHALL execute `vtex redirects export {csvFilePath}` and return the result
3. WHEN the `vtex_cli_redirects_delete` tool is called with the csvFilePath parameter, THE MCP_Server SHALL execute `vtex redirects delete {csvFilePath}` and return the result
4. WHEN the `vtex_cli_url` tool is called, THE MCP_Server SHALL execute `vtex url` and return the base URL of the current workspace

### Requirement 10: Error Handling and Resilience

**User Story:** As a developer, I want the server to handle CLI execution errors clearly, so that the AI assistant provides useful feedback about failures.

#### Acceptance Criteria

1. IF a CLI command returns a non-zero exit code, THEN THE MCP_Server SHALL return the stderr content as an error message along with the exit code
2. IF the child process is terminated by a signal (SIGTERM, SIGKILL), THEN THE MCP_Server SHALL return an error indicating that the process was terminated and the signal received
3. IF the CLI command produces output on stderr but returns a zero exit code, THEN THE MCP_Server SHALL include the stderr content as a warning in the response along with stdout
4. THE MCP_Server SHALL sanitize CLI command output by removing ANSI escape sequences and control characters before returning to the MCP client
5. IF a CLI command requires interactive input (stdin), THEN THE MCP_Server SHALL detect the situation and return an error stating that the command requires manual interaction

### Requirement 11: Parameter Validation

**User Story:** As a developer, I want tool parameters to be validated before execution, to prevent running malformed commands.

#### Acceptance Criteria

1. WHEN an MCP tool receives missing required parameters, THE MCP_Server SHALL return an error listing the missing parameters before executing the command
2. WHEN an MCP tool receives parameters with incorrect types, THE MCP_Server SHALL return an error describing the type mismatch
3. THE MCP_Server SHALL validate workspace names against the pattern allowed by VTEX (alphanumeric and hyphens, no spaces or special characters)
4. THE MCP_Server SHALL validate app names against the expected VTEX format (vendor.appname@version)
5. THE MCP_Server SHALL use Zod schemas for defining and validating input parameters for each tool, consistent with the other servers in the monorepo

### Requirement 12: Command Execution Security

**User Story:** As a developer, I want CLI command execution to be secure, to prevent command injection or execution of unauthorized operations.

#### Acceptance Criteria

1. THE CLI_Executor SHALL use `execFile` or `spawn` with an argument array (no shell interpolation) to prevent command injection
2. THE CLI_Executor SHALL exclusively execute the `vtex` binary and reject any attempt to execute other commands
3. THE MCP_Server SHALL sanitize all input parameters by removing dangerous shell characters (`;`, `|`, `&`, `` ` ``, `$()`) before passing them as arguments
4. THE CLI_Executor SHALL limit the maximum size of captured stdout and stderr to 1MB to prevent excessive memory consumption
5. IF an input parameter contains potentially dangerous characters after sanitization, THEN THE MCP_Server SHALL reject the execution and return a descriptive error

### Requirement 13: Configuration and Prerequisites

**User Story:** As a developer, I want the server to validate prerequisites at startup, so that I know immediately if something is missing.

#### Acceptance Criteria

1. WHEN the MCP_Server is started, THE MCP_Server SHALL verify that the `vtex` command is available in the system PATH
2. IF the `vtex` command is not available in the PATH, THEN THE MCP_Server SHALL return an error with VTEX CLI installation instructions (`npm install -g vtex` or `yarn global add vtex`)
3. WHEN the MCP_Server is started, THE MCP_Server SHALL check the installed VTEX CLI version by executing `vtex version`
4. THE MCP_Server SHALL accept an optional `VTEX_CLI_PATH` environment variable to specify the full path to the vtex binary, in case it is not in the default PATH
5. THE MCP_Server SHALL accept an optional `VTEX_CLI_TIMEOUT` environment variable to override the default 120-second timeout
6. THE MCP_Server SHALL accept an optional `VTEX_CLI_CWD` environment variable to set the working directory for CLI commands

### Requirement 14: HTTP and stdio Transport Support

**User Story:** As a developer, I want the server to support the same transports as the other servers in the monorepo, to maintain consistency in the infrastructure.

#### Acceptance Criteria

1. THE MCP_Server SHALL support stdio as the default Transport_Layer, consistent with the other servers in the monorepo
2. WHERE HTTP transport is enabled, THE MCP_Server SHALL accept connections via Server-Sent Events (SSE) on a configurable port
3. THE MCP_Server SHALL accept the `--transport` CLI flag with values `stdio` (default) or `http`
4. WHERE HTTP transport is enabled, THE MCP_Server SHALL accept the `--port` CLI flag to configure the listening port (default: 3000)

### Requirement 15: Server Documentation

**User Story:** As a developer, I want clear documentation for the VTEX CLI server, so that I know how to set up and use all available tools.

#### Acceptance Criteria

1. THE MCP_Server SHALL include a README.md with setup instructions, prerequisites (VTEX CLI installed), environment variables, and a list of available tools
2. THE README.md SHALL include a configuration example for MCP clients (Claude Desktop, Cursor) with the required environment variables
3. THE README.md SHALL document each MCP_Tool with its name, description, parameters, and usage example
4. THE README.md SHALL include a troubleshooting section for common issues (CLI not found, expired session, insufficient permissions)

### Requirement 16: Edition and App Template Operations

**User Story:** As a developer, I want to access edition information and create apps from templates through the AI assistant, to accelerate project bootstrapping.

#### Acceptance Criteria

1. WHEN the `vtex_cli_edition_get` tool is called, THE MCP_Server SHALL execute `vtex edition get` and return the current account edition
2. WHEN the `vtex_cli_edition_set` tool is called with the editionName parameter, THE MCP_Server SHALL execute `vtex edition set {editionName}` and return the result
3. WHEN the `vtex_cli_init` tool is called, THE MCP_Server SHALL execute `vtex init` and return the list of available templates for app creation