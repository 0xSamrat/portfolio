"use client";

import { useState } from "react";

const EMAIL = "samrat.mukherjee2022@gmail.com";

export function ContactCTA() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact">
      <div className="contact">
        <div>
          <h2>
            Let&apos;s <em>build</em> something together.
          </h2>
          <p>
            If you&apos;re hiring for a backend, blockchain, or Go role — or
            just want to talk distributed systems — pick a time. The call is on
            me.
          </p>
        </div>
        <div className="actions">
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
            <span>Download resume</span>
            <span className="arrow">↓</span>
          </a>
          <button
            type="button"
            className={`copy-email${copied ? " copied" : ""}`}
            onClick={copyEmail}
          >
            <span>{EMAIL}</span>
            <span className="copied">copied</span>
          </button>
        </div>
      </div>
    </section>
  );
}
