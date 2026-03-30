import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
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
  site: 'https://yourdomain.com', // 替换为您的域名
  trailingSlash: 'ignore',

  // 集成优化
  integrations: [
    // 可以添加更多性能优化集成
  ],
});