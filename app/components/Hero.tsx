import { PhotoCard } from "./PhotoCard";

export function Hero() {
  return (
    <section className="hero">
      <div>
        <div className="hello">
          <span className="dot" />
          <span>Open to work · full-time · remote</span>
        </div>

        <h1>
          <span className="wave">👋</span>&nbsp;Hey, I&apos;m Samrat.<br />
          I build <span className="accent">backends</span> &amp;<br />
          <span className="mark">blockchain</span> things.
        </h1>

        <p className="sub">
          Software &amp; blockchain developer based in Bangalore. I love taking
          gnarly infrastructure ideas and making them feel obvious — that
          instinct shapes both the products I ship and the writing I publish.
        </p>

        <div className="cta-row">
          <a
            className="btn primary"
            href="https://cal.com/0xsamrat/15min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Book a 15-min call</span>
            <span className="arrow">→</span>
          </a>
          <a
            className="btn secondary"
            href="https://drive.google.com/file/d/14feSsx0a-vZ4A2sf8XZluPPLiVPx2DK_/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Resume</span>
            <span className="arrow">↓</span>
          </a>
        </div>
      </div>

      <PhotoCard />
    </section>
  );
}
