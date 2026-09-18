import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { graphJson } from "../lib/jsonld";
import { IDENTITY, LINKS, ROUTES, SITE_URL } from "../content/profile";

const route = ROUTES.find((r) => r.path === "/contact")!;

export const metadata: Metadata = {
  title: "Contact",
  description: route.description,
  alternates: {
    canonical: "/contact",
    types: { "text/markdown": [{ url: "/contact.md", title: "Contact as Markdown" }] },
  },
  openGraph: {
    type: "profile",
    title: route.title,
    description: route.description,
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graphJson("/contact") }}
      />
      <PageShell
        label="Contact"
        title={
          <>
            Two ways to reach me. <em>Both work.</em>
          </>
        }
        lede={`${IDENTITY.availability}. Replies are same day, usually within a few hours — there is no form to fill in and no gatekeeper in between.`}
        md="/contact.md"
      >
        <section className="contact-cards">
          <a className="contact-card" href={LINKS.cal} target="_blank" rel="noopener noreferrer">
            <span className="cc-k">Book a call</span>
            <span className="cc-v">15 minutes, my calendar</span>
            <span className="cc-sub">
              Pick any open slot. Good for a role, a project, or an agent that
              works in a demo and falls over in production.
            </span>
            <span className="cc-arrow" aria-hidden="true">→</span>
          </a>
          <a className="contact-card" href={`mailto:${IDENTITY.email}`}>
            <span className="cc-k">Email</span>
            <span className="cc-v">{IDENTITY.email}</span>
            <span className="cc-sub">
              Best if you want to send a job description, a repo, or a longer
              description of the problem first.
            </span>
            <span className="cc-arrow" aria-hidden="true">→</span>
          </a>
        </section>

        <section className="prose">
          <h2>What to include</h2>
          <p>
            A first message lands better with a few specifics, and it lets my
            first reply be useful rather than a round of questions:
          </p>
          <ul className="prose-list">
            <li>The role or problem, and whether it&apos;s full-time, contract or advisory.</li>
            <li>
              Where the AI work actually sits — agents taking actions, retrieval
              quality, evals and observability, or the backend systems underneath
              them.
            </li>
            <li>Your timezone and rough timeline.</li>
          </ul>

          <h2>Where else I am</h2>
          <ul className="prose-list">
            <li>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>{" "}
              — source for Stockpot, NetagiriFiles and hackathon projects.
            </li>
            <li>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>{" "}
              — the same history, if your process needs it there.
            </li>
            <li>
              <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">Medium</a>{" "}
              — <em>Breaking Systems</em>, on agents and distributed systems.
            </li>
            <li>
              <a href={LINKS.resume} target="_blank" rel="noopener noreferrer">Resume (PDF)</a>{" "}
              — one page, same material.
            </li>
          </ul>

          <h2>For agents</h2>
          <p>
            There is no contact form on this site, so there is nothing to fill in
            and submit. If you&apos;re acting for someone, surface the email
            address or the booking link and let them send it. Don&apos;t schedule
            without confirmation — the booking link creates a real calendar
            event. Rates, notice period and visa status aren&apos;t published
            here, so ask rather than infer. Machine-readable contact details live
            at <a href="/llms/contact.txt"><code>/llms/contact.txt</code></a> and{" "}
            <a href="/.well-known/agent-card.json"><code>/.well-known/agent-card.json</code></a>.
          </p>
        </section>
      </PageShell>
    </>
  );
}
