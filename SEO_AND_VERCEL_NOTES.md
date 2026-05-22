# SEO And Vercel Notes

## SEO Changes Made

- Kept canonical URLs fixed to `https://emergingnursing.com` for all public pages.
- Confirmed unique metadata is generated for:
  - `/`
  - `/about`
  - `/services`
  - `/referrals`
  - `/careers`
  - `/staff-training`
  - `/contact`
- Added production-aware robots behavior so Vercel preview and non-production deployments return `Disallow: /`.
- Kept sitemap output restricted to the seven public marketing routes only.
- Added JSON-LD structured data for:
  - `Organization`
  - `MedicalBusiness`
  - `WebSite`
  - `BreadcrumbList` on each public route

## Metadata Structure

- Shared metadata is defined in `app/layout.jsx`.
- Route-specific metadata is generated through `src/lib/metadata.js`.
- Canonical, Open Graph, and Twitter card values all resolve against the production domain.
- Preview deployments are marked `noindex, nofollow` through metadata and `robots.txt`.

## Sitemap Behavior

- `app/sitemap.js` outputs only the public website URLs.
- No admin, API, preview, localhost, or legacy Vite paths are included.
- Sitemap URLs are always emitted against `https://emergingnursing.com`.

## Robots Behavior

- Production indexing is enabled only when:
  - `VERCEL_ENV=production`
  - `NEXT_PUBLIC_SITE_URL=https://emergingnursing.com`
- All other environments return `Disallow: /`.
- `/admin/` and `/api/` are explicitly excluded from allowed crawl paths as a safety measure.

## Structured Data Notes

- Business name used: `Emerging Nursing and Disability Services`.
- Business phone and email are pulled from existing site content.
- Service areas are limited to the existing WA locations already present in the codebase.
- No physical street address was invented.
- If a confirmed ABN, social profiles, or formal business address are added later, they can be safely appended to the structured data helpers in `src/lib/structuredData.js`.

## Vercel Deployment Notes

- Primary production domain should be `emergingnursing.com`.
- `www.emergingnursing.com` should be configured in Vercel to redirect permanently to `https://emergingnursing.com`.
- Keep `NEXT_PUBLIC_SITE_URL` set to `https://emergingnursing.com` in the production environment.
- Safe response headers are defined in `next.config.js`:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: SAMEORIGIN`
  - `Content-Security-Policy: frame-ancestors 'self'`
  - `Permissions-Policy` with camera, microphone, geolocation, and browsing topics disabled

## Environment Variables

- `.env.example` should continue to expose:
  - `NEXT_PUBLIC_SITE_URL=https://emergingnursing.com`
  - `NEXT_PUBLIC_API_BASE_URL=https://api.emergingnursing.com`
- Preview environments should not override `NEXT_PUBLIC_SITE_URL` to a Vercel preview hostname.

## Manual Setup After Deploy

- Add the production domain to Google Search Console.
- Submit `https://emergingnursing.com/sitemap.xml` in Search Console.
- Configure Google Analytics or another privacy-appropriate analytics platform if required.
- Confirm the preferred domain in Google Business Profile matches `https://emergingnursing.com`.
- Verify the `www` to apex redirect after DNS and Vercel domain setup is complete.

## Remaining Tasks For Later Phases

- Connect the public forms to the PHP API once backend endpoints are available.
- Add real success/error handling for network submissions.
- Add verified business address details only after they are confirmed for publication.
- Add Search Console verification metadata if the verification token is supplied.
- Reassess bundle size once API wiring, analytics, and any additional media are introduced.
