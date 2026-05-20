import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:4321';
const OUT = new URL('../design-review/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
mkdirSync(OUT, { recursive: true });

const pages = [
  ['home', '/'],
  ['about', '/about'],
  ['team', '/team'],
  ['team-jan', '/team/jan-kleinheisterkamp'],
  ['team-carolina', '/team/carolina-pitta-e-cunha'],
  ['team-benedita', '/team/benedita-sampaio-nunes'],
  ['team-shaurya', '/team/shaurya-upadhyay'],
  ['practice', '/practice'],
  ['experience', '/experience'],
  ['publications-speaking', '/publications-speaking'],
  ['contact', '/contact'],
  ['styleguide', '/styleguide'],
  ['404', '/page-does-not-exist'],
  ['fr-home', '/fr/'],
  ['fr-about', '/fr/about'],
  ['fr-team', '/fr/team'],
  ['fr-team-jan', '/fr/team/jan-kleinheisterkamp'],
  ['fr-contact', '/fr/contact'],
];

const viewports = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
];

const browser = await chromium.launch();
for (const [vName, w, h] of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
    // Trigger reveal animations, wait for fonts.
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(700);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.evaluate(() => document.fonts && document.fonts.ready);
    const file = `${OUT}/${name}-${vName}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`${vName} ${path} -> ${file} (${res?.status()})`);
  }
  await ctx.close();
}
await browser.close();
console.log('done');
