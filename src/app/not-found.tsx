import Link from 'next/link';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';

export const metadata = { title: 'Page not found | GYANAMA', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Nav />
      <main className="mx-auto max-w-2xl px-4 py-24 text-center md:py-32">
        <p className="font-inter text-[14px] font-semibold text-indigo/80">404</p>
        <h1 className="mt-3 font-fraunces text-[2.2rem] font-medium leading-tight md:text-[3rem]">This page does not exist.</h1>
        <p className="mt-4 font-inter text-[16px] text-ink/65">The link may be old, or the page may have moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 font-inter">
          <Link href="/" className="rounded-full bg-indigo px-6 py-3 text-[15px] font-semibold text-white hover:bg-indigo-deep">Go to the homepage</Link>
          <Link href="/blog" className="rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-indigo ring-1 ring-indigo/15">Read the blog</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
