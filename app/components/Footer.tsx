import Link from "next/link";
import { IDENTITY, LINKS, ROUTES } from "../content/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot-row">
        <span className="foot-copy">
          © 2026 — {IDENTITY.name} · {IDENTITY.location.city},{" "}
          {IDENTITY.location.country}
        </span>
        <nav className="links" aria-label="Social">
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={LINKS.x} target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">
            Medium
          </a>
        </nav>
      </div>

      <div className="foot-row foot-secondary">
        <nav className="links" aria-label="Pages">
          {ROUTES.filter((r) => r.path !== "/").map((r) => (
            <Link key={r.path} href={r.path}>
              {r.path.replace("/", "")}
            </Link>
          ))}
        </nav>
        <nav className="links foot-machine" aria-label="Machine-readable">
          <a href="/llms.txt">llms.txt</a>
          <a href="/agents.md">agents.md</a>
          <a href="/sitemap.xml">sitemap</a>
        </nav>
      </div>
    </footer>
  );
}
