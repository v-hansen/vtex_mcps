#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { parseOpenApiSpec } from './parser.js';
import { operationToTool } from './tool-generator.js';
import { generatePackage } from './package-generator.js';

const { values } = parseArgs({
  options: {
    spec: { type: 'string' },
    output: { type: 'string' },
    name: { type: 'string' },
    'server-name': { type: 'string' },
  },
});

const spec = values.spec;
const output = values.output;
const name = values.name;
const serverName = values['server-name'];

if (!spec || !output || !name || !serverName) {
  console.error(
    'Usage: vtex-mcp-generator --spec <path> --output <dir> --name <package-name> --server-name <name>',
  );
  console.error('');
  console.error('Options:');
  console.error('  --spec         Path to OpenAPI spec file');
  console.error('  --output       Target output directory');
  console.error('  --name         Package name (e.g., @vtex-mcp/catalog-api)');
  console.error('  --server-name  Human-readable server name (e.g., VTEX Catalog API)');
  process.exit(1);
}

// Derive apiGroupPrefix from package name: "@vtex-mcp/catalog-api" → "catalog"
const apiGroupPrefix = name.replace(/^@vtex-mcp\//, '').replace(/-api$/, '');

const operations = await parseOpenApiSpec(spec);
const tools = operations.map((op) => operationToTool(op, apiGroupPrefix));

await generatePackage({
  outputDir: output,
  packageName: name,
  serverName,
  tools,
});

console.log(`Generated ${tools.length} tool(s) in ${output}`);
