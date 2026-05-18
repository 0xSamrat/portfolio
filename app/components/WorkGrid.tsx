interface WorkItem {
  index: string;
  meta: string;
  status: string;
  statusAccent?: boolean;
  title: string;
  desc: string;
  tags: string[];
  href: string;
}

const WORK: WorkItem[] = [
  {
    index: "01",
    meta: "2024",
    status: "Soonami C5",
    statusAccent: true,
    title: "Defipe",
    desc: "A perpetual futures DEX built in Go. Off-chain orderbook, on-chain settlement — peaked at ~500 monthly active users; won a grant from Soonami's Venturethon cohort.",
    tags: ["Go", "Solidity", "Kafka", "EVM"],
    href: "https://devfolio.co/projects/defipe-b5ba",
  },
  {
    index: "02",
    meta: "2025",
    status: "SaaS",
    title: "useicebreakr",
    desc: "Turns any LinkedIn profile into a personalized outreach DM. Research, hooks, ready-to-send — in one click.",
    tags: ["TypeScript", "Next.js", "LLM"],
    href: "https://useicebreakr.com",
  },
  {
    index: "03",
    meta: "Civic tech",
    status: "500+ /mo",
    title: "NetaGiriFiles",
    desc: "Surfaces Indian politicians' publicly declared affidavits through searchable visualizations and a public API.",
    tags: ["TS", "Next.js", "Public API"],
    href: "https://www.netagirifiles.fun",
  },
  {
    index: "04",
    meta: "ETHGlobal",
    status: "Winner",
    statusAccent: true,
    title: "Ape DAO 2.0",
    desc: "Two-time hackathon winner — Ape DAO 2.0 at ETHGlobal, Defipe at ETH for ALL. Onchain governance experiments.",
    tags: ["Solidity", "Hackathon"],
    href: "https://ethglobal.com/showcase/ape-dao-2-0-i846k",
  },
];

export function WorkGrid() {
  return (
    <section id="work">
      <div className="label">Selected work</div>
      <h2 className="section-title">
        Things I&apos;ve shipped <em>so far</em>.
      </h2>

      <div className="work">
        {WORK.map((item) => (
          <a
            key={item.index}
            className="work-card"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="row1">
              <span>{item.index}</span>
              <span>·</span>
              <span>{item.meta}</span>
              <span>·</span>
              <span className={item.statusAccent ? "accent" : undefined}>
                {item.status}
              </span>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
            <div className="tags">
              {item.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="w-arrow">↗</div>
          </a>
        ))}
      </div>
    </section>
  );
}
