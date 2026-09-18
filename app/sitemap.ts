import type { MetadataRoute } from "next";
import { CONTENT_UPDATED, ROUTES, SITE_URL } from "./content/profile";

/**
 * Every indexable URL with `lastmod` — `sitemap` and `sitemap-lastmod`.
 * Markdown twins are listed too, so agents discover them without guessing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);

  const pages = ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const markdown = ROUTES.map((r) => ({
    url: `${SITE_URL}${r.md}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: Math.max(0.1, r.priority - 0.3),
  }));

  const machine = [
    "/llms.txt",
    "/llms-full.txt",
    "/agents.md",
    "/llms/experience.txt",
    "/llms/projects.txt",
    "/llms/skills.txt",
    "/llms/contact.txt",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...pages, ...markdown, ...machine];
}
