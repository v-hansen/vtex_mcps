# VTEX Master Data Api V2

MCP server for the VTEX Master Data Api V2, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/master-data-api-v2
```

### Running with HTTP transport

```bash
npx @vtex-mcp/master-data-api-v2 --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "master-data-api-v2": {
      "command": "npx",
      "args": ["@vtex-mcp/master-data-api-v2"],
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

This server exposes 20 tool(s):

- **master-data-api-v2_createnewdocument** — Create new document
- **master-data-api-v2_createorupdatepartialdocument** — Create partial document
- **master-data-api-v2_getdocument** — Get document
- **master-data-api-v2_updateentiredocument** — Create document with custom ID or update entire document
- **master-data-api-v2_updatepartialdocument** — Update partial document
- **master-data-api-v2_deletedocument** — Delete document
- **master-data-api-v2_searchdocuments** — Search documents
- **master-data-api-v2_scrolldocuments** — Scroll documents
- **master-data-api-v2_getschemas** — Get schemas
- **master-data-api-v2_getschemabyname** — Get schema by name
- **master-data-api-v2_saveschemabyname** — Save schema by name
- **master-data-api-v2_deleteschemabyname** — Delete schema by name
- **master-data-api-v2_getindices** — Get indices
- **master-data-api-v2_putindices** — Create index
- **master-data-api-v2_getindexbyname** — Get index by name
- **master-data-api-v2_deleteindexbyname** — Delete index by name
- **master-data-api-v2_validatedocumentbyclusters** — Validate document by clusters
- **master-data-api-v2_listversions** — List versions
- **master-data-api-v2_getversion** — Get version
- **master-data-api-v2_putversion** — Update version
