# VTEX Vtex Do Api

MCP server for the VTEX Vtex Do Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/vtex-do-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/vtex-do-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "vtex-do-api": {
      "command": "npx",
      "args": ["@vtex-mcp/vtex-do-api"],
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

This server exposes 8 tool(s):

- **vtex-do_new_note** — Create note
- **vtex-do_get_notesbyorder_id** — Get notes by order ID
- **vtex-do_get_note** — Retrieve note
- **vtex-do_new_task** — Create task
- **vtex-do_listtasksbyassignee** — List tasks
- **vtex-do_get_task** — Retrieve task
- **vtex-do_edit_task** — Update task
- **vtex-do_add_comment** — Add comment on a task
