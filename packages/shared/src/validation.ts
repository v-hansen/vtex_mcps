import type { ZodSchema, ZodError, ZodIssue } from "zod";

/**
 * Formats a single Zod issue into a human-readable error message.
 */
function formatIssue(issue: ZodIssue): string {
  const path = issue.path.length > 0 ? issue.path.join(".") : undefined;

  switch (issue.code) {
    case "invalid_type":
      if (issue.received === "undefined") {
        return path
          ? `Missing required field: '${path}'`
          : "Missing required value";
      }
      return path
        ? `Parameter '${path}' expected ${issue.expected}, got ${issue.received}`
        : `Expected ${issue.expected}, got ${issue.received}`;

    case "invalid_enum_value":
      return path
        ? `Parameter '${path}' must be one of: ${(issue as any).options.join(", ")}`
        : `Must be one of: ${(issue as any).options.join(", ")}`;

    case "too_small": {
      const min = (issue as any).minimum;
      const type = (issue as any).type;
      if (type === "string") {
        return path
          ? `Parameter '${path}' must have at least ${min} character(s)`
          : `Must have at least ${min} character(s)`;
      }
      return path
        ? `Parameter '${path}' must be >= ${min}`
        : `Must be >= ${min}`;
    }

    case "too_big": {
      const max = (issue as any).maximum;
      const type = (issue as any).type;
      if (type === "string") {
        return path
          ? `Parameter '${path}' must have at most ${max} character(s)`
          : `Must have at most ${max} character(s)`;
      }
      return path
        ? `Parameter '${path}' must be <= ${max}`
        : `Must be <= ${max}`;
    }

    case "invalid_string": {
      const validation = (issue as any).validation;
      if (validation === "regex" || (typeof validation === "object" && "regex" in validation)) {
        return path
          ? `Parameter '${path}' does not match required pattern`
          : "Does not match required pattern";
      }
      return path
        ? `Parameter '${path}': invalid string (${validation})`
        : `Invalid string (${validation})`;
    }

    default:
      return path
        ? `Parameter '${path}': ${issue.message}`
        : issue.message;
  }
}

/**
 * Validates parameters against a Zod schema.
 *
 * Returns `{ success: true, data }` when valid, or
 * `{ success: false, errors }` with descriptive messages for each violation.
 */
export function validateParams(
  params: Record<string, unknown>,
  schema: ZodSchema,
): { success: true; data: Record<string, unknown> } | { success: false; errors: string[] } {
  const result = schema.safeParse(params);

  if (result.success) {
    return { success: true, data: result.data as Record<string, unknown> };
  }

  const errors = (result.error as ZodError).issues.map(formatIssue);
  return { success: false, errors };
}
