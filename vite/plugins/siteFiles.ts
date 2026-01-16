import { promises as fs } from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import type { Plugin } from 'vite';

import { canonicalLocales } from '../../i18n/url';

type SiteFilesOptions = {
  siteUrl: string;
};

const normalizeSiteUrl = (siteUrl: string): string => siteUrl.replace(/\/+$/, '');

const formatXml = (xml: string): string => `${xml.replace(/></g, '>\n<')}\n`;

const buildSitemapXml = async (siteUrl: string, routes: string[]): Promise<string> => {
  const sitemap = new SitemapStream({ hostname: siteUrl });
  routes.forEach((route) => sitemap.write({ url: route }));
  sitemap.end();
  const xml = await streamToPromise(sitemap);
  return formatXml(xml.toString());
};

const buildRobotsTxt = (siteUrl: string, disallow: string[]): string => {
  const lines = ['User-agent: *', 'Allow: /'];
  disallow.forEach((route) => {
    lines.push(`Disallow: ${route}`);
  });
  lines.push(`Sitemap: ${siteUrl}/sitemap.xml`);
  return `${lines.join('\n')}\n`;
};

const buildLlmsTxt = (siteUrl: string, locales: readonly string[]): string => {
  const localeLinks = locales.map((locale) => `- ${siteUrl}/${locale}`);
  return [
    '# Agio',
    '',
    '## Summary',
    `Agio is a Notes and Memories app for iOS, Android and Web with AI-powered features.
    - Intelligent Notes and Memories
    - AI-powered Search
    - AI-powered Tags
    - AI-powered Categories
    - AI-powered Collections
    - AI-powered Sharing
    - AI-powered Collaboration
    `,
    '',
    '## Important URLs',
    `- ${siteUrl}/sitemap.xml`,
    ...localeLinks,
    '',
    '## Languages',
    locales.join(', ')
  ].join('\n');
};

export const siteFilesPlugin = ({ siteUrl }: SiteFilesOptions): Plugin => {
  let outDir = 'dist';
  let normalizedUrl = normalizeSiteUrl(siteUrl);

  return {
    name: 'agio-site-files',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir ?? 'dist';
      normalizedUrl = normalizeSiteUrl(siteUrl);
    },
    async closeBundle() {
      const localePaths = canonicalLocales.map((locale) => `/${locale}`);
      const disallowedPaths = canonicalLocales.map((locale) => `/${locale}/thank-you`);

      const [sitemapXml, robotsTxt, llmsTxt] = await Promise.all([
        buildSitemapXml(normalizedUrl, localePaths),
        Promise.resolve(buildRobotsTxt(normalizedUrl, disallowedPaths)),
        Promise.resolve(buildLlmsTxt(normalizedUrl, canonicalLocales))
      ]);

      const targetDir = path.resolve(process.cwd(), outDir);
      await fs.mkdir(targetDir, { recursive: true });
      await Promise.all([
        fs.writeFile(path.join(targetDir, 'sitemap.xml'), sitemapXml),
        fs.writeFile(path.join(targetDir, 'robots.txt'), robotsTxt),
        fs.writeFile(path.join(targetDir, 'llms.txt'), llmsTxt)
      ]);

      const indexPath = path.join(targetDir, 'index.html');
      const indexHtml = await fs.readFile(indexPath, 'utf8');
      const thankYouTargets = [
        path.join(targetDir, 'thank-you'),
        ...canonicalLocales.map((locale) => path.join(targetDir, locale, 'thank-you'))
      ];

      await Promise.all(
        thankYouTargets.map(async (dir) => {
          await fs.mkdir(dir, { recursive: true });
          await fs.writeFile(path.join(dir, 'index.html'), indexHtml);
        })
      );
    }
  };
};
