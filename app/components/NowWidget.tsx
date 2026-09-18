import { IDENTITY, LINKS } from "../content/profile";

export function NowWidget() {
  return (
    <section id="now">
      <div className="label">Currently</div>
      <h2 className="section-title">Where I&apos;m at, right now.</h2>

      <div className="now">
        <div className="col">
          <div className="item">
            <div className="k">Status</div>
            <div className="v">
              <em>Open to work</em> — full-time, remote-friendly.
            </div>
          </div>
          <div className="item">
            <div className="k">Looking for</div>
            <div className="v">
              AI engineer, AI agent developer, and applied-LLM roles. Go backend
              work too, where the agents need something reliable underneath.
            </div>
          </div>
          <div className="item">
            <div className="k">Based in</div>
            <div className="v">
              {IDENTITY.location.city}, {IDENTITY.location.country} (
              {IDENTITY.location.utcOffset}).
            </div>
          </div>
        </div>
        <div className="col">
          <div className="item">
            <div className="k">Stack</div>
            <div className="v">
              Python · LangGraph · Pinecone · FastAPI · Pydantic · LangSmith ·
              OpenTelemetry · Go · Postgres · Docker
            </div>
          </div>
          <div className="item">
            <div className="k">Building</div>
            <div className="v">
              <a href="https://shortlistapp.co" target="_blank" rel="noopener noreferrer">
                Shortlistapp.co
              </a>{" "}
              — an agent that applies to jobs end to end, with paying customers.
            </div>
          </div>
          <div className="item">
            <div className="k">Reply time</div>
            <div className="v">
              Same day, usually within a few hours —{" "}
              <a href={LINKS.cal} target="_blank" rel="noopener noreferrer">
                or just book a slot
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
