import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { siteFilesPlugin } from './vite/plugins/siteFiles';

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, '.', '');
    const siteUrl = env.SITE_URL?.trim();

    if (command === 'build' && !siteUrl) {
      throw new Error('Missing SITE_URL. Set SITE_URL to generate sitemap.xml, robots.txt, and llms.txt.');
    }

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        svgr(),
        command === 'build' && siteUrl ? siteFilesPlugin({ siteUrl }) : null
      ].filter((plugin): plugin is NonNullable<typeof plugin> => Boolean(plugin)),
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
