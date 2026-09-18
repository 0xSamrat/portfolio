"use client";

import { useEffect, useRef } from "react";
import type { JourneyEventData } from "../content/profile";

interface Props {
  event: JourneyEventData;
}

/**
 * Reveal-on-scroll, built so content is never hidden by default.
 *
 * The obvious version — hide everything in CSS, reveal on intersect — leaves the
 * timeline permanently invisible for any reader whose IntersectionObserver never
 * fires. That includes headless renderers, which is exactly what several AI
 * crawlers use. So JS hides an item only if it is genuinely below the fold, and
 * a failsafe reveals everything if the observer has not delivered.
 */
export function JourneyEvent({ event }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    // Already visible on load, or the viewport is tall enough to contain it:
    // leave it alone rather than animating something the reader can already see.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    node.classList.add("t-pending");

    const reveal = () => {
      node.classList.remove("t-pending");
      node.classList.add("t-reveal");
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal();
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(node);

    // Failsafe: if nothing has been delivered, show the content anyway.
    const failsafe = window.setTimeout(reveal, 3000);

    return () => {
      obs.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <article className="t-event" data-kind={event.kind} ref={ref}>
      <div className="t-dot" aria-hidden="true" />
      <div className="t-card">
        <div className="t-row">
          <span className="t-kind">{event.label}</span>
          <span className="t-date">{event.date}</span>
        </div>
        <h3 className="t-title">{event.title}</h3>
        <p className="t-desc">{event.desc}</p>
        {event.link && (
          <a
            className="t-link"
            href={event.link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{event.link.label}</span>
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
        )}
      </div>
    </article>
  );
}
