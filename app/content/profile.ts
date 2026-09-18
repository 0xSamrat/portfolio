/**
 * Single source of truth for the whole site.
 *
 * Every human surface (pages) and every machine surface (llms.txt, Markdown
 * variants, JSON-LD, sitemap, ARD catalog, agent card) is derived from this
 * file, so the text an agent reads can never drift from the text a person sees.
 */

export const SITE_URL = "https://0xsamrat.com";

export const IDENTITY = {
  name: "Samrat Mukherjee",
  firstName: "Samrat",
  title: "AI Engineer · AI Agent Developer",
  role: "AI Engineer",
  tagline: "I build LLM agents that take real actions for users.",
  email: "samrat.mukherjee2022@gmail.com",
  location: {
    city: "Bengaluru",
    region: "Karnataka",
    country: "India",
    countryCode: "IN",
    timezone: "Asia/Kolkata",
    utcOffset: "UTC+5:30",
  },
  availability: "Open to work — full-time, remote-friendly",
  yearsExperience: 4,
  /** One paragraph. Used in meta description, llms.txt, JSON-LD and the agent view. */
  summary:
    "AI engineer with 4 years building production systems, now focused on LLM agents that take real actions for users. Built and shipped two live AI products, one with paying customers, where agents research, decide, and act autonomously. Strong on the parts that break in production: RAG grounded in user data, anti-hallucination guardrails, LLM-as-judge evals, and full tracing with LangSmith and OpenTelemetry. The reliability discipline comes from years on financial infrastructure in Go — settlement systems where idempotency, crash-safety, and never double-charging are non-negotiable. That discipline now applies to agents that cannot take an action back.",
} as const;

export const LINKS = {
  site: SITE_URL,
  github: "https://github.com/0xSamrat",
  linkedin: "https://www.linkedin.com/in/samrat-mukherjee00/",
  x: "https://x.com/0x_samrat",
  medium: "https://medium.com/@0xSamrat",
  cal: "https://cal.com/0xsamrat/15min",
  resume:
    "https://drive.google.com/file/d/14feSsx0a-vZ4A2sf8XZluPPLiVPx2DK_/view",
} as const;

/** Used for JSON-LD `sameAs` (json-ld-entity-linking) and the socials grid. */
export const SAME_AS: string[] = [
  LINKS.github,
  LINKS.linkedin,
  LINKS.x,
  LINKS.medium,
];

/** Headline numbers. These are the proof strip and they carry the whole page. */
export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export const METRICS: Metric[] = [
  {
    value: "88%",
    label: "autonomous answer coverage",
    detail:
      "A RAG rebuild of the answer layer at Shortlistapp raised how often the agent answers an employer's open-ended question on its own.",
  },
  {
    value: "28%",
    label: "lower LLM cost",
    detail:
      "Same rebuild — retrieving facts instead of re-prompting a large model per question.",
  },
  {
    value: "749",
    label: "tests on Stockpot",
    detail:
      "Including an adversarial suite against the agent's tool boundary.",
  },
  {
    value: "~15×",
    label: "fewer Redis commands",
    detail:
      "2.6M → 173K per month, by replacing a polling scheduler with a Lua timer wheel.",
  },
];

/** The four pillars. This is the differentiator against generic AI portfolios. */
export interface Pillar {
  icon: string;
  title: string;
  body: string;
  stack: string[];
}

export const PILLARS: Pillar[] = [
  {
    icon: "◈",
    title: "Agent orchestration",
    body: "Stateful multi-step workflows in LangGraph that plan, call tools, recover on step failure, and escalate to a human when they cannot proceed safely.",
    stack: ["LangGraph", "LangChain", "tool calling", "FastAPI"],
  },
  {
    icon: "◎",
    title: "Grounded retrieval",
    body: "RAG over the user's own data so answers come from real background, not from a model improvising. Retrieval quality measured, not assumed.",
    stack: ["Pinecone", "embeddings", "precision/recall@k", "groundedness"],
  },
  {
    icon: "◉",
    title: "Evals & observability",
    body: "LLM-as-judge scoring, prompt-regression testing in CI, and every model call, tool invocation and decision traced end to end.",
    stack: ["LangSmith", "OpenTelemetry", "LLM-as-judge", "prompt regression"],
  },
  {
    icon: "⬟",
    title: "Reliability for irreversible actions",
    body: "Idempotency keys, crash-safe replay and hard anti-hallucination boundaries — because an agent that submits a job application cannot take it back.",
    stack: ["idempotency", "crash-safe replay", "FactGuard", "typed schemas"],
  },
];

export interface SkillGroup {
  group: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    group: "AI Agents",
    items: [
      "LangGraph",
      "LangChain",
      "agent orchestration",
      "tool / function calling",
      "multi-step workflows",
      "browser-automation agents (computer use)",
      "multi-provider routing with fallbacks (Anthropic Claude, OpenAI, Gemini)",
    ],
  },
  {
    group: "RAG & Retrieval",
    items: [
      "retrieval-augmented generation",
      "embeddings",
      "Pinecone",
      "retrieval-quality evaluation (precision/recall@k, groundedness)",
      "grounded answer generation",
    ],
  },
  {
    group: "Evals, Safety & Observability",
    items: [
      "LLM-as-judge evals",
      "prompt-regression testing",
      "prompt-injection defense",
      "anti-hallucination guardrails",
      "LangSmith",
      "OpenTelemetry",
    ],
  },
  {
    group: "Python & APIs",
    items: ["Python", "FastAPI", "Pydantic", "async concurrency", "REST APIs"],
  },
  {
    group: "Backend & Distributed Systems",
    items: [
      "Go (Golang)",
      "Kafka",
      "RabbitMQ",
      "gRPC",
      "PostgreSQL",
      "microservices",
      "event-driven architecture",
      "idempotency",
    ],
  },
  {
    group: "Infra & DevOps",
    items: ["Docker", "Kubernetes", "GitHub Actions (CI/CD)", "GCP", "AWS"],
  },
];

export interface Role {
  slug: string;
  company: string;
  companyUrl?: string;
  title: string;
  location: string;
  start: string;
  end: string;
  /** ISO dates for JSON-LD. */
  startDate: string;
  endDate?: string;
  current: boolean;
  blurb: string;
  bullets: string[];
  stack: string[];
}

export const ROLES: Role[] = [
  {
    slug: "shortlistapp",
    company: "Shortlistapp.co",
    companyUrl: "https://shortlistapp.co",
    title: "AI Engineer & Founder",
    location: "Remote",
    start: "Jan 2026",
    end: "Present",
    startDate: "2026-01",
    current: true,
    blurb:
      "Live AI agent product with paying customers. The agent applies to jobs end to end — it reads the posting, fills the application, answers the employer's open-ended questions from the user's real background, and submits.",
    bullets: [
      "Built an autonomous job-application agent in Python (FastAPI, LangGraph) that plans and executes a full application as a stateful multi-step workflow, resolving each field through tool calls, recovering cleanly on step failure, and escalating to the user when it cannot proceed safely.",
      "Built a RAG pipeline over each user's resume and history (embeddings + Pinecone) so open-ended employer questions are answered from the user's actual background instead of generated from scratch. This raised autonomous AI answer coverage 88% and cut LLM cost 28% by retrieving facts rather than re-prompting a large model per question.",
      "Enforced a hard anti-hallucination boundary: a FactGuard layer blocks the model on any field with no retrieved fact, so the agent answers from real data or escalates. It never fabricates on a submission the user cannot take back.",
      "Built the API layer with FastAPI and Pydantic, validating every model output against typed schemas so malformed LLM responses fail fast instead of reaching a live employer form.",
      "Built the browser-automation engine that submits on real ATS portals (Greenhouse, Ashby, Lever), with idempotency keys and crash-safe replay guaranteeing no duplicate applications, plus anti-bot and CAPTCHA handling for reliable submission.",
      "Instrumented the full agent path with LangSmith and OpenTelemetry, tracing every model call, tool invocation and decision, plus a queryable outcome taxonomy and dead-letter queue, so agent behavior is measurable and failures are debuggable.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Pydantic",
      "LangGraph",
      "LangSmith",
      "Pinecone",
      "RAG",
      "OpenTelemetry",
      "PostgreSQL",
      "RabbitMQ",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    slug: "atum-labs",
    company: "Atum Labs (Atum Core)",
    title: "Backend Engineer",
    location: "Remote",
    start: "Aug 2025",
    end: "Nov 2025",
    startDate: "2025-08",
    endDate: "2025-11",
    current: false,
    blurb:
      "Intent-driven, multi-chain stablecoin clearing & settlement network letting payment providers move value across chains through one API.",
    bullets: [
      "Built core Go services for an intent-driven, auction-based settlement platform — payment gateway, solver gateway and on-chain verification — within a ~10-microservice system behind one REST API.",
      "Built an off-chain quote-auction pipeline on Apache Kafka using per-source topics plus ephemeral per-request correlation topics with TTL-based cleanup, decoupling services into an event-driven flow.",
      "Implemented a gRPC service (7 RPCs over Protocol Buffers) with a resumable server-streaming feed using monotonic sequence IDs, heartbeat liveness checks and replay-on-reconnect for reliable delivery across disconnects.",
      "Architected an event-sourced PostgreSQL store with a race-free, two-phase work queue using SELECT FOR UPDATE SKIP LOCKED, giving crash-safe, idempotent settlement across a 20-worker pool.",
      "Designed a write-only key-custody layer with a pluggable signing backend (encrypted storage plus GCP KMS / HashiCorp Vault / Fireblocks adapters), keeping private keys non-retrievable and signing isolated.",
      "Containerized the service fleet with Docker, authored Kubernetes manifests and built GitHub Actions CI/CD promoting the exact staging-tested image to production by commit-SHA re-tag.",
    ],
    stack: [
      "Go",
      "Kafka",
      "gRPC",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "GCP KMS",
    ],
  },
  {
    slug: "defipe",
    company: "Defipe.io",
    title: "Founder & Lead Backend Engineer",
    location: "Remote",
    start: "Sep 2023",
    end: "May 2025",
    startDate: "2023-09",
    endDate: "2025-05",
    current: false,
    blurb:
      "A derivatives trading protocol with a Go off-chain execution engine — order matching, position lifecycle, margin accounting and liquidation.",
    bullets: [
      "Architected a Go off-chain execution engine for a derivatives trading protocol from scratch, covering order matching, position lifecycle, margin accounting and liquidation logic.",
      "Built a concurrent order-processing pipeline using goroutines for parallel matching and mutex-protected account state under simultaneous leverage constraints.",
      "Implemented the liquidation engine and funding-rate mechanism; validated across 10K+ simulated leveraged trades with zero false liquidations in testing.",
      "Built a low-latency WebSocket server propagating real-time state to 500+ concurrent users; grew to 500+ MAU and a 1,000+ member Discord, and won a $1,000 Soonami Venturethon grant.",
    ],
    stack: ["Go", "WebSockets", "Solidity", "EVM"],
  },
  {
    slug: "techexactly",
    company: "TechExactly",
    title: "Blockchain Developer",
    location: "Kolkata, India",
    start: "Feb 2022",
    end: "Nov 2022",
    startDate: "2022-02",
    endDate: "2022-11",
    current: false,
    blurb:
      "NFT-marketplace smart contracts and the React frontend that drove them.",
    bullets: [
      "Engineered NFT-marketplace smart contracts with state-machine logic for ownership, settlement and transfer; built the React frontend with wallet connection and on-chain interactions.",
      "Implemented gasless approvals (ERC-2612 permit), removing a separate approval transaction to cut onboarding friction and user gas costs.",
      "Wrote test suites covering authorization, ownership transfer and failure paths to 95%+ functional coverage.",
    ],
    stack: ["Solidity", "React", "ERC-2612"],
  },
];

export interface Project {
  slug: string;
  name: string;
  year: string;
  status: string;
  statusAccent?: boolean;
  headline: string;
  summary: string;
  /** The single number that makes the case for this project. */
  metric?: { value: string; label: string };
  bullets: string[];
  stack: string[];
  url: string;
  urlLabel: string;
  repo?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "shortlistapp",
    name: "Shortlistapp",
    year: "2026",
    status: "Live · paying customers",
    statusAccent: true,
    headline: "An agent that applies to jobs end to end.",
    summary:
      "It reads the posting, fills the application, answers the employer's open-ended questions from the user's real background, and submits on real ATS portals.",
    metric: { value: "88%", label: "autonomous answer coverage" },
    bullets: [
      "Stateful LangGraph workflow that resolves every field through tool calls and escalates rather than guessing.",
      "RAG over each user's resume and history so answers come from real background — 88% autonomous answer coverage, 28% lower LLM cost.",
      "A FactGuard layer blocks the model on any field with no retrieved fact, so it never fabricates on a submission the user cannot take back.",
      "Idempotency keys and crash-safe replay guarantee no duplicate applications.",
    ],
    stack: ["Python", "LangGraph", "Pinecone", "FastAPI", "OpenTelemetry"],
    url: "https://shortlistapp.co",
    urlLabel: "shortlistapp.co",
  },
  {
    slug: "icebreakr",
    name: "Icebreakr",
    year: "2026",
    status: "Live on Chrome Web Store",
    headline: "AI outreach that researches a person before it writes.",
    summary:
      "Drafts personalized connection requests, DMs and cold emails using LLMs, behind a provider architecture with automatic fallback chains.",
    metric: { value: "4-axis", label: "LLM-as-judge eval harness" },
    bullets: [
      "Plug-and-play provider architecture — Claude, OpenAI and Gemini behind interfaces with automatic fallback chains, swappable from a single config line.",
      "Hardened against prompt injection: untrusted data isolated in delimiters so the model treats it as data, never instructions, with a typed-error retry loop.",
      "Eval harness with deterministic auto-checks plus an LLM-as-judge scoring four subjective axes, using baseline/diff modes to catch prompt regressions before merge.",
      "Go backend (Gin, PostgreSQL) with errgroup-orchestrated parallel fetches behind a 75s pipeline timeout, per-IP and per-user rate limiting, and daily usage caps.",
      "Manifest V3 Chrome extension in TypeScript using a closed Shadow DOM overlay, with WorkOS OAuth/SSO and a signed handoff that never exposes tokens to JavaScript.",
    ],
    stack: ["Go", "LLM", "Next.js", "Chrome MV3", "TypeScript"],
    url: "https://useicebreakr.com",
    urlLabel: "useicebreakr.com",
  },
  {
    slug: "stockpot",
    name: "Stockpot",
    year: "2026",
    status: "Agentic Commerce Hackathon",
    statusAccent: true,
    headline: "Agents that trade surplus food between restaurants.",
    summary:
      "Settling on real payment rails, where money moves only after delivery is verified.",
    metric: { value: "749", label: "tests, incl. adversarial suite" },
    bullets: [
      "A hard LLM boundary: the matching engine is fully deterministic and agent tools accept no model-supplied numbers. The model chooses which check to run; Python computes every value.",
      "Idempotent settlement protocol keyed on (listing, delivery) — the charge row is written pending before any network call, so a provider timeout retries instead of silently reporting success.",
      "Card rails with network-enforced spending caps and partial capture: the buyer approves a ceiling once by passkey, and a charge above it is refused by the network.",
      "Cut Redis command volume ~15× (2.6M → 173K/month) by replacing a polling scheduler with a Lua timer wheel that sleeps until the next deadline.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis"],
    url: "https://getstockpot.shop",
    urlLabel: "getstockpot.shop",
    repo: "https://github.com/0xSamrat/stockpot",
  },
  {
    slug: "netagirifiles",
    name: "NetagiriFiles",
    year: "2026",
    status: "500+ monthly visitors",
    headline: "Civic transparency for ~800 Lok Sabha MPs.",
    summary:
      "Surfaces self-declared affidavit data with interactive D3.js charts, an India choropleth and per-MP profile pages.",
    metric: { value: "<10 min", label: "full dataset refresh" },
    bullets: [
      "Concurrent Go ingestion pipeline (goroutines, token-bucket limiter) writing to Postgres via idempotent upserts, refreshing the full dataset in under 10 minutes.",
      "Frontend in Next.js, React and Tailwind with per-MP profile pages indexed for search, serving 500+ monthly visitors.",
    ],
    stack: ["Go", "Next.js", "PostgreSQL", "D3.js"],
    url: "https://netagirifiles.fun",
    urlLabel: "netagirifiles.fun",
  },
];

export interface Achievement {
  title: string;
  detail: string;
  url: string;
  urlLabel: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Soonami Venturethon (Cohort 5)",
    detail:
      "Won a $1,000 grant for Defipe.io; grew it to 500+ testnet users and a 1,000+ member Discord.",
    url: "https://app.foundance.org/projects/11247",
    urlLabel: "foundance.org",
  },
  {
    title: "ETHGlobal — Connext Pool Prize winner",
    detail:
      "Cross-chain DAO governance with multichain proposal and voting execution.",
    url: "https://ethglobal.com/showcase/ape-dao-2-0-i846k",
    urlLabel: "ethglobal.com",
  },
  {
    title: "ETH for ALL — Arcana Pool Prize winner",
    detail:
      "Decentralized token swap via 0x Aggregator with social-login wallet onboarding.",
    url: "https://devfolio.co/projects/defipe-b5ba",
    urlLabel: "devfolio.co",
  },
];

export const EDUCATION = {
  degree: "B.Tech, Electrical Engineering",
  school: "B. P. Poddar Institute of Management and Technology",
  years: "2017 – 2021",
  startDate: "2017",
  endDate: "2021",
} as const;

/** "When to use this" — read by `agent-instruction`. Keep it concrete. */
export const WHEN_TO_USE: string[] = [
  "You are sourcing an **AI engineer or agent developer** and need to verify hands-on production experience with LLM agents, not prototypes.",
  "You need someone who has shipped **agents that take irreversible actions** (submitting forms, moving money) and handled idempotency, replay and escalation.",
  "You need **RAG grounded in user data** with measured retrieval quality and an anti-hallucination boundary, not a naive vector-search demo.",
  "You need **LLM evals and observability** set up — LLM-as-judge scoring, prompt-regression tests in CI, LangSmith and OpenTelemetry tracing.",
  "You need a **Go backend engineer** for event-driven or settlement-grade systems where crash-safety and idempotency matter.",
  "You want to **contact or schedule a call** with Samrat — use the booking link or email below rather than a contact form.",
];

/** Facts an agent asked about Samrat should be able to answer without guessing. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "What does Samrat Mukherjee do?",
    a: "He is an AI engineer and AI agent developer based in Bengaluru, India, building production LLM agents in Python with LangGraph, RAG and evals, backed by four years of Go backend and distributed-systems work.",
  },
  {
    q: "Is Samrat available for hire?",
    a: "Yes. He is open to full-time, remote-friendly AI engineer and agent developer roles, and replies the same day, usually within a few hours.",
  },
  {
    q: "What is his strongest technical evidence?",
    a: "Shortlistapp.co — a live agent product with paying customers that applies to jobs end to end. A RAG rebuild of its answer layer raised autonomous answer coverage 88% and cut LLM cost 28%.",
  },
  {
    q: "Where is he based and what timezone?",
    a: "Bengaluru, India, in the Asia/Kolkata timezone (UTC+5:30). He works remote-friendly roles across timezones.",
  },
  {
    q: "How should an agent contact him?",
    a: `Email ${IDENTITY.email}, or book a 15-minute call at ${LINKS.cal}. There is no contact form to fill in.`,
  },
];

/** Every route the site serves as HTML. Drives the sitemap, nav and the 404 handler. */
export interface RouteDef {
  path: string;
  title: string;
  description: string;
  /** Markdown twin, served at this path and via Accept negotiation. */
  md: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

export const ROUTES: RouteDef[] = [
  {
    path: "/",
    title: `${IDENTITY.name} — ${IDENTITY.title}`,
    description:
      "AI engineer building production LLM agents: LangGraph orchestration, RAG grounded in user data, anti-hallucination guardrails, LLM-as-judge evals, and Go backends.",
    md: "/index.md",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/about",
    title: `About — ${IDENTITY.name}`,
    description:
      "Who Samrat Mukherjee is, how he works, and why reliability engineering shapes the way he builds LLM agents.",
    md: "/about.md",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/work",
    title: `Work & experience — ${IDENTITY.name}`,
    description:
      "Full engineering history and project detail: Shortlistapp, Icebreakr, Stockpot, NetagiriFiles, Atum Labs and Defipe.",
    md: "/work.md",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/contact",
    title: `Contact — ${IDENTITY.name}`,
    description:
      "How to reach Samrat Mukherjee: email, a 15-minute booking link, and what to include so the first reply is useful.",
    md: "/contact.md",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/agent",
    title: `Agent view — ${IDENTITY.name}`,
    description:
      "The full profile as one plain, agent-readable document, with every machine-readable endpoint this site publishes.",
    md: "/agent.md",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/privacy",
    title: `Privacy — ${IDENTITY.name}`,
    description:
      "What this site collects (almost nothing), what it stores in your browser, and how to reach the site owner about it.",
    md: "/privacy.md",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

export function routeFor(path: string): RouteDef | undefined {
  const normalized =
    path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  return ROUTES.find((r) => r.path === normalized);
}

/** Last meaningful content update. Feeds sitemap `lastmod` and Markdown frontmatter. */
export const CONTENT_UPDATED = "2026-09-18";

export type EventKind =
  | "job"
  | "win"
  | "grant"
  | "founded"
  | "shipped"
  | "milestone"
  | "ended";

export interface JourneyEventData {
  date: string;
  kind: EventKind;
  label: string;
  title: string;
  desc: string;
  link?: { url: string; label: string };
}

export interface YearGroup {
  year: string;
  entries: JourneyEventData[];
}

export const TIMELINE: YearGroup[] = [
  {
    year: "2022",
    entries: [
      {
        date: "Feb 2022",
        kind: "job",
        label: "Joined",
        title: "Started at TechExactly",
        desc: "First gig in tech. Smart contracts, a React frontend, and the habit of writing tests for the failure paths.",
      },
    ],
  },
  {
    year: "2023",
    entries: [
      {
        date: "Feb 2023",
        kind: "win",
        label: "Winner",
        title: "Won ETH for ALL hackathon",
        desc: "First hackathon win — with the project that would become Defipe.",
        link: { url: "https://devfolio.co/projects/defipe-b5ba", label: "devfolio.co" },
      },
      {
        date: "Sep 2023",
        kind: "founded",
        label: "Founded",
        title: "Founded Defipe",
        desc: "A derivatives trading protocol in Go. Off-chain execution engine, on-chain settlement.",
      },
      {
        date: "Sep 2023",
        kind: "win",
        label: "Winner",
        title: "Won ETHGlobal — Connext Pool Prize",
        desc: "Ape DAO 2.0: cross-chain governance with multichain proposal and voting execution.",
        link: { url: "https://ethglobal.com/showcase/ape-dao-2-0-i846k", label: "ethglobal.com" },
      },
    ],
  },
  {
    year: "2024",
    entries: [
      {
        date: "2024",
        kind: "grant",
        label: "Grant",
        title: "Soonami Venturethon, Cohort 5",
        desc: "A $1,000 grant for Defipe, plus three months inside Soonami's network of founders and builders.",
        link: { url: "https://app.foundance.org/projects/11247", label: "foundance.org" },
      },
      {
        date: "2024",
        kind: "milestone",
        label: "Milestone",
        title: "Defipe → 500+ monthly active users",
        desc: "Peak usage, and a 1,000+ member Discord around it.",
      },
    ],
  },
  {
    year: "2025",
    entries: [
      {
        date: "May 2025",
        kind: "ended",
        label: "Wound down",
        title: "Shut down Defipe",
        desc: "End of a two-year run. Took the lessons on idempotency and crash-safety with me.",
      },
      {
        date: "Aug 2025",
        kind: "job",
        label: "Joined",
        title: "Backend engineer at Atum Labs",
        desc: "Go services for stablecoin clearing and settlement — Kafka auctions, gRPC streaming, event-sourced Postgres.",
      },
    ],
  },
  {
    year: "2026",
    entries: [
      {
        date: "Jan 2026",
        kind: "founded",
        label: "Founded",
        title: "Started Shortlistapp.co",
        desc: "An autonomous job-application agent. First paying customers, and the first agent I shipped that takes actions a user cannot undo.",
        link: { url: "https://shortlistapp.co", label: "shortlistapp.co" },
      },
      {
        date: "2026",
        kind: "shipped",
        label: "Launched",
        title: "Icebreakr on the Chrome Web Store",
        desc: "AI outreach with multi-provider fallbacks, prompt-injection hardening and an LLM-as-judge eval harness.",
        link: { url: "https://useicebreakr.com", label: "useicebreakr.com" },
      },
      {
        date: "2026",
        kind: "shipped",
        label: "Shipped",
        title: "Stockpot · Agentic Commerce Hackathon",
        desc: "Agents trading surplus food between restaurants, settling on real payment rails. 749 tests, including an adversarial suite.",
        link: { url: "https://getstockpot.shop", label: "getstockpot.shop" },
      },
      {
        date: "2026",
        kind: "shipped",
        label: "Launched",
        title: "NetagiriFiles",
        desc: "Civic transparency for ~800 Lok Sabha MPs, serving 500+ monthly visitors.",
        link: { url: "https://netagirifiles.fun", label: "netagirifiles.fun" },
      },
    ],
  },
];
