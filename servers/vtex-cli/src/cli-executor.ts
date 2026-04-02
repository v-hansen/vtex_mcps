import { execFile } from "node:child_process";
import { promisify } from "node:util";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Regex matching dangerous shell meta-characters that must be stripped. */
export const DANGEROUS_CHARS = /[;|&`$(){}[\]<>!#~]/g;

/** Default command timeout in milliseconds (120 seconds). */
export const DEFAULT_TIMEOUT = 120_000;

/** Maximum captured output size in bytes (1 MB). */
export const MAX_OUTPUT_SIZE = 1_048_576;

/**
 * Regex that matches ANSI escape sequences (SGR, cursor movement, etc.).
 * Covers the vast majority of sequences emitted by CLI tools.
 */
const ANSI_REGEX =
  // eslint-disable-next-line no-control-regex
  /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><~]/g;

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

/** Structured result of a CLI command execution. */
export interface CommandOutput {
  /** Captured standard output (ANSI-stripped, possibly truncated). */
  stdout: string;
  /** Captured standard error (ANSI-stripped, possibly truncated). */
  stderr: string;
  /** Process exit code (0 typically means success). */
  exitCode: number;
  /** Convenience flag: `true` when `exitCode === 0`. */
  success: boolean;
}

/** Configuration for the CLI executor. */
export interface ExecutorOptions {
  /** Path to the vtex binary. @default "vtex" */
  cliPath: string;
  /** Command timeout in milliseconds. @default 120_000 */
  timeout: number;
  /** Working directory for the child process. @default process.cwd() */
  cwd: string;
  /** Maximum bytes captured per stream (stdout / stderr). @default 1_048_576 */
  maxOutputSize: number;
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Remove dangerous shell meta-characters from `arg`.
 *
 * This is a defence-in-depth measure — `execFile` already avoids shell
 * interpolation, but we strip these characters to be safe.
 */
export function sanitizeArg(arg: string): string {
  return arg.replace(DANGEROUS_CHARS, "");
}

/**
 * Return `true` when `arg` contains at least one dangerous shell character.
 */
export function containsDangerousChars(arg: string): boolean {
  // Reset lastIndex because the regex has the global flag.
  DANGEROUS_CHARS.lastIndex = 0;
  return DANGEROUS_CHARS.test(arg);
}

/**
 * Strip ANSI escape sequences from `text`.
 *
 * The function is idempotent: `stripAnsi(stripAnsi(s)) === stripAnsi(s)`.
 */
export function stripAnsi(text: string): string {
  return text.replace(ANSI_REGEX, "");
}

// ---------------------------------------------------------------------------
// Truncation helper
// ---------------------------------------------------------------------------

/**
 * If `text` exceeds `maxSize` bytes, truncate it and append a notice.
 */
function truncateOutput(text: string, maxSize: number): string {
  if (Buffer.byteLength(text, "utf-8") <= maxSize) {
    return text;
  }
  // Slice by byte length — convert to Buffer, slice, convert back.
  const truncated = Buffer.from(text, "utf-8")
    .subarray(0, maxSize)
    .toString("utf-8");
  return `${truncated}\n[output truncated at 1MB]`;
}

// ---------------------------------------------------------------------------
// Core execution
// ---------------------------------------------------------------------------

const execFileAsync = promisify(execFile);

/** Default options used when callers omit fields. */
const DEFAULT_OPTIONS: ExecutorOptions = {
  cliPath: "vtex",
  timeout: DEFAULT_TIMEOUT,
  cwd: process.cwd(),
  maxOutputSize: MAX_OUTPUT_SIZE,
};

/**
 * Execute a VTEX CLI subcommand safely.
 *
 * Uses `child_process.execFile` with an argument array — **no shell** is
 * spawned, which prevents command injection.
 *
 * @param subcommand - The VTEX CLI subcommand (e.g. `"workspace"`, `"link"`).
 * @param args       - Additional arguments for the subcommand.
 * @param options    - Optional overrides for executor behaviour.
 * @returns Structured {@link CommandOutput}.
 */
export async function executeCommand(
  subcommand: string,
  args: string[],
  options?: Partial<ExecutorOptions>,
): Promise<CommandOutput> {
  const opts: ExecutorOptions = { ...DEFAULT_OPTIONS, ...options };

  // ---- Binary restriction ------------------------------------------------
  // Only the configured vtex binary is allowed.  Resolve the base name so
  // that both "vtex" and "/usr/local/bin/vtex" are accepted, but
  // "node", "bash", etc. are rejected.
  const binaryBase = opts.cliPath.split("/").pop()?.split("\\").pop() ?? "";
  if (binaryBase !== "vtex") {
    throw new Error(
      `Security: only the "vtex" binary is allowed. Received: "${opts.cliPath}"`,
    );
  }

  // ---- Sanitize arguments ------------------------------------------------
  const sanitizedArgs = [subcommand, ...args].map(sanitizeArg);

  // Always append --verbose for richer output.
  if (!sanitizedArgs.includes("--verbose")) {
    sanitizedArgs.push("--verbose");
  }

  try {
    const { stdout, stderr } = await execFileAsync(opts.cliPath, sanitizedArgs, {
      timeout: opts.timeout,
      cwd: opts.cwd,
      maxBuffer: opts.maxOutputSize,
      // Explicitly avoid shell — execFile default is no shell.
    });

    const cleanStdout = truncateOutput(stripAnsi(stdout), opts.maxOutputSize);
    const cleanStderr = truncateOutput(stripAnsi(stderr), opts.maxOutputSize);

    return {
      stdout: cleanStdout,
      stderr: cleanStderr,
      exitCode: 0,
      success: true,
    };
  } catch (error: unknown) {
    // Node wraps child-process errors in an object with `code`, `signal`,
    // `stdout`, `stderr`, and `killed` fields.
    const err = error as {
      code?: number | string;
      signal?: string | null;
      stdout?: string;
      stderr?: string;
      killed?: boolean;
      message?: string;
    };

    // ---- Timeout ---------------------------------------------------------
    if (err.killed === true) {
      const rawStdout = typeof err.stdout === "string" ? err.stdout : "";
      const rawStderr = typeof err.stderr === "string" ? err.stderr : "";
      return {
        stdout: truncateOutput(stripAnsi(rawStdout), opts.maxOutputSize),
        stderr: truncateOutput(
          stripAnsi(rawStderr) +
            `\n[command timed out after ${opts.timeout}ms]`,
          opts.maxOutputSize,
        ),
        exitCode: 1,
        success: false,
      };
    }

    // ---- Signal termination (SIGTERM, SIGKILL, etc.) ---------------------
    if (err.signal) {
      const rawStdout = typeof err.stdout === "string" ? err.stdout : "";
      const rawStderr = typeof err.stderr === "string" ? err.stderr : "";
      return {
        stdout: truncateOutput(stripAnsi(rawStdout), opts.maxOutputSize),
        stderr: truncateOutput(
          stripAnsi(rawStderr) +
            `\n[process terminated by signal: ${err.signal}]`,
          opts.maxOutputSize,
        ),
        exitCode: typeof err.code === "number" ? err.code : 1,
        success: false,
      };
    }

    // ---- Non-zero exit code ----------------------------------------------
    if (typeof err.code === "number") {
      const rawStdout = typeof err.stdout === "string" ? err.stdout : "";
      const rawStderr = typeof err.stderr === "string" ? err.stderr : "";
      return {
        stdout: truncateOutput(stripAnsi(rawStdout), opts.maxOutputSize),
        stderr: truncateOutput(stripAnsi(rawStderr), opts.maxOutputSize),
        exitCode: err.code,
        success: false,
      };
    }

    // ---- Binary not found (ENOENT) ---------------------------------------
    if (err.code === "ENOENT") {
      return {
        stdout: "",
        stderr:
          `VTEX CLI not found at "${opts.cliPath}". ` +
          "Please install it with: npm install -g vtex  or  yarn global add vtex",
        exitCode: 127,
        success: false,
      };
    }

    // ---- Fallback --------------------------------------------------------
    return {
      stdout: "",
      stderr: err.message ?? "Unknown error executing VTEX CLI command",
      exitCode: 1,
      success: false,
    };
  }
}

// ---------------------------------------------------------------------------
// Startup validation
// ---------------------------------------------------------------------------

/**
 * Verify that the `vtex` binary is available and return its version string.
 *
 * @param cliPath - Optional path to the vtex binary (defaults to `"vtex"`).
 * @returns The version string reported by `vtex version`.
 * @throws If the binary is not found or cannot be executed.
 */
export async function validateCliAvailable(
  cliPath: string = "vtex",
): Promise<string> {
  try {
    const { stdout } = await execFileAsync(cliPath, ["version"], {
      timeout: 15_000,
    });
    return stripAnsi(stdout).trim();
  } catch {
    throw new Error(
      `VTEX CLI not found at "${cliPath}". ` +
        "Please install it with:\n" +
        "  npm install -g vtex\n" +
        "  yarn global add vtex\n\n" +
        "You can also set the VTEX_CLI_PATH environment variable to the full path of the vtex binary.",
    );
  }
}
