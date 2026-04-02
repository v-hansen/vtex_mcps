import { describe, it, expect, vi } from "vitest";
import {
  tools,
  workspaceNameSchema,
  appNameSchema,
  releaseTypeSchema,
  csvFilePathSchema,
} from "../src/tools.js";
import type { CommandOutput } from "../src/cli-executor.js";

// ---------------------------------------------------------------------------
// Shared mock setup
// ---------------------------------------------------------------------------

/** Default successful CommandOutput returned by the mock executor. */
const successOutput: CommandOutput = {
  stdout: "ok",
  stderr: "",
  exitCode: 0,
  success: true,
};

/**
 * Create a fresh mock executor and the tool list wired to it.
 */
function setup() {
  const mockExecuteCommand = vi
    .fn<(...args: unknown[]) => Promise<CommandOutput>>()
    .mockResolvedValue(successOutput);
  const toolList = tools({ executeCommand: mockExecuteCommand as any });
  return { mockExecuteCommand, toolList };
}

/** Find a tool by name or throw. */
function findTool(toolList: ReturnType<typeof tools>, name: string) {
  const tool = toolList.find((t) => t.name === name);
  if (!tool) throw new Error(`Tool "${name}" not found`);
  return tool;
}

// ===========================================================================
// 1. Correct CLI command construction — spot-check per domain
// ===========================================================================

describe("Correct CLI command construction", () => {
  // -- Workspace domain --
  it("vtex_cli_workspace_list → executeCommand('workspace', ['list'])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_workspace_list");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("workspace", ["list"]);
  });

  // -- App Dev domain: unlink with appName --
  it("vtex_cli_unlink with appName → executeCommand('unlink', [appName])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_unlink");

    await tool.handler({ appName: "vendor.myapp" });

    expect(mockExecuteCommand).toHaveBeenCalledWith("unlink", ["vendor.myapp"]);
  });

  // -- App Dev domain: unlink without appName --
  it("vtex_cli_unlink without appName → executeCommand('unlink', ['--all'])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_unlink");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("unlink", ["--all"]);
  });

  // -- Publishing domain --
  it("vtex_cli_publish → executeCommand('publish', [])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_publish");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("publish", []);
  });

  // -- Account domain --
  it("vtex_cli_whoami → executeCommand('whoami', [])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_whoami");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("whoami", []);
  });

  // -- Dependencies domain: deps_update with appName --
  it("vtex_cli_deps_update with appName → executeCommand('deps', ['update', appName])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_deps_update");

    await tool.handler({ appName: "vendor.dep@1.0.0" });

    expect(mockExecuteCommand).toHaveBeenCalledWith("deps", [
      "update",
      "vendor.dep@1.0.0",
    ]);
  });

  // -- Dependencies domain: deps_update without appName --
  it("vtex_cli_deps_update without appName → executeCommand('deps', ['update'])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_deps_update");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("deps", ["update"]);
  });

  // -- Navigation domain: logs with timeout --
  it("vtex_cli_logs → executeCommand with timeout option of 30000", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_logs");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("logs", [], {
      timeout: 30000,
    });
  });

  // -- Redirects domain --
  it("vtex_cli_url → executeCommand('url', [])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_url");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("url", []);
  });

  // -- Edition domain --
  it("vtex_cli_init → executeCommand('init', [])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_init");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("init", []);
  });
});

// ===========================================================================
// 2. Optional parameter handling
// ===========================================================================

describe("Optional parameter handling", () => {
  it("vtex_cli_browse with path → executeCommand('browse', [path])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_browse");

    await tool.handler({ path: "/admin" });

    expect(mockExecuteCommand).toHaveBeenCalledWith("browse", ["/admin"]);
  });

  it("vtex_cli_browse without path → executeCommand('browse', [])", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_browse");

    await tool.handler({});

    expect(mockExecuteCommand).toHaveBeenCalledWith("browse", []);
  });

  it("vtex_cli_logs with appName → executeCommand('logs', [appName], { timeout: 30000 })", async () => {
    const { mockExecuteCommand, toolList } = setup();
    const tool = findTool(toolList, "vtex_cli_logs");

    await tool.handler({ appName: "vendor.logger" });

    expect(mockExecuteCommand).toHaveBeenCalledWith("logs", ["vendor.logger"], {
      timeout: 30000,
    });
  });
});

// ===========================================================================
// 3. Zod schema rejection — invalid inputs
// ===========================================================================

describe("Zod schema rejection", () => {
  it('workspaceNameSchema rejects "my workspace" (has space)', () => {
    const result = workspaceNameSchema.safeParse("my workspace");
    expect(result.success).toBe(false);
  });

  it('appNameSchema rejects "invalid-app" (no dot)', () => {
    const result = appNameSchema.safeParse("invalid-app");
    expect(result.success).toBe(false);
  });

  it('releaseTypeSchema rejects "hotfix"', () => {
    const result = releaseTypeSchema.safeParse("hotfix");
    expect(result.success).toBe(false);
  });

  it('csvFilePathSchema rejects "" (empty string)', () => {
    const result = csvFilePathSchema.safeParse("");
    expect(result.success).toBe(false);
  });
});
