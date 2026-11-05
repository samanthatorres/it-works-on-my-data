# It Works on My Data: starter instructions

These are the instruction files from my talk, ready to drop into a project. There are two matching sets, so pick the one that fits how you build:

- `python/` - uv, ruff, mypy, pytest, pydantic and pandera, tenacity
- `javascript/` - **TypeScript** on Node.js, with pnpm, Biome, vitest, zod, p-retry

Both sets cover the same habits. Only the tools change.

Writing plain JavaScript instead of TypeScript? Use the `javascript/` set and delete the `tsc` step from its `AGENTS.md`. The rest still applies.

## Before you copy anything

Check what you're allowed to do with your data. If a tool you build touches GSC, GA, crawl exports or client files, make sure your company or client is ok with that data going through an AI coding tool (and through any API your script calls). These files can't answer that question for you - but the `plan-a-tool` skill will at least ask it.

## What's in each set

| File | Think of it as | What it does |
| --- | --- | --- |
| `AGENTS.md` | Your onboarding doc | The project, the rules, and what "done" means |
| `CLAUDE.md` | The pointer | Pulls in `AGENTS.md` for Claude Code, plus a couple of Claude-only notes |
| `.claude/skills/plan-a-tool/SKILL.md` | The SOP binder | Run `/plan-a-tool` to scope a new script and save a `PLAN.md` before any code gets written |
| `.claude/rules/example-client.md` | Special notes | Client or project details that load only when Claude works in that folder |
| `.claude/settings.json` + `.claude/hooks/` | Access rules | Blocks Claude from reading or editing `.env` files and credential JSON |
| `.gitignore` | The bouncer | Keeps secrets and real data out of git from the first commit |

## How to use it

1. Copy everything inside `python/` or `javascript/` into the root of your project, including the hidden `.claude/` folder and `.gitignore`.
2. Fill in the [bracketed] parts of `AGENTS.md` and delete anything that doesn't apply.
3. Rename `.claude/rules/example-client.md` and change its `paths` to match your client's folder (or delete it if you don't work that way).
4. Commit it all, so your next session starts with it.

## Where each piece falls short

**AGENTS.md is guidance, not enforcement.** The agent reads it and usually follows it. Usually. Keep it under 200 lines, because longer files get followed less consistently, and add a rule whenever you find yourself correcting the same thing twice.

**AGENTS.md vs. CLAUDE.md.** Recent versions of Claude Code read `AGENTS.md` directly, and so do a lot of other coding agents. `CLAUDE.md` imports it anyway (that's the `@AGENTS.md` line) so older versions still pick it up, and so you have somewhere to put Claude-only notes. Everything under `.claude/` only works in Claude Code. Other tools ignore it.

**The skill only runs when you ask for it.** I set it so it doesn't kick in on its own, because a planning step on every small fix gets old fast. Type `/plan-a-tool` and describe what you want to build.

**Path-scoped rules only load when Claude touches matching files.** If the work happens outside that folder, the notes never load.

**The hook has a gap.** It blocks Claude's read and edit tools from opening secret files, but a shell command like `cat .env` goes right around it. Treat it as a seatbelt, not a vault: keep real keys out of the project folder where you can, and rotate any key that ever gets committed. It also needs Python 3 (Python set) or Node (JS set) on your machine. On Windows, you may need to change `python3` to `python` in `.claude/settings.json`.

## Testing what your tools touch

Need sample pages to test against? [openseotest.org](https://openseotest.org) by Serge Bezborodov is a GitHub repo of sample pages and scenarios built for testing SEO issues. It beats building your own fixtures from scratch.

Now go make something that works on more than just your data.
