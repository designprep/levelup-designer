// 캐시 이름 (이건 그냥 형식상 둠)
const CACHE_NAME = 'levelup-designer-nocache';

// 설치 단계: 그냥 통과
self.addEventListener('install', event => {
    self.skipWaiting(); // 대기 없이 바로 작동
});

// 활성화 단계: 기존 캐시 싹 지워버림 (중요!)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// 데이터 요청 단계: 캐시 안 보고 무조건 인터넷에서 새로 가져옴 (Network Only)
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                // 인터넷 끊겼을 때만 캐시 확인 (혹시 모르니)
                return caches.match(event.request);
            })
    );
});
