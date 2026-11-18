// =====================================================================
//  MUTFAK ASİSTANI — ÜRÜN KATEGORİLERİ (market reyonları gibi)
//  Her ürünü bir reyona koyar, adını büyük harfle başlatır ve alfabetik dizer.
//  Yeni ürün eklemek için ilgili reyonun listesine küçük harfle yazman yeterli.
//  Not: Bu dosya anlama.js'den SONRA yüklenmeli (normalIsim'i kullanır).
// =====================================================================

var YIYECEK_REYONLARI = [
  { ad: "Sebze", ikon: "🥕", urunler: ["domates", "salatalık", "hıyar", "biber", "sivri biber", "dolmalık biber", "kapya", "çarliston", "patlıcan", "kabak",
    "patates", "soğan", "kuru soğan", "taze soğan", "yeşil soğan", "sarımsak", "havuç", "marul", "kıvırcık", "roka", "maydanoz", "dereotu", "nane", "tere",
    "ıspanak", "pırasa", "lahana", "karnabahar", "brokoli", "kereviz", "turp", "pancar", "fasulye", "taze fasulye", "bezelye", "bamya", "enginar",
    "semizotu", "mantar", "mısır", "bakla", "börülce", "zencefil", "limon", "pazı", "menemenlik sos"] },
  { ad: "Meyve", ikon: "🍎", urunler: ["elma", "armut", "muz", "portakal", "mandalina", "greyfurt", "üzüm", "çilek", "kiraz", "vişne", "şeftali", "kayısı",
    "erik", "karpuz", "kavun", "nar", "incir", "ayva", "kivi", "ananas", "avokado", "böğürtlen", "dut", "trabzon hurması", "mango", "yaban mersini"] },
  { ad: "Et, Tavuk & Balık", ikon: "🍗", urunler: ["et", "kırmızı et", "dana eti", "kuzu eti", "kurban eti", "kıyma", "kuşbaşı", "biftek", "antrikot", "pirzola",
    "kavurma", "ciğer", "incik", "kemik", "tavuk", "piliç", "tavuk göğsü", "tavuk but", "tavuk incik", "baget", "kanat", "hindi", "köfte",
    "balık", "hamsi", "levrek", "çipura", "somon", "palamut", "sardalya", "uskumru", "karides", "kalamar", "midye", "ahtapot"] },
  { ad: "Şarküteri", ikon: "🥓", urunler: ["sucuk", "salam", "sosis", "pastırma", "jambon", "füme et", "kavurma konservesi"] },
  { ad: "Süt Ürünleri", ikon: "🧀", urunler: ["süt", "yoğurt", "süzme yoğurt", "kefir", "krema", "kaymak", "tereyağı", "tereyağ", "margarin",
    "peynir", "beyaz peynir", "kaşar", "kaşar peyniri", "lor", "tulum", "süzme peynir", "labne", "krem peynir", "çökelek", "hellim", "mozzarella", "parmesan", "dil peyniri"] },
  { ad: "Kahvaltılık", ikon: "🍳", urunler: ["yumurta", "zeytin", "siyah zeytin", "yeşil zeytin", "bal", "reçel", "tahin", "pekmez", "tahin pekmez", "helva",
    "fındık ezmesi", "fıstık ezmesi", "çikolata kreması", "kaymak", "menemen"] },
  { ad: "Ekmek & Unlu Mamul", ikon: "🥖", urunler: ["ekmek", "simit", "gevrek", "pide", "bazlama", "lavaş", "tortilla", "galeta", "poğaça", "tost ekmeği", "yufka", "milföy"] },
  { ad: "Bakliyat & Tahıl", ikon: "🌾", urunler: ["pirinç", "bulgur", "mercimek", "kırmızı mercimek", "yeşil mercimek", "nohut", "kuru fasulye", "barbunya",
    "un", "irmik", "yulaf", "mısır unu", "pirinç unu", "galeta unu", "kinoa", "chia", "susam", "çörek otu"] },
  { ad: "Makarna & Hamur", ikon: "🍝", urunler: ["makarna", "spagetti", "erişte", "şehriye", "mantı", "hıngel", "lazanya", "noodle", "tel şehriye", "arpa şehriye"] },
  { ad: "Yağlar", ikon: "🫒", urunler: ["yağ", "sıvı yağ", "ayçiçek yağı", "zeytinyağı", "mısır yağı", "fındık yağı", "kızartma yağı"] },
  { ad: "Soslar & Salçalar", ikon: "🥫", urunler: ["salça", "domates salçası", "biber salçası", "nar ekşisi", "ketçap", "mayonez", "hardal", "sirke", "elma sirkesi",
    "üzüm sirkesi", "soya sosu", "acı sos", "barbekü sos", "limon sosu", "tavuk suyu", "et suyu", "bulyon", "domates sosu", "pesto"] },
  { ad: "Baharatlar", ikon: "🧂", urunler: ["tuz", "karabiber", "pul biber", "toz biber", "isot", "isot biber", "kimyon", "kekik", "kuru nane", "tarçın",
    "zerdeçal", "sumak", "köri", "yenibahar", "karanfil", "defne", "biberiye", "fesleğen", "muskat", "zencefil tozu", "limon tuzu", "köfte baharatı"] },
  { ad: "Konserve & Turşu", ikon: "🫙", urunler: ["konserve", "ton balığı", "turşu", "közlenmiş biber", "mısır konservesi", "bezelye konservesi", "nohut konservesi",
    "fasulye konservesi", "domates konservesi", "kapari", "zeytin ezmesi"] },
  { ad: "Şeker & Pastacılık", ikon: "🍰", urunler: ["şeker", "toz şeker", "pudra şekeri", "esmer şeker", "kakao", "vanilya", "vanilin", "kabartma tozu",
    "karbonat", "maya", "kuru maya", "yaş maya", "nişasta", "mısır nişastası", "jelatin", "bitter çikolata", "damla çikolata", "hindistan cevizi", "krem şanti"] },
  { ad: "Atıştırmalık & Kuruyemiş", ikon: "🍿", urunler: ["ceviz", "fındık", "badem", "fıstık", "yer fıstığı", "antep fıstığı", "kaju", "çekirdek", "çiğdem",
    "ayçekirdeği", "kabak çekirdeği", "leblebi", "kuru üzüm", "kuru kayısı", "kuru incir", "hurma", "cips", "kraker", "mısır cipsi", "bisküvi", "çikolata", "gofret", "patlamış mısır", "lokum"] },
  { ad: "İçecekler", ikon: "🥤", urunler: ["su", "damacana su", "maden suyu", "soda", "meyve suyu", "portakal suyu", "kola", "gazoz", "çay", "kahve", "türk kahvesi",
    "hazır kahve", "bitki çayı", "ıhlamur", "salep", "boza", "şalgam", "fanta", "sprite", "pepsi", "ice tea", "soğuk çay", "limonata",
    "enerji içeceği", "mineralli su", "vişne suyu", "şeftali suyu", "kayısı suyu", "karışık meyve suyu", "ayran", "sıcak çikolata", "nescafe"] },
  { ad: "Dondurulmuş", ikon: "🧊", urunler: ["dondurma", "dondurulmuş", "donuk", "buz", "patates kızartması", "nugget", "pizza"] }
];

var EKIPMAN_REYONLARI = [
  { ad: "Pişirme Aletleri", ikon: "🔥", urunler: ["fırın", "ocak", "airfryer", "mikrodalga", "tost makinesi", "waffle makinesi", "ızgara", "mangal", "semaver", "çaydanlık", "çay makinesi", "kahve makinesi", "su ısıtıcısı", "kettle", "fritöz"] },
  { ad: "Tencere & Tava", ikon: "🍲", urunler: ["tencere", "tava", "düdüklü", "düdüklü tencere", "wok", "cezve", "güveç", "sahan", "kazan", "kızartma tavası", "krep tavası"] },
  { ad: "Fırın Kapları", ikon: "🥧", urunler: ["tepsi", "fırın tepsisi", "borcam", "kek kalıbı", "muffin kalıbı", "tart kalıbı", "pizza taşı", "fırın kabı", "kalıp"] },
  { ad: "Elektrikli Aletler", ikon: "🔌", urunler: ["mikser", "el mikseri", "blender", "el blenderı", "mutfak robotu", "rondo", "doğrayıcı", "meyve sıkacağı", "katı meyve sıkacağı", "tartı", "mutfak tartısı"] },
  { ad: "El Aletleri", ikon: "🥄", urunler: ["kaşık", "tahta kaşık", "silikon kaşık", "kepçe", "spatula", "çırpma teli", "rende", "bıçak", "kesme tahtası", "oklava",
    "süzgeç", "kevgir", "maşa", "soyacak", "havan", "huni", "ölçü kabı", "makas", "açacak", "konserve açacağı", "sarımsak ezici"] }
];

// MARKALAR: marka adı → asıl ürün. Böylece "nutella" Kahvaltılık'a, "fairy" Temizlik'e değil gerçek yerine gider,
// tariflerde de "çikolata kreması" yerine sayılır. Yeni marka eklemek için: "marka": "ürün"
var MARKALAR = {
  "nutella": "çikolata kreması", "çokokrem": "çikolata kreması", "nocciolata": "çikolata kreması", "sarelle": "çikolata kreması",
  "cokokrem": "çikolata kreması", "nutela": "çikolata kreması", "çokonat": "çikolata kreması",
  "coca cola": "kola", "coca-cola": "kola", "cocacola": "kola", "pepsi": "kola", "cola turka": "kola", "kola turka": "kola",
  "fanta": "gazoz", "sprite": "gazoz", "yedigün": "gazoz", "uludağ gazoz": "gazoz", "çamlıca": "gazoz", "schweppes": "soda",
  "beypazarı": "maden suyu", "kızılay": "maden suyu", "sırma": "su", "erikli": "su", "hayat su": "su", "pınar su": "su", "saka": "su",
  "lipton": "çay", "doğuş": "çay", "çaykur": "çay", "rize çayı": "çay", "filiz": "makarna", "nuh'un ankara": "makarna",
  "nescafe": "hazır kahve", "nescafé": "hazır kahve", "jacobs": "kahve", "kurukahveci mehmet efendi": "türk kahvesi", "mehmet efendi": "türk kahvesi",
  "cappy": "meyve suyu", "dimes": "meyve suyu", "meysu": "meyve suyu", "tamek": "meyve suyu", "fuse tea": "ice tea", "lipton ice tea": "ice tea",
  "red bull": "enerji içeceği", "redbull": "enerji içeceği", "monster": "enerji içeceği",
  "sütaş": "süt", "pınar süt": "süt", "içim": "süt", "torku süt": "süt", "danone": "yoğurt", "activia": "yoğurt",
  "philadelphia": "krem peynir", "kiri": "krem peynir", "labneh": "labne",
  "ülker çikolata": "çikolata", "milka": "çikolata", "toblerone": "çikolata", "kinder": "çikolata", "snickers": "çikolata",
  "eti tutku": "bisküvi", "pötibör": "bisküvi", "petibör": "bisküvi", "biskrem": "bisküvi", "albeni": "çikolata", "çikolatalı gofret": "gofret",
  "lays": "cips", "doritos": "cips", "ruffles": "cips", "pringles": "cips", "cheetos": "cips",
  "knorr": "bulyon", "maggi": "bulyon", "tat salça": "salça", "tukaş": "salça", "heinz": "ketçap", "calvé": "mayonez", "calve": "mayonez",
  "dr. oetker": "kabartma tozu", "pakmaya": "maya", "kemal kükrer": "kabartma tozu",
  "becel": "margarin", "rama": "margarin", "komili": "zeytinyağı", "yudum": "ayçiçek yağı", "orkide": "ayçiçek yağı",
  "superfresh": "dondurulmuş", "algida": "dondurma", "magnum": "dondurma", "carte d'or": "dondurma", "maraş dondurma": "dondurma",
  "nutri bebe": "mama", "aptamil": "mama", "bebelac": "mama"
};
var _MARKA = {};
Object.keys(MARKALAR).forEach(function (k) { _MARKA[normalIsim(k)] = MARKALAR[k]; });
// "2 kavanoz nutella" → "çikolata kreması"; "ülker çikolata" gibi uzun markalar önce denenir
function markaCoz(ad) {
  var n = normalIsim(ad);
  if (_MARKA[n]) return _MARKA[n];
  var en = null;
  Object.keys(_MARKA).forEach(function (k) {
    if ((" " + n + " ").indexOf(" " + k + " ") >= 0 && (!en || k.length > en.length)) en = k;
  });
  return en ? _MARKA[en] : ad;
}
// Tariflerle eşleşmede de markanın asıl ürün sayılması için anlama motorunun eş anlam tablosuna ekle
if (typeof _ES !== "undefined") Object.keys(_MARKA).forEach(function (k) {
  var asil = normalIsim(_MARKA[k]); _ES[k] = (_ES[k] || []).concat([asil], (_ES[asil] || []));
});

// Anahtar kelimeleri bir kez sadeleştir
function _reyonHazirla(reyonlar) {
  reyonlar.forEach(function (r) { r._anahtar = r.urunler.map(normalIsim); });
  return reyonlar;
}
_reyonHazirla(YIYECEK_REYONLARI); _reyonHazirla(EKIPMAN_REYONLARI);

// Ürünün reyonunu bul. Türkçede asıl isim sondadır ("tavuk incik" → incik, "domates salçası" → salça),
// bu yüzden önce SONDAN eşleşen en uzun kelimeye bakılır, sonra başka yerde geçene.
function reyonBul(ad, ekipmanMi) {
  var n = normalIsim(ekipmanMi ? ad : markaCoz(ad)), enIyi = null, enIyiPuan = -1;
  (ekipmanMi ? EKIPMAN_REYONLARI : YIYECEK_REYONLARI).forEach(function (r) {
    r._anahtar.forEach(function (k) {
      var puan = -1;
      if (n === k) puan = 1000 + k.length;
      else if (n.slice(-(k.length + 1)) === " " + k) puan = 500 + k.length;      // sonda
      else if ((" " + n + " ").indexOf(" " + k + " ") >= 0) puan = k.length;     // başta/ortada
      if (puan > enIyiPuan) { enIyiPuan = puan; enIyi = r; }
    });
  });
  return enIyi || { ad: "Diğer", ikon: "📦" };
}

// Her kelimenin ilk harfini büyüt (Türkçe: i → İ)
function basHarfBuyuk(yazi) {
  return (yazi || "").split(/(\s+)/).map(function (w) {
    return w.trim() ? w.charAt(0).toLocaleUpperCase("tr") + w.slice(1) : w;
  }).join("");
}

// Ürünleri reyonlara ayır, reyonları ve içlerini alfabetik diz. "Diğer" en sonda.
function reyonlaraAyir(urunler, adAl, ekipmanMi) {
  var gruplar = {};
  urunler.forEach(function (u) {
    var r = reyonBul(adAl(u), ekipmanMi);
    (gruplar[r.ad] = gruplar[r.ad] || { reyon: r, urunler: [] }).urunler.push(u);
  });
  return Object.keys(gruplar).sort(function (a, b) {
    if (a === "Diğer") return 1; if (b === "Diğer") return -1;
    return a.localeCompare(b, "tr");
  }).map(function (k) {
    gruplar[k].urunler.sort(function (a, b) { return adAl(a).localeCompare(adAl(b), "tr"); });
    return gruplar[k];
  });
}

// =====================================================================
//  YAZIM DÜZELTME — "sut" → "süt", "domatez" → "domates", "kıyam" → "kıyma"
//  Bilinen ürün kelimelerinden bir sözlük kurulur. Kullanıcının yazdığı kelime sözlükte yoksa
//  önce Türkçe harfsiz hali (ı→i, ş→s, ğ→g, ü→u, ö→o, ç→c) denenir, sonra 1-2 harf farkla en yakın kelime.
//  Emin olunamazsa (iki aday eşit yakınsa) kelimeye dokunulmaz.
// =====================================================================
var EK_KELIMELER = ["taze", "kuru", "yeşil", "kırmızı", "siyah", "beyaz", "sarı", "mor", "dana", "kuzu", "köy", "ev", "yapımı",
  "organik", "light", "yağsız", "yağlı", "tam", "yarım", "büyük", "küçük", "orta", "boy", "dolmalık", "sivri", "acı", "tatlı",
  "toz", "sıvı", "rendelenmiş", "dilimli", "doğranmış", "donuk", "dondurulmuş", "haşlanmış", "közlenmiş", "çiğ", "pişmiş",
  "kemiksiz", "kemikli", "derisiz", "yerli", "ithal", "laktozsuz", "şekersiz", "tuzsuz", "tuzlu", "ekşi", "çeşni", "suyu", "sosu", "yağı", "unu",
  "pepsi", "fanta", "sprite", "nutella", "gevreği", "kuskus", "granola", "puding", "jöle", "sütlaç", "aşure", "lahmacun", "döner",
  "deterjan", "peçete", "havlu", "kağıt", "streç", "folyo", "pişirme", "çöp", "torbası", "sabun", "bulaşık", "mama", "bebek", "köz", "közde"];

function _harfsiz(s) {
  return s.replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c").replace(/â/g, "a");
}
// İki kelime arasındaki harf farkı (yer değiştirmiş iki harf 1 sayılır)
function _mesafe(a, b, sinir) {
  if (Math.abs(a.length - b.length) > sinir) return sinir + 1;
  var d = [], i, j;
  for (i = 0; i <= a.length; i++) { d[i] = [i]; }
  for (j = 0; j <= b.length; j++) d[0][j] = j;
  for (i = 1; i <= a.length; i++) {
    var satirEnAz = 99;
    for (j = 1; j <= b.length; j++) {
      var m = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + m);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      satirEnAz = Math.min(satirEnAz, d[i][j]);
    }
    if (satirEnAz > sinir) return sinir + 1;
  }
  return d[a.length][b.length];
}

var _SOZLUK = null, _SOZLUK_HARFSIZ = null;
function _sozlukKur() {
  var kelimeler = new Set();
  function ekle(yazi) {
    (yazi || "").toLocaleLowerCase("tr").split(/[\s\/,()]+/).forEach(function (w) {
      w = w.replace(/[^a-zçğıöşüâî]/g, ""); if (w.length >= 2) kelimeler.add(w);
    });
  }
  YIYECEK_REYONLARI.concat(EKIPMAN_REYONLARI).forEach(function (r) { r.urunler.forEach(ekle); });
  if (typeof ES_ANLAMLAR !== "undefined") Object.keys(ES_ANLAMLAR).forEach(function (k) { ekle(k); ES_ANLAMLAR[k].forEach(ekle); });
  if (typeof ISTISNALAR !== "undefined") ISTISNALAR.forEach(ekle);
  if (typeof TARIFLER !== "undefined") TARIFLER.forEach(function (t) {
    ekle(t.ad); (t.m || []).forEach(function (s) { var p = s.split("|"); ekle(p[0]); if (p[1]) ekle(p[1]); });
  });
  EK_KELIMELER.forEach(ekle);
  Object.keys(MARKALAR).forEach(ekle);
  _SOZLUK = Array.from(kelimeler);
  _SOZLUK_HARFSIZ = {};
  _SOZLUK.forEach(function (w) { var h = _harfsiz(w); (_SOZLUK_HARFSIZ[h] = _SOZLUK_HARFSIZ[h] || []).push(w); });
  _SOZLUK_SET = new Set(_SOZLUK);
}
var _SOZLUK_SET = null;

// Tek kelimeyi düzelt; düzeltemezse aynısını döndür
function _bilinir(w) { return _SOZLUK_SET.has(w) || _SOZLUK_SET.has(kok(w)); }
function kelimeDuzelt(w) {
  if (!_SOZLUK) _sozlukKur();
  if (w.length < 3 || /\d/.test(w) || _bilinir(w)) return w;
  // Ekli kelime: "peynirli", "cikolatalı", "şekersiz" → kökü düzelt, eki koru
  var ek = /(lı|li|lu|lü|sız|siz|suz|süz|lık|lik|luk|lük)$/.exec(w);
  if (ek && w.length - 3 >= 3) {
    var govde = w.slice(0, -ek[1].length), gd = _bilinir(govde) ? govde : _duzelt(govde);
    if (gd) return gd + _uyum(gd, ek[1]);
  }
  // "gevreği" → "gevrek"in yumuşamış hali
  if (/ğ[ıiuü]$/.test(w) && _bilinir(w.slice(0, -2) + "k")) return w;
  return _duzelt(w) || w;
}
// Eki düzeltilmiş köke göre ünlü uyumuna sok: "çikolata" + "li" → "çikolatalı"
function _uyum(kok, ek) {
  var son = (kok.match(/[aıoueiöü](?=[^aıoueiöü]*$)/) || ["e"])[0];
  var v = { a: "ı", ı: "ı", o: "u", u: "u", e: "i", i: "i", ö: "ü", ü: "ü" }[son];
  return ek.replace(/[ıiuü]/, v);
}
function _duzelt(w) {
  if (typeof MIKTAR_SET !== "undefined" && MIKTAR_SET.has(w)) return w;
  // 1) Türkçe karakter unutulmuş: sut → süt, cilek → çilek, sogan → soğan
  var h = _SOZLUK_HARFSIZ[_harfsiz(w)];
  if (h && h.length === 1) return h[0];
  if (_SOZLUK_SET.has(w)) return w;
  var hk = _SOZLUK_HARFSIZ[_harfsiz(kok(w))];
  if (hk && hk.length === 1) return hk[0];
  // 2) Harf hatası: domatez → domates, kıyam → kıyma, patetes → patates
  if (w.length < 4) return null;   // çok kısa kelimelerde tahmin yapma
  var sinir = w.length <= 4 ? 1 : 2, enIyi = null, enAz = sinir + 1, esit = false, wh = _harfsiz(w);
  _SOZLUK.forEach(function (k) {
    var kh = _harfsiz(k);
    if (k.length < 3 || kh[0] !== wh[0]) return;   // ilk harfte pek yanlış yapılmaz: börek ≠ çörek
    var d = _mesafe(wh, kh, sinir);
    if (d < enAz) { enAz = d; enIyi = k; esit = false; }
    else if (d === enAz && k !== enIyi) esit = true;
  });
  if (enIyi && enAz <= sinir && !esit && !(enAz === 2 && w.length < 6)) return enIyi;
  return null;
}

// Ürün adını kelime kelime düzelt: "taze sut" → "taze süt"
function yazimDuzelt(ad) {
  return (ad || "").split(/(\s+)/).map(function (w) {
    if (!w.trim()) return w;
    var kucuk = w.toLocaleLowerCase("tr");
    var d = kelimeDuzelt(kucuk);
    return d === kucuk ? w : d;
  }).join("");
}

// Notuna yazılmış bir ürünün (notuAnla çıktısı) adını düzeltir. Düzelttiyse eski adı döndürür.
function urunuDuzelt(u) {
  var yeni = yazimDuzelt(u.ad);
  if (yeni === u.ad) return null;
  var eski = u.ad, i = u.ham.toLocaleLowerCase("tr").indexOf(eski);
  u.ham = i < 0 ? yeni : u.ham.slice(0, i) + yeni + u.ham.slice(i + eski.length);
  u.ad = yeni;
  return eski;
}
