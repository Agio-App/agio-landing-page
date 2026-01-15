<div align="center">
  <img src="./images/logo_light.svg" alt="Agio" width="260" />
</div>

## Agio Landing Page

Marketing site for **Agio** — built with **React + TypeScript + Vite**.

### Tech

- **React** (UI)
- **Vite** (dev server + build)
- **TypeScript**
- **Framer Motion** (animations)
- **Lucide** (icons)

### Local development

1. Install dependencies:
   - `npm install`
2. Start the dev server:
   - `npm run dev`

### Build & preview

- **Build**: `npm run build`
- **Preview build locally**: `npm run preview`

### Sitemap, robots, llms

Builds require `SITE_URL` (can be set in `.env`) to generate `sitemap.xml`, `robots.txt`, and `llms.txt` in `dist/`.

Example:

```
SITE_URL=https://your-domain.com npm run build
```

Notes:

- `robots.txt` disallows localized thank-you pages (e.g. `/en/thank-you`) and the sitemap excludes them.

### Deploy notes

- `public/_redirects` is included for static hosting providers (e.g. Netlify).
