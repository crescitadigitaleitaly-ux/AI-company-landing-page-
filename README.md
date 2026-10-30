# AERVEK — Industrial Intelligence Concept

An independent portfolio demonstration inspired by the supplied industrial AI landing-page brief. AERVEK is a fictional brand. This was not commissioned or approved by the Upwork client. No funding, customers, partnerships, traction or production capabilities are represented as real.

## Run locally

Requires Node.js 22.12+ (tested with Node 24).

```sh
npm ci
npm run dev
```

Development URL: http://localhost:5173/

```sh
npm run build
npm run preview
```

Production preview: http://localhost:4173/

`dist/` is a static, prerendered website. It does not need a Node server after building. No hosting or DNS changes have been made. It can be evaluated for a Hostinger static subdomain after the owner approves the destination. Do not upload over the main WordPress site.

## Implementation

React + TypeScript + Vite, Motion for React (formerly Framer Motion), Lucide icons and custom CSS. The stack is intentionally static and does not require a Next.js runtime. Hero and below-fold text are prerendered, then hydrated for interactions. No Three.js, WebGL, 3D models, video backgrounds, animation loops, analytics or remote font/image requests.

- Original fictional branding and industrial product narrative
- Responsive navigation and accessible Escape behavior
- Interactive synthetic asset dashboard, time ranges and asset details
- Selectable application descriptions
- Investor CTA preselects investor inquiry
- Native form validation, loading and simulated success/error handling
- No form information is sent, logged or persisted by the application
- Native privacy dialog with focus restoration
- One-time small Motion transforms; reduced-motion preference respected
- Priority hero loading, responsive WebP assets, lazy below-fold images
- Locally hosted Inter font and OFL license
- `noindex,nofollow` and disallowing robots.txt for the uncommissioned demo

## Editing

- `src/content.ts`: navigation, problem statements, capabilities, applications and synthetic asset data
- `src/App.tsx`: named page sections and interactions
- `src/styles.css`: palette, typography, layouts, components and responsive overrides
- `public/`: optimized site assets, font license and robots.txt
- `scripts/prerender.tsx`: static HTML generation
- `scripts/qa.mjs`: browser interaction, responsive and accessibility checks

## Verification

```sh
QA_URL=http://localhost:4173/ npm run test:browser
CHROME_PATH=/usr/bin/chromium npx lighthouse http://localhost:4173/ --chrome-flags='--headless --no-sandbox' --output=json --output=html --output-path=artifacts/lighthouse-mobile
```

Browser QA requires Chromium at `/usr/bin/chromium`, or an equivalent local adjustment to the executable path. Results and screenshots go in `artifacts/` (ignored by Git). See `QA.md` for measured results and limits.

## Before any launch

1. Obtain explicit owner approval and verify the exact Hostinger subdomain and path.
2. The owner confirmed https://mouzzambuild.com/ for the footer credit. Verify the separate demo deployment destination before publishing.
3. Replace the simulated form with a verified backend only if requested; add appropriate security and privacy controls for actual processing.
4. Keep concept disclosures; remove `noindex` only if the owner chooses indexing.
5. Configure absolute canonical/OG URLs and sitemap after a deployment domain is confirmed.

See `RESEARCH.md` for reference observations and image provenance.

## Compare light and dark themes

Use the sun/moon control in the header or open the workspace-local URLs:

- Light: http://localhost:4173/?theme=light
- Dark: http://localhost:4173/?theme=dark

The selected theme stays in the URL for sharing and reloading, with no cookies or browser storage. Both themes reuse all assets and interactions. `node scripts/theme-qa.mjs` checks the light design, theme switching, responsive widths and accessibility against the production preview.

## Selected design direction

Dark is the selected default. `src/refinement.css` contains the latest warm charcoal/brass palette, editorial serif accents, photographic factory-floor narrative, asymmetric technology panels and staggered application layout. The light comparison remains available via the existing switch. Updated desktop/mobile evidence and `lighthouse-refined-mobile.report.*` are included in the source archive.

## Release checks and hosting headers

`npm run build` now emits `dist/.htaccess` with a script-hash CSP, blocked native form submissions, anti-framing, MIME-sniffing protection and scoped static caching. `npm run preview:release` serves these headers at http://localhost:4174/ for local verification; run `QA_URL=http://localhost:4174/ npm run test:browser` against it. The sample form is disabled when JavaScript is unavailable, so sample values cannot fall back to a GET URL.

The requested main-domain deployment and rollback plan is in `DEPLOYMENT.md`. Hosting access and a verified backup are required before any live replacement. The source is intended for the existing `crescitadigitaleitaly-ux/AI-company-landing-page-` GitHub repository.
