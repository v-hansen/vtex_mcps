# VTEX Headless Cms Api

MCP server for the VTEX Headless Cms Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/headless-cms-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/headless-cms-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "headless-cms-api": {
      "command": "npx",
      "args": ["@vtex-mcp/headless-cms-api"],
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

This server exposes 3 tool(s):

- **headless-cms_get_all_content_types** — Get all content types
- **headless-cms_get_pagesby_content_type** — Get all CMS pages by content type
- **headless-cms_get_cm_spage** — Get CMS page
