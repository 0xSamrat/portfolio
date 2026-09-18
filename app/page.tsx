import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { ProofStrip } from "./components/ProofStrip";
import { Pillars } from "./components/Pillars";
import { WorkGrid } from "./components/WorkGrid";
import { Experience } from "./components/Experience";
import { Journey } from "./components/Journey";
import { AgentReadable } from "./components/AgentReadable";
import { WritingTeaser } from "./components/WritingTeaser";
import { NowWidget } from "./components/NowWidget";
import { Socials } from "./components/Socials";
import { ContactCTA } from "./components/ContactCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="wrap">
      <TopBar />
      <main id="main">
        <Hero />
        <ProofStrip />
        <Pillars />
        <WorkGrid />
        <Experience />
        <AgentReadable />
        <Journey />
        <WritingTeaser />
        <NowWidget />
        <Socials />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
