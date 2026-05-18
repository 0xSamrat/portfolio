import { JourneyEvent, type JourneyEventData } from "./JourneyEvent";

interface YearGroup {
  year: string;
  entries: JourneyEventData[];
}

const TIMELINE: YearGroup[] = [
  {
    year: "2022",
    entries: [
      {
        date: "Feb 2022",
        kind: "job",
        label: "Joined",
        title: "Started at TechExactly",
        desc: "First gig in tech. Picked up the fundamentals.",
      },
    ],
  },
  {
    year: "2023",
    entries: [
      {
        date: "Feb 2023",
        kind: "win",
        label: "Winner",
        title: "Won ETH for ALL hackathon",
        desc: "First hackathon win — with the project that would become Defipe.",
        link: {
          url: "https://devfolio.co/projects/defipe-b5ba",
          label: "devfolio.co",
        },
      },
      {
        date: "Jun 2023",
        kind: "founded",
        label: "Founded",
        title: "Founded Defipe",
        desc: "A perpetual futures DEX built in Go. Off-chain orderbook, on-chain settlement.",
      },
      {
        date: "Sep 2023",
        kind: "win",
        label: "Winner",
        title: "Won ETHGlobal hackathon",
        desc: "Second hackathon win — Ape DAO 2.0, an onchain governance experiment.",
        link: {
          url: "https://ethglobal.com/showcase/ape-dao-2-0-i846k",
          label: "ethglobal.com",
        },
      },
    ],
  },
  {
    year: "2024",
    entries: [
      {
        date: "Sep 2024",
        kind: "grant",
        label: "Grant",
        title: "Soonami Venturethon Cohort 5",
        desc: "3-month cohort + grant for Defipe. Worked with Soonami's network of founders and builders.",
        link: {
          url: "https://app.foundance.org/projects/11247",
          label: "foundance.org",
        },
      },
      {
        date: "Nov 2024",
        kind: "milestone",
        label: "Milestone",
        title: "Defipe → 500 monthly active users",
        desc: "Peak usage. Real people trading perps through the DEX.",
      },
    ],
  },
  {
    year: "2025",
    entries: [
      {
        date: "May 2025",
        kind: "ended",
        label: "Wound down",
        title: "Shut down Defipe",
        desc: "End of a two-year run. Took the lessons, kept the scars.",
      },
      {
        date: "Aug 2025",
        kind: "job",
        label: "Joined",
        title: "Backend / blockchain engineer at AtumLabs",
        desc: "Production systems, on-chain plumbing, and a lot of Go.",
      },
      {
        date: "Dec 2025",
        kind: "shipped",
        label: "Shipped",
        title: "Dust-Sweeper · BLOKCapital hackathon",
        desc: "Built a dust-token sweeper for EVM wallets in 48 hours.",
        link: {
          url: "https://github.com/0xSamrat/Dust-Sweeper-",
          label: "github.com/0xSamrat/Dust-Sweeper-",
        },
      },
    ],
  },
  {
    year: "2026",
    entries: [
      {
        date: "Jan 2026",
        kind: "shipped",
        label: "Shipped",
        title: "TweetBet · ETHGlobal hackathon",
        desc: "A prediction market for tweet outcomes. Onchain bets, oracle resolution.",
        link: {
          url: "https://github.com/0xSamrat/tweetbet",
          label: "github.com/0xSamrat/tweetbet",
        },
      },
      {
        date: "Feb 2026",
        kind: "shipped",
        label: "Shipped",
        title: "Beyond-Perps · Binance in-person hackathon",
        desc: "Pushed perp DEX mechanics further — variable funding, deeper books.",
        link: {
          url: "https://github.com/0xSamrat/Beyond-Perps",
          label: "github.com/0xSamrat/Beyond-Perps",
        },
      },
      {
        date: "Apr 2026",
        kind: "shipped",
        label: "Launched",
        title: "NetaGiriFiles",
        desc: "A civic-tech platform surfacing Indian politicians' publicly declared affidavit data — searchable visualizations and a public API. 500+ visitors/month.",
        link: {
          url: "https://www.netagirifiles.fun/",
          label: "netagirifiles.fun",
        },
      },
      {
        date: "May 2026",
        kind: "shipped",
        label: "Launched",
        title: "useicebreakr",
        desc: "Turns any LinkedIn profile into a personalized outreach DM — research, hooks, ready-to-send — in one click.",
        link: {
          url: "https://useicebreakr.com/",
          label: "useicebreakr.com",
        },
      },
    ],
  },
];

export function Journey() {
  return (
    <section id="journey">
      <div className="label">The journey</div>
      <h2 className="section-title">
        From 2022 to <em>now</em>.
      </h2>
      <p className="journey-sub">
        A rough chronology — wins, founds, ships, milestones.
      </p>

      <div className="journey-stats">
        <div className="js-stat">
          <b>4</b>
          <span>years in</span>
        </div>
        <div className="js-stat">
          <b>2×</b>
          <span>hackathon wins</span>
        </div>
        <div className="js-stat">
          <b>1×</b>
          <span>grant + cohort</span>
        </div>
        <div className="js-stat">
          <b>5</b>
          <span>shipped recently</span>
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
            <div className="t-now-dot" />
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
