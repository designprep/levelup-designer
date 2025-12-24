// 캐시 이름
const CACHE_NAME = 'levelup-designer-v1';

// 캐싱할 파일 목록
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 설치 시 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 요청 시 캐시에서 반환
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
