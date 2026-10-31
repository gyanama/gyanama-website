import type { ReactNode } from 'react';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { OrganizationSchema } from '@/components/seo/JsonLd';

export const ensureStatic = 'navigation';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-ink">
      <OrganizationSchema />
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
