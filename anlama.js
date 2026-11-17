// =====================================================================
//  MUTFAK ASİSTANI — "ANLAMA" MOTORU
//  Kullanıcının serbest yazdığı notları anlar:
//    "yarım kilo kıyma, 5 büyük boy patates, az süt, gevrek"
//  ve her birini { ad, miktar, az } şekline getirir.
//  Ayrıca bir ürünün tarifteki malzemeyle eşleşip eşleşmediğine karar verir.
//
//  Not: İleride bu dosyanın işini yapay zekâ yapacak. Şimdilik kurallarla çalışıyor.
// =====================================================================

// Miktar bildiren kelimeler (baştan veya sondan atılır, "miktar" kısmına yazılır)
var MIKTAR_KELIMELERI = [
  "bir", "bi", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz", "on", "yirmi", "otuz",
  "kırk", "elli", "yüz", "yarım", "buçuk", "çeyrek", "birkaç", "az", "biraz", "azıcık", "çok", "bol",
  "bolca", "tam", "kilo", "kg", "kilogram", "gr", "g", "gram", "litre", "lt", "l", "ml", "paket", "pk",
  "adet", "tane", "tabak", "kase", "şişe", "kavanoz", "kutu", "poşet", "demet", "bağ", "diş", "dilim",
  "avuç", "bardak", "kaşık", "büyük", "küçük", "orta", "boy", "kalıp", "parça", "porsiyon", "torba",
  "tutam", "kangal", "baş", "dal", "file", "koli", "teneke", "bidon", "sap"
];
var MIKTAR_SET = new Set(MIKTAR_KELIMELERI);

// İki kelimelik ölçüler: "yemek kaşığı", "su bardağı", "çay fincanı"...
var OLCU_ILK = new Set(["yemek", "tatlı", "çay", "su", "kahve"]);
var OLCU_IKINCI = new Set(["kaşığı", "bardağı", "fincanı"]);

// "az var" anlamına gelen ifadeler
var AZ_KELIMELERI = new Set(["az", "azıcık", "biraz", "azaldı"]);

// Esnek isimler: kullanıcının yazdığı isim → programın anladığı genel isim(ler)
// Kullanıcı ne yazarsa yazsın ekranda kendi kelimesi görünür; bu tablo sadece eşleştirme için.
var ES_ANLAMLAR = {
  "gevrek": ["simit"],
  "çiğdem": ["ayçekirdeği"], "çekirdek": ["ayçekirdeği"],
  "hıngel": ["mantı"], "hingel": ["mantı"],
  "kurban eti": ["et"], "dana eti": ["et"], "kuzu eti": ["et"], "kuşbaşı": ["et"], "kuşbaşı et": ["et"],
  "antrikot": ["et"], "biftek": ["et"], "kavurma": ["et"],
  "piliç": ["tavuk"], "tavuk göğsü": ["tavuk"], "tavuk but": ["tavuk"], "baget": ["tavuk"], "kanat": ["tavuk"],
  "zeytinyağı": ["yağ"], "tereyağı": ["yağ"], "tereyağ": ["yağ", "tereyağı"], "margarin": ["yağ"],
  "menemenlik sos": ["domates", "biber"],
  "kaşar peyniri": ["kaşar", "peynir"], "kaşar": ["peynir"], "lor": ["peynir"], "tulum": ["peynir"],
  "salça": ["salça"], "biber salçası": ["salça"], "domates salçası": ["salça"],
  "dolmalık biber": ["biber"], "çarliston": ["biber"], "kapya": ["biber"],
  "vanilin": ["vanilya"], "nişasta": ["nişasta"], "mısır nişastası": ["nişasta"],
  "makarnalık": ["makarna"], "spagetti": ["makarna"], "erişte": ["makarna"],
  "yufka": ["yufka"], "sucuk": ["sucuk"],
  "domates rendesi": ["domates"],
  // Ekipmanlar
  "blander": ["blender"], "el blenderı": ["blender"], "rondo": ["mutfak robotu"],
  "mixer": ["mikser"], "çırpıcı": ["mikser"], "el mikseri": ["mikser"],
  "air fryer": ["airfryer"], "airfrayer": ["airfryer"], "fritöz": ["airfryer"],
  "ankastre fırın": ["fırın"], "mini fırın": ["fırın"], "midi fırın": ["fırın"],
  "kek kalıbı": ["kek kalıbı"], "borcam": ["tepsi"], "fırın tepsisi": ["tepsi"]
};

// Son kelimesine bakılmayacak birleşik isimler ("pul biber" bir biber değildir)
var ISTISNALAR = ["pul biber", "toz biber", "kırmızı toz biber", "isot biber", "limon tuzu",
  "hindistan cevizi", "süt tozu", "kabartma tozu", "yer fıstığı", "nar ekşisi", "tavuk suyu",
  "et suyu", "maden suyu", "portakal suyu", "pirinç unu", "mısır unu", "galeta unu", "pudra şekeri"];

// Evde neredeyse her zaman bulunan şeyler: eksik sayılmaz, "kontrol et" diye hatırlatılır
var TEMEL_MALZEMELER = ["tuz", "karabiber", "su", "sıcak su", "pul biber", "kimyon", "kuru nane", "nane",
  "kekik", "toz biber", "tarçın"];

// ---------------------------------------------------------------------
// Kelimeyi sadeleştirir: "biberleri" → "biber", "salçası" → "salça", "eti" → "et"
function kok(kelime) {
  var w = kelime;
  if (w.length > 4 && /(sı|si|su|sü)$/.test(w)) w = w.slice(0, -2);
  else if (w.length >= 3 && /[ıiuü]$/.test(w) && /[bcçdfgğhjklmnprsştvyz]$/.test(w.slice(0, -1))) w = w.slice(0, -1);
  if (w.length > 5 && /(lar|ler)$/.test(w)) w = w.slice(0, -3);
  return w;
}

function kucult(yazi) {
  return (yazi || "").toLocaleLowerCase("tr").trim();
}

function normalIsim(isim) {
  return kucult(isim).split(/\s+/).filter(Boolean).map(kok).join(" ");
}

// Tabloları da aynı şekilde sadeleştiriyoruz ki karşılaştırma tutarlı olsun
var _ES = {};
Object.keys(ES_ANLAMLAR).forEach(function (k) { _ES[normalIsim(k)] = ES_ANLAMLAR[k].map(normalIsim); });
var _ISTISNA = new Set(ISTISNALAR.map(normalIsim));
var _TEMEL = new Set(TEMEL_MALZEMELER.map(normalIsim));

function miktarMi(t) {
  return MIKTAR_SET.has(t) ||
    /^\d+([.,]\d+)?(-\d+([.,]\d+)?)?$/.test(t) ||        // 5, 1.5, 4-5
    /^\d+([.,]\d+)?(gr|g|kg|ml|lt|l)$/.test(t);          // 500gr, 2kg
}

// ---------------------------------------------------------------------
// Tek bir satırı anlar: "5 adet büyük boy patates" → { ad: "patates", miktar: "5 adet büyük boy" }
function satiriAnla(ham) {
  var metin = kucult(ham);
  var parantez = (metin.match(/\(([^)]*)\)/) || [])[1] || "";
  metin = metin.replace(/\([^)]*\)/g, " ").replace(/[.!?:"]+/g, " ");
  var t = metin.split(/\s+/).filter(Boolean);
  var miktar = [];
  var i = 0, j = t.length;

  // Baştaki miktarları al (isim için en az bir kelime bırak)
  while (i < j - 1) {
    if (miktarMi(t[i])) { miktar.push(t[i]); i++; }
    else if (OLCU_ILK.has(t[i]) && OLCU_IKINCI.has(t[i + 1]) && i + 2 < j) { miktar.push(t[i], t[i + 1]); i += 2; }
    else break;
  }
  // Sondaki miktarları al: "kıyma yarım kilo"
  var sondan = [];
  while (j - 1 > i) {
    if (miktarMi(t[j - 1])) { sondan.unshift(t[j - 1]); j--; }
    else if (j - 2 > i && OLCU_ILK.has(t[j - 2]) && OLCU_IKINCI.has(t[j - 1])) { sondan.unshift(t[j - 2], t[j - 1]); j -= 2; }
    else break;
  }
  miktar = miktar.concat(sondan);

  var ad = t.slice(i, j).join(" ");
  var tumu = miktar.concat(parantez.split(/\s+/));
  var az = tumu.some(function (w) { return AZ_KELIMELERI.has(w); }) || /bitmek üzere|bitiyor|azaldı/.test(metin + " " + parantez);

  return {
    ham: ham.trim(),
    ad: ad,
    miktar: miktar.join(" ") + (parantez ? (miktar.length ? " " : "") + "(" + parantez + ")" : ""),
    az: az
  };
}

// Bir not defterinin tamamını anlar (virgül, yeni satır, noktalı virgül veya " ve " ile ayrılmış)
function notuAnla(not) {
  return (not || "")
    .split(/(?<!\d),|,(?!\d)|[\n;]+|\s+ve\s+/)   // "1,5 litre" bölünmesin
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return s.length > 0; })
    .map(satiriAnla)
    .filter(function (u) { return u.ad.length > 0 && !/^[\d.,-]+$/.test(u.ad); });
}

// ---------------------------------------------------------------------
// Bir ismin karşılaştırma bilgisi
function isimBilgisi(isim) {
  var tam = normalIsim(isim);
  var kelimeler = tam.split(" ");
  var son = (kelimeler.length > 1 && !_ISTISNA.has(tam)) ? kelimeler[kelimeler.length - 1] : null;
  var es = (_ES[tam] || []).slice();
  if (son && _ES[son]) es = es.concat(_ES[son]);
  return { tam: tam, son: son, es: es };
}

// Kullanıcının ürünü (u) tarifin istediği şeyi (r) karşılıyor mu?
// Kural: aynı isim, ya da biri diğerinin genel hali ("dana kıyma" ↔ "kıyma", "biber" ↔ "sivri biber").
// "kaşar peyniri" ile "beyaz peynir" gibi kardeş isimler eşleşmez.
function eslesir(u, r) {
  if (u.tam === r.tam) return true;
  if (u.son && u.son === r.tam) return true;
  if (r.son && r.son === u.tam) return true;
  if (u.es.indexOf(r.tam) >= 0) return true;
  return false;
}

function temelMi(bilgi) {
  return _TEMEL.has(bilgi.tam);
}

// Tarifteki bir satırı hazırlar: "1 tatlı kaşığı biber salçası|biber salçası/salça"
function tarifSatiri(satir) {
  var parca = satir.split("|");
  var gosterim = parca[0].trim();
  var anahtarlar = parca[1]
    ? parca[1].split("/").map(function (s) { return s.trim(); })
    : [satiriAnla(gosterim).ad];
  var bilgiler = anahtarlar.map(isimBilgisi);
  return {
    metin: gosterim,
    anahtar: anahtarlar[0],
    bilgiler: bilgiler,
    temel: bilgiler.some(temelMi)
  };
}

// Node.js ile test edebilmek için (tarayıcıda bu satır bir şey yapmaz)
if (typeof module !== "undefined") {
  module.exports = { satiriAnla: satiriAnla, notuAnla: notuAnla, isimBilgisi: isimBilgisi,
    eslesir: eslesir, tarifSatiri: tarifSatiri, normalIsim: normalIsim };
}
