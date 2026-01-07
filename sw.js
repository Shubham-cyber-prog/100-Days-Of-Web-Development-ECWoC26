/* PWA service worker for 100 Days of Web */

const VERSION = 'v1';
const CORE_CACHE = `core-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;

const CORE_ASSETS = [
  'index.html',

  'website/style.css',
  'website/theme.js',
  'website/script.js',
  'website/tracker.js',

  'website/projects.html',
  'website/about.html',
  'website/contributors.html',
  'website/contact.html',
  'website/login.html',
  'website/contribute.html',

  'website/showcase.json',
  'website/community.json',

  'manifest.webmanifest',
  'pwa-icon.svg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CORE_CACHE).then((cache) =>
      cache.addAll(CORE_ASSETS.map((url) => new Request(url, { cache: 'reload' })))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith('core-') || key.startsWith('runtime-'))
          .filter((key) => key !== CORE_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

function isHtmlNavigationRequest(request) {
  if (request.mode === 'navigate') return true;
  const accept = request.headers.get('accept') || '';
  return accept.includes('text/html');
}

function shouldCacheStaticAsset(pathname) {
  if (pathname === '/manifest.webmanifest' || pathname === '/pwa-icon.svg') return true;
  if (pathname === '/' || pathname === '/index.html') return true;
  return pathname.startsWith('/website/');
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const scopePath = new URL(self.registration.scope).pathname;
  const normalizedPathname = url.pathname.startsWith(scopePath)
    ? url.pathname.slice(scopePath.length - 1)
    : url.pathname;

  // HTML: network-first, cache for offline access later.
  if (isHtmlNavigationRequest(request)) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, response.clone());
          return response;
        } catch {
          const cached = await caches.match(request);
          if (cached) return cached;

          const cachedHome = await caches.match(new URL('index.html', self.registration.scope).toString());
          if (cachedHome) return cachedHome;

          return new Response('Offline: content not available yet.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
        }
      })()
    );
    return;
  }

  // Assets: cache-first for known core/static paths.
  if (shouldCacheStaticAsset(normalizedPathname)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(request);
        if (cached) return cached;

        try {
          const response = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, response.clone());
          return response;
        } catch {
          return new Response('', { status: 504 });
        }
      })()
    );
  }
});
