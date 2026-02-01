import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOOLS } from '../src/features/tools/registry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://jsonandmore.com';

const staticRoutes = ['/', '/about'];

const urls = [
  ...staticRoutes.map(route => `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`),

  ...TOOLS.map(tool => `
  <url>
    <loc>${SITE_URL}/${tool.slug}</loc>
    <priority>0.8</priority>
  </url>`)
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

fs.writeFileSync(
  path.resolve(__dirname, '../public/sitemap.xml'),
  sitemap.trim()
);

console.log('✅ sitemap.xml generated');
