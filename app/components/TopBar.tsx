"use client";

import { useCallback } from "react";
import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollSpy } from "../hooks/useScrollSpy";

const NAV_ITEMS: { id: string; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "writing", label: "Writing" },
  { id: "now", label: "Currently" },
  { id: "socials", label: "Socials" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

export function TopBar() {
  const activeId = useScrollSpy(SECTION_IDS);

  const handleNavClick = useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      ev.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    },
    [],
  );

  return (
    <header className="topbar" id="top">
      <a className="brand" href="#top" aria-label="0xsamrat — home">
        <span className="logo-chip" aria-hidden="true">
          0x
        </span>
        <span className="logo-word">
          samrat<span className="cursor">_</span>
        </span>
      </a>

      <nav className="topnav" aria-label="Sections">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={activeId === item.id ? "active" : undefined}
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
