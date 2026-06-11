// One-off image optimizer. Run with: node scripts/optimize-images.mjs
// Requires `sharp` (installed transiently with `npm i sharp --no-save`).
// Non-destructive: originals are kept as <picture> fallbacks.
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');

async function run() {
  // Logo: 2160x2160 / 289 KB, displayed at most 128px. 256px covers retina.
  const logo = path.join(pub, 'gyanama-logo.png');
  await sharp(logo)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(pub, 'gyanama-logo-256.png'));
  await sharp(logo)
    .resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90 })
    .toFile(path.join(pub, 'gyanama-logo-256.webp'));

  // Dashboard screenshots: 828x1792 PNGs (~350 KB each), shown <=280px wide.
  // 640px wide covers retina; emit WebP (original PNG stays as fallback).
  for (const name of ['IMG_0761', 'IMG_0762', 'IMG_0763']) {
    await sharp(path.join(pub, 'dashboards', `${name}.PNG`))
      .resize({ width: 640 })
      .webp({ quality: 82 })
      .toFile(path.join(pub, 'dashboards', `${name}.webp`));
  }

  console.log('Image optimization done.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
