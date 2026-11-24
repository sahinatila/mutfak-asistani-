// =====================================================================
//  MUTFAK ASİSTANI — SERVICE WORKER (çevrimdışı çalışma)
//  Uygulamanın dosyalarını telefona kaydeder; internet yokken de açılır.
//  Dosyaları güncellediğinde aşağıdaki SURUM numarasını 1 artır
//  (ör. "v1" → "v2"), yoksa telefonlar eski hali göstermeye devam eder.
// =====================================================================
var SURUM = "mutfak-v79";
var DOSYALAR = [
  "./",
  "./index.html",
  "./gizlilik.html",
  "./anlama.js",
  "./tarifler.js",
  "./kategoriler.js",
  "./simgeler.js",
  "./besin.js",
  "./manifest.json",
  "./ikonlar/icon-192.png",
  "./ikonlar/icon-512.png",
  "./ikonlar/icon-maskable-512.png",
  "./ikonlar/apple-touch-icon.png"
];

// Kurulum: dosyaları kaydet
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(SURUM).then(function (c) { return c.addAll(DOSYALAR); }));
  self.skipWaiting();
});

// Yeni sürüm gelince eski kayıtları sil
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (adlar) {
      return Promise.all(adlar.filter(function (a) { return a !== SURUM; })
                              .map(function (a) { return caches.delete(a); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// İstekler: önce internetten dene (güncel kalsın), internet yoksa kayıtlı olanı ver
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return; // WhatsApp vb. dış linklere karışma
  e.respondWith(
    fetch(e.request).then(function (cevap) {
      var kopya = cevap.clone();
      caches.open(SURUM).then(function (c) { c.put(e.request, kopya); });
      return cevap;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (k) {
        return k || caches.match("./index.html");
      });
    })
  );
});
