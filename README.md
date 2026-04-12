# GYANAMA Website

Marketing website for **GYANAMA** — an AI-powered school management platform.
**Live:** [gyanama.com](https://gyanama.com)

## Tech Stack
- **React 18** + **TypeScript** (strict mode)
- **Vite** — build tool
- **Tailwind CSS** + **shadcn/ui** — styling & components
- **Framer Motion** — animations
- **Cal.com** — scheduling (optional)
- **Netlify Functions** — server-side email handling
- **Cloudflare Turnstile** — CAPTCHA (optional)

## Getting Started

```bash
# Clone
git clone https://github.com/your-org/gyanama-website.git
cd gyanama-website

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Start dev server
npm run dev
```

Dev server runs at `http://localhost:8080`

## Environment Variables

### Server-side only (Netlify Function — never exposed to browser)

| Variable | Required | Description |
|----------|----------|-------------|
| `EMAILJS_SERVICE_ID` | Yes | EmailJS service ID |
| `EMAILJS_TEMPLATE_ID` | Yes | EmailJS template ID |
| `EMAILJS_PUBLIC_KEY` | Yes | EmailJS public key |
| `CONTACT_EMAIL` | No | Recipient email (defaults to gyanamaedu@gmail.com) |
| `TURNSTILE_SECRET_KEY` | No | Cloudflare Turnstile secret key |

### Client-side (VITE_ prefix — safe public values only)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_CAL_USERNAME` | No | Cal.com username for scheduling widget |
| `VITE_CAL_EVENT_SLUG` | No | Cal.com event slug (defaults to `15min-demo`) |
| `VITE_TURNSTILE_SITE_KEY` | No | Cloudflare Turnstile site key |

**The site works without any optional variables.** Cal.com buttons fall back to the email form. Turnstile CAPTCHA simply doesn't render.

## Project Structure

```
gyanama-website/
├── netlify/
│   └── functions/
│       └── send-demo-request.ts   # Server-side email handler
├── public/                         # Static assets
├── src/
│   ├── components/
│   │   ├── home/                   # Homepage sections
│   │   ├── layout/                 # Navbar, Footer, PageLayout
│   │   ├── scheduling/             # Cal.com embed & popup button
│   │   └── ui/                     # shadcn/ui + custom components
│   ├── hooks/                      # useDocumentTitle, useMobile, useToast
│   ├── lib/                        # constants, env validation, rate limiter
│   └── pages/                      # Route pages
├── netlify.toml                    # Build config, headers, redirects
├── .env.example                    # Environment variable template
└── package.json
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/ai-systems` | AI Systems detail |
| `/features` | Platform features |
| `/use-cases` | School use cases |
| `/about` | About GYANAMA |
| `/contact-us` | Contact info + social links |
| `/book-demo` | Demo booking (Cal.com / email form) |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

## Deploying to Netlify

1. Push code to GitHub
2. Connect repo in Netlify Dashboard
3. Netlify auto-detects `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Set environment variables in **Site settings > Environment variables**:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
   - `VITE_CAL_USERNAME` (optional)
5. Set custom domain to `gyanama.com`
6. Done

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 8080) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Security

- EmailJS credentials are **server-side only** (Netlify Function) — never in the browser bundle
- HTTP security headers configured in `netlify.toml` (CSP, HSTS, X-Frame-Options, etc.)
- Input sanitization on both client and server
- Server-side rate limiting by IP (5 requests / 5 min)
- Client-side rate limiting (3 submissions / 5 min)
- TypeScript strict mode enabled
- No source maps in production
- Optional Cloudflare Turnstile CAPTCHA support

## License

All rights reserved. Copyright GYANAMA.
