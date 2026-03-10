# VTEX Vtex Id Api

MCP server for the VTEX Vtex Id Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/vtex-id-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/vtex-id-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "vtex-id-api": {
      "command": "npx",
      "args": ["@vtex-mcp/vtex-id-api"],
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

- **vtex-id_post_api_authenticator_storefront_users** — Create storefront user
- **vtex-id_get_api_vtexid_pvt_user_info** — Get storefront user by identifier
- **vtex-id_post_api_vtexid_apptoken_login** — Generate authentication token
- **vtex-id_post_api_vtexid_audience_webstore_provider_oauth_exchange** — Exchange OAuth access token for VTEX credential
- **vtex-id_post_api_vtexid_credential_validate** — Check authenticated user
- **vtex-id_post_api_vtexid_pub_providers_setup_password_webstore_password** — Enable or disable repeated passwords
- **vtex-id_post_api_vtexid_password_expire** — Expire user password
- **vtex-id_patch_api_vtexid_apikey_by_api_key_apitoken_renew** — Initiate token renewal
- **vtex-id_patch_api_vtexid_apikey_by_api_key_apitoken_finish_renewal** — Complete token renewal
- **vtex-id_get_api_vtexid_pvt_user_id** — Get user ID by email
- **vtex-id_get_api_vtexid_pub_authentication_start** — Start authentication
- **vtex-id_post_api_vtexid_pub_authentication_accesskey_send** — Send access key
- **vtex-id_post_api_vtexid_pub_authentication_accesskey_validate** — Validate session
- **vtex-id_post_api_vtexid_refreshtoken_webstore** — Refresh token
