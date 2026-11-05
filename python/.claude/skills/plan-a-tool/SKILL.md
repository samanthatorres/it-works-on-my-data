---
name: plan-a-tool
description: Scope and plan a new SEO script or tool before any code is written, then save the plan to PLAN.md for approval.
disable-model-invocation: true
argument-hint: "[what you want to build]"
---

# Plan a tool

Do not write or change any code while this skill is running. The output is a plan, not an implementation.

## 1. Check the data first
Ask which data the tool will touch (GSC, GA, crawl exports, CRM, client files) and confirm the user is allowed to use it with this tool and any API it calls. If they aren't sure, stop and say so.

## 2. Scope it
Work out each of these from the request and the repo. Ask only about what's missing, all in one message:

- **Inputs:** file type, columns, rough size
- **Outputs:** format, columns, where it's saved
- **Edge cases:** redirects, trailing slashes, parameters, non-200s, empty cells, non-English characters
- **Acceptance criteria:** what must be true for this to count as done
- **Constraints:** rate limits, API access, allowed libraries
- **Focus:** if the request is really several jobs, list them and ask which one comes first

## 3. Write PLAN.md
Create or update `PLAN.md` in the project root with these sections:

1. Goal (one sentence)
2. Inputs and outputs
3. Edge cases
4. Acceptance criteria
5. Files to create or change
6. Approach (short numbered steps)
7. Guardrails: timeouts, retries, rate limits, and crawl or pagination limits, where they apply
8. Tests: a sample in `data/sample/` with expected output, plus fixtures for the edge cases
9. Open questions and decisions

## 4. Stop and wait
Show the plan and list the open questions. Wait for the user to approve or change it before writing any code.
