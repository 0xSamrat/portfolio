/**
 * schema.org `@graph` derived from `profile.ts`.
 *
 * Covers four checks at once:
 *   - `json-ld`                  → Person as the identity type for a personal site
 *   - `org-schema-completeness`  → Organization with BOTH contactPoint and address
 *   - `json-ld-entity-linking`   → `sameAs` out to every canonical profile
 *   - `schema-type-breadth`      → Person, Organization, WebSite, ProfilePage,
 *                                  BreadcrumbList, ItemList, FAQPage, EducationalOrganization
 */

import {
  ACHIEVEMENTS,
  EDUCATION,
  FAQ,
  IDENTITY,
  LINKS,
  PROJECTS,
  ROLES,
  ROUTES,
  SAME_AS,
  SITE_URL,
  SKILLS,
} from "../content/profile";

const { name, title, email, location, summary } = IDENTITY;

const PERSON_ID = `${SITE_URL}/#person`;
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: location.city,
  addressRegion: location.region,
  addressCountry: location.countryCode,
};

const contactPoint = {
  "@type": "ContactPoint",
  contactType: "hiring enquiries",
  email,
  url: `${SITE_URL}/contact`,
  areaServed: "Worldwide",
  availableLanguage: ["en"],
};

/** Flattened skill list, used for `knowsAbout`. */
const knowsAbout = SKILLS.flatMap((g) => g.items);

export function graph(pathname: string) {
  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name,
    alternateName: "0xSamrat",
    url: SITE_URL,
    jobTitle: title,
    description: summary,
    email: `mailto:${email}`,
    image: `${SITE_URL}/photo.jpg`,
    address: postalAddress,
    contactPoint,
    sameAs: SAME_AS,
    knowsAbout,
    knowsLanguage: ["en"],
    nationality: { "@type": "Country", name: location.country },
    homeLocation: {
      "@type": "Place",
      name: `${location.city}, ${location.country}`,
      address: postalAddress,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: EDUCATION.school,
      url: "https://www.bppimt.ac.in/",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "AI Engineer",
      occupationalCategory: "15-2051.00",
      description:
        "Builds production LLM agents: orchestration, retrieval-augmented generation, evaluation and observability.",
      skills: knowsAbout.join(", "),
    },
    worksFor: { "@id": ORG_ID },
    award: ACHIEVEMENTS.map((a) => a.title),
    seeks: {
      "@type": "Demand",
      name: "AI engineer and AI agent developer roles, full-time, remote-friendly",
    },
  };

  const organization = {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Shortlistapp",
    legalName: "Shortlistapp.co",
    url: "https://shortlistapp.co",
    description:
      "AI agent product that applies to jobs end to end — it reads the posting, fills the application, answers the employer's open-ended questions from the user's real background, and submits.",
    foundingDate: "2026-01",
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    address: postalAddress,
    location: { "@type": "Place", address: postalAddress },
    contactPoint,
    email: `mailto:${email}`,
    sameAs: ["https://shortlistapp.co"],
  };

  const website = {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: `${name} — ${title}`,
    description:
      "Portfolio of Samrat Mukherjee, AI engineer and AI agent developer building production LLM agents.",
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    license: `${SITE_URL}/privacy`,
  };

  const route = ROUTES.find((r) => r.path === pathname) ?? ROUTES[0];
  const pageUrl = `${SITE_URL}${route.path === "/" ? "" : route.path}`;

  const page = {
    "@type": pathname === "/" ? "ProfilePage" : "WebPage",
    "@id": `${pageUrl}#page`,
    url: pageUrl,
    name: route.title,
    description: route.description,
    isPartOf: { "@id": SITE_ID },
    inLanguage: "en",
    ...(pathname === "/" ? { mainEntity: { "@id": PERSON_ID } } : { about: { "@id": PERSON_ID } }),
    primaryImageOfPage: `${SITE_URL}/opengraph-image`,
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
    /** The Markdown twin, so an agent can find the clean representation. */
    encoding: {
      "@type": "MediaObject",
      encodingFormat: "text/markdown",
      contentUrl: `${SITE_URL}${route.md}`,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...(pathname === "/"
        ? []
        : [
            {
              "@type": "ListItem",
              position: 2,
              name: route.title,
              item: pageUrl,
            },
          ]),
    ],
  };

  const projectList = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/#projects`,
    name: `Projects by ${name}`,
    numberOfItems: PROJECTS.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        url: p.url,
        applicationCategory: "DeveloperApplication",
        description: `${p.headline} ${p.summary}`,
        author: { "@id": PERSON_ID },
        datePublished: p.year,
        ...(p.repo ? { codeRepository: p.repo } : {}),
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          category: "Portfolio project",
        },
      },
    })),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const roleList = ROLES.map((r) => ({
    "@type": "EmployeeRole",
    "@id": `${SITE_URL}/work#${r.slug}`,
    roleName: r.title,
    startDate: r.startDate,
    ...(r.endDate ? { endDate: r.endDate } : {}),
    description: r.blurb,
    member: { "@id": PERSON_ID },
    worksFor: {
      "@type": "Organization",
      name: r.company,
      ...(r.companyUrl ? { url: r.companyUrl } : {}),
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      organization,
      website,
      page,
      breadcrumb,
      projectList,
      faqPage,
      ...roleList,
    ],
  };
}

/** Stringified for a `<script type="application/ld+json">` tag. */
export function graphJson(pathname: string): string {
  return JSON.stringify(graph(pathname));
}

/** Contact-page ContactPoint graph, kept small and separate. */
export const CONTACT_LINKS = {
  cal: LINKS.cal,
  email,
} as const;
