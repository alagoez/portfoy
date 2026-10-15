// Proje kartı alanları: doğrulama ve sıralama tek yerden.
export const DURUM = ['Canlı link', 'Ekran kaydı', 'Henüz yok']
export const ISTEK = ['Problem doğru mu', 'Kapsam çok mu büyük', 'Teknik takıldım', 'Fiyat', 'Müşteri nasıl bulunur']
export const YAYIN = ['Evet', 'Hayır']
export const UYE = ['Evet, içerideyim', 'Henüz değil']
export const BUTCE = ['1.000 TL altı', '1.000 – 5.000 TL', '5.000 – 20.000 TL', '20.000 TL üstü', 'Henüz belli değil']
export const SERMAYE = ['Yok, sadece emeğim', "50.000 TL'ye kadar", '50.000 – 250.000 TL', '250.000 TL üstü', 'Henüz belli değil']

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

// Hata varsa { error }, yoksa { kart } döner
export function dogrula(body) {
  if (!body || typeof body !== 'object') return { error: 'Geçersiz istek.' }
  const k = {
    ad: str(body.ad, 80),
    email: str(body.email, 120).toLowerCase(),
    proje: str(body.proje, 100),
    problem: str(body.problem, 200),
    kim: str(body.kim, 200),
    durum: str(body.durum, 40),
    link: str(body.link, 300),
    takildim: str(body.takildim, 3000),
    istek: Array.isArray(body.istek) ? body.istek.filter((x) => ISTEK.includes(x)) : [],
    yayin: str(body.yayin, 10),
    uye: str(body.uye, 30),
    butce: str(body.butce, 40),
    sermaye: str(body.sermaye, 40),
  }
  if (!k.ad || !k.proje || !k.problem || !k.kim || !k.takildim) return { error: 'Zorunlu alanlardan biri boş.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(k.email)) return { error: 'E-posta adresi geçersiz.' }
  if (!DURUM.includes(k.durum) || !YAYIN.includes(k.yayin) || !UYE.includes(k.uye)) return { error: 'Seçimlerden biri geçersiz.' }
  if (!BUTCE.includes(k.butce) || !SERMAYE.includes(k.sermaye)) return { error: 'Bütçe ve sermaye seçilmeli.' }
  if (k.durum !== 'Henüz yok' && !/^https?:\/\/\S+\.\S+/.test(k.link)) return { error: 'Link https:// ile başlamalı.' }
  if (k.durum === 'Henüz yok') k.link = ''
  if (!k.istek.length) return { error: 'En az bir istek seçilmeli.' }
  if (body.onay !== true) return { error: 'KVKK onayı gerekli.' }
  return { kart: k }
}

export function referans(date = new Date()) {
  const p = (n) => String(n).padStart(2, '0')
  const r = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `FC-${String(date.getFullYear()).slice(2)}${p(date.getMonth() + 1)}${p(date.getDate())}-${r}`
}

export function tarih(date = new Date()) {
  return date.toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// PDF ve e-postada aynı sırayla gösterilen alanlar
export function satirlar(k) {
  return [
    ['Problem (tek cümle)', k.problem],
    ['Kim için', k.kim],
    ['Şu an ne var', k.durum + (k.link ? `\n${k.link}` : '')],
    ['Nerede takıldı', k.takildim],
    ['Bizden ne istiyor', k.istek.map((x) => `• ${x}`).join('\n')],
  ]
}
