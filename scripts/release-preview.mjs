import { gzipSync } from 'node:zlib';
import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const headers = JSON.parse(readFileSync('artifacts/security-headers.json', 'utf8'));
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
};
createServer((req, res) => {
  const path = resolve(
    root,
    '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
  );
  if (path !== root && !path.startsWith(root + sep)) {
    res.writeHead(403);
    res.end();
    return;
  }
  try {
    const file = statSync(path).isDirectory() ? resolve(path, 'index.html') : path;
    if (file.endsWith('.htaccess')) throw Error('private');
    const payload = readFileSync(file);
    const compress =
      /\bgzip\b/.test(req.headers['accept-encoding'] || '') &&
      /\.(html|js|css|txt|svg|json)$/.test(file);
    res.writeHead(200, {
      ...headers,
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      Vary: 'Accept-Encoding',
      ...(compress ? { 'Content-Encoding': 'gzip' } : {}),
    });
    res.end(compress ? gzipSync(payload) : payload);
  } catch {
    res.writeHead(404, headers);
    res.end('Not found');
  }
}).listen(4174, '0.0.0.0', () =>
  console.log('Release preview with security headers: http://localhost:4174/'),
);
