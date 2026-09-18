import Link from "next/link";
import { TopBar } from "./components/TopBar";
import { Footer } from "./components/Footer";
import { IDENTITY, ROUTES } from "./content/profile";

/**
 * Real 404 status for humans and agents alike. Agents requesting
 * `Accept: text/markdown` are answered in Markdown by `proxy.ts` before they
 * ever reach this page — see `agent-friendly-404`.
 */
export default function NotFound() {
  return (
    <div className="wrap">
      <TopBar standalone />
      <main id="main" className="page notfound">
        <div className="label">404</div>
        <h1 className="page-title">
          Nothing lives at <em>this path</em>.
        </h1>
        <p className="page-lede">
          Not moved, not removed — this URL has never existed. Here is everything
          that does.
        </p>

        <ul className="nf-list">
          {ROUTES.map((r) => (
            <li key={r.path}>
              <Link href={r.path}>
                <code>{r.path}</code>
                <span>{r.description}</span>
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="nf-foot">
          Agents: <a href="/llms.txt"><code>/llms.txt</code></a> indexes this
          site, <a href="/sitemap.xml"><code>/sitemap.xml</code></a> lists every
          valid URL, and any path answers{" "}
          <code>Accept: text/markdown</code> with a Markdown error body.
          Questions: <a href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a>.
        </p>
      </main>
      <Footer />
    </div>
  );
}
