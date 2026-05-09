import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// Find next available index
const existing = fs.readdirSync(outDir).filter(f => f.endsWith('.png'));
const indices = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0')).filter(n => !isNaN(n));
const next = indices.length > 0 ? Math.max(...indices) + 1 : 1;

const filename = label
  ? `screenshot-${next}-${label}.png`
  : `screenshot-${next}.png`;
const outPath = path.join(outDir, filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2500));
await page.screenshot({ path: outPath, fullPage: false });
await browser.close();

console.log(`Saved: ${outPath}`);
