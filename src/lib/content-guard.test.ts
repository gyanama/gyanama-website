import { describe, expect, it } from 'vitest';
import { existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_ROUTES } from '@/lib/routes';
import type { LandingContent } from '@/content/pages/types';

const SRC = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const CONTENT = join(SRC, 'content');
const PAGES = join(CONTENT, 'pages');
const PUBLIC = resolve(SRC, '..', 'public');

type Found = { where: string; text: string };

const DASHES = /[—–]/;

const BANNED = new RegExp(
  '\\b(?:' +
    [
      'delv(?:e|es|ed|ing)',
      'crucial(?:ly)?',
      'pivotal',
      'showcas(?:e|es|ed|ing)',
      'tapestry',
      'underscor(?:e|es|ed|ing)',
      'testament',
      'vibrant',
      'seamless(?:ly)?',
      'unlock(?:s|ed|ing)?',
      'empower(?:s|ed|ing|ment)?',
      'revolutioni[sz](?:e|es|ed|ing)',
      'next-gen',
      'supercharg(?:e|es|ed|ing)',
      'transform(?:s|ed|ing)?',
      'robust',
      'leverag(?:e|es|ed|ing)',
      'cutting-edge',
      'game-changer',
      'AI-powered',
    ].join('|') +
    ')\\b',
  'i',
);

const CONTRAST = /\b(?:not|isn['’]t|is not) just\b/i;

const NEVER_PUBLISH: { claim: string; re: RegExp }[] = [
  { claim: 'offline mode', re: /\boffline mode\b|\bworks? offline\b/i },
  { claim: 'anonymous reports', re: /\banonymous(?:ly)?\b/i },
  { claim: 'AI SMS', re: /\bAI[- ]SMS\b/i },
  { claim: 'role switching', re: /\brole[- ]switch(?:ing|er)?\b|\bswitch(?:es|ing)? (?:between )?roles?\b/i },
  { claim: 'staff leave', re: /\bstaff leaves?\b/i },
  { claim: 'oral questions', re: /\boral (?:questions?|tests?|exams?)\b/i },
  { claim: 'PTM slot booking', re: /\bslot[- ]booking\b|\bbook(?:s|ing)? an? (?:\w+ )?slots?\b/i },
  { claim: 'read receipts', re: /\bread receipts?\b|\bread tracking\b/i },
  { claim: 'substitute cover', re: /\bsubstitut(?:e|es|ed|ion|ions)\b/i },
  { claim: 'period-wise attendance', re: /\bperiod[- ]wise\b/i },
  { claim: 'multi-language interface', re: /\bmulti[- ]?(?:language|lingual) (?:interface|app|ui)\b|\bapp in hindi\b|\bhindi (?:interface|ui)\b/i },
  { claim: 'automatic late fee', re: /\b(?:automatic|auto)(?:ally)?[- ]?(?:applied )?late fees?\b|\blate fees? (?:is |are )?(?:applied|added|charged) automatically\b/i },
  { claim: 'call says it is AI', re: /\b(?:says|announces|discloses|mentions|tells (?:the )?(?:parent|family|you))(?: that)? it(?: is|['’]s) (?:an )?AI\b|\b(?:identifies|introduces) itself as (?:an )?AI\b/i },
  { claim: 'call recording', re: /\bcall recordings?\b|\brecorded\b|\brecords (?:the |every )?calls?\b/i },
];

function collect(value: unknown, where: string, out: Found[]): Found[] {
  if (typeof value === 'string') out.push({ where, text: value });
  else if (Array.isArray(value)) value.forEach((v, i) => collect(v, `${where}[${i}]`, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collect(v, `${where}.${k}`, out);
  }
  return out;
}

function isLanding(value: unknown): value is LandingContent {
  if (!value || typeof value !== 'object') return false;
  const v = value as Record<string, unknown>;
  return typeof v.path === 'string' && typeof v.title === 'string' && typeof v.description === 'string' && 'h1' in v && Array.isArray(v.sections);
}

const pageFiles = readdirSync(PAGES)
  .filter((f) => f.endsWith('.ts') && f !== 'types.ts' && !f.endsWith('.test.ts'))
  .sort();

const modules: { file: string; mod: Record<string, unknown> }[] = [];
for (const f of pageFiles) modules.push({ file: `pages/${f}`, mod: await import(join(PAGES, f)) });
for (const f of ['home.ts', 'voice.ts']) {
  if (existsSync(join(CONTENT, f))) modules.push({ file: f, mod: await import(join(CONTENT, f)) });
}

const strings: Found[] = [];
const landings: { where: string; page: LandingContent }[] = [];
for (const { file, mod } of modules) {
  for (const [name, value] of Object.entries(mod)) {
    collect(value, `${file} > ${name}`, strings);
    if (isLanding(value)) landings.push({ where: `${file} > ${name}`, page: value });
  }
}

const routePaths = new Set(STATIC_ROUTES.map((r) => r.path));
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const show = (f: Found, hit: string) => `${f.where}: "${hit}" in "${f.text}"`;

describe('content guard: copy rules', () => {
  it('finds content to check', () => {
    expect(strings.length).toBeGreaterThan(0);
    expect(landings.length).toBeGreaterThan(0);
  });

  it('has no em or en dashes', () => {
    const bad = strings.filter((f) => DASHES.test(f.text)).map((f) => show(f, f.text.match(DASHES)![0]));
    expect(bad).toEqual([]);
  });

  it('has no banned words', () => {
    const bad = strings.filter((f) => BANNED.test(f.text)).map((f) => show(f, f.text.match(BANNED)![0]));
    expect(bad).toEqual([]);
  });

  it('has no "not just" contrasts', () => {
    const bad = strings.filter((f) => CONTRAST.test(f.text)).map((f) => show(f, f.text.match(CONTRAST)![0]));
    expect(bad).toEqual([]);
  });

  it('makes none of the never-publish claims', () => {
    const bad: string[] = [];
    for (const f of strings) {
      for (const { claim, re } of NEVER_PUBLISH) {
        const m = f.text.match(re);
        if (m) bad.push(`[${claim}] ${show(f, m[0])}`);
      }
    }
    expect(bad).toEqual([]);
  });
});

describe.each(landings)('landing content $where', ({ page }) => {
  it('is a static route', () => {
    expect(routePaths.has(page.path), page.path).toBe(true);
  });

  it('has a title of at most 50 characters', () => {
    expect(page.title.length, page.title).toBeLessThanOrEqual(50);
  });

  it('has a description of 120 to 160 characters', () => {
    expect(page.description.length, page.description).toBeGreaterThanOrEqual(120);
    expect(page.description.length, page.description).toBeLessThanOrEqual(160);
  });

  it('has an h1', () => {
    expect(typeof page.h1 === 'string' && page.h1.trim().length > 0).toBe(true);
  });

  it('has a summary of 30 to 90 words', () => {
    expect(words(page.summary), page.summary).toBeGreaterThanOrEqual(30);
    expect(words(page.summary), page.summary).toBeLessThanOrEqual(90);
  });

  it('links only to existing routes', () => {
    expect(page.related.filter((p) => !routePaths.has(p))).toEqual([]);
  });

  it('uses screens that exist in public/', () => {
    const screens = [page.heroScreen, ...page.sections.map((s) => s.screen)].filter((s): s is string => typeof s === 'string' && s.length > 0);
    expect(screens.filter((s) => !existsSync(join(PUBLIC, s)))).toEqual([]);
  });
});
