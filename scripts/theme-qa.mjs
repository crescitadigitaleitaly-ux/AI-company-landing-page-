import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox'],
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
await page.goto('http://localhost:4173/?theme=light', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
const widths = [];
for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
  await page.setViewportSize({ width, height: 1000 });
  const actual = await page.evaluate(() => document.documentElement.scrollWidth);
  widths.push({ width, actual });
  assert.ok(actual <= width, `Overflow ${width} => ${actual}`);
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.getByRole('button', { name: 'Switch to dark theme' }).click();
assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
assert.match(page.url(), /theme=dark/);
await page.reload({ waitUntil: 'networkidle' });
assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
await page.getByRole('button', { name: 'Switch to light theme' }).click();
await page.getByRole('button', { name: 'CNC spindle' }).click();
assert.match(await page.locator('.dash-metrics').textContent(), /61.8/);
await page.getByRole('button', { name: 'Assembly robot' }).click();
await page.getByLabel('Full name').fill('Alex Demo');
await page.getByLabel('Work email').fill('alex@example.com');
await page.getByLabel('Company', { exact: true }).fill('Example Industrial');
await page.getByRole('button', { name: 'Preview Your Inquiry' }).click();
await page.getByRole('heading', { name: 'Demo completed.' }).waitFor();
await page.getByRole('button', { name: 'Try another inquiry' }).click();
await page.getByRole('button', { name: 'Demo privacy' }).click();
assert.equal(await page.locator('dialog').isVisible(), true);
await page.keyboard.press('Escape');
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    scrollTo({ top: y, behavior: 'instant' });
    await new Promise((r) => setTimeout(r, 70));
  }
  scrollTo({ top: 0, behavior: 'instant' });
});
await page.waitForTimeout(700);
await page.screenshot({ path: 'artifacts/light-desktop-hero.png' });
await page.screenshot({ path: 'artifacts/light-desktop-full.png', fullPage: true });
await page.locator('.dashboard').screenshot({ path: 'artifacts/light-dashboard.png' });
const desktop = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
  .analyze();
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
await page.getByRole('button', { name: 'Open navigation' }).click();
assert.equal(await page.locator('.navigation').isVisible(), true);
await page.keyboard.press('Escape');
await page.evaluate(() => document.activeElement?.blur());
await page.screenshot({ path: 'artifacts/light-mobile-hero.png' });
await page.screenshot({ path: 'artifacts/light-mobile-full.png', fullPage: true });
const mobile = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
const report = { widths, errors, desktop: desktop.violations, mobile: mobile.violations };
writeFileSync('artifacts/theme-qa.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
assert.deepEqual(errors, []);
assert.deepEqual(desktop.violations, []);
assert.deepEqual(mobile.violations, []);
