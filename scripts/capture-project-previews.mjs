import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const projects = [
  { slug: 'cladex', url: 'https://wilsonfrantine.github.io/cladex/' },
  { slug: 'fastaregex', url: 'https://wilsonfrantine.github.io/fastaregex/' },
  { slug: 'palebluedot', url: 'https://wilsonfrantine.github.io/palebluedot/' },
  { slug: 'aves', url: 'https://wilsonfrantine.github.io/aves/' },
  { slug: 'neuroflow', url: 'https://wilsonfrantine.github.io/neuroflow/' },
  { slug: 'nucleodrop', url: 'https://wilsonfrantine.github.io/nucleodrop/' },
  { slug: 'arvoresuenp', url: 'https://wilsonfrantine.github.io/arvoresuenp/' },
  { slug: 'photonpdf', url: 'https://wilsonfrantine.github.io/photonpdf/' },
  { slug: 'wordcloud-app', url: 'https://wilsonfrantine.github.io/wordcloud-app/' },
  { slug: 'criptykey', url: 'https://wilsonfrantine.github.io/criptykey/' },
  { slug: 'ggdapc', url: 'https://wilsonfrantine.github.io/ggDAPC/' },
  { slug: 'ggbeast', url: 'https://wilsonfrantine.github.io/ggbeast/vignette/using_ggbeast' },
  { slug: 'ggmodel', url: 'https://wilsonfrantine.github.io/ggmodel/' },
  { slug: 'r101', url: 'https://wilsonfrantine.github.io/R101/' },
  { slug: 'vertebrate-diversity', url: 'https://wilsonfrantine.github.io/tools/vertebrate-diversity/' },
];
const requestedSlugs = new Set(process.argv.slice(2));
const projectsToCapture = requestedSlugs.size
  ? projects.filter(project => requestedSlugs.has(project.slug))
  : projects;

const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
    : {}),
});

await mkdir('public/projects/previews', { recursive: true });

for (const project of projectsToCapture) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
    reducedMotion: 'reduce',
  });

  try {
    await page.goto(project.url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);

    const startButton = page.getByRole('button', { name: /^(iniciar|começar|start|entrar)/i }).first();
    if (await startButton.isVisible({ timeout: 1200 }).catch(() => false)) {
      await startButton.click();
      await page.waitForTimeout(1800);
    }

    await page.screenshot({
      path: `public/projects/previews/${project.slug}.png`,
      animations: 'disabled',
    });
    console.log(`captured ${project.slug}: ${await page.title()}`);
  } catch (error) {
    console.error(`failed ${project.slug}: ${error.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
