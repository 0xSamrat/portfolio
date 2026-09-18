import { LINKS } from "../content/profile";

export function WritingTeaser() {
  return (
    <section id="writing">
      <div className="label">Writing</div>
      <div className="writing">
        <div className="badge" aria-hidden="true">
          ¶
        </div>
        <div>
          <h3>Breaking Systems</h3>
          <p>
            An ongoing series on Medium and LinkedIn where I take apart the
            systems I work on — agent architectures, retrieval, and the
            distributed-systems plumbing underneath. The recurring idea: most
            &ldquo;advanced&rdquo; infra is simple once someone bothers to draw
            the picture properly.
          </p>
        </div>
        <a
          className="btn secondary"
          href={LINKS.medium}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Read</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
