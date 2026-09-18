import { PROJECTS } from "../content/profile";

export function WorkGrid() {
  return (
    <section id="work">
      <div className="label">Selected work</div>
      <h2 className="section-title">
        Shipped, and <em>running in production</em>.
      </h2>

      <div className="work">
        {PROJECTS.map((item, i) => (
          <a
            key={item.slug}
            className="work-card"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="row1">
              <span className="w-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true">·</span>
              <span>{item.year}</span>
              <span aria-hidden="true">·</span>
              <span className={item.statusAccent ? "accent" : undefined}>
                {item.status}
              </span>
            </div>

            <div className="w-main">
              <h3>{item.name}</h3>
              <p className="w-headline">{item.headline}</p>
              <p className="w-summary">{item.summary}</p>
            </div>

            {item.metric && (
              <div className="w-metric">
                <b>{item.metric.value}</b>
                <span>{item.metric.label}</span>
              </div>
            )}

            <div className="tags">
              {item.stack.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="w-arrow" aria-hidden="true">
              ↗
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
