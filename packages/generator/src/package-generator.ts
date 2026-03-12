import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { GeneratedTool } from './tool-generator.js';

/**
 * Options for generating a complete MCP server package.
 */
export interface PackageGeneratorOptions {
  outputDir: string;
  packageName: string;
  serverName: string;
  tools: GeneratedTool[];
}

/**
 * Generates a complete MCP server package on disk, including
 * src/tools.ts, src/index.ts, src/cli.ts, package.json,
 * tsconfig.json, README.md, and Dockerfile.
 */
export async function generatePackage(options: PackageGeneratorOptions): Promise<void> {
  const { outputDir } = options;

  await mkdir(join(outputDir, 'src'), { recursive: true });

  await Promise.all([
    writeFile(join(outputDir, 'src', 'tools.ts'), generateToolsFile(options)),
    writeFile(join(outputDir, 'src', 'index.ts'), generateIndexFile(options)),
    writeFile(join(outputDir, 'src', 'cli.ts'), generateCliFile(options)),
    writeFile(join(outputDir, 'package.json'), generatePackageJson(options)),
    writeFile(join(outputDir, 'tsconfig.json'), generateTsConfig()),
    writeFile(join(outputDir, 'README.md'), generateReadme(options)),
    writeFile(join(outputDir, 'Dockerfile'), generateDockerfile(options)),
  ]);
}

// --- File generators ---

function generateToolsFile(options: PackageGeneratorOptions): string {
  const { tools } = options;

  const toolEntries = tools.map((tool) => {
    return [
      '    {',
      `      name: ${JSON.stringify(tool.name)},`,
      `      description: ${JSON.stringify(tool.description)},`,
      `      inputSchema: ${tool.inputSchemaCode},`,
      `      handler: ${tool.handlerCode},`,
      '    }',
    ].join('\n');
  });

  return [
    'import type { ToolDefinition } from "@vtex-mcp/shared";',
    'import { z } from "zod";',
    'import type { AxiosInstance } from "axios";',
    '',
    'export function tools(http: AxiosInstance): ToolDefinition[] {',
    '  return [',
    toolEntries.join(',\n'),
    '  ];',
    '}',
    '',
  ].join('\n');
}

function generateIndexFile(options: PackageGeneratorOptions): string {
  const { serverName, packageName } = options;
  const serverSlug = packageName.replace('@vtex-mcp/', '');

  return [
    'import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";',
    'import { tools } from "./tools.js";',
    '',
    'const config = loadConfig();',
    'const httpClient = createHttpClient(config);',
    '',
    'export const server = createMcpServer({',
    `  name: "vtex-${serverSlug}-mcp",`,
    '  version: "1.0.0",',
    '  tools: tools(httpClient),',
    '});',
    '',
    `// ${serverName} MCP Server`,
    '',
  ].join('\n');
}

function generateCliFile(options: PackageGeneratorOptions): string {
  const { packageName } = options;
  const serverSlug = packageName.replace('@vtex-mcp/', '');

  return [
    '#!/usr/bin/env node',
    'import { parseArgs } from "node:util";',
    'import { createMcpServer, loadConfig, createHttpClient } from "@vtex-mcp/shared";',
    'import { tools } from "./tools.js";',
    '',
    'const { values } = parseArgs({',
    '  options: {',
    '    transport: { type: "string", default: "stdio" },',
    '    port: { type: "string", default: "3000" },',
    '  },',
    '});',
    '',
    'const config = loadConfig();',
    'const httpClient = createHttpClient(config);',
    'const server = createMcpServer({',
    `  name: "vtex-${serverSlug}-mcp",`,
    '  version: "1.0.0",',
    '  tools: tools(httpClient),',
    '});',
    '',
    'if (values.transport === "http") {',
    '  server.startHttp({ port: parseInt(values.port!, 10) });',
    '} else {',
    '  server.startStdio();',
    '}',
    '',
  ].join('\n');
}

function generatePackageJson(options: PackageGeneratorOptions): string {
  const { packageName, serverName } = options;

  const pkg = {
    name: packageName,
    version: '1.0.0',
    description: `MCP server for ${serverName}`,
    type: 'module',
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    bin: {
      [packageName.replace('@vtex-mcp/', 'vtex-mcp-')]: 'dist/cli.js',
    },
    files: ['dist'],
    scripts: {
      build: 'tsc',
      start: 'node dist/cli.js',
      'start:http': 'node dist/cli.js --transport http',
    },
    dependencies: {
      '@vtex-mcp/shared': 'workspace:*',
      axios: '^1.7.9',
      zod: '^3.24.2',
    },
    devDependencies: {
      '@types/node': '^22.10.5',
      typescript: '^5.7.3',
    },
    license: 'MIT',
  };

  return JSON.stringify(pkg, null, 2) + '\n';
}

function generateTsConfig(): string {
  const config = {
    extends: '../../tsconfig.base.json',
    compilerOptions: {
      outDir: 'dist',
      rootDir: 'src',
    },
    include: ['src'],
  };

  return JSON.stringify(config, null, 2) + '\n';
}

function generateReadme(options: PackageGeneratorOptions): string {
  const { packageName, serverName, tools } = options;

  const toolList = tools
    .map((t) => {
      const firstLine = t.description.split('\n')[0];
      return `- **${t.name}** — ${firstLine}`;
    })
    .join('\n');

  return [
    `# ${serverName}`,
    '',
    `MCP server for the ${serverName}, providing AI assistants access to VTEX e-commerce APIs.`,
    '',
    '## Setup',
    '',
    '### Environment Variables',
    '',
    '| Variable | Required | Description |',
    '|---|---|---|',
    '| `VTEX_ACCOUNT_NAME` | Yes | Your VTEX account name |',
    '| `VTEX_APP_KEY` | Yes* | VTEX app key for authentication |',
    '| `VTEX_APP_TOKEN` | Yes* | VTEX app token for authentication |',
    '| `VTEX_AUTH_TOKEN` | No | Alternative auth token (replaces app key/token) |',
    '| `VTEX_ENVIRONMENT` | No | VTEX environment (default: `vtexcommercestable`) |',
    '',
    '\\* Required unless `VTEX_AUTH_TOKEN` is provided.',
    '',
    '### Running via npx',
    '',
    '```bash',
    `npx ${packageName}`,
    '```',
    '',
    '### Running with HTTP transport',
    '',
    '```bash',
    `npx ${packageName} --transport http --port 3000`,
    '```',
    '',
    '### MCP Client Configuration (Claude Desktop)',
    '',
    '```json',
    '{',
    '  "mcpServers": {',
    `    "${packageName.replace('@vtex-mcp/', '')}": {`,
    `      "command": "npx",`,
    `      "args": ["${packageName}"],`,
    '      "env": {',
    '        "VTEX_ACCOUNT_NAME": "your-account",',
    '        "VTEX_APP_KEY": "your-app-key",',
    '        "VTEX_APP_TOKEN": "your-app-token"',
    '      }',
    '    }',
    '  }',
    '}',
    '```',
    '',
    '## Available Tools',
    '',
    `This server exposes ${tools.length} tool(s):`,
    '',
    toolList,
    '',
  ].join('\n');
}

function generateDockerfile(options: PackageGeneratorOptions): string {
  const serverDir = options.outputDir.replace(/^\.\//, '');
  return [
    '# Build from monorepo root: docker build -f ' + serverDir + '/Dockerfile .',
    'FROM node:20-slim AS builder',
    'RUN corepack enable && corepack prepare pnpm@9.15.4 --activate',
    'WORKDIR /app',
    'COPY package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.base.json ./',
    'COPY packages/shared/ packages/shared/',
    'COPY ' + serverDir + '/ ' + serverDir + '/',
    'RUN pnpm install --frozen-lockfile && pnpm build',
    '',
    'FROM node:20-slim',
    'RUN corepack enable && corepack prepare pnpm@9.15.4 --activate',
    'WORKDIR /app',
    'COPY --from=builder /app/ /app/',
    'ENV NODE_ENV=production',
    'ENTRYPOINT ["node", "' + serverDir + '/dist/cli.js"]',
    'CMD ["--transport", "stdio"]',
    '',
  ].join('\n');
}
