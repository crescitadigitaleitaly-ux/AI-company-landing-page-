# Verification — 30 October 2026

The complete static production build was tested at http://localhost:4173/ in headless Chromium on the managed Linux workspace. The development server is http://localhost:5173/. These are workspace-local addresses; opening them from another computer requires forwarding or running the downloaded project locally. The Codex browser-panel open request was queued; that does not prove remote forwarding is available.

## Results

| Check                                                    | Result                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------ |
| TypeScript strict compilation                            | Passed                                                                   |
| Vite production build and HTML prerender                 | Passed                                                                   |
| Browser widths                                           | 320, 375, 390, 768, 1024, 1440, 1920 px                                  |
| Horizontal document overflow                             | None at the seven tested widths                                          |
| Asset selection / health / temperature / insight updates | Passed                                                                   |
| Telemetry range selection                                | Passed                                                                   |
| Asset-detail disclosure                                  | Passed                                                                   |
| Application selection                                    | Passed                                                                   |
| Investor inquiry preselection                            | Passed                                                                   |
| Invalid email rejection                                  | Passed                                                                   |
| Form loading, success and reset                          | Passed; no delivery or persistence                                       |
| Mobile menu, section navigation, Escape                  | Passed                                                                   |
| Native privacy dialog and Escape                         | Passed                                                                   |
| Reduced motion                                           | Smooth scroll and CSS animations disabled; Motion honors user preference |
| Images                                                   | All loaded successfully after scrolling the page                         |
| Browser errors / console errors / failed responses       | None recorded                                                            |
| External page requests                                   | None recorded                                                            |
| Prerendered H1 with JavaScript disabled                  | Present                                                                  |
| axe WCAG 2 A/AA, 2.1 A/AA                                | Zero reported desktop or mobile violations                               |
| Production dependency audit                              | Zero reported vulnerabilities                                            |

The first accessibility scan found insufficient contrast in two decorative section numbers. Their color was corrected, and the full browser check passed afterward.

## Lighthouse

Latest runs use the production build, Lighthouse defaults for mobile and the desktop preset. These are laboratory measurements on this local environment, not field Core Web Vitals or guaranteed hosting scores.

| Metric                   | Mobile | Desktop |
| ------------------------ | ------ | ------- |
| Performance              | 99     | 100     |
| Accessibility            | 100    | 100     |
| Best practices           | 100    | 100     |
| SEO                      | 66     | 66      |
| First contentful paint   | 0.8 s  | 0.2 s   |
| Largest contentful paint | 2.0 s  | 0.5 s   |
| Total blocking time      | 100 ms | 0 ms    |
| Cumulative layout shift  | 0      | 0       |

An earlier mobile run during concurrent verification scored 91 performance (2.0 s LCP, 360 ms TBT, CLS 0). Run-to-run CPU variation affects the lab score. No field INP has been measured.

**SEO is deliberately reduced because the portfolio demo uses both noindex and a disallowing robots.txt.** Other metadata and heading checks pass. A final domain and indexing decision are required before adding canonical URLs and an absolute sitemap/OG URL. The extra experimental Lighthouse agentic-browsing category is outside the requested scope and is not counted in these results.

## Assets and payload

- Desktop hero: approximately 116 KB WebP
- Mobile hero: approximately 38 KB WebP
- Local variable font: approximately 48 KB
- Production JavaScript: approximately 105 KB gzip
- Production CSS: approximately 10 KB gzip
- No WebGL, Three.js, interactive 3D, continuous animation loops or charting-library runtime
- Prerendered content is available before JavaScript; JavaScript enables the demo interactions

## Evidence

- `artifacts/qa-report.json`
- `artifacts/desktop-hero.png`
- `artifacts/desktop-full.png`
- `artifacts/mobile-hero.png`
- `artifacts/mobile-full.png`
- `artifacts/dashboard.png`
- `artifacts/lighthouse-mobile.report.html` and `.json`
- `artifacts/lighthouse-desktop.report.html` and `.json`

Desktop hero, dashboard, platform diagram, technology, applications, vision, contact and mobile captures were visually reviewed. Automated checks do not establish accessibility certification; physical-device and assistive-technology testing has not been performed.

## Remaining review decisions

- Approve the visual concept before any publishing, as explicitly requested in the master brief.
- The owner confirmed https://mouzzambuild.com/ for the portfolio credit. The link was added and checked after the full QA pass.
- Verify Hostinger destination and capabilities only when deployment is authorized. No hosting, DNS, WordPress or existing portfolio files have been changed.
- The contact form is intentionally simulated; there is no inbox integration.

## Guidance applied

Web task router for scope, design, privacy and verification; Sites presentation guidance for composition and local-only delivery; Firecrawl for the job and references; React best-practices checklist for hooks, typed state, conditional rendering, static content and rendering cost; managed-cloud runtime guidance for execution and network access.

## Light-theme comparison update

Added a complete light design with pale steel surfaces, navy typography, blue accents and a matching light operations dashboard. A header sun/moon control switches themes; `?theme=light` and `?theme=dark` keep comparison links reloadable without cookies or local storage. No new dependencies or image downloads were added. Production CSS increased by approximately 1.9 KB gzip and JavaScript by approximately 0.5 KB gzip.

- Strict TypeScript / production build / static prerender: passed.
- Light theme at 320, 375, 390, 768, 1024, 1440 and 1920 px: no document overflow.
- Theme toggle, direct link and reload: passed.
- Light dashboard, simulated form, privacy dialog and mobile navigation: passed.
- Light desktop/mobile axe scans: zero reported violations after correcting small technical-label contrast.
- Full original dark-theme browser suite: passed again, including zero axe violations and no console/runtime errors.
- Desktop, full-page, dashboard and mobile light screenshots saved in `artifacts/light-*.png`; side-by-side hero comparison saved in `artifacts/theme-comparison.png`.
- No fresh Lighthouse performance run was required for this presentation change; the scores above describe the earlier dark-build measurement, not a new light-theme measurement.

## Selected dark design — editorial refinement

The owner selected dark and requested a more natural, distinctive direction. Added `src/refinement.css` for warm charcoal surfaces, subtle brass accents, system-serif display details, more conversational hero copy, an industrial photograph alongside the challenge narrative, a short platform thesis, asymmetric capability panels and staggered editorial application layouts. The blue data visualizations are retained for a clear software/physical-world contrast. No libraries, external requests, 3D, video, continuous effects or extra media downloads were introduced.

Verified against the updated production build:

- TypeScript, static build and prerender passed.
- Full browser suite passed across 320, 375, 390, 768, 1024, 1440 and 1920 px, including no horizontal overflow.
- Dashboard interactions, form validation/loading/success, navigation, privacy dialog and reduced motion passed.
- Zero axe violations on desktop/mobile, zero recorded runtime/console errors and zero external page requests.
- Desktop/mobile screenshots and full-page layout visually reviewed.
- Latest mobile Lighthouse: performance 98, accessibility 100, best practices 100; SEO 66 remains intentionally limited by noindex.
- Mobile lab LCP 2.3 s, TBT 70 ms, CLS 0. Scores remain environment-specific lab measurements.
- Current client payload: approximately 106 KB JavaScript gzip and 14.4 KB CSS gzip; no increase in image payload.

The current `desktop-hero.png`, `desktop-full.png`, `mobile-hero.png` and `mobile-full.png` show this selected direction. `dark-before-refinement.png` preserves the previous hero for comparison. No deployment has occurred.
