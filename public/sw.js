const CACHE_NAME = 'pokemon-ttrpg-v3';
const APP_SHELL = ['/manifest.json', '/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const shellResponse = await fetch('/');
    if (!shellResponse.ok) throw new Error('Unable to cache the app shell');
    const html = await shellResponse.clone().text();
    await cache.put('/', shellResponse);

    // Pre-cache the Next.js scripts and styles referenced by the first page,
    // so the installed app has the code it needs when opened offline.
    const assetPaths = Array.from(
      html.matchAll(/(?:src|href)=["']([^"']*\/_next\/static\/[^"']+)["']/g),
      (match) => new URL(match[1], self.location.origin).toString()
    );
    await cache.addAll([...APP_SHELL, ...assetPaths]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith('pokemon-ttrpg-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          }
          return response;
        })
        .catch(async () => (await caches.match('/')) || Response.error())
    );
    return;
  }

  if (url.pathname.startsWith('/_next/static/') || url.pathname === '/manifest.json' || url.pathname === '/icon.svg') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        });
      })
    );
  }
});
