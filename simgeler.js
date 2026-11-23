// =====================================================================
//  MUTFAK ASİSTANI — TARİF SİMGELERİ (her tarif kartındaki minik resim)
//  Fotoğraf yerine emoji kullanıyoruz: dosya şişmez, internetsiz de çalışır.
//
//  Nasıl çalışır: Tarifin ADINA bakılır, aşağıdaki listede YUKARIDAN AŞAĞIYA
//  ilk tutan satırın simgesi seçilir. Hiçbiri tutmazsa kategorinin simgesi
//  kullanılır (en alttaki KATEGORI_SIMGELERI).
//
//  Yeni kural eklemek: [ /aranacak kelime/, "🍆" ] satırını uygun yere koy.
//  Sıra önemlidir: "Kabak Tatlısı" tatlı olarak görünsün diye tatlı kuralları
//  sebze kurallarından önce gelir.
//  "etli: true" yazan kural, sadece malzemelerde et/tavuk/balık varsa tutar
//  (ör. "Patates Köftesi" köfte değil patates simgesi alsın diye).
//
//  Not: Eski telefonlarda kutu olarak görünmesin diye 2018 ve öncesi
//  emojiler seçildi (🧆 🫑 🫘 🫒 🧄 gibi yeniler kullanılmadı).
// =====================================================================

var SIMGE_KURALLARI = [
  // --- Adında malzemesi geçmeyen, herkesin bildiği yemekler ---
  [/karnıyarık|köpoğlu|imam bayıldı|hünk[aâ]r beğendi|musakka|ali nazik|baba ?gannuş|abagannuş|şakşuka|mamzana|islim/, "🍆"],
  [/sucuklu yumurta|menemen|omlet|çılbır|kaygana|yumurta dolma/, "🍳"],
  [/sos(u)?$/, "🥫"],
  [/mercimek köfte|çiğ köfte|kısır/, "🥬"],
  [/falafel|lahmacun|pide(?!li)|etli ekme|tantuni|döner|iskender|fajita|dürüm/, "🥙"],
  [/humus|fava|aşure/, "🥣"],
  [/cacık|salatalık/, "🥒"],
  [/haydari/, "🥛"],
  [/^ezme$|atom|mu[h]?am+ara|közlenmiş biber$/, "🌶️"],
  [/guacamole|avokado/, "🥑"],
  [/yaprak sarma|yaprak dolma|asma yaprağı(?!nda)/, "🍃"],
  [/biber dolma/, "🌶️"],
  [/domates dolma/, "🍅"],
  [/patates dolma/, "🥔"],
  [/kabak (dolma|oturtma|kayığı)/, "🥒"],
  [/(lahana|pazı) (dolma|sarma)/, "🥬"],
  [/mahmudiye/, "🍗"],

  // --- Tatlılar ---
  [/kabak tatlı|balkabağı tatlı/, "🎃"],
  [/ayva tatlı/, "🍐"],
  [/dondurma|parfe|kupu?$/, "🍨"],
  [/muhallebi|sütlaç|kazandibi|keşkül|puding|krem karamel|krem brüle|(^| )zerde( |$)|güllaç|tavuk göğsü tatlı|kemalpaşa/, "🍮"],
  [/baklava|kadayıf|künefe|şekerpare|revani|bülbül|şerbetli|tatlısı$|helva|bastık|lokum/, "🍯"],
  [/kurabiye|kraker|halley/, "🍪"],
  [/krep( |$)|pankek/, "🥞"],
  [/kek$|kek |pastası$|milföy pasta|kremalı pasta$|cheesecake|brownie|tiramisu|(^| )gato|ekler|profiterol|meyveli terin/, "🍰"],
  [/(^| )tartı?( |$)|turta|\(pay\)/, "🥧"],
  [/meyve salata/, "🍓"],
  [/çikolata/, "🍫"],

  // --- İçecekler ---
  [/kahve|latte/, "☕"],
  [/limonata/, "🍋"],
  [/ayran|boza|salep|kefir/, "🥛"],
  [/şerbet|hoşaf|komposto/, "🍹"],

  // --- Çorbalar (kategorisi Çorba olan her şey de buraya düşer) ---
  [/çorba|konsome|paçası|gazpacho|minestrone/, "🥣"],

  // --- Yemeğin şekli: pizza, makarna, pilav, börek, mantı ---
  [/pizza/, "🍕"],
  [/hamburger/, "🍔"],
  [/sandviç|kanepe|bruşetta/, "🥪"],
  [/paella/, "🥘"],
  [/pilav|risotto|keşke[kğ]/, "🍚"],
  [/makarna|spagetti|erişte|lazanya|penne|fettuccine|tagliatelle|linguine|rigatoni|pappardelle|cannelloni/, "🍝"],
  [/mantı|dim sum|tortellini|hıngel/, "🥟"],
  [/simit(?! keba)|pretzel/, "🥨"],
  [/ekmeği?$|ciabatta|bazlama/, "🍞"],
  [/börek|böreği|poğaça|gözleme|pişi|katmer|kete|açma|çörek|yağlama|strudel|spring roll/, "🥐"],
  [/patlamış mısır/, "🍿"],
  [/kızartma(sı)?$|patates kızart|baharatlı patates/, "🍟"],

  // --- Deniz ürünleri ---
  [/karides|pavurya/, "🦐"],
  [/yengeç/, "🦀"],
  [/kalamar/, "🦑"],
  [/ahtapot/, "🐙"],
  [/midye/, "🐚"],
  [/balık|balığı|hamsi|levrek|somon|alabalık|uskumru|sardalya|palamut|lüfer|çipura|kefal|çinakop|sazan|ançüez|deniz (ürün|mahsul)/, "🐟"],

  // --- Etler ---
  [/köfte/, "🍖", true],
  [/şiş/, "🍢"],
  [/patlıcan/, "🍆"],
  [/tavuk|tavuğ|piliç|hindi|bıldırcın|kanat|baget/, "🍗"],
  [/salata/, "🥗"],
  [/kuru fasulye|nohut|barbunya|mercimek|gelin fasulye|chili|piyaz/, "🍲"],
  [/(^| )et( |$)|etli|kuzu|dana|biftek|bonfile|pirzola|kaburga|incik|rosto|nuar|ciğer|böbrek|işkembe|beyin|osso/, "🥩"],
  [/keba[bp]|tandır|şinitzel|sarma|yahni/, "🥩", true],
  [/sosis|sucuk/, "🌭"],
  [/pastırma|jambon|salam/, "🥓"],

  // --- Sebze, meyve, peynir ---
  [/patates/, "🥔"],
  [/domates/, "🍅"],
  [/mantar/, "🍄"],
  [/brokoli|karnabahar/, "🥦"],
  [/mısır/, "🌽"],
  [/havuç/, "🥕"],
  [/kabak|mücver/, "🥒"],
  [/ıspanak|pazı|lahana|marul|semizotu|roka|kıvırcık|pırasa|su teresi/, "🥬"],
  [/biber|dolma/, "🌶️"],
  [/elma/, "🍎"], [/armut/, "🍐"], [/portakal|mandalina/, "🍊"], [/limon/, "🍋"],
  [/çilek|frambuaz|böğürtlen/, "🍓"], [/vişne|kiraz/, "🍒"], [/üzüm/, "🍇"],
  [/karpuz/, "🍉"], [/kavun/, "🍈"], [/muz/, "🍌"], [/ananas/, "🍍"], [/kayısı|şeftali/, "🍑"],
  [/peynir|kaşar|lor|labne|mozzarella|hellim|parmesan/, "🧀"],
  [/yumurta/, "🍳"],
  [/ceviz|fıstık|badem|kestane|fındık|hurma/, "🌰"],
  [/enginar|kereviz|bamya|fasulye|bezelye|bakla|kuşkonmaz|sebze|türlü/, "🌿"]
];

var KATEGORI_SIMGELERI = {
  "Çorba": "🥣", "Ana Yemek": "🍲", "Zeytinyağlı": "🥗", "Pilav & Makarna": "🍚", "Hamur İşi": "🥐",
  "Kahvaltılık": "🍳", "Salata": "🥗", "Meze": "🧀", "Ara Sıcak": "🍢", "Aperatifler": "🥨",
  "Deniz Mahsulleri": "🐟", "Balık": "🐟", "Dünya Mutfağı": "🌍", "İtalyan Mutfağı": "🍝",
  "Fransız Mutfağı": "🥖", "Asya Mutfağı": "🍜", "Tatlı": "🍰", "İçecekler": "🥤"
};

// Tarifin simgesini bulur. t: { ad, kat, m } (m = malzeme satırları)
function tarifSimgesi(t) {
  var ad = (t.ad || "").toLocaleLowerCase("tr");
  if (t.kat === "Çorba") return "🥣";
  var mlz = null;
  for (var i = 0; i < SIMGE_KURALLARI.length; i++) {
    var k = SIMGE_KURALLARI[i];
    if (!k[0].test(ad)) continue;
    if (k[2]) {
      if (mlz === null) mlz = (t.m || []).join(", ").toLocaleLowerCase("tr").replace(/(tavuk|et|kemik) suyu/g, "");
      if (!/kıyma|tavuk|piliç|hindi|balık|(^|[ ,])(et|eti|kuzu|dana)([ ,]|$)/.test(mlz)) continue;
    }
    return k[1];
  }
  return KATEGORI_SIMGELERI[t.kat] || "🍽️";
}
