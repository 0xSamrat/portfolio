# 0xsamrat.com

Personal site for Samrat Mukherjee — AI Engineer / AI Agent Developer.
Next.js 16 (App Router, Turbopack), React 19, Tailwind v4 tokens + hand-written CSS.

Two audiences, one source of truth: people read the pages, agents read the Markdown
and JSON surfaces derived from the same data.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npx next start       # production build
```

## Editing content

**Everything lives in [`app/content/profile.ts`](app/content/profile.ts).** That file is the
single source of truth for the pages *and* for every machine-readable surface, so the
text an agent reads can never drift from the text a person sees.

| Edit this export | Updates |
|---|---|
| `IDENTITY` | hero, meta description, JSON-LD, llms.txt, agent card |
| `METRICS` | proof strip, OG image, work-page metrics, SKILL.md |
| `PILLARS` | "How I build agents" section |
| `ROLES` | homepage Experience, `/work`, `EmployeeRole` JSON-LD |
| `PROJECTS` | work grid, `/work`, `ItemList` JSON-LD, projects feed |
| `SKILLS` | `/work` skills table, `knowsAbout`, WebMCP `get_skills` |
| `TIMELINE` | Journey section |
| `FAQ` | `/agent`, `FAQPage` JSON-LD, SKILL.md |
| `WHEN_TO_USE` | llms.txt, agents.md, SKILL.md — this is what the `agent-instruction` check reads |
| `ROUTES` | nav, sitemap, Markdown twins, the 404 route list |
| `CONTENT_UPDATED` | `lastmod` in the sitemap and Markdown frontmatter |

After a content change, bump `CONTENT_UPDATED` so `sitemap-lastmod` stays honest.

## Architecture

```
app/content/profile.ts   typed résumé data — the source of truth
app/lib/markdown.ts      profile → Markdown documents, keyed by route
app/lib/jsonld.ts        profile → schema.org @graph
app/lib/catalogs.ts      profile → ARD / AI Catalog / A2A card / SKILL.md / NLWeb feeds
app/lib/responses.ts     shared Response builders with the right headers
proxy.ts                 Accept negotiation, Link headers, agent 404
```

`middleware.ts` **is deprecated in Next 16** — the file convention is now `proxy.ts`.

## Agent readiness

The site is built to score on [is-agentic.com](https://is-agentic.com) (Vercel, scanned by
[Ora](https://ora.ai)). Measured baseline before this rebuild: **68/100**.

Scoring, from `GET https://ora.ai/api/checks?include=essentials`: required checks share
an 80-point pool, recommended checks share 20, and emerging signals add up to a 5-point
bonus. **Not-applicable checks are excluded rather than failed**, so each pool is divided
by however many checks are actually eligible — which is why adding a surface you cannot
support properly *lowers* the score.

### Deliberately not implemented

These would each reduce the score:

- **No remote MCP server.** Publishing one activates seven essentials-*required* checks,
  including `mcp-oauth-metadata` and `mcp-pkce-s256`, which need a real OAuth
  authorization server. The required pool would grow from 7 checks to 14.
  [WebMCP](app/components/WebMcp.tsx) gives the same capability with no required-pool risk.
- **No OpenAPI spec / REST API.** Activates ~11 `applicability: api` checks (versioning,
  pagination, rate-limit headers, idempotency, batch, async-job) into the 20-point
  recommended pool, diluting it faster than the 1–2 checks it would win.
- **No `/pricing`, no payment protocols.** Would activate `pricing-info` and mean
  publishing rates that aren't real.
- **No bot-UA Markdown sniffing.** Serving Markdown based on user agent risks the
  `content-no-js` and `ax-*` checks (~11 points) to gain one 0.25 bonus signal.
  Negotiation stays explicit, via `Accept`.

### Machine-readable surfaces

| Path | What it is |
|---|---|
| `/llms.txt` | index, with the "When to use this profile" section |
| `/llms-full.txt` | the entire profile in one fetch |
| `/llms/{experience,projects,skills,contact}.txt` | scoped per-area documents |
| `/agents.md` | how an agent should read, cite and act on the site |
| `/index.md`, `/about.md`, `/work.md`, `/contact.md`, `/agent.md`, `/privacy.md` | Markdown twin of each page |
| `/.well-known/ard.json` | Agentic Resource Discovery catalog (+ `ai-catalog.json` alias) |
| `/.well-known/agent-card.json` | A2A agent card |
| `/.well-known/agent-skills/index.json` | Agent Skills index v0.2.0, with a SHA-256 digest |
| `/sitemap.xml`, `/robots.txt`, `/schema-map.xml`, `/feeds/*.jsonl` | discovery + NLWeb feeds |

Every HTML page also answers content negotiation:

```bash
curl -H 'Accept: text/markdown' https://0xsamrat.com/   # Markdown + Vary: Accept
curl https://0xsamrat.com/?mode=agent                   # same, without headers
curl -i -H 'Accept: text/markdown' https://0xsamrat.com/nope   # 404 + Markdown body
```

### Verifying

```bash
npm run build && npx next start -p 3222
./scripts/verify-agent-readiness.sh http://127.0.0.1:3222
```

Current local result: **29 passed, 0 failed, 30 bonus signals** (the bonus pool caps at
20 signals, so there is headroom).

Two checks cannot be verified locally or forced by code, because they depend on what a
live web search returns for the name:

- `brand-search-accuracy` — a plain search for the brand should return this domain.
- `agentic-search-specific` — developer resources should surface in a name-based search.

Together they are worth ~4.4 points. The 5-point bonus pool is what covers them, and
they should improve on their own once the new sitemap and structured data are indexed.

After deploying, re-scan:

```bash
npx is-agentic 0xsamrat.com
# or
curl -X POST "https://ora.ai/api/scan?include=essentials" \
  -H "Content-Type: application/json" -d '{"url":"https://0xsamrat.com"}'
```

## Notes

- `is-agentic-site-type` is declared as `business` in [`app/layout.tsx`](app/layout.tsx).
  It selects which check lens the report shows first; it does not change the score.
- Reveal-on-scroll never hides content by default — JS hides a timeline item only while
  it is below the fold, with a 3s failsafe. A renderer whose IntersectionObserver never
  fires still sees everything. See [`JourneyEvent.tsx`](app/components/JourneyEvent.tsx).
- The phone number from the résumé is deliberately **not** published here; JSON-LD
  `contactPoint` carries the email only.
