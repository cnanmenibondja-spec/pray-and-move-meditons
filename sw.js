/* Ancienne adresse : l’app a déménagé. Ce service worker remplace l’ancien,
   efface l’ancienne app de l’appareil et affiche la page de déménagement. */
const CACHE = 'pamg-med-moved';
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './index.html', './icons/icon-192.png'])).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('pamg-med-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate') { e.respondWith(fetch(e.request).catch(() => caches.match('./index.html'))); return; }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
