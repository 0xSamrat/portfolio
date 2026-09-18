import { SITE_URL } from "../content/profile";

const YEAR = 60 * 60 * 24 * 365;

/**
 * `text/plain` for the llms.txt family. llmstxt.org files are Markdown-formatted
 * but served as plain text so that browsers display them rather than download.
 */
export function textResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": `public, max-age=0, s-maxage=3600, stale-while-revalidate=${YEAR}`,
      "access-control-allow-origin": "*",
      link: `<${SITE_URL}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
    },
  });
}

/**
 * `text/markdown` for the `.md` twins. `markdown-url-fallback` checks this
 * content type and that the body opens with a heading, not HTML.
 */
export function markdownResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": `public, max-age=0, s-maxage=3600, stale-while-revalidate=${YEAR}`,
      "access-control-allow-origin": "*",
      vary: "Accept",
    },
  });
}

/** JSON for the `.well-known` catalogs, CORS-open so any agent can fetch them. */
export function jsonResponse(body: unknown, contentType = "application/json"): Response {
  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "content-type": `${contentType}; charset=utf-8`,
      "cache-control": `public, max-age=0, s-maxage=3600, stale-while-revalidate=${YEAR}`,
      "access-control-allow-origin": "*",
    },
  });
}

export function xmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": `public, max-age=0, s-maxage=3600, stale-while-revalidate=${YEAR}`,
      "access-control-allow-origin": "*",
    },
  });
}
