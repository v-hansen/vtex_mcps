# MCP Client Setup Guide

How to connect any VTEX MCP server to the most popular AI clients.

All examples below use `@vtex-mcp/catalog-api` as a reference — replace with whichever server package you need.

---

## Claude Desktop

Edit your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "vtex-catalog": {
      "command": "npx",
      "args": ["@vtex-mcp/catalog-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

Restart Claude Desktop after saving. The server tools will appear in the tool list.

---

## Kiro

Create or edit `.kiro/settings/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "vtex-catalog": {
      "command": "npx",
      "args": ["@vtex-mcp/catalog-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

Kiro will detect the config automatically. You can also use the command palette → "MCP: Reconnect Servers" to reload.

---

## VS Code (Copilot)

Create or edit `.vscode/mcp.json` in your project root:

```json
{
  "servers": {
    "vtex-catalog": {
      "command": "npx",
      "args": ["@vtex-mcp/catalog-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

Requires the GitHub Copilot extension with MCP support enabled. Go to Settings → search "mcp" → enable "Chat: MCP".

---

## Cursor

Create or edit `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "vtex-catalog": {
      "command": "npx",
      "args": ["@vtex-mcp/catalog-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

Restart Cursor or use the command palette to reload MCP servers.

---

## Windsurf

Create or edit `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "vtex-catalog": {
      "command": "npx",
      "args": ["@vtex-mcp/catalog-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

---

## HTTP Transport (Any Client)

If your client supports HTTP/SSE instead of stdio, start the server with:

```bash
npx @vtex-mcp/catalog-api --transport http --port 3000
```

Then point your client to `http://localhost:3000/sse`.

---

## Multiple Servers

You can add as many servers as you need — each one is independent:

```json
{
  "mcpServers": {
    "vtex-catalog": {
      "command": "npx",
      "args": ["@vtex-mcp/catalog-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    },
    "vtex-orders": {
      "command": "npx",
      "args": ["@vtex-mcp/orders-api"],
      "env": {
        "VTEX_ACCOUNT_NAME": "your-account",
        "VTEX_APP_KEY": "your-app-key",
        "VTEX_APP_TOKEN": "your-app-token"
      }
    }
  }
}
```

> The credentials are the same across all servers — only the package name changes.

---

## Environment Variables Reference

| Variable            | Required | Description                                     |
| ------------------- | -------- | ----------------------------------------------- |
| `VTEX_ACCOUNT_NAME` | Yes      | Your VTEX account name                          |
| `VTEX_APP_KEY`      | Yes\*    | App key from VTEX License Manager               |
| `VTEX_APP_TOKEN`    | Yes\*    | App token paired with the key                   |
| `VTEX_AUTH_TOKEN`   | No       | User token (alternative to key/token pair)      |
| `VTEX_ENVIRONMENT`  | No       | API environment (default: `vtexcommercestable`) |

\* Required unless `VTEX_AUTH_TOKEN` is provided.
