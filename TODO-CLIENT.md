# To validate with the client before launch

Items that require Jan's / the client's confirmation. None block local
development or preview — the site builds and runs as-is.

## 1. Contact & identity

- [ ] **Email confirmed**: the public email `jk@kleinheisterkamp.com` was taken
      from the existing Office page. Confirm it is still correct and monitored.
- [ ] **Phone**: `+32 472 869104` — confirm current.
- [ ] **Full office address**: "Château de la Solitude, Avenue Charles Schaller
      54, 1160 Auderghem / Brussels, Belgium". The footer and home use
      "1160 Brussels"; the Contact page uses the fuller "1160 Auderghem /
      Brussels" wording from the old Office page. Confirm preferred form.
- [ ] **VAT** `BE0773587371` — confirm.

## 2. Contact form

- [ ] Decide form delivery: keep the **mailto** fallback (default, zero setup)
      or set up a **Formspree** endpoint (see README → Contact form). If
      Formspree, provide the endpoint and we'll paste it in one line.

## 3. Content currency (the old site content is from ~2022–2023)

- [ ] **Experience list** — confirm it is up to date or supply newer matters.
- [ ] **Publications** — add anything published since 2023.
- [ ] **Speaking** — page is titled "Recent Speaking Engagements" but newest
      entry is Sept 2023; add recent talks or we retitle to "Selected".
- [ ] **Team** — confirm the four profiles (Jan, Carolina, Benedita, Shaurya)
      and their roles are current. Roles were inferred from bio text:
      Carolina/Benedita → "Tribunal Secretary & Counsel",
      Shaurya → "Counsel & Academic". Adjust wording if desired.

## 4. Assets

- [ ] **CV PDFs**: all four were copied from the live site (Jan's CV is
      "Nov 2022"). Provide updated CVs if available — drop-in replace in
      `public/cv/` keeping the same filenames.
- [x] **Photography**: resolved — the high-resolution originals from Jan's
      source package are now used (panoramic château hero + the four
      professional studio portraits). Confirm these are the preferred selects
      (alternates exist in the source: other château angles, "Jan – Bernd
      Château" context shots).
- [ ] **French translation of the legal content** (bios, case list,
      publications, speaking entries): the multilingual site is live at
      `/fr/...` with all UI chrome translated, but the deep legal content
      remains in English pending human-validated FR translation. When ready,
      translations go directly into the existing `.md` files (or per-locale
      fields can be added if the client wants to keep both languages side by
      side). Marketing-grade strings on home and page hero/lede are already
      translated.
- [x] **Jan's career timeline ("ligne du temps")**: rebuilt as an editorial
      vertical timeline on his profile (1998–2021), drawn faithfully from his
      biography. Please review the year/milestone wording — it condenses his
      narrative; adjust any entry in
      `src/content/team/jan-kleinheisterkamp.md` (the `timeline:` block).
- [x] **Per-member profile headers**: each profile opens with the member's
      studio portrait on the brand near-black band, with prev/next arrows to
      move between profiles, and — directly below — a very thin decorative
      strip carrying that member's original signature element (foliage / Jan,
      Portuguese azulejos / Carolina & Benedita, stone / Shaurya). The strip
      images are upscaled from the old site's low-res banners (1500×300); if
      crisper source files for these textures exist, send them for a sharper
      strip.
- [x] **Favicon / logo**: resolved — the official **lemniscate** mark is now
      used in the header, footer, favicon and Apple touch icon (bordeaux /
      white). Confirm the mark colour matches the brand reference (used
      `#6B1F1F`; the source "Logo square red" is a slightly brighter red — say
      if you want the brighter brand red instead).
- [ ] **OpenGraph share image**: currently the château hero. Confirm or
      provide a dedicated 1200×630 social-share image (the lemniscate on
      bordeaux would also work).
- [x] **Page header bands**: restored on every page (as Jan intended), rebuilt
      from the HD source as a cohesive family — Château de la Solitude façade
      (About), the office rooms (Team, Practice), façade variant (Experience),
      wrought-iron gate (Publications & Speaking), wooded park (Contact).
      Confirm these per-page selects; many alternates exist in the source
      package if different scenes are preferred.

## 5. Legal

- [ ] The footer "Legal Terms & Privacy Notice" link still points to the old
      external page `https://kleinheisterkamp.zenn.website/legal/`. Confirm
      whether to keep it, host the text on this site, or replace it.
- [ ] Confirm reuse of all external links (LSE, MIDS, Católica, Who's Who Legal,
      ICSID, ICC, Cross Legal, etc.) is fine and that destinations are still live.

## 6. Domain / deploy

- [ ] Confirm production domain (assumed `https://kleinheisterkamp.com`). If
      different, update `astro.config.mjs` and `public/robots.txt`.
- [ ] Choose host: Netlify or Vercel (both configured and ready).
