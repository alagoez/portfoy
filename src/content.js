// Sitedeki bütün metin ve bağlantılar tek yerden yönetilir.
import altalead from './assets/projects/altalead.webp'
import suzgec from './assets/projects/suzgec.webp'
import altasniper from './assets/projects/altasniper.webp'
import walking from './assets/projects/walking.webp'
import d2p from './assets/projects/d2p.webp'
import vidking from './assets/projects/vidking.webp'
import nrc from './assets/projects/nrc.webp'
import clickvision from './assets/projects/clickvision.webp'

export const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4'
export const SKOOL_ABOUT = 'https://www.skool.com/diffpov-akademi-8549/about'
export const SKOOL_HOME = 'https://www.skool.com/diffpov-akademi-8549'
export const MAIL = 'diffpov2@outlook.com'
export const INSTAGRAM = 'https://www.instagram.com/2diffpov/'
export const TIKTOK = 'https://www.tiktok.com/@2diffpov'
// /api/basvuru yapılandırılmadıysa (RESEND_API_KEY yoksa) yedek olarak kullanılır
export const FORM_FALLBACK = 'https://formsubmit.co/ajax/diffpov2@outlook.com'

export const NAV = [
  { label: 'Nasıl çalışıyor', href: '#nasil' },
  { label: 'Biz kimiz', href: '#biz' },
  { label: 'Projeler', href: '#projeler' },
  { label: 'Fight Club', href: '#fightclub' },
  { label: 'SSS', href: '#sss' },
]

export const STEPS = [
  { n: '01', title: 'Kartı doldur', text: 'Problem ne, kim için, şu an ne var, nerede takıldın. On kısa alan, beş dakika.' },
  { n: '02', title: 'Kartın bize ulaşır', text: 'Gönderdiğin an numaralanır ve PDF olarak bize ulaşır.' },
  { n: '03', title: 'Projene bakıyoruz', text: 'Mantıklı mı, eksikler ne, sıradaki adım ne. Üyelere yazılı rapor; talep oldukça canlı yayında birlikte.' },
]

export const QUESTIONS = [
  { q: 'Problem gerçek mi?', a: 'Birisi bu sorunu bugün yaşıyor ve çözmek için uğraşıyor mu?' },
  { q: 'Kim için, net mi?', a: '"Herkes" değil; tarif edebileceğin tek bir kişi.' },
  { q: 'Kapsam küçük mü?', a: 'İlk sürüm bu hafta bitecek kadar dar mı?' },
  { q: 'Para eden taraf nerede?', a: 'Kim, neye, neden para öder?' },
]

export const STATS = [
  { value: '8', label: 'ürettiğimiz proje' },
  { value: '3', label: 'satılan proje' },
  { value: '400+', label: 'kayıt, son projemizin ilk haftasında' },
  { value: '2.000$+', label: 'bir müşteri uygulamasının aylık geliri' },
]

export const PROJECTS = [
  { name: 'Alta Lead', tag: 'AI SaaS', status: 'canli', shot: altalead, url: 'https://alta-lead.vercel.app', text: 'KOBİ siteleri için Türkçe yapay zeka satış asistanı. Ziyaretçiyi karşılar, soruları yanıtlar, sıcak müşteriyi yakalar.' },
  { name: 'suzgec.ai', tag: 'AI Startup', status: 'askida', shot: suzgec, text: 'YouTube videolarını, PDF\'leri ve ses kayıtlarını çalışma notlarına ve sınav sorularına çeviren öğrenci asistanı.' },
  { name: 'Alta Sniper', tag: 'AI SaaS', status: 'canli', shot: altasniper, text: 'Müşteri adaylarına ulaşmayı ve takibi ölçekleyen soğuk mesaj aracı.' },
  { name: 'Walking.art', tag: 'Web uygulaması', status: 'canli', shot: walking, url: 'https://walking-art.vercel.app', text: 'Yapay zekayla flört cümleleri üreten küçük bir uygulama. 60 dakikada yapıldı.' },
  { name: 'VidKing AI', tag: 'AI Video', status: 'satildi', shot: vidking, text: 'YouTube videosunu analiz edip kanalına özel, orijinal içerik varyasyonları üreten araç.' },
  { name: 'NRC.ai', tag: 'AI Startup', status: 'satildi', shot: nrc, text: 'YouTube videolarını analiz edip etkileşim, duygu ve SEO önerilerini raporlayan araç.' },
  { name: 'ClickVision', tag: 'AI Startup', status: 'satildi', shot: clickvision, text: 'Satılan yapay zeka girişimlerimizden biri.' },
  { name: 'D2P', tag: 'Giyim markası', status: 'canli', shot: d2p, url: 'https://diffpovwear.vercel.app/', text: 'Risk alan ve sistemi sorgulayanlar için streetwear markası.' },
]

export const INSIDE = [
  { title: '3 aylık yol', items: ['1. ay: ilk projeni yayına al', '2. ay: daha fazla proje çıkar', '3. ay: yaptığını satmayı öğren'] },
  { title: 'Cephanelik', items: ['170+ otomasyon şablonu', 'Hazır promptlar', 'Teklif ve sözleşme şablonları', 'Müşteri bulma araçları'] },
  { title: 'Proje incelemeleri', items: ['Proje kartına yazılı rapor', 'Talep oldukça canlı yayın', 'Takıldığın yerde soracağın bir topluluk'] },
]

export const FAQ = [
  { q: 'Proje kartı göndermek ücretli mi?', a: 'Hayır, kartı herkes gönderebilir. Yazılı rapor ve canlı incelemeler Fight Club üyelerine hazırlanıyor.' },
  { q: 'Kartı gönderdikten sonra ne oluyor?', a: 'Kartın bir başvuru numarası alır ve PDF olarak bize ulaşır. Projene dört soruyla bakarız; dönüşümüz kartta yazdığın e-postaya gelir.' },
  { q: 'Kod bilmem gerekiyor mu?', a: 'Hayır. Fikir aşamasındaysan da gönderebilirsin, "henüz yok" demek ayıp değil. Yapay zekaya nasıl iş yaptıracağını Fight Club\'daki derslerde adım adım gösteriyoruz.' },
  { q: 'Fikrim gizli kalır mı?', a: 'Kartın yalnızca bize gelir. Canlı yayında göstermemizi istemiyorsan formda "hayır" de; o kart yayına çıkmaz.' },
  { q: 'Projem ilerledi, tekrar gönderebilir miyim?', a: 'Evet. Kartı güncel haliyle tekrar gönder, yeni bir başvuru numarası alır.' },
  { q: 'Fight Club üyeliğini istediğim zaman bırakabilir miyim?', a: 'Evet. Üyelik aylık; Skool üzerinden istediğin an iptal edebilirsin.' },
]
