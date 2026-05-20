# kleinheisterkamp.com

Website of **Prof. Dr. Jan Kleinheisterkamp** — international arbitrator and
mediator, Brussels. A static, fast, accessible rebuild of the previous
WordPress/Elementor site.

## Stack

- **[Astro 5](https://astro.build)** — static site generator (zero JS shipped by default)
- **Tailwind CSS 3** — design system in `tailwind.config.mjs`
- **TypeScript** — strict mode
- **Content collections** — all editable content lives in `src/content/` as Markdown
- Self-hosted fonts (Fraunces + Inter, via `@fontsource`) — no Google Fonts request, no layout shift

No CMS, no database, no server. The output is plain HTML/CSS in `dist/`.

## Commands

```bash
npm install      # install dependencies
npm run dev      # local dev server  → http://localhost:4321
npm run build    # production build   → ./dist
npm run preview  # serve the built site locally
```

Requires Node 20+.

## Editing content

All text the client may want to change is in **Markdown** under `src/content/` —
no need to touch code:

| File | Page |
|---|---|
| `src/content/pages/about.md` | About |
| `src/content/pages/practice.md` | Practice (Arbitration + Mediation) |
| `src/content/team/*.md` | Team profiles (one file per person) |
| `src/content/lists/experience.md` | Experience (case list) |
| `src/content/lists/publications.md` | Publications |
| `src/content/lists/speaking.md` | Speaking |

Each file has a small `--- frontmatter ---` block at the top (title, intro,
image paths, CV link) followed by the body text in Markdown. Bullet lists use
`- `; links use `[label](https://url)`.

Site-wide details (address, phone, email, VAT, navigation) are in
`src/data/site.ts`.

Images and PDFs live in `public/images/` and `public/cv/` and are served
as-is. To replace a photo, drop a file with the same name.

## Deployment

The site is a static bundle. Configuration is provided for **both** hosts:

- **Netlify** — `netlify.toml` (build `npm run build`, publish `dist`). Connect
  the repo and deploy; no settings needed.
- **Vercel** — `vercel.json` (framework preset `astro`, clean URLs). Import the
  repo and deploy.

Before going live, set the production domain in **two** places if it differs
from `https://kleinheisterkamp.com`:
`astro.config.mjs` (`site:`) and `public/robots.txt` (sitemap URL).

## Contact form

`src/pages/contact.astro` ships with a **mailto fallback** (opens the
visitor's email client, pre-filled). To use a real form backend instead, create
a free [Formspree](https://formspree.io) form and set its endpoint in the
`FORMSPREE_ENDPOINT` constant at the top of that file — the form auto-switches
to AJAX submission, no other change needed.

## Design system & decisions

The design targets the register of top London barristers' chambers and boutique
arbitration practices (Three Crowns, Brick Court, Essex Court) and editorial
magazines (Apollo, The Economist) — confident, timeless, never trendy. All
tokens live in `tailwind.config.mjs`; primitives are previewable on the hidden
**`/styleguide`** route (noindex, not in nav, excluded from sitemap & robots).

### Typography

- **Display — Fraunces Variable** (SIL OFL, self-hosted via `@fontsource`). A
  high-contrast "old-style" display serif with a true editorial voice, close in
  spirit to Tiempos/GT Sectra but freely licensed. It is tuned to a classic
  register via `font-variation-settings: 'opsz' 144, 'SOFT' 0, 'WONK' 0` —
  maximum optical size, **zero** softness and **zero** wonk, so it reads
  authoritative rather than quirky. Weight ~480. Negative tracking on large
  sizes (−0.018em to −0.025em).
- **Body — Inter Variable** (SIL OFL, self-hosted). Neutral, highly legible.
  Body is 17px (`1.0625rem`) at line-height 1.7; lede scales 18–22px.
- H1 uses `clamp(2.75rem, 6vw, 4.5rem)` — ~44–72px on desktop.
- Caps + letter-spacing is used **only** on short meta labels/eyebrows, never on
  sentences.
- *Why Fraunces over EB Garamond (v1):* EB Garamond read like a book body face
  and lacked presence at display sizes; Fraunces gives the confident editorial
  masthead quality the brief asked for. Self-hosted → no Google Fonts request,
  no layout shift, Lighthouse-friendly.

### Colour (4 tokens, used sparingly)

| Token | Hex | Use |
|---|---|---|
| `paper` / `paper-dim` / `paper-deep` | `#FAF8F4` / `#F1EDE3` / `#EAE4D7` | warm off-white surfaces; dim = alternating section bands |
| `ink` / `ink-muted` / `ink-soft` / `ink-line` | `#1A1A1A` / `#46433E` / `#6F6A60` / `#DCD6C9` | near-black warm text, body, meta, **1px hairlines** |
| `bordeaux` / `bordeaux-hover` | `#6B1F1F` / `#511717` | the single accent — section numbers, quote rules, link hovers, active nav underline. Deep & muted, not the old vivid red |
| `night` | `#171513` | footer / dark band only |

No gradients (except a soft legibility wash at the foot of hero photos), no
shadows, no glassmorphism. Borders are 1px in warm `ink-line`.

### Layout & composition

- Outer shell max-width **78rem (~1248px)**; reading measure capped at
  **~640–736px**. Generous gutters (px-16 on desktop).
- Section padding `7rem`/`10rem` vertical (`py-section` / `py-section-lg`).
- **Asymmetric 12-column grid** with editorial section markers
  (`01 — About`, eyebrow + hairline). Rhythm varies: paper → stone band → paper.
- **Experience** renders each matter as an aired, hairline-separated paragraph
  with a discreet `01`-style index in the margin — not compact bullets.
- **Header**: transparent over the hero (light text), fades to solid warm paper
  with a hairline on scroll. Active page = thin bordeaux underline, no fill.
- **Footer**: warm anthracite, three columns, small Inter, well-aired.
- **Team portraits**: the four professional studio portraits (dark seamless
  backgrounds) are presented **in colour**, uniformly graded (`saturate .95`),
  on a **dark `night` band** on the homepage so the studio backgrounds bleed
  into the section — echoing Jan's original intended layout, modernised. Forced
  grayscale was dropped: it fought the photographer's lighting and cheapened
  premium assets.
- **Brand mark**: the official **lemniscate** ("untie the knot") mark is used —
  bordeaux on light surfaces, paper-white on the dark footer — locked up with
  the "Kleinheisterkamp / Arbitration · Mediation" wordmark. Favicon and Apple
  touch icon are generated from it. (The v1 placeholder "JK" monogram is gone.)
- **Hero**: the high-resolution panoramic Château de la Solitude photograph
  (framed by foliage — Jan's intended hero) full-bleed, ~92vh, with a tall crop
  served to mobile via `<picture>`. Subtle desaturation, no aggressive overlay.
- **Page headers**: every page carries a photographic header band (as Jan
  intended), but rebuilt from the high-resolution source — the Château de la
  Solitude, its rooms and grounds, as one cohesive desaturated editorial family
  (façade, office, wrought-iron gate, wooded park). The dated WordPress banners
  (gilded pattern, etc.) are gone. Treatment: subtle desaturation, a soft
  bottom scrim only (no aggressive overlay), title set over the lower third in
  Fraunces, lede below on a bordeaux rule. The homepage keeps the full-bleed
  panoramic château.
- **Per-member headers**: each profile opens with its own header band on the
  brand near-black (`#100f0d`) — the member's high-resolution studio portrait
  bled into the dark panel (their seamless studio background merges with it),
  name in Fraunces, role + languages + CV alongside, and **prev/next arrows**
  at the foot of the band to move between profiles (wrap-around). Directly
  below the dark band sits a **very thin decorative strip** carrying that
  member's signature element from the original site — foliage (Jan), Portuguese
  azulejos (Carolina, Benedita), stone (Shaurya) — desaturated to match. This
  preserves exactly what the client asked for, modernised.
- **Multilingual (EN + FR)**: Astro i18n with `defaultLocale: 'en'` and a
  prefix-free default. FR routes mirror EN under `/fr/...` (`/fr`, `/fr/about`,
  `/fr/team/<slug>`, etc.). A single dictionary at `src/i18n.ts` carries every
  UI string in both languages; pages are extracted into shared views under
  `src/components/views/` so each EN and FR route file is a 3-line wrapper —
  zero duplicated markup. Language switcher in the header (EN | FR) jumps to
  the same page in the other locale. `<html lang>` is set per page. The
  **legal/scholarly content** (bios, case list, publications, speaking) stays
  in English by design — the i18n scaffold is in place to receive
  human-validated French translations later (replace EN strings in the
  `src/content/*.md` files, or add per-locale fields to the schema as needed).
- **Career timeline**: Jan's profile carries a dedicated editorial "Career"
  timeline (the chronology he is attached to from the original page) — a thin
  vertical rail with the year in Fraunces bordeaux and the milestone in body
  copy, 1998 → 2021, drawn faithfully from his biography. It is data-driven
  (`timeline:` in `src/content/team/jan-kleinheisterkamp.md`) so it stays
  editable, and renders only for members who have one.

### Motion

One effect only: a subtle scroll reveal (opacity + 14px rise, 600ms, soft
`cubic-bezier(.22,1,.36,1)`) via IntersectionObserver, plus underline-reveal on
links and colour-only hovers. Fully disabled under `prefers-reduced-motion`. No
parallax, cursor followers, scroll-jacking, counters or carousels.

### Content & structure (carried over from build 1)

- Navigation: `Home · About · Team · Practice · Experience ·
  Publications & Speaking · Contact`. Old "More" dropdown and standalone
  Mediation/Office pages folded into Practice / Contact.
- All legal content (bios, case list, publications, speaking) reproduced **word
  for word** from the existing site.
- SEO/A11y: per-page title/meta/OpenGraph, JSON-LD (`LegalService` + `Person`),
  `sitemap-index.xml`, `robots.txt`, semantic landmarks, skip link, visible
  focus rings, custom 404.

## Design review

`design-review/` contains full-page **desktop (1440×900 @2x)** and **mobile
(390×844 @2x)** screenshots of every page, regenerated with:

```bash
node scripts/screenshots.mjs   # requires the preview server running on :4321
```

See `TODO-CLIENT.md` for items that need the client's input before launch.
