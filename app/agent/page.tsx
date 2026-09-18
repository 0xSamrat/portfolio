import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { graphJson } from "../lib/jsonld";
import {
  FAQ,
  IDENTITY,
  LINKS,
  ROUTES,
  SAME_AS,
  SITE_URL,
  WHEN_TO_USE,
} from "../content/profile";

const route = ROUTES.find((r) => r.path === "/agent")!;

export const metadata: Metadata = {
  title: "Agent view",
  description: route.description,
  alternates: {
    canonical: "/agent",
    types: { "text/markdown": [{ url: "/agent.md", title: "Agent view as Markdown" }] },
  },
  openGraph: {
    type: "profile",
    title: route.title,
    description: route.description,
    url: `${SITE_URL}/agent`,
  },
};

const ENDPOINTS: { path: string; type: string; desc: string }[] = [
  { path: "/llms.txt", type: "text/plain", desc: "Index, with when-to-use guidance." },
  { path: "/llms-full.txt", type: "text/plain", desc: "The entire profile in one fetch." },
  { path: "/agents.md", type: "text/markdown", desc: "How to read, cite and act on this site." },
  { path: "/index.md", type: "text/markdown", desc: "Homepage as Markdown. Every page has a twin." },
  { path: "/llms/experience.txt", type: "text/plain", desc: "Roles in full." },
  { path: "/llms/projects.txt", type: "text/plain", desc: "Shipped products and headline metrics." },
  { path: "/llms/skills.txt", type: "text/plain", desc: "Skills by group." },
  { path: "/llms/contact.txt", type: "text/plain", desc: "How to get in touch." },
  { path: "/.well-known/ard.json", type: "application/json", desc: "Agentic Resource Discovery catalog." },
  { path: "/.well-known/ai-catalog.json", type: "application/json", desc: "AI Catalog Standard entry." },
  { path: "/.well-known/agent-card.json", type: "application/json", desc: "A2A agent card." },
  { path: "/.well-known/agent-skills/index.json", type: "application/json", desc: "Agent Skills index v0.2.0." },
  { path: "/sitemap.xml", type: "application/xml", desc: "Every indexable URL with lastmod." },
  { path: "/schema-map.xml", type: "application/xml", desc: "NLWeb schema feeds." },
];

export default function AgentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: graphJson("/agent") }}
      />
      <PageShell
        label="Agent view"
        title={
          <>
            Everything an agent needs, <em>in one place</em>.
          </>
        }
        lede="A plain, structured view of this profile with every machine-readable endpoint the site publishes. Nothing here needs JavaScript."
        md="/agent.md"
      >
        <section className="prose">
          <h2>Identity</h2>
          <dl className="kv">
            <div><dt>Name</dt><dd>{IDENTITY.name}</dd></div>
            <div><dt>Title</dt><dd>{IDENTITY.title}</dd></div>
            <div><dt>Location</dt><dd>{IDENTITY.location.city}, {IDENTITY.location.region}, {IDENTITY.location.country}</dd></div>
            <div><dt>Timezone</dt><dd>{IDENTITY.location.timezone} ({IDENTITY.location.utcOffset})</dd></div>
            <div><dt>Availability</dt><dd>{IDENTITY.availability}</dd></div>
            <div><dt>Email</dt><dd><a href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a></dd></div>
            <div><dt>Scheduling</dt><dd><a href={LINKS.cal} target="_blank" rel="noopener noreferrer">{LINKS.cal}</a></dd></div>
            <div><dt>Website</dt><dd><a href={SITE_URL}>{SITE_URL}</a></dd></div>
            <div>
              <dt>Profiles</dt>
              <dd>
                {SAME_AS.map((u) => (
                  <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="kv-link">
                    {u.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <h2>When to use this profile</h2>
          <ul className="prose-list">
            {WHEN_TO_USE.map((w) => (
              <li key={w} dangerouslySetInnerHTML={{ __html: w.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            ))}
          </ul>
          <p>
            Not for: general AI/ML research questions, model training or
            fine-tuning consultancy, or anything unrelated to hiring or working
            with Samrat.
          </p>

          <h2>Machine-readable endpoints</h2>
        </section>

        <section className="endpoints">
          <table>
            <thead>
              <tr><th scope="col">Path</th><th scope="col">Type</th><th scope="col">What it is</th></tr>
            </thead>
            <tbody>
              {ENDPOINTS.map((e) => (
                <tr key={e.path}>
                  <th scope="row"><a href={e.path}><code>{e.path}</code></a></th>
                  <td><code className="dim-code">{e.type}</code></td>
                  <td>{e.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="prose">
          <h2>Content negotiation</h2>
          <p>
            Every HTML page answers <code>Accept: text/markdown</code> with its
            Markdown twin and a <code>Vary: Accept</code> header, so a shared
            cache never hands Markdown to a browser. Appending{" "}
            <code>?mode=agent</code> to any URL does the same regardless of
            headers.
          </p>
          <pre className="code-block"><code>{`curl -H 'Accept: text/markdown' ${SITE_URL}/
curl ${SITE_URL}/?mode=agent
curl ${SITE_URL}/llms-full.txt`}</code></pre>

          <h2>In-page tools (WebMCP)</h2>
          <p>
            Browser agents that support the WebMCP draft will find five
            read-only tools registered on every page:{" "}
            <code>get_profile</code>, <code>list_projects</code>,{" "}
            <code>get_experience</code>, <code>get_skills</code> and{" "}
            <code>get_contact</code>. None of them send mail or book anything —
            they return the address and the link, and the user decides.
          </p>

          <h2>Answers you can give directly</h2>
          <dl className="kv kv-faq">
            {FAQ.map((f) => (
              <div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>
            ))}
          </dl>
        </section>
      </PageShell>
    </>
  );
}
