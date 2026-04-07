import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  // Markdown 配置 - 外部链接新窗口打开
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
    ],
  },

  // 压缩和优化
  compressHTML: true,

  // 构建输出优化
  build: {
    // 启用现代浏览器优化
    format: 'file',
    // 资源优化
    assets: 'assets',
    // 内联小资源
    inlineStylesheets: 'auto',
  },

  // 图片优化
  image: {
    // 启用图片优化
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // SEO优化
  site: 'https://mped.netlify.app/',
  trailingSlash: 'ignore',

  // 集成
  integrations: [sitemap(), pagefind({
    }),
    (await import('@playform/compress')).default()],
});