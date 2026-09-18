import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { graphJson } from "../lib/jsonld";
import {
  ACHIEVEMENTS,
  EDUCATION,
  IDENTITY,
  LINKS,
  ROUTES,
  SITE_URL,
} from "../content/profile";

const route = ROUTES.find((r) => r.path === "/about")!;

export const metadata: Metadata = {
  title: "About",
  description: route.description,
  alternates: {
    canonical: "/about",
    types: { "text/markdown": [{ url: "/about.md", title: "About as Markdown" }] },
  },
  openGraph: {
    type: "profile",
    title: route.title,
    description: route.description,
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graphJson("/about") }}
      />
      <PageShell
        label="About"
        title={
          <>
            An agent is only as useful as the <em>worst thing</em> it does
            unsupervised.
          </>
        }
        lede={IDENTITY.summary}
        md="/about.md"
      >
        <section className="prose">
          <h2>How I work</h2>
          <p>
            The through-line across every system here is the same: the
            interesting engineering is rarely the prompt — it&apos;s the boundary
            around the model. Four rules I hold to.
          </p>

          <h3>The model decides, the code computes</h3>
          <p>
            In Stockpot the matching engine is fully deterministic and agent
            tools accept no model-supplied numbers. The model chooses which check
            to run; Python computes every value. That single constraint is what
            made an adversarial test suite possible at all — there is no path
            where a hallucinated number becomes a real charge.
          </p>

          <h3>No fact, no answer</h3>
          <p>
            Shortlistapp&apos;s FactGuard layer blocks the model on any field
            with no retrieved fact, so the agent answers from real data or
            escalates to the user. It never fabricates on a submission that
            cannot be taken back. Refusing to answer is a feature when the
            alternative is a fabricated claim on someone&apos;s job application.
          </p>

          <h3>Untrusted data is data, never instructions</h3>
          <p>
            Icebreakr isolates scraped profile text inside delimiters so the
            model treats it as content to summarise, not a command to follow,
            with a typed-error retry loop when a check fails. Anything that
            crosses the network from a third party gets the same treatment.
          </p>

          <h3>Measure the agent, not the vibes</h3>
          <p>
            LLM-as-judge scoring across four subjective axes and
            prompt-regression tests in baseline/diff mode run before merge.
            LangSmith and OpenTelemetry traces cover every model call, tool
            invocation and decision, so a bad run is reproducible rather than
            anecdotal.
          </p>

          <h2>Where the discipline comes from</h2>
          <p>
            Four years of backend work before the agents, most of it on money
            movement. At Atum Labs it was stablecoin clearing and settlement: an
            event-sourced Postgres store with a race-free two-phase work queue
            using <code>SELECT FOR UPDATE SKIP LOCKED</code>, crash-safe and
            idempotent across a 20-worker pool. At Defipe it was a derivatives
            execution engine — order matching, margin accounting and liquidation
            — validated across 10,000+ simulated leveraged trades with zero false
            liquidations.
          </p>
          <p>
            Settlement systems teach the lesson agents need: the retry is the
            dangerous path, and &ldquo;probably didn&apos;t double-charge&rdquo;
            is not an answer. That is the habit I now apply to agents that take
            actions users cannot undo.
          </p>

          <h2>Recognition</h2>
          <ul className="prose-list">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title}>
                <strong>{a.title}</strong> — {a.detail}{" "}
                <a href={a.url} target="_blank" rel="noopener noreferrer">
                  {a.urlLabel}
                  <span className="arr" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <h2>Education</h2>
          <p>
            {EDUCATION.degree} — {EDUCATION.school}, {EDUCATION.years}.
          </p>

          <h2>Get in touch</h2>
          <p>
            {IDENTITY.availability}. Email{" "}
            <a href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a>, or{" "}
            <a href={LINKS.cal} target="_blank" rel="noopener noreferrer">
              book a 15-minute call
            </a>
            . Replies are same day, usually within a few hours.
          </p>
        </section>
      </PageShell>
    </>
  );
}
