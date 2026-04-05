/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TURNSTILE_SITE_KEY: string;
  readonly VITE_CAL_USERNAME: string;
  readonly VITE_CAL_EVENT_SLUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
