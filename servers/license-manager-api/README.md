# VTEX License Manager Api

MCP server for the VTEX License Manager Api, providing AI assistants access to VTEX e-commerce APIs.

## Setup

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VTEX_ACCOUNT_NAME` | Yes | Your VTEX account name |
| `VTEX_APP_KEY` | Yes* | VTEX app key for authentication |
| `VTEX_APP_TOKEN` | Yes* | VTEX app token for authentication |
| `VTEX_AUTH_TOKEN` | No | Alternative auth token (replaces app key/token) |
| `VTEX_ENVIRONMENT` | No | VTEX environment (default: `vtexcommercestable`) |

\* Required unless `VTEX_AUTH_TOKEN` is provided.

### Running via npx

```bash
npx @vtex-mcp/license-manager-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/license-manager-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "license-manager-api": {
      "command": "npx",
      "args": ["@vtex-mcp/license-manager-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

## Available Tools

This server exposes 14 tool(s):

- **license-manager_get_user** — Get user information by user ID
- **license-manager_delete_api_license_manager_users_by_user_id** — Delete user
- **license-manager_create_user** — Create user
- **license-manager_get_list_users** — Get list of users
- **license-manager_put_rolesin_user** — Add roles to user or API Key
- **license-manager_get_rolesby_user** — Get roles by user ID or API Key
- **license-manager_get_rolesby_user** — Get user information by user email
- **license-manager_remove_rolefrom_user** — Remove role from user or API Key
- **license-manager_get_list_roles** — Get list of roles
- **license-manager_createnewappkey** — Create new API Key
- **license-manager_getappkeysfromaccount** — Get API keys from account
- **license-manager_updateappkey** — Update API Key
- **license-manager_get_by_account** — Get stores
- **license-manager_get_account** — Get information about account
