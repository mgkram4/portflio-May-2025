import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://markgarcia.dev';

const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    url: '/projects',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    url: '/blog',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: '0.7',
  },
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${routes
  .map(
    (route) => `  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const publicPath = path.join(process.cwd(), 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }

  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
  console.log('✅ sitemap.xml generated successfully');
}

// Generate sitemap if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export default generateSitemap; 