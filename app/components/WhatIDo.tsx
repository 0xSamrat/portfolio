export function WhatIDo() {
  return (
    <section>
      <div className="label">What I do</div>
      <h2 className="section-title">
        A bit of building, a bit of <em>writing</em>, a lot of shipping.
      </h2>

      <div className="trio">
        <div className="card a">
          <div className="ico">G</div>
          <h3>Backend systems</h3>
          <p>
            Go services that don&apos;t fall over. Kafka, gRPC, Redis, Postgres,
            AWS — the boring-reliable stack.
          </p>
        </div>
        <div className="card b">
          <div className="ico">⬡</div>
          <h3>On-chain stuff</h3>
          <p>
            Solidity contracts, EVM tooling, DeFi mechanics. Built &amp; shipped
            a perpetual futures DEX.
          </p>
        </div>
        <div className="card c">
          <div className="ico">¶</div>
          <h3>Writing</h3>
          <p>
            <em>Breaking Systems</em> on Medium &amp; LinkedIn — distributed
            systems explained in plain English.
          </p>
        </div>
      </div>
    </section>
  );
}
