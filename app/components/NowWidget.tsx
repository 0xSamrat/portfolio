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
              Software developer, blockchain developer, Go backend roles.
            </div>
          </div>
          <div className="item">
            <div className="k">Based in</div>
            <div className="v">Bangalore, India (UTC+5:30).</div>
          </div>
        </div>
        <div className="col">
          <div className="item">
            <div className="k">Stack</div>
            <div className="v">
              Go · Kafka · gRPC · Redis · AWS · Postgres · Solidity · EVM · TS ·
              Next.js
            </div>
          </div>
          <div className="item">
            <div className="k">Previously</div>
            <div className="v">
              Backend &amp; blockchain engineer at AtumLabs.
            </div>
          </div>
          <div className="item">
            <div className="k">Reply time</div>
            <div className="v">Same day, usually within a few hours.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
