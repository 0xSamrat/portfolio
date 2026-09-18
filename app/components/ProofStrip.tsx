import { METRICS } from "../content/profile";

/**
 * The numbers, directly under the hero. These are the strongest thing on the
 * page and the old site buried them.
 */
export function ProofStrip() {
  return (
    <section className="proof" aria-label="Outcomes">
      <div className="label">Outcomes</div>
      <div className="proof-grid">
        {METRICS.map((m) => (
          <div className="proof-item" key={m.label}>
            <b className="proof-value">{m.value}</b>
            <span className="proof-label">{m.label}</span>
            <span className="proof-detail">{m.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
