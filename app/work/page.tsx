import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { graphJson } from "../lib/jsonld";
import {
  ACHIEVEMENTS,
  METRICS,
  PROJECTS,
  ROLES,
  ROUTES,
  SITE_URL,
  SKILLS,
} from "../content/profile";

const route = ROUTES.find((r) => r.path === "/work")!;

export const metadata: Metadata = {
  title: "Work & experience",
  description: route.description,
  alternates: {
    canonical: "/work",
    types: { "text/markdown": [{ url: "/work.md", title: "Work as Markdown" }] },
  },
  openGraph: {
    type: "profile",
    title: route.title,
    description: route.description,
    url: `${SITE_URL}/work`,
  },
};

export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graphJson("/work") }}
      />
      <PageShell
        label="Work & experience"
        title={
          <>
            Everything I&apos;ve <em>built and shipped</em>.
          </>
        }
        lede="Four roles and four products, in full — with the numbers attached to the systems that produced them."
        md="/work.md"
      >
        <section className="proof" aria-label="Outcomes">
          <div className="proof-grid">
            {METRICS.map((m) => (
              <div className="proof-item" key={m.label}>
                <b className="proof-value">{m.value}</b>
                <span className="proof-label">{m.label}</span>
                <span className="proof-detail">{m.detail}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <div className="label">Projects</div>
          <h2 className="section-title">Products, and how they work.</h2>
          <div className="detail-list">
            {PROJECTS.map((p) => (
              <article className="detail" key={p.slug} id={p.slug}>
                <div className="detail-head">
                  <h3>
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      {p.name}
                      <span className="arr" aria-hidden="true">↗</span>
                    </a>
                  </h3>
                  <span className="detail-meta">
                    {p.year} · {p.status}
                  </span>
                </div>
                <p className="detail-headline">{p.headline}</p>
                <p className="detail-summary">{p.summary}</p>
                {p.metric && (
                  <div className="w-metric">
                    <b>{p.metric.value}</b>
                    <span>{p.metric.label}</span>
                  </div>
                )}
                <ul className="role-bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="tags">
                  {p.stack.map((s) => (
                    <span className="tag" key={s}>{s}</span>
                  ))}
                </div>
                {p.repo && (
                  <a className="t-link" href={p.repo} target="_blank" rel="noopener noreferrer">
                    <span>Source on GitHub</span>
                    <span className="arr" aria-hidden="true">↗</span>
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="roles">
          <div className="label">Professional experience</div>
          <h2 className="section-title">Roles, in full.</h2>
          <div className="detail-list">
            {ROLES.map((r) => (
              <article className="detail" key={r.slug} id={r.slug}>
                <div className="detail-head">
                  <h3>
                    {r.title} <span className="role-at">at</span>{" "}
                    {r.companyUrl ? (
                      <a href={r.companyUrl} target="_blank" rel="noopener noreferrer">
                        {r.company}
                        <span className="arr" aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      r.company
                    )}
                  </h3>
                  <span className="detail-meta">
                    {r.start} – {r.end} · {r.location}
                  </span>
                </div>
                <p className="detail-summary">{r.blurb}</p>
                <ul className="role-bullets">
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="tags">
                  {r.stack.map((s) => (
                    <span className="tag" key={s}>{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills">
          <div className="label">Technical skills</div>
          <h2 className="section-title">The toolkit.</h2>
          <dl className="skills">
            {SKILLS.map((g) => (
              <div className="skill-row" key={g.group}>
                <dt>{g.group}</dt>
                <dd>
                  {g.items.map((i) => (
                    <span className="tag" key={i}>{i}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="achievements">
          <div className="label">Hackathons & achievements</div>
          <h2 className="section-title">Wins and grants.</h2>
          <ul className="prose-list">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title}>
                <strong>{a.title}</strong> — {a.detail}{" "}
                <a href={a.url} target="_blank" rel="noopener noreferrer">
                  {a.urlLabel}
                  <span className="arr" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </PageShell>
    </>
  );
}
