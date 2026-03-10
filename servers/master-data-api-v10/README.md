# VTEX Master Data Api V10

MCP server for the VTEX Master Data Api V10, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/master-data-api-v10
```

### Running with HTTP transport

```bash
npx @vtex-mcp/master-data-api-v10 --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "master-data-api-v10": {
      "command": "npx",
      "args": ["@vtex-mcp/master-data-api-v10"],
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

This server exposes 26 tool(s):

- **master-data-api-v10_listdataentities** — List data entities
- **master-data-api-v10_getdataentitystructure** — Get data entity structure
- **master-data-api-v10_createnewdocument** — Create new document
- **master-data-api-v10_createorupdatepartialdocument** — Create partial document
- **master-data-api-v10_getdocument** — Get document
- **master-data-api-v10_updateentiredocument** — Create document with custom ID or update entire document
- **master-data-api-v10_updatepartialdocument** — Update partial document
- **master-data-api-v10_deletedocument** — Delete document
- **master-data-api-v10_listversions** — List versions
- **master-data-api-v10_getversion** — Get version
- **master-data-api-v10_putversion** — Update version
- **master-data-api-v10_scrolldocuments** — Scroll documents
- **master-data-api-v10_searchdocuments** — Search documents
- **master-data-api-v10_retrieveattachment** — Retrieve attachment
- **master-data-api-v10_saveattachment** — Save attachment
- **master-data-api-v10_validate_documentby_clusters** — Validate document by clusters
- **master-data-api-v10_putscores** — Update scores
- **master-data-api-v10_putscorebyfield** — Update score by field
- **master-data-api-v10_deletescorebyfield** — Delete score by field
- **master-data-api-v10_create_new_customer_profilev2** — Create new customer profile
- **master-data-api-v10_update_customer_profile** — Update customer profile
- **master-data-api-v10_delete_customer_profile** — Delete customer profile
- **master-data-api-v10_create_new_customer_address** — Create new customer address
- **master-data-api-v10_get_api_dataentities_ad_documents_by_address_id** — Get address by ID
- **master-data-api-v10_update_customer_address** — Update address by ID
- **master-data-api-v10_delete_customer_ad** — Delete address by ID
