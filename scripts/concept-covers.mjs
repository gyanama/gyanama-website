import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', '..', 'marketing-pipeline', 'campaigns', '_covertest');
const logo = `data:image/png;base64,${readFileSync(join(__dirname, '..', 'public', 'gyanama-logo-256.png')).toString('base64')}`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Real Gyanama website palette (from src/index.css design tokens).
const BLUE = '#0080FF';
const PURPLE = '#9470DB';
const TEAL = '#33CCA6';
const NAVY = '#0F1826';
const PAPER = '#F5F7FA';

// Each concept = the real palette, different hue lead per category. Type-led, no illustration.
const CONCEPTS = [
  {
    name: '1-navy-teal',
    bg: NAVY, ink: PAPER, accent: TEAL, rule: TEAL, wordmark: PAPER, kickerInk: NAVY, kickerBg: TEAL,
    kicker: 'BUYER’S GUIDE · 2026',
    lines: [[{ t: 'Best School' }], [{ t: 'Management', a: true }], [{ t: 'Software', a: true }], [{ t: 'in India' }]],
    foot: 'A principal’s honest guide  ·  gyanama.com',
    device: 'ruleLeft',
  },
  {
    name: '2-paper-blue',
    bg: PAPER, ink: NAVY, accent: BLUE, rule: BLUE, wordmark: NAVY, kickerInk: PAPER, kickerBg: BLUE,
    kicker: 'AI IN EDUCATION',
    lines: [[{ t: 'What is an AI' }], [{ t: 'operating', a: true }, { t: ' system' }], [{ t: 'for schools?' }]],
    foot: 'Your school’s brain, explained  ·  gyanama.com',
    device: 'arcBR', arcColor: PURPLE,
  },
  {
    name: '3-blue-teal',
    bg: '#0B5BD0', ink: PAPER, accent: TEAL, rule: TEAL, wordmark: PAPER, kickerInk: '#0B5BD0', kickerBg: TEAL,
    kicker: 'SCHOOL OPERATIONS',
    lines: [[{ t: 'The call a' }], [{ t: 'parent', a: true }, { t: ' gets' }], [{ t: 'before you' }], [{ t: 'even notice' }]],
    foot: 'Automated attendance follow-up  ·  gyanama.com',
    device: 'dotsTR',
  },
];

function headline(lines, c) {
  const size = lines.length >= 4 ? 72 : 82;
  const lh = lines.length >= 4 ? 82 : 94;
  const startY = 258;
  return { size, markup: lines.map((line, li) => {
    const y = startY + li * lh;
    return line.map((seg, si) => {
      const xAttr = si === 0 ? ` x="80" y="${y}"` : '';
      return `<tspan${xAttr} fill="${seg.a ? c.accent : c.ink}">${esc(seg.t)}</tspan>`;
    }).join('');
  }).join('') };
}

function device(c) {
  if (c.device === 'arcBR') return `<circle cx="1120" cy="600" r="230" fill="${c.accent}" opacity="0.22"/><circle cx="1150" cy="150" r="70" fill="${c.rule}" opacity="0.14"/>`;
  if (c.device === 'dotsTR') {
    let d = '';
    for (let r = 0; r < 5; r++) for (let col = 0; col < 5; col++) d += `<circle cx="${1010 + col * 34}" cy="${90 + r * 34}" r="5" fill="${c.accent}" opacity="0.5"/>`;
    return d + `<rect x="1030" y="360" width="150" height="150" rx="20" fill="${c.accent}" opacity="0.14"/>`;
  }
  return `<rect x="1040" y="0" width="160" height="630" fill="#ffffff" opacity="0.03"/>`;
}

function svg(c) {
  const h = headline(c.lines, c);
  return Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="${c.bg}"/>
    ${device(c)}
    <image href="${logo}" x="72" y="56" width="46" height="46"/>
    <text x="132" y="86" font-family="'Segoe UI', Arial, sans-serif" font-size="27" font-weight="800" fill="${c.wordmark}" letter-spacing="3">GYANAMA</text>
    <line x1="80" y1="128" x2="1120" y2="128" stroke="${c.rule}" stroke-width="1.5" opacity="0.35"/>
    <rect x="80" y="150" rx="4" ry="4" width="${44 + c.kicker.length * 11.5}" height="34" fill="${c.kickerBg}"/>
    <text x="98" y="173" font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700" fill="${c.kickerInk}" letter-spacing="2.5">${esc(c.kicker)}</text>
    <text xml:space="preserve" font-family="'Segoe UI', Arial, sans-serif" font-size="${h.size}" font-weight="800" letter-spacing="-1">${h.markup}</text>
    <line x1="80" y1="556" x2="470" y2="556" stroke="${c.rule}" stroke-width="2"/>
    <text x="80" y="590" font-family="'Segoe UI', Arial, sans-serif" font-size="19" font-weight="600" fill="${c.ink}" opacity="0.85" letter-spacing="0.3">${esc(c.foot)}</text>
  </svg>`);
}

for (const c of CONCEPTS) {
  await sharp(svg(c)).png().toFile(join(OUT, `concept-${c.name}.png`));
  console.log(`concept-${c.name}.png`);
}
