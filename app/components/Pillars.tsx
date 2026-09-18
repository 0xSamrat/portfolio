import { PILLARS } from "../content/profile";

export function Pillars() {
  return (
    <section id="approach">
      <div className="label">How I build agents</div>
      <h2 className="section-title">
        The interesting part is never the prompt — it&apos;s the{" "}
        <em>boundary around the model</em>.
      </h2>
      <p className="section-sub">
        An agent is only as useful as the worst thing it does unsupervised. Four
        things I get right before anything ships.
      </p>

      <div className="pillars">
        {PILLARS.map((p) => (
          <article className="pillar" key={p.title}>
            <div className="ico" aria-hidden="true">
              {p.icon}
            </div>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <div className="tags">
              {p.stack.map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
