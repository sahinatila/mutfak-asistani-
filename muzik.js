// =====================================================================
//  MUTFAK ASİSTANI — ARKA PLAN MÜZİĞİ
//  80 parça: 20 piyano, 20 blues, 20 jazz (swing), 20 rock.
//  Hepsi Pixabay'den, Pixabay İçerik Lisansı ile (ticari kullanım serbest,
//  isim yazmak zorunlu değil). Dosyalar uygulamaya gömülü DEĞİL:
//  sadece müzik açılınca, sadece çalan şarkı Pixabay'den indirilir.
//  Satır biçimi: [tür, şarkı adı, müzisyen, süre (sn), dosya yolu]
// =====================================================================
var MUZIK_KOK = "https://cdn.pixabay.com/audio/";
var MUZIK_LISTESI = [
  ["piyano", "improvisation_246", "Tomomi Kato", 166, "2026/09/30/audio_6990866662.mp3"],
  ["piyano", "improvisation_245", "Tomomi Kato", 357, "2026/09/29/audio_a7373a2494.mp3"],
  ["piyano", "improvisation_243", "Tomomi Kato", 350, "2026/09/29/audio_e5b5582282.mp3"],
  ["piyano", "improvisation_242", "Tomomi Kato", 200, "2026/09/29/audio_53fc4f9a3c.mp3"],
  ["piyano", "improvisation_241", "Tomomi Kato", 229, "2026/09/29/audio_11dd8bf3b5.mp3"],
  ["piyano", "improvisation_244", "Tomomi Kato", 226, "2026/09/26/audio_71ec7f3e89.mp3"],
  ["piyano", "improvisation_238", "Tomomi Kato", 202, "2026/08/29/audio_cf54ceeff8.mp3"],
  ["piyano", "improvisation_235", "Tomomi Kato", 196, "2026/08/20/audio_4efd64fdd8.mp3"],
  ["piyano", "improvisation_234", "Tomomi Kato", 211, "2026/08/09/audio_08149a66b3.mp3"],
  ["piyano", "improvisation_232", "Tomomi Kato", 180, "2026/07/20/audio_9e9c11ae63.mp3"],
  ["piyano", "improvisation_231", "Tomomi Kato", 179, "2026/07/20/audio_c9e257abbb.mp3"],
  ["piyano", "improvisation_229", "Tomomi Kato", 214, "2026/07/20/audio_9a689c6160.mp3"],
  ["piyano", "improvisation_225", "Tomomi Kato", 205, "2026/07/15/audio_04a95a124d.mp3"],
  ["piyano", "improvisation_224", "Tomomi Kato", 270, "2026/07/08/audio_1f04739c5d.mp3"],
  ["piyano", "beautiful morning", "Tomomi Kato", 221, "2026/06/27/audio_de41eacf2d.mp3"],
  ["piyano", "improvisation_218", "Tomomi Kato", 251, "2026/06/27/audio_a7c9a7c6c4.mp3"],
  ["piyano", "improvisation_183", "Tomomi Kato", 340, "2026/02/06/audio_930a1bf189.mp3"],
  ["piyano", "Road Mirage", "Tomomi Kato", 259, "2021/10/10/audio_192b09a118.mp3"],
  ["piyano", "Piano improvisation", "freesound_community", 77, "2021/08/09/audio_6d12096172.mp3"],
  ["piyano", "Improvisation 2", "Júlia", 93, "2025/05/08/audio_942afe232c.mp3"],
  ["jazz", "Swing tangle", "Peter Roberts", 189, "2026/01/26/audio_622b8054c8.mp3"],
  ["jazz", "Once Upon Time in Varna", "ArtManzh", 151, "2025/04/21/audio_249035c559.mp3"],
  ["jazz", "Happy Gypsy Jazz", "BFCMUSIC", 124, "2024/10/18/audio_20ddc87a74.mp3"],
  ["jazz", "Gypsy Jazz", "BFCMUSIC", 120, "2024/10/03/audio_e1ac3cbab8.mp3"],
  ["jazz", "French Comedy Jazz Guitar", "Art Roseman", 114, "2026/08/06/audio_fe02e822a1.mp3"],
  ["jazz", "France Instrumental", "Sub_Clair", 131, "2026/11/07/audio_9b06443746.mp3"],
  ["jazz", "Creepy Trip", "ArtManzh", 136, "2025/04/21/audio_3db26bafdf.mp3"],
  ["jazz", "Giuseppes Dreams", "ArtManzh", 122, "2025/04/21/audio_72c6998a9c.mp3"],
  ["jazz", "Big Band Swinging", "Art Roseman", 135, "2026/10/02/audio_818292bd1b.mp3"],
  ["jazz", "Piano Swing", "Art Roseman", 138, "2026/09/28/audio_42de4aaba6.mp3"],
  ["jazz", "Funny Upbeat Jazz Trio", "Art Roseman", 154, "2026/09/13/audio_ec8ff31052.mp3"],
  ["jazz", "Fun Jazz Restaurant", "Art Roseman", 122, "2026/09/13/audio_8ffa5edecc.mp3"],
  ["jazz", "Big Band Swing Jazz", "Art Roseman", 130, "2026/09/13/audio_1ae7c540d8.mp3"],
  ["jazz", "French Comedy", "Art Roseman", 163, "2026/07/31/audio_3d8278f666.mp3"],
  ["jazz", "French Comedy Jazz", "Art Roseman", 125, "2026/08/03/audio_3b31de78f7.mp3"],
  ["jazz", "Funny Jazzy Guitar", "Art Roseman", 112, "2026/08/12/audio_af483db23f.mp3"],
  ["jazz", "Jazz Cooking Show", "Art Roseman", 148, "2026/07/29/audio_9d13df1f2a.mp3"],
  ["jazz", "Gypsy Swing", "Sergei Chetvertnykh", 129, "2022/02/15/audio_0a1306d34a.mp3"],
  ["jazz", "Jazz Background", "AtlasAudio", 123, "2026/10/16/audio_8ba035df82.mp3"],
  ["jazz", "Bring Back the Swing", "EvolvingVibes", 140, "2026/10/08/audio_ade58c5822.mp3"],
  ["blues", "Some Slow Blues", "Charles Shomo", 210, "2022/06/24/audio_6d6b9aaf91.mp3"],
  ["blues", "electric blues 65", "17132017", 149, "2023/10/23/audio_d748547917.mp3"],
  ["blues", "Blue G", "Eugene Ervine", 165, "2023/10/22/audio_dee78ec145.mp3"],
  ["blues", "Expressive Blues", "soundoffreedom", 178, "2026/09/19/audio_994772d0ee.mp3"],
  ["blues", "Slow Blues Guitar", "soundoffreedom", 181, "2026/09/19/audio_f40c960977.mp3"],
  ["blues", "Smooth Soul Blues", "soundoffreedom", 177, "2026/09/19/audio_7a42ab7afe.mp3"],
  ["blues", "Mellow Soul Blues", "soundoffreedom", 178, "2026/09/19/audio_fbfea28875.mp3"],
  ["blues", "Blues Time Again", "Charles Shomo", 111, "2022/05/16/audio_cdeced2d44.mp3"],
  ["blues", "Harmonica Blues Night", "Charles Shomo", 154, "2022/02/10/audio_815b88e36f.mp3"],
  ["blues", "Minor Blues Ballad", "SOUND_GARAGE", 161, "2025/08/27/audio_dbf6731d5e.mp3"],
  ["blues", "The Blues", "Eugene Ervine", 215, "2023/11/28/audio_ac2a57b949.mp3"],
  ["blues", "Mississippi Blues", "Roybushband", 136, "2023/08/31/audio_f3f8e270fe.mp3"],
  ["blues", "Whiskey Bar Blues", "Alexey Kazantsev", 111, "2026/08/23/audio_35e639ae5f.mp3"],
  ["blues", "Ghostman Blues", "Daniel Lawrence", 482, "2026/07/21/audio_0f693a56ce.mp3"],
  ["blues", "Blues Guitar", "Alec Koff", 101, "2026/02/19/audio_118f786f84.mp3"],
  ["blues", "Blues Ballad", "Alec Koff", 152, "2026/02/19/audio_e36c7bb28d.mp3"],
  ["blues", "Loose and Lazy Blues", "Shiden Beats Music", 55, "2022/05/01/audio_0e811edfd3.mp3"],
  ["blues", "Delta Blues", "Alexander Shwarzborg", 154, "2025/08/11/audio_03d8ebd493.mp3"],
  ["blues", "Boogie Shuffle", "Shiden Beats Music", 87, "2022/02/25/audio_a6057fbd3c.mp3"],
  ["blues", "Blues Soul", "MiroMaxMusic", 102, "2026/11/13/audio_67109f5816.mp3"],
  ["rock", "Blues Rock", "Jerome Chauvel", 142, "2024/02/29/audio_7b7dad40b1.mp3"],
  ["rock", "Cool Rock", "Emmraan", 100, "2024/09/26/audio_8d493764c2.mp3"],
  ["rock", "Funny Rock", "Emmraan", 77, "2024/11/14/audio_4a9744dc24.mp3"],
  ["rock", "Blues Rock II", "AlexGrohl", 122, "2025/12/12/audio_5f9d768e1e.mp3"],
  ["rock", "Old Steel", "AlexGrohl", 137, "2025/12/10/audio_fe721eb22d.mp3"],
  ["rock", "Blues Rock Drive", "VibeDepot", 129, "2026/01/27/audio_4f18914d3a.mp3"],
  ["rock", "Through The Pain", "Emmraan", 187, "2026/04/28/audio_d5228679cd.mp3"],
  ["rock", "Rebel Dance", "Emmraan", 96, "2025/12/27/audio_df775de16f.mp3"],
  ["rock", "Rampage", "Emmraan", 142, "2025/07/11/audio_e5fef5d45e.mp3"],
  ["rock", "Sunsets", "Emmraan", 144, "2025/03/12/audio_022e10ed0b.mp3"],
  ["rock", "Sky Walk", "Eugene Ervine", 163, "2026/02/04/audio_fef0974ca8.mp3"],
  ["rock", "Makin The Scene", "Eugene Ervine", 250, "2025/06/08/audio_08dc370947.mp3"],
  ["rock", "Rockin' Steady", "Eugene Ervine", 193, "2025/04/02/audio_cba7023f5b.mp3"],
  ["rock", "1969", "Eugene Ervine", 190, "2025/01/08/audio_262035e806.mp3"],
  ["rock", "Upbeat Rock", "Monume", 75, "2026/11/13/audio_ffa2de3114.mp3"],
  ["rock", "Upbeat Rock II", "JonasBlakewood", 130, "2026/09/28/audio_df4f537799.mp3"],
  ["rock", "Rock Drive", "Alex Kizenkov", 134, "2023/03/20/audio_989d0d179f.mp3"],
  ["rock", "Train Blues Rock", "Charles Shomo", 133, "2022/12/30/audio_75613ad5d1.mp3"],
  ["rock", "Country Rock With Slide", "Charles Shomo", 123, "2022/04/11/audio_44b5e1da5f.mp3"],
  ["rock", "Rock And Roll Blues", "Denys Kyshchuk", 186, "2026/06/21/audio_37c2da54cb.mp3"]
];

(function () {
  var TURLER = [
    { id: "hepsi",  ad: "Random",  simge: "🎲" },
    { id: "piyano", ad: "Piyano",  simge: "🎹" },
    { id: "blues",  ad: "Blues",   simge: "🎸" },
    { id: "jazz",   ad: "Jazz",    simge: "🎷" },
    { id: "rock",   ad: "Rock",    simge: "🤘" }
  ];
  function oku(k, v) { try { var x = localStorage.getItem(k); return x === null ? v : x; } catch (e) { return v; } }
  function yaz(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var ses = new Audio();
  ses.preload = "none";                 // açılmadan hiçbir şey indirilmez
  var tur = oku("ma_muzik_tur", "hepsi");
  if (!TURLER.some(function (t) { return t.id === tur; })) tur = "hepsi";
  ses.volume = Math.min(1, Math.max(0, parseFloat(oku("ma_muzik_ses", "0.6")) || 0.6));
  var sira = [], simdiki = -1, hataSayisi = 0, durum = "";

  function grup(t) {
    var l = [];
    MUZIK_LISTESI.forEach(function (m, i) { if (t === "hepsi" || m[0] === t) l.push(i); });
    return l;
  }
  function karistir(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }
  // Rastgele sıra; az önce çalanla başlamasın
  function siraKur() {
    sira = karistir(grup(tur));
    if (sira.length > 1 && sira[0] === simdiki) sira.push(sira.shift());
  }
  function sonraki() {
    if (!sira.length) siraKur();
    return sira.shift();
  }
  function cal(i) {
    simdiki = i;
    var m = MUZIK_LISTESI[i];
    ses.src = MUZIK_KOK + m[4];
    durum = "yukleniyor";
    var p = ses.play();
    if (p && p.catch) p.catch(function () { if (durum === "yukleniyor") durum = ""; ciz(); });
    medyaBilgisi();
    ciz();
  }
  function baslat() { if (simdiki < 0 || !ses.src) cal(sonraki()); else { var p = ses.play(); if (p && p.catch) p.catch(function () {}); } }
  function durdur() { ses.pause(); }
  function degistir(t) {
    tur = t; yaz("ma_muzik_tur", t);
    siraKur();
    cal(sonraki());
  }

  ses.addEventListener("playing", function () { durum = ""; hataSayisi = 0; ciz(); });
  ses.addEventListener("pause", ciz);
  ses.addEventListener("ended", function () { cal(sonraki()); });
  ses.addEventListener("error", function () {
    if (!ses.src) return;
    hataSayisi++;
    if (hataSayisi >= 3 || !navigator.onLine) { durum = "hata"; ses.pause(); ses.removeAttribute("src"); simdiki = -1; ciz(); return; }
    cal(sonraki());   // bu şarkı açılmadıysa sıradakine geç
  });

  // Telefonun kilit ekranında şarkı adı ve "sonraki" tuşu
  function medyaBilgisi() {
    if (!("mediaSession" in navigator) || simdiki < 0) return;
    var m = MUZIK_LISTESI[simdiki];
    try {
      navigator.mediaSession.metadata = new MediaMetadata({ title: m[1], artist: m[2], album: "Mutfak Asistanı" });
      navigator.mediaSession.setActionHandler("play", baslat);
      navigator.mediaSession.setActionHandler("pause", durdur);
      navigator.mediaSession.setActionHandler("nexttrack", function () { cal(sonraki()); });
    } catch (e) {}
  }

  function kacis(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function sure(sn) { return Math.floor(sn / 60) + ":" + ("0" + (sn % 60)).slice(-2); }

  function ciz() {
    var calBtn = document.getElementById("muzikCalBtn");
    var caliyor = !ses.paused && simdiki >= 0;
    if (calBtn) {
      calBtn.textContent = caliyor ? "⏸" : "▶";
      calBtn.title = caliyor ? "Müziği durdur" : "Müziği aç";
      calBtn.setAttribute("aria-label", calBtn.title);
      calBtn.classList.toggle("caliyor", caliyor);
    }
    var menuBtn = document.getElementById("muzikBtn");
    if (menuBtn) menuBtn.classList.toggle("caliyor", caliyor);
    var menu = document.getElementById("muzikMenu");
    if (!menu || !menu.classList.contains("acik")) return;
    var simdi;
    if (durum === "hata") simdi = '<div class="muzik-simdi hata">İnternet yok ya da müzik açılamadı. Bağlantı gelince ▶ ile tekrar dene.</div>';
    else if (simdiki >= 0) {
      var m = MUZIK_LISTESI[simdiki];
      simdi = '<div class="muzik-simdi"><span>' + (durum === "yukleniyor" ? "Yükleniyor…" : (caliyor ? "Şimdi çalıyor" : "Durdu")) + "</span><b>" + kacis(m[1]) + "</b><small>" + kacis(m[2]) + " · " + sure(m[3]) + "</small></div>";
    } else simdi = '<div class="muzik-simdi"><span>Müzik kapalı</span><small>Bir türe dokun ya da ▶ ile başlat. Ayar yapmazsan 80 şarkı karışık çalar.</small></div>';
    menu.innerHTML = "<b>🎵 Arka plan müziği</b>" + simdi +
      TURLER.map(function (t) {
        var n = grup(t.id).length;
        return '<div class="muzik-satir' + (t.id === tur ? " aktif" : "") + '">' +
          '<button class="muzik-tur" data-muzik-tur="' + t.id + '"><span>' + t.simge + "</span>" + t.ad + " <small>" + n + " şarkı</small></button>" +
          '<button class="muzik-degistir" data-muzik-degistir="' + t.id + '" title="' + t.ad + ': başka bir şarkı" aria-label="' + t.ad + ': başka bir şarkı">🔀</button></div>';
      }).join("") +
      '<label class="muzik-ses">🔈<input type="range" id="muzikSes" min="0" max="1" step="0.05" value="' + ses.volume + '" aria-label="Ses seviyesi">🔊</label>' +
      '<div class="muzik-not">Müzikler Pixabay\'den, sadece çalınca indirilir.</div>';
  }

  document.addEventListener("click", function (e) {
    var menu = document.getElementById("muzikMenu");
    if (!menu) return;
    if (e.target.closest("#muzikCalBtn")) { if (ses.paused || simdiki < 0) { durum = ""; hataSayisi = 0; baslat(); } else durdur(); return; }
    if (e.target.closest("#muzikBtn")) {
      menu.classList.toggle("acik");
      ["yaziMenu", "kullaniciMenu"].forEach(function (id) { var x = document.getElementById(id); if (x) x.classList.remove("acik"); });
      ciz(); return;
    }
    var d = e.target.closest("[data-muzik-degistir]");
    if (d) { hataSayisi = 0; degistir(d.dataset.muzikDegistir); return; }
    var t = e.target.closest("[data-muzik-tur]");
    if (t) {
      hataSayisi = 0;
      if (t.dataset.muzikTur !== tur || simdiki < 0) degistir(t.dataset.muzikTur);
      else if (ses.paused) baslat();
      return;
    }
    if (!e.target.closest("#muzikMenu")) menu.classList.remove("acik");
  });
  document.addEventListener("input", function (e) {
    if (e.target.id === "muzikSes") { ses.volume = parseFloat(e.target.value); yaz("ma_muzik_ses", String(ses.volume)); }
  });
  ciz();
})();
