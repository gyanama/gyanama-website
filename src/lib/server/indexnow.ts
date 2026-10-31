import { SITE_URL } from '@/lib/site';

const KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;

export async function submitIndexNow(urlList: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key || !KEY_PATTERN.test(key) || urlList.length === 0) return;
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: new URL(SITE_URL).host, key, keyLocation: `${SITE_URL}/${key}.txt`, urlList }),
    });
  } catch {
    return;
  }
}
