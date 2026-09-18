import Link from "next/link";
import { SITE_URL } from "../content/profile";

const ENDPOINTS: { path: string; desc: string }[] = [
  { path: "/llms.txt", desc: "index, with when-to-use guidance" },
  { path: "/llms-full.txt", desc: "the whole profile in one fetch" },
  { path: "/agents.md", desc: "how to read, cite and act on this site" },
  { path: "/index.md", desc: "every page has a Markdown twin" },
  { path: "/.well-known/ard.json", desc: "Agentic Resource Discovery catalog" },
  { path: "/.well-known/agent-card.json", desc: "A2A agent card" },
];

/**
 * A portfolio that claims agent engineering should be readable by an agent.
 * This section is the claim and the proof in the same place.
 */
export function AgentReadable() {
  return (
    <section id="agents">
      <div className="label">For agents</div>
      <h2 className="section-title">
        This site is <em>machine-readable</em>, on purpose.
      </h2>
      <p className="section-sub">
        I build agents that read the web, so this page answers{" "}
        <code>Accept: text/markdown</code>, publishes its own discovery catalog,
        and exposes in-page tools over WebMCP. No JavaScript required to read any
        of it.
      </p>

      <div className="agent-panel">
        <div className="agent-term" role="img" aria-label="Terminal example: curl with an Accept text/markdown header returns Markdown">
          <div className="term-bar">
            <span className="tb-dot" />
            <span className="tb-dot" />
            <span className="tb-dot" />
            <span className="tb-title">bash</span>
          </div>
          <pre>
            <code>
              <span className="c-prompt">$</span>{" "}
              <span className="c-cmd">curl</span>{" "}
              <span className="c-flag">-H</span>{" "}
              <span className="c-str">&apos;Accept: text/markdown&apos;</span>{" "}
              \{"\n"}
              {"    "}
              <span className="c-url">0xsamrat.com</span>
              {"\n\n"}
              <span className="c-out"># Samrat Mukherjee — AI Engineer</span>
              {"\n"}
              <span className="c-dim">
                &gt; I build LLM agents that take real actions...
              </span>
              {"\n"}
              <span className="c-dim">## Numbers</span>
              {"\n"}
              <span className="c-dim">
                - **88%** — autonomous answer coverage...
              </span>
            </code>
          </pre>
        </div>

        <ul className="agent-endpoints">
          {ENDPOINTS.map((e) => (
            <li key={e.path}>
              <a href={e.path}>
                <code>{e.path}</code>
              </a>
              <span>{e.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="agent-foot">
        <Link className="btn secondary" href="/agent">
          <span>Open the agent view</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <span className="agent-note">
          Or append <code>?mode=agent</code> to any URL on{" "}
          <span className="nowrap">{SITE_URL.replace("https://", "")}</span>.
        </span>
      </div>
    </section>
  );
}
