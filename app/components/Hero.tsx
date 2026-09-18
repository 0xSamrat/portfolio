import Link from "next/link";
import { PhotoCard } from "./PhotoCard";
import { IDENTITY, LINKS } from "../content/profile";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hello">
          <span className="dot" aria-hidden="true" />
          <span>{IDENTITY.availability}</span>
        </div>

        <h1>
          I build <span className="accent">LLM agents</span>
          <br />
          that take <span className="mark">real actions</span>
          <br />
          for users.
        </h1>

        <p className="sub">
          I&apos;m Samrat — an AI engineer in Bengaluru. Two of my agent products
          are live, one with paying customers. I work on the parts that break in
          production: retrieval grounded in real user data, guardrails that stop
          a model inventing facts, and evals that catch a regression before it
          ships.
        </p>

        <ul className="hero-facts">
          <li>
            <span className="hf-k">Focus</span>
            <span className="hf-v">
              Agent orchestration · RAG · evals &amp; observability
            </span>
          </li>
          <li>
            <span className="hf-k">Stack</span>
            <span className="hf-v">
              Python · LangGraph · Pinecone · FastAPI · Go
            </span>
          </li>
          <li>
            <span className="hf-k">Before this</span>
            <span className="hf-v">
              4 years of Go settlement &amp; trading infrastructure
            </span>
          </li>
        </ul>

        <div className="cta-row">
          <a
            className="btn primary"
            href={LINKS.cal}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Book a 15-min call</span>
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <Link className="btn secondary" href="/work">
            <span>See the work</span>
            <span className="arrow" aria-hidden="true">
              ↘
            </span>
          </Link>
          <a
            className="btn ghost"
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Resume</span>
            <span className="arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>

      <PhotoCard />
    </section>
  );
}
