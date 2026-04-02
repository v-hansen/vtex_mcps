import { describe, it, expect, vi, beforeEach } from 'vitest';

/**
 * Unit tests for CLI_Executor module.
 *
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 10.2, 12.2
 */

// We need to mock `node:child_process` so that `promisify(execFile)` in the
// source module resolves to our mock.  Node's `execFile` has a custom
// promisify symbol, so we replicate that behaviour here.
// Use vi.hoisted so the mock fn is available inside the hoisted vi.mock factory.
const { execFileMockAsync } = vi.hoisted(() => ({
  execFileMockAsync: vi.fn(),
}));

vi.mock('node:child_process', () => {
  // Build a fake `execFile` that carries the custom promisify symbol so
  // that `promisify(execFile)` returns our async mock.
  const fake = (() => {}) as any;
  fake[Symbol.for('nodejs.util.promisify.custom')] = execFileMockAsync;
  return { execFile: fake };
});

import {
  executeCommand,
  stripAnsi,
  sanitizeArg,
  containsDangerousChars,
  MAX_OUTPUT_SIZE,
} from '../src/cli-executor.js';

beforeEach(() => {
  vi.resetAllMocks();
});

// ---------------------------------------------------------------------------
// 1. Successful command execution
// ---------------------------------------------------------------------------
describe('Successful command execution', () => {
  it('returns correct CommandOutput with stdout, stderr, exitCode=0, success=true', async () => {
    /** Validates: Requirements 2.2, 2.5 */
    execFileMockAsync.mockResolvedValue({
      stdout: 'workspace list output\n',
      stderr: 'some warning\n',
    });

    const result = await executeCommand('workspace', ['list']);

    expect(result).toEqual({
      stdout: 'workspace list output\n',
      stderr: 'some warning\n',
      exitCode: 0,
      success: true,
    });
    expect(typeof result.stdout).toBe('string');
    expect(typeof result.stderr).toBe('string');
    expect(typeof result.exitCode).toBe('number');
    expect(typeof result.success).toBe('boolean');
  });
});

// ---------------------------------------------------------------------------
// 2. Timeout kills the process
// ---------------------------------------------------------------------------
describe('Timeout kills the process', () => {
  it('returns timeout error message and exitCode != 0 when process is killed', async () => {
    /** Validates: Requirements 2.3, 2.4 */
    const error: any = new Error('Command timed out');
    error.killed = true;
    error.code = null;
    error.signal = null;
    error.stdout = 'partial output';
    error.stderr = '';
    execFileMockAsync.mockRejectedValue(error);

    const result = await executeCommand('link', [], { timeout: 5000 });

    expect(result.success).toBe(false);
    expect(result.exitCode).not.toBe(0);
    expect(result.stderr).toContain('timed out');
  });
});

// ---------------------------------------------------------------------------
// 3. Binary-not-found (ENOENT)
// ---------------------------------------------------------------------------
describe('Binary-not-found', () => {
  it('returns installation instructions and exitCode=127 when vtex is not found', async () => {
    /** Validates: Requirements 2.6 */
    const error: any = new Error('spawn vtex ENOENT');
    error.code = 'ENOENT';
    error.stdout = '';
    error.stderr = '';
    execFileMockAsync.mockRejectedValue(error);

    const result = await executeCommand('whoami', []);

    expect(result.exitCode).toBe(127);
    expect(result.success).toBe(false);
    expect(result.stderr).toMatch(/npm install -g vtex|yarn global add vtex/);
  });
});

// ---------------------------------------------------------------------------
// 4. Signal termination (SIGTERM, SIGKILL)
// ---------------------------------------------------------------------------
describe('Signal termination', () => {
  it.each(['SIGTERM', 'SIGKILL'])(
    'returns signal name in output when process is terminated by %s',
    async (signal) => {
      /** Validates: Requirements 10.2 */
      const error: any = new Error(`Process terminated by ${signal}`);
      error.killed = false;
      error.signal = signal;
      error.code = null;
      error.stdout = '';
      error.stderr = '';
      execFileMockAsync.mockRejectedValue(error);

      const result = await executeCommand('deploy', []);

      expect(result.success).toBe(false);
      expect(result.stderr).toContain(signal);
    },
  );
});


// ---------------------------------------------------------------------------
// 5. Output truncation at 1MB
// ---------------------------------------------------------------------------
describe('Output truncation at 1MB', () => {
  it('truncates output exceeding MAX_OUTPUT_SIZE and appends truncation notice', async () => {
    /** Validates: Requirements 12.4 */
    const oversizedOutput = 'x'.repeat(MAX_OUTPUT_SIZE + 1024);

    execFileMockAsync.mockResolvedValue({
      stdout: oversizedOutput,
      stderr: '',
    });

    const result = await executeCommand('list', []);

    expect(result.success).toBe(true);
    expect(result.stdout).toContain('[output truncated at 1MB]');
    expect(Buffer.byteLength(result.stdout, 'utf-8')).toBeLessThan(
      Buffer.byteLength(oversizedOutput, 'utf-8'),
    );
  });
});

// ---------------------------------------------------------------------------
// 6. ANSI stripping on output
// ---------------------------------------------------------------------------
describe('ANSI stripping on output', () => {
  it('removes ANSI escape sequences from stdout and stderr', async () => {
    /** Validates: Requirements 10.4 */
    const ansiStdout = '\u001b[32mSuccess\u001b[0m: workspace created';
    const ansiStderr = '\u001b[31mWarning\u001b[0m: deprecation notice';

    execFileMockAsync.mockResolvedValue({
      stdout: ansiStdout,
      stderr: ansiStderr,
    });

    const result = await executeCommand('workspace', ['create', 'dev']);

    expect(result.stdout).toBe('Success: workspace created');
    expect(result.stderr).toBe('Warning: deprecation notice');
    // Verify no ANSI sequences remain.
    // eslint-disable-next-line no-control-regex
    const ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><~]/g;
    expect(ansiRegex.test(result.stdout)).toBe(false);
    ansiRegex.lastIndex = 0;
    expect(ansiRegex.test(result.stderr)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 7. Rejection of non-vtex binaries
// ---------------------------------------------------------------------------
describe('Rejection of non-vtex binaries', () => {
  it('throws when cliPath is not "vtex"', async () => {
    /** Validates: Requirements 12.2 */
    await expect(
      executeCommand('test', [], { cliPath: 'node' }),
    ).rejects.toThrow(/Security|only the "vtex" binary is allowed/);
  });

  it('throws for absolute paths to non-vtex binaries', async () => {
    /** Validates: Requirements 12.2 */
    await expect(
      executeCommand('test', [], { cliPath: '/usr/bin/bash' }),
    ).rejects.toThrow(/Security|only the "vtex" binary is allowed/);
  });

  it('allows absolute paths ending in vtex', async () => {
    /** Validates: Requirements 12.2 */
    execFileMockAsync.mockResolvedValue({ stdout: 'ok', stderr: '' });

    // Should NOT throw — the base name is "vtex".
    const result = await executeCommand('whoami', [], {
      cliPath: '/usr/local/bin/vtex',
    });
    expect(result.success).toBe(true);
  });
});
