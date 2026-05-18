export function WritingTeaser() {
  return (
    <section id="writing">
      <div className="label">Writing</div>
      <div className="writing">
        <div className="badge">¶</div>
        <div>
          <h3>Breaking Systems</h3>
          <p>
            An ongoing series on Medium &amp; LinkedIn where I break down
            distributed systems and infrastructure concepts in plain English.
            The recurring idea: most &ldquo;advanced&rdquo; infra is actually
            simple, once someone bothers to draw the picture properly.
          </p>
        </div>
        <a
          className="btn secondary"
          href="https://medium.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Read</span>
          <span className="arrow">→</span>
        </a>
      </div>
    </section>
  );
}
