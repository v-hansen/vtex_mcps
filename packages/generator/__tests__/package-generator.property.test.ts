import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';
import { generatePackage } from '../src/package-generator.js';
import type { GeneratedTool } from '../src/tool-generator.js';
import { mkdtemp, rm, readFile, access } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { constants } from 'node:fs';

/**
 * Feature: vtex-mcp-servers
 * Properties 12, 13: Package Naming Convention, Generator File Scaffolding Completeness
 *
 * Validates: Requirements 6.1, 9.2
 */

// --- Helpers ---

const tempDirs: string[] = [];

async function makeTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'pkg-gen-test-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  for (const dir of tempDirs) {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
  tempDirs.length = 0;
});

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

// --- Arbitraries ---

/** Kebab-case API group name */
const kebabNameArb = fc
  .tuple(
    fc.stringMatching(/^[a-z]{2,8}$/),
    fc.array(fc.stringMatching(/^[a-z]{2,6}$/), { minLength: 0, maxLength: 2 }),
  )
  .map(([first, rest]) => [first, ...rest].join('-'));

/** A human-readable server name */
const serverNameArb = fc
  .tuple(fc.constant('VTEX'), fc.stringMatching(/^[A-Z][a-z]{2,8}$/), fc.constant('API'))
  .map((parts) => parts.join(' '));

/** A simple generated tool */
const toolArb = fc
  .tuple(fc.stringMatching(/^[a-z]{2,10}_[a-z]{2,10}$/), fc.stringMatching(/^[A-Za-z ]{3,30}$/))
  .map(
    ([name, desc]): GeneratedTool => ({
      name,
      description: desc + '\nGET /api/test',
      inputSchemaCode: 'z.object({})',
      handlerCode: 'async (params) => ({ content: [{ type: "text" as const, text: "ok" }] })',
    }),
  );

/** Array of tools (0 to 4) */
const toolsArb = fc.array(toolArb, { minLength: 0, maxLength: 4 });

// --- Property 12: Package Naming Convention ---

describe('Property 12: Package Naming Convention', () => {
  /** Validates: Requirements 6.1 */

  it('generated package.json name follows @vtex-mcp/{kebab-case-api-group}', () => {
    /** Validates: Requirements 6.1 */
    fc.assert(
      fc.asyncProperty(
        kebabNameArb,
        serverNameArb,
        toolsArb,
        async (apiGroupName, serverName, tools) => {
          const tmpDir = await makeTempDir();
          const outputDir = join(tmpDir, apiGroupName);
          const packageName = `@vtex-mcp/${apiGroupName}`;

          await generatePackage({
            outputDir,
            packageName,
            serverName,
            tools,
          });

          const pkgJsonRaw = await readFile(join(outputDir, 'package.json'), 'utf-8');
          const pkgJson = JSON.parse(pkgJsonRaw);

          expect(pkgJson.name).toBe(`@vtex-mcp/${apiGroupName}`);
          expect(pkgJson.name).toMatch(/^@vtex-mcp\/[a-z][a-z0-9-]*$/);
        },
      ),
      { numRuns: 30 },
    );
  });
});

// --- Property 13: Generator File Scaffolding Completeness ---

describe('Property 13: Generator File Scaffolding Completeness', () => {
  /** Validates: Requirements 9.2 */

  const REQUIRED_FILES = [
    'src/index.ts',
    'src/tools.ts',
    'src/cli.ts',
    'package.json',
    'tsconfig.json',
    'README.md',
    'Dockerfile',
  ];

  it('generated directory contains all required files', () => {
    /** Validates: Requirements 9.2 */
    fc.assert(
      fc.asyncProperty(
        kebabNameArb,
        serverNameArb,
        toolsArb,
        async (apiGroupName, serverName, tools) => {
          const tmpDir = await makeTempDir();
          const outputDir = join(tmpDir, apiGroupName);
          const packageName = `@vtex-mcp/${apiGroupName}`;

          await generatePackage({
            outputDir,
            packageName,
            serverName,
            tools,
          });

          for (const file of REQUIRED_FILES) {
            const exists = await fileExists(join(outputDir, file));
            expect(exists, `Expected file ${file} to exist`).toBe(true);
          }
        },
      ),
      { numRuns: 30 },
    );
  });

  it('generated package.json is valid JSON with required fields', () => {
    /** Validates: Requirements 6.1 */
    fc.assert(
      fc.asyncProperty(
        kebabNameArb,
        serverNameArb,
        toolsArb,
        async (apiGroupName, serverName, tools) => {
          const tmpDir = await makeTempDir();
          const outputDir = join(tmpDir, apiGroupName);
          const packageName = `@vtex-mcp/${apiGroupName}`;

          await generatePackage({
            outputDir,
            packageName,
            serverName,
            tools,
          });

          const pkgJsonRaw = await readFile(join(outputDir, 'package.json'), 'utf-8');
          const pkgJson = JSON.parse(pkgJsonRaw);

          expect(pkgJson.name).toBe(packageName);
          expect(pkgJson.type).toBe('module');
          expect(pkgJson.bin).toBeDefined();
          expect(pkgJson.scripts).toBeDefined();
          expect(pkgJson.dependencies).toBeDefined();
        },
      ),
      { numRuns: 30 },
    );
  });
});
