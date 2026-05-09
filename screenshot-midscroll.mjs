import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || 'midscroll';

const existing = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
const indices = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0')).filter(n => !isNaN(n));
const next = indices.length > 0 ? Math.max(...indices) + 1 : 1;
const outPath = path.join(outDir, `screenshot-${next}-${label}.png`);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2500));

// Phase 1: clear gallery rotation threshold (rotation must complete before page can scroll).
await page.mouse.move(720, 450);
for (let i = 0; i < 40; i++) {
  await page.mouse.wheel({ deltaY: 120 });
  await new Promise(r => setTimeout(r, 30));
}
await new Promise(r => setTimeout(r, 600));

// Phase 2: drive Lenis directly to mid-animation position.
// scroll-driver=220vh=1980px(@900h), sticky range = 120vh=1080px. Mid-shrink ≈ 540px.
const targetScroll = parseInt(process.argv[4] ?? '540', 10);
await page.evaluate((y) => {
  if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
}, targetScroll);
await new Promise(r => setTimeout(r, 1500));

const scrollY = await page.evaluate(() => window.scrollY);
console.log(`scrollY = ${scrollY}px (target = ${targetScroll}px)`);

await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log(`Saved: ${outPath}`);
