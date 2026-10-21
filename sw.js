/* Closette service worker: 通知の表示とタップ時の動作用(オフラインキャッシュはしません) */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });

/* サーバーから Web Push が届いたとき(将来サーバーを用意した場合用) */
self.addEventListener('push', function(e){
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Closette', {
    body: d.body || '', tag: d.tag || 'closette-push', data: { url: d.url || self.registration.scope }
  }));
});

/* 通知をタップしたら、開いているアプリを前面に出す(なければ開く) */
self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || self.registration.scope;
  e.waitUntil(self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(list){
    for (var i = 0; i < list.length; i++) { if ('focus' in list[i]) return list[i].focus(); }
    return self.clients.openWindow ? self.clients.openWindow(url) : null;
  }));
});
