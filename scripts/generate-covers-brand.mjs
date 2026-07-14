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
const logoB64 = readFileSync(join(__dirname, '..', 'public', 'gyanama-logo-256.png')).toString('base64');
const logo = `data:image/png;base64,${logoB64}`;

// Only the three posts that were published without a cover. The four older
// posts already have professionally designed covers — do not touch them.
const COVERS = [
  { slug: 'what-is-an-ai-operating-system-for-schools', title: 'What Is an AI Operating\nSystem for Schools?', category: 'AI in Education', tags: ['Your school’s brain', 'AI-first'] },
  { slug: 'automate-attendance-follow-up-calls-to-parents', title: 'Automating Attendance\nFollow-Up Calls', category: 'School Operations', tags: ['AI voice calls', 'Parent comms'] },
  { slug: 'how-to-spot-at-risk-students-before-its-obvious', title: 'Spot At-Risk Students\nBefore It Is Obvious', category: 'AI in Education', tags: ['Student health score', 'Early warning'] },
];

const INDIGO = '#27187E';
const PERIWINKLE = '#768BFE';
const LIGHT = '#AEB8FE';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function titleTspans(title) {
  const lines = title.split('\n');
  const lineHeight = 82;
  const startY = 292 - ((lines.length - 1) * lineHeight) / 2;
  return lines
    .map((l, i) => `<tspan x="80" y="${startY + i * lineHeight}">${esc(l)}</tspan>`)
    .join('');
}

function chip(x, y, label) {
  const w = 40 + label.length * 12.5;
  return `<g>
    <rect x="${x}" y="${y}" rx="20" ry="20" width="${w}" height="40" fill="#ffffff" stroke="${LIGHT}" stroke-width="1.5"/>
    <circle cx="${x + 20}" cy="${y + 20}" r="4" fill="${PERIWINKLE}"/>
    <text x="${x + 34}" y="${y + 26}" font-family="'Segoe UI', Arial, sans-serif" font-size="18" font-weight="600" fill="${INDIGO}">${esc(label)}</text>
  </g>`;
}

function svg({ title, category, tags }) {
  let tx = 80;
  const tagChips = tags
    .map((t) => {
      const c = chip(tx, 512, t);
      tx += 40 + t.length * 12.5 + 20;
      return c;
    })
    .join('');
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F4F5FB"/>
        <stop offset="100%" stop-color="#E7EAFF"/>
      </linearGradient>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${PERIWINKLE}"/>
        <stop offset="100%" stop-color="${INDIGO}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>

    <!-- right-side geometric motif (soft brand shapes, not a fake illustration) -->
    <circle cx="985" cy="300" r="220" fill="${LIGHT}" opacity="0.30"/>
    <rect x="820" y="150" rx="26" ry="26" width="330" height="120" fill="#ffffff" opacity="0.9"/>
    <rect x="856" y="182" rx="8" ry="8" width="150" height="16" fill="${LIGHT}"/>
    <rect x="856" y="212" rx="8" ry="8" width="230" height="16" fill="#E2E6FF"/>
    <rect x="856" y="238" rx="8" ry="8" width="110" height="16" fill="#E2E6FF"/>
    <rect x="880" y="300" rx="26" ry="26" width="240" height="150" fill="url(#card)"/>
    <rect x="912" y="336" rx="8" ry="8" width="130" height="18" fill="#ffffff" opacity="0.85"/>
    <rect x="912" y="368" rx="8" ry="8" width="176" height="12" fill="#ffffff" opacity="0.45"/>
    <rect x="912" y="392" rx="8" ry="8" width="96" height="12" fill="#ffffff" opacity="0.45"/>
    <circle cx="1092" cy="336" r="12" fill="#ffffff" opacity="0.85"/>
    <rect x="820" y="474" rx="20" ry="20" width="150" height="70" fill="#ffffff" opacity="0.9"/>
    <circle cx="855" cy="509" r="16" fill="${PERIWINKLE}"/>
    <rect x="884" y="498" rx="6" ry="6" width="66" height="12" fill="#E2E6FF"/>
    <rect x="884" y="518" rx="6" ry="6" width="44" height="12" fill="#E2E6FF"/>

    <!-- header: logo + wordmark, and domain pill -->
    <image href="${logo}" x="72" y="60" width="52" height="52"/>
    <text x="140" y="96" font-family="'Segoe UI', Arial, sans-serif" font-size="30" font-weight="800" fill="${INDIGO}" letter-spacing="2">GYANAMA</text>
    <rect x="1000" y="64" rx="22" ry="22" width="128" height="44" fill="#ffffff"/>
    <circle cx="1026" cy="86" r="4" fill="${PERIWINKLE}"/>
    <text x="1040" y="93" font-family="'Segoe UI', Arial, sans-serif" font-size="19" font-weight="600" fill="${INDIGO}">gyanama.com</text>

    <!-- category eyebrow -->
    <rect x="80" y="150" rx="18" ry="18" width="${80 + category.length * 11}" height="38" fill="${INDIGO}"/>
    <text x="102" y="176" font-family="'Segoe UI', Arial, sans-serif" font-size="17" font-weight="700" fill="#ffffff" letter-spacing="1.5">${esc(category.toUpperCase())}</text>

    <!-- title -->
    <text font-family="'Segoe UI', Arial, sans-serif" font-size="66" font-weight="800" fill="${INDIGO}">${titleTspans(title)}</text>

    <!-- tag chips -->
    ${tagChips}

    <!-- footer tagline -->
    <text x="80" y="588" font-family="'Segoe UI', Arial, sans-serif" font-size="21" font-weight="500" fill="#5b5f79">Your school’s brain. It doesn’t just track, it acts.</text>
  </svg>`;
}

async function run() {
  for (const c of COVERS) {
    const png = await sharp(Buffer.from(svg(c))).png().toBuffer();
    const objectPath = `covers/${c.slug}.png`;
    const up = await fetch(`${url}/storage/v1/object/blog-images/${objectPath}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'image/png',
        'x-upsert': 'true',
        'Cache-Control': '31536000',
      },
      body: png,
    });
    if (!up.ok) {
      console.error(`Upload failed for ${c.slug}:`, up.status, await up.text());
      continue;
    }
    const publicUrl = `${url}/storage/v1/object/public/blog-images/${objectPath}`;
    const patch = await fetch(`${url}/rest/v1/posts?slug=eq.${c.slug}`, {
      method: 'PATCH',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ cover_image_url: publicUrl }),
    });
    if (!patch.ok) {
      console.error(`Cover update failed for ${c.slug}:`, patch.status, await patch.text());
      continue;
    }
    console.log(`OK ${c.slug}`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
