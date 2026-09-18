# Portfolio rebuild: AI Engineer positioning + 100/100 agent readiness

Date: 2026-09-18 · Branch: `che`

## Goals

1. Reposition the site from "backend & blockchain" to **AI Engineer / AI Agent Developer**, matching the
   current résumé.
2. Raise the visual design: tighter type, real proof (metrics), a proper experience section, and an
   agent-readable affordance that doubles as the portfolio's strongest credential.
3. Score **100/100 on is-agentic.com** and lift the underlying Ora score.
4. Improve SEO + AI-search discoverability (structured data, sitemap, crawlable subpages).

## Measured baseline (2026-09-18)

Ran the real scanner against the live site:

- `POST https://ora.ai/api/scan?include=essentials` → **is-agentic essentials 68/100**, Ora full score **23 (F)**.
- robots.txt → 404. llms.txt → 404. No sitemap, no JSON-LD, no canonical, no OG image.

### How the score actually works (from `GET https://ora.ai/api/checks?include=essentials`)

is-agentic re-reads Ora's 125-check catalog through an "essentials" lens:

| Pool | Points | Eligible for this site | Passing at baseline |
|---|---|---|---|
| Required | 80 | 7 | 5 |
| Recommended | 20 | 9 | 1 |
| Bonus (emerging) | ≤5, 0.25/signal | ~30 candidates | 4 (+1 partial) |

`62.9 + 4.4 + 1.1 = 68.4` → 68. Confirmed against the live response.

Not-applicable checks are **excluded, not failed** — so each pool is divided by however many checks are
*eligible*. One required check = `80/7 = 11.43` pts. One recommended = `20/9 = 2.22` pts.

### The two failing required checks

| Check | Gain | Requirement |
|---|---|---|
| `markdown-negotiation-vary` | +11.4 | Homepage must return `text/markdown` + `Vary: Accept` for `Accept: text/markdown`, HTML otherwise |
| `agent-friendly-404` | +5.7 | Real 404 status **and** a Markdown error body pointing at sitemap/llms.txt |

### The failing recommended checks

`sitemap`, `json-ld`, `agent-instruction`, `org-schema-completeness`, `metadata-completeness` (0.5),
`trust-anchors` (0.5) — all fully in our control. `page-token-budget` already passes and must not regress.

`brand-search-accuracy` and `agentic-search-specific` are **external** — they depend on what a live web
search returns. We can only improve the odds (consistent naming, `sameAs`, indexable subpages, predictable
URLs linked from llms.txt).

### Path to 100 without the two search checks

```
required     7/7  →  80.00
recommended  7/9  →  15.56
bonus        cap  →   5.00
                    -------
                    100.56  → 100
```

So the plan is: **win every controllable check, then bank ≥20 bonus signals** to cover the two
search-dependent ones. Margin is only 0.56 pts, so we over-provision bonus signals.

### Deliberate exclusions (these would LOWER the score)

- **No remote MCP server.** Publishing one activates 7 *essentials-required* checks, including
  `mcp-oauth-metadata` and `mcp-pkce-s256`, which demand a real OAuth authorization server. The required
  pool would grow 7 → 14 and we would lose ~11 pts. We use **WebMCP** instead: `essentialsBonusOnly`, so
  it is pure upside, and worth 5 pts on the full Ora score.
- **No OpenAPI spec / REST API.** Activates ~11 `applicability: api` checks (versioning, pagination,
  rate-limit headers, idempotency, batch, async-job…) into the 20-pt recommended pool, diluting it far
  faster than the 1–2 checks we would gain.
- **No `/pricing`, no payments protocols.** Would activate `pricing-info` (recommended, 3 pts) and mean
  inventing rates. Not worth the dilution risk, and we would be fabricating facts.

## Architecture

Single source of truth: **`app/content/profile.ts`**. Every human surface (pages) and every machine surface
(llms.txt, Markdown variants, JSON-LD, sitemap, ARD catalog, agent card) is derived from it, so the
agent-facing text can never drift from the rendered page.

```
app/content/profile.ts      typed résumé data
app/lib/markdown.ts         profile → Markdown documents, keyed by route
app/lib/jsonld.ts           profile → schema.org @graph
proxy.ts                    Accept negotiation, bot-UA markdown, Link headers, agent 404
```

`middleware.ts` is **deprecated in Next 16 — the file convention is now `proxy.ts`** (verified in
`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`).

## Phases

### 0. Routing spikes
Confirm `app/llms.txt/route.ts` (dotted segment) and `/.well-known/*` serving work in this Next version.
Fall back to `next.config.ts` rewrites for `.well-known` if the dot-prefixed path is not routable.

### 1. Content layer
`profile.ts` from the résumé: identity, summary, skills (6 groups), 4 roles with bullets, 4 projects,
3 achievements, education, metrics, links, journey timeline.

### 2. Design + repositioning
- Hero → AI agents that take real actions; new sub, new CTAs.
- **Proof strip** (new): 88% answer coverage, 28% LLM cost cut, 749 tests, ~15× Redis reduction.
- **How I build agents** (replaces WhatIDo): orchestration · grounded retrieval · evals & observability ·
  reliability.
- **Experience** (new): Shortlistapp, Atum Labs, Defipe, TechExactly with outcome bullets.
- Work grid → Shortlistapp.co, Icebreakr, Stockpot, NetagiriFiles, each with a headline metric.
- Journey + Currently updated to the AI stack.
- Design system: tighter type scale, hairline rules, dot-grid texture, secondary "signal" colour for
  metrics, `prefers-reduced-motion` guard, skip link, `aria-current` on nav.

### 3. New pages
`/about`, `/contact`, `/privacy` (trust anchors, ≥500 chars each), `/work`, `/agent` (agent-mode view),
and a designed `not-found.tsx`.

### 4. Machine surfaces
`/llms.txt` (with a **"When to use this"** section → `agent-instruction`), `/llms-full.txt`, modular
`/llms/*.txt`, `/index.md` + one `.md` per page, `/agents.md`, `/.well-known/ard.json`,
`/.well-known/ai-catalog.json`, `/.well-known/agent-card.json`, `sitemap.ts` (with `lastmod`), `robots.ts`.

### 5. proxy.ts
Accept negotiation on HTML routes · bot-UA markdown · `Link` headers (RFC 8288) · Markdown 404 with a real
404 status · `Vary: Accept` everywhere.

### 6. Metadata + OG
`metadataBase`, canonical, `og:type`, `og:image` via generated `opengraph-image.tsx`,
`alternates.types['text/markdown']`, `is-agentic-site-type` meta, JSON-LD `@graph`
(Person · Organization w/ contactPoint + address · WebSite · ProfilePage · BreadcrumbList · ItemList)
→ satisfies `json-ld`, `org-schema-completeness`, `json-ld-entity-linking` (sameAs), `schema-type-breadth`.

### 7. WebMCP
In-page tools via `document.modelContext.registerTool()` with a `navigator.modelContext` fallback:
`get_profile`, `list_projects`, `get_experience`, `get_contact`.

### 8–9. Verify
Production build → headless-Chrome screenshots at desktop/mobile, light/dark → fix. Then a local
verification script asserting each check's documented criteria against `next start`.

## Caveats to raise with Samrat

- The score only moves **after deploying to 0xsamrat.com**; local verification is a proxy for it.
- `brand-search-accuracy` / `agentic-search-specific` depend on external search indexing and may lag a
  deploy by days or weeks. The 5-pt bonus pool is what covers them.
- Code fences in generated Markdown must stay valid and language-tagged, or `code-fence-validity`
  activates as a *failing* recommended check.
