export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

export function memoryRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return {
    limited(key: string): boolean {
      const now = Date.now();
      const recent = (hits.get(key) ?? []).filter((t) => t > now - windowMs);
      hits.set(key, recent);
      return recent.length >= max;
    },
    record(key: string): void {
      const list = hits.get(key) ?? [];
      list.push(Date.now());
      hits.set(key, list);
    },
  };
}

export async function readJson<T>(req: Request): Promise<T | null> {
  try {
    const body = (await req.json()) as T;
    return body ?? null;
  } catch {
    return null;
  }
}
