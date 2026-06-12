/**
 * Generates branded cover images for the seeded blog posts, uploads them to the
 * Supabase `blog-images` bucket, and sets each post's cover_image_url.
 * Run with:  node --env-file=.env scripts/generate-blog-covers.mjs
 */
import sharp from 'sharp';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const COVERS = [
  { slug: 'ai-attendance-indian-schools', title: '5 Ways AI Is Transforming Attendance in Indian Schools', category: 'AI in Education', from: '#2563eb', to: '#4f46e5' },
  { slug: 'principals-guide-paperless-school', title: "A Principal's Guide to Going Paperless", category: 'School Management', from: '#0ea5e9', to: '#06b6d4' },
  { slug: 'automated-fee-reminders-collection', title: 'How Automated Fee Reminders Improve Collection Rates', category: 'School Management', from: '#7c3aed', to: '#c026d3' },
  { slug: 'building-parent-trust-communication', title: 'Building Parent Trust Through Transparent Communication', category: 'Guides & Tips', from: '#f59e0b', to: '#ea580c' },
  { slug: 'school-management-system-buyers-guide-2026', title: "What to Look for in a School Management System", category: 'Guides & Tips', from: '#0f766e', to: '#0ea5e9' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, max = 22) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max) {
      if (line) lines.push(line.trim());
      line = w;
    } else {
      line = (line + ' ' + w).trim();
    }
  }
  if (line) lines.push(line.trim());
  return lines.slice(0, 4);
}

function svg({ title, category, from, to }) {
  const lines = wrap(title, 22);
  const lineHeight = 78;
  const startY = 300 - ((lines.length - 1) * lineHeight) / 2;
  const tspans = lines
    .map((l, i) => `<tspan x="80" y="${startY + i * lineHeight}">${esc(l)}</tspan>`)
    .join('');
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}"/>
        <stop offset="100%" stop-color="${to}"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="1040" cy="120" r="240" fill="#ffffff" opacity="0.08"/>
    <circle cx="1120" cy="520" r="180" fill="#ffffff" opacity="0.06"/>
    <circle cx="120" cy="560" r="120" fill="#ffffff" opacity="0.05"/>
    <rect x="80" y="96" rx="22" ry="22" width="${120 + category.length * 13}" height="44" fill="#ffffff" opacity="0.18"/>
    <text x="${80 + 22}" y="126" font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff" letter-spacing="1">${esc(category.toUpperCase())}</text>
    <text font-family="'Segoe UI', Arial, sans-serif" font-size="62" font-weight="800" fill="#ffffff">${tspans}</text>
    <text x="80" y="560" font-family="'Segoe UI', Arial, sans-serif" font-size="30" font-weight="800" fill="#ffffff" letter-spacing="2">GYANAMA</text>
    <text x="80" y="592" font-family="'Segoe UI', Arial, sans-serif" font-size="20" font-weight="500" fill="#ffffff" opacity="0.85">AI-Powered School Management</text>
  </svg>`;
}

async function run() {
  for (const c of COVERS) {
    const png = await sharp(Buffer.from(svg(c))).png().toBuffer();
    const objectPath = `covers/${c.slug}.png`;

    // Upload (upsert) to storage
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
    const publicUrl = `${url}/storage/v1/object/public/${'blog-images'}/${objectPath}`;

    // Set the post's cover
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
    console.log(`OK ${c.slug} -> ${publicUrl}`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
