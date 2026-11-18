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
  { ad: "Süt Ürünleri", ikon: "🧀", urunler: ["süt", "yoğurt", "süzme yoğurt", "ayran", "kefir", "krema", "kaymak", "tereyağı", "tereyağ", "margarin",
    "peynir", "beyaz peynir", "kaşar", "kaşar peyniri", "lor", "tulum", "süzme peynir", "labne", "krem peynir", "çökelek", "hellim", "mozzarella", "parmesan", "dil peyniri"] },
  { ad: "Kahvaltılık", ikon: "🍳", urunler: ["yumurta", "zeytin", "siyah zeytin", "yeşil zeytin", "bal", "reçel", "tahin", "pekmez", "tahin pekmez", "helva",
    "fındık ezmesi", "fıstık ezmesi", "çikolata kreması", "kaymak", "menemen"] },
  { ad: "Ekmek & Unlu Mamul", ikon: "🥖", urunler: ["ekmek", "simit", "gevrek", "pide", "bazlama", "lavaş", "tortilla", "galeta", "kraker", "poğaça", "tost ekmeği", "yufka", "milföy"] },
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
  { ad: "Kuruyemiş & Atıştırmalık", ikon: "🥜", urunler: ["ceviz", "fındık", "badem", "fıstık", "yer fıstığı", "antep fıstığı", "kaju", "çekirdek", "çiğdem",
    "ayçekirdeği", "kabak çekirdeği", "leblebi", "kuru üzüm", "kuru kayısı", "kuru incir", "hurma", "cips", "bisküvi", "çikolata", "gofret", "patlamış mısır", "lokum"] },
  { ad: "İçecek", ikon: "🥤", urunler: ["su", "damacana su", "maden suyu", "soda", "meyve suyu", "portakal suyu", "kola", "gazoz", "çay", "kahve", "türk kahvesi",
    "hazır kahve", "bitki çayı", "ıhlamur", "salep", "boza", "şalgam"] },
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

// Anahtar kelimeleri bir kez sadeleştir
function _reyonHazirla(reyonlar) {
  reyonlar.forEach(function (r) { r._anahtar = r.urunler.map(normalIsim); });
  return reyonlar;
}
_reyonHazirla(YIYECEK_REYONLARI); _reyonHazirla(EKIPMAN_REYONLARI);

// Ürünün reyonunu bul. Türkçede asıl isim sondadır ("tavuk incik" → incik, "domates salçası" → salça),
// bu yüzden önce SONDAN eşleşen en uzun kelimeye bakılır, sonra başka yerde geçene.
function reyonBul(ad, ekipmanMi) {
  var n = normalIsim(ad), enIyi = null, enIyiPuan = -1;
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
