import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const html = readFileSync('dist/index.html', 'utf8');
const hashes = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter((m) => !m[1].includes('src='))
  .map((m) => `'sha256-${createHash('sha256').update(m[2].replace(/\r\n?/g, '\n')).digest('base64')}'`);
const headers = {
  'Content-Security-Policy': `default-src 'self'; script-src 'self' ${hashes.join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests`,
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};
const apache = `# Generated for the static AERVEK release. Back up existing hosting configuration before deployment.\nOptions -Indexes\nDirectoryIndex index.html\n<IfModule mod_deflate.c>\nAddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json image/svg+xml\n</IfModule>\n<IfModule mod_headers.c>\n${Object.entries(
  headers,
)
  .map(([name, value]) => `Header always set ${name} "${value}"`)
  .join(
    '\n',
  )}\nHeader always unset X-Powered-By\n<FilesMatch "\\.html$">\nHeader set Cache-Control "no-cache, must-revalidate"\n</FilesMatch>\n</IfModule>\n<IfModule mod_expires.c>\nExpiresActive On\nExpiresByType image/webp "access plus 1 day"\nExpiresByType font/woff2 "access plus 30 days"\n</IfModule>\n`;
writeFileSync('dist/.htaccess', apache);
mkdirSync('artifacts', { recursive: true });
writeFileSync('artifacts/security-headers.json', JSON.stringify(headers, null, 2));
console.log('Generated static hosting security headers with hashes for inline bootstrap scripts.');
