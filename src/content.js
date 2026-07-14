// ── Tüm site içeriği tek yerden yönetilir ──────────────────────────
import altaleadShot from './assets/projects/altalead.png'
import suzgecShot from './assets/projects/suzgec.png'
import vidkingShot from './assets/projects/vidking.png'
import walkingShot from './assets/projects/walking.png'
import nrcShot from './assets/projects/nrc.png'
import d2pShot from './assets/projects/d2p.png'
import altasniperShot from './assets/projects/altasniper.png'
import clickvisionShot from './assets/projects/clickvision.jpg'

export const SKOOL_URL = 'https://www.skool.com/diffpov-akademi-8549'
export const WHATSAPP_URL = 'https://wa.me/905076079937'

export const PRICE = { current: 19, old: 39 }
export const FOUNDING_MEMBER_LIMIT = 100 // bu sayıdan sonra fiyat $39
export const SHOW_VSL = false // VSL çekilince true yap

export const hero = {
  eyebrow: 'FIGHT CLUB · FIRAT & ALPEREN',
  titleTop: 'KONUŞMA.',
  flipWords: ['ÜRET.', 'ÇEK.', 'YAYINLA.', 'SAT.'],
  subtitle:
    'Kulübün tek kuralı: 30 günde ilk projen yayında. Yapay zeka ile üret, viral içerikle duyur, ilk paranı kazan. İzleyenler için değil — yapanlar için.',
  cta: 'Kulübe Katıl',
  ctaSub: `$${PRICE.current}/ay — kurucu üye fiyatı`,
  secondaryCta: 'Kurallara bak',
  annotation: `ilk ${FOUNDING_MEMBER_LIMIT} üyeye $${PRICE.current}/ay`,
}

export const marqueeWords = ['İÇERİK ÜRET', 'AI İLE GELİŞTİR', 'YAYINA AL', 'SATIŞI KAPAT', 'TEKRARLA']

export const rules = {
  title: 'Kulübün Kuralları',
  items: [
    'Üretmekten bahsetme. Üret.',
    'ÜRETMEKTEN BAHSETME. ÜRET.',
    '"Yarın başlarım" diye bir şey yok. Bugün var.',
    'Tek seferde tek proje. Bitmeden yenisine geçmek yok.',
    'Takıldığında sorarsın. Kulüpte kimse yalnız savaşmaz.',
    'Kulübe yeni katıldıysan, ilk 30 gününde proje çıkarmak zorundasın.',
  ],
}

export const proofStats = [
  { value: '8', label: 'Ürettiğimiz proje' },
  { value: '3', label: 'Satılan proje' },
  { value: '2', label: 'Kurucu, 2 bakış açısı' },
]

export const story = {
  title: 'Biz de sıfırdan başladık.',
  paragraphs: [
    'Biz Fırat ve Alperen. İki farklı bakış açısı, tek hedef: üretmek.',
    'Yıllarca "nereden başlasam" diye düşünmedik — başladık. Yapay zeka ile projeler geliştirdik, viral içeriklerle duyurduk. Kimisi tuttu, kimisi tutmadı; ama her denemede sistemi biraz daha çözdük.',
    'Bugün 8 proje ürettik, 3 tanesini sattık. Şimdi aynı sistemi — içerik üretiminden yapay zeka ile ürün geliştirmeye kadar — adım adım, sıfırdan anlatıyoruz.',
    'Teori yok. İzlemek yok. Sadece üretmek var.',
  ],
}

export const projects = [
  { name: 'Alta Lead', tag: 'AI SaaS', status: 'CANLI', gradient: 'linear-gradient(135deg, #7c3aed, #db2777)', shot: altaleadShot },
  { name: 'Alta Sniper', tag: 'AI SaaS', status: 'CANLI', gradient: 'linear-gradient(135deg, #16a34a, #065f46)', shot: altasniperShot },
  { name: 'suzgec.ai', tag: 'AI Startup', status: 'CANLI', gradient: 'linear-gradient(135deg, #0891b2, #10b981)', shot: suzgecShot },
  { name: 'VidKing AI', tag: 'AI Video', status: 'SATILDI', gradient: 'linear-gradient(135deg, #dc2626, #f97316)', shot: vidkingShot },
  { name: 'ClickVision', tag: 'AI Startup', status: 'SATILDI', gradient: 'linear-gradient(135deg, #6366f1, #06b6d4)', shot: clickvisionShot },
  { name: 'Walking.art', tag: 'Video İçerik', status: 'CANLI', gradient: 'linear-gradient(135deg, #ec4899, #f59e0b)', shot: walkingShot },
  { name: 'NRC.ai', tag: 'AI Startup', status: 'SATILDI', gradient: 'linear-gradient(135deg, #2563eb, #7c3aed)', shot: nrcShot },
  { name: 'D2P', tag: 'Giyim Markası', status: 'CANLI', gradient: 'linear-gradient(135deg, #171717, #525252)', shot: d2pShot },
]

export const loop = {
  title: 'Sistem tek bir döngü:',
  steps: [
    { n: '01', title: 'İçerik üret', desc: 'Hook yaz, videonu çek, viral formatları uygula.' },
    { n: '02', title: 'Kitleni büyüt', desc: 'İçerikle sana güvenen bir kitle topla.' },
    { n: '03', title: 'Yapay zeka ile üret', desc: 'Fikrini AI araçlarıyla gerçek bir ürüne çevir.' },
    { n: '04', title: 'Sat ve tekrarla', desc: 'Kitlene sat, geliri büyüt, döngüye devam et.' },
  ],
}

export const whoFor = {
  yes: [
    'Sıfırdan başlayıp ilk projesini çıkarmak isteyenler',
    'İçerik üretmek isteyip nereden başlayacağını bilmeyenler',
    'Yapay zekayı iş kurmak için kullanmak isteyenler',
    'İzlemekten sıkılıp aksiyon almaya hazır olanlar',
  ],
  no: [
    'Sihirli para makinesi arayanlar',
    'İzleyip hiçbir şey uygulamayanlar',
    'Bir haftada zengin olmayı bekleyenler',
    'Her ay fikir değiştirip hiçbirini bitirmeyenler',
  ],
}

export const curriculum = [
  {
    pillar: 'Ayak 1 — Viral İçerik Makinesi',
    desc: 'Kamera karşısına geçmekten viral olmaya giden yol.',
    modules: [
      { title: 'Temel', desc: 'Algoritma mantığı, niş seçimi ve konumlandırma' },
      { title: 'Hook Sanatı', desc: 'İlk 3 saniye — hazır hook şablonlarıyla' },
      { title: 'Çekim & Kurgu', desc: 'Telefonla video çekimi, CapCut kurgu akışı' },
      { title: 'İçerik Botu', desc: 'AI ile fikir ve senaryo üretimi, içerik takvimi' },
      { title: 'Büyüme', desc: 'Seri içerik, analiz, tekrar eden formatlar' },
    ],
  },
  {
    pillar: 'Ayak 2 — Yapay Zeka ile Üret & Kazan',
    desc: 'Fikirden yayındaki ürüne, oradan ilk gelire.',
    modules: [
      { title: 'AI Araç Seti', desc: 'Claude Code ve temel araçların kurulumu' },
      { title: 'Fikirden Ürüne', desc: 'Fikir doğrulama ve MVP mantığı' },
      { title: 'İlk Projen', desc: 'Adım adım bir projeyi yayına alma' },
      { title: 'Duyur & Sat', desc: 'İçerikle müşteri çekme — iki ayağın köprüsü' },
      { title: 'Gelir', desc: 'Fiyatlama, ilk satış, tekrar eden gelir' },
    ],
  },
]

export const communityFeatures = [
  {
    icon: 'video', title: 'Haftalık canlı yayın', meta: 'her hafta',
    desc: 'Soru-cevap, proje incelemeleri, güncel taktikler — kayıtlar arşivde kalır.',
    tags: ['Canlı', 'Soru-Cevap'], status: 'CANLI', colSpan: 2, featured: true,
  },
  {
    icon: 'library', title: 'Şablon kütüphanesi', meta: 'sürekli büyüyor',
    desc: 'Hook şablonları, dökümanlar, hazır sistemler.',
    tags: ['Hooklar', 'Dökümanlar'], status: 'HAZIR',
  },
  {
    icon: 'bot', title: 'İçerik üretim botu', meta: 'AI destekli',
    desc: 'Fikir ve senaryo üreten hazır yapay zeka aracı.',
    tags: ['AI', 'Senaryo'], status: 'HAZIR',
  },
  {
    icon: 'rocket', title: 'Üye proje vitrini', meta: 'ilk kullanıcıların',
    desc: 'Projeni paylaş, geri bildirim al, ilk kullanıcılarını kulüpten bul.',
    tags: ['Vitrin', 'Geri bildirim'], status: 'AKTİF', colSpan: 2,
  },
  {
    icon: 'messages', title: 'Soru-cevap kanalları', meta: '7/24 açık',
    desc: 'Takıldığın yerde kulüpten ve bizden destek.',
    tags: ['Destek'], status: 'AKTİF',
  },
  {
    icon: 'target', title: '30 günlük yol haritası', meta: 'gün gün',
    desc: 'Ne zaman ne yapacağını bilerek ilerle — kural 6 için tasarlandı.',
    tags: ['Plan', 'Aksiyon'], status: 'HAZIR',
  },
]

export const pricingChecklist = [
  'Viral İçerik Makinesi — 5 modül',
  'Yapay Zeka ile Üret & Kazan — 5 modül',
  'Haftalık canlı yayınlar',
  'Hook & döküman kütüphanesi',
  'İçerik üretim botu',
  'Üye proje vitrini ve topluluk',
  '30 gün para iade garantisi',
]

export const guarantee = {
  title: '30 Gün Garantisi',
  text: 'Adımları uygula, 30 gün içinde ilk projeni yayına alamazsan paranı iade edelim. Risk bizde — sen sadece üret.',
  note: 'Koşul basit: yol haritasındaki adımları uygulamış olman yeterli. Detaylar SSS bölümünde.',
}

export const faq = [
  {
    q: 'Hiç deneyimim yok, katılabilir miyim?',
    a: 'Evet — sistem tam olarak sıfırdan başlayanlar için kuruldu. Kod bilmene, kamera deneyimine veya takipçiye ihtiyacın yok. Her modül "hiç bilmeyen birine anlatır gibi" ilerliyor.',
  },
  {
    q: 'Hangi araçları öğreneceğim?',
    a: 'İçerik tarafında CapCut, Canva ve AI içerik araçları; ürün tarafında Claude Code başta olmak üzere güncel yapay zeka araçları. Hepsinin ücretsiz veya düşük maliyetli versiyonlarıyla başlayabilirsin.',
  },
  {
    q: 'Ne kadar zaman ayırmam gerekiyor?',
    a: 'Günde 1-2 saat ayırabilirsen 30 günlük yol haritasını rahat takip edersin. Daha az vaktin varsa daha yavaş ilerlersin — içeriklere erişimin devam eder.',
  },
  {
    q: 'Para iade garantisi nasıl çalışıyor?',
    a: 'Yol haritasındaki adımları uygulamana rağmen 30 gün içinde ilk projeni yayına alamazsan, ödemeni iade ediyoruz. Tek koşul gerçekten denemiş olman — ekran başında izleyip hiçbir adım atmayanlar için değil.',
  },
  {
    q: 'Üyeliği istediğim zaman iptal edebilir miyim?',
    a: 'Evet. Üyelik aylık ve Skool üzerinden tek tıkla iptal edilebilir. Taahhüt yok.',
  },
  {
    q: 'Fiyat gerçekten artacak mı?',
    a: `Evet. $${PRICE.current}/ay kurucu üye fiyatı ilk ${FOUNDING_MEMBER_LIMIT} üye için geçerli. Sonrasında fiyat $${PRICE.old}/ay olacak — ama kurucu üyeler mevcut fiyatını korur.`,
  },
]
