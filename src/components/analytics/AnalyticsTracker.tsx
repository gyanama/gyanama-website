import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

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

// Don't track the admin panel or prerender (Playwright sets navigator.webdriver).
function shouldTrack(path: string): boolean {
  if (typeof navigator !== 'undefined' && navigator.webdriver) return false;
  if (path.startsWith('/adminpanel')) return false;
  return true;
}

/**
 * Lightweight first-party analytics. Records a page view on every route change
 * and sends periodic heartbeats + a final beacon so per-session duration can be
 * computed server-side. Must be rendered inside <BrowserRouter>.
 */
export function AnalyticsTracker() {
  const location = useLocation();
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  // Page view on each route change.
  useEffect(() => {
    const path = location.pathname;
    if (!shouldTrack(path)) return;

    const body = JSON.stringify({
      type: 'pageview',
      session_id: getSessionId(),
      path,
      referrer: document.referrer || null,
      device: getDevice(),
    });
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      /* analytics is best-effort; never surface errors to users */
    });
  }, [location.pathname]);

  // Heartbeats + final beacon to capture session duration.
  useEffect(() => {
    const sendHeartbeat = (useBeacon: boolean) => {
      const path = pathRef.current;
      if (!shouldTrack(path)) return;
      const payload = {
        type: 'heartbeat',
        session_id: getSessionId(),
        path,
      };
      const body = JSON.stringify(payload);
      if (useBeacon && navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    };

    const interval = window.setInterval(() => sendHeartbeat(false), HEARTBEAT_MS);
    const onHidden = () => {
      if (document.visibilityState === 'hidden') sendHeartbeat(true);
    };
    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('pagehide', () => sendHeartbeat(true));

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onHidden);
    };
  }, []);

  return null;
}
