# Release destination and deployment plan

The owner requested publication at the main domain **https://mouzzambuild.com/** on 30 October 2026, after pushing the code to GitHub and checking performance, functionality, UI/UX, security and responsiveness.

## Current destination

Read-only public inspection found an existing Hostinger WordPress site titled **Mouzzam Builds – Independent Web Developer & Engineer**. Publishing AERVEK at `/` will replace that homepage with a clearly disclosed fictional industrial-AI portfolio demonstration. No DNS change is expected for a deployment to the existing Hostinger website.

## Required backup and deployment sequence

1. Connect the Hostinger account and identify the exact `mouzzambuild.com` website, plan and document root. Do not select a similarly named site.
2. Create and verify a restorable full file/configuration backup and WordPress database backup before replacing the main site. Record the backup identity and restoration method. Download a copy where supported.
3. Deploy the locally built static archive, with `index.html` at its root, to the confirmed main-domain document root. The generated `.htaccess` makes `index.html` the directory index and includes scoped security/cache headers for Hostinger's LiteSpeed/Apache stack. Preserve the old WordPress snapshot and database for rollback; do not delete either.
4. Verify HTTPS, rendered AERVEK copy, all images/fonts/JS/CSS, security headers, desktop/mobile navigation, dashboard, simulated form and the confirmed portfolio credit link. Clear Hostinger cache if the previous page remains visible.
5. Check apex and `www` behavior; maintain existing email and verification DNS records. DNS edits are unnecessary unless the inspected hosting configuration proves otherwise.
6. Roll back to the verified backup if the live site fails material checks.

## Release behavior

- Dark is the default, with the light comparison still available.
- The inquiry form remains explicitly simulated; there is no real inbox delivery.
- The concept disclosures remain visible.
- `noindex,nofollow` and the restrictive robots.txt remain from the approved portfolio brief. Publishing this package at the main domain keeps that homepage out of search indexing until the owner requests a change.
- Canonical and Open Graph URLs now use `https://mouzzambuild.com/`.
- `npm run build` generates the CSP with a SHA-256 hash matching the final inline theme bootstrap. Do not hand-edit the built HTML without regenerating the headers.

## Access limitation at preparation time

Hostinger is not configured in this chat. `codex mcp add hostinger --url https://mcp.hostinger.com` could not persist configuration because `/home/agent/.codex` is read-only. Connect/sign in through the app's Hostinger connector to perform the backup and publication. Never paste access tokens or passwords into chat. No existing live files, WordPress settings or DNS records have been modified.
