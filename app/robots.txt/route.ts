import { SITE_URL } from "../content/profile";

export const dynamic = "force-static";

/**
 * Hand-rolled rather than using `app/robots.ts`, because the Next helper cannot
 * emit the NLWeb `schemamap:` directive or the `llms.txt` pointer.
 *
 * Every AI crawler is explicitly allowed: `robots-ai-policy-quality` reads this,
 * and nothing here is worth hiding from a model that might later recommend its
 * author.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "GoogleOther",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Amazonbot",
  "DuckAssistBot",
  "YouBot",
  "Diffbot",
  "Timpibot",
];

export function GET() {
  const body = [
    "# Every crawler, human-facing or agentic, is welcome here.",
    "# Full profile in one fetch: /llms-full.txt",
    "# How to read this site: /agents.md",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    ...AI_CRAWLERS.flatMap((ua) => [`User-agent: ${ua}`, "Allow: /", ""]),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Schemamap: ${SITE_URL}/schema-map.xml`,
    `Llms: ${SITE_URL}/llms.txt`,
    `Host: ${SITE_URL}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
