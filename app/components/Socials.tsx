"use client";

import { useState } from "react";

const EMAIL = "samrat.mukherjee2022@gmail.com";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.65 3.01 8.6 7.2 9.99.53.1.72-.23.72-.51v-1.8c-2.93.64-3.55-1.41-3.55-1.41-.48-1.22-1.17-1.55-1.17-1.55-.96-.66.07-.65.07-.65 1.06.08 1.62 1.09 1.62 1.09.94 1.62 2.48 1.15 3.08.88.1-.69.37-1.15.67-1.41-2.34-.27-4.79-1.17-4.79-5.2 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.34.1-2.8 0 0 .88-.28 2.88 1.08.84-.23 1.73-.35 2.62-.35.89 0 1.78.12 2.62.35 2-1.36 2.88-1.08 2.88-1.08.57 1.46.21 2.53.1 2.8.67.74 1.08 1.68 1.08 2.83 0 4.04-2.46 4.93-4.81 5.19.38.33.71.97.71 1.95v2.89c0 .28.19.61.73.51 4.18-1.4 7.19-5.35 7.19-9.99 0-5.8-4.7-10.5-10.5-10.5z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8.34 18H5.67V9.5h2.67V18zM7 8.27a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zM18.34 18h-2.67v-4.13c0-.98-.02-2.25-1.37-2.25s-1.58 1.07-1.58 2.18V18h-2.67V9.5h2.56v1.16h.04c.36-.68 1.23-1.4 2.53-1.4 2.7 0 3.2 1.78 3.2 4.1V18z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.32 8.36L23 22h-6.75l-5.29-6.92L4.8 22H1.54l7.83-8.94L1 2h6.91l4.78 6.32L18.244 2zm-1.18 18h1.88L7.04 4H5.04l12.024 16z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function Socials() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="socials">
      <div className="label">Socials</div>
      <h2 className="section-title">
        Find me <em>elsewhere</em>.
      </h2>

      <div className="socials-grid">
        <a
          className="social-card"
          href="https://github.com/0x-samrat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="social-chip">
            <GithubIcon />
          </span>
          <div>
            <div className="social-platform">GitHub</div>
            <div className="social-handle">/0x-samrat</div>
          </div>
          <span className="social-arrow">↗</span>
        </a>

        <a
          className="social-card"
          href="https://www.linkedin.com/in/samrat-mukherjee00/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="social-chip">
            <LinkedInIcon />
          </span>
          <div>
            <div className="social-platform">LinkedIn</div>
            <div className="social-handle">/in/samrat-mukherjee00</div>
          </div>
          <span className="social-arrow">↗</span>
        </a>

        <a
          className="social-card"
          href="https://x.com/0x_samrat"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="social-chip">
            <XIcon />
          </span>
          <div>
            <div className="social-platform">X</div>
            <div className="social-handle">@0x_samrat</div>
          </div>
          <span className="social-arrow">↗</span>
        </a>

        <button
          type="button"
          className={`social-card${copied ? " copied" : ""}`}
          onClick={copyEmail}
        >
          <span className="social-chip">
            <MailIcon />
          </span>
          <div>
            <div className="social-platform">Email</div>
            <div className="social-handle">{EMAIL}</div>
          </div>
          <span className="social-arrow">⧉</span>
        </button>
      </div>
    </section>
  );
}
