"use client";

import { useEffect, useRef } from "react";

export type EventKind =
  | "job"
  | "win"
  | "grant"
  | "founded"
  | "shipped"
  | "milestone"
  | "ended";

export interface JourneyEventData {
  date: string;
  kind: EventKind;
  label: string;
  title: string;
  desc: string;
  link?: { url: string; label: string };
}

interface Props {
  event: JourneyEventData;
}

export function JourneyEvent({ event }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      node.classList.add("reveal");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <article className="t-event" data-kind={event.kind} ref={ref}>
      <div className="t-dot" />
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
            <span className="arr">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
