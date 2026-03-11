# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-03-11

### Added

- Initial release with 41 MCP servers covering all public VTEX APIs
- 1,669 tools generated from official VTEX OpenAPI specifications
- Shared library (`@vtex-mcp/shared`) with:
  - Environment-based configuration loading
  - HTTP client with automatic auth header injection
  - Error handling with credential sanitization
  - Zod-based parameter validation
  - MCP server factory wrapping `@modelcontextprotocol/sdk`
- Code generator (`@vtex-mcp/generator`) with:
  - OpenAPI 3.x parser with `$ref` dereferencing
  - JSON Schema to Zod schema converter
  - Tool generator (name, description, input schema, handler)
  - Package scaffolder (full server package with CLI, Dockerfile, README)
- Support for stdio and HTTP/SSE transport modes
- 161 tests (unit + property-based with fast-check)
- GitHub Actions CI/CD (build, test, publish to npm)
- Docker Compose for running all servers locally
- Comprehensive documentation (README, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT)

### API Groups Covered

Antifraud Provider, Brand, Catalog, Category, Checkout, CMS (Legacy), Collection (Beta), Customer Credit, Gift Card, Gift Card Hub, Gift Card Provider Protocol, Headless CMS, Intelligent Search Events, Inventory, License Manager, Logistics, Marketplace, Master Data v2, Master Data v10, Message Center, Orders, Payment Provider Protocol, Payments, Payments Gateway, Pickup Points, Policies System, Pricing, Promotions & Taxes, Rates and Benefits, Reviews and Ratings, Search, Session Manager, Shipping Network, SKU Bindings, Specification, Subscriptions, Suggestions, Tracking, VTEX DO, VTEX ID, Warehouse.
