import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const url = process.env.QA_URL || 'http://localhost:5173/';
mkdirSync('artifacts', { recursive: true });
const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox'],
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [],
  badResponses = [],
  external = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('response', (r) => {
  if (r.status() >= 400) badResponses.push(`${r.status()} ${r.url()}`);
});
page.on('request', (r) => {
  if (!r.url().startsWith(url) && !r.url().startsWith('data:')) external.push(r.url());
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
assert.equal(await page.locator('h1').count(), 1);
assert.match(await page.title(), /AERVEK/);
const widths = [320, 375, 390, 768, 1024, 1440, 1920];
const responsive = [];
for (const width of widths) {
  await page.setViewportSize({ width, height: 1000 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  const result = await page.evaluate(() => ({
    viewport: innerWidth,
    width: document.documentElement.scrollWidth,
  }));
  assert.ok(result.width <= width, `Overflow at ${width}: ${result.width}`);
  responsive.push(result);
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.getByRole('button', { name: 'CNC spindle' }).click();
assert.equal(await page.locator('.dash-title h3').textContent(), 'CNC spindleCNC-02');
assert.match(await page.locator('.dash-metrics').textContent(), /61.8/);
await page.getByRole('button', { name: '7D', exact: true }).click();
assert.equal(
  await page.getByRole('button', { name: '7D', exact: true }).getAttribute('aria-pressed'),
  'true',
);
await page.getByRole('button', { name: 'Asset details' }).click();
assert.equal(await page.locator('.asset-details').isVisible(), true);
await page.getByRole('button', { name: 'Cooling pump' }).click();
assert.match(await page.locator('.dash-metrics').textContent(), /35.4/);
await page.getByRole('button', { name: 'Assembly robot' }).click();
await page.getByRole('button', { name: '24H', exact: true }).click();
await page.getByRole('button', { name: '02 / MOVEMENT Robotics & automation' }).click();
assert.match(await page.locator('.application-detail').textContent(), /cycle behavior/);
await page.getByRole('button', { name: '01 / PRODUCTION Advanced manufacturing' }).click();
await page.getByRole('link', { name: 'Investor & Partnership Inquiries' }).click();
assert.equal(await page.locator('select').inputValue(), 'investor');
await page.getByLabel('Full name').fill('Alex Demo');
await page.getByLabel('Work email').fill('invalid');
await page.getByLabel('Company', { exact: true }).fill('Example Manufacturing');
await page.getByRole('button', { name: 'Preview Your Inquiry' }).click();
assert.equal(
  await page.locator('input[type=email]').evaluate((e) => e.validity.typeMismatch),
  true,
);
assert.equal(await page.locator('.form-success').count(), 0);
await page.getByLabel('Work email').fill('alex@example.com');
await page.getByRole('button', { name: 'Preview Your Inquiry' }).click();
assert.equal(await page.getByRole('button', { name: 'Simulating submission…' }).isDisabled(), true);
await page.getByRole('heading', { name: 'Demo completed.' }).waitFor();
assert.match(await page.locator('.form-success').textContent(), /No message was sent/);
await page.getByRole('button', { name: 'Try another inquiry' }).click();
await page.getByRole('button', { name: 'Demo privacy' }).click();
assert.equal(await page.locator('dialog').isVisible(), true);
await page.keyboard.press('Escape');
assert.equal(await page.locator('dialog').isVisible(), false);
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => scrollTo(0, 0));
await page.getByRole('button', { name: 'Open navigation' }).click();
assert.equal(await page.locator('.navigation').isVisible(), true);
await page.keyboard.press('Escape');
assert.equal(await page.locator('.navigation').isVisible(), false);
await page.getByRole('button', { name: 'Open navigation' }).click();
await page.locator('.navigation').getByRole('link', { name: 'Technology', exact: true }).click();
assert.equal(await page.locator('.navigation').isVisible(), false);
await page.emulateMedia({ reducedMotion: 'reduce' });
assert.equal(
  await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
  'auto',
);
assert.equal(await page.locator('h1').evaluate((e) => getComputedStyle(e).animationName), 'none');
await page.emulateMedia({ reducedMotion: 'no-preference' });
// Scroll the full page to load lazy images and complete one-time viewport reveals.
await page.setViewportSize({ width: 1440, height: 1000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 90));
  }
  scrollTo(0, 0);
});
await page.waitForTimeout(700);
assert.deepEqual(
  await page
    .locator('img')
    .evaluateAll((imgs) =>
      imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
    ),
  [],
);
await page.screenshot({ path: 'artifacts/desktop-hero.png' });
await page.screenshot({ path: 'artifacts/desktop-full.png', fullPage: true });
await page.locator('.dashboard').screenshot({ path: 'artifacts/dashboard.png' });
const axeDesktop = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  .analyze();
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => scrollTo(0, 0));
await page.waitForTimeout(300);
await page.screenshot({ path: 'artifacts/mobile-hero.png' });
await page.screenshot({ path: 'artifacts/mobile-full.png', fullPage: true });
const axeMobile = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
  .analyze();
const nojs = await browser.newContext({ javaScriptEnabled: false });
const staticPage = await nojs.newPage();
await staticPage.goto(url);
const staticHeading = await staticPage.locator('h1').count();
assert.equal(
  await staticPage.locator('input[name=name]').isDisabled(),
  true,
  'No-JavaScript form must not submit sample data',
);
await nojs.close();
const report = {
  responsive,
  checks: [
    'asset switching',
    'time range switching',
    'asset details',
    'application switching',
    'investor inquiry preselection',
    'invalid email',
    'form loading and simulated success',
    'privacy dialog and Escape',
    'mobile navigation and Escape',
    'reduced motion',
    'images loaded',
    'single heading',
  ],
  errors,
  badResponses,
  externalRequests: [...new Set(external)],
  axeDesktop: axeDesktop.violations,
  axeMobile: axeMobile.violations,
  staticHeading,
};
writeFileSync('artifacts/qa-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
assert.equal(staticHeading, 1, 'Static build must retain content without JavaScript');
assert.deepEqual(errors, []);
assert.deepEqual(badResponses, []);
assert.equal(axeDesktop.violations.length, 0);
assert.equal(axeMobile.violations.length, 0);
