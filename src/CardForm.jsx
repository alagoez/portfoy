import { useEffect, useRef, useState } from 'react'
import { Logo, PrimaryLink } from './ui.jsx'
import { FORM_FALLBACK, SKOOL_ABOUT, SKOOL_HOME } from './content.js'

const STEPS = [
  { key: 'ad', type: 'text', q: 'Adın ne?', placeholder: 'Adın soyadın', autoComplete: 'name' },
  { key: 'email', type: 'email', q: 'E-posta adresin', placeholder: 'ornek@mail.com', autoComplete: 'email', hint: 'Dönüşümüz bu adrese gelecek.' },
  { key: 'proje', type: 'text', q: 'Projenin adı', placeholder: 'Proje adı', hint: 'Ne dersen de, hatırlaman yeter.' },
  { key: 'problem', type: 'textarea', max: 200, q: 'Problem, tek cümle', placeholder: '[Kim] [şu işi yaparken] [şu sorunu yaşıyor]', hint: 'İki cümle çıkıyorsa henüz problemi bulamamışsın; bu da bir bilgi.' },
  { key: 'kim', type: 'text', q: 'Kim için?', placeholder: 'Örn. tek başına çalışan bir diş hekimi', hint: '"Herkes" yazma. Tek bir kişi tarif et.' },
  { key: 'durum', type: 'radio', q: 'Şu an elinde ne var?', options: ['Çalışan bir link', 'Ekran kaydı', 'Henüz yok'], hint: 'Yok demek ayıp değil, ama neye bakacağımızı bilmemiz lazım.' },
  { key: 'takildim', type: 'textarea', max: 3000, q: 'Nerede takıldın?', placeholder: 'Ne denedim, ne oldu, hata mesajı ne?', hint: 'Net yaz: ne denedin, ne oldu, hata mesajı ne. "Olmuyor" yazma.' },
  { key: 'istek', type: 'multi', q: 'Bizden ne istiyorsun?', options: ['Problem doğru mu', 'Kapsam çok mu büyük', 'Teknik takıldım', 'Fiyat', 'Müşteri nasıl bulunur'], hint: 'Birden fazla seçebilirsin.' },
  { key: 'yayin', type: 'radio', q: 'Canlı yayında gösterilebilir mi?', options: ['Evet', 'Hayır'], hint: 'Gizli bilgi, müşteri verisi ya da API anahtarı varsa hayır de.' },
  { key: 'uye', type: 'radio', q: 'Son olarak: Fight Club üyesi misin?', options: ['Evet, içerideyim', 'Henüz değil'], hint: 'Yazılı raporlar üyelere hazırlanıyor. Üye değilsen kartın yine bize ulaşır; katıldığında raporun hazırlanır.', consent: true },
]

const EMPTY = { ad: '', email: '', proje: '', problem: '', kim: '', durum: '', link: '', takildim: '', istek: [], yayin: '', uye: '', onay: false, _honey: '' }

const inputCls =
  'w-full rounded-xl bg-white/10 px-4 py-3 text-base text-white placeholder-white/35 outline-none ring-1 ring-white/10 transition focus:bg-white/15 focus:ring-white/30'

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${active ? 'bg-white text-[#010101]' : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'}`}
    >
      {children}
    </button>
  )
}

// Yedek: /api/basvuru çalışmıyorsa FormSubmit ile düz e-posta
async function yedekGonder(v) {
  const card = {
    Ad: v.ad, 'E-posta': v.email, 'Proje adı': v.proje, 'Problem (tek cümle)': v.problem, 'Kim için': v.kim,
    'Şu an ne var': v.durum + (v.link ? ' – ' + v.link : ''), 'Takıldığım yer': v.takildim,
    'Bizden ne istiyorum': v.istek.join(', '), 'Yayında gösterilebilir mi': v.yayin, 'Fight Club üyesi': v.uye,
    'KVKK onayı': 'Evet', Tarih: new Date().toLocaleString('tr-TR'),
  }
  const r = await fetch(FORM_FALLBACK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ _subject: 'Proje Kartı – ' + v.ad, _template: 'box', _captcha: 'false', email: v.email, ...card }),
  })
  if (!r.ok) throw new Error(String(r.status))
}

export default function CardForm({ open, prefillEmail }) {
  const [v, setV] = useState(EMPTY)
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(null) // { ref, kopya }
  const fieldRef = useRef(null)
  const startRef = useRef(0)

  const step = STEPS[i]
  const last = i === STEPS.length - 1
  const needsLink = step.key === 'durum' && v.durum && v.durum !== 'Henüz yok'

  useEffect(() => {
    if (open && !startRef.current) startRef.current = Date.now()
    if (open && prefillEmail) setV((s) => (s.email ? s : { ...s, email: prefillEmail }))
  }, [open, prefillEmail])

  useEffect(() => {
    if (open && !sent) fieldRef.current?.focus({ preventScroll: true })
  }, [i]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key, value) => {
    setError('')
    setV((s) => ({ ...s, [key]: value }))
  }

  const validate = () => {
    const val = v[step.key]
    if (step.type === 'multi') return val.length ? '' : 'En az birini seç.'
    if (step.type === 'radio') {
      if (!val) return 'Bir seçenek seç.'
      if (step.key === 'durum' && val !== 'Henüz yok' && !/^https?:\/\/\S+\.\S+/.test(v.link.trim()))
        return 'Linki https:// ile başlayarak yaz.'
      if (step.consent && !v.onay) return 'Devam etmek için onay kutusunu işaretle.'
      return ''
    }
    if (!val.trim()) return 'Bu alanı boş bırakma.'
    if (step.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return 'Geçerli bir e-posta yaz.'
    return ''
  }

  const go = (n) => {
    setDir(n > i ? 1 : -1)
    setError('')
    setI(n)
  }

  const next = (e) => {
    e?.preventDefault()
    const err = validate()
    if (err) return setError(err)
    if (!last) return go(i + 1)
    send()
  }

  const send = async () => {
    const clean = { ...v, link: v.durum === 'Henüz yok' ? '' : v.link.trim() }
    for (const k of ['ad', 'email', 'proje', 'problem', 'kim', 'takildim']) clean[k] = clean[k].trim()
    setSending(true)
    try {
      const r = await fetch('/api/basvuru', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...clean, _sure: Date.now() - startRef.current }),
      }).catch(() => null)
      if (r && r.ok) {
        const data = await r.json()
        return setSent({ ref: data.ref, kopya: !!data.kopya })
      }
      if (r && (r.status === 400 || r.status === 429)) {
        const data = await r.json().catch(() => ({}))
        return setError(data.error || 'Gönderilemedi, bilgileri kontrol et.')
      }
      // API yok, yapılandırılmamış ya da hata verdi: yedek kanal
      await yedekGonder(clean)
      setSent({ ref: null, kopya: false })
    } catch {
      setError('Gönderilemedi. Bağlantını kontrol edip tekrar dene.')
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    setV(EMPTY)
    setSent(null)
    setDir(1)
    setI(0)
    startRef.current = Date.now()
  }

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return
    if (e.target.tagName === 'TEXTAREA' && !(e.ctrlKey || e.metaKey)) return
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return
    next(e)
  }

  if (sent) {
    const member = v.uye.startsWith('Evet')
    return (
      <div className="anim-pop py-4 text-center">
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <Logo className="h-5 w-5 fill-[#010101]" />
        </span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Kartın bize ulaştı</h2>
        {sent.ref && (
          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
            <span className="text-white/50">Başvuru no</span>
            <span className="font-semibold tabular-nums">{sent.ref}</span>
          </div>
        )}
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/60">
          {sent.kopya ? 'Kartının bir kopyasını PDF olarak e-postana gönderdik. ' : ''}
          Projene bakıp dönüşü e-postana yapacağız. Projen ilerledikçe kartı tekrar gönderebilirsin.
        </p>
        {!member && (
          <div className="mt-6 rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="text-sm text-white/80">Yazılı raporlar ve canlı incelemeler Fight Club üyelerine. Şu an ayda 9$.</p>
            <div className="mt-4">
              <PrimaryLink href={SKOOL_ABOUT} target="_blank" rel="noopener">Fight Club'a katıl</PrimaryLink>
            </div>
          </div>
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {member && <PrimaryLink href={SKOOL_HOME} target="_blank" rel="noopener">Skool'a dön</PrimaryLink>}
          <button type="button" onClick={reset} className="cursor-pointer rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
            Yeni kart gönder
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={next} onKeyDown={onKeyDown} noValidate>
      <div className="mb-3 flex items-center justify-between pr-12">
        <span className="text-xs font-medium text-white/50">Proje kartı</span>
        <span className="text-xs text-white/50 tabular-nums">
          {String(i + 1).padStart(2, '0')} / {STEPS.length}
        </span>
      </div>
      <div className="mb-7 h-0.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-white transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: `${((i + 1) / STEPS.length) * 100}%` }} />
      </div>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={v._honey} onChange={(e) => set('_honey', e.target.value)} />
      </div>

      <div key={i} className={dir > 0 ? 'anim-step' : 'anim-step-back'}>
        <label htmlFor={`f-${step.key}`} className="mb-4 block text-xl font-semibold tracking-tight sm:text-2xl">
          {step.q}
        </label>

        {(step.type === 'text' || step.type === 'email') && (
          <input
            ref={fieldRef}
            id={`f-${step.key}`}
            type={step.type}
            inputMode={step.type === 'email' ? 'email' : undefined}
            autoComplete={step.autoComplete}
            placeholder={step.placeholder}
            value={v[step.key]}
            maxLength={step.key === 'proje' ? 100 : 120}
            onChange={(e) => set(step.key, e.target.value)}
            className={inputCls}
          />
        )}

        {step.type === 'textarea' && (
          <>
            <textarea
              ref={fieldRef}
              id={`f-${step.key}`}
              rows={4}
              maxLength={step.max}
              placeholder={step.placeholder}
              value={v[step.key]}
              onChange={(e) => set(step.key, e.target.value)}
              className={`${inputCls} resize-y leading-relaxed`}
            />
            {step.max <= 200 && (
              <div className="mt-1.5 text-right text-xs text-white/40 tabular-nums">
                {v[step.key].length} / {step.max}
              </div>
            )}
          </>
        )}

        {step.type === 'radio' && (
          <div className="flex flex-wrap gap-2" role="radiogroup">
            {step.options.map((o) => (
              <Chip key={o} active={v[step.key] === o} onClick={() => set(step.key, o)}>
                {o}
              </Chip>
            ))}
          </div>
        )}

        {step.type === 'multi' && (
          <div className="flex flex-wrap gap-2" role="group">
            {step.options.map((o) => (
              <Chip
                key={o}
                active={v.istek.includes(o)}
                onClick={() => set('istek', v.istek.includes(o) ? v.istek.filter((x) => x !== o) : [...v.istek, o])}
              >
                {o}
              </Chip>
            ))}
          </div>
        )}

        {needsLink && (
          <input
            type="url"
            inputMode="url"
            autoFocus
            maxLength={300}
            placeholder={v.durum === 'Ekran kaydı' ? 'Ekran kaydının linki (Loom, Drive, YouTube...)' : 'https://'}
            value={v.link}
            onChange={(e) => set('link', e.target.value)}
            className={`${inputCls} mt-3`}
          />
        )}

        {step.hint && <p className="mt-3 text-sm leading-relaxed text-white/50">{step.hint}</p>}

        {step.consent && (
          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/80">
            <input type="checkbox" checked={v.onay} onChange={(e) => set('onay', e.target.checked)} className="mt-1 h-4 w-4 flex-none accent-white" />
            <span>
              Bilgilerimin projemin incelenmesi için saklanmasını, bu amaçla yurt dışında bulunan e-posta ve barındırma hizmetlerine aktarılmasını ve bana e-posta gönderilmesini kabul ediyorum.{' '}
              <a href="#kvkk" className="text-white underline underline-offset-2">Aydınlatma metni</a>
            </span>
          </label>
        )}
      </div>

      <p role="alert" className="mt-3 min-h-5 text-sm text-red-300">{error}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => go(i - 1)}
          className={`cursor-pointer rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white ${i === 0 ? 'invisible' : ''}`}
        >
          Geri
        </button>
        <button
          type="submit"
          disabled={sending}
          className="cursor-pointer rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#010101] transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
        >
          {sending ? 'Gönderiliyor…' : last ? 'Kartı gönder' : 'Devam'}
        </button>
      </div>
    </form>
  )
}
