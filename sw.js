// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'panda-coding-express';
const html = [
  '/source/html/calendar.html',
  '/source/html/dev-journal.html',
  '/source/html/index.html',
  '/source/html/task-list.html',
];
const js = [
  '/source/js/calendar.js',
  '/source/js/dev-journal.js',
  '/source/js/sentiment-widget.js',
  '/source/js/task-list.js',

];
const css = [
  '/source/css/calendar.css',
  '/source/css/dev-journal.css',
  '/source/css/home-page.css',
  '/source/css/calendar.css',
  '/source/css/Montserrat-Italic-VariableFont_wght.ttf',
  '/source/css/task-list.css',
];
const img = [];

const allFiles = html.concat(js, css, img);

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // B6. TODO - Add all of the URLs from RECIPE_URLs here so that they are
      //            added to the cache when the ServiceWorker is installed
      return cache.addAll(allFiles);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  // We added some known URLs to the cache above, but tracking down every
  // subsequent network request URL and adding it manually would be very taxing.
  // We will be adding all of the resources not specified in the intiial cache
  // list to the cache as they come in.
  /*******************************/
  // This article from Google will help with this portion. Before asking ANY
  // questions about this section, read this article.
  // NOTE: In the article's code REPLACE fetch(event.request.url) with
  //       fetch(event.request)
  // https://developer.chrome.com/docs/workbox/caching-strategies-overview/
  /*******************************/
  // B7. TODO - Respond to the event by opening the cache using the name we gave
  //            above (CACHE_NAME)
  event.respondWith(caches.open(CACHE_NAME).then( (cache) => {
    // B8. TODO - If the request is in the cache, return with the cached version.
    //            Otherwise fetch the resource, add it to the cache, and return
    //            network response.
    return cache.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).then((fetchedResponse) => {
        cache.put(event.request, fetchedResponse.clone());
        return fetchedResponse;
      })
    })  
  }));
});