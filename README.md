# Spectehnika Rent

Next.js site for mini excavator rental and special equipment services in Lviv and Lviv oblast.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Swiper gallery
- `lucide-react` and `react-icons`
- Neon Postgres for contact click statistics and lead requests
- Vercel-ready deployment

## Local Development

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/uk`
- `http://localhost:3000/en`
- `http://localhost:3000/admin`

## Environment

Copy `.env.example` to `.env.local` and fill the missing values.

Required for contacts:

```bash
CONTACT_PHONE=+380936246205
CONTACT_PHONE_DISPLAY=+380 93 624 62 05
CONTACT_PERSON=Igor
WHATSAPP_PHONE=380936246205
VIBER_PHONE=380936246205
```

Optional:

```bash
TELEGRAM_URL=
```

Required for persistence/admin:

```bash
DATABASE_URL=
ADMIN_PASSWORD=
ADMIN_COOKIE_SECRET=
```

Without `DATABASE_URL`, the site still builds and contact/lead APIs return `stored:false`. In that fallback mode, the lead form opens WhatsApp with the request text so the request is not silently lost.

## Admin

`/admin` shows:

- total contact clicks
- clicks by channel
- recent leads
- recent contact events
- CSV export for clicks and leads

The schema is created lazily with `CREATE TABLE IF NOT EXISTS` on first read/write after Neon is configured.

## SEO

The app includes:

- Ukrainian and English localized pages
- canonical and `hreflang` alternates
- `sitemap.xml`
- `robots.txt`
- manifest and favicon assets
- Open Graph image
- JSON-LD for local business, services, FAQ, and breadcrumbs

## Verification

```bash
npm run lint
npm run build
```

Current note: `npm audit --omit=dev` reports high severity advisories inside the current `next@16.2.12` dependency tree. Do not run `npm audit fix --force`, because npm currently suggests a breaking downgrade to `next@9.3.3`. Update Next when a patched stable release is available.
