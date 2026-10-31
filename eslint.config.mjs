import next from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'scripts/**', 'supabase/**', 'next-env.d.ts'] },
  ...next,
  ...nextTs,
  {
    files: ['src/components/blog/**', 'src/components/admin/**'],
    rules: { '@next/next/no-img-element': 'off' },
  },
];

export default config;
