import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

interface Props {
  label: string;
  title: ReactNode;
  lede: ReactNode;
  children: ReactNode;
  /** The Markdown twin, advertised on the page itself. */
  md: string;
}

export function PageShell({ label, title, lede, children, md }: Props) {
  return (
    <div className="wrap">
      <TopBar standalone />
      <main id="main" className="page">
        <header className="page-head">
          <div className="label">{label}</div>
          <h1 className="page-title">{title}</h1>
          <p className="page-lede">{lede}</p>
          <a className="md-chip" href={md}>
            <span aria-hidden="true">↓</span>
            <span>Read as Markdown</span>
            <code>{md}</code>
          </a>
        </header>
        {children}
      </main>
      <Footer />
    </div>
  );
}
