// POST /api/basvuru: proje kartını doğrular, PDF üretir, e-postayla gönderir.
//
// Vercel ortam değişkenleri:
//   RESEND_API_KEY   zorunlu (resend.com)
//   MAIL_TO          kartların gideceği adres (varsayılan diffpov2@outlook.com)
//   MAIL_FROM        gönderen; domain doğrulanana kadar "Fight Club <onboarding@resend.dev>"
//   BASVURANA_KOPYA  "1" ise başvurana da onay maili + PDF gider (doğrulanmış domain gerekir)
import { dogrula, referans, tarih as tarihYaz } from './_lib/kart.js'
import { kartPdf } from './_lib/pdf.js'
import { bizeMail, basvuranaMail, gonder } from './_lib/mail.js'

const sonIstekler = new Map() // ip -> zaman damgaları (aynı örnek içinde kaba sınır)

function cokSik(ip) {
  const now = Date.now()
  const list = (sonIstekler.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000)
  list.push(now)
  sonIstekler.set(ip, list)
  return list.length > 5
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Yalnızca POST.' })
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'not_configured' })

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'yerel'

  // Bot: gizli alan dolu ya da form 4 saniyeden kısa sürede doldurulmuş. Sessizce kabul et.
  if (body?._honey || Number(body?._sure) < 4000) return res.status(200).json({ ok: true, ref: referans() })
  if (cokSik(ip)) return res.status(429).json({ error: 'Çok fazla deneme. Birkaç dakika sonra tekrar dene.' })

  const { kart, error } = dogrula(body)
  if (error) return res.status(400).json({ error })

  const now = new Date()
  const meta = { ref: referans(now), tarih: tarihYaz(now) }
  const dosya = `proje-karti-${meta.ref}.pdf`
  const from = process.env.MAIL_FROM || 'Fight Club <onboarding@resend.dev>'

  try {
    const [bizim, onun] = await Promise.all([kartPdf(kart, { ...meta, ic: true }), kartPdf(kart, meta)])
    const biz = bizeMail(kart, meta)
    await gonder({ from, to: process.env.MAIL_TO || 'diffpov2@outlook.com', replyTo: kart.email, ...biz, attachments: [{ filename: dosya, content: bizim.toString('base64') }] })

    let kopya = false
    if (process.env.BASVURANA_KOPYA === '1') {
      const o = basvuranaMail(kart, meta)
      // Başvurana giden mail başarısız olsa da kart bize ulaştı; hatayı yut ama logla
      kopya = await gonder({ from, to: kart.email, replyTo: process.env.MAIL_TO || 'diffpov2@outlook.com', ...o, attachments: [{ filename: dosya, content: onun.toString('base64') }] })
        .then(() => true, (e) => { console.error('basvurana mail', e.message); return false })
    }
    return res.status(200).json({ ok: true, ref: meta.ref, kopya })
  } catch (e) {
    console.error('basvuru', e)
    return res.status(502).json({ error: 'gonderilemedi' })
  }
}
