# Contributing to VTEX MCP Servers

Thanks for your interest in contributing! This guide covers how to add new MCP servers, coding standards, testing, and the PR process.

## Project Structure

```
vtex-mcp-servers/
├── packages/
│   ├── shared/          # @vtex-mcp/shared — config, HTTP client, errors, validation, server factory
│   └── generator/       # @vtex-mcp/generator — OpenAPI spec → MCP server code generator
├── servers/             # Generated MCP server packages (one per VTEX API group)
├── specs/               # Downloaded VTEX OpenAPI spec files
├── .github/workflows/   # CI and publish workflows
├── docker-compose.yml   # Local dev: run all servers
└── tsconfig.base.json   # Shared TypeScript config
```

## Getting Started

```bash
# Clone and install
git clone https://github.com/your-org/vtex-mcp-servers.git
cd vtex-mcp-servers
pnpm install

# Build all packages
pnpm build

# Run all tests
pnpm test

# Lint and format
pnpm lint
pnpm format
```

## Adding a New MCP Server

### 1. Download the OpenAPI Spec

Download the official VTEX OpenAPI spec for the API group and save it to `specs/`:

```bash
curl -o specs/my-api.json https://developers.vtex.com/docs/api-reference/my-api/openapi-spec
```

### 2. Run the Generator

```bash
pnpm --filter @vtex-mcp/generator run build
npx vtex-mcp-generator \
  --spec specs/my-api.json \
  --output servers/my-api \
  --name "@vtex-mcp/my-api" \
  --server-name "VTEX My API"
```

This generates the full server package under `servers/my-api/` with:
- `src/index.ts` — server setup and tool registration
- `src/tools.ts` — generated tool definitions with Zod schemas
- `src/cli.ts` — CLI entry point (`--transport stdio|http`, `--port`)
- `package.json` — scoped package with bin entry
- `tsconfig.json` — extends root config
- `README.md` — auto-generated tool documentation
- `Dockerfile` — minimal container image

### 3. Verify the Generated Server

```bash
# Install dependencies
pnpm install

# Build the new server
pnpm --filter @vtex-mcp/my-api run build

# Run tests
pnpm --filter @vtex-mcp/my-api run test
```

### 4. Add to Docker Compose

Add a service entry in `docker-compose.yml` for the new server:

```yaml
my-api:
  build: ./servers/my-api
  environment:
    - VTEX_ACCOUNT_NAME=${VTEX_ACCOUNT_NAME}
    - VTEX_APP_KEY=${VTEX_APP_KEY}
    - VTEX_APP_TOKEN=${VTEX_APP_TOKEN}
```

## Coding Standards

### TypeScript

- Strict mode enabled (`tsconfig.base.json`)
- ES2022 target with NodeNext module resolution
- ESM only (`"type": "module"` in all packages)
- All packages extend `tsconfig.base.json`

### Linting and Formatting

- **ESLint** with `@typescript-eslint` — run `pnpm lint`
- **Prettier** — run `pnpm format`
- Config: single quotes, trailing commas, 100 char print width, 2-space indent
- Unused vars prefixed with `_` are allowed
- `no-console` is a warning (use `console.warn` / `console.error` only)

### Naming Conventions

- MCP tool names: `{apiGroup}_{operationId}` in snake_case (e.g., `catalog_getProduct`)
- npm packages: `@vtex-mcp/{api-group-name}` in kebab-case
- Server directories: `servers/{api-group-name}/`

## Testing Guidelines

We use **vitest** for unit tests and **fast-check** for property-based tests.

### Running Tests

```bash
# All tests
pnpm test

# Single package
pnpm --filter @vtex-mcp/shared run test

# Watch mode (local dev only)
pnpm --filter @vtex-mcp/shared run test:watch
```

### Unit Tests

- Co-locate tests in `__tests__/` directories next to source
- File naming: `{module}.test.ts`
- Cover specific examples, edge cases, and error conditions
- Use vitest built-in mocking for HTTP client and env vars

### Property-Based Tests

- File naming: `{module}.property.test.ts`
- Use fast-check with a minimum of 100 iterations per property
- Tag each property test with a comment referencing the design property:
  ```typescript
  // Feature: vtex-mcp-servers, Property 1: OpenAPI Spec Round-Trip Consistency
  ```
- Focus on universal invariants (e.g., "for any valid input, output satisfies X")

### What to Test

- **Shared library changes**: unit + property tests for the affected module
- **Generator changes**: unit + property tests, then re-generate a sample server and verify
- **Generated server changes**: prefer fixing the generator over hand-editing generated code

## Pull Request Process

1. **Branch** from `main` with a descriptive name (e.g., `feat/add-returns-api`, `fix/auth-header-bug`)
2. **Make your changes** following the coding standards above
3. **Run the full test suite** — `pnpm build && pnpm test`
4. **Lint and format** — `pnpm lint && pnpm format:check`
5. **Write a clear PR description** explaining what changed and why
6. **Link related issues** if applicable
7. CI must pass (build + test + lint) before merge

### PR Checklist

- [ ] Code builds without errors (`pnpm build`)
- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Formatting is correct (`pnpm format:check`)
- [ ] New MCP servers include generated tests
- [ ] `docker-compose.yml` updated if adding a new server
- [ ] README updated if adding user-facing changes
