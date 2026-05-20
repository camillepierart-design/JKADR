import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Update this to the production domain before going live.
export default defineConfig({
  site: 'https://kleinheisterkamp.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({ filter: (page) => !page.includes('/styleguide') }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
