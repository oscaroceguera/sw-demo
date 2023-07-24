const cachedName = "version2";
const cachedAssets = [
  "index.html",
  "about.html",
  "./js/main.js",
  "./css/index.css",
];

// Step - Install Service Worker
self.addEventListener("install", (e) => {
  console.log("service worker installed");
  // cache files
  e.waitUntil(
    caches
      .open(cachedName)
      .then((cache) => {
        console.log("caching files");
        cache.addAll(cachedAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Step - Activate Service Worker
self.addEventListener("active", (e) => {
  console.log("Service worker Actived");
  // step - Keeep cache ligth
  e.waitUntil(
    caches.keys().then((cachedNames) => {
      return Promise.all(
        cachedNames.map((cache) => {
          if (cache !== cachedName) {
            console.log("Cached Service worker is being cleared");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Step - Persisting cached assets
self.addEventListener("fetch", (e) => {
  console.log("fetching service worker");
  e.respondWith(
    fetch(e.request).catch(() => {
      caches.match(e.request);
    })
  );
});
