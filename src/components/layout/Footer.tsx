import { Link } from 'react-router-dom';
import { Linkedin, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const footerLinks = {
  product: [
    { name: 'AI Systems', href: '/ai-systems' },
    { name: 'Features', href: '/features' },
    { name: 'Use Cases', href: '/use-cases' },
  ],
  company: [
    { name: 'About', href: '/about' },
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
                src="/v2 transparent.png"
                alt="Gyanama Logo"
                className="h-14 w-auto"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <span className="text-2xl font-semibold tracking-tight">GYANAMA</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-6">
              Because every child's day matters. An AI-powered system that runs your entire school from one clean dashboard.
            </p>

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
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
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
