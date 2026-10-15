import { satirlar } from './kart.js'

const SKOOL = 'https://www.skool.com/diffpov-akademi-8549/about'
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
const br = (s) => esc(s).replace(/\n/g, '<br>')

const kabuk = (ic) => `<!doctype html><html lang="tr"><body style="margin:0;background:#f4f4f4;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden">
<tr><td style="background:#0a0a0a;padding:22px 28px;color:#fff;font-size:16px;font-weight:600">fight club</td></tr>
<tr><td style="padding:28px">${ic}</td></tr>
<tr><td style="padding:18px 28px;border-top:1px solid #eee;color:#888;font-size:12px">fight club · <a href="https://www.2diffpov.com.tr" style="color:#888">2diffpov.com.tr</a></td></tr>
</table></td></tr></table></body></html>`

export function bizeMail(k, { ref, tarih }) {
  const alanlar = satirlar(k).map(([l, v]) => `<tr><td style="padding:12px 0;border-top:1px solid #eee"><div style="font-size:12px;color:#888;margin-bottom:4px">${esc(l)}</div><div style="font-size:15px;line-height:1.5">${br(v)}</div></td></tr>`).join('')
  const html = kabuk(`
    <div style="font-size:12px;color:#888">${esc(ref)} · ${esc(tarih)}</div>
    <h1 style="margin:6px 0 4px;font-size:24px;letter-spacing:-0.5px">${esc(k.proje)}</h1>
    <div style="font-size:15px;color:#444">${esc(k.ad)} · <a href="mailto:${esc(k.email)}" style="color:#0a0a0a">${esc(k.email)}</a></div>
    <div style="margin:18px 0 8px;font-size:13px;color:#444">Elinde: <b>${esc(k.durum)}</b> · Yayın izni: <b>${esc(k.yayin)}</b> · Üye: <b>${esc(k.uye)}</b><br>Aylık bütçe: <b>${esc(k.butce)}</b> · Sermaye: <b>${esc(k.sermaye)}</b></div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${alanlar}</table>
    <p style="margin:20px 0 0;font-size:13px;color:#666">Kartın PDF'i ekte; son iki sayfası iş raporu ve teknik yol haritası notları için boş bırakıldı. Bu maili yanıtlarsan doğrudan başvurana gider.</p>`)
  return { subject: `Proje Kartı – ${k.ad} · ${k.proje}`, html }
}

export function basvuranaMail(k, { ref }) {
  const uye = k.uye.startsWith('Evet')
  const html = kabuk(`
    <h1 style="margin:0 0 10px;font-size:24px;letter-spacing:-0.5px">Kartın bize ulaştı, ${esc(k.ad.split(' ')[0])}.</h1>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 14px"><b>${esc(k.proje)}</b> için gönderdiğin proje kartını aldık. Başvuru numaran <b>${esc(ref)}</b>. Kartının bir kopyası PDF olarak ekte.</p>
    <p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 14px">Projene bakıp iki rapor hazırlayacağız: tutar mı, nasıl pazarlanır diyen bir iş raporu ve adım adım teknik yol haritası. Dönüşümüz bu adrese gelecek.</p>
    ${uye
      ? `<p style="font-size:15px;line-height:1.6;color:#333;margin:0">Bu arada Skool'daki <b>Proje İncelemeleri</b> bölümüne göz atabilirsin.</p>`
      : `<div style="background:#f6f6f6;border-radius:10px;padding:18px;margin-top:6px"><p style="font-size:15px;line-height:1.6;color:#333;margin:0 0 12px">İş raporu, teknik yol haritası ve canlı incelemeler Fight Club üyelerine hazırlanıyor. Şu an ayda 9$, istediğin an iptal edebilirsin.</p>
         <a href="${SKOOL}" style="display:inline-block;background:#0a0a0a;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600">Fight Club'a katıl</a></div>`}
    <p style="font-size:13px;color:#888;margin:22px 0 0">Projen ilerledikçe kartı sitemizden tekrar gönderebilirsin.</p>`)
  return { subject: `Proje kartın ulaştı · ${ref}`, html }
}

// Resend REST API: https://resend.com/docs/api-reference/emails/send-email
export async function gonder({ from, to, replyTo, subject, html, attachments }) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, html, attachments }),
  })
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`)
  return r.json()
}
