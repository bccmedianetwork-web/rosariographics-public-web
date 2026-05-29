/**
 * Structured JSON logger for serverless environments.
 *
 * Usage:
 *   import { log } from "@/lib/logger";
 *   log.error("Error sending email", { err, email: "a@b.com" });
 *   log.info("Lead inserted", { leadNumber: 42 });
 *
 * Output format (written to stderr for platform capture):
 *   {"timestamp":"2026-05-26T10:00:00.000Z","level":"error","message":"...", ...attrs}
 */

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

function write(level, message, attrs = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...attrs,
  };

  const output = JSON.stringify(entry, null, 0);

  if (level === "error" || level === "warn") {
    console.error(output);
  } else {
    console.log(output);
  }
}

export const log = {
  debug: (msg, attrs) => write("debug", msg, attrs),
  info: (msg, attrs) => write("info", msg, attrs),
  warn: (msg, attrs) => write("warn", msg, attrs),
  error: (msg, attrs) => write("error", msg, attrs),
};
