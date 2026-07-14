import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const ART_DIR = join(__dirname, '..', '..', 'marketing-pipeline', 'registry', 'brand', 'blog-illustrations');
const logoLight = `data:image/png;base64,${readFileSync(join(__dirname, '..', 'public', 'gyanama-logo-256.png')).toString('base64')}`;

// Three distinct on-brand treatments. Same logo/type/tagline DNA, different mood.
const THEMES = {
  dark: { bg0: '#2c1f8a', bg1: '#150b46', base: '#ffffff', accent: '#AEB8FE', eyebrowBg: '#768BFE', eyebrowText: '#140a3f', tagline: '#c7ccf2', artCard: '#ffffff', band: null, wordmark: '#ffffff', ver: 'v5' },
  periwinkle: { bg0: '#EEF0FF', bg1: '#D8DEFF', base: '#27187E', accent: '#4f5fe0', eyebrowBg: '#27187E', eyebrowText: '#ffffff', tagline: '#5b5f79', artCard: null, band: null, wordmark: '#27187E', ver: 'v5' },
  light: { bg0: '#FFFFFF', bg1: '#EEF0FA', base: '#27187E', accent: '#768BFE', eyebrowBg: '#27187E', eyebrowText: '#ffffff', tagline: '#5b5f79', artCard: '#ffffff', band: '#768BFE', wordmark: '#27187E', ver: 'v5' },
};

const COVERS = [
  {
    slug: 'what-is-an-ai-operating-system-for-schools',
    art: 'aios-illustration.png',
    category: 'AI in Education',
    theme: 'dark',
    title: [[{ t: 'What Is an AI' }], [{ t: 'Operating System', hl: true }], [{ t: 'for Schools?' }]],
  },
  {
    slug: 'automate-attendance-follow-up-calls-to-parents',
    art: 'attendance-illustration.png',
    category: 'School Operations',
    theme: 'periwinkle',
    title: [[{ t: 'Automating' }], [{ t: 'Attendance', hl: true }], [{ t: 'Follow-Up Calls' }]],
  },
  {
    slug: 'how-to-spot-at-risk-students-before-its-obvious',
    art: 'atrisk-illustration.png',
    category: 'AI in Education',
    theme: 'light',
    title: [[{ t: 'Spot ' }, { t: 'At-Risk', hl: true }], [{ t: 'Students Before' }], [{ t: 'It Is Obvious' }]],
  },
  {
    slug: 'best-school-management-software-in-india',
    art: 'best-software-illustration.png',
    category: 'Buyer’s Guide',
    theme: 'dark',
    title: [[{ t: 'Best School' }], [{ t: 'Management', hl: true }], [{ t: 'Software', hl: true }], [{ t: 'in India' }]],
  },
  {
    slug: 'how-to-choose-school-management-software',
    art: 'choose-illustration.png',
    category: 'Buyer’s Guide',
    theme: 'periwinkle',
    title: [[{ t: 'How to ' }, { t: 'Choose', hl: true }], [{ t: 'School' }], [{ t: 'Management' }], [{ t: 'Software' }]],
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function titleMarkup(title, th) {
  const lineHeight = 66;
  const startY = 358 - ((title.length - 1) * lineHeight) / 2;
  return title
    .map((line, li) => {
      const y = startY + li * lineHeight;
      return line
        .map((seg, si) => {
          const fill = seg.hl ? th.accent : th.base;
          const xAttr = si === 0 ? ` x="80" y="${y}"` : '';
          return `<tspan${xAttr} fill="${fill}">${esc(seg.t)}</tspan>`;
        })
        .join('');
    })
    .join('');
}

function svg({ title, category, theme }) {
  const th = THEMES[theme];
  const cat = category.toUpperCase();
  const bandEl = th.band ? `<rect x="0" y="0" width="14" height="630" fill="${th.band}"/>` : '';
  // Decorative corner accents, tuned per theme so each reads differently.
  const decor =
    theme === 'dark'
      ? `<circle cx="1120" cy="90" r="180" fill="#ffffff" opacity="0.05"/><circle cx="150" cy="560" r="120" fill="#ffffff" opacity="0.05"/>`
      : `<circle cx="1130" cy="540" r="150" fill="${th.accent}" opacity="0.08"/>`;
  const artCard = th.artCard
    ? `<rect x="600" y="150" rx="28" ry="28" width="540" height="380" fill="${th.artCard}" opacity="${theme === 'dark' ? 1 : 0.55}"/>`
    : '';
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${th.bg0}"/>
        <stop offset="100%" stop-color="${th.bg1}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    ${decor}
    ${bandEl}
    ${artCard}
    <image href="${logoLight}" x="72" y="58" width="50" height="50"/>
    <text x="138" y="92" font-family="'Segoe UI', Arial, sans-serif" font-size="29" font-weight="800" fill="${th.wordmark}" letter-spacing="2">GYANAMA</text>
    <rect x="80" y="150" rx="18" ry="18" width="${70 + cat.length * 11}" height="38" fill="${th.eyebrowBg}"/>
    <text x="100" y="176" font-family="'Segoe UI', Arial, sans-serif" font-size="17" font-weight="700" fill="${th.eyebrowText}" letter-spacing="1.5">${esc(cat)}</text>
    <text xml:space="preserve" font-family="'Segoe UI', Arial, sans-serif" font-size="52" font-weight="800" word-spacing="12">${titleMarkup(title, th)}</text>
    <rect x="80" y="540" rx="3" ry="3" width="46" height="6" fill="${th.accent}"/>
    <text x="80" y="588" font-family="'Segoe UI', Arial, sans-serif" font-size="21" font-weight="500" fill="${th.tagline}">Your school’s brain. It doesn’t just track, it acts.</text>
  </svg>`);
}

async function run() {
  for (const c of COVERS) {
    const th = THEMES[c.theme];
    const art = await sharp(join(ART_DIR, c.art))
      .resize(500, 340, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    const artLeft = th.artCard ? 620 : 600;
    const artTop = th.artCard ? 170 : 145;
    const png = await sharp(svg(c))
      .composite([{ input: art, left: artLeft, top: artTop }])
      .png()
      .toBuffer();

    await sharp(png).toFile(join(ART_DIR, `final-${c.slug}.png`));
    if (process.env.APPLY !== '1') {
      console.log(`PREVIEW ${c.slug} [${c.theme}] (local only; set APPLY=1 to upload)`);
      continue;
    }
    const objectPath = `covers/${c.slug}-${th.ver}.png`;
    const up = await fetch(`${url}/storage/v1/object/blog-images/${objectPath}`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'image/png', 'x-upsert': 'true', 'Cache-Control': '31536000' },
      body: png,
    });
    if (!up.ok) { console.error(`Upload failed ${c.slug}:`, up.status, await up.text()); continue; }
    const publicUrl = `${url}/storage/v1/object/public/blog-images/${objectPath}`;
    const patch = await fetch(`${url}/rest/v1/posts?slug=eq.${c.slug}`, {
      method: 'PATCH',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ cover_image_url: publicUrl }),
    });
    if (!patch.ok) { console.error(`Patch failed ${c.slug}:`, patch.status, await patch.text()); continue; }
    console.log(`UPLOADED ${c.slug} [${c.theme}]`);
  }
}

run().catch((e) => { console.error(e); process.exit(1); });
