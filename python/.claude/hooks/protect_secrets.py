#!/usr/bin/env python3
"""Claude Code PreToolUse hook: block reading or editing secret files.

Claude Code sends the tool call as JSON on stdin. Exit code 2 blocks the call
and shows the message on stderr to Claude. Exit code 0 lets it continue.
"""

import json
import sys
from pathlib import PurePath

# Template files that are safe to read and edit.
ALLOWED = {".env.example", ".env.sample", ".env.template"}


def is_secret(path: str) -> bool:
    name = PurePath(path).name.lower()
    if not name or name in ALLOWED:
        return False
    if name == ".env" or name.startswith(".env.") or name.endswith(".env"):
        return True
    if name.endswith(".json") and any(
        word in name for word in ("credentials", "service-account", "service_account")
    ):
        return True
    return False


def main() -> None:
    try:
        event = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)  # Not a tool call we understand. Don't block it.

    path = event.get("tool_input", {}).get("file_path", "")
    if is_secret(path):
        print(
            f"Blocked by protect_secrets hook: {PurePath(path).name} holds secrets. "
            "Don't read or edit it. Load values with python-dotenv, and ask me for "
            "the variable name if you need one.",
            file=sys.stderr,
        )
        sys.exit(2)

    sys.exit(0)


if __name__ == "__main__":
    main()
