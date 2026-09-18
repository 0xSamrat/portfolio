/**
 * Derives every Markdown surface from `profile.ts`.
 *
 * These documents back four things:
 *   - the `.md` twin of each page (`/index.md`, `/about.md`, …)
 *   - `Accept: text/markdown` content negotiation in `proxy.ts`
 *   - `/llms.txt`, `/llms-full.txt` and the modular `/llms/*.txt`
 *   - the Markdown body of the 404 response
 *
 * Any fenced code block here must stay valid and language-tagged: invalid fences
 * turn `code-fence-validity` into a failing check rather than a passing one.
 */

import {
  ACHIEVEMENTS,
  CONTENT_UPDATED,
  EDUCATION,
  FAQ,
  IDENTITY,
  LINKS,
  METRICS,
  PILLARS,
  PROJECTS,
  ROLES,
  ROUTES,
  SAME_AS,
  SITE_URL,
  SKILLS,
  TIMELINE,
  WHEN_TO_USE,
  routeFor,
} from "../content/profile";

const { name, title, email, location, summary, availability, tagline } =
  IDENTITY;

function frontmatter(fields: Record<string, string>): string {
  const lines = Object.entries(fields).map(([k, v]) => `${k}: "${v}"`);
  return ["---", ...lines, "---", ""].join("\n");
}

function head(path: string): string {
  const route = routeFor(path);
  return frontmatter({
    title: route?.title ?? name,
    description: route?.description ?? summary,
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    author: name,
    updated: CONTENT_UPDATED,
  });
}

const CONTACT_BLOCK = [
  "## Contact",
  "",
  `- Email: ${email}`,
  `- Book a 15-minute call: ${LINKS.cal}`,
  `- Location: ${location.city}, ${location.country} (${location.timezone}, ${location.utcOffset})`,
  `- Availability: ${availability}`,
  `- Resume (PDF): ${LINKS.resume}`,
  "",
  "Reply time is same day, usually within a few hours. There is no contact form —",
  "email or the booking link are the two working paths.",
  "",
].join("\n");

const LINKS_BLOCK = [
  "## Elsewhere",
  "",
  `- GitHub: ${LINKS.github}`,
  `- LinkedIn: ${LINKS.linkedin}`,
  `- X: ${LINKS.x}`,
  `- Writing: ${LINKS.medium}`,
  "",
].join("\n");

function metricsBlock(): string {
  return [
    "## Numbers",
    "",
    ...METRICS.map((m) => `- **${m.value}** — ${m.label}. ${m.detail}`),
    "",
  ].join("\n");
}

function pillarsBlock(): string {
  return [
    "## How he builds agents",
    "",
    ...PILLARS.flatMap((p) => [
      `### ${p.title}`,
      "",
      p.body,
      "",
      `Stack: ${p.stack.join(", ")}`,
      "",
    ]),
  ].join("\n");
}

function skillsBlock(): string {
  return [
    "## Technical skills",
    "",
    ...SKILLS.map((s) => `- **${s.group}:** ${s.items.join(", ")}`),
    "",
  ].join("\n");
}

function rolesBlock(): string {
  return [
    "## Professional experience",
    "",
    ...ROLES.flatMap((r) => [
      `### ${r.title} — ${r.company} (${r.location})`,
      "",
      `${r.start} – ${r.end}`,
      "",
      r.blurb,
      "",
      ...r.bullets.map((b) => `- ${b}`),
      "",
      `Stack: ${r.stack.join(", ")}`,
      "",
    ]),
  ].join("\n");
}

function projectsBlock(): string {
  return [
    "## Projects",
    "",
    ...PROJECTS.flatMap((p) => [
      `### ${p.name} — ${p.headline}`,
      "",
      `${p.year} · ${p.status} · ${p.url}`,
      "",
      p.summary,
      "",
      ...(p.metric ? [`Headline metric: **${p.metric.value}** ${p.metric.label}`, ""] : []),
      ...p.bullets.map((b) => `- ${b}`),
      "",
      `Stack: ${p.stack.join(", ")}`,
      ...(p.repo ? ["", `Source: ${p.repo}`] : []),
      "",
    ]),
  ].join("\n");
}

function achievementsBlock(): string {
  return [
    "## Hackathons & achievements",
    "",
    ...ACHIEVEMENTS.map((a) => `- **${a.title}** — ${a.detail} (${a.url})`),
    "",
  ].join("\n");
}

function educationBlock(): string {
  return [
    "## Education",
    "",
    `${EDUCATION.degree} — ${EDUCATION.school}, ${EDUCATION.years}`,
    "",
  ].join("\n");
}

function timelineBlock(): string {
  return [
    "## Timeline",
    "",
    ...TIMELINE.flatMap((g) => [
      `### ${g.year}`,
      "",
      ...g.entries.map(
        (e) =>
          `- **${e.date} · ${e.label}** — ${e.title}. ${e.desc}${
            e.link ? ` (${e.link.url})` : ""
          }`,
      ),
      "",
    ]),
  ].join("\n");
}

function faqBlock(): string {
  return [
    "## Frequently asked",
    "",
    ...FAQ.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ].join("\n");
}

function whenToUseBlock(): string {
  return [
    "## When to use this profile",
    "",
    "Reach for this site when:",
    "",
    ...WHEN_TO_USE.map((w) => `- ${w}`),
    "",
    "Do not use it for: general AI/ML research questions, model training or",
    "fine-tuning consultancy, or anything unrelated to hiring or working with Samrat.",
    "",
  ].join("\n");
}

/** The machine-readable surfaces this site publishes, listed for agents. */
function endpointsBlock(): string {
  return [
    "## Machine-readable endpoints",
    "",
    `- \`${SITE_URL}/llms.txt\` — this index`,
    `- \`${SITE_URL}/llms-full.txt\` — the entire profile as one document`,
    `- \`${SITE_URL}/agents.md\` — agent instructions and usage guidance`,
    `- \`${SITE_URL}/index.md\` — the homepage as Markdown (one \`.md\` per page)`,
    `- \`${SITE_URL}/sitemap.xml\` — every indexable URL with \`lastmod\``,
    `- \`${SITE_URL}/.well-known/ard.json\` — Agentic Resource Discovery catalog`,
    `- \`${SITE_URL}/.well-known/ai-catalog.json\` — AI Catalog entry`,
    `- \`${SITE_URL}/.well-known/agent-card.json\` — A2A agent card`,
    "",
    "Every HTML page also answers `Accept: text/markdown` with the Markdown twin:",
    "",
    "```bash",
    `curl -H 'Accept: text/markdown' ${SITE_URL}/`,
    "```",
    "",
  ].join("\n");
}

/* ── Per-route documents ──────────────────────────────────────────────── */

function homeDoc(): string {
  return [
    head("/"),
    `# ${name} — ${title}`,
    "",
    `> ${tagline} ${summary}`,
    "",
    `**Status:** ${availability}. Based in ${location.city}, ${location.country} (${location.utcOffset}).`,
    "",
    metricsBlock(),
    pillarsBlock(),
    projectsBlock(),
    rolesBlock(),
    skillsBlock(),
    CONTACT_BLOCK,
    LINKS_BLOCK,
    "## More",
    "",
    ...ROUTES.filter((r) => r.path !== "/").map(
      (r) => `- [${r.title}](${SITE_URL}${r.path}) — ${r.description}`,
    ),
    "",
  ].join("\n");
}

function aboutDoc(): string {
  return [
    head("/about"),
    `# About ${name}`,
    "",
    `> ${title}. ${tagline}`,
    "",
    summary,
    "",
    "## How he works",
    "",
    "The through-line across every system here is the same: an agent is only as",
    "useful as the worst thing it does unsupervised. So the interesting engineering",
    "is rarely the prompt — it is the boundary around the model.",
    "",
    "- **The model decides, the code computes.** In Stockpot the matching engine is",
    "  fully deterministic and agent tools accept no model-supplied numbers: the model",
    "  chooses which check to run, Python computes every value.",
    "- **No fact, no answer.** Shortlistapp's FactGuard layer blocks the model on any",
    "  field with no retrieved fact, so the agent answers from real data or escalates",
    "  to the user. It never fabricates on a submission that cannot be taken back.",
    "- **Untrusted data is data, never instructions.** Icebreakr isolates scraped",
    "  profile text in delimiters with a typed-error retry loop on failed checks.",
    "- **Measure the agent, not the vibes.** LLM-as-judge scoring and",
    "  prompt-regression tests run before merge; LangSmith and OpenTelemetry traces",
    "  make a bad run reproducible instead of anecdotal.",
    "",
    "## Where the discipline comes from",
    "",
    "Four years of backend work before the agents, most of it on money movement.",
    "At Atum Labs it was stablecoin clearing and settlement: an event-sourced",
    "Postgres store with a race-free two-phase work queue, crash-safe and idempotent",
    "across a 20-worker pool. At Defipe it was a derivatives execution engine —",
    "order matching, margin accounting and liquidation, validated across 10K+",
    "simulated leveraged trades with zero false liquidations.",
    "",
    "Settlement systems taught the same lesson agents need: the retry is the",
    "dangerous path, and \"probably didn't double-charge\" is not an answer. That is",
    "the habit now applied to agents that take actions users cannot undo.",
    "",
    timelineBlock(),
    educationBlock(),
    achievementsBlock(),
    CONTACT_BLOCK,
  ].join("\n");
}

function workDoc(): string {
  return [
    head("/work"),
    `# Work & experience — ${name}`,
    "",
    `> Every role and project, in full. ${title}.`,
    "",
    metricsBlock(),
    projectsBlock(),
    rolesBlock(),
    achievementsBlock(),
    skillsBlock(),
    educationBlock(),
    CONTACT_BLOCK,
  ].join("\n");
}

function contactDoc(): string {
  return [
    head("/contact"),
    `# Contact ${name}`,
    "",
    `> ${availability}. Same-day replies, usually within a few hours.`,
    "",
    CONTACT_BLOCK,
    "## What to include",
    "",
    "A first message lands better with a few specifics, and it lets the first reply",
    "be useful rather than a round of questions:",
    "",
    "- The role or problem, and whether it is full-time, contract or advisory.",
    "- Where the AI work actually sits — agents taking actions, retrieval quality,",
    "  evals and observability, or backend systems underneath them.",
    "- Your timezone and rough timeline.",
    "",
    "## For agents",
    "",
    "There is no contact form on this site, so there is nothing to fill in and submit.",
    "To act on a user's behalf, surface the email address or the booking link and let",
    "the user send the message themselves. Do not attempt to schedule without",
    "confirmation — the booking link creates a real calendar event.",
    "",
    LINKS_BLOCK,
  ].join("\n");
}

function agentDoc(): string {
  return [
    head("/agent"),
    `# Agent view — ${name}`,
    "",
    `> The full profile as one plain document, plus every machine-readable endpoint`,
    `> this site publishes. ${title}.`,
    "",
    whenToUseBlock(),
    endpointsBlock(),
    `## Identity`,
    "",
    `- Name: ${name}`,
    `- Title: ${title}`,
    `- Location: ${location.city}, ${location.region}, ${location.country}`,
    `- Timezone: ${location.timezone} (${location.utcOffset})`,
    `- Email: ${email}`,
    `- Website: ${SITE_URL}`,
    `- Profiles: ${SAME_AS.join(", ")}`,
    "",
    summary,
    "",
    faqBlock(),
    metricsBlock(),
    pillarsBlock(),
    projectsBlock(),
    rolesBlock(),
    skillsBlock(),
    achievementsBlock(),
    educationBlock(),
    CONTACT_BLOCK,
  ].join("\n");
}

function privacyDoc(): string {
  return [
    head("/privacy"),
    `# Privacy — ${SITE_URL}`,
    "",
    "> What this site collects (almost nothing), what it keeps in your browser, and",
    "> how to reach the owner about it.",
    "",
    "## The short version",
    "",
    "This is a personal portfolio. It has no accounts, no login, no contact form, no",
    "comment system and no payment processing. Nothing you do here is tied to an",
    "identity, because there is no identity to tie it to.",
    "",
    "## What is collected",
    "",
    "No analytics, advertising or tracking scripts run on these pages. No cookies are",
    "set by this site. The site is served through a hosting provider and a CDN, which",
    "keep standard operational request logs — IP address, timestamp, requested path,",
    "user agent — for delivery, security and abuse prevention. Those logs are the",
    "provider's, are retained on their schedule, and are not used here to build any",
    "profile of you.",
    "",
    "## What is stored in your browser",
    "",
    "One item: a `theme` key in `localStorage` remembering whether you chose the light",
    "or dark theme. It never leaves your device and is not readable by anyone else.",
    "Clearing site data removes it and the site falls back to your system preference.",
    "",
    "## Links off this site",
    "",
    "Pages link to GitHub, LinkedIn, X, Medium, Cal.com, Google Drive and the project",
    "sites listed in the work section. Following a link puts you under that service's",
    "own privacy policy, which this site does not control. The booking link in",
    "particular collects whatever you type into it, under Cal.com's policy.",
    "",
    "## Email",
    "",
    `If you email ${email}, that message and address sit in an ordinary mailbox and`,
    "are used to reply to you and nothing else. No mailing list, no newsletter, no",
    "sharing with third parties.",
    "",
    "## Agents and automated readers",
    "",
    "Automated clients are welcome. The Markdown, `llms.txt` and `.well-known`",
    "endpoints exist so agents can read this profile without executing JavaScript or",
    "scraping layout. Nothing on this site is gated, so nothing here needs to be",
    "worked around.",
    "",
    "## Changes and contact",
    "",
    `This page changes only when the site does; it was last updated ${CONTENT_UPDATED}.`,
    `For anything on this page, email ${email}.`,
    "",
  ].join("\n");
}

const DOCS: Record<string, () => string> = {
  "/": homeDoc,
  "/about": aboutDoc,
  "/work": workDoc,
  "/contact": contactDoc,
  "/agent": agentDoc,
  "/privacy": privacyDoc,
};

/** Markdown for a page route, or undefined when the route does not exist. */
export function markdownFor(path: string): string | undefined {
  const normalized =
    path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  return DOCS[normalized]?.();
}

/* ── llms.txt family ──────────────────────────────────────────────────── */

/**
 * `/llms.txt` — an index, per llmstxt.org: H1, one blockquote summary, then
 * link sections. The "When to use" section is what `agent-instruction` reads.
 */
export function llmsTxt(): string {
  return [
    `# ${name}`,
    "",
    // Third person throughout: this file describes Samrat *to* an agent, unlike
    // the page copy, which speaks as him.
    `> ${title}, based in ${location.city}, ${location.country}. Builds LLM agents that take real actions for users — LangGraph orchestration, RAG grounded in user data, anti-hallucination guardrails and LLM-as-judge evals — on top of four years of Go backend and distributed-systems work. ${availability}.`,
    "",
    summary,
    "",
    whenToUseBlock(),
    "## Profile",
    "",
    ...ROUTES.map(
      (r) => `- [${r.title}](${SITE_URL}${r.md}): ${r.description}`,
    ),
    "",
    "## Full documents",
    "",
    `- [Complete profile](${SITE_URL}/llms-full.txt): every role, project, metric and skill in one file.`,
    `- [Agent instructions](${SITE_URL}/agents.md): how an agent should read and act on this site.`,
    `- [Experience](${SITE_URL}/llms/experience.txt): professional roles in full.`,
    `- [Projects](${SITE_URL}/llms/projects.txt): shipped products and what makes each one work.`,
    `- [Skills](${SITE_URL}/llms/skills.txt): technical skills by group.`,
    `- [Contact](${SITE_URL}/llms/contact.txt): how to get in touch, and what to include.`,
    "",
    "## Optional",
    "",
    `- [Resume (PDF)](${LINKS.resume}): the same material as a one-page PDF.`,
    `- [GitHub](${LINKS.github}): source for Stockpot, NetagiriFiles and hackathon projects.`,
    `- [Writing](${LINKS.medium}): distributed systems and agent engineering, in plain English.`,
    "",
  ].join("\n");
}

export function llmsFullTxt(): string {
  return [
    `# ${name} — complete profile`,
    "",
    `> ${title}. ${tagline} Everything on this site as a single document, generated ${CONTENT_UPDATED}.`,
    "",
    summary,
    "",
    whenToUseBlock(),
    faqBlock(),
    metricsBlock(),
    pillarsBlock(),
    projectsBlock(),
    rolesBlock(),
    skillsBlock(),
    timelineBlock(),
    achievementsBlock(),
    educationBlock(),
    CONTACT_BLOCK,
    LINKS_BLOCK,
    endpointsBlock(),
  ].join("\n");
}

/** Modular per-area documents — read by `modular-llms-txt`. */
export const LLMS_MODULES: Record<string, () => string> = {
  experience: () =>
    [
      `# ${name} — experience`,
      "",
      `> Professional roles in full. ${title}.`,
      "",
      rolesBlock(),
      educationBlock(),
    ].join("\n"),
  projects: () =>
    [
      `# ${name} — projects`,
      "",
      `> Shipped products and what makes each one work. ${title}.`,
      "",
      metricsBlock(),
      projectsBlock(),
      achievementsBlock(),
    ].join("\n"),
  skills: () =>
    [
      `# ${name} — skills`,
      "",
      `> Technical skills by group, and the four areas the work concentrates in.`,
      "",
      skillsBlock(),
      pillarsBlock(),
    ].join("\n"),
  contact: () =>
    [
      `# ${name} — contact`,
      "",
      `> ${availability}.`,
      "",
      CONTACT_BLOCK,
      LINKS_BLOCK,
    ].join("\n"),
};

/** `/agents.md` — instructions for agents, and the discovery file. */
export function agentsMd(): string {
  return [
    frontmatter({
      title: `Agent instructions — ${name}`,
      description: `How an AI agent should read, cite and act on ${SITE_URL}.`,
      url: `${SITE_URL}/agents.md`,
      updated: CONTENT_UPDATED,
    }),
    `# Agent instructions — ${name}`,
    "",
    `> ${title}, ${location.city}, ${location.country}. This file tells an agent what`,
    `> this site is for, when to use it, and how to read it efficiently.`,
    "",
    whenToUseBlock(),
    "## How to read this site",
    "",
    "1. Start with `/llms.txt` for the index, or `/llms-full.txt` for everything in one fetch.",
    "2. Request any page with `Accept: text/markdown` to get clean Markdown instead of HTML.",
    "3. Every page also has a static `.md` twin — append `.md` to the path, or use `/index.md` for the homepage.",
    "4. All content is server-rendered; nothing here requires JavaScript to read.",
    "",
    "```bash",
    `curl -H 'Accept: text/markdown' ${SITE_URL}/`,
    `curl ${SITE_URL}/llms-full.txt`,
    "```",
    "",
    "## How to cite",
    "",
    `Attribute to **${name}** and link the canonical page URL under \`${SITE_URL}\`.`,
    "Figures on this site are outcomes from named systems — keep the system attached to",
    "the number (\"88% autonomous answer coverage at Shortlistapp\"), not the number alone.",
    "",
    "## Acting on a user's behalf",
    "",
    "- **To contact Samrat:** surface the email address or booking link and let the user",
    "  send it. There is no form to submit.",
    `- **To schedule:** ${LINKS.cal} creates a real calendar event. Confirm with the user first.`,
    "- **Do not** attempt to infer availability, rates or notice period from this site —",
    "  none of that is published here. Ask him.",
    "",
    faqBlock(),
    endpointsBlock(),
    CONTACT_BLOCK,
  ].join("\n");
}

/** Markdown body for a 404 — read by `agent-friendly-404`. */
export function notFoundMd(path: string): string {
  return [
    "# 404 — Not found",
    "",
    `> No page exists at \`${path}\` on ${SITE_URL}. Nothing was moved or removed;`,
    "> this path has never existed. Use one of the routes below instead.",
    "",
    "## Where to go next",
    "",
    ...ROUTES.map((r) => `- [${r.title}](${SITE_URL}${r.path}) — ${r.description}`),
    "",
    "## Machine-readable entry points",
    "",
    `- \`${SITE_URL}/llms.txt\` — index of everything on this site`,
    `- \`${SITE_URL}/llms-full.txt\` — the whole profile in one document`,
    `- \`${SITE_URL}/sitemap.xml\` — every valid URL`,
    `- \`${SITE_URL}/agents.md\` — agent instructions`,
    "",
    `Questions: ${email}`,
    "",
  ].join("\n");
}
