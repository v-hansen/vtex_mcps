# VTEX CLI

MCP server that wraps the VTEX CLI (toolbelt), providing AI assistants access to VTEX IO development workflows — workspace management, app linking, publishing, deployment, and more.

## Prerequisites

- **Node.js** 20 or later
- **VTEX CLI** installed globally:
  ```bash
  npm install -g vtex
  # or
  yarn global add vtex
  ```
- **Logged in** to your VTEX account:
  ```bash
  vtex login your-account
  ```

## Setup

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VTEX_CLI_PATH` | No | Full path to the `vtex` binary (default: `"vtex"` from PATH) |
| `VTEX_CLI_TIMEOUT` | No | Command timeout in milliseconds (default: `120000`) |
| `VTEX_CLI_CWD` | No | Working directory for CLI commands (default: `process.cwd()`) |

### Running via npx

```bash
npx @vtex-mcp/vtex-cli
```

### Running with HTTP transport

```bash
npx @vtex-mcp/vtex-cli --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "vtex-cli": {
      "command": "npx",
      "args": ["@vtex-mcp/vtex-cli"],
      "env": {
        "VTEX_CLI_PATH": "/usr/local/bin/vtex",
        "VTEX_CLI_TIMEOUT": "120000",
        "VTEX_CLI_CWD": "/path/to/your/vtex-app"
      }
    }
  }
}
```

### MCP Client Configuration (Cursor)

```json
{
  "mcpServers": {
    "vtex-cli": {
      "command": "npx",
      "args": ["@vtex-mcp/vtex-cli"],
      "env": {
        "VTEX_CLI_PATH": "/usr/local/bin/vtex",
        "VTEX_CLI_TIMEOUT": "120000",
        "VTEX_CLI_CWD": "/path/to/your/vtex-app"
      }
    }
  }
}
```

> Environment variables are optional. If `VTEX_CLI_PATH` is omitted, the server resolves `vtex` from your system PATH.

## Available Tools

This server exposes 38 tool(s):

### Workspace

- **vtex_cli_workspace_list** — List all available workspaces in the current VTEX account.
  - Parameters: none
  - Example: `vtex workspace list`

- **vtex_cli_workspace_create** — Create a new workspace in the current VTEX account.
  - Parameters: `workspaceName` (string, required) — alphanumeric and hyphens only
  - Example: `vtex workspace create my-dev`

- **vtex_cli_workspace_delete** — Delete an existing workspace from the current VTEX account.
  - Parameters: `workspaceName` (string, required) — alphanumeric and hyphens only
  - Example: `vtex workspace delete my-dev`

- **vtex_cli_workspace_use** — Switch to a different workspace.
  - Parameters: `workspaceName` (string, required) — alphanumeric and hyphens only
  - Example: `vtex use my-dev`

- **vtex_cli_workspace_reset** — Reset a workspace to a clean state.
  - Parameters: `workspaceName` (string, required) — alphanumeric and hyphens only
  - Example: `vtex workspace reset my-dev`

- **vtex_cli_workspace_status** — Show information about the current workspace.
  - Parameters: none
  - Example: `vtex workspace status`

- **vtex_cli_workspace_promote** — Promote the current workspace to master.
  - Parameters: none
  - Example: `vtex workspace promote`

### App Development

- **vtex_cli_link** — Link the current app in the working directory for local development.
  - Parameters: none
  - Example: `vtex link`

- **vtex_cli_unlink** — Unlink a specific app or all linked apps from the current workspace.
  - Parameters: `appName` (string, optional) — vendor.appname or vendor.appname@version. If omitted, all apps are unlinked.
  - Example: `vtex unlink vendor.my-app@1.0.0` or `vtex unlink --all`

- **vtex_cli_list** — List installed and linked apps in the current workspace.
  - Parameters: none
  - Example: `vtex list`

- **vtex_cli_install** — Install an app in the current workspace.
  - Parameters: `appName` (string, required) — vendor.appname or vendor.appname@version
  - Example: `vtex install vtex.store-theme@3.0.0`

- **vtex_cli_uninstall** — Uninstall an app from the current workspace.
  - Parameters: `appName` (string, required) — vendor.appname or vendor.appname@version
  - Example: `vtex uninstall vtex.store-theme@3.0.0`

### Publishing

- **vtex_cli_publish** — Publish the current app in the working directory.
  - Parameters: none
  - Example: `vtex publish`

- **vtex_cli_deploy** — Deploy the current app in the working directory.
  - Parameters: none
  - Example: `vtex deploy`

- **vtex_cli_release** — Release a new version of the current app.
  - Parameters: `releaseType` (string, required) — `major`, `minor`, or `patch`
  - Example: `vtex release patch`

- **vtex_cli_deprecate** — Deprecate a VTEX app.
  - Parameters: `appName` (string, required) — vendor.appname or vendor.appname@version
  - Example: `vtex deprecate vendor.my-app@1.0.0`

- **vtex_cli_undeprecate** — Remove deprecation from a VTEX app.
  - Parameters: `appName` (string, required) — vendor.appname or vendor.appname@version
  - Example: `vtex undeprecate vendor.my-app@1.0.0`

### Account

- **vtex_cli_whoami** — Show the current logged-in account, workspace, and email.
  - Parameters: none
  - Example: `vtex whoami`

- **vtex_cli_switch** — Switch to a different VTEX account.
  - Parameters: `accountName` (string, required) — name of the VTEX account
  - Example: `vtex switch my-store`

- **vtex_cli_login** — Log in to a VTEX account.
  - Parameters: `accountName` (string, required) — name of the VTEX account
  - Example: `vtex login my-store`

- **vtex_cli_logout** — Log out from the current VTEX account.
  - Parameters: none
  - Example: `vtex logout`

### Dependencies

- **vtex_cli_deps_list** — List dependencies in the current workspace.
  - Parameters: none
  - Example: `vtex deps list`

- **vtex_cli_deps_update** — Update dependencies in the current workspace, optionally for a specific app.
  - Parameters: `appName` (string, optional) — vendor.appname or vendor.appname@version
  - Example: `vtex deps update` or `vtex deps update vendor.my-app`

- **vtex_cli_deps_diff** — Show dependency differences between workspaces.
  - Parameters: none
  - Example: `vtex deps diff`

- **vtex_cli_settings_set** — Set a configuration value for a VTEX app.
  - Parameters: `appName` (string, required), `fieldName` (string, required), `value` (string, required)
  - Example: `vtex settings set vtex.store-theme primaryColor "#ff0000"`

- **vtex_cli_settings_get** — Get a configuration value for a VTEX app.
  - Parameters: `appName` (string, required), `fieldName` (string, required)
  - Example: `vtex settings get vtex.store-theme primaryColor`

- **vtex_cli_infra_list** — List available infrastructure services.
  - Parameters: none
  - Example: `vtex infra list`

- **vtex_cli_infra_install** — Install an infrastructure service.
  - Parameters: `serviceName` (string, required) — name of the infrastructure service
  - Example: `vtex infra install router`

### Navigation

- **vtex_cli_browse** — Open or return the URL for the current workspace, optionally at a specific path.
  - Parameters: `path` (string, optional) — path to append to the workspace URL
  - Example: `vtex browse /admin` or `vtex browse`

- **vtex_cli_logs** — Capture recent log output for the current workspace or a specific app (30s timeout).
  - Parameters: `appName` (string, optional) — vendor.appname or vendor.appname@version
  - Example: `vtex logs vendor.my-app`

- **vtex_cli_inspect** — Show detailed information about a VTEX app.
  - Parameters: `appName` (string, required) — vendor.appname or vendor.appname@version
  - Example: `vtex inspect vendor.my-app@1.0.0`

### Redirects

- **vtex_cli_redirects_import** — Import redirects from a CSV file.
  - Parameters: `csvFilePath` (string, required) — path to the CSV file
  - Example: `vtex redirects import ./redirects.csv`

- **vtex_cli_redirects_export** — Export redirects to a CSV file.
  - Parameters: `csvFilePath` (string, required) — path to the CSV file
  - Example: `vtex redirects export ./redirects.csv`

- **vtex_cli_redirects_delete** — Delete redirects specified in a CSV file.
  - Parameters: `csvFilePath` (string, required) — path to the CSV file
  - Example: `vtex redirects delete ./redirects.csv`

- **vtex_cli_url** — Return the base URL of the current workspace.
  - Parameters: none
  - Example: `vtex url`

### Edition

- **vtex_cli_edition_get** — Get the current account edition.
  - Parameters: none
  - Example: `vtex edition get`

- **vtex_cli_edition_set** — Set the account edition.
  - Parameters: `editionName` (string, required) — name of the edition
  - Example: `vtex edition set vtex.edition-store@5.x`

- **vtex_cli_init** — List available templates for app creation.
  - Parameters: none
  - Example: `vtex init`

## Troubleshooting

### CLI not found

If you see an error like `vtex command not found`, install the VTEX CLI globally:

```bash
npm install -g vtex
# or
yarn global add vtex
```

If the binary is installed in a non-standard location, set the `VTEX_CLI_PATH` environment variable to the full path:

```bash
VTEX_CLI_PATH=/custom/path/vtex npx @vtex-mcp/vtex-cli
```

### Expired session

If commands fail with authentication errors, your VTEX session may have expired. Log in again:

```bash
vtex login your-account
```

### Insufficient permissions

If you receive permission errors, verify that:

1. You are logged in to the correct VTEX account (`vtex whoami`)
2. Your user has the required roles/permissions for the operation
3. You are in the correct workspace (`vtex workspace status`)

### Timeout errors

Some commands (e.g., `vtex link`, `vtex publish`) may take longer than the default 120-second timeout. Increase it via the `VTEX_CLI_TIMEOUT` environment variable:

```bash
VTEX_CLI_TIMEOUT=300000 npx @vtex-mcp/vtex-cli
```

### Interactive commands

Some VTEX CLI commands require interactive input (e.g., prompts for confirmation). The MCP server cannot handle interactive stdin. If you encounter this, run the command directly in your terminal instead.
