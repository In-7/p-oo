// src/scripts/lazy-load.ts
// 图片懒加载功能 - TypeScript 静态网站终极版
interface LazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
}

// 1. 图片懒加载
export function initLazyLoading(options: LazyLoadOptions = {}): void {
  if (!('IntersectionObserver' in window)) return;

  const { rootMargin = '200px', threshold = 0 } = options;

  const lazyObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const img = entry.target;
      if (!(img instanceof HTMLImageElement)) return;

      const lazySrc = img.dataset.src;
      if (lazySrc) {
        img.src = lazySrc;
        delete img.dataset.src;
        img.classList.add('lazy-loaded');
      }

      lazyObserver.unobserve(img);
    });
  }, { rootMargin, threshold });

  document.querySelectorAll<HTMLImageElement>('[data-src]').forEach(img => {
    lazyObserver.observe(img);
  });
}

// 2. Service Worker 注册（✅ 修复：静态网站原生环境判断，无env报错）
export function registerServiceWorker(): void {
  // 原生 JS 判断：本地开发环境（localhost/127.0.0.1）则跳过注册
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isDev) return;
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch((error: Error) => {
      console.error('Service Worker 注册失败:', error);
    });
  }
}

// 性能监控接口
interface PerformanceMetrics {
  navigation: PerformanceNavigationTiming | null;
  paint: PerformancePaintTiming | null;
  largestContentfulPaint: PerformanceEntry | null;
}

// 3. 性能监控
export function initPerformanceMonitoring(): void {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list: PerformanceObserverEntryList) => {
    for (const entry of list.getEntries()) {
      console.log(`[性能] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
    }
  });

  observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
}

// 4. 错误监控
export function initErrorMonitoring(): void {
  window.addEventListener('error', (event: ErrorEvent) => {
    console.error('❌ 页面错误:', event.error);
  });

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    console.error('❌ 未处理 Promise:', event.reason);
  });
}

// 5. 初始化所有功能
export function initAll(): void {
  initLazyLoading();
  registerServiceWorker();
  initPerformanceMonitoring();
  initErrorMonitoring();
}