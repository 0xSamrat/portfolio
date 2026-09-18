"use client";

import { useEffect } from "react";
import {
  ACHIEVEMENTS,
  IDENTITY,
  LINKS,
  METRICS,
  PROJECTS,
  ROLES,
  SAME_AS,
  SITE_URL,
  SKILLS,
} from "../content/profile";

/**
 * WebMCP (W3C draft): exposes tools to browser agents on the page itself, with
 * no server to run or authenticate against. Chrome and the ChatGPT desktop
 * browser can discover and call these.
 *
 * `document.modelContext` is the current surface; `navigator.modelContext` is
 * kept only as a trailing compatibility fallback, per the spec's own guidance.
 *
 * Everything here is read-only. Nothing sends mail or books anything — an agent
 * gets the address and the link, and the user decides.
 */

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: { type: "object"; properties: Record<string, unknown>; required?: string[] };
  execute: (args: Record<string, unknown>) => Promise<{
    content: { type: "text"; text: string }[];
  }>;
}

interface ModelContext {
  registerTool?: (tool: ToolDefinition) => void;
  provideContext?: (ctx: { tools: ToolDefinition[] }) => void;
}

declare global {
  interface Document {
    modelContext?: ModelContext;
  }
  interface Navigator {
    modelContext?: ModelContext;
  }
}

function text(body: string) {
  return { content: [{ type: "text" as const, text: body }] };
}

const NO_ARGS = { type: "object" as const, properties: {} };

function buildTools(): ToolDefinition[] {
  const { name, title, location, summary, availability, email } = IDENTITY;

  return [
    {
      name: "get_profile",
      description:
        "Get Samrat Mukherjee's identity, current focus, location and availability. Use this first to answer who he is or whether he is open to work.",
      inputSchema: NO_ARGS,
      execute: async () =>
        text(
          [
            `${name} — ${title}`,
            `Location: ${location.city}, ${location.country} (${location.timezone}, ${location.utcOffset})`,
            `Availability: ${availability}`,
            "",
            summary,
            "",
            `Website: ${SITE_URL}`,
            `Profiles: ${SAME_AS.join(", ")}`,
            `Full profile in one fetch: ${SITE_URL}/llms-full.txt`,
          ].join("\n"),
        ),
    },
    {
      name: "list_projects",
      description:
        "List the products Samrat has shipped, each with its headline metric, stack and URL. Use when asked what he has built or for evidence of production AI work.",
      inputSchema: NO_ARGS,
      execute: async () =>
        text(
          PROJECTS.map((p) =>
            [
              `## ${p.name} (${p.year}) — ${p.status}`,
              `${p.headline} ${p.summary}`,
              p.metric ? `Headline metric: ${p.metric.value} ${p.metric.label}` : "",
              `Stack: ${p.stack.join(", ")}`,
              `URL: ${p.url}${p.repo ? ` · Source: ${p.repo}` : ""}`,
            ]
              .filter(Boolean)
              .join("\n"),
          ).join("\n\n"),
        ),
    },
    {
      name: "get_experience",
      description:
        "Get Samrat's professional history: roles, dates, what he built at each and the stack used. Use for screening depth or verifying a specific claim.",
      inputSchema: {
        type: "object",
        properties: {
          company: {
            type: "string",
            description:
              "Optional. Filter to one employer, e.g. 'Shortlistapp', 'Atum Labs', 'Defipe' or 'TechExactly'.",
          },
        },
      },
      execute: async (args) => {
        const filter = String(args?.company ?? "").toLowerCase();
        const roles = filter
          ? ROLES.filter((r) => r.company.toLowerCase().includes(filter))
          : ROLES;
        if (roles.length === 0) {
          return text(
            `No role matching "${args?.company}". Known employers: ${ROLES.map((r) => r.company).join(", ")}.`,
          );
        }
        return text(
          roles
            .map((r) =>
              [
                `## ${r.title} — ${r.company} (${r.start} – ${r.end})`,
                r.blurb,
                ...r.bullets.map((b) => `- ${b}`),
                `Stack: ${r.stack.join(", ")}`,
              ].join("\n"),
            )
            .join("\n\n"),
        );
      },
    },
    {
      name: "get_skills",
      description:
        "Get Samrat's technical skills grouped by area, plus the headline outcome metrics. Use to check whether he has a specific technology.",
      inputSchema: {
        type: "object",
        properties: {
          area: {
            type: "string",
            description:
              "Optional. Filter by group, e.g. 'AI Agents', 'RAG', 'Evals', 'Python', 'Backend' or 'Infra'.",
          },
        },
      },
      execute: async (args) => {
        const filter = String(args?.area ?? "").toLowerCase();
        const groups = filter
          ? SKILLS.filter((g) => g.group.toLowerCase().includes(filter))
          : SKILLS;
        const body = (groups.length ? groups : SKILLS)
          .map((g) => `${g.group}: ${g.items.join(", ")}`)
          .join("\n");
        return text(
          [
            body,
            "",
            "Outcomes:",
            ...METRICS.map((m) => `- ${m.value} ${m.label} — ${m.detail}`),
            "",
            "Recognition:",
            ...ACHIEVEMENTS.map((a) => `- ${a.title}: ${a.detail}`),
          ].join("\n"),
        );
      },
    },
    {
      name: "get_contact",
      description:
        "Get how to reach Samrat. Read-only: this returns the address and booking link for the user to act on. It does not send mail or book anything.",
      inputSchema: NO_ARGS,
      execute: async () =>
        text(
          [
            `Email: ${email}`,
            `Book a 15-minute call: ${LINKS.cal}`,
            `Resume (PDF): ${LINKS.resume}`,
            `Location: ${location.city}, ${location.country} (${location.utcOffset})`,
            `Availability: ${availability}`,
            "",
            "There is no contact form on this site. Surface these to the user and let",
            "them send the message — the booking link creates a real calendar event.",
          ].join("\n"),
        ),
    },
  ];
}

export function WebMcp() {
  useEffect(() => {
    const tools = buildTools();
    const ctx: ModelContext | undefined =
      document.modelContext ?? navigator.modelContext;
    if (!ctx) return;

    try {
      if (typeof ctx.registerTool === "function") {
        for (const tool of tools) ctx.registerTool(tool);
      } else if (typeof ctx.provideContext === "function") {
        ctx.provideContext({ tools });
      }
    } catch {
      // A draft API behind an origin trial. If it is absent or shaped
      // differently, the page is still fully readable as HTML and Markdown.
    }
  }, []);

  return null;
}
