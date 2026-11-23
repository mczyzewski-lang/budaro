// Generuje PDF-y lead magnetów z /druk/* do public/pdf/. Uruchom: npm run build && npm run pdf && npm run build
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync, readdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const slugs = readdirSync('dist/druk').filter((d) => !d.includes('.'));
const port = 4399;
const srv = spawn('npx', ['astro', 'preview', '--port', String(port)], { stdio: 'ignore' });
try {
  for (let i = 0; i < 40; i++) { try { if ((await fetch(`http://localhost:${port}/`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 500)); }
  mkdirSync('public/pdf', { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const slug of slugs) {
    const name = `budaro-${slug}`;
    await page.goto(`http://localhost:${port}/druk/${slug}/`, { waitUntil: 'networkidle' });
    await page.pdf({ path: `public/pdf/${name}.pdf`, format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log('✓', name);
  }
  await browser.close();
} finally { srv.kill(); spawn('npx', ['astro', 'preview', 'stop'], { stdio: 'ignore' }); }
