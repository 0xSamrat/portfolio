"use client";

import { useCallback } from "react";
import Link from "next/link";
import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollSpy } from "../hooks/useScrollSpy";

const NAV_ITEMS: { id: string; label: string }[] = [
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "agents", label: "For agents" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

interface Props {
  /** Off the homepage the in-page anchors do not exist, so link home instead. */
  standalone?: boolean;
}

export function TopBar({ standalone = false }: Props) {
  const activeId = useScrollSpy(standalone ? [] : SECTION_IDS);

  const handleNavClick = useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      if (standalone) return;
      ev.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
    },
    [standalone],
  );

  return (
    <header className="topbar" id="top">
      <Link className="brand" href="/" aria-label="0xsamrat — home">
        <span className="logo-chip" aria-hidden="true">
          0x
        </span>
        <span className="logo-word">
          samrat<span className="cursor" aria-hidden="true">_</span>
        </span>
      </Link>

      <nav className="topnav" aria-label="Sections">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={standalone ? `/#${item.id}` : `#${item.id}`}
            className={activeId === item.id ? "active" : undefined}
            aria-current={activeId === item.id ? "true" : undefined}
            onClick={(ev) => handleNavClick(ev, item.id)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="topbar-right">
        <Clock />
        <ThemeToggle />
      </div>
    </header>
  );
}
