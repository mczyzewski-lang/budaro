import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

if (!process.env.PUBLIC_LEAD_ENDPOINT) {
  console.warn('\n[budaro] UWAGA: brak PUBLIC_LEAD_ENDPOINT — formularze działają w trybie demo i NIE wysyłają leadów do CRM.\n');
}

export default defineConfig({
  site: 'https://budaro.pl',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // strony reklamowe i wydruki PDF nie idą do indeksu
      filter: (page) => !page.includes('/lp/') && !page.includes('/druk/') && !page.includes('/wycena/'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
