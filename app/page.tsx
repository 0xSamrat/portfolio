import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { WhatIDo } from "./components/WhatIDo";
import { WorkGrid } from "./components/WorkGrid";
import { Journey } from "./components/Journey";
import { WritingTeaser } from "./components/WritingTeaser";
import { NowWidget } from "./components/NowWidget";
import { Socials } from "./components/Socials";
import { ContactCTA } from "./components/ContactCTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="wrap">
      <TopBar />
      <main>
        <Hero />
        <WhatIDo />
        <WorkGrid />
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
