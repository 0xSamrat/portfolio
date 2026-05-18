"use client";

import { useState } from "react";
import { PhotoCard } from "./PhotoCard";

const EMAIL = "samrat.mukherjee2022@gmail.com";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <section className="hero">
      <div>
        <div className="hello">
          <span className="dot" />
          <span>Open to work · full-time · remote</span>
        </div>

        <h1>
          <span className="wave">👋</span>&nbsp;Hey, I&apos;m Samrat.<br />
          I build <span className="accent">backends</span> &amp;<br />
          <span className="mark">blockchain</span> things.
        </h1>

        <p className="sub">
          Software &amp; blockchain developer based in Bangalore. I love taking
          gnarly infrastructure ideas and making them feel obvious — that
          instinct shapes both the products I ship and the writing I publish.
        </p>

        <div className="cta-row">
          <a
            className="btn primary"
            href="https://cal.com/samrat-mukherjee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Book a 15-min call</span>
            <span className="arrow">→</span>
          </a>
          <a
            className="btn secondary"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Resume</span>
            <span className="arrow">↓</span>
          </a>
          <button
            type="button"
            className="btn ghost"
            onClick={copyEmail}
            title="Click to copy"
            style={{
              border: "none",
              color: copied ? "var(--accent)" : undefined,
            }}
          >
            <span className="email-text">{copied ? "copied ✓" : EMAIL}</span>
          </button>
        </div>
      </div>

      <PhotoCard />
    </section>
  );
}
