// ============================================
// Service Worker for Crop Disease Detection
// Provides offline functionality
// ============================================

const CACHE_NAME = 'crop-disease-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/translations.js',
    'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .catch(err => console.log('Cache failed:', err))
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(networkResponse => {
                        // Cache new requests
                        if (networkResponse && networkResponse.status === 200) {
                            const clone = networkResponse.clone();
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, clone);
                            });
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Return offline fallback for HTML requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Background sync for offline analysis
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-analysis') {
        event.waitUntil(syncPendingAnalysis());
    }
});

async function syncPendingAnalysis() {
    // Sync any pending analysis when back online
    const pending = await getPendingAnalysis();
    for (const item of pending) {
        try {
            await processAnalysis(item);
            await removePendingAnalysis(item.id);
        } catch (err) {
            console.log('Failed to sync analysis:', err);
        }
    }
}

// Helper functions for IndexedDB
function getPendingAnalysis() {
    return new Promise((resolve) => {
        // Implementation would use IndexedDB
        resolve([]);
    });
}

function removePendingAnalysis(id) {
    return new Promise((resolve) => {
        // Implementation would use IndexedDB
        resolve();
    });
}

function processAnalysis(item) {
    return new Promise((resolve, reject) => {
        // Process the analysis
        resolve();
    });
}
