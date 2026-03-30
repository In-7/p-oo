#!/usr/bin/env node

/**
 * Pagefind 构建脚本
 * 在 Astro 构建完成后运行，生成搜索索引
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, 'dist');

console.log('🔍 开始构建 Pagefind 搜索索引...');

try {
  // 检查 dist 目录是否存在
  if (!existsSync(distPath)) {
    console.error('❌ 错误: dist 目录不存在，请先运行 npm run build');
    process.exit(1);
  }

  // 尝试使用 npx 运行 pagefind
  console.log('📦 使用 npx pagefind...');
  
  try {
    execSync('npx pagefind --site dist', {
      stdio: 'inherit',
      cwd: __dirname
    });
    console.log('✅ Pagefind 索引构建完成！');
  } catch (npxError) {
    console.log('⚠️ npx 运行失败，尝试使用 pnpx...');
    
    try {
      execSync('pnpx pagefind --site dist', {
        stdio: 'inherit',
        cwd: __dirname
      });
      console.log('✅ Pagefind 索引构建完成！');
    } catch (pnpxError) {
      console.log('⚠️ pnpx 也失败了，请手动安装 pagefind:');
      console.log('   npm install pagefind --save-dev');
      console.log('   或');
      console.log('   pnpm add pagefind --save-dev');
      console.log('');
      console.log('📋 手动构建命令:');
      console.log('   npx pagefind --site dist');
      process.exit(1);
    }
  }
} catch (error) {
  console.error('❌ Pagefind 构建失败:', error.message);
  process.exit(1);
}