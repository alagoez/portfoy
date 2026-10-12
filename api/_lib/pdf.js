import { readFile } from 'node:fs/promises'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { satirlar } from './kart.js'

const LOGO = 'M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z'
const INK = rgb(0.04, 0.04, 0.04)
const GRAY = rgb(0.42, 0.42, 0.42)
const LINE = rgb(0.88, 0.88, 0.88)
const SOFT = rgb(0.96, 0.96, 0.96)
const WHITE = rgb(1, 1, 1)
const W = 595.28, H = 841.89, M = 48

const fontYolu = (ad) => new URL(`../_fonts/${ad}`, import.meta.url)

// Metni verilen genişliğe sığacak satırlara böler (uzun linkleri harf harf keser)
function sar(text, font, size, width) {
  const out = []
  for (const para of String(text).split('\n')) {
    let line = ''
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const test = line ? `${line} ${word}` : word
      if (font.widthOfTextAtSize(test, size) <= width) { line = test; continue }
      if (line) out.push(line)
      if (font.widthOfTextAtSize(word, size) <= width) { line = word; continue }
      let part = ''
      for (const ch of word) {
        if (font.widthOfTextAtSize(part + ch, size) > width) { out.push(part); part = '' }
        part += ch
      }
      line = part
    }
    out.push(line)
  }
  return out
}

// ic = true: bizim kopyamız, sonuna boş inceleme sayfası eklenir
export async function kartPdf(k, { ref, tarih, ic = false }) {
  const doc = await PDFDocument.create()
  doc.registerFontkit(fontkit)
  doc.setTitle(`Proje Kartı · ${k.proje}`)
  doc.setAuthor('Fight Club · 2diffpov')
  doc.setSubject(`${ref} · ${k.ad}`)
  const [reg, semi, bold] = await Promise.all(['Geist-400.ttf', 'Geist-600.ttf', 'Geist-700.ttf'].map(async (f) => doc.embedFont(await readFile(fontYolu(f)), { subset: true })))

  let page, y
  const altBilgi = (p) => {
    p.drawLine({ start: { x: M, y: 40 }, end: { x: W - M, y: 40 }, thickness: 0.6, color: LINE })
    p.drawText('fight club · 2diffpov.com.tr', { x: M, y: 26, size: 8, font: reg, color: GRAY })
    const t = `${ref} · ${tarih}`
    p.drawText(t, { x: W - M - reg.widthOfTextAtSize(t, 8), y: 26, size: 8, font: reg, color: GRAY })
  }
  const yeniSayfa = () => {
    page = doc.addPage([W, H])
    page.drawRectangle({ x: 0, y: H - 6, width: W, height: 6, color: INK })
    altBilgi(page)
    y = H - 48
  }
  const yer = (h) => { if (y - h < 60) yeniSayfa() }

  // Kapak bandı
  page = doc.addPage([W, H])
  altBilgi(page)
  page.drawRectangle({ x: 0, y: H - 132, width: W, height: 132, color: INK })
  page.drawSvgPath(LOGO, { x: M, y: H - 40, scale: 0.09, color: WHITE })
  page.drawText('fight club', { x: M + 32, y: H - 58, size: 15, font: semi, color: WHITE })
  const etiket = 'PROJE KARTI'
  page.drawText(etiket, { x: W - M - semi.widthOfTextAtSize(etiket, 9), y: H - 52, size: 9, font: semi, color: rgb(0.7, 0.7, 0.7) })
  page.drawText(ref, { x: W - M - bold.widthOfTextAtSize(ref, 12), y: H - 70, size: 12, font: bold, color: WHITE })
  const projeSatir = sar(k.proje, bold, 26, W - 2 * M)
  page.drawText(projeSatir[0], { x: M, y: H - 104, size: 26, font: bold, color: WHITE })
  y = H - 132 - 34
  if (projeSatir.length > 1) {
    for (const l of projeSatir.slice(1)) { page.drawText(l, { x: M, y, size: 20, font: bold, color: INK }); y -= 24 }
    y -= 6
  }

  // Gönderen
  page.drawText(k.ad, { x: M, y, size: 13, font: semi, color: INK })
  page.drawText(k.email, { x: M + semi.widthOfTextAtSize(k.ad, 13) + 10, y, size: 11, font: reg, color: GRAY })
  y -= 16
  page.drawText(tarih, { x: M, y, size: 9, font: reg, color: GRAY })
  y -= 26

  // Özet çipleri
  const cipler = [['Elinde', k.durum], ['Canlı yayın izni', k.yayin], ['Fight Club üyesi', k.uye]]
  const cw = (W - 2 * M - 16) / 3
  cipler.forEach(([l, v], i) => {
    const x = M + i * (cw + 8)
    page.drawRectangle({ x, y: y - 40, width: cw, height: 46, color: SOFT, borderColor: LINE, borderWidth: 0.6 })
    page.drawText(l, { x: x + 12, y: y - 12, size: 8, font: reg, color: GRAY })
    page.drawText(sar(v, semi, 11, cw - 24)[0], { x: x + 12, y: y - 30, size: 11, font: semi, color: INK })
  })
  y -= 70

  // Alanlar
  for (const [label, value] of satirlar(k)) {
    const lines = sar(value, reg, 11, W - 2 * M - 16)
    yer(40)
    page.drawText(label, { x: M, y, size: 9, font: semi, color: GRAY })
    y -= 8
    page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.6, color: LINE })
    y -= 18
    for (const l of lines) {
      yer(16)
      page.drawText(l, { x: M + 8, y, size: 11, font: reg, color: INK, lineHeight: 16 })
      y -= 16
    }
    y -= 18
  }

  if (ic) {
    yeniSayfa()
    page.drawText('İnceleme', { x: M, y, size: 20, font: bold, color: INK })
    y -= 18
    page.drawText(`${k.proje} · ${k.ad}`, { x: M, y, size: 10, font: reg, color: GRAY })
    y -= 30
    const sorular = ['1 · Problem gerçek mi?', '2 · Kim için, net mi?', '3 · Kapsam bu hafta bitecek kadar küçük mü?', '4 · Para eden taraf nerede?', 'Sıradaki adım']
    for (const s of sorular) {
      page.drawText(s, { x: M, y, size: 11, font: semi, color: INK })
      y -= 10
      page.drawRectangle({ x: M, y: y - 84, width: W - 2 * M, height: 84, borderColor: LINE, borderWidth: 0.8 })
      y -= 104
    }
    page.drawText('Karar:', { x: M, y, size: 11, font: semi, color: INK })
    let x = M + 52
    for (const s of ['Devam', 'Daralt', 'Çevir']) {
      page.drawRectangle({ x, y: y - 2, width: 11, height: 11, borderColor: INK, borderWidth: 0.8 })
      page.drawText(s, { x: x + 17, y, size: 11, font: reg, color: INK })
      x += 90
    }
  }

  return Buffer.from(await doc.save())
}
