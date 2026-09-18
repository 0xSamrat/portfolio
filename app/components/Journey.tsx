import { JourneyEvent } from "./JourneyEvent";
import { TIMELINE } from "../content/profile";

export function Journey() {
  return (
    <section id="journey">
      <div className="label">The journey</div>
      <h2 className="section-title">
        From 2022 to <em>now</em>.
      </h2>
      <p className="section-sub">
        Chronological — wins, founds, ships, and one shutdown that taught more
        than the wins did.
      </p>

      <div className="journey-stats">
        <div className="js-stat">
          <b>4</b>
          <span>years building</span>
        </div>
        <div className="js-stat">
          <b>2×</b>
          <span>hackathon wins</span>
        </div>
        <div className="js-stat">
          <b>$1k</b>
          <span>venture grant</span>
        </div>
        <div className="js-stat">
          <b>2</b>
          <span>live AI products</span>
        </div>
      </div>

      <div className="timeline">
        {TIMELINE.map((group) => (
          <div className="t-year-group" key={group.year}>
            <div className="t-year">{group.year}</div>
            <div className="t-events">
              {group.entries.map((entry) => (
                <JourneyEvent
                  key={`${group.year}-${entry.date}-${entry.title}`}
                  event={entry}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="t-now">
          <div />
          <div className="t-now-line">
            <div className="t-now-dot" aria-hidden="true" />
            <div className="t-now-text">
              <b>● You&apos;re here</b> — open to work, taking calls, shipping
              next.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
