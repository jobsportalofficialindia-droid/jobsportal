// -------------------- Constants --------------------
const CACHE_NAME = "jobsportal-v2"; // Increment when deploying updates
const MAX_DYNAMIC_PAGES = 50; // Max runtime cached pages

// Pre-cache important static assets
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/news/",
  "/about/",
  "/site.webmanifest",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/styles.css",
  "/main.js", // add other essential CSS/JS files
];

// -------------------- Install --------------------
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// -------------------- Activate --------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
  self.clients.claim();
});

// -------------------- Fetch --------------------
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== "GET") return;

  // HTML pages: network-first
  if (request.destination === "document") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Update cache dynamically
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, networkResponse.clone());
            limitCacheSize(CACHE_NAME, MAX_DYNAMIC_PAGES);
          });
          return networkResponse;
        })
        .catch(() => caches.match(request) || caches.match("/index.html"))
    );
    return;
  }

  // Static assets (CSS, JS, images): cache-first
  if (["style", "script", "image"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((networkResponse) => {
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, networkResponse.clone()));
            return networkResponse;
          })
        );
      })
    );
    return;
  }

  // Other requests: default fetch
  event.respondWith(fetch(request));
});

// -------------------- Cache size limiter --------------------
async function limitCacheSize(name, maxItems) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    limitCacheSize(name, maxItems);
  }
}
