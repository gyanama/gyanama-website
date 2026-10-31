import { describe, expect, it } from 'vitest';
import { readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_ROUTES } from '@/lib/routes';
import { PAGE_INDEX } from '@/lib/pages';

const PAGES = resolve(fileURLToPath(new URL('.', import.meta.url)), '..', 'content', 'pages');
const EXEMPT = new Set(['/', '/blog', '/privacy-policy', '/terms-of-service', '/book-demo', '/contact-us']);

const contentPaths = new Set<string>();
for (const f of readdirSync(PAGES).filter((n) => n.endsWith('.ts') && n !== 'types.ts' && !n.endsWith('.test.ts'))) {
  const mod: Record<string, unknown> = await import(join(PAGES, f));
  for (const value of Object.values(mod)) {
    if (value && typeof value === 'object' && typeof (value as { path?: unknown }).path === 'string') {
      contentPaths.add((value as { path: string }).path);
    }
  }
}

const paths = STATIC_ROUTES.map((r) => r.path);

describe('STATIC_ROUTES', () => {
  it('has no duplicate paths', () => {
    expect(paths.filter((p, i) => paths.indexOf(p) !== i)).toEqual([]);
  });

  it('has only paths that start with a slash', () => {
    expect(paths.filter((p) => !p.startsWith('/'))).toEqual([]);
  });

  it('never lists the admin panel', () => {
    expect(paths.filter((p) => p.startsWith('/adminpanel'))).toEqual([]);
  });

  it('gives every marketing route a PAGE_INDEX entry or a content object', () => {
    const missing = paths.filter((p) => !EXEMPT.has(p) && !(p in PAGE_INDEX) && !contentPaths.has(p));
    expect(missing).toEqual([]);
  });
});
