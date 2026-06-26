const CACHE_NAME = 'bday-diary-v4';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './images.jpeg',
  './dds.jpeg',
  './ff.jpeg',
  './gettyimages-173240099-612x612.jpg',
  './imafes.jpeg',
  './white-persian-cat-being-angry-260nw-388782298.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
