import type { Metadata } from "next";
import { PageShell } from "../components/PageShell";
import { CONTENT_UPDATED, IDENTITY, ROUTES, SITE_URL } from "../content/profile";

const route = ROUTES.find((r) => r.path === "/privacy")!;

export const metadata: Metadata = {
  title: "Privacy",
  description: route.description,
  alternates: {
    canonical: "/privacy",
    types: { "text/markdown": [{ url: "/privacy.md", title: "Privacy as Markdown" }] },
  },
  openGraph: {
    type: "website",
    title: route.title,
    description: route.description,
    url: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <PageShell
      label="Privacy"
      title={
        <>
          Almost nothing is collected. <em>Here&apos;s the detail.</em>
        </>
      }
      lede="This is a personal portfolio. No accounts, no login, no contact form, no comments, no payments — and nothing you do here is tied to an identity, because there is no identity to tie it to."
      md="/privacy.md"
    >
      <section className="prose">
        <h2>What is collected</h2>
        <p>
          No analytics, advertising or tracking scripts run on these pages, and
          this site sets no cookies. It is served through a hosting provider and
          a CDN, which keep standard operational request logs — IP address,
          timestamp, requested path, user agent — for delivery, security and
          abuse prevention. Those logs belong to the provider, are retained on
          their schedule, and are not used here to build any profile of you.
        </p>

        <h2>What is stored in your browser</h2>
        <p>
          One item: a <code>theme</code> key in <code>localStorage</code>{" "}
          remembering whether you chose the light or dark theme. It never leaves
          your device and no one else can read it. Clearing site data removes it,
          and the site falls back to your system preference.
        </p>

        <h2>Links off this site</h2>
        <p>
          Pages link to GitHub, LinkedIn, X, Medium, Cal.com, Google Drive and
          the project sites in the work section. Following a link puts you under
          that service&apos;s own privacy policy, which this site does not
          control. The booking link in particular collects whatever you type into
          it, under Cal.com&apos;s policy.
        </p>

        <h2>Email</h2>
        <p>
          If you email{" "}
          <a href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a>, that message
          and address sit in an ordinary mailbox and are used to reply to you and
          nothing else. No mailing list, no newsletter, no sharing with third
          parties.
        </p>

        <h2>Agents and automated readers</h2>
        <p>
          Automated clients are welcome. The Markdown twins,{" "}
          <a href="/llms.txt"><code>llms.txt</code></a> and the{" "}
          <code>.well-known</code> endpoints exist so agents can read this
          profile without executing JavaScript or scraping layout. Nothing here
          is gated, so nothing here needs to be worked around.
        </p>

        <h2>Changes and contact</h2>
        <p>
          This page changes only when the site does; it was last updated{" "}
          {CONTENT_UPDATED}. For anything on this page, email{" "}
          <a href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a>.
        </p>
      </section>
    </PageShell>
  );
}
