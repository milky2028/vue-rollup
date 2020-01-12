/// <reference lib="webworker" />

import version from './version';
import resources from './resource-list';
console.log('registered');

// eslint-disable-next-line
declare var self: ServiceWorkerGlobalScope;

const staticCache = `static-${version}`;
self.addEventListener('install', (installEvent) => {
  installEvent.waitUntil(
    (async () => {
      // Cache an essential group of items on load
      const cache = await caches.open(staticCache);
      return cache.addAll(resources);
    })()
  );
});

self.addEventListener('activate', (activationEvent) => {
  activationEvent.waitUntil(
    (async () => {
      // Delete old caches when a new service worker is activated
      const cachesToDelete = (await self.caches.keys())
        .filter((c) => c !== staticCache)
        .map((cache) => self.caches.delete(cache));

      return Promise.all(cachesToDelete);
    })()
  );
});

self.addEventListener('fetch', (fetchEvent) => {
  if (fetchEvent.request.method !== 'GET') {
    return;
  } else {
    fetchEvent.respondWith(
      (async () => {
        const cache = await self.caches.open(staticCache);
        const cachedResponse = await cache.match(fetchEvent.request, {
          ignoreSearch: true,
          ignoreVary: true
        });

        if (cachedResponse) {
          // If the response exists in the cache, serve it.
          return cachedResponse;
        } else {
          // Else, fetch all other requests and put them in the cache after they've been fetched.
          const response = await fetch(fetchEvent.request);
          cache.put(fetchEvent.request, response.clone());
          return response;
        }
      })()
    );
  }
});
