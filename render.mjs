// Render page.html to entry.png at 1024x1024 (headless Chromium).
// Usage: node render.mjs [out.png]
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('/home/hatch/workspace/verify-tools/node_modules/playwright-core');
import path from 'node:path';

const out = process.argv[2] ?? 'entry.png';
const htmlPath = path.join(process.cwd(), 'page.html');
const browser = await chromium.launch({
  executablePath: '/home/hatch/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome',
  args: ['--no-sandbox', '--force-device-scale-factor=1'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 } });
await page.goto('file://' + htmlPath);
await page.waitForTimeout(400);
const overflow = await page.evaluate(() => {
  const de = document.documentElement;
  return { scrollH: de.scrollHeight, scrollW: de.scrollWidth, clientH: de.clientHeight };
});
console.log('page size:', JSON.stringify(overflow));
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
await browser.close();
console.log('wrote', out);
