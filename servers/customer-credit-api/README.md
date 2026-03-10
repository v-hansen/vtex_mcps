# VTEX Customer Credit Api

MCP server for the VTEX Customer Credit Api, providing AI assistants access to VTEX e-commerce APIs.

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
npx @vtex-mcp/customer-credit-api
```

### Running with HTTP transport

```bash
npx @vtex-mcp/customer-credit-api --transport http --port 3000
```

### MCP Client Configuration (Claude Desktop)

```json
{
  "mcpServers": {
    "customer-credit-api": {
      "command": "npx",
      "args": ["@vtex-mcp/customer-credit-api"],
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

This server exposes 25 tool(s):

- **customer-credit_searchallinvoices** — Search all invoices
- **customer-credit_retrieve_invoiceby_id** — Retrieve invoice by ID
- **customer-credit_change_invoice** — Change invoice
- **customer-credit_cancel_invoice** — Cancel invoice
- **customer-credit_searchallinvoicesofa_account** — Retrieve invoices by Customer Credit account ID
- **customer-credit_markaninvoiceas_paid** — Mark an invoice as paid
- **customer-credit_postponeaninvoice** — Postpone an invoice
- **customer-credit_searchallaccounts** — Search all accounts
- **customer-credit_openan_account** — Open an account
- **customer-credit_retrievea_accountby_id** — Retrieve an account by ID
- **customer-credit_closean_account** — Close an account
- **customer-credit_updateemailanddescriptionofaaccount** — Update account information
- **customer-credit_accountstatements** — Get account statements
- **customer-credit_changecreditlimitofan_account** — Change credit limit of an account
- **customer-credit_decreasebalanceofanaccount** — Decrease balance of an account
- **customer-credit_createor_update_settlement** — Create or update settlement
- **customer-credit_createa_pre_authorization** — Create a pre-authorization
- **customer-credit_createa_pre_authorization(usingid)** — Update a pre-authorization
- **customer-credit_cancela_pre_authorization** — Cancel a pre-authorization
- **customer-credit_addanaccount_holder** — Add an account holder
- **customer-credit_deleteanaccountholder** — Delete an account holder
- **customer-credit_changetoleranceofanaccount** — Change tolerance of an account
- **customer-credit_partialor_total_refunda_settlement** — Partially or totally refund a settlement
- **customer-credit_retrievestoreconfiguration** — Retrieve store configuration
- **customer-credit_createorchangestoreconfiguration** — Create or change store configuration
