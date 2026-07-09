// Renders the social/OG share card from real HTML + Inter + a real product screenshot.
// Uses Playwright (same engine as prerender) so typography matches the site exactly.
// Run: node scripts/gen-og-image.mjs   -> public/og-image.png (1200x630)
import { chromium } from 'playwright-core';
import sparticuzChromium from '@sparticuz/chromium';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');

const b64 = (p, mime) => `data:${mime};base64,${readFileSync(path.join(pub, p)).toString('base64')}`;
const logo = b64('gyanama-logo-256.png', 'image/png');
const shot = b64('product/health-score.webp', 'image/webp'); // on-message: the "brain" / health score

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;font-family:Inter,sans-serif;background:#27187E;overflow:hidden;position:relative}
  .glow{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(118,139,254,.45) 0%,transparent 62%);top:-320px;right:-260px}
  .wrap{position:relative;display:flex;height:100%;align-items:center;padding:0 68px;gap:48px}
  .left{flex:1;color:#fff;padding-bottom:34px}
  .brand{display:flex;align-items:center;gap:13px;margin-bottom:34px}
  .brand img{width:46px;height:46px}
  .brand span{font-size:27px;font-weight:800;letter-spacing:-.02em}
  .eyebrow{display:inline-block;font-size:16px;font-weight:600;color:#AEB8FE;border:1px solid rgba(174,184,254,.45);padding:6px 15px;border-radius:999px;margin-bottom:22px}
  h1{font-size:64px;line-height:1.03;font-weight:800;letter-spacing:-.035em;margin-bottom:18px}
  h1 em{font-style:normal;color:#AEB8FE}
  p{font-size:22px;line-height:1.42;color:rgba(255,255,255,.72);font-weight:400;max-width:470px}
  .domain{position:absolute;left:68px;bottom:38px;font-size:19px;font-weight:600;color:rgba(255,255,255,.55)}
  /* Size the phone by HEIGHT so any screenshot aspect stays fully inside the card. */
  .right{flex:none;display:flex;justify-content:center;align-items:center}
  .phone{border-radius:34px;background:#fff;padding:6px;box-shadow:0 30px 70px rgba(0,0,0,.45);transform:rotate(2deg);line-height:0}
  .phone img{height:534px;width:auto;display:block;border-radius:28px}
</style></head><body>
<div class="glow"></div>
<div class="wrap">
  <div class="left">
    <div class="brand"><img src="${logo}"><span>GYANAMA</span></div>
    <div class="eyebrow">AI Operating System for Schools</div>
    <h1>Give your school a <em>brain.</em></h1>
    <p>It doesn't just store your school's data — it understands what's happening and takes action.</p>
  </div>
  <div class="right"><div class="phone"><img src="${shot}"></div></div>
</div>
<div class="domain">gyanama.com</div>
</body></html>`;

const tmp = path.join(root, 'scripts', '.og.html');
writeFileSync(tmp, html);

// Locally use system Chrome; on serverless use the bundled binary (mirrors prerender.mjs).
const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const launchOptions = isServerless
  ? { args: sparticuzChromium.args, executablePath: await sparticuzChromium.executablePath(), headless: true }
  : { headless: true, channel: 'chrome' };
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto('file://' + tmp.replace(/\\/g, '/'), { waitUntil: 'networkidle' });
await page.waitForTimeout(600); // let webfont settle
const buf = await page.screenshot(); // 2400x1260, crisp
await browser.close();

// Downscale 2x -> 1200x630 and compress: crisp text, small file for social scrapers.
const sharp = (await import('sharp')).default;
await sharp(buf).resize(1200, 630).png({ quality: 90, compressionLevel: 9, palette: true }).toFile(path.join(pub, 'og-image.png'));
console.log('Wrote public/og-image.png (1200x630, compressed)');
