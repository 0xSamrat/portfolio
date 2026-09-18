"use client";

import { useState } from "react";
import { IDENTITY, LINKS } from "../content/profile";

export function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITY.email);
    } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact">
      <div className="contact">
        <div>
          <h2>
            Let&apos;s <em>build</em> something that ships.
          </h2>
          <p>
            If you&apos;re hiring for an AI engineer or agent developer role — or
            you have an agent that works in a demo and falls over in production —
            pick a time. The call is on me.
          </p>
        </div>
        <div className="actions">
          <a
            className="btn primary"
            href={LINKS.cal}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Book a 15-min call</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a
            className="btn secondary"
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Download resume</span>
            <span className="arrow" aria-hidden="true">
              ↓
            </span>
          </a>
          <button
            type="button"
            className={`copy-email${copied ? " copied" : ""}`}
            onClick={copyEmail}
            aria-label={`Copy email address ${IDENTITY.email}`}
          >
            <span>{IDENTITY.email}</span>
            <span className="copied">copied</span>
          </button>
        </div>
      </div>
    </section>
  );
}
