#!/usr/bin/env node
// Claude Code PreToolUse hook: block reading or editing secret files.
//
// Claude Code sends the tool call as JSON on stdin. Exit code 2 blocks the call
// and shows the message on stderr to Claude. Exit code 0 lets it continue.

import { basename } from "node:path";

// Template files that are safe to read and edit.
const ALLOWED = new Set([".env.example", ".env.sample", ".env.template"]);

function isSecret(path) {
  const name = basename(path || "").toLowerCase();
  if (!name || ALLOWED.has(name)) return false;
  if (name === ".env" || name.startsWith(".env.") || name.endsWith(".env")) return true;
  if (
    name.endsWith(".json") &&
    ["credentials", "service-account", "service_account"].some((word) => name.includes(word))
  ) {
    return true;
  }
  return false;
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let event;
  try {
    event = JSON.parse(input);
  } catch {
    process.exit(0); // Not a tool call we understand. Don't block it.
  }

  const path = event?.tool_input?.file_path ?? "";
  if (isSecret(path)) {
    process.stderr.write(
      `Blocked by protect-secrets hook: ${basename(path)} holds secrets. ` +
        "Don't read or edit it. Load values with node --env-file or dotenv, " +
        "and ask me for the variable name if you need one.\n",
    );
    process.exit(2);
  }

  process.exit(0);
});
