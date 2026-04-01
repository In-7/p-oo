// src/scripts/lazy-load.ts
interface LazyLoadOptions {
  rootMargin?: string;
  threshold?: number;
}

// 1. 图片懒加载
export function initLazyLoading(options: LazyLoadOptions = {}): void {
  if (!('IntersectionObserver' in window)) return;

  const { rootMargin = '200px', threshold = 0 } = options;

  const lazyObserver = new IntersectionObserver((entries) => {
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

      lazyObserver.unobserve(img); // 及时释放资源
    });
  }, { rootMargin, threshold });

  document.querySelectorAll<HTMLImageElement>('[data-src]').forEach(img => {
    lazyObserver.observe(img);
  });
}

// 2. Service Worker 注册
export function registerServiceWorker(): void {
  // ✅ 优化：结合构建变量与 hostname 判断，更健壮
  const isDev = import.meta.env.DEV || 
                window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1';
  if (isDev) return;
  
  if ('serviceWorker' in navigator) {
    // ✅ 优化：在 load 事件后注册，避免抢占首屏资源
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((error: Error) => {
        console.error('Service Worker 注册失败:', error);
      });
    });
  }
}

// 3. 性能监控
export function initPerformanceMonitoring(): void {
  if (!('PerformanceObserver' in window)) return;

  // 监控 LCP (Largest Contentful Paint)
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      // ✅ 修复：获取最后一个条目，并断言为 LargestContentfulPaint 类型
      const lastEntry = entries[entries.length - 1] as LargestContentfulPaint;
      
      // 现在可以安全访问 renderTime 和 loadTime 了
      const lcpTime = lastEntry.renderTime || lastEntry.loadTime;
      
      console.log(`[性能 LCP] ${lcpTime}ms`, lastEntry.element);
    });
    
    // 注意： buffered: true 可以获取页面加载过程中已经发生的 LCP 记录
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.warn('当前浏览器不支持 LCP 监控');
  }
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
