// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'panda-coding-express';

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  // Respond to the event by opening the cache using the name we gave
  // above (CACHE_NAME)
  event.respondWith(caches.open(CACHE_NAME).then( (cache) => {
    // If the request is in the cache, return with the cached version.
    // Otherwise fetch the resource, add it to the cache, and return
    // network response.
    return cache.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());
        return fetchedResponse;
      })
    })  
  }));
});