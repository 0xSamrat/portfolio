# 0xSamrat — Portfolio

Personal portfolio site for **Samrat Mukherjee** — backend & blockchain
developer based in Bangalore, India.

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and TypeScript.

---

## Highlights

- **Light / dark theme** with a circular-reveal View Transitions swap, persisted
  to `localStorage`, with a no-FOUC inline bootstrap script.
- **Sticky pill nav** with `requestAnimationFrame`-throttled scroll-spy.
- **Live local clock** showing the visitor's own city and current time,
  resolved via `Intl.DateTimeFormat`.
- **Chronological journey timeline** from 2022 → present, with sticky year
  labels and per-event `IntersectionObserver` reveal animations.
- **Click-to-copy email** in the socials grid and the contact CTA, with inline
  `copied ✓` feedback.
- **Reduced-motion** media query disables the photo-card tilt and dampens
  animations.
- 100 % responsive — nine breakpoints from 1080 px down to 360 px.

---

## Tech stack

| Layer        | Choice                                                                |
| ------------ | --------------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org/) (App Router, Turbopack by default)  |
| UI           | [React 19](https://react.dev/)                                        |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first `@theme`)      |
| Language     | TypeScript 5                                                          |
| Fonts        | [Geist + Geist Mono](https://vercel.com/font) via `next/font/google`  |
| Icons        | Inline SVG (GitHub, LinkedIn, X, Mail)                                |
| Linting      | ESLint 9 (flat config)                                                |

---

## Project structure

```
.
├── app/
│   ├── layout.tsx                # Fonts + theme bootstrap, metadata
│   ├── page.tsx                  # Composes all sections in order
│   ├── globals.css               # Tailwind + theme tokens + section styles
│   ├── components/
│   │   ├── TopBar.tsx            # Sticky pill: brand · nav · clock · theme
│   │   ├── Clock.tsx             # Live local time for the visitor
│   │   ├── ThemeToggle.tsx       # Sun / moon segmented control
│   │   ├── Hero.tsx              # Greeting, CTAs, photo card
│   │   ├── PhotoCard.tsx         # Tilted card + floater chip
│   │   ├── WhatIDo.tsx           # 3-card trio with tinted blur blobs
│   │   ├── WorkGrid.tsx          # 2 × 2 work cards
│   │   ├── Journey.tsx           # Vertical timeline w/ sticky year markers
│   │   ├── JourneyEvent.tsx      # Single event card (typed by kind)
│   │   ├── WritingTeaser.tsx
│   │   ├── NowWidget.tsx
│   │   ├── Socials.tsx           # 4 social cards
│   │   ├── ContactCTA.tsx        # Dark block with primary CTA
│   │   └── Footer.tsx
│   └── hooks/
│       ├── useTheme.ts           # light/dark with View-Transitions reveal
│       ├── useScrollSpy.ts       # Tracks active section as user scrolls
│       └── useDualClock.ts
├── public/
│   ├── photo.jpg                 # Headshot (4:5 aspect ratio recommended)
│   └── resume.pdf                # Replace with the real file
├── design_handoff_portfolio/     # Original design brief + HTML prototype
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

`app/components/` are mostly **server components** by default; only those that
need browser APIs or state (`TopBar`, `Clock`, `ThemeToggle`, `Hero`,
`JourneyEvent`, `Socials`, `ContactCTA`) are marked `"use client"`.

---

## Getting started

### Prerequisites

- **Node.js ≥ 20.9** (Next.js 16 minimum)
- **npm 10+** (or pnpm / yarn / bun — adjust commands accordingly)

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Turbopack powers both dev
and build by default in Next.js 16.

### Production build

```bash
npm run build    # outputs to .next/
npm run start    # serves the production build on :3000
```

### Lint

```bash
npm run lint
```

(`next lint` was removed in Next 16 — this runs the ESLint CLI directly via the
flat config in [eslint.config.mjs](eslint.config.mjs).)

---

## Design system

All design tokens live in [app/globals.css](app/globals.css) as CSS custom
properties, exposed to Tailwind v4 via an `@theme inline` block. The theme
swaps by toggling `data-theme="dark"` on `<html>`.

### Colors (light)

| Token         | Value                       | Use                                |
| ------------- | --------------------------- | ---------------------------------- |
| `--bg`        | `#faf6ed`                   | Warm cream page background         |
| `--surface`   | `#ffffff`                   | Card / pill surface                |
| `--surface-2` | `#f3eee0`                   | Tag chips, inner card surface      |
| `--ink`       | `#161512`                   | Primary text + logo chip           |
| `--ink-soft`  | `#3d362e`                   | Secondary text                     |
| `--muted`     | `#7a7167`                   | Tertiary text / mono labels        |
| `--rule`      | `#e8e0cf`                   | Hairline borders                   |
| `--accent`    | `oklch(0.62 0.16 35)`       | Coral / rust                       |
| `--mark`      | `oklch(0.92 0.14 95)`       | Highlighter yellow                 |
| `--tint-a/b/c`| peach / mint / lavender     | Trio card blur blobs               |

Dark equivalents are declared under `[data-theme="dark"]` in the same file.

### Typography

- **Geist** — all body text, headings, UI labels
- **Geist Mono** — timestamps, kind badges, social handles, microcopy

Hero uses `clamp(40px, 5.6vw, 62px)`; section titles `clamp(26px, 3.4vw, 36px)`.

### Radii / shadows

- Pills / buttons: `999px`
- Cards: `16–22px`
- Photo card outer: `24px` (inner `14px`)
- Contact block: `28px`
- Shadows use `rgba(40, 30, 20, …)` in light and pure black at higher opacity in
  dark.

---

## Theming internals

The toggle in [`useTheme.ts`](app/hooks/useTheme.ts) wraps the
`document.documentElement.setAttribute("data-theme", …)` call in
`document.startViewTransition()` when available, producing a smooth crossfade.
The current mode is persisted to `localStorage["theme"]` and read by an inline
`<script>` injected in [`app/layout.tsx`](app/layout.tsx) before hydration so
there's no flash of the wrong theme.

If `localStorage` is empty, the bootstrap falls back to
`matchMedia('(prefers-color-scheme: dark)')`.

---

## Customization checklist

Live links are already wired (Cal.com → `cal.com/0xsamrat/15min`, résumé →
Google Drive, Medium → `medium.com/@0xSamrat`, GitHub → `github.com/0xSamrat`).
The remaining content lives in typed constants:

| Item                  | Where                                                                                |
| --------------------- | ------------------------------------------------------------------------------------ |
| Headshot              | [`public/photo.jpg`](public/) — 4:5 ratio, ≥ 640 × 800 recommended                   |
| Journey events        | [`Journey.tsx`](app/components/Journey.tsx) — `TIMELINE` constant                    |
| Selected-work items   | [`WorkGrid.tsx`](app/components/WorkGrid.tsx) — `WORK` constant                      |
| Now-widget rows       | [`NowWidget.tsx`](app/components/NowWidget.tsx)                                      |
| Social handles & URLs | [`Socials.tsx`](app/components/Socials.tsx)                                          |
| CTA / Medium URLs     | [`Hero.tsx`](app/components/Hero.tsx), [`ContactCTA.tsx`](app/components/ContactCTA.tsx), [`WritingTeaser.tsx`](app/components/WritingTeaser.tsx) |

The journey timeline runs **chronologically** (2022 → now), ending at the
"● You're here" marker. Edit the `TIMELINE` array to add or reorder events.

Email is hard-coded as `samrat.mukherjee2022@gmail.com` in
[`Socials.tsx`](app/components/Socials.tsx) and
[`ContactCTA.tsx`](app/components/ContactCTA.tsx). Search and replace if you
fork.

---

## Accessibility

- Focus rings are visible-only (`:focus-visible`) and use the accent color.
- All interactive cards expose semantic roles (`<a>` for navigation,
  `<button type="button">` for click-to-copy actions).
- Decorative SVGs are marked `aria-hidden="true"`.
- Touch targets are ≥ 44 px (cards/buttons have generous padding).
- A `prefers-reduced-motion` block disables the photo-card tilt and dampens all
  animations.

---

## Browser support

Per Next.js 16 baseline: Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+.
Older browsers gracefully degrade — `oklch()`, `color-mix()`, View Transitions,
and `IntersectionObserver` are all behind capability checks or have static
fallbacks.

---

## Deployment

Optimized for [Vercel](https://vercel.com/) — push to a Git remote, import the
repo, and deploy. No environment variables required.

For self-hosting:

```bash
npm run build
npm run start    # Node server on :3000
```

The `.next/standalone` output is not enabled by default; if you need a minimal
runtime image, set `output: "standalone"` in [`next.config.ts`](next.config.ts).

---

## Scripts

| Command            | What it does                                  |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Start the Turbopack dev server on :3000       |
| `npm run build`    | Production build (Turbopack)                  |
| `npm run start`    | Serve the production build                    |
| `npm run lint`     | Run ESLint                                    |

---

## License

Private — © 2026 Samrat Mukherjee. All rights reserved.
