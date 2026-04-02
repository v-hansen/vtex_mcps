import type { ToolDefinition, ToolResult } from "@vtex-mcp/shared";
import type { CommandOutput } from "./cli-executor.js";
import { executeCommand } from "./cli-executor.js";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Shared Zod schemas
// ---------------------------------------------------------------------------

/** Workspace name: alphanumeric characters and hyphens only. */
export const workspaceNameSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9-]+$/,
    "Workspace name must contain only alphanumeric characters and hyphens",
  );

/** App name in VTEX format: vendor.appname or vendor.appname@major.minor.patch */
export const appNameSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(@\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?)?$/,
    "App name must follow VTEX format: vendor.appname or vendor.appname@version",
  );

/** Release type for versioning. */
export const releaseTypeSchema = z.enum(["major", "minor", "patch"]);

/** CSV file path (non-empty string). */
export const csvFilePathSchema = z.string().min(1, "CSV file path is required");

// ---------------------------------------------------------------------------
// CommandOutput → ToolResult mapping
// ---------------------------------------------------------------------------

/**
 * Convert a {@link CommandOutput} from the CLI executor into an MCP
 * {@link ToolResult}.
 *
 * Mapping rules:
 * - `exitCode !== 0` → `isError: true`, text includes stderr and exit code.
 * - `exitCode === 0` with non-empty stderr → stdout + warnings from stderr.
 * - `exitCode === 0` with empty stderr → stdout only.
 */
export function commandOutputToToolResult(output: CommandOutput): ToolResult {
  if (output.exitCode !== 0) {
    const text = `Command failed (exit code ${output.exitCode}):\n${output.stderr}`;
    return {
      content: [{ type: "text" as const, text }],
      isError: true,
    };
  }

  if (output.stderr.trim().length > 0) {
    const text = `${output.stdout}\n\nWarnings:\n${output.stderr}`;
    return {
      content: [{ type: "text" as const, text }],
    };
  }

  return {
    content: [{ type: "text" as const, text: output.stdout }],
  };
}

// ---------------------------------------------------------------------------
// Tool definitions
// ---------------------------------------------------------------------------

/**
 * Return the full list of MCP tool definitions for the VTEX CLI server.
 *
 * @param executor - Object exposing `executeCommand` for running CLI commands.
 * @returns Array of {@link ToolDefinition}.
 */
export function tools(
  executor: { executeCommand: typeof executeCommand },
): ToolDefinition[] {
  return [
    // ----- Workspace tools ------------------------------------------------
    {
      name: "vtex_cli_workspace_list",
      description:
        "List all available workspaces in the current VTEX account.\nExecutes: vtex workspace list",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("workspace", ["list"]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_workspace_create",
      description:
        "Create a new workspace in the current VTEX account.\nExecutes: vtex workspace create {workspaceName}",
      inputSchema: z.object({
        workspaceName: workspaceNameSchema.describe(
          "Name of the workspace to create (alphanumeric and hyphens only)",
        ),
      }),
      handler: async (params) => {
        const { workspaceName } = params as { workspaceName: string };
        const output = await executor.executeCommand("workspace", [
          "create",
          workspaceName,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_workspace_delete",
      description:
        "Delete an existing workspace from the current VTEX account.\nExecutes: vtex workspace delete {workspaceName}",
      inputSchema: z.object({
        workspaceName: workspaceNameSchema.describe(
          "Name of the workspace to delete (alphanumeric and hyphens only)",
        ),
      }),
      handler: async (params) => {
        const { workspaceName } = params as { workspaceName: string };
        const output = await executor.executeCommand("workspace", [
          "delete",
          workspaceName,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_workspace_use",
      description:
        "Switch to a different workspace.\nExecutes: vtex use {workspaceName}",
      inputSchema: z.object({
        workspaceName: workspaceNameSchema.describe(
          "Name of the workspace to switch to (alphanumeric and hyphens only)",
        ),
      }),
      handler: async (params) => {
        const { workspaceName } = params as { workspaceName: string };
        const output = await executor.executeCommand("use", [workspaceName]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_workspace_reset",
      description:
        "Reset a workspace to a clean state.\nExecutes: vtex workspace reset {workspaceName}",
      inputSchema: z.object({
        workspaceName: workspaceNameSchema.describe(
          "Name of the workspace to reset (alphanumeric and hyphens only)",
        ),
      }),
      handler: async (params) => {
        const { workspaceName } = params as { workspaceName: string };
        const output = await executor.executeCommand("workspace", [
          "reset",
          workspaceName,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_workspace_status",
      description:
        "Show information about the current workspace.\nExecutes: vtex workspace status",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("workspace", ["status"]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_workspace_promote",
      description:
        "Promote the current workspace to master.\nExecutes: vtex workspace promote",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("workspace", ["promote"]);
        return commandOutputToToolResult(output);
      },
    },

    // ----- App Development tools -------------------------------------------
    {
      name: "vtex_cli_link",
      description:
        "Link the current app in the working directory for local development.\nExecutes: vtex link",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("link", []);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_unlink",
      description:
        "Unlink a specific app or all linked apps from the current workspace.\nExecutes: vtex unlink {appName} or vtex unlink --all",
      inputSchema: z.object({
        appName: appNameSchema
          .describe(
            "Name of the app to unlink (vendor.appname or vendor.appname@version). If omitted, all apps are unlinked.",
          )
          .optional(),
      }),
      handler: async (params) => {
        const { appName } = params as { appName?: string };
        const args = appName ? [appName] : ["--all"];
        const output = await executor.executeCommand("unlink", args);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_list",
      description:
        "List installed and linked apps in the current workspace.\nExecutes: vtex list",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("list", []);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_install",
      description:
        "Install an app in the current workspace.\nExecutes: vtex install {appName}",
      inputSchema: z.object({
        appName: appNameSchema.describe(
          "Name of the app to install (vendor.appname or vendor.appname@version)",
        ),
      }),
      handler: async (params) => {
        const { appName } = params as { appName: string };
        const output = await executor.executeCommand("install", [appName]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_uninstall",
      description:
        "Uninstall an app from the current workspace.\nExecutes: vtex uninstall {appName}",
      inputSchema: z.object({
        appName: appNameSchema.describe(
          "Name of the app to uninstall (vendor.appname or vendor.appname@version)",
        ),
      }),
      handler: async (params) => {
        const { appName } = params as { appName: string };
        const output = await executor.executeCommand("uninstall", [appName]);
        return commandOutputToToolResult(output);
      },
    },

    // ----- Publishing and Deployment tools ---------------------------------
    {
      name: "vtex_cli_publish",
      description:
        "Publish the current app in the working directory.\nExecutes: vtex publish",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("publish", []);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_deploy",
      description:
        "Deploy the current app in the working directory.\nExecutes: vtex deploy",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("deploy", []);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_release",
      description:
        "Release a new version of the current app.\nExecutes: vtex release {releaseType}",
      inputSchema: z.object({
        releaseType: releaseTypeSchema.describe(
          "Release type: major, minor, or patch",
        ),
      }),
      handler: async (params) => {
        const { releaseType } = params as { releaseType: string };
        const output = await executor.executeCommand("release", [releaseType]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_deprecate",
      description:
        "Deprecate a VTEX app.\nExecutes: vtex deprecate {appName}",
      inputSchema: z.object({
        appName: appNameSchema.describe(
          "Name of the app to deprecate (vendor.appname or vendor.appname@version)",
        ),
      }),
      handler: async (params) => {
        const { appName } = params as { appName: string };
        const output = await executor.executeCommand("deprecate", [appName]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_undeprecate",
      description:
        "Remove deprecation from a VTEX app.\nExecutes: vtex undeprecate {appName}",
      inputSchema: z.object({
        appName: appNameSchema.describe(
          "Name of the app to undeprecate (vendor.appname or vendor.appname@version)",
        ),
      }),
      handler: async (params) => {
        const { appName } = params as { appName: string };
        const output = await executor.executeCommand("undeprecate", [appName]);
        return commandOutputToToolResult(output);
      },
    },

    // ----- Account and Authentication tools --------------------------------
    {
      name: "vtex_cli_whoami",
      description:
        "Show the current logged-in account, workspace, and email.\nExecutes: vtex whoami",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("whoami", []);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_switch",
      description:
        "Switch to a different VTEX account.\nExecutes: vtex switch {accountName}",
      inputSchema: z.object({
        accountName: z
          .string()
          .min(1, "Account name is required")
          .describe("Name of the VTEX account to switch to"),
      }),
      handler: async (params) => {
        const { accountName } = params as { accountName: string };
        const output = await executor.executeCommand("switch", [accountName]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_login",
      description:
        "Log in to a VTEX account.\nExecutes: vtex login {accountName}",
      inputSchema: z.object({
        accountName: z
          .string()
          .min(1, "Account name is required")
          .describe("Name of the VTEX account to log in to"),
      }),
      handler: async (params) => {
        const { accountName } = params as { accountName: string };
        const output = await executor.executeCommand("login", [accountName]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_logout",
      description:
        "Log out from the current VTEX account.\nExecutes: vtex logout",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("logout", []);
        return commandOutputToToolResult(output);
      },
    },

    // ----- Dependency and Configuration tools ------------------------------
    {
      name: "vtex_cli_deps_list",
      description:
        "List dependencies in the current workspace.\nExecutes: vtex deps list",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("deps", ["list"]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_deps_update",
      description:
        "Update dependencies in the current workspace, optionally for a specific app.\nExecutes: vtex deps update {appName} or vtex deps update",
      inputSchema: z.object({
        appName: appNameSchema
          .describe(
            "Name of the app to update dependencies for (vendor.appname or vendor.appname@version). If omitted, all dependencies are updated.",
          )
          .optional(),
      }),
      handler: async (params) => {
        const { appName } = params as { appName?: string };
        const args = appName ? ["update", appName] : ["update"];
        const output = await executor.executeCommand("deps", args);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_deps_diff",
      description:
        "Show dependency differences between workspaces.\nExecutes: vtex deps diff",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("deps", ["diff"]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_settings_set",
      description:
        "Set a configuration value for a VTEX app.\nExecutes: vtex settings set {appName} {fieldName} {value}",
      inputSchema: z.object({
        appName: z
          .string()
          .min(1, "App name is required")
          .describe("Name of the app to configure"),
        fieldName: z
          .string()
          .min(1, "Field name is required")
          .describe("Name of the configuration field to set"),
        value: z
          .string()
          .min(1, "Value is required")
          .describe("Value to set for the configuration field"),
      }),
      handler: async (params) => {
        const { appName, fieldName, value } = params as {
          appName: string;
          fieldName: string;
          value: string;
        };
        const output = await executor.executeCommand("settings", [
          "set",
          appName,
          fieldName,
          value,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_settings_get",
      description:
        "Get a configuration value for a VTEX app.\nExecutes: vtex settings get {appName} {fieldName}",
      inputSchema: z.object({
        appName: z
          .string()
          .min(1, "App name is required")
          .describe("Name of the app to get configuration from"),
        fieldName: z
          .string()
          .min(1, "Field name is required")
          .describe("Name of the configuration field to retrieve"),
      }),
      handler: async (params) => {
        const { appName, fieldName } = params as {
          appName: string;
          fieldName: string;
        };
        const output = await executor.executeCommand("settings", [
          "get",
          appName,
          fieldName,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_infra_list",
      description:
        "List available infrastructure services.\nExecutes: vtex infra list",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("infra", ["list"]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_infra_install",
      description:
        "Install an infrastructure service.\nExecutes: vtex infra install {serviceName}",
      inputSchema: z.object({
        serviceName: z
          .string()
          .min(1, "Service name is required")
          .describe("Name of the infrastructure service to install"),
      }),
      handler: async (params) => {
        const { serviceName } = params as { serviceName: string };
        const output = await executor.executeCommand("infra", [
          "install",
          serviceName,
        ]);
        return commandOutputToToolResult(output);
      },
    },

    // ----- Navigation and Debugging tools ----------------------------------
    {
      name: "vtex_cli_browse",
      description:
        "Open or return the URL for the current workspace, optionally at a specific path.\nExecutes: vtex browse {path} or vtex browse",
      inputSchema: z.object({
        path: z
          .string()
          .describe("Optional path to append to the workspace URL")
          .optional(),
      }),
      handler: async (params) => {
        const { path } = params as { path?: string };
        const args = path ? [path] : [];
        const output = await executor.executeCommand("browse", args);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_logs",
      description:
        "Capture recent log output for the current workspace or a specific app.\nExecutes: vtex logs {appName} or vtex logs",
      inputSchema: z.object({
        appName: appNameSchema
          .describe(
            "Name of the app to get logs for (vendor.appname or vendor.appname@version). If omitted, logs for all apps are captured.",
          )
          .optional(),
      }),
      handler: async (params) => {
        const { appName } = params as { appName?: string };
        const args = appName ? [appName] : [];
        const output = await executor.executeCommand("logs", args, {
          timeout: 30000,
        });
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_inspect",
      description:
        "Show detailed information about a VTEX app.\nExecutes: vtex inspect {appName}",
      inputSchema: z.object({
        appName: appNameSchema.describe(
          "Name of the app to inspect (vendor.appname or vendor.appname@version)",
        ),
      }),
      handler: async (params) => {
        const { appName } = params as { appName: string };
        const output = await executor.executeCommand("inspect", [appName]);
        return commandOutputToToolResult(output);
      },
    },

    // ----- Redirects and URL tools -----------------------------------------
    {
      name: "vtex_cli_redirects_import",
      description:
        "Import redirects from a CSV file.\nExecutes: vtex redirects import {csvFilePath}",
      inputSchema: z.object({
        csvFilePath: csvFilePathSchema.describe(
          "Path to the CSV file containing redirects to import",
        ),
      }),
      handler: async (params) => {
        const { csvFilePath } = params as { csvFilePath: string };
        const output = await executor.executeCommand("redirects", [
          "import",
          csvFilePath,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_redirects_export",
      description:
        "Export redirects to a CSV file.\nExecutes: vtex redirects export {csvFilePath}",
      inputSchema: z.object({
        csvFilePath: csvFilePathSchema.describe(
          "Path to the CSV file where redirects will be exported",
        ),
      }),
      handler: async (params) => {
        const { csvFilePath } = params as { csvFilePath: string };
        const output = await executor.executeCommand("redirects", [
          "export",
          csvFilePath,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_redirects_delete",
      description:
        "Delete redirects specified in a CSV file.\nExecutes: vtex redirects delete {csvFilePath}",
      inputSchema: z.object({
        csvFilePath: csvFilePathSchema.describe(
          "Path to the CSV file containing redirects to delete",
        ),
      }),
      handler: async (params) => {
        const { csvFilePath } = params as { csvFilePath: string };
        const output = await executor.executeCommand("redirects", [
          "delete",
          csvFilePath,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_url",
      description:
        "Return the base URL of the current workspace.\nExecutes: vtex url",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("url", []);
        return commandOutputToToolResult(output);
      },
    },

    // ----- Edition and Template tools --------------------------------------
    {
      name: "vtex_cli_edition_get",
      description:
        "Get the current account edition.\nExecutes: vtex edition get",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("edition", ["get"]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_edition_set",
      description:
        "Set the account edition.\nExecutes: vtex edition set {editionName}",
      inputSchema: z.object({
        editionName: z
          .string()
          .min(1, "Edition name is required")
          .describe("Name of the edition to set for the account"),
      }),
      handler: async (params) => {
        const { editionName } = params as { editionName: string };
        const output = await executor.executeCommand("edition", [
          "set",
          editionName,
        ]);
        return commandOutputToToolResult(output);
      },
    },
    {
      name: "vtex_cli_init",
      description:
        "List available templates for app creation.\nExecutes: vtex init",
      inputSchema: z.object({}),
      handler: async () => {
        const output = await executor.executeCommand("init", []);
        return commandOutputToToolResult(output);
      },
    },
  ];
}
