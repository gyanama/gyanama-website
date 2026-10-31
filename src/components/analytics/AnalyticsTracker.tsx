'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const ENDPOINT = '/api/track';
const HEARTBEAT_MS = 15_000;
const SESSION_KEY = 'gy_session_id';

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function getDevice(): 'mobile' | 'tablet' | 'desktop' {
  const w = window.innerWidth;
  if (w < 768) return 'mobile';
  if (w < 1024) return 'tablet';
  return 'desktop';
}

function shouldTrack(path: string): boolean {
  if (navigator.webdriver) return false;
  return !path.startsWith('/adminpanel');
}

function send(body: string, beacon: boolean) {
  if (beacon && navigator.sendBeacon) {
    navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
    return;
  }
  fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => undefined);
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);

  useEffect(() => {
    pathRef.current = pathname;
    if (!shouldTrack(pathname)) return;
    send(JSON.stringify({ type: 'pageview', session_id: getSessionId(), path: pathname, referrer: document.referrer || null, device: getDevice() }), false);
  }, [pathname]);

  useEffect(() => {
    const heartbeat = (beacon: boolean) => {
      const path = pathRef.current;
      if (!shouldTrack(path)) return;
      send(JSON.stringify({ type: 'heartbeat', session_id: getSessionId(), path }), beacon);
    };
    const interval = window.setInterval(() => heartbeat(false), HEARTBEAT_MS);
    const onHidden = () => {
      if (document.visibilityState === 'hidden') heartbeat(true);
    };
    const onHide = () => heartbeat(true);
    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('pagehide', onHide);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('pagehide', onHide);
    };
  }, []);

  return null;
}
