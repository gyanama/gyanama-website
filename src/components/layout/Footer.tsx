import { Link } from 'react-router-dom';
import { Linkedin, MessageCircle, MapPin, Instagram, Play, Facebook } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

// lucide's `X` is the close icon, not the brand mark — use the official X logo.
function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerLinks = {
  product: [
    { name: 'AI Systems', href: '/ai-systems' },
    { name: 'Features', href: '/features' },
    { name: 'Use Cases', href: '/use-cases' },
    { name: 'Gyanama vs a school ERP', href: '/vs-school-management-software' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Book a Demo', href: '/book-demo' },
    { name: 'Contact Us', href: '/contact-us' },
  ],
};

export function Footer() {
  return (
    <footer aria-label="Footer navigation" className="border-t border-border/50 bg-white/50 backdrop-blur-sm">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/gyanama-logo-256.png"
                alt="GYANAMA — AI school platform"
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-14 w-auto"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="text-2xl font-semibold tracking-tight">GYANAMA</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
              The AI operating system for schools. Gyanama doesn't just store your school's data — it understands what's happening and takes action.
            </p>

            {/* Address */}
            <div className="flex items-start gap-2 text-sm text-muted-foreground mb-6">
              <MapPin size={18} className="shrink-0 mt-0.5" />
              <address className="not-italic leading-relaxed">
                C30, Sector 63, Noida
              </address>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 hover:bg-sky-100 transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 hover:bg-pink-100 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SITE_CONFIG.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href={SITE_CONFIG.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X"
                className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 hover:bg-neutral-200 transition-colors"
              >
                <XIcon size={18} />
              </a>
              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>

            {/* Get the app */}
            <a
              href={SITE_CONFIG.playStore}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get GYANAMA on Google Play"
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-foreground text-background px-4 py-2 hover:opacity-90 transition-opacity"
            >
              <Play className="w-5 h-5 fill-current" />
              <span className="flex flex-col leading-none text-left">
                <span className="text-[9px] uppercase tracking-wider opacity-80">Get it on</span>
                <span className="text-sm font-semibold leading-tight">Google Play</span>
              </span>
            </a>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GYANAMA. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
