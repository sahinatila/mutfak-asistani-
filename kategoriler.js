// =====================================================================
//  MUTFAK ASİSTANI — ÜRÜN KATEGORİLERİ (market reyonları gibi)
//  Her ürünü bir reyona koyar, adını büyük harfle başlatır ve alfabetik dizer.
//  Yeni ürün eklemek için ilgili reyonun listesine küçük harfle yazman yeterli.
//  Not: Bu dosya anlama.js'den SONRA yüklenmeli (normalIsim'i kullanır).
// =====================================================================

var YIYECEK_REYONLARI = [
  { ad: "Sebze", ikon: "🥕", urunler: ["domates", "salatalık", "hıyar", "biber", "sivri biber", "dolmalık biber", "kapya", "çarliston", "patlıcan", "kabak",
    "patates", "soğan", "kuru soğan", "taze soğan", "yeşil soğan", "sarımsak", "havuç", "marul", "kıvırcık", "roka", "maydanoz", "dereotu", "taze nane", "tere",
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
    "un", "patlamış mısır", "patlayan mısır", "popcorn mısırı", "cin mısır", "irmik", "yulaf", "mısır unu", "pirinç unu", "galeta unu", "kinoa", "chia", "susam", "çörek otu"] },
  { ad: "Makarna & Hamur", ikon: "🍝", urunler: ["makarna", "spagetti", "erişte", "şehriye", "mantı", "hıngel", "lazanya", "noodle", "tel şehriye", "arpa şehriye"] },
  { ad: "Yağlar", ikon: "🫒", urunler: ["yağ", "sıvı yağ", "ayçiçek yağı", "zeytinyağı", "mısır yağı", "fındık yağı", "kızartma yağı"] },
  { ad: "Soslar & Salçalar", ikon: "🥫", urunler: ["salça", "domates salçası", "biber salçası", "nar ekşisi", "ketçap", "mayonez", "hardal", "sirke", "elma sirkesi",
    "üzüm sirkesi", "soya sosu", "acı sos", "barbekü sos", "limon sosu", "tavuk suyu", "et suyu", "bulyon", "domates sosu", "pesto"] },
  { ad: "Baharatlar", ikon: "🧂", urunler: ["tuz", "karabiber", "pul biber", "toz biber", "isot", "isot biber", "kimyon", "kekik", "nane", "kuru nane", "sarımsak tozu", "soğan tozu", "tarçın",
    "zerdeçal", "sumak", "köri", "yenibahar", "karanfil", "defne", "biberiye", "fesleğen", "muskat", "zencefil tozu", "limon tuzu", "köfte baharatı"] },
  { ad: "Konserve & Turşu", ikon: "🫙", urunler: ["konserve", "ton balığı", "turşu", "közlenmiş biber", "mısır konservesi", "bezelye konservesi", "nohut konservesi",
    "fasulye konservesi", "domates konservesi", "kapari", "zeytin ezmesi"] },
  { ad: "Şeker & Pastacılık", ikon: "🍰", urunler: ["şeker", "toz şeker", "pudra şekeri", "esmer şeker", "kakao", "vanilya", "vanilin", "kabartma tozu",
    "karbonat", "maya", "kuru maya", "yaş maya", "nişasta", "mısır nişastası", "jelatin", "bitter çikolata", "damla çikolata", "hindistan cevizi", "krem şanti"] },
  { ad: "Atıştırmalık & Kuruyemiş", ikon: "🍿", urunler: ["ceviz", "fındık", "badem", "fıstık", "yer fıstığı", "antep fıstığı", "kaju", "çekirdek", "çiğdem",
    "ayçekirdeği", "kabak çekirdeği", "leblebi", "kuru üzüm", "kuru kayısı", "kuru incir", "hurma", "cips", "kraker", "mısır cipsi", "bisküvi", "çikolata", "gofret", "lokum"] },
  { ad: "İçecekler", ikon: "🥤", urunler: ["su", "damacana su", "maden suyu", "soda", "meyve suyu", "portakal suyu", "kola", "gazoz", "çay", "kahve", "türk kahvesi",
    "hazır kahve", "granül kahve", "filtre kahve", "çekirdek kahve", "kahve çekirdeği", "öğütülmüş kahve", "espresso", "bitki çayı", "yeşil çay", "siyah çay", "poşet çay", "adaçayı", "papatya çayı", "kuşburnu çayı", "kuşburnu", "ıhlamur", "salep", "boza", "şalgam", "fanta", "sprite", "pepsi", "ice tea", "soğuk çay", "limonata",
    "enerji içeceği", "mineralli su", "vişne suyu", "şeftali suyu", "kayısı suyu", "karışık meyve suyu", "ayran", "sıcak çikolata", "nescafe"] },
  { ad: "Dondurulmuş", ikon: "🧊", urunler: ["dondurma", "dondurulmuş", "donuk", "buz", "patates kızartması", "nugget", "pizza"] }
];

var EKIPMAN_REYONLARI = [
  { ad: "Pişirme Aletleri", ikon: "🔥", urunler: ["fırın", "ocak", "airfryer", "mikrodalga", "tost makinesi", "waffle makinesi", "ızgara", "mangal", "semaver", "çaydanlık", "fritöz"] },
  { ad: "Tencere & Tava", ikon: "🍲", urunler: ["tencere", "tava", "düdüklü", "düdüklü tencere", "wok", "cezve", "güveç", "sahan", "kazan", "kızartma tavası", "krep tavası"] },
  { ad: "Fırın Kapları", ikon: "🥧", urunler: ["tepsi", "fırın tepsisi", "borcam", "kek kalıbı", "muffin kalıbı", "tart kalıbı", "pizza taşı", "fırın kabı", "kalıp"] },
  { ad: "Elektrikli Aletler", ikon: "🔌", urunler: ["mikser", "el mikseri", "blender", "el blenderı", "mutfak robotu", "rondo", "doğrayıcı", "meyve sıkacağı", "katı meyve sıkacağı", "espresso makinesi", "elektrikli cezve", "kahve makinesi", "türk kahvesi makinesi", "filtre kahve makinesi", "çay makinesi", "su ısıtıcısı", "kettle", "tartı", "mutfak tartısı"] },
  { ad: "El Aletleri", ikon: "🥄", urunler: ["kaşık", "tahta kaşık", "silikon kaşık", "kepçe", "spatula", "çırpma teli", "rende", "bıçak", "kesme tahtası", "oklava",
    "süzgeç", "kevgir", "maşa", "soyacak", "havan", "huni", "ölçü kabı", "makas", "açacak", "konserve açacağı", "sarımsak ezici"] }
];

// Temizlik Malzemelerim defteri: bulaşık, çamaşır, ev temizliği, kişisel bakım ve mutfak sarf malzemeleri.
// Yiyecek defterlerine yazılan temizlik ürünleri buraya taşınır; alışverişten gelenler de buraya konur.
var TEMIZLIK_REYONLARI = [
  { ad: "Bulaşık", ikon: "🍽️", urunler: ["bulaşık deterjanı", "sıvı bulaşık deterjanı", "elde bulaşık deterjanı", "bulaşık makinesi deterjanı",
    "bulaşık makinesi tableti", "tablet", "bulaşık tableti", "bulaşık makinesi tuzu", "makine tuzu", "parlatıcı", "bulaşık makinesi parlatıcısı",
    "makine temizleyici", "bulaşık makinesi temizleyici", "bulaşık süngeri", "sünger", "bulaşık teli", "tel", "bulaşık eldiveni", "bulaşık bezi"] },
  { ad: "Çamaşır", ikon: "👕", urunler: ["çamaşır deterjanı", "toz deterjan", "sıvı deterjan", "matik", "deterjan", "yumuşatıcı", "çamaşır yumuşatıcısı",
    "çamaşır suyu", "leke çıkarıcı", "renk koruyucu", "kireç önleyici", "çamaşır makinesi temizleyici", "çamaşır kapsülü", "kapsül deterjan", "ütü suyu", "mandal"] },
  { ad: "Genel Temizlik", ikon: "🧽", urunler: ["yüzey temizleyici", "genel temizlik", "yer temizleyici", "cam temizleyici", "cam sil", "kireç sökücü",
    "yağ çözücü", "krem temizleyici", "banyo temizleyici", "mutfak temizleyici", "tuvalet temizleyici", "wc temizleyici", "lavabo açıcı", "gider açıcı",
    "arap sabunu", "sirke", "karbonat", "limon tuzu", "tuz ruhu", "dezenfektan", "el dezenfektanı", "ıslak mendil", "temizlik bezi", "mikrofiber bez",
    "toz bezi", "paspas", "mop", "kova", "fırça", "süpürge", "faraş", "temizlik eldiveni", "oda kokusu", "hava tazeleyici", "böcek ilacı", "sinek ilacı",
    "naftalin", "mobilya cilası"] },
  { ad: "Kağıt & Sarf", ikon: "🧻", urunler: ["tuvalet kağıdı", "kağıt havlu", "peçete", "kağıt mendil", "mendil", "çöp torbası", "çöp poşeti", "buzdolabı poşeti",
    "streç film", "streç", "alüminyum folyo", "folyo", "pişirme kağıdı", "yağlı kağıt", "kilitli poşet", "saklama kabı", "kürdan", "pipet"] },
  { ad: "Kişisel Bakım", ikon: "🧴", urunler: ["şampuan", "saç kremi", "duş jeli", "sabun", "sıvı sabun", "el sabunu", "katı sabun", "kolonya", "deodorant",
    "parfüm", "nemlendirici", "el kremi", "vücut losyonu", "güneş kremi", "tıraş köpüğü", "tıraş bıçağı", "jilet", "pamuk", "kulak çubuğu", "ped",
    "hijyenik ped", "tampon", "bebek bezi", "bebek şampuanı", "makyaj temizleme", "tarak", "lif", "banyo lifi", "bornoz"] },
  { ad: "Ağız Bakımı", ikon: "🪥", urunler: ["diş macunu", "diş fırçası", "diş ipi", "ağız gargarası", "gargara", "ağız bakım suyu", "arayüz fırçası",
    "protez temizleyici", "diş beyazlatıcı"] }
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
  "nutri bebe": "mama", "aptamil": "mama", "bebelac": "mama",
  // Temizlik ve kişisel bakım markaları → Temizlik Malzemelerim
  "fairy": "bulaşık deterjanı", "pril": "bulaşık deterjanı", "finish": "bulaşık makinesi tableti", "pril tablet": "bulaşık makinesi tableti",
  "ariel": "çamaşır deterjanı", "omo": "çamaşır deterjanı", "persil": "çamaşır deterjanı", "bingo": "çamaşır deterjanı", "alo": "çamaşır deterjanı",
  "tursil": "çamaşır deterjanı", "yumoş": "yumuşatıcı", "vernel": "yumuşatıcı", "domestos": "çamaşır suyu", "ace": "çamaşır suyu",
  "cif": "krem temizleyici", "mr. muscle": "yağ çözücü", "mr muscle": "yağ çözücü", "harpic": "tuvalet temizleyici", "calgon": "kireç önleyici",
  "vanish": "leke çıkarıcı", "glade": "oda kokusu", "selpak": "kağıt mendil", "solo": "tuvalet kağıdı", "familia": "tuvalet kağıdı",
  "colgate": "diş macunu", "signal": "diş macunu", "ipana": "diş macunu", "sensodyne": "diş macunu", "oral-b": "diş fırçası", "oral b": "diş fırçası",
  "listerine": "ağız gargarası", "elidor": "şampuan", "head & shoulders": "şampuan", "pantene": "şampuan", "blendax": "şampuan",
  "duru": "sabun", "protex": "sabun", "rexona": "deodorant", "eyüp sabri tuncer": "kolonya", "rebul": "kolonya", "gillette": "tıraş bıçağı",
  "orkid": "ped", "prima": "bebek bezi", "molfix": "bebek bezi"
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
_reyonHazirla(YIYECEK_REYONLARI); _reyonHazirla(EKIPMAN_REYONLARI); _reyonHazirla(TEMIZLIK_REYONLARI);

// tur: false = yiyecek, true = ekipman, "temizlik" = Temizlik Malzemelerim
function _reyonListesi(tur) { return tur === "temizlik" ? TEMIZLIK_REYONLARI : tur ? EKIPMAN_REYONLARI : YIYECEK_REYONLARI; }
function _enIyiReyon(n, reyonlar) {
  var enIyi = null, enIyiPuan = -1;
  reyonlar.forEach(function (r) {
    r._anahtar.forEach(function (k) {
      var puan = -1;
      if (n === k) puan = 1000 + k.length;
      else if (n.slice(-(k.length + 1)) === " " + k) puan = 500 + k.length;      // sonda
      else if ((" " + n + " ").indexOf(" " + k + " ") >= 0) puan = k.length;     // başta/ortada
      if (puan > enIyiPuan) { enIyiPuan = puan; enIyi = r; }
    });
  });
  return { r: enIyi, puan: enIyiPuan };
}
// Bu ürün temizlik / kişisel bakım ürünü mü? ("çamaşır suyu" evet, "su" ve "sirke" hayır: eşitlikte yiyecek kazanır)
// ekipmanMi: ekipman defterindeysek aletlerle de kıyasla ("çırpma teli" alettir, "bulaşık teli" temizlik)
function temizlikUrunuMu(ad, ekipmanMi) {
  var n = normalIsim(markaCoz(ad));
  var t = _enIyiReyon(n, TEMIZLIK_REYONLARI), y = _enIyiReyon(n, YIYECEK_REYONLARI);
  var rakip = ekipmanMi ? Math.max(y.puan, _enIyiReyon(normalIsim(ad), EKIPMAN_REYONLARI).puan) : y.puan;
  return !!t.r && t.puan > rakip;
}

// Ürünün reyonunu bul. Türkçede asıl isim sondadır ("tavuk incik" → incik, "domates salçası" → salça),
// bu yüzden önce SONDAN eşleşen en uzun kelimeye bakılır, sonra başka yerde geçene.
function reyonBul(ad, ekipmanMi) {
  var n = normalIsim(ekipmanMi === true ? ad : markaCoz(ad));
  if (ekipmanMi === "temizlik") return _enIyiReyon(n, TEMIZLIK_REYONLARI).r || { ad: "Diğer", ikon: "📦" };
  // Her türlü kahve ve çay (bitki çayları dahil) içecektir: "kahve çekirdeği" kuruyemiş değildir
  if (!ekipmanMi && /(^| )(kahve|çay|espresso|latte|cappuccino|ıhlamur|adaçay)( |$)/.test(n) && !/(tabağ|bardağ|kaşığ|fincan)/.test(n))
    return YIYECEK_REYONLARI.filter(function (r) { return r.ad === "İçecekler"; })[0];
  var y = _enIyiReyon(n, _reyonListesi(ekipmanMi));
  // Alışveriş listesi gibi karışık yerlerde temizlik ürünleri de kendi reyonuna gitsin ("çamaşır suyu" İçecekler'e değil)
  if (!ekipmanMi) { var t = _enIyiReyon(n, TEMIZLIK_REYONLARI); if (t.r && t.puan > y.puan) return t.r; }
  return y.r || { ad: "Diğer", ikon: "📦" };
}

// Ürünün reyonunu bulurken miktara da bak: "1 demet nane" tazedir (Sebze), sadece "nane" baharattır
function reyonAdi(u) {
  return /(^| )(demet|bağ)( |$)/.test(u.miktar || "") && !/^taze /.test(u.ad) ? "taze " + u.ad : u.ad;
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
  "çeşitli", "değişik", "farklı", "muhtelif", "granül", "filtre", "öğütülmüş", "çekirdek", "patlayan", "patlamış", "tozu", "demet", "poşet", "bitki",
  "elektrikli", "espresso", "makinesi", "makine", "dijital", "ankastre", "setüstü", "döküm", "granit", "teflon", "çelik", "paslanmaz", "cam", "porselen",
  "seramik", "bakır", "emaye", "alüminyum", "silikon", "ahşap", "tahta", "plastik", "yanmaz", "büyüklü", "küçüklü", "kapaklı", "kulplu", "derin", "yassı",
  "yuvarlak", "kare", "dikdörtgen", "oval", "yapışmaz", "set", "takım", "boy", "boyda", "boylarda", "boyutlarda", "ebatlarda", "eski", "yeni", "lüks",
  "deterjan", "peçete", "havlu", "kağıt", "streç", "folyo", "pişirme", "çöp", "torbası", "sabun", "bulaşık", "mama", "bebek", "köz", "közde"];

// Sık kullanılan Türkçe kelimeler: bunlar zaten doğru, asla "düzeltilmez" (kalın → kalıp, açık → acı olmasın)
var TURKCE_KELIMELER = ("açık kapalı kalın ince iri ufak minik kocaman uzun kısa geniş dar yüksek alçak hafif ağır derin sığ sıcak soğuk ılık " +
  "güzel çirkin iyi kötü yeni eski taze bayat kırık bozuk sağlam temiz kirli dolu boş yarı tek çift az çok bol hepsi her biri bazı " +
  "renkli kırmızı siyah beyaz gri mavi yeşil sarı turuncu mor pembe kahverengi lacivert gümüş altın bakır bronz şeffaf mat parlak " +
  "doğal katkısız organik yerli yöresel ithal hazır paketli açıkta dökme sade karışık meyveli kakaolu fındıklı cevizli bademli fıstıklı " +
  "kepekli çavdar buğday glutensiz laktozsuz şekersiz tuzsuz yağsız light diyet ev köy çiftlik market pazar fırından günlük haftalık " +
  "ekşi tatlı acı tuzlu baharatlı sulu kuru yaş pişmiş çiğ dondurulmuş donuk soğutulmuş kurutulmuş tütsülenmiş füme marine " +
  "kullanılmış sıfır ikinci el yedek eski model büyük küçük orta normal standart özel profesyonel endüstriyel elektrikli şarjlı pilli " +
  "manuel otomatik dijital analog ankastre setüstü solo mini midi maksi jumbo dev minyatür kare yuvarlak oval dikdörtgen üçgen " +
  "kapaklı kapaksız kulplu kulpsuz saplı sapsız ayaklı katlanır çıkarılabilir yapışmaz yanmaz kırılmaz paslanmaz çelik döküm granit " +
  "teflon seramik porselen cam kristal plastik silikon tahta ahşap bambu mermer taş toprak emaye alüminyum krom metal kağıt karton " +
  "set takım parça adet tane çeşit çeşitli değişik farklı muhtelif benzer aynı başka diğer ayrı ayrıca hem veya ile için gibi kadar " +
  "baharat sebze meyve kuruyemiş içecek atıştırmalık yiyecek gıda malzeme ürün yemek tatlı tuzlu çerez sos ekipman alet kap kase tabak bardak " +
  "var yok lazım gerek bitti bitiyor azaldı kaldı alınacak alındı lazım acil sonra şimdi bugün yarın").split(" ");

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

var _SOZLUK = null, _SOZLUK_HARFSIZ = null, _SOZLUK_SET = null, _SOZLUKLER = {};
// Yiyecek ve ekipman için ayrı sözlük: ekipman defterinde bir kelime yiyeceğe "düzeltilmez"
function _sozlukSec(ekipmanMi) {
  var k = ekipmanMi === "temizlik" ? "temizlik" : ekipmanMi ? "ekipman" : "yiyecek";
  if (!_SOZLUKLER[k]) { _sozlukKur(ekipmanMi); _SOZLUKLER[k] = { s: _SOZLUK, h: _SOZLUK_HARFSIZ, set: _SOZLUK_SET }; }
  _SOZLUK = _SOZLUKLER[k].s; _SOZLUK_HARFSIZ = _SOZLUKLER[k].h; _SOZLUK_SET = _SOZLUKLER[k].set;
}
function _sozlukKur(ekipmanMi) {
  var kelimeler = new Set();
  function ekle(yazi) {
    (yazi || "").toLocaleLowerCase("tr").split(/[\s\/,()]+/).forEach(function (w) {
      w = w.replace(/[^a-zçğıöşüâî]/g, ""); if (w.length >= 2) kelimeler.add(w);
    });
  }
  _reyonListesi(ekipmanMi).forEach(function (r) { r.urunler.forEach(ekle); });
  if (ekipmanMi === "temizlik") Object.keys(MARKALAR).forEach(ekle);
  var reyonKelimeleri = new Set(kelimeler);
  EK_KELIMELER.forEach(ekle);
  TURKCE_KELIMELER.forEach(ekle);
  if (!ekipmanMi) _sozlukKurYiyecek(ekle);
  // Miktar kelimeleri (kırk, altı, kalıp...) "bilinir" ama hiçbir yazım hatası onlara çevrilmez
  var hedefler = Array.from(kelimeler), bilinen = new Set(hedefler);
  if (typeof MIKTAR_KELIMELERI !== "undefined") MIKTAR_KELIMELERI.forEach(function (w) { bilinen.add(w); });
  // Yiyecek defterine yazılan "şampuan", "yumuşatıcı" gibi kelimeler doğru kabul edilsin (sonra Temizlik'e taşınır), ama hiçbir yazım hatası onlara çevrilmesin
  if (!ekipmanMi) TEMIZLIK_REYONLARI.forEach(function (r) { r.urunler.forEach(function (y) {
    y.toLocaleLowerCase("tr").split(/[\s\/,()]+/).forEach(function (w) { w = w.replace(/[^a-zçğıöşüâî]/g, ""); if (w.length >= 2) bilinen.add(w); });
  }); });
  _SOZLUK = hedefler.filter(function (w) { return reyonKelimeleri.has(w) || !(typeof MIKTAR_SET !== "undefined" && MIKTAR_SET.has(w)); });
  _SOZLUK_HARFSIZ = {};
  _SOZLUK.forEach(function (w) { var h = _harfsiz(w); (_SOZLUK_HARFSIZ[h] = _SOZLUK_HARFSIZ[h] || []).push(w); });
  _SOZLUK_SET = bilinen;
}
function _sozlukKurYiyecek(ekle) {
  if (typeof ES_ANLAMLAR !== "undefined") Object.keys(ES_ANLAMLAR).forEach(function (k) { ekle(k); ES_ANLAMLAR[k].forEach(ekle); });
  if (typeof ISTISNALAR !== "undefined") ISTISNALAR.forEach(ekle);
  if (typeof TARIFLER !== "undefined") TARIFLER.forEach(function (t) {
    ekle(t.ad); (t.m || []).forEach(function (s) { var p = s.split("|"); ekle(p[0]); if (p[1]) ekle(p[1]); });
  });
  Object.keys(MARKALAR).forEach(ekle);
}

// Tek kelimeyi düzelt; düzeltemezse aynısını döndür
function _bilinir(w) { return _SOZLUK_SET.has(w) || _SOZLUK_SET.has(kok(w)); }
function kelimeDuzelt(w, ekipmanMi) {
  _sozlukSec(ekipmanMi === "temizlik" ? "temizlik" : !!ekipmanMi);
  if (w.length < 3 || /\d/.test(w) || _bilinir(w)) return w;
  // Çekim eki almış kelimeler ("boylarda", "kenarındaki") büyük ihtimalle doğru yazılmış bir açıklamadır: dokunma
  if (/(larda|lerde|ları|leri|daki|deki|taki|teki|ında|inde|unda|ünde)$/.test(w)) return w;
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
  var sinir = w.length >= 9 ? 2 : 1, enIyi = null, enAz = sinir + 1, esit = false, wh = _harfsiz(w);
  _SOZLUK.forEach(function (k) {
    var kh = _harfsiz(k);
    if (k.length < 3 || kh[0] !== wh[0]) return;   // ilk harfte pek yanlış yapılmaz: börek ≠ çörek
    // Sadece ek farkı ("baharat" ↔ "baharatı", "kalıp" ↔ "kalıbı") yazım hatası değildir
    if ((kh.indexOf(wh) === 0 || wh.indexOf(kh) === 0) && Math.abs(kh.length - wh.length) <= 2 && Math.min(kh.length, wh.length) >= 4) return;
    var d = _mesafe(wh, kh, sinir);
    if (d < enAz) { enAz = d; enIyi = k; esit = false; }
    else if (d === enAz && k !== enIyi) esit = true;
  });
  if (enIyi && enAz <= sinir && !esit) return enIyi;
  return null;
}

// Ürün adını kelime kelime düzelt: "taze sut" → "taze süt"
function yazimDuzelt(ad, ekipmanMi) {
  return (ad || "").split(/(\s+)/).map(function (w) {
    if (!w.trim()) return w;
    var kucuk = w.toLocaleLowerCase("tr");
    var d = kelimeDuzelt(kucuk, ekipmanMi);
    return d === kucuk ? w : d;
  }).join("");
}

// Notuna yazılmış bir ürünün (notuAnla çıktısı) adını düzeltir. Düzelttiyse eski adı döndürür.
function urunuDuzelt(u, ekipmanMi) {
  var yeni = yazimDuzelt(u.ad, ekipmanMi);
  if (yeni === u.ad) return null;
  var eski = u.ad, i = u.ham.toLocaleLowerCase("tr").indexOf(eski);
  u.ham = i < 0 ? yeni : u.ham.slice(0, i) + yeni + u.ham.slice(i + eski.length);
  u.ad = yeni;
  return eski;
}
