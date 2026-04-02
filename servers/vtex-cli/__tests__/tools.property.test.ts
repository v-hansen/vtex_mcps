import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { workspaceNameSchema, appNameSchema, releaseTypeSchema, csvFilePathSchema, commandOutputToToolResult } from '../src/tools.js';
import type { CommandOutput } from '../src/cli-executor.js';

/**
 * Feature: vtex-cli-server
 * Property 7: Workspace name validation
 *
 * For any string, the workspace name Zod schema SHALL accept it if and only
 * if it matches `^[a-zA-Z0-9-]+$`. Strings containing spaces, special
 * characters, or empty strings SHALL be rejected.
 *
 * Validates: Requirements 11.3
 */
describe('Property 7: Workspace name validation', () => {
  /** Alphanumeric characters and hyphens — the valid character set. */
  const VALID_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';

  /**
   * Arbitrary that produces valid workspace names: non-empty strings
   * composed exclusively of alphanumeric characters and hyphens.
   */
  const validWorkspaceName = fc
    .array(fc.constantFrom(...VALID_CHARS.split('')), { minLength: 1, maxLength: 50 })
    .map((chars) => chars.join(''));

  it('accepts any non-empty string matching ^[a-zA-Z0-9-]+$', () => {
    /** Validates: Requirements 11.3 */
    fc.assert(
      fc.property(validWorkspaceName, (name) => {
        const result = workspaceNameSchema.safeParse(name);
        expect(result.success).toBe(true);
      }),
      { numRuns: 100 },
    );
  });

  it('rejects empty strings', () => {
    /** Validates: Requirements 11.3 */
    const result = workspaceNameSchema.safeParse('');
    expect(result.success).toBe(false);
  });

  it('rejects strings containing spaces', () => {
    /** Validates: Requirements 11.3 */
    fc.assert(
      fc.property(
        fc.tuple(
          fc.array(fc.constantFrom(...VALID_CHARS.split('')), { minLength: 0, maxLength: 10 }).map((c) => c.join('')),
          fc.array(fc.constantFrom(...VALID_CHARS.split('')), { minLength: 0, maxLength: 10 }).map((c) => c.join('')),
        ),
        ([prefix, suffix]) => {
          const nameWithSpace = `${prefix} ${suffix}`;
          const result = workspaceNameSchema.safeParse(nameWithSpace);
          expect(result.success).toBe(false);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('rejects strings containing special characters', () => {
    /** Validates: Requirements 11.3 */
    const specialChars = '!@#$%^&*()_+=[]{}|\\:;"\'<>,./? \t\n';

    const invalidWorkspaceName = fc
      .tuple(
        fc.array(fc.constantFrom(...VALID_CHARS.split('')), { minLength: 0, maxLength: 10 }).map((c) => c.join('')),
        fc.constantFrom(...specialChars.split('')),
        fc.array(fc.constantFrom(...VALID_CHARS.split('')), { minLength: 0, maxLength: 10 }).map((c) => c.join('')),
      )
      .map(([prefix, special, suffix]) => `${prefix}${special}${suffix}`);

    fc.assert(
      fc.property(invalidWorkspaceName, (name) => {
        const result = workspaceNameSchema.safeParse(name);
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 },
    );
  });
});

/**
 * Feature: vtex-cli-server
 * Property 8: App name format validation
 *
 * For any string, the app name Zod schema SHALL accept it if and only if it
 * matches the VTEX format `vendor.appname` or `vendor.appname@major.minor.patch`.
 * Strings not matching this pattern SHALL be rejected.
 *
 * Validates: Requirements 11.4
 */
describe('Property 8: App name format validation', () => {
  /** Characters allowed in vendor and appname segments. */
  const SEGMENT_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';

  /**
   * Arbitrary that produces a valid vendor or appname segment:
   * non-empty string of alphanumeric characters and hyphens.
   */
  const segmentArb = fc
    .array(fc.constantFrom(...SEGMENT_CHARS.split('')), { minLength: 1, maxLength: 20 })
    .map((chars) => chars.join(''));

  /** Arbitrary that produces a valid semver version string (digits.digits.digits). */
  const versionArb = fc
    .tuple(
      fc.nat({ max: 999 }),
      fc.nat({ max: 999 }),
      fc.nat({ max: 999 }),
    )
    .map(([major, minor, patch]) => `${major}.${minor}.${patch}`);

  /**
   * Arbitrary that produces valid VTEX app names:
   * - `vendor.appname`
   * - `vendor.appname@major.minor.patch`
   */
  const validAppName = fc.oneof(
    // vendor.appname (no version)
    fc.tuple(segmentArb, segmentArb).map(([vendor, app]) => `${vendor}.${app}`),
    // vendor.appname@version
    fc.tuple(segmentArb, segmentArb, versionArb).map(
      ([vendor, app, ver]) => `${vendor}.${app}@${ver}`,
    ),
  );

  it('accepts valid VTEX app names (vendor.appname and vendor.appname@version)', () => {
    /** Validates: Requirements 11.4 */
    fc.assert(
      fc.property(validAppName, (name) => {
        const result = appNameSchema.safeParse(name);
        expect(result.success).toBe(true);
      }),
      { numRuns: 100 },
    );
  });

  it('rejects strings without a dot separator', () => {
    /** Validates: Requirements 11.4 */
    const noDot = fc
      .array(fc.constantFrom(...SEGMENT_CHARS.split('')), { minLength: 1, maxLength: 30 })
      .map((chars) => chars.join(''))
      .filter((s) => !s.includes('.'));

    fc.assert(
      fc.property(noDot, (name) => {
        const result = appNameSchema.safeParse(name);
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 },
    );
  });

  it('rejects app names with invalid version format', () => {
    /** Validates: Requirements 11.4 */
    const badVersion = fc
      .tuple(
        segmentArb,
        segmentArb,
        fc.array(fc.constantFrom(...'abcXYZ!@#'.split('')), { minLength: 1, maxLength: 10 }).map((c) => c.join('')),
      )
      .map(([vendor, app, bad]) => `${vendor}.${app}@${bad}`);

    fc.assert(
      fc.property(badVersion, (name) => {
        const result = appNameSchema.safeParse(name);
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 },
    );
  });

  it('rejects app names with special characters in vendor or appname', () => {
    /** Validates: Requirements 11.4 */
    const specialChars = '!@#$%^&*()_+=[]{}|\\:;"\'<>,/? \t\n';

    const invalidSegment = fc
      .tuple(
        fc.array(fc.constantFrom(...SEGMENT_CHARS.split('')), { minLength: 0, maxLength: 5 }).map((c) => c.join('')),
        fc.constantFrom(...specialChars.split('')),
        fc.array(fc.constantFrom(...SEGMENT_CHARS.split('')), { minLength: 0, maxLength: 5 }).map((c) => c.join('')),
      )
      .map(([pre, special, suf]) => `${pre}${special}${suf}`);

    const invalidAppName = fc
      .tuple(invalidSegment, segmentArb)
      .map(([badVendor, app]) => `${badVendor}.${app}`);

    fc.assert(
      fc.property(invalidAppName, (name) => {
        const result = appNameSchema.safeParse(name);
        expect(result.success).toBe(false);
      }),
      { numRuns: 100 },
    );
  });

  it('rejects empty strings', () => {
    /** Validates: Requirements 11.4 */
    const result = appNameSchema.safeParse('');
    expect(result.success).toBe(false);
  });
});

/**
 * Feature: vtex-cli-server
 * Property 4: Output-to-result mapping
 *
 * For any CommandOutput, the conversion to MCP ToolResult SHALL follow these
 * rules:
 * - If exitCode !== 0: result has isError: true and text includes stderr and
 *   exit code.
 * - If exitCode === 0 and stderr is non-empty (after trim): result includes
 *   both stdout and stderr (as warning), no isError.
 * - If exitCode === 0 and stderr is empty (after trim): result contains only
 *   stdout, no isError.
 *
 * Validates: Requirements 10.1, 10.3
 */
describe('Property 4: Output-to-result mapping', () => {
  /**
   * Arbitrary that produces random CommandOutput values.
   * success is always derived from exitCode === 0.
   */
  const commandOutputArb: fc.Arbitrary<CommandOutput> = fc
    .record({
      exitCode: fc.integer(),
      stdout: fc.string(),
      stderr: fc.string(),
    })
    .map(({ exitCode, stdout, stderr }) => ({
      exitCode,
      stdout,
      stderr,
      success: exitCode === 0,
    }));

  it('returns isError: true with stderr and exit code when exitCode !== 0', () => {
    /** Validates: Requirements 10.1, 10.3 */
    const failingOutput = commandOutputArb.filter((o) => o.exitCode !== 0);

    fc.assert(
      fc.property(failingOutput, (output) => {
        const result = commandOutputToToolResult(output);

        expect(result.isError).toBe(true);
        expect(result.content).toHaveLength(1);
        expect(result.content[0].type).toBe('text');
        expect(result.content[0].text).toContain(output.stderr);
        expect(result.content[0].text).toContain(String(output.exitCode));
      }),
      { numRuns: 100 },
    );
  });

  it('includes stdout and stderr as warning (no isError) when exitCode === 0 and stderr is non-empty', () => {
    /** Validates: Requirements 10.1, 10.3 */
    const successWithStderr = fc
      .record({
        stdout: fc.string(),
        // Ensure stderr has at least one non-whitespace character.
        stderr: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
      })
      .map(({ stdout, stderr }) => ({
        exitCode: 0,
        stdout,
        stderr,
        success: true,
      }));

    fc.assert(
      fc.property(successWithStderr, (output) => {
        const result = commandOutputToToolResult(output);

        expect(result.isError).toBeUndefined();
        expect(result.content).toHaveLength(1);
        expect(result.content[0].type).toBe('text');
        expect(result.content[0].text).toContain(output.stdout);
        expect(result.content[0].text).toContain(output.stderr);
      }),
      { numRuns: 100 },
    );
  });

  it('contains only stdout (no isError) when exitCode === 0 and stderr is empty', () => {
    /** Validates: Requirements 10.1, 10.3 */
    const successNoStderr = fc
      .record({
        stdout: fc.string(),
        // stderr is either empty or whitespace-only.
        stderr: fc.constantFrom('', ' ', '\t', '\n', '  \n\t  '),
      })
      .map(({ stdout, stderr }) => ({
        exitCode: 0,
        stdout,
        stderr,
        success: true,
      }));

    fc.assert(
      fc.property(successNoStderr, (output) => {
        const result = commandOutputToToolResult(output);

        expect(result.isError).toBeUndefined();
        expect(result.content).toHaveLength(1);
        expect(result.content[0].type).toBe('text');
        expect(result.content[0].text).toBe(output.stdout);
      }),
      { numRuns: 100 },
    );
  });
});

/**
 * Feature: vtex-cli-server
 * Property 9: Parameter validation rejects invalid input
 *
 * For any tool Zod schema and any input object missing required fields or
 * containing fields with incorrect types, the validation SHALL fail and return
 * descriptive error messages listing the specific issues.
 *
 * Validates: Requirements 11.1, 11.2
 */
describe('Property 9: Parameter validation rejects invalid input', () => {
  /**
   * Arbitrary that produces non-string values: numbers, booleans, objects,
   * arrays, null, and undefined.
   */
  const nonStringArb = fc.oneof(
    fc.integer(),
    fc.double(),
    fc.boolean(),
    fc.constant(null),
    fc.constant(undefined),
    fc.dictionary(fc.string({ minLength: 1, maxLength: 5 }), fc.string({ maxLength: 5 })),
    fc.array(fc.anything(), { maxLength: 3 }),
  );

  it('workspaceNameSchema rejects non-string types (numbers, booleans, objects, arrays, null, undefined)', () => {
    /** Validates: Requirements 11.1, 11.2 */
    fc.assert(
      fc.property(nonStringArb, (input) => {
        const result = workspaceNameSchema.safeParse(input);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('appNameSchema rejects non-string types', () => {
    /** Validates: Requirements 11.1, 11.2 */
    fc.assert(
      fc.property(nonStringArb, (input) => {
        const result = appNameSchema.safeParse(input);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('releaseTypeSchema rejects strings not in ["major", "minor", "patch"]', () => {
    /** Validates: Requirements 11.1, 11.2 */
    const invalidRelease = fc.oneof(
      nonStringArb,
      fc.string().filter((s) => !['major', 'minor', 'patch'].includes(s)),
    );

    fc.assert(
      fc.property(invalidRelease, (input) => {
        const result = releaseTypeSchema.safeParse(input);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });

  it('csvFilePathSchema rejects empty strings and non-string types', () => {
    /** Validates: Requirements 11.1, 11.2 */
    const invalidCsvPath = fc.oneof(
      nonStringArb,
      fc.constant(''),
    );

    fc.assert(
      fc.property(invalidCsvPath, (input) => {
        const result = csvFilePathSchema.safeParse(input);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 },
    );
  });
});

import { tools } from '../src/tools.js';
import { vi } from 'vitest';

/**
 * Feature: vtex-cli-server
 * Property 2: Tool-to-command mapping correctness
 *
 * For any tool definition in the tool inventory and any valid set of input
 * parameters, invoking the tool handler SHALL construct and execute the correct
 * VTEX CLI subcommand with the correct argument array. The subcommand and
 * arguments must match the mapping defined in the tool's specification.
 *
 * Validates: Requirements 3.1–3.7, 4.1–4.5, 5.1–5.5, 6.1–6.4, 7.1–7.7,
 *            8.1–8.3, 9.1–9.4, 16.1–16.3
 */
describe('Property 2: Tool-to-command mapping correctness', () => {
  /** Characters allowed in workspace names. */
  const WS_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';

  /** Characters allowed in vendor/appname segments. */
  const SEGMENT_CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';

  /** Arbitrary: valid workspace name. */
  const workspaceNameArb = fc
    .array(fc.constantFrom(...WS_CHARS.split('')), { minLength: 1, maxLength: 30 })
    .map((chars) => chars.join(''));

  /** Arbitrary: valid VTEX app name (vendor.appname). */
  const appNameArb = fc
    .tuple(
      fc.array(fc.constantFrom(...SEGMENT_CHARS.split('')), { minLength: 1, maxLength: 15 }).map((c) => c.join('')),
      fc.array(fc.constantFrom(...SEGMENT_CHARS.split('')), { minLength: 1, maxLength: 15 }).map((c) => c.join('')),
    )
    .map(([vendor, app]) => `${vendor}.${app}`);

  /** Arbitrary: release type. */
  const releaseTypeArb = fc.constantFrom('major', 'minor', 'patch');

  /** Arbitrary: non-empty string for account names, field names, values, etc. */
  const nonEmptyStringArb = fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0);

  /** Arbitrary: non-empty string for CSV file paths. */
  const csvPathArb = fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0);

  /** Arbitrary: optional path string for browse. */
  const optionalPathArb = fc.option(fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0), { nil: undefined });

  /**
   * Helper: create a fresh mock executor and tool list for each test run.
   */
  function createMockSetup() {
    const mockExecuteCommand = vi.fn().mockResolvedValue({
      stdout: '',
      stderr: '',
      exitCode: 0,
      success: true,
    });
    const toolList = tools({ executeCommand: mockExecuteCommand });
    return { mockExecuteCommand, toolList };
  }

  /**
   * Helper: find a tool by name from the tool list.
   */
  function findTool(toolList: ReturnType<typeof tools>, name: string) {
    const tool = toolList.find((t) => t.name === name);
    if (!tool) throw new Error(`Tool ${name} not found`);
    return tool;
  }

  // ---- Workspace domain: vtex_cli_workspace_create ----
  it('vtex_cli_workspace_create maps to subcommand "workspace" with args ["create", workspaceName]', async () => {
    /** Validates: Requirements 3.2 */
    await fc.assert(
      fc.asyncProperty(workspaceNameArb, async (workspaceName) => {
        const { mockExecuteCommand, toolList } = createMockSetup();
        const tool = findTool(toolList, 'vtex_cli_workspace_create');

        await tool.handler({ workspaceName });

        expect(mockExecuteCommand).toHaveBeenCalledWith('workspace', ['create', workspaceName]);
      }),
      { numRuns: 100 },
    );
  });

  // ---- App Dev domain: vtex_cli_install ----
  it('vtex_cli_install maps to subcommand "install" with args [appName]', async () => {
    /** Validates: Requirements 4.4 */
    await fc.assert(
      fc.asyncProperty(appNameArb, async (appName) => {
        const { mockExecuteCommand, toolList } = createMockSetup();
        const tool = findTool(toolList, 'vtex_cli_install');

        await tool.handler({ appName });

        expect(mockExecuteCommand).toHaveBeenCalledWith('install', [appName]);
      }),
      { numRuns: 100 },
    );
  });

  // ---- Publishing domain: vtex_cli_release ----
  it('vtex_cli_release maps to subcommand "release" with args [releaseType]', async () => {
    /** Validates: Requirements 5.3 */
    await fc.assert(
      fc.asyncProperty(releaseTypeArb, async (releaseType) => {
        const { mockExecuteCommand, toolList } = createMockSetup();
        const tool = findTool(toolList, 'vtex_cli_release');

        await tool.handler({ releaseType });

        expect(mockExecuteCommand).toHaveBeenCalledWith('release', [releaseType]);
      }),
      { numRuns: 100 },
    );
  });

  // ---- Account domain: vtex_cli_switch ----
  it('vtex_cli_switch maps to subcommand "switch" with args [accountName]', async () => {
    /** Validates: Requirements 6.2 */
    await fc.assert(
      fc.asyncProperty(nonEmptyStringArb, async (accountName) => {
        const { mockExecuteCommand, toolList } = createMockSetup();
        const tool = findTool(toolList, 'vtex_cli_switch');

        await tool.handler({ accountName });

        expect(mockExecuteCommand).toHaveBeenCalledWith('switch', [accountName]);
      }),
      { numRuns: 100 },
    );
  });

  // ---- Dependencies domain: vtex_cli_settings_set ----
  it('vtex_cli_settings_set maps to subcommand "settings" with args ["set", appName, fieldName, value]', async () => {
    /** Validates: Requirements 7.4 */
    await fc.assert(
      fc.asyncProperty(
        nonEmptyStringArb,
        nonEmptyStringArb,
        nonEmptyStringArb,
        async (appName, fieldName, value) => {
          const { mockExecuteCommand, toolList } = createMockSetup();
          const tool = findTool(toolList, 'vtex_cli_settings_set');

          await tool.handler({ appName, fieldName, value });

          expect(mockExecuteCommand).toHaveBeenCalledWith('settings', ['set', appName, fieldName, value]);
        },
      ),
      { numRuns: 100 },
    );
  });

  // ---- Navigation domain: vtex_cli_browse ----
  it('vtex_cli_browse maps to subcommand "browse" with args [path] or [] when path is omitted', async () => {
    /** Validates: Requirements 8.1 */
    await fc.assert(
      fc.asyncProperty(optionalPathArb, async (path) => {
        const { mockExecuteCommand, toolList } = createMockSetup();
        const tool = findTool(toolList, 'vtex_cli_browse');

        await tool.handler({ path });

        const expectedArgs = path ? [path] : [];
        expect(mockExecuteCommand).toHaveBeenCalledWith('browse', expectedArgs);
      }),
      { numRuns: 100 },
    );
  });

  // ---- Redirects domain: vtex_cli_redirects_import ----
  it('vtex_cli_redirects_import maps to subcommand "redirects" with args ["import", csvFilePath]', async () => {
    /** Validates: Requirements 9.1 */
    await fc.assert(
      fc.asyncProperty(csvPathArb, async (csvFilePath) => {
        const { mockExecuteCommand, toolList } = createMockSetup();
        const tool = findTool(toolList, 'vtex_cli_redirects_import');

        await tool.handler({ csvFilePath });

        expect(mockExecuteCommand).toHaveBeenCalledWith('redirects', ['import', csvFilePath]);
      }),
      { numRuns: 100 },
    );
  });

  // ---- Edition domain: vtex_cli_edition_set ----
  it('vtex_cli_edition_set maps to subcommand "edition" with args ["set", editionName]', async () => {
    /** Validates: Requirements 16.2 */
    await fc.assert(
      fc.asyncProperty(nonEmptyStringArb, async (editionName) => {
        const { mockExecuteCommand, toolList } = createMockSetup();
        const tool = findTool(toolList, 'vtex_cli_edition_set');

        await tool.handler({ editionName });

        expect(mockExecuteCommand).toHaveBeenCalledWith('edition', ['set', editionName]);
      }),
      { numRuns: 100 },
    );
  });
});
