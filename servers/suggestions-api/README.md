# VTEX Suggestions Api

MCP server for the VTEX Suggestions Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/suggestions-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/suggestions-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "suggestions-api": {
      "command": "npx",
      "args": ["@vtex-mcp/suggestions-api"],
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

This server exposes 17 tool(s):

- **suggestions_getauto_approvevaluefromconfig** — Get autoApprove status in account settings
- **suggestions_saveautoapproveforaccount** — Activate autoApprove in marketplace's account
- **suggestions_getaccountconfig** — Get account's approval settings
- **suggestions_saveaccountconfig** — Save account's approval settings
- **suggestions_getmatchconfig** — Get account's matcher settings
- **suggestions_getselleraccountconfig** — Get seller's approval settings
- **suggestions_putselleraccountconfig** — Save seller's approval settings
- **suggestions_saveautoapproveforaccountseller** — Activate autoApprove setting for a seller
- **suggestions_getsuggestions** — Get all SKU suggestions
- **suggestions_save_suggestion** — Send SKU suggestion
- **suggestions_get_suggestion** — Get SKU suggestion by ID
- **suggestions_delete_suggestion** — Delete SKU suggestion
- **suggestions_get_versions** — Get all versions
- **suggestions_get_suggestionbyversion** — Get version by ID
- **suggestions_match** — Match received SKUs individually
- **suggestions_match_multiple** — Match multiple received SKUs
- **suggestions_put_suggestions_configuration_by_seller_id_specifications** — Map seller specifications to marketplace catalog
