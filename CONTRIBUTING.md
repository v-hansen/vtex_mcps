# Contributing

Thanks for considering a contribution. This guide covers everything you need to get started.

## Table of Contents

- [Getting Started](#getting-started)
- [Adding a New MCP Server](#adding-a-new-mcp-server)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## Getting Started

```bash
git clone https://github.com/v-hansen/vtex_mcps.git
cd vtex-mcp-servers
pnpm install
pnpm build
pnpm test
```

Requirements:

- Node.js >= 18
- pnpm >= 8

---

## Adding a New MCP Server

### 1. Get the OpenAPI spec

Download the official VTEX OpenAPI spec and save it to `specs/`:

```bash
curl -o specs/my-api.json \
  "https://raw.githubusercontent.com/vtex/openapi-schemas/master/VTEX%20-%20My%20API.json"
```

### 2. Generate the server

```bash
pnpm build --filter @vtex-mcp/generator

npx vtex-mcp-generator \
  --spec specs/my-api.json \
  --output servers/my-api \
  --name "@vtex-mcp/my-api" \
  --server-name "VTEX My API"
```

This creates a complete server package with:

```
servers/my-api/
├── src/
│   ├── cli.ts       # CLI entry point (--transport, --port)
│   ├── index.ts     # Server setup
│   └── tools.ts     # Generated tool definitions
├── package.json     # Scoped npm package with bin entry
├── tsconfig.json
├── Dockerfile
└── README.md        # Auto-generated tool documentation
```

### 3. Verify

```bash
pnpm install
pnpm build --filter @vtex-mcp/my-api
pnpm test --filter @vtex-mcp/my-api
```

### 4. Update docker-compose.yml

Add a service entry with the next available port:

```yaml
my-api:
  build: ./servers/my-api
  command: ['--transport', 'http', '--port', '3000']
  ports:
    - '30XX:3000'
  env_file: .env
```

---

## Coding Standards

### TypeScript

- Strict mode, ES2022 target, NodeNext module resolution
- ESM only (`"type": "module"` in all packages)
- `.js` extensions in all imports (TypeScript ESM requirement)
- All packages extend `tsconfig.base.json`

### Naming Conventions

| What                  | Convention                            | Example                   |
| --------------------- | ------------------------------------- | ------------------------- |
| MCP tool names        | `{apiGroup}_{operationId}` snake_case | `catalog_get_product`     |
| npm packages          | `@vtex-mcp/{api-group}` kebab-case    | `@vtex-mcp/catalog-api`   |
| Server directories    | `servers/{api-group}/`                | `servers/catalog-api/`    |
| Test files (unit)     | `{module}.test.ts`                    | `config.test.ts`          |
| Test files (property) | `{module}.property.test.ts`           | `config.property.test.ts` |

### Linting and Formatting

```bash
pnpm lint          # ESLint
pnpm format        # Prettier (write)
pnpm format:check  # Prettier (check only)
```

---

## Testing

We use **vitest** for unit tests and **fast-check** for property-based tests.

### Running tests

```bash
pnpm test                              # All packages
pnpm test --filter @vtex-mcp/shared    # Single package
```

### Writing tests

- Place tests in `__tests__/` next to source files
- Unit tests: specific examples, edge cases, error conditions
- Property tests: universal invariants with 100+ iterations
- Tag property tests with the design property reference:

```typescript
// Feature: vtex-mcp-servers, Property 8: Configuration Loading from Environment Variables
```

### What to test

- **Shared library changes** → unit + property tests for the affected module
- **Generator changes** → unit + property tests, then re-generate a sample server
- **Generated server issues** → fix the generator, not the generated code

---

## Pull Request Process

1. Fork the repo and create a branch from `main`
   - `feat/add-returns-api` for new features
   - `fix/auth-header-bug` for bug fixes
2. Make your changes following the standards above
3. Run the full suite:
   ```bash
   pnpm build
   pnpm test
   pnpm lint
   pnpm format:check
   ```
4. Open a PR with a clear description of what and why
5. CI must pass before merge

### PR Checklist

- [ ] Builds without errors (`pnpm build`)
- [ ] All tests pass (`pnpm test`)
- [ ] Lint passes (`pnpm lint`)
- [ ] Format is correct (`pnpm format:check`)
- [ ] New servers include generated README
- [ ] `docker-compose.yml` updated if adding a server
- [ ] Root README updated if adding user-facing changes

---

## Reporting Issues

- **Bugs**: Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature requests**: Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- **Security vulnerabilities**: See [SECURITY.md](SECURITY.md) — do not open a public issue

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.
