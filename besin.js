// =====================================================================
//  MUTFAK ASİSTANI — BESİN DEĞERİ, DİYET, ÖĞÜN, PİŞİRME, SÜRE
//  Tarifin malzeme satırlarındaki miktarları okuyup (ör. "2 su bardağı un")
//  aşağıdaki besin tablosundan TAHMİNİ değer hesaplar. Uydurma rakam yok:
//  her sonuç malzeme miktarı × 100 gramdaki değer şeklinde bulunur.
//  Değerler genel besin tablolarından (USDA, TürKomp benzeri) yuvarlanmıştır.
//  TIBBİ TAVSİYE DEĞİLDİR.
//
//  Tablo satırı: [ "arama kalıbı", kcal, protein, yağ, karbonhidrat, şeker, lif,
//                  A(µg), C(mg), E(mg), B12(µg), folat(µg), kalsiyum, demir, magnezyum, potasyum, çinko (mg),
//                  { seçenekler } ]   (hepsi 100 gramda)
//  Seçenekler: d = yoğunluk (1 ml kaç gram; bardak/kaşık için), t = 1 tanesi kaç gram,
//    dm = 1 demet, dl = 1 dilim, pk = 1 paket, kt = 1 kutu, ds = 1 diş (gram),
//    x = miktar yazmıyorsa varsayılan gram, ye = yenilebilir oran (kemik, kılçık),
//    kuru = 1 → "haşlanmış/konserve" yazıyorsa pişmiş hali (su çekmiş) sayılır,
//    f = içerik: E = et/tavuk/balık/et suyu/jelatin, S = süt ürünü, Y = yumurta, B = bal
// =====================================================================
(function (kok) {
  "use strict";
  var H = "(?:^|[^a-zçğıöşüâî])";              // kelime başı
  var Z = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];   // baharat vb. (hesaba değmeyecek kadar az)
  var YAG = [884, 0, 100, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0];
  var ET_SUYU = [7, 1, 0.3, 0.3, 0, 0, 0, 0, 0, 0, 0, 5, 0.1, 2, 60, 0];
  var SEKER = [387, 0, 0, 100, 100, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0];
  var MAKARNA = [371, 13, 1.5, 75, 2.7, 3.2, 0, 0, 0.1, 0, 18, 21, 1.3, 53, 223, 1.4];
  var EKMEK = [265, 8.9, 3.2, 49, 5, 2.7, 0, 0, 0.2, 0, 60, 60, 1.5, 25, 115, 0.8];
  var BEYAZ_BALIK = [97, 18.4, 2, 0, 0, 0, 30, 0, 0.5, 3.8, 5, 80, 0.3, 41, 256, 0.4];
  var YAGLI_BALIK = [205, 18.6, 13.9, 0, 0, 0, 50, 0.4, 1.5, 8.7, 1, 12, 1.6, 76, 314, 0.6];
  var PEYNIR = [264, 14.2, 21.3, 4.1, 4.1, 0, 125, 0, 0.2, 1.7, 32, 493, 0.65, 19, 62, 2.9];
  var KASAR = [380, 26, 30, 1.5, 0.5, 0, 260, 0, 0.3, 1.2, 18, 720, 0.5, 28, 90, 3.5];
  var SIVRI = [20, 0.9, 0.2, 4.6, 2.4, 1.7, 18, 80, 0.4, 0, 10, 10, 0.3, 10, 175, 0.1];
  var KIRMIZI_BIBER = [31, 1, 0.3, 6, 4.2, 2.1, 157, 128, 1.6, 0, 46, 7, 0.4, 12, 211, 0.3];
  var MEYVE_SUYU = [46, 0.2, 0.1, 11.3, 9.6, 0.2, 1, 2, 0, 0, 2, 8, 0.2, 6, 110, 0];
  var KIYMA = [250, 17.5, 20, 0, 0, 0, 0, 0, 0.2, 2.5, 7, 18, 2, 17, 270, 4.5];
  var DANA = [190, 20, 12, 0, 0, 0, 0, 0, 0.4, 2.5, 6, 13, 2.4, 21, 318, 4.8];
  var KUZU = [282, 16.6, 23.4, 0, 0, 0, 0, 0, 0.2, 2.3, 18, 16, 1.6, 21, 280, 3.4];
  var TAVUK = [170, 20, 10, 0, 0, 0, 20, 0, 0.3, 0.3, 6, 10, 0.9, 23, 230, 1.5];
  var CIGER = [135, 20.4, 3.6, 3.9, 0, 0, 4968, 1.3, 0.4, 59, 290, 5, 4.9, 18, 313, 4];
  var NOHUT = [364, 19.3, 6, 61, 10.7, 17.4, 3, 4, 0.8, 0, 557, 105, 6.2, 115, 875, 3.4];
  var FASULYE = [333, 23.6, 0.8, 60, 2.1, 15.2, 0, 0, 0.2, 0, 394, 143, 5.5, 140, 1359, 2.8];
  var MEYVE = [55, 0.8, 0.2, 14, 10, 2, 20, 30, 0.3, 0, 15, 15, 0.3, 10, 180, 0.1];
  var BUGDAY = [340, 12.6, 1.5, 71, 0.4, 12.2, 0, 0, 1, 0, 38, 29, 3.2, 126, 363, 2.6];
  var YESILLIK = [25, 2.6, 0.7, 3.7, 2, 1.6, 119, 15, 0.4, 0, 97, 160, 1.5, 47, 369, 0.5];
  var CIKOLATA = [546, 4.9, 31, 61, 48, 7, 2, 0, 0.6, 0.2, 12, 56, 8, 146, 559, 2];
  var BISKUVI = [440, 7, 12, 75, 22, 2.5, 0, 0, 1, 0, 10, 30, 2, 20, 120, 0.5];
  var KURU_SEBZE = [260, 10, 1.5, 55, 25, 20, 100, 10, 0, 0, 50, 100, 4, 100, 1500, 1];
  var YUMURTA = [143, 12.6, 9.5, 0.7, 0.4, 0, 160, 0, 1, 0.9, 47, 56, 1.75, 12, 138, 1.3];
  var SUT = [61, 3.2, 3.3, 4.8, 5, 0, 46, 0, 0.07, 0.45, 5, 113, 0.03, 10, 132, 0.4];
  var YOGURT = [61, 3.5, 3.3, 4.7, 4.7, 0, 27, 0.5, 0.06, 0.37, 7, 121, 0.05, 12, 155, 0.6];
  function kucuk(x) { return String(x).replace(/I/g, "ı").replace(/İ/g, "i").toLowerCase(); }
  function s(p, b, o) { return [p, b, o || {}]; }

  // Sıra önemli: özel olanlar (ör. "domates salçası") genel olanlardan ("domates") önce gelir.
  var TABLO = [
    // ---- yiyecek olmayanlar ve sıfır kalorililer ----
    s("yağlı kağıt|tahta şiş|kürdan|streç", Z, { x: 0, yok: 1 }),
    s("kızartma için|kızartmak için", YAG, { kizartma: 1 }),
    // ---- et suyu, jelatin (vejetaryen değil) ----
    s("sebze suyu", [5, 0.2, 0, 1, 0.5, 0, 10, 0, 0, 0, 1, 3, 0, 1, 40, 0], { d: 1, su: 1 }),
    s("et suyu|tavuk suyu|balık suyu|kemik suyu|haşlama suyu", ET_SUYU, { d: 1, f: "E" }),
    s("sebze bulyon", [250, 10, 15, 20, 5, 1, 0, 0, 0, 0, 0, 50, 1, 10, 200, 0], { t: 10, pk: 10, x: 10 }),
    s("bulyon", [250, 15, 15, 15, 3, 0, 0, 0, 0, 0, 0, 50, 1, 10, 200, 0], { t: 10, pk: 10, x: 10, f: "E" }),
    s("tart jöle", SEKER, { pk: 10 }),
    s("jelatin|" + H + "jöle", [380, 7, 0, 90, 85, 0, 0, 0, 0, 0, 0, 3, 0, 1, 5, 0], { pk: 100, f: "E" }),
    s("istiridye sosu|balık sosu", [51, 1.4, 0.3, 11, 0, 0.3, 0, 0, 0, 0.4, 15, 32, 0.2, 4, 54, 0.1], { d: 1.1, f: "E" }),
    s(H + "tuz($| )|kaya tuzu|fiske tuz|karabiber|pul biber|toz biber|kırmızı toz|isot|kimyon|kekik|kuru nane|nane yaprağı kuru|sumak$|yenibahar|tarçın|karanfil|muskat|zencefil tozu|toz zencefil|zerdeçal|safran|köri|kişniş tohumu|mahlep|damla sakızı|vanilya(?!lı)|vanilin|kabartma tozu|karbonat|defne|biberiye|adaçayı|tarhun|mercanköşk|çörek otu|baharat|çeşni|sarımsak tozu|toz hardal|beyaz biber|acı biber tozu|kırmızı biber tozu|fesleğen kuru|kekik kuru|rezene tohumu|mahlep", Z, { x: 0, d: 0.5, t: 10, pk: 10 }),
    s("gül suyu|buz|maden suyu|soda|kaynar su|sıcak su|ılık su|soğuk su|" + H + "su$|" + H + "su ya da|yeteri kadar su|yeterince su|biraz su|sade kahve|türk kahvesi|hazır kahve|granül kahve|kahve|demli çay|" + H + "çay$", Z, { x: 0, d: 1, t: 10, pk: 10, su: 1 }),
    // ---- yağlar ----
    s("kuyruk yağı|iç yağı|kuzu gömleği", [850, 1, 90, 0, 0, 0, 0, 0, 0.5, 0, 0, 1, 0.2, 1, 20, 0.1], { f: "E", x: 30 }),
    s("tereyağı|tereyağ|sade yağ", [717, 0.9, 81, 0.1, 0.1, 0, 684, 0, 2.3, 0.2, 3, 24, 0, 2, 24, 0.1], { d: 0.95, f: "S", x: 10, pk: 250 }),
    s("margarin", [717, 0.2, 80, 0.7, 0, 0, 800, 0, 10, 0, 0, 3, 0, 1, 18, 0], { d: 0.95, x: 10, pk: 250 }),
    s("zeytinyağı|zeytinyağ", [884, 0, 100, 0, 0, 0, 0, 0, 14, 0, 0, 1, 0.6, 0, 1, 0], { d: 0.92, x: 15 }),
    s("sıvı yağ|ayçiçek yağı|ayçiçeği yağı|mısırözü yağı|pamuk yağı|susam yağı|fındık yağı|" + H + "yağ$|kızartmalık yağ", YAG, { d: 0.92, x: 15 }),
    // ---- süt ürünleri ----
    s("krem şanti", [560, 6, 38, 50, 45, 0, 0, 0, 0.5, 0, 0, 120, 0.2, 10, 250, 0.4], { pk: 75, d: 0.3, f: "S" }),
    s("krem peynir|labne", [300, 6, 30, 4, 3.5, 0, 300, 0, 0.3, 0.2, 9, 98, 0.4, 9, 138, 0.5], { d: 1, f: "S", pk: 200 }),
    s("mascarpone", [429, 4.8, 44, 4.8, 4, 0, 400, 0, 0.6, 0.3, 5, 90, 0.1, 8, 100, 0.5], { d: 1, f: "S", pk: 250 }),
    s("ekşi krema|krema", [340, 2.1, 36, 2.8, 2.9, 0, 411, 0.6, 1, 0.2, 4, 65, 0, 7, 95, 0.2], { d: 1, f: "S", pk: 200, kt: 200 }),
    s("kaymak", [380, 2.5, 40, 3, 3, 0, 380, 0, 1, 0.2, 4, 70, 0, 7, 90, 0.2], { d: 1, f: "S", x: 30 }),
    s("beşamel", [150, 4, 9, 12, 5, 0.2, 60, 0, 0.4, 0.4, 5, 120, 0.2, 12, 150, 0.4], { d: 1, f: "S" }),
    s("süzme yoğurt", [97, 9, 5, 4, 4, 0, 27, 0, 0.1, 0.75, 7, 110, 0.1, 11, 141, 0.5], { d: 1.05, f: "S", kt: 500, x: 100 }),
    s("yoğurt", YOGURT, { d: 1.05, f: "S", kt: 200, x: 150 }),
    s("ayran|kefir", [36, 1.7, 1.6, 2.5, 2.5, 0, 14, 0, 0, 0.2, 4, 60, 0, 6, 78, 0.3], { d: 1, f: "S" }),
    s("dondurma", [207, 3.5, 11, 24, 21, 0.7, 118, 0.6, 0.3, 0.4, 5, 128, 0.1, 14, 199, 0.7], { d: 0.55, t: 50, f: "S" }),
    s("süt tozu", [496, 26, 27, 38, 38, 0, 260, 9, 0.6, 3.3, 37, 912, 0.5, 85, 1330, 3.3], { d: 0.5, f: "S" }),
    s("süt" + "(?!lü)", SUT, { d: 1.03, f: "S", x: 100 }),
    s("parmesan", [431, 38, 29, 4, 0.9, 0, 207, 0, 0.25, 1.2, 7, 1184, 0.8, 44, 125, 2.75], { d: 0.4, f: "S", x: 20 }),
    s("mozzarella", [280, 22, 17, 3, 1, 0, 179, 0, 0.2, 2.3, 7, 505, 0.4, 20, 76, 2.9], { d: 0.45, t: 125, f: "S", pk: 200 }),
    s("hellim", [321, 22, 25, 2, 1.5, 0, 250, 0, 0.3, 1, 10, 700, 0.3, 25, 90, 3], { dl: 30, f: "S", pk: 250 }),
    s(H + "lor|çökelek", [98, 11, 4.3, 3.4, 2.7, 0, 37, 0, 0, 0.4, 12, 83, 0.07, 8, 104, 0.4], { d: 0.6, f: "S" }),
    s("kaşar|gravyer|çedar|tulum|dil peyniri|eski kaşar", KASAR, { d: 0.45, dl: 20, f: "S", x: 30 }),
    s("peynir", PEYNIR, { d: 0.5, dl: 25, t: 30, f: "S", x: 30 }),
    s("kemalpaşa", [330, 8, 6, 62, 45, 1, 50, 0, 0.3, 0.3, 20, 120, 1, 15, 100, 0.6], { t: 25, f: "SY" }),
    // ---- yumurta, mayonez ----
    s("yumurta sarısı|yumurtanın sarısı", [322, 15.9, 26.5, 3.6, 0.6, 0, 381, 0, 2.6, 2, 146, 129, 2.7, 5, 109, 2.3], { t: 17, f: "Y" }),
    s("yumurta akı|yumurtanın akı", [52, 10.9, 0.2, 0.7, 0.7, 0, 0, 0, 0, 0.1, 4, 7, 0.1, 11, 163, 0], { t: 33, f: "Y" }),
    s("bıldırcın yumurta", YUMURTA, { t: 10, f: "Y" }),
    s("yumurta", YUMURTA, { t: 50, f: "Y" }),
    s("mayonez|tartar", [680, 1, 75, 0.6, 0.6, 0, 20, 0, 5, 0.1, 0, 8, 0.2, 1, 20, 0.1], { d: 0.95, f: "Y", x: 15 }),
    // ---- işlenmiş et ----
    s("sucuk", [450, 18, 40, 2, 1, 0, 0, 0, 0.3, 1.2, 2, 10, 1.5, 15, 280, 3], { dl: 8, t: 250, f: "E" }),
    s("sosis", [280, 11, 24, 3, 1.5, 0, 0, 0, 0.2, 1, 4, 11, 1, 12, 200, 1.5], { t: 30, pk: 250, f: "E" }),
    s("salam", [330, 14, 28, 2, 1, 0, 0, 0, 0.2, 1.4, 2, 10, 1, 15, 250, 2], { dl: 12, pk: 100, f: "E" }),
    s("jambon|füme et|dana füme|hindi füme|füme hindi", [140, 18, 6, 2, 1, 0, 0, 0, 0.2, 0.8, 4, 8, 0.9, 20, 300, 2], { dl: 15, pk: 100, f: "E" }),
    s("pastırma", [250, 30, 14, 1, 0, 0, 0, 0, 0.2, 2.5, 6, 10, 2.5, 20, 400, 5], { dl: 10, pk: 100, f: "E" }),
    s("kavurma", [350, 25, 28, 0, 0, 0, 0, 0, 0.3, 2.5, 6, 10, 2.5, 20, 300, 5], { d: 0.8, f: "E" }),
    // ---- sakatat ----
    s("tavuk ciğer|hindi ciğer", [119, 16.9, 4.8, 0.7, 0, 0, 3296, 17.9, 0.7, 16.6, 588, 8, 9, 19, 230, 2.7], { f: "E" }),
    s("ciğer|karaciğer", CIGER, { t: 400, f: "E" }),
    s("böbre", [99, 17.4, 3.1, 0.3, 0, 0, 419, 9.4, 0.2, 27.5, 98, 13, 4.6, 17, 262, 1.9], { t: 150, f: "E" }),
    s("beyin|beyni", [143, 10.9, 10.3, 0, 0, 0, 0, 10.7, 1, 9.5, 3, 10, 1.6, 12, 274, 1], { t: 120, f: "E" }),
    s("işkembe", [85, 12, 3.7, 0, 0, 0, 0, 0, 0.1, 1.4, 5, 69, 0.6, 13, 67, 1.4], { f: "E" }),
    s("akciğer|yürek", [110, 16.5, 4, 0.5, 0, 0, 10, 10, 0.3, 4, 5, 9, 4.5, 15, 260, 2], { f: "E" }),
    s("paça|kelle", [230, 20, 16, 0, 0, 0, 0, 0, 0.1, 1, 2, 20, 1.2, 10, 150, 2], { t: 250, ye: 0.4, f: "E" }),
    // ---- kıyma ----
    s("soya kıyma", [330, 50, 1, 32, 15, 18, 0, 0, 0, 0, 300, 240, 9, 290, 2400, 2.5], { d: 0.4 }),
    s("tavuk kıyma", [143, 17.4, 8.1, 0, 0, 0, 20, 0, 0.2, 0.6, 6, 6, 0.8, 21, 522, 1.5], { f: "E" }),
    s("hindi kıyma", [148, 19.7, 7.7, 0, 0, 0, 10, 0, 0.1, 1.2, 7, 21, 0.9, 22, 235, 2.4], { f: "E" }),
    s("yağsız.*kıyma|kıyma.*yağsız|az yağlı.*kıyma", [176, 20, 10, 0, 0, 0, 0, 0, 0.2, 2.6, 7, 18, 2.2, 19, 300, 4.8], { f: "E" }),
    s("yağlı.*kıyma|kuzu kıyma|koyun kıyma", [290, 16, 25, 0, 0, 0, 0, 0, 0.2, 2.3, 8, 17, 1.8, 17, 260, 4], { f: "E" }),
    s("kıyma|misket köfte", KIYMA, { f: "E", t: 25 }),
    // ---- tavuk, hindi ----
    s("tavuk göğ|piliç göğ|tavuk fileto|piliç fileto|tavuk göğüs", [120, 22.5, 2.6, 0, 0, 0, 9, 0, 0.2, 0.2, 4, 5, 0.4, 28, 334, 0.7], { t: 200, f: "E" }),
    s("hindi göğ|hindi fileto|hindi bonfile|hindi biftek|şeritlik hindi|straganofluk hindi|hindi göğüs", [114, 23.7, 1.5, 0, 0, 0, 0, 0, 0.1, 0.4, 7, 11, 0.7, 28, 300, 1.5], { t: 200, f: "E" }),
    s("hindi(?!stan)", [144, 19.5, 7, 0, 0, 0, 10, 0, 0.2, 1.2, 9, 16, 1.4, 22, 260, 3], { t: 300, ye: 0.75, f: "E" }),
    s("tavuk kanat|piliç kanat", [222, 18.3, 16, 0, 0, 0, 40, 0, 0.3, 0.3, 4, 11, 0.9, 18, 160, 1.3], { t: 90, ye: 0.6, f: "E" }),
    s("baget(?! ekmek)", [180, 18, 12, 0, 0, 0, 20, 0, 0.3, 0.3, 6, 10, 0.9, 20, 220, 2], { t: 110, ye: 0.7, f: "E" }),
    s("tavuk but|piliç but|tavuk pirzola", [180, 18, 12, 0, 0, 0, 20, 0, 0.3, 0.3, 6, 10, 0.9, 20, 220, 2], { t: 200, ye: 0.7, f: "E" }),
    s("bütün tavuk|bütün piliç|" + H + "piliç$|bıldırcın", TAVUK, { t: 1500, ye: 0.65, f: "E" }),
    s("tavuk|piliç", TAVUK, { t: 200, f: "E" }),
    // ---- balık, deniz ürünleri ----
    s("ton balığı", [198, 29, 8.2, 0, 0, 0, 23, 0, 0.9, 2.2, 5, 13, 0.65, 31, 207, 0.9], { kt: 110, f: "E" }),
    s("füme somon|füme alabalık", [117, 18.3, 4.3, 0, 0, 0, 26, 0, 1.3, 3.3, 2, 11, 0.85, 18, 175, 0.3], { dl: 15, pk: 100, f: "E" }),
    s("somon", [208, 20, 13, 0, 0, 0, 58, 0, 3.5, 3.2, 25, 9, 0.3, 27, 363, 0.4], { dl: 150, t: 200, f: "E" }),
    s("ançüez", [210, 29, 9.7, 0, 0, 0, 12, 0, 3.3, 0.9, 13, 232, 4.6, 69, 544, 2.4], { t: 4, f: "E", x: 10 }),
    s("hamsi", [131, 20.4, 4.8, 0, 0, 0, 50, 0, 0.6, 0.6, 9, 147, 3.25, 41, 383, 1.7], { ye: 0.6, t: 15, f: "E" }),
    s("sardalya", [208, 24.6, 11.5, 0, 0, 0, 32, 0, 2, 8.9, 10, 382, 2.9, 39, 397, 1.3], { ye: 0.6, t: 50, f: "E" }),
    s("uskumru|palamut|lakerda|lüfer|çinakop|kolyoz", YAGLI_BALIK, { dl: 150, ye: 0.6, t: 250, f: "E" }),
    s("alabalık", [141, 20, 6.2, 0, 0, 0, 50, 0.5, 0.2, 4.5, 13, 43, 0.3, 22, 361, 0.5], { dl: 150, ye: 0.6, t: 300, f: "E" }),
    s("balık|levrek|çipura|fener|kılıç|kefal|barbunya balığı|mezgit|kalkan|sazan|dil balığı|kırlangıç|lahoz|orfoz", BEYAZ_BALIK, { dl: 150, ye: 0.6, t: 350, f: "E" }),
    s("karides", [85, 20, 0.5, 0, 0, 0, 0, 0, 1.3, 1.1, 19, 64, 0.5, 35, 170, 1.3], { t: 15, f: "E" }),
    s("kalamar", [92, 15.6, 1.4, 3.1, 0, 0, 10, 4.7, 1.2, 1.3, 5, 32, 0.7, 33, 246, 1.5], { f: "E" }),
    s("ahtapot", [82, 14.9, 1, 2.2, 0, 0, 45, 5, 1.2, 20, 16, 53, 5.3, 30, 350, 1.7], { f: "E" }),
    s("midye", [86, 11.9, 2.2, 3.7, 0, 0, 48, 8, 0.55, 12, 42, 26, 3.95, 34, 320, 1.6], { t: 8, f: "E" }),
    s("yengeç|pavurya|istakoz", [87, 18, 1.1, 0, 0, 0, 2, 3, 1, 9, 44, 89, 0.7, 34, 329, 3.5], { f: "E" }),
    // ---- kırmızı et ----
    s("kuzu kaburga|kaburga", [300, 17, 25, 0, 0, 0, 0, 0, 0.2, 2.3, 18, 16, 1.5, 20, 250, 3.5], { ye: 0.65, f: "E" }),
    s("pirzola", KUZU, { t: 80, ye: 0.65, f: "E" }),
    s("yağsız.*(dana|kuzu|et)", [140, 22, 5.5, 0, 0, 0, 0, 0, 0.4, 2.6, 6, 12, 2.5, 22, 330, 5], { f: "E" }),
    s("kuzu|koyun", KUZU, { f: "E", t: 300 }),
    s("bonfile|biftek|antrikot|rosto|nuar|dana|incik|gerdan|bıçak|" + H + "et$|" + H + "eti($| )" + "|kuşbaşı|kırmızı et|kemikli et|" + H + "et ", DANA, { f: "E", t: 150 }),
    // ---- bakliyat, tahıl (kuru) ----
    s("kırmızı mercimek|" + H + "mercimek$", [358, 23.9, 2.2, 63.1, 1.5, 10.7, 2, 1.7, 0.5, 0, 204, 48, 7.4, 59, 578, 3.6], { d: 0.9, kuru: 1 }),
    s("mercimek", [352, 24.6, 1.1, 63.4, 2, 10.7, 2, 4.5, 0.5, 0, 479, 35, 6.5, 47, 677, 3.3], { d: 0.9, kuru: 1 }),
    s("leblebi", [368, 22, 5, 60, 1, 13, 3, 0, 0.8, 0, 200, 100, 5, 120, 800, 3], { d: 0.6 }),
    s("nohut", NOHUT, { d: 0.85, kuru: 1, kt: 240 }),
    s("kuru bakla", [341, 26, 1.5, 58, 5.7, 25, 3, 1.4, 0.05, 0, 423, 103, 6.7, 192, 1062, 3.1], { d: 0.8, kuru: 1 }),
    s("kuru bezelye", [341, 24.6, 1.2, 60, 8, 25.5, 7, 1.8, 0.1, 0, 274, 55, 4.4, 115, 981, 3], { d: 0.9, kuru: 1 }),
    s("kuru fasulye|kuru barbunya|siyah fasulye|kırmızı fasulye|barbunya konserve|haşlanmış barbunya|fincan haşlanmış barbunya", FASULYE, { d: 0.9, kuru: 1, kt: 240 }),
    s("taze barbunya|" + H + "barbunya", [120, 8, 0.5, 22, 1, 6, 0, 10, 0, 0, 100, 50, 2.5, 60, 400, 1], { d: 0.7 }),
    s("kinoa", [368, 14, 6, 64, 0, 7, 1, 0, 2.4, 0, 184, 47, 4.6, 197, 563, 3.1], { d: 0.85, kuru: 1 }),
    s("yulaf(?!lı bisküvi)", [389, 16.9, 6.9, 66, 0, 10.6, 0, 0, 0.4, 0, 56, 54, 4.7, 177, 429, 4], { d: 0.45 }),
    s("bulgur", [342, 12.3, 1.3, 76, 0.4, 12.5, 0, 0, 0.06, 0, 27, 35, 2.5, 164, 410, 1.9], { d: 0.8, kuru: 1 }),
    s("buğday(?! unu| nişasta)|dövme|yarma|firik", BUGDAY, { d: 0.8, kuru: 1 }),
    s("tarhana", [350, 13, 3, 66, 8, 4, 50, 5, 0.5, 0.3, 40, 120, 2.5, 50, 400, 1.2], { d: 0.6, f: "S" }),
    s("pirinç unu", [366, 6, 1.4, 80, 0.1, 2.4, 0, 0, 0.1, 0, 4, 10, 0.35, 35, 76, 0.8], { d: 0.6 }),
    s("haşlanmış pirinç|pirinç pilavı(?! için)", [130, 2.7, 0.3, 28, 0, 0.4, 0, 0, 0, 0, 3, 10, 0.2, 12, 35, 0.5], { d: 0.8 }),
    s("pirinç(?! sirke)", [360, 6.6, 0.6, 79.3, 0.1, 1, 0, 0, 0.1, 0, 8, 9, 0.8, 35, 86, 1.1], { d: 0.9, kuru: 1 }),
    s("mısır gevreği", [357, 7.5, 0.4, 84, 9, 3.3, 0, 0, 0, 0, 20, 5, 8, 20, 100, 0.3], { d: 0.15 }),
    s("mısır unu", [361, 6.9, 3.9, 76.9, 0.6, 7.3, 11, 0, 0.4, 0, 25, 7, 2.4, 93, 315, 1.7], { d: 0.6 }),
    s("nişasta|salep", [381, 0.3, 0.1, 91, 0, 0.9, 0, 0, 0, 0, 0, 2, 0.5, 3, 3, 0.1], { d: 0.6, pk: 50 }),
    s("galeta unu|ekmek kırıntısı|kruton", [395, 13, 5, 72, 6, 4.5, 0, 0, 0, 0, 100, 180, 4.8, 43, 196, 1.4], { d: 0.5, x: 20 }),
    s("tam buğday unu|kepekli un", [340, 13, 2.5, 72, 0.4, 10.7, 0, 0, 0.7, 0, 44, 34, 3.6, 137, 363, 2.6], { d: 0.55 }),
    s("irmik", [360, 12.7, 1, 72.8, 0, 3.9, 0, 0, 0.3, 0, 72, 17, 1.2, 47, 186, 1], { d: 0.85 }),
    s(H + "un$|" + H + "un |buğday unu|" + H + "unu$", [364, 10.3, 1, 76, 0.3, 2.7, 0, 0, 0.06, 0, 26, 15, 1.2, 22, 107, 0.7], { d: 0.55, un: 1 }),
    // ---- hamur, ekmek, makarna ----
    s("mantı", [250, 11, 7, 35, 1, 2, 10, 0, 0.3, 0.5, 30, 30, 1.5, 20, 150, 1.5], { f: "EY", pk: 500, d: 0.5 }),
    s("tortellini", [300, 13, 8, 45, 2, 2, 50, 0, 0.3, 0.5, 30, 150, 1.5, 25, 150, 1.2], { f: "SY", pk: 250 }),
    s("erişte|lazanya|noodle", [384, 14, 4.4, 71, 2, 3.3, 20, 0, 0.3, 0.1, 30, 31, 3.5, 50, 250, 1.6], { d: 0.4, pk: 500, f: "Y" }),
    s("makarna|spagetti|penne|fiyonk|burgu|rigatoni|linguine|fettuccine|tagliatelle|pappardelle|şehriye|boncuk", MAKARNA, { d: 0.45, pk: 500 }),
    s("milföy", [551, 7.3, 38, 45, 0.5, 1.5, 0, 0, 3, 0, 20, 9, 2.5, 15, 105, 0.4], { t: 70, pk: 500 }),
    s("baklava yufka|yufka|spring roll", [290, 8.5, 1.5, 60, 0.5, 2, 0, 0, 0.1, 0, 20, 15, 1.2, 20, 100, 0.6], { t: 120, pk: 500 }),
    s("güllaç", [360, 10, 1, 78, 0, 2, 0, 0, 0, 0, 10, 15, 1, 15, 80, 0.5], { t: 15 }),
    s("kadayıf", [360, 9, 2, 74, 0, 2.5, 0, 0, 0, 0, 15, 15, 1.2, 20, 100, 0.6], { pk: 500 }),
    s("bebe bisküvi|petibör|bisküvi|kakaolu bisküvi", BISKUVI, { t: 8, pk: 150, f: "S" }),
    s("kedi dili|acıbadem kurabiye", [400, 7, 8, 75, 45, 1, 50, 0, 0.5, 0.2, 10, 20, 1, 15, 100, 0.4], { t: 6, pk: 100, f: "Y" }),
    s("pandispanya|" + H + "kek$", [380, 6, 15, 55, 35, 1, 80, 0, 1, 0.3, 15, 60, 1.5, 15, 120, 0.5], { t: 300, f: "SY" }),
    s("kraker|grissini", [430, 9, 12, 70, 4, 3, 0, 0, 1, 0, 30, 30, 3, 25, 150, 0.8], { t: 4, pk: 150 }),
    s("kepekli ekmek|tam buğday ekmek|çavdar ekmek", [250, 13, 3.4, 41, 6, 6.8, 0, 0, 0.3, 0, 42, 107, 2.5, 75, 250, 1.8], { dl: 30, t: 400, d: 0.25 }),
    s("lavaş", EKMEK, { t: 70 }),
    s("etimek", EKMEK, { t: 10 }),
    s("hamburger ekme|sandviç ekme", EKMEK, { t: 60 }),
    s("tost ekme", EKMEK, { dl: 25, t: 25 }),
    s("pide|ekmek|baget|simit", EKMEK, { dl: 30, t: 250, d: 0.25 }),
    // ---- tatlandırıcılar ----
    s(H + "bal" + "(?!ık|zamik| ?kabağ)", [304, 0.3, 0, 82, 82, 0.2, 0, 0.5, 0, 0, 2, 6, 0.4, 2, 52, 0.2], { d: 1.4, f: "B", x: 20 }),
    s("pekmez", [293, 1.5, 0.1, 72, 72, 0, 0, 0, 0, 0, 0, 100, 4, 50, 1000, 0.3], { d: 1.4 }),
    s("reçel|marmelat", [278, 0.4, 0.1, 69, 48, 1, 1, 9, 0.1, 0, 10, 20, 0.5, 4, 77, 0], { d: 1.3 }),
    s("pudra şekeri", SEKER, { d: 0.6 }),
    s("şeker|lokum|pasta süsü|kokteyl kiraz|şekerleme", SEKER, { d: 0.88 }),
    s("krokan", [500, 8, 25, 63, 55, 3, 0, 0, 6, 0, 20, 60, 1.5, 70, 300, 1.2], {}),
    s("helva", [516, 12.5, 29, 55, 48, 4, 0, 0, 1, 0, 20, 40, 3.3, 150, 200, 2], {}),
    s("çikolata|kakaolu", CIKOLATA, { f: "S", pk: 80, d: 0.6 }),
    s("kakao", [228, 19.6, 13.7, 57.9, 1.8, 37, 0, 0, 0.1, 0, 32, 128, 13.9, 499, 1524, 6.8], { d: 0.45 }),
    s("kuru maya|instant maya", [325, 40, 7.6, 41, 0, 27, 0, 0, 0, 0, 2340, 30, 2.2, 54, 955, 7.9], { d: 0.6, pk: 10 }),
    s("maya", [105, 8.4, 1.9, 18, 0, 8, 0, 0, 0, 0, 1000, 20, 1.5, 20, 600, 2], { pk: 42, t: 42 }),
    // ---- yağlı tohumlar ----
    s("tahin", [595, 17, 53.8, 21, 0.5, 9.3, 3, 0, 0.25, 0, 98, 426, 8.9, 95, 414, 4.6], { d: 1, x: 15 }),
    s("hindistan cevizi", [660, 6.9, 64.5, 23.7, 7.4, 16.3, 0, 1.5, 0.4, 0, 9, 26, 3.3, 90, 543, 2], { d: 0.4 }),
    s("ceviz", [654, 15.2, 65.2, 13.7, 2.6, 6.7, 1, 1.3, 0.7, 0, 98, 98, 2.9, 158, 441, 3.1], { d: 0.5, t: 4, x: 15 }),
    s("fındık", [628, 15, 61, 16.7, 4.3, 9.7, 1, 6.3, 15, 0, 113, 114, 4.7, 163, 680, 2.5], { d: 0.65, x: 15 }),
    s("badem ezmesi|toz badem|çekilmiş badem", [579, 21, 50, 21.6, 4.4, 12.5, 0, 0, 25.6, 0, 44, 269, 3.7, 270, 733, 3.1], { d: 0.5 }),
    s("badem", [579, 21, 50, 21.6, 4.4, 12.5, 0, 0, 25.6, 0, 44, 269, 3.7, 270, 733, 3.1], { d: 0.7, t: 1.2, x: 15 }),
    s("antep fıstığı|fıstıklı|" + H + "fıstık tozu", [560, 20, 45, 27.5, 7.7, 10.6, 26, 5.6, 2.9, 0, 51, 105, 3.9, 121, 1025, 2.2], { d: 0.6, x: 10 }),
    s("yer fıstığı ezmesi|fıstık ezmesi", [588, 25, 50, 20, 9, 6, 0, 0, 9, 0, 87, 43, 1.9, 168, 649, 2.9], { d: 1, x: 15 }),
    s("yer fıstığı", [567, 25.8, 49, 16, 4, 8.5, 0, 0, 8.3, 0, 240, 92, 4.6, 168, 705, 3.3], { d: 0.6 }),
    s("çam fıstığı|dolmalık fıstık|" + H + "fıstık", [673, 13.7, 68, 13, 3.6, 3.7, 1, 0.8, 9.3, 0, 34, 16, 5.5, 251, 597, 6.4], { d: 0.65, x: 10 }),
    s("susam", [573, 17.7, 49.7, 23.4, 0.3, 11.8, 0, 0, 0.25, 0, 97, 975, 14.6, 351, 468, 7.8], { d: 0.65, x: 5 }),
    s("ayçekirdeği|ay çekirdeği", [584, 20.8, 51.5, 20, 2.6, 8.6, 3, 1.4, 35, 0, 227, 78, 5.25, 325, 645, 5], { d: 0.6 }),
    s("haşhaş", [525, 18, 42, 28, 3, 19.5, 0, 1, 1.8, 0, 82, 1438, 9.8, 347, 719, 7.9], { d: 1 }),
    s("kestane(?! mantar)", [196, 1.6, 1.3, 44, 11, 5, 1, 26, 0.5, 0, 58, 19, 0.9, 30, 484, 0.5], { t: 10 }),
    // ---- soslar, ekşiler ----
    s("biber salça", [60, 2.5, 0.5, 12, 8, 4, 400, 40, 2, 0, 20, 20, 2, 25, 500, 0.4], { d: 1.1, x: 15 }),
    s("domates salça|" + H + "salça", [82, 4.3, 0.5, 19, 12, 4.1, 76, 22, 4.3, 0, 12, 36, 3, 42, 1014, 0.6], { d: 1.1, x: 15 }),
    s("nar ekşisi", [280, 0.5, 0, 70, 60, 0, 0, 2, 0, 0, 10, 20, 1, 10, 500, 0.1], { d: 1.3, x: 10 }),
    s("sirke", [20, 0, 0, 0.6, 0.4, 0, 0, 0, 0, 0, 0, 6, 0.2, 1, 2, 0], { d: 1, x: 10 }),
    s("soya sos", [53, 8, 0.6, 4.9, 0.4, 0.8, 0, 0, 0, 0, 18, 33, 1.5, 40, 435, 0.4], { d: 1.1, x: 10 }),
    s("hardal", [66, 4.4, 4, 5.8, 3, 3.3, 5, 0.3, 0.3, 0, 7, 58, 1.6, 48, 152, 0.6], { d: 1, x: 10 }),
    s("ketçap", [101, 1, 0.1, 27, 22, 0.3, 26, 4, 1.5, 0, 9, 15, 0.4, 13, 281, 0.2], { d: 1.1, x: 15 }),
    s("pesto|fesleğen sos", [450, 5, 45, 6, 1, 2, 150, 2, 5, 0.2, 30, 180, 1.5, 50, 200, 1], { d: 1, f: "S" }),
    s("zeytin ezmesi", [250, 1.5, 25, 5, 0, 3, 20, 0, 3, 0, 0, 60, 2, 10, 30, 0.2], { d: 1, x: 15 }),
    s("tarator", [300, 5, 28, 10, 2, 2, 0, 2, 2, 0, 20, 40, 1, 40, 150, 0.8], { d: 1 }),
    s("acı sos|domates sos|domates ezmesi|domates püresi|domates suyu|menemenlik sos", [30, 1.4, 0.2, 7, 4.5, 1.5, 30, 8, 1.4, 0, 12, 18, 0.9, 18, 330, 0.2], { d: 1, kt: 400, x: 10 }),
    s("çilek sosu|çikolata sosu|karamel sos", [270, 1, 1, 65, 55, 1, 0, 2, 0, 0, 2, 20, 0.5, 15, 100, 0.2], { d: 1.3 }),
    s("beyaz şarap|kırmızı şarap|şarap", [82, 0.1, 0, 2.6, 1, 0, 0, 0, 0, 0, 0, 9, 0.3, 10, 71, 0.1], { d: 1 }),
    s("bira", [43, 0.5, 0, 3.6, 0, 0, 0, 0, 0, 0, 6, 4, 0, 6, 27, 0], { d: 1 }),
    // ---- meyve suları ----
    s("limon suyu|limonun suyu|limonun kabuk rendesi ve suyu|koruk suyu", [22, 0.4, 0.2, 6.9, 2.5, 0.3, 1, 38.7, 0.15, 0, 20, 6, 0.1, 6, 103, 0.05], { d: 1, t: 40, x: 15 }),
    s("portakal suyu|portakalın suyu", [45, 0.7, 0.2, 10.4, 8.4, 0.2, 10, 50, 0, 0, 30, 11, 0.2, 11, 200, 0.05], { d: 1, t: 80 }),
    s("nar suyu", [54, 0.15, 0.3, 13, 12.7, 0.1, 0, 0.1, 0.4, 0, 24, 11, 0.1, 7, 214, 0.1], { d: 1 }),
    s("meyve suyu|elma suyu|vişne suyu|üzüm suyu|kavun suyu", MEYVE_SUYU, { d: 1 }),
    s("kabuğu rendesi|kabuk rendesi", Z, { x: 2 }),
    // ---- kuru meyveler ----
    s("kuru kayısı|kayısı kurusu", [241, 3.4, 0.5, 62.6, 53, 7.3, 180, 1, 4.3, 0, 10, 55, 2.7, 32, 1162, 0.4], { t: 8, d: 0.6 }),
    s("kuru üzüm|kuş üzümü", [299, 3.1, 0.5, 79, 59, 3.7, 0, 2.3, 0.1, 0, 5, 50, 1.9, 32, 749, 0.2], { d: 0.75, x: 15 }),
    s("kuru incir", [249, 3.3, 0.9, 63.9, 47.9, 9.8, 0, 1.2, 0.35, 0, 9, 162, 2, 68, 680, 0.55], { t: 20 }),
    s("hurma", [282, 2.5, 0.4, 75, 63, 8, 0, 0.4, 0, 0, 19, 39, 1, 43, 656, 0.3], { t: 8 }),
    s("kurutulmuş domates|kuru domates", [258, 14, 3, 56, 38, 12, 44, 39, 0, 0, 68, 110, 9, 194, 3427, 2], { t: 5 }),
    s("kuru patlıcan|kuru biber|kuru kabak|kurutulmuş patlıcan|kurutulmuş biber|kurutulmuş taze fasulye|kuru acı biber", KURU_SEBZE, { t: 3 }),
    // ---- sebzeler ----
    s("taze soğan|yeşil soğan", [32, 1.8, 0.2, 7.3, 2.3, 2.6, 50, 19, 0.6, 0, 64, 72, 1.5, 20, 276, 0.4], { t: 15, dm: 100, x: 15 }),
    s("arpacık", [40, 1.1, 0.1, 9.3, 4.2, 1.7, 0, 7.4, 0, 0, 19, 23, 0.2, 10, 146, 0.2], { t: 25 }),
    s("soğan", [40, 1.1, 0.1, 9.3, 4.2, 1.7, 0, 7.4, 0, 0, 19, 23, 0.2, 10, 146, 0.2], { t: 120, d: 0.6, x: 30 }),
    s("sarımsak(?!lı)", [149, 6.4, 0.5, 33, 1, 2.1, 0, 31, 0.1, 0, 3, 181, 1.7, 25, 401, 1.2], { ds: 4, t: 40, x: 4 }),
    s("salatalık turşu|kornişon|turşu", [12, 0.5, 0.2, 2.3, 1.1, 1, 10, 1, 0.1, 0, 1, 44, 0.4, 4, 23, 0.1], { t: 15, d: 0.6, x: 30 }),
    s("çeri domates", [18, 0.9, 0.2, 3.9, 2.6, 1.2, 42, 14, 0.5, 0, 15, 10, 0.3, 11, 237, 0.2], { t: 15 }),
    s("domates", [18, 0.9, 0.2, 3.9, 2.6, 1.2, 42, 14, 0.5, 0, 15, 10, 0.3, 11, 237, 0.2], { t: 150, d: 0.9, kt: 400, x: 50 }),
    s("közlenmiş kırmızı|kırmızı biber|kapya|kırmızı dolmalık|sarı dolmalık|renkli biber|karışık biber|közlenmiş biber|közlenmiş çuha|çuha|kırmızı sivri", KIRMIZI_BIBER, { t: 130, d: 0.5 }),
    s("dolmalık biber|yeşil dolmalık|iri dolmalık", SIVRI, { t: 120, d: 0.5 }),
    s("sivri|çarliston|yeşil biber|acı biber|" + H + "biber", SIVRI, { t: 15, d: 0.5, x: 15 }),
    s("patlıcan", [25, 1, 0.2, 5.9, 3.5, 3, 1, 2.2, 0.3, 0, 22, 9, 0.2, 14, 229, 0.2], { t: 250 }),
    s("balkabağı|bal kabağı", [26, 1, 0.1, 6.5, 2.8, 0.5, 426, 9, 1.1, 0, 16, 21, 0.8, 12, 340, 0.3], { dl: 150, d: 0.5 }),
    s("kabak", [17, 1.2, 0.3, 3.1, 2.5, 1, 10, 17.9, 0.1, 0, 24, 16, 0.4, 18, 261, 0.3], { t: 200, d: 0.5 }),
    s("havuç", [41, 0.9, 0.2, 9.6, 4.7, 2.8, 835, 5.9, 0.7, 0, 19, 33, 0.3, 12, 320, 0.2], { t: 80, d: 0.5 }),
    s("patates", [77, 2, 0.1, 17, 0.8, 2.2, 0, 19.7, 0, 0, 15, 12, 0.8, 23, 425, 0.3], { t: 170, d: 0.6 }),
    s("ıspanak", [23, 2.9, 0.4, 3.6, 0.4, 2.2, 469, 28, 2, 0, 194, 99, 2.7, 79, 558, 0.5], { dm: 250, d: 0.15 }),
    s("pazı", [19, 1.8, 0.2, 3.7, 1.1, 1.6, 306, 30, 1.9, 0, 14, 51, 1.8, 81, 379, 0.4], { dm: 300, d: 0.15, t: 30 }),
    s("semizotu", [20, 2, 0.4, 3.4, 0, 0, 66, 21, 0, 0, 12, 65, 2, 68, 494, 0.2], { dm: 250, d: 0.15 }),
    s("maydanoz", [36, 3, 0.8, 6.3, 0.9, 3.3, 421, 133, 0.75, 0, 152, 138, 6.2, 50, 554, 1.1], { dm: 60, d: 0.3, dl: 3, x: 10, tutam: 5 }),
    s("dereotu", [43, 3.5, 1.1, 7, 0, 2.1, 386, 85, 0, 0, 150, 208, 6.6, 55, 738, 0.9], { dm: 50, d: 0.3, dl: 3, x: 8, tutam: 5 }),
    s("taze nane|nane", [70, 3.8, 0.9, 15, 0, 8, 212, 31.8, 0, 0, 114, 243, 5, 80, 569, 1.1], { dm: 40, d: 0.25, dl: 2, x: 5, tutam: 3 }),
    s("roka|tere|kişniş|fesleğen|marul yaprakları", YESILLIK, { dm: 80, d: 0.2, x: 15, dl: 2 }),
    s("marul|kıvırcık|göbek", [15, 1.4, 0.2, 2.9, 0.8, 1.3, 370, 9.2, 0.2, 0, 38, 36, 0.9, 13, 194, 0.2], { t: 400, d: 0.25, x: 30 }),
    s("brüksel", [43, 3.4, 0.3, 9, 2.2, 3.8, 38, 85, 0.9, 0, 61, 42, 1.4, 23, 389, 0.4], { t: 15 }),
    s("mor lahana|kırmızı lahana", [31, 1.4, 0.2, 7.4, 3.8, 2.1, 56, 57, 0.1, 0, 18, 45, 0.8, 16, 243, 0.2], { t: 1000, d: 0.35 }),
    s("lahana", [25, 1.3, 0.1, 5.8, 3.2, 2.5, 5, 36.6, 0.2, 0, 43, 40, 0.5, 12, 170, 0.2], { t: 1200, d: 0.35 }),
    s("karnabahar", [25, 1.9, 0.3, 5, 1.9, 2, 0, 48, 0.1, 0, 57, 22, 0.4, 15, 299, 0.3], { t: 700 }),
    s("brokoli", [34, 2.8, 0.4, 6.6, 1.7, 2.6, 31, 89, 0.8, 0, 63, 47, 0.7, 21, 316, 0.4], { t: 400, d: 0.4 }),
    s("pırasa", [61, 1.5, 0.3, 14, 3.9, 1.8, 83, 12, 0.9, 0, 64, 59, 2.1, 28, 180, 0.1], { t: 200 }),
    s("kereviz sap|sap kereviz|kereviz yaprağı|bambu", [16, 0.7, 0.2, 3, 1.3, 1.6, 22, 3, 0.3, 0, 36, 40, 0.2, 11, 260, 0.1], { t: 40, sap: 40, d: 0.5 }),
    s("kereviz", [42, 1.5, 0.3, 9.2, 1.6, 1.8, 0, 8, 0.4, 0, 8, 43, 0.7, 20, 300, 0.3], { t: 400 }),
    s("salatalık", [15, 0.7, 0.1, 3.6, 1.7, 0.5, 5, 2.8, 0, 0, 7, 16, 0.3, 13, 147, 0.2], { t: 150 }),
    s("turp", [16, 0.7, 0.1, 3.4, 1.9, 1.6, 0, 14.8, 0, 0, 25, 25, 0.3, 10, 233, 0.3], { t: 40 }),
    s("pancar", [43, 1.6, 0.2, 9.6, 6.8, 2.8, 2, 4.9, 0, 0, 109, 16, 0.8, 23, 325, 0.4], { t: 200 }),
    s("enginar", [47, 3.3, 0.2, 10.5, 1, 5.4, 1, 11.7, 0.2, 0, 68, 44, 1.3, 60, 370, 0.5], { t: 120 }),
    s("bamya", [33, 1.9, 0.2, 7.5, 1.5, 3.2, 36, 23, 0.3, 0, 60, 82, 0.6, 57, 299, 0.6], { d: 0.5 }),
    s("taze fasulye|çalı fasulye|fasulye", [31, 1.8, 0.2, 7, 3.3, 2.7, 35, 12.2, 0.4, 0, 33, 37, 1, 25, 211, 0.2], { d: 0.5 }),
    s("bezelye", [81, 5.4, 0.4, 14.5, 5.7, 5.1, 38, 40, 0.1, 0, 65, 25, 1.5, 33, 244, 1.2], { d: 0.7, kt: 220 }),
    s("bakla", [88, 7.9, 0.7, 17.6, 1, 7.5, 10, 33, 0.1, 0, 148, 37, 1.9, 33, 332, 1], { d: 0.7 }),
    s("mısır", [86, 3.3, 1.4, 19, 6.3, 2, 9, 6.8, 0.1, 0, 42, 2, 0.5, 37, 270, 0.5], { d: 0.75, kt: 220, t: 250 }),
    s("mantar", [22, 3.1, 0.3, 3.3, 2, 1, 0, 2, 0, 0.04, 17, 3, 0.5, 9, 318, 0.5], { t: 20, pk: 300, d: 0.35 }),
    s("asma yaprağı|yaprak sarma", [93, 5.6, 2.1, 17, 6, 11, 1376, 11, 2, 0, 83, 363, 2.6, 95, 272, 0.7], { t: 3 }),
    s("kuşkonmaz", [20, 2.2, 0.1, 3.9, 1.9, 2.1, 38, 5.6, 1.1, 0, 52, 24, 2.1, 14, 202, 0.5], { dm: 250, t: 20 }),
    s("soya filiz|filiz", [30, 3, 0.2, 6, 4, 1.8, 1, 13, 0.1, 0, 61, 13, 0.9, 21, 149, 0.4], { d: 0.4 }),
    s("avokado", [160, 2, 14.7, 8.5, 0.7, 6.7, 7, 10, 2.1, 0, 81, 12, 0.6, 29, 485, 0.6], { t: 150 }),
    s("yeşil zeytin", [145, 1, 15, 3.8, 0.5, 3.3, 20, 0, 3.8, 0, 3, 52, 0.5, 11, 42, 0.04], { t: 4, d: 0.6, x: 20 }),
    s("zeytin", [115, 0.8, 10.7, 6.3, 0, 3.2, 20, 0.9, 1.65, 0, 0, 88, 3.3, 4, 8, 0.2], { t: 4, d: 0.6, x: 20 }),
    s("kapari", [23, 2.4, 0.9, 4.9, 0.4, 3.2, 7, 4, 0.9, 0, 23, 40, 1.7, 33, 40, 0.3], { d: 0.6, x: 5 }),
    s("şalgam", [28, 0.9, 0.1, 6.4, 3.8, 1.8, 0, 21, 0, 0, 15, 30, 0.3, 11, 191, 0.3], { t: 150 }),
    s("rezene", [31, 1.2, 0.2, 7.3, 3.9, 3.1, 48, 12, 0.6, 0, 27, 49, 0.7, 17, 414, 0.2], { t: 250 }),
    s("zencefil", [80, 1.8, 0.8, 17.8, 1.7, 2, 0, 5, 0.3, 0, 11, 16, 0.6, 43, 415, 0.3], { t: 15, x: 5 }),
    s("karışık sebze|garnitür|sebze", [60, 3, 0.4, 12, 3, 4, 300, 12, 0.4, 0, 40, 30, 0.8, 20, 200, 0.4], { d: 0.7, kt: 220, pk: 450 }),
    // ---- meyveler ----
    s("limon", [29, 1.1, 0.3, 9.3, 2.5, 2.8, 1, 53, 0.15, 0, 11, 26, 0.6, 8, 138, 0.06], { t: 40, x: 15 }),
    s("portakal", [47, 0.9, 0.1, 11.8, 9.4, 2.4, 11, 53, 0.2, 0, 30, 40, 0.1, 10, 181, 0.07], { t: 180 }),
    s("mandalina", [53, 0.8, 0.3, 13.3, 10.6, 1.8, 34, 26.7, 0.2, 0, 16, 37, 0.15, 12, 166, 0.1], { t: 80 }),
    s("greyfurt", [42, 0.8, 0.1, 10.7, 6.9, 1.6, 58, 31, 0.1, 0, 13, 22, 0.1, 9, 135, 0.1], { t: 250 }),
    s("elma", [52, 0.3, 0.2, 13.8, 10.4, 2.4, 3, 4.6, 0.2, 0, 3, 6, 0.1, 5, 107, 0], { t: 180, d: 0.6 }),
    s("armut", [57, 0.4, 0.1, 15, 9.8, 3.1, 1, 4.3, 0.1, 0, 7, 9, 0.2, 7, 116, 0.1], { t: 170 }),
    s("ayva", [57, 0.4, 0.1, 15.3, 12, 1.9, 2, 15, 0, 0, 3, 11, 0.7, 8, 197, 0], { t: 250 }),
    s("muz", [89, 1.1, 0.3, 22.8, 12.2, 2.6, 3, 8.7, 0.1, 0, 20, 5, 0.3, 27, 358, 0.15], { t: 120 }),
    s("çilek", [32, 0.7, 0.3, 7.7, 4.9, 2, 1, 58.8, 0.3, 0, 24, 16, 0.4, 13, 153, 0.1], { t: 12, d: 0.6 }),
    s("vişne", [50, 1, 0.3, 12.2, 8.5, 1.6, 64, 10, 0.1, 0, 8, 16, 0.3, 9, 173, 0.1], { d: 0.65, t: 5 }),
    s("kiraz", [63, 1.1, 0.2, 16, 12.8, 2.1, 3, 7, 0.1, 0, 4, 13, 0.4, 11, 222, 0.1], { d: 0.65, t: 6 }),
    s("üzüm", [69, 0.7, 0.2, 18, 15.5, 0.9, 3, 3.2, 0.2, 0, 2, 10, 0.4, 7, 191, 0.1], { d: 0.65 }),
    s("kavun", [34, 0.8, 0.2, 8.2, 7.9, 0.9, 169, 36.7, 0.05, 0, 21, 9, 0.2, 12, 267, 0.2], { t: 1500, dl: 150 }),
    s("karpuz", [30, 0.6, 0.2, 7.6, 6.2, 0.4, 28, 8.1, 0.05, 0, 3, 7, 0.2, 10, 112, 0.1], { t: 4000, dl: 300, d: 0.6 }),
    s("şeftali", [39, 0.9, 0.3, 9.5, 8.4, 1.5, 16, 6.6, 0.7, 0, 4, 6, 0.25, 9, 190, 0.2], { t: 150 }),
    s("kayısı", [48, 1.4, 0.4, 11, 9, 2, 96, 10, 0.9, 0, 9, 13, 0.4, 10, 259, 0.2], { t: 40 }),
    s("erik", [46, 0.7, 0.3, 11.4, 9.9, 1.4, 17, 9.5, 0.3, 0, 5, 6, 0.2, 7, 157, 0.1], { t: 30 }),
    s(H + "nar", [83, 1.7, 1.2, 18.7, 13.7, 4, 0, 10.2, 0.6, 0, 38, 10, 0.3, 12, 236, 0.35], { t: 150, d: 0.7, x: 20 }),
    s("kivi", [61, 1.1, 0.5, 14.7, 9, 3, 4, 92.7, 1.5, 0, 25, 34, 0.3, 17, 312, 0.1], { t: 75 }),
    s("ananas", [50, 0.5, 0.1, 13, 9.9, 1.4, 3, 47.8, 0, 0, 18, 13, 0.3, 12, 109, 0.1], { dl: 40, t: 900, kt: 400 }),
    s("ahududu|frambuaz|böğürtlen|yaban mersini", [52, 1.2, 0.7, 12, 4.4, 6.5, 2, 26, 0.9, 0, 21, 25, 0.7, 22, 151, 0.4], { d: 0.6 }),
    s("meyve", MEYVE, { d: 0.65, t: 150 })
  ];
  var BESIN = ["kcal", "p", "y", "k", "s", "lif", "A", "C", "E", "B12", "fol", "Ca", "Fe", "Mg", "K", "Zn"];
  // Günlük referans değerler (AB beslenme etiketi NRV): bir porsiyonda %15 ve üstü = "iyi kaynak"
  var NRV = { A: [800, "A vitamini"], C: [80, "C vitamini"], E: [12, "E vitamini"], B12: [2.5, "B12 vitamini"], fol: [200, "Folat (B9)"],
              Ca: [800, "Kalsiyum"], Fe: [14, "Demir"], Mg: [375, "Magnezyum"], K: [2000, "Potasyum"], Zn: [10, "Çinko"] };
  TABLO.forEach(function (t) { t[0] = new RegExp(t[0]); });

  // ---------- miktar okuma ----------
  var SAYILAR = { bir: 1, iki: 2, "üç": 3, "dört": 4, "beş": 5, "altı": 6, yedi: 7, sekiz: 8, dokuz: 9, on: 10, "yirmi": 20, otuz: 30, "kırk": 40, elli: 50, "yüz": 100 };
  // [kalıp, tür, değer]  tür: ml (hacim), g (ağırlık), yoksa özel birim
  var OLCULER = [
    [/^su bardağı/, "ml", 200], [/^çay bardağı/, "ml", 100], [/^(kahve )?fincan[ıi]?/, "ml", 70], [/^kase|^çorba kasesi/, "ml", 250],
    [/^yemek kaşığı/, "ml", 15], [/^tatlı kaşığı/, "ml", 7], [/^çay kaşığı/, "ml", 3], [/^kaşık/, "ml", 15],
    [/^(kilogram|kilo|kg)(?=[\s.]|$)/, "g", 1000], [/^(gram|gr|g)(?=[\s.]|$)\.?/, "g", 1], [/^(litre|lt|l)(?=[\s.]|$)/, "ml", 1000], [/^ml(?=[\s.]|$)/, "ml", 1],
    [/^paket/, "pk"], [/^kutu|^konserve/, "kt"], [/^demet|^bağ/, "dm"], [/^diş/, "ds"], [/^dilim/, "dl"], [/^dal|^yaprak|^sap/, "dl"],
    [/^tutam/, "tutam"], [/^avuç/, "ml", 60], [/^tabak|^yemek tabağı/, "ml", 300], [/^top/, "t"], [/^küp/, "t"],
    [/^(tane|adet)/, "t"], [/^(büyük|iri)( boy)?(?=\s|$)/, "t", 1.3], [/^(küçük|ufak)( boy)?(?=\s|$)/, "t", 0.7], [/^orta( boy)?(?=\s|$)/, "t", 1],
    [/^damla(?! sakız)/, "g", 0.05]
  ];
  function sayiOku(m) {   // baştaki miktarı okur → { n, kalan }
    var s = m, n = null, r;
    s = s.replace(/^parmak eksik\s*/, function () { n = -0.9; return ""; });
    var carp = n === -0.9 ? 0.9 : 1; n = null;
    if ((r = /^(\d+(?:[.,]\d+)?)\s*[-–]\s*(\d+(?:[.,]\d+)?)/.exec(s))) { n = (parseFloat(r[1].replace(",", ".")) + parseFloat(r[2].replace(",", "."))) / 2; s = s.slice(r[0].length); }
    else if ((r = /^(\d+)\s*\/\s*(\d+)/.exec(s))) { n = +r[1] / +r[2]; s = s.slice(r[0].length); }
    else if ((r = /^(\d+(?:[.,]\d+)?)/.exec(s))) { n = parseFloat(r[1].replace(",", ".")); s = s.slice(r[0].length); }
    else if ((r = /^(üç çeyrek)/.exec(s))) { n = 0.75; s = s.slice(r[0].length); }
    else if ((r = /^(üçte bir)/.exec(s))) { n = 1 / 3; s = s.slice(r[0].length); }
    else if ((r = /^(üçte iki)/.exec(s))) { n = 2 / 3; s = s.slice(r[0].length); }
    else if ((r = /^yarım/.exec(s))) { n = 0.5; s = s.slice(r[0].length); }
    else if ((r = /^çeyrek/.exec(s))) { n = 0.25; s = s.slice(r[0].length); }
    else if ((r = /^birkaç/.exec(s))) { n = 3; s = s.slice(r[0].length); }
    else if ((r = /^([a-zçğıöşü]+)\s/.exec(s)) && SAYILAR[r[1]]) { n = SAYILAR[r[1]]; s = s.slice(r[1].length); }
    s = s.trim();
    if (n !== null && (r = /^(buçuk|½)\s*/.exec(s))) { n += 0.5; s = s.slice(r[0].length); }
    if (n !== null && (r = /^(ve )?yarım\s*/.exec(s)) && /^(su|çay|yemek|tatlı|kilo)/.test(s.slice(r[0].length))) { n += 0.5; s = s.slice(r[0].length); }
    return { n: n === null ? null : n * carp, kalan: s };
  }

  var bellek = {};   // aynı malzeme adını bir kere eşleştir
  function besinBul(ad) {
    if (bellek.hasOwnProperty(ad)) return bellek[ad];
    var ilk = /yumurta/.test(ad) ? ad : ad.split(/ ya da | veya | yada |\(/)[0].trim();
    var b = null;
    for (var i = 0; i < TABLO.length; i++) if (TABLO[i][0].test(ilk)) { b = TABLO[i]; break; }
    if (!b && ilk !== ad) for (i = 0; i < TABLO.length; i++) if (TABLO[i][0].test(ad)) { b = TABLO[i]; break; }
    bellek[ad] = b;
    return b;
  }

  // Bir malzeme satırını gram + besin satırına çevirir
  var satirBellek = {};
  function satirOku(satir) {
    if (!satirBellek.hasOwnProperty(satir)) satirBellek[satir] = satirOkuAsil(satir);
    return satirBellek[satir];
  }
  function satirOkuAsil(satir) {
    var metin = kucuk(satir.split("|")[0]).replace(/\s+/g, " ").trim();
    var o = sayiOku(metin), n = o.n, kalan = o.kalan, tur = null, deger = 1;
    for (var i = 0; i < OLCULER.length; i++) {
      var r = OLCULER[i][0].exec(kalan);
      if (r) { tur = OLCULER[i][1]; deger = OLCULER[i][2] || 1; kalan = kalan.slice(r[0].length).trim(); break; }
    }
    // "1 tane büyük patates" → tane + büyük
    var boy = 1, rb = /^(büyük|iri)( boy)?\s|^(küçük|ufak)( boy)?\s|^orta( boy)?\s/.exec(kalan);
    if (rb) { boy = rb[1] ? 1.3 : rb[3] ? 0.7 : 1; kalan = kalan.slice(rb[0].length); }
    if (tur === "t" && deger !== 1) { boy = deger; deger = 1; }
    var ad = kalan.replace(/^(için|kadar)\s/, "");
    var b = /kızart(ma|mak) için/.test(metin) && /yağ/.test(metin) ? TABLO[1] : besinBul(ad.replace(/^(ceviz|fındık) büyüklüğünde /, ""));
    if (!b) return { metin: metin, b: null, g: 0 };
    var op = b[2], g;
    if (op.yok) return { metin: metin, b: b, g: 0 };
    if (op.kizartma) return { metin: metin, b: b, g: 0, kizartma: true };
    var miktarsiz = n === null;
    if (miktarsiz && /(aldığı|alabildiği|yeteri|yetecek|yapışmayacak|kıvamına).*kadar|kadar/.test(metin) && op.un) return { metin: metin, b: b, g: 0, unKadar: true };
    if (n === null) n = 1;
    if (tur === "ml") g = n * deger * (op.d || 1);
    else if (tur === "g") g = n * deger;
    else if (tur === "pk") g = n * (op.pk || op.t || 100);
    else if (tur === "kt") g = n * (op.kt || op.pk || 400);
    else if (tur === "dm") g = n * (op.dm || 50);
    else if (tur === "ds") g = n * (op.ds || 4);
    else if (tur === "dl") g = n * (op.dl || op.sap || 20);
    else if (tur === "tutam") g = n * (op.tutam || 1);
    else if (tur === "t") g = n * (/fileto/.test(metin) && op.ye ? 150 : (op.t || op.x || 50)) * boy;
    else if (miktarsiz) g = op.x !== undefined ? op.x : 20;
    else g = n * (op.t || op.x || 50) * boy;      // "2 yumurta", "3 domates"
    // kemik, kılçık, kabuk
    if (op.ye && !/fileto|kemiksiz|bonfile|ayıklanmış|temizlenmiş|iç|derisiz|kılçıksız/.test(metin)) g *= op.ye;
    if (/kemikli/.test(metin)) g *= 0.75;
    if (/kabuklu/.test(metin) && /midye|karides/.test(metin)) g *= 0.4;
    // pişmiş bakliyat/tahıl su çekmiştir
    var oran = 1;
    if (op.kuru && /haşlanmış|pişmiş|konserve|haşlanmış/.test(metin)) oran = 0.4;
    return { metin: metin, b: b, g: g, oran: oran, miktarsiz: miktarsiz };
  }

  function bos() { var o = {}; BESIN.forEach(function (k) { o[k] = 0; }); return o; }
  function ekle(top, b, g) { for (var i = 0; i < BESIN.length; i++) top[BESIN[i]] += b[i] * g / 100; }

  // ---------- tarif başına hesap ----------
  function besinHesapla(t) {
    var top = bos(), agirlik = 0, sivi = 0, kuruAgirlik = 0, suAgirlik = 0, kizartma = false, unKadar = false, bulunamayan = [], flag = "";
    var satirlar = (t.m || []).filter(function (s) { return s.charAt(0) !== "#"; });
    // Adı/yapılışı kızartma diyorsa, miktarı yazılmamış sıvı yağ kızartma yağıdır
    var kizartmali = /kızartma|kızartması|tava$|tavası|cips/.test(kucuk(t.ad || "")) || /kızgın yağ|bol yağ|derin yağ/.test(kucuk((t.y || []).join(" ")));
    satirlar.forEach(function (s) {
      var o = satirOku(s);
      if (!o.b) { bulunamayan.push(o.metin); return; }
      flag += o.b[2].f || "";
      if (o.kizartma || (kizartmali && o.miktarsiz && o.b[1] === YAG)) { kizartma = true; return; }
      if (o.unKadar) { unKadar = o.b; return; }
      ekle(top, o.b[1], o.g * (o.oran || 1));
      var gr = o.g;
      if (o.b[2].kuru && (o.oran || 1) === 1) kuruAgirlik += gr;
      if (o.b[2].su || /suyu|et suyu/.test(o.metin)) suAgirlik += gr;
      agirlik += gr;
      if (/(^|[^a-zçğıöşü])(su|süt|yoğurt|suyu)($|[^a-zçğıöşü])/.test(o.metin) && !/salça|ekşi/.test(o.metin)) sivi += gr;
    });
    // Kuru bakliyat/tahıl pişerken ~2,5 katı su çeker; tarifte su yazmıyorsa ağırlığa ekle (sadece doyuruculuk için)
    if (kuruAgirlik * 1.5 > suAgirlik) agirlik += kuruAgirlik * 1.5 - suAgirlik;
    // "aldığı kadar un": hamurda un ≈ sıvının 1,6 katı (100–700 g arası)
    if (unKadar) { var ug = Math.max(100, Math.min(700, sivi * 1.6 || 300)); ekle(top, unKadar[1], ug); agirlik += ug; }
    // Kızartma: hamura/sebzeye çekilen yağ ≈ kızartılan malzemenin %10'u (30–120 g)
    if (kizartma) { var yg = Math.max(30, Math.min(120, agirlik * 0.1)); ekle(top, YAG, yg); agirlik += yg; }
    var kisi = Math.max(1, +t.kisi || 4), p = {};
    BESIN.forEach(function (k) { p[k] = top[k] / kisi; });
    p.gram = agirlik / kisi;
    // Vitamin ve mineraller: porsiyonda günlük ihtiyacın %15'i ve fazlası
    var kaynak = Object.keys(NRV).map(function (k) { return { ad: NRV[k][1], yuzde: Math.round(p[k] / NRV[k][0] * 100) }; })
      .filter(function (v) { return v.yuzde >= 15; }).sort(function (a, b) { return b.yuzde - a.yuzde; });
    // Besleyicilik (besin yoğunluğu): porsiyonun karşıladığı günlük ihtiyaç yüzdesi, kalorisinin günlük
    // enerjiye (2000 kcal) oranından büyük olan besin öğesi sayısı. Protein (50 g) ve lif (25 g) dahil.
    var enerjiPayi = Math.max(15, p.kcal / 2000 * 100), puan = 0;
    Object.keys(NRV).forEach(function (k) { if (p[k] / NRV[k][0] * 100 >= enerjiPayi) puan++; });
    if (p.p / 50 * 100 >= enerjiPayi) puan++;
    if (p.lif / 25 * 100 >= enerjiPayi) puan++;
    var besleyici = puan >= 6 ? 3 : puan >= 3 ? 2 : 1;
    if (p.s > 25 && besleyici > 1) besleyici--;   // çok şekerli
    // Doyuruculuk: "Fullness Factor" formülü (100 gramda kalori, protein, lif, yağ) + porsiyonun kalorisi
    var c = p.gram > 0 ? 100 / p.gram : 0, cal = p.kcal * c, pr = p.p * c, lf = p.lif * c, yg2 = p.y * c;
    var ff = cal > 0 ? Math.max(0.5, Math.min(5, 41.7 / Math.pow(cal, 0.7) + 0.05 * pr + 6.17e-4 * Math.pow(lf, 3) - 7.25e-6 * Math.pow(yg2, 3) + 0.617)) : 0;
    var doyurucu = ff >= 3 ? 3 : ff >= 2 ? 2 : 1;
    if (p.kcal < 120) doyurucu = Math.min(doyurucu, 1);
    else if (p.kcal < 220) doyurucu = Math.min(doyurucu, 2);
    if (p.p >= 20 && p.kcal >= 300 && doyurucu < 3) doyurucu++;
    return {
      kisi: kisi, kcal: Math.round(p.kcal / 5) * 5, protein: Math.round(p.p), yag: Math.round(p.y), karb: Math.round(p.k), seker: Math.round(p.s), lif: Math.round(p.lif * 10) / 10,
      gram: Math.round(p.gram), kaynak: kaynak, besleyici: besleyici, doyurucu: doyurucu, ff: ff, kizartma: kizartma,
      flag: flag, bulunamayan: bulunamayan, tamMi: bulunamayan.length === 0
    };
  }

  // ---------- diyet etiketleri ----------
  // Vejetaryen: et, tavuk, balık, deniz ürünü, et/tavuk suyu, jelatin yok
  // Vegan: ayrıca süt ürünü, yumurta ve bal yok
  // Diyet: porsiyon kalorisi kategorisine göre düşük, kızartma yok, enerji yoğunluğu düşük, şekeri az
  var DIYET_SINIR = { "Çorba": 220, "Ana Yemek": 450, "Deniz Mahsulleri": 450, "Dünya Mutfağı": 450, "İtalyan Mutfağı": 450, "Fransız Mutfağı": 450, "Asya Mutfağı": 450,
    "Pilav & Makarna": 350, "Salata": 250, "Meze": 200, "Zeytinyağlı": 250, "Kahvaltılık": 300, "Ara Sıcak": 250, "Aperatifler": 200, "Hamur İşi": 250, "Tatlı": 200 };
  function diyetEtiketleri(t, b, pis) {
    b = b || besinHesapla(t); pis = pis || pisirmeTurleri(t);
    var e = [], ad = kucuk(t.ad || "");
    if (t.kat === "İçecekler") return e;
    var etli = /E/.test(b.flag);
    if (!etli) e.push("Vejetaryen");
    if (!etli && !/[SYB]/.test(b.flag)) e.push("Vegan");
    var sinir = DIYET_SINIR[t.kat] || 350;
    var yogunluk = b.gram > 0 ? b.kcal / b.gram : 9;
    if (b.tamMi && b.kcal > 0 && pis.indexOf("Kızartma") < 0 && b.kcal <= sinir && !b.kizartma && !/kızartma|tava$|tavası|cips|kızarmış/.test(ad) &&
        yogunluk <= (t.kat === "Tatlı" ? 2 : 1.6) && b.yag * 9 <= b.kcal * 0.55 && b.seker <= (t.kat === "Tatlı" ? 20 : 12)) e.push("Diyet");
    return e;
  }

  // ---------- öğün ----------
  function ogunler(t) {
    var ad = kucuk(t.ad || ""), k = t.kat, o = [];
    var anaYemekMi = /Çorba|Ana Yemek|Deniz|Mutfağı|Pilav|Zeytinyağlı/.test(k);
    var kahvalti = k === "Kahvaltılık" || !anaYemekMi && /menemen|omlet|yumurta|kahvaltı|pankek|krep|gözleme|pişi|poğaça|simit|börek|böreğ|açma|tost|reçel|sucuklu|çılbır|kaygana|muhlama|kuymak|mıhlama|granola|smoothie|peynir tabağı/.test(ad);
    var cay = /kurabiye|kek|poğaça|açma|börek|böreğ|pasta|tart|kraker|çubuk|kurabiy|muffin|brownie|cookie|sufle|turta|galeta|çörek|bisküvi|pişi|gözleme|sandviç|tost|limonata|kahve|şerbet|milkshake|smoothie|tiramisu|cheesecake|mozaik|islak/.test(ad);
    if (kahvalti) o.push("Kahvaltı");
    if (/Çorba|Ana Yemek|Deniz|Mutfağı|Pilav|Zeytinyağlı|Salata|Meze|Ara Sıcak/.test(k) && !(k === "Kahvaltılık")) { o.push("Öğle"); o.push("Akşam"); }
    else if (k === "Hamur İşi") { if (!kahvalti) o.push("Öğle"); if (/pide|lahmacun|mantı|pizza|lazanya|erişte|içli köfte/.test(ad)) { o.push("Akşam"); } }
    else if (k === "Aperatifler") o.push("Çay saati");
    if (k === "Tatlı" || k === "İçecekler" || (k === "Hamur İşi" && cay) || (k !== "Ana Yemek" && cay)) o.push("Çay saati");
    if (k === "Tatlı" && /sütlaç|muhallebi|kazandibi|baklava|künefe|helva|revani|şekerpare|tulumba|güllaç|aşure|kadayıf/.test(ad)) o.push("Akşam (tatlı)");
    if (!o.length) o.push(k === "Kahvaltılık" ? "Kahvaltı" : "Öğle", "Akşam");
    return o.filter(function (v, i) { return o.indexOf(v) === i; });
  }

  // ---------- pişirme türü ----------
  var PISIRME = [
    ["Airfryer", /airfryer|air fryer/],
    ["Tost makinesi", /tost makine/],
    ["Kahve makinesi", /kahve makine|espresso|french press|filtre kahve/],
    ["Döküm tava", /döküm/],
    ["Fırın", /fırın/],
    ["Izgara", /ızgara|mangal|közle|şiş/],
    ["Kızartma", /kızartma için|kızartmak için|kızgın yağ|bol yağda|derin yağ|bol sıvı yağda|yağda kızart|kızartma$|kızartması|tava$|tavası|cips/],
    ["Tava", /tava|wok|sote/],
    ["Tencere", /tencere|haşla|kaynat|pişir|demle|düdüklü|güveç|kısık ateş|ocak|kavur|pembeleştir|kızdır|söndür|sotele|cezve|sos yap/]
  ];
  function pisirmeTurleri(t) {
    var ad = kucuk(t.ad || "");
    var metin = ad + " " + kucuk((t.e || []).join(" ")) + " " + kucuk((t.y || []).join(" ")) + " " + kucuk((t.m || []).map(function (x) { return x.split("|")[0]; }).join(" "));
    var bulunan = PISIRME.filter(function (p) { return p[1].test(metin); }).map(function (p) { return p[0]; });
    if (bulunan.indexOf("Kızartma") >= 0) bulunan = bulunan.filter(function (x) { return x !== "Tava" || /tavada|tavası|tava$/.test(ad); });
    if (bulunan.indexOf("Döküm tava") >= 0) bulunan = bulunan.filter(function (x) { return x !== "Tava"; });
    // Tencere çok genel bir kelime; fırın/ızgara/kızartma tarifinde sadece sos için geçiyorsa yazma
    if (bulunan.length > 1 && bulunan.indexOf("Tencere") >= 0 && !/tencere|haşla|kaynat|güveç|düdüklü/.test(metin)) bulunan = bulunan.filter(function (x) { return x !== "Tencere"; });
    if (!bulunan.length) bulunan = ["Pişirme yok"];
    return bulunan.slice(0, 3);
  }

  // ---------- hazırlama süresi aralığı ----------
  function sureDk(sure) {
    var s = kucuk(sure || ""), saat = s.match(/(\d+(?:[.,]\d+)?)\s*saat/), dk = s.match(/(\d+)\s*(dk|dakika)/), bucuk = /buçuk saat/.test(s);
    var top = (saat ? parseFloat(saat[1].replace(",", ".")) * 60 : 0) + (dk ? +dk[1] : 0) + (bucuk && !saat ? 90 : bucuk ? 30 : 0);
    return top || null;
  }
  function sureAraligi(t) {
    var d = sureDk(t.sure); if (!d) return null;
    var ek = /marine|ıslatma|bekle|dinlen|soğuma|gece|mayala/.test(kucuk(t.sure || "")) ? " + bekleme" : "";
    var a = d <= 15 ? "10-15 dk" : d <= 30 ? "15-30 dk" : d <= 45 ? "30-45 dk" : d <= 60 ? "45-60 dk" : d <= 75 ? "60-75 dk" : d <= 90 ? "75-90 dk" : "90 dk üzeri";
    return a + ek;
  }

  function tarifBilgisi(t) {
    var b = besinHesapla(t), pis = pisirmeTurleri(t);
    return { besin: b, diyet: diyetEtiketleri(t, b, pis), ogun: ogunler(t), pisirme: pis, sure: sureAraligi(t) };
  }

  var DUZEY = ["", "Düşük", "Orta", "Yüksek"];
  kok.BESIN_DUZEY = DUZEY;
  kok.besinHesapla = besinHesapla;
  kok.diyetEtiketleri = diyetEtiketleri;
  kok.tarifBilgisi = tarifBilgisi;
  kok._besinSatirOku = satirOku;
  if (typeof module !== "undefined") module.exports = { besinHesapla: besinHesapla, diyetEtiketleri: diyetEtiketleri, tarifBilgisi: tarifBilgisi, satirOku: satirOku, ogunler: ogunler, pisirmeTurleri: pisirmeTurleri, sureAraligi: sureAraligi };
})(typeof window !== "undefined" ? window : this);
