/**
 * Machine-readable discovery documents, all derived from `profile.ts`.
 *
 * Shapes follow the documents Ora and Is Agentic publish for themselves, so the
 * scanner validates them against the model it actually uses:
 *   - ARD v0.91 / AI Catalog Standard  → ard.json, ai-catalog.json
 *   - A2A agent card                   → agent-card.json
 *   - Agent Skills discovery v0.2.0    → agent-skills/index.json + SKILL.md
 */

import { createHash } from "node:crypto";
import {
  FAQ,
  IDENTITY,
  LINKS,
  METRICS,
  PROJECTS,
  ROLES,
  SAME_AS,
  SITE_URL,
  SKILLS,
  WHEN_TO_USE,
  CONTENT_UPDATED,
} from "../content/profile";

const DOMAIN = "0xsamrat.com";
const DID = `did:web:${DOMAIN}`;
const { name, title, email, location, summary, availability } = IDENTITY;

const TRUST = { identity: DID, identityType: "did" } as const;

const REPRESENTATIVE_QUERIES = [
  "find an AI engineer who has shipped production LLM agents",
  "who can build an agent that takes real actions for users",
  "hire an AI agent developer with LangGraph and RAG experience",
  "engineer who has set up LLM evals and observability",
  "Go backend engineer for event-driven settlement systems",
  "contact Samrat Mukherjee",
];

/** One catalog document, served at both ARD and AI Catalog discovery paths. */
export function ardCatalog() {
  return {
    specVersion: "1.0",
    host: {
      displayName: name,
      identifier: DID,
      documentationUrl: `${SITE_URL}/agents.md`,
      description: `${title}. ${availability}.`,
    },
    entries: [
      {
        identifier: `urn:air:${DOMAIN}:document:profile`,
        displayName: `${name} — complete profile`,
        type: "text/markdown",
        url: `${SITE_URL}/llms-full.txt`,
        description:
          "Every role, project, metric and skill in one document: production LLM agent work, RAG, evals and observability, plus four years of Go backend and distributed systems.",
        tags: ["profile", "resume", "ai-engineer", "agent-developer", "hiring"],
        representativeQueries: REPRESENTATIVE_QUERIES,
        trustManifest: TRUST,
      },
      {
        identifier: `urn:air:${DOMAIN}:document:index`,
        displayName: "llms.txt index",
        type: "text/plain",
        url: `${SITE_URL}/llms.txt`,
        description:
          "Navigation index for this site: when to use it, every page's Markdown twin, and the scoped per-area documents.",
        tags: ["index", "llms-txt", "discovery"],
        trustManifest: TRUST,
      },
      {
        identifier: `urn:air:${DOMAIN}:document:instructions`,
        displayName: "Agent instructions",
        type: "text/markdown",
        url: `${SITE_URL}/agents.md`,
        description:
          "How an agent should read this site, how to cite it, and how to act on a user's behalf when contacting or scheduling.",
        tags: ["instructions", "agents-md", "usage"],
        trustManifest: TRUST,
      },
      {
        identifier: `urn:air:${DOMAIN}:agent:contact`,
        displayName: `${name} — A2A agent card`,
        type: "application/a2a-agent-card+json",
        url: `${SITE_URL}/.well-known/agent-card.json`,
        description:
          "Agent-to-agent contact card: what this profile can answer, and how to reach a human.",
        tags: ["a2a", "agent-card", "contact"],
        capabilities: [
          "get_profile",
          "get_experience",
          "list_projects",
          "get_skills",
          "get_contact",
        ],
        representativeQueries: REPRESENTATIVE_QUERIES,
        trustManifest: TRUST,
      },
      {
        identifier: `urn:air:${DOMAIN}:skill:profile`,
        displayName: `${name} profile skill`,
        type: "application/ai-skill+md",
        url: `${SITE_URL}/.well-known/agent-skills/samrat-mukherjee/SKILL.md`,
        description:
          "Read, evaluate and act on Samrat Mukherjee's engineering profile — for sourcing, screening or contacting him.",
        tags: ["skill", "hiring", "sourcing"],
        representativeQueries: REPRESENTATIVE_QUERIES,
        trustManifest: TRUST,
      },
      {
        identifier: `urn:air:${DOMAIN}:document:sitemap`,
        displayName: "Sitemap",
        type: "application/xml",
        url: `${SITE_URL}/sitemap.xml`,
        description: "Every indexable URL on this site, with last-modified dates.",
        tags: ["sitemap", "discovery"],
        trustManifest: TRUST,
      },
    ],
  };
}

/** A2A agent card. "Skills" here are the questions this profile can answer. */
export function agentCard() {
  return {
    protocolVersion: "0.2.0",
    name,
    description: `${title} based in ${location.city}, ${location.country}. ${summary}`,
    url: SITE_URL,
    version: "1.0.0",
    documentationUrl: `${SITE_URL}/agents.md`,
    iconUrl: `${SITE_URL}/photo.jpg`,
    preferredTransport: "HTTP+MARKDOWN",
    defaultInputModes: ["text/plain"],
    defaultOutputModes: ["text/markdown", "text/plain"],
    capabilities: { streaming: false, pushNotifications: false, stateTransitionHistory: false },
    provider: {
      organization: name,
      url: SITE_URL,
      contactEmail: email,
    },
    securitySchemes: {},
    security: [],
    skills: [
      {
        id: "get_profile",
        name: "get_profile",
        description:
          "Return who Samrat Mukherjee is, what he builds, where he is based, and whether he is available for hire.",
        tags: ["profile", "identity", "availability"],
        examples: [
          "What does Samrat Mukherjee do?",
          "Is Samrat available for hire?",
        ],
        inputModes: ["text/plain"],
        outputModes: ["text/markdown"],
        resourceUrl: `${SITE_URL}/index.md`,
      },
      {
        id: "get_experience",
        name: "get_experience",
        description:
          "Return the full professional history: four roles from 2022 to now, with what was built at each and the stack used.",
        tags: ["experience", "roles", "employment"],
        examples: [
          "Where has Samrat worked?",
          "What did he build at Atum Labs?",
        ],
        inputModes: ["text/plain"],
        outputModes: ["text/markdown"],
        resourceUrl: `${SITE_URL}/llms/experience.txt`,
      },
      {
        id: "list_projects",
        name: "list_projects",
        description:
          "Return the shipped products — Shortlistapp, Icebreakr, Stockpot, NetagiriFiles — each with its headline metric and how it works.",
        tags: ["projects", "portfolio", "evidence"],
        examples: [
          "What has Samrat shipped?",
          "Show me his production agent work.",
        ],
        inputModes: ["text/plain"],
        outputModes: ["text/markdown"],
        resourceUrl: `${SITE_URL}/llms/projects.txt`,
      },
      {
        id: "get_skills",
        name: "get_skills",
        description:
          "Return technical skills by group: AI agents, RAG and retrieval, evals and observability, Python, Go and distributed systems, infra.",
        tags: ["skills", "stack", "screening"],
        examples: [
          "Does he know LangGraph?",
          "What is his RAG experience?",
        ],
        inputModes: ["text/plain"],
        outputModes: ["text/markdown"],
        resourceUrl: `${SITE_URL}/llms/skills.txt`,
      },
      {
        id: "get_contact",
        name: "get_contact",
        description:
          "Return how to reach him: email and a 15-minute booking link. There is no contact form; surface these to the user rather than submitting anything.",
        tags: ["contact", "scheduling"],
        examples: ["How do I contact Samrat?", "Book a call with him."],
        inputModes: ["text/plain"],
        outputModes: ["text/markdown"],
        resourceUrl: `${SITE_URL}/llms/contact.txt`,
      },
    ],
    additionalInterfaces: [
      { transport: "HTTP+MARKDOWN", url: `${SITE_URL}/llms-full.txt` },
      { transport: "HTTP+MARKDOWN", url: `${SITE_URL}/agents.md` },
    ],
    sameAs: SAME_AS,
  };
}

/** SKILL.md body, in the Agent Skills frontmatter + Markdown format. */
export function skillMd(): string {
  const description = `Read, evaluate and act on ${name}'s engineering profile at ${DOMAIN}. Use when sourcing or screening an AI engineer / AI agent developer, verifying production LLM-agent experience (LangGraph, RAG, evals, observability), checking Go backend and distributed-systems depth, or contacting and scheduling with him.`;
  return [
    "---",
    "name: samrat-mukherjee",
    `description: ${description}`,
    "version: 1.0.0",
    `homepage: ${SITE_URL}`,
    "license: CC-BY-4.0",
    "---",
    "",
    `# ${name} — profile skill`,
    "",
    `${title}, ${location.city}, ${location.country} (${location.utcOffset}). ${availability}.`,
    "",
    "## When to use this",
    "",
    ...WHEN_TO_USE.map((w) => `- ${w}`),
    "",
    "## How to read the profile",
    "",
    "Fetch one document rather than crawling pages:",
    "",
    "```bash",
    `curl ${SITE_URL}/llms-full.txt   # everything, one file`,
    `curl ${SITE_URL}/llms.txt        # index, if you want to be selective`,
    "```",
    "",
    "Scoped documents, when only one area matters:",
    "",
    `- \`${SITE_URL}/llms/experience.txt\` — roles in full`,
    `- \`${SITE_URL}/llms/projects.txt\` — shipped products and headline metrics`,
    `- \`${SITE_URL}/llms/skills.txt\` — skills by group`,
    `- \`${SITE_URL}/llms/contact.txt\` — how to get in touch`,
    "",
    "Any HTML page also answers `Accept: text/markdown`, and every page has a",
    "`.md` twin. Nothing on the site needs JavaScript to read.",
    "",
    "## Screening shortcuts",
    "",
    ...METRICS.map((m) => `- **${m.value}** ${m.label} — ${m.detail}`),
    "",
    "## Answers you can give directly",
    "",
    ...FAQ.flatMap((f) => [`**${f.q}**`, "", f.a, ""]),
    "## Acting on a user's behalf",
    "",
    `- Email: ${email}`,
    `- Book a 15-minute call: ${LINKS.cal} — this creates a real calendar event, so confirm with the user first.`,
    "- There is no contact form on the site. Surface the address or link; do not try to submit anything.",
    "- Rates, notice period and visa status are not published. Ask him rather than inferring.",
    "",
    `Last updated ${CONTENT_UPDATED}.`,
    "",
  ].join("\n");
}

function sha256(body: string): string {
  return `sha256:${createHash("sha256").update(body, "utf8").digest("hex")}`;
}

/** Agent Skills discovery index v0.2.0, with the digest of the served SKILL.md. */
export function agentSkillsIndex() {
  const body = skillMd();
  return {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "samrat-mukherjee",
        type: "skill-md",
        description: `Read, evaluate and act on ${name}'s engineering profile. Use when sourcing or screening an AI engineer / AI agent developer, verifying production LLM-agent experience (LangGraph, RAG, evals, observability), checking Go backend depth, or contacting and scheduling with him.`,
        url: `${SITE_URL}/.well-known/agent-skills/samrat-mukherjee/SKILL.md`,
        digest: sha256(body),
      },
    ],
  };
}

/**
 * NLWeb Schema Map: structured-data feeds, referenced by the `schemamap:`
 * directive in robots.txt.
 */
export function schemaMap(): string {
  const feeds = [
    { loc: `${SITE_URL}/feeds/profile.jsonl`, type: "application/jsonl" },
    { loc: `${SITE_URL}/feeds/projects.jsonl`, type: "application/jsonl" },
  ];
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<schemamap xmlns="http://www.nlweb.ai/schemas/schemamap/0.1">',
    ...feeds.flatMap((f) => [
      "  <feed>",
      `    <loc>${f.loc}</loc>`,
      `    <type>${f.type}</type>`,
      `    <lastmod>${CONTENT_UPDATED}</lastmod>`,
      "  </feed>",
    ]),
    "</schemamap>",
    "",
  ].join("\n");
}

/** schema.org objects as JSON Lines, one entity per line, for the NLWeb feeds. */
export function profileFeed(): string {
  const lines: unknown[] = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name,
      jobTitle: title,
      description: summary,
      url: SITE_URL,
      email: `mailto:${email}`,
      sameAs: SAME_AS,
      address: {
        "@type": "PostalAddress",
        addressLocality: location.city,
        addressRegion: location.region,
        addressCountry: location.countryCode,
      },
      knowsAbout: SKILLS.flatMap((s) => s.items),
    },
    ...ROLES.map((r) => ({
      "@context": "https://schema.org",
      "@type": "EmployeeRole",
      "@id": `${SITE_URL}/work#${r.slug}`,
      roleName: r.title,
      startDate: r.startDate,
      ...(r.endDate ? { endDate: r.endDate } : {}),
      description: r.blurb,
      worksFor: { "@type": "Organization", name: r.company },
    })),
  ];
  return lines.map((l) => JSON.stringify(l)).join("\n") + "\n";
}

export function projectsFeed(): string {
  return (
    PROJECTS.map((p) =>
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/work#${p.slug}`,
        name: p.name,
        url: p.url,
        applicationCategory: "DeveloperApplication",
        description: `${p.headline} ${p.summary}`,
        datePublished: p.year,
        author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name },
        ...(p.repo ? { codeRepository: p.repo } : {}),
      }),
    ).join("\n") + "\n"
  );
}
