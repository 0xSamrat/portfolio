import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { IDENTITY, LINKS, ROUTES, SITE_URL } from "./content/profile";
import { graphJson } from "./lib/jsonld";
import { WebMcp } from "./components/WebMcp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const home = ROUTES[0];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: home.title,
    template: `%s — ${IDENTITY.name}`,
  },
  description: home.description,
  applicationName: IDENTITY.name,
  authors: [{ name: IDENTITY.name, url: SITE_URL }],
  creator: IDENTITY.name,
  publisher: IDENTITY.name,
  category: "technology",
  keywords: [
    "AI engineer",
    "AI agent developer",
    "LLM agents",
    "LangGraph",
    "RAG",
    "retrieval-augmented generation",
    "LLM evals",
    "LLM observability",
    "prompt injection defense",
    "Python",
    "FastAPI",
    "Go backend engineer",
    "Bengaluru",
    "Samrat Mukherjee",
  ],
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": [{ url: "/index.md", title: `${IDENTITY.name} as Markdown` }],
      "text/plain": [{ url: "/llms.txt", title: "llms.txt index" }],
    },
  },
  openGraph: {
    type: "profile",
    siteName: IDENTITY.name,
    title: home.title,
    description: home.description,
    url: SITE_URL,
    locale: "en_US",
    firstName: "Samrat",
    lastName: "Mukherjee",
    username: "0xSamrat",
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
    creator: "@0x_samrat",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    // Selects the default check lens on the Is Agentic report. A personal
    // portfolio is a marketing surface for one person, so: business.
    "is-agentic-site-type": "business",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ed" },
    { media: "(prefers-color-scheme: dark)", color: "#100e0a" },
  ],
  colorScheme: "light dark",
};

// Also marks the document as JS-capable, which is what gates the reveal-on-scroll
// animations. Without JS the content stays plainly visible instead of stuck at
// opacity 0.
const themeBootstrap = `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link
          rel="alternate"
          type="text/markdown"
          href={`${SITE_URL}/index.md`}
          title="Markdown"
        />
        <link
          rel="alternate"
          type="text/plain"
          href={`${SITE_URL}/llms.txt`}
          title="llms.txt"
        />
        <link rel="help" type="text/markdown" href={`${SITE_URL}/agents.md`} />
        <link rel="me" href={LINKS.github} />
        <link rel="me" href={LINKS.linkedin} />
        <script
          type="application/ld+json"
          // Server-rendered so agents that never run JavaScript still read it.
          dangerouslySetInnerHTML={{ __html: graphJson("/") }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <WebMcp />
      </body>
    </html>
  );
}
