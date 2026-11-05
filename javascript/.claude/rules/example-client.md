---
paths:
  - "clients/example-client/**"
---

# Example Client: project notes

These load only when Claude works on files in `clients/example-client/`. Copy this file once per client or project and replace the details.

- Their firewall blocks more than [2] requests per second. Rate limit every crawl to [1] request per second.
- Always use the `www.` host. The bare domain redirects.
- `?sort=` and `?filter=` URLs are faceted navigation. Never crawl them.
- Staging sits behind basic auth. Credentials are in `.env` as `EXAMPLE_STAGING_USER` and `EXAMPLE_STAGING_PASS`.
- Their data is covered by an NDA. Don't send page content or exports to any external API without asking me first.
