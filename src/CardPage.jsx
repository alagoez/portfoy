import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Check, X } from 'lucide-react'
import { Logo, PrimaryLink } from './ui.jsx'
import { FORM_FALLBACK, SKOOL_ABOUT, SKOOL_HOME } from './content.js'

const DURUM = ['Canlı link', 'Ekran kaydı', 'Henüz yok']
const ISTEK = ['Problem doğru mu', 'Kapsam çok mu büyük', 'Teknik takıldım', 'Fiyat', 'Müşteri nasıl bulunur']
const EMPTY = { ad: '', email: '', proje: '', problem: '', kim: '', durum: '', link: '', takildim: '', istek: [], yayin: '', uye: '', onay: false, _honey: '' }
const TASLAK = 'fc-kart-taslak'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LINK_RE = /^https?:\/\/\S+\.\S+/

const okuTaslak = () => {
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(TASLAK) || '{}'), onay: false, _honey: '' } } catch { return EMPTY }
}
const yazTaslak = (v) => { try { localStorage.setItem(TASLAK, JSON.stringify({ ...v, onay: false, _honey: '' })) } catch { /* gizli sekme */ } }
const silTaslak = () => { try { localStorage.removeItem(TASLAK) } catch { /* gizli sekme */ } }

function hatalar(v) {
  const e = {}
  if (!v.ad.trim()) e.ad = 'Adını yaz.'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Geçerli bir e-posta yaz.'
  if (!v.proje.trim()) e.proje = 'Projene bir ad ver.'
  if (!v.problem.trim()) e.problem = 'Problemi tek cümleyle yaz.'
  if (!v.kim.trim()) e.kim = 'Kim için olduğunu yaz.'
  if (!v.durum) e.durum = 'Birini seç.'
  else if (v.durum !== 'Henüz yok' && !LINK_RE.test(v.link.trim())) e.link = 'Linki https:// ile başlayarak yaz.'
  if (!v.takildim.trim()) e.takildim = 'Nerede takıldığını yaz.'
  if (!v.istek.length) e.istek = 'En az birini seç.'
  if (!v.yayin) e.yayin = 'Birini seç.'
  if (!v.uye) e.uye = 'Birini seç.'
  if (!v.onay) e.onay = 'Devam etmek için onay ver.'
  return e
}

// Tamamlanan alan sayısı (ilerleme çubuğu için)
const ALANLAR = [
  (v) => v.ad.trim(), (v) => EMAIL_RE.test(v.email.trim()), (v) => v.proje.trim(), (v) => v.problem.trim(), (v) => v.kim.trim(),
  (v) => v.durum && (v.durum === 'Henüz yok' || LINK_RE.test(v.link.trim())), (v) => v.takildim.trim(), (v) => v.istek.length, (v) => v.yayin, (v) => v.uye,
]

const inputCls = (err) =>
  `w-full rounded-xl bg-white/[0.06] px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none ring-1 transition focus:bg-white/[0.09] ${err ? 'ring-red-400/60' : 'ring-white/10 focus:ring-white/40'}`

function Field({ id, label, hint, error, counter, children }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-white/90">{label}</label>
        {counter}
      </div>
      {children}
      {error ? <p className="mt-2 text-[13px] text-red-300">{error}</p> : hint && <p className="mt-2 text-[13px] leading-relaxed text-white/40">{hint}</p>}
    </div>
  )
}

function Segmented({ id, options, value, onChange, error }) {
  return (
    <div id={id} role="radiogroup" tabIndex={-1} className={`grid gap-1 rounded-xl bg-white/[0.06] p-1 ring-1 outline-none ${error ? 'ring-red-400/60' : 'ring-white/10'}`} style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${value === o ? 'bg-white text-[#010101] shadow-sm' : 'text-white/65 hover:bg-white/[0.06] hover:text-white'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

function Section({ n, title, text, children }) {
  return (
    <fieldset className="border-t border-white/10 pt-8">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="font-pixel text-sm text-white/35">{n}</span>
        <div>
          <legend className="text-lg font-semibold tracking-tight">{title}</legend>
          {text && <p className="mt-1 text-sm text-white/45">{text}</p>}
        </div>
      </div>
      <div className="grid gap-6">{children}</div>
    </fieldset>
  )
}

// PDF'teki kartın canlı hali
function Preview({ v, ref_, done }) {
  const bos = (w) => <span className="block h-2 rounded-full bg-neutral-200" style={{ width: w }} />
  const satir = (label, value, widths) => (
    <div>
      <div className="border-b border-neutral-200 pb-1 text-[10px] font-semibold text-neutral-500">{label}</div>
      <div className="mt-2 whitespace-pre-line break-words text-[12px] leading-relaxed text-neutral-900">
        {value || <span className="block space-y-1.5 pt-0.5">{widths.map((w, i) => <span key={i}>{bos(w)}</span>)}</span>}
      </div>
    </div>
  )
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl bg-white text-[#0a0a0a] shadow-2xl shadow-black/70 ring-1 ring-white/10">
        <div className="bg-[#0a0a0a] px-6 pb-6 pt-5 text-white">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold"><Logo className="h-4 w-4 fill-white" />fight club</span>
            <span className="text-right">
              <span className="block text-[9px] font-semibold tracking-wider text-white/50">PROJE KARTI</span>
              <span className={`block text-xs font-semibold tabular-nums ${ref_ ? '' : 'text-white/35'}`}>{ref_ || 'No. gönderince'}</span>
            </span>
          </div>
          <div className={`mt-5 break-words text-2xl font-bold leading-tight tracking-tight ${v.proje ? '' : 'text-white/25'}`}>{v.proje || 'Projenin adı'}</div>
        </div>
        <div className="space-y-4 px-6 py-5">
          <div className="text-[12px]">
            <span className="font-semibold">{v.ad || <span className="text-neutral-300">Adın</span>}</span>
            <span className="ml-2 text-neutral-500">{v.email}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[['Elinde', v.durum], ['Yayın izni', v.yayin], ['Üye', v.uye && (v.uye.startsWith('Evet') ? 'Evet' : 'Henüz değil')]].map(([a, b]) => (
              <div key={a} className="rounded-md bg-neutral-100 px-2.5 py-2 ring-1 ring-neutral-200">
                <div className="text-[9px] text-neutral-500">{a}</div>
                <div className="truncate text-[11px] font-semibold">{b || '—'}</div>
              </div>
            ))}
          </div>
          {satir('Problem', v.problem, ['92%', '60%'])}
          {satir('Kim için', v.kim, ['70%'])}
          {satir('Şu an ne var', v.durum && v.durum + (v.durum !== 'Henüz yok' && v.link ? `\n${v.link}` : ''), ['50%'])}
          {satir('Nerede takıldı', v.takildim.length > 260 ? v.takildim.slice(0, 260) + '…' : v.takildim, ['95%', '88%', '45%'])}
          {satir('Bizden ne istiyor', v.istek.map((x) => `• ${x}`).join('\n'), ['40%', '30%'])}
        </div>
      </div>
      {done && (
        <div className="anim-stamp absolute right-6 top-28 rotate-[-8deg] rounded-lg border-[3px] border-emerald-500 px-4 py-1.5 text-xl font-black tracking-widest text-emerald-500">
          ALINDI
        </div>
      )}
    </div>
  )
}

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

export default function CardPage({ open, onClose }) {
  const [v, setV] = useState(okuTaslak)
  const [err, setErr] = useState({})
  const [tried, setTried] = useState(false)
  const [sending, setSending] = useState(false)
  const [genel, setGenel] = useState('')
  const [sent, setSent] = useState(null) // { ref }
  const scrollRef = useRef(null)
  const startRef = useRef(0)

  useEffect(() => {
    if (!open) return
    if (!startRef.current) startRef.current = Date.now()
    scrollRef.current?.scrollTo({ top: 0 })
    const t = setTimeout(() => document.getElementById('k-ad')?.focus({ preventScroll: true }), 120)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => { if (!sent) yazTaslak(v) }, [v, sent])

  const doneCount = useMemo(() => ALANLAR.filter((f) => f(v)).length, [v])

  const set = (k, val) => {
    setV((s) => {
      const n = { ...s, [k]: val }
      if (tried) setErr(hatalar(n))
      return n
    })
    setGenel('')
  }
  const toggleIstek = (o) => {
    setV((s) => {
      const n = { ...s, istek: s.istek.includes(o) ? s.istek.filter((x) => x !== o) : [...s.istek, o] }
      if (tried) setErr(hatalar(n))
      return n
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    setTried(true)
    const h = hatalar(v)
    setErr(h)
    const ilk = Object.keys(h)[0]
    if (ilk) {
      const el = document.getElementById(`k-${ilk}`)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => el?.focus({ preventScroll: true }), 350)
      return
    }
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
        silTaslak()
        setSent({ ref: data.ref })
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      if (r && (r.status === 400 || r.status === 429)) {
        const data = await r.json().catch(() => ({}))
        return setGenel(data.error || 'Gönderilemedi, bilgileri kontrol et.')
      }
      await yedekGonder(clean)
      silTaslak()
      setSent({ ref: null })
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setGenel('Gönderilemedi. Bağlantını kontrol edip tekrar dene.')
    } finally {
      setSending(false)
    }
  }

  const yeni = () => {
    setV(EMPTY)
    setErr({})
    setTried(false)
    setSent(null)
    startRef.current = Date.now()
    scrollRef.current?.scrollTo({ top: 0 })
  }

  const uye = v.uye.startsWith('Evet')

  return (
    <div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-label="Proje kartı"
      aria-hidden={!open}
      className={`fixed inset-0 z-[55] overflow-y-auto bg-[#050505] text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? 'opacity-100' : 'pointer-events-none invisible translate-y-4 opacity-0'}`}
    >
      {/* Üst çubuk */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="/" onClick={(e) => { e.preventDefault(); onClose() }} className="flex items-center gap-2">
            <Logo className="fill-white" />
            <span className="text-base font-semibold">fight club</span>
            <span className="hidden text-sm text-white/35 sm:inline">/ proje kartı</span>
          </a>
          <div className="flex items-center gap-4">
            {!sent && (
              <div className="hidden items-center gap-3 sm:flex">
                <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-white transition-[width] duration-500" style={{ width: `${doneCount * 10}%` }} />
                </div>
                <span className="text-xs text-white/50 tabular-nums">{doneCount}/10</span>
              </div>
            )}
            <button type="button" onClick={onClose} className="flex cursor-pointer items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/20 hover:text-white">
              <X className="h-4 w-4" /> Kapat
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-28 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        {sent ? (
          <div className="anim-pop">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30"><Check className="h-6 w-6" /></span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">Kartın bize ulaştı.</h1>
            {sent.ref && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm">
                <span className="text-white/50">Başvuru no</span><span className="font-semibold tabular-nums">{sent.ref}</span>
              </div>
            )}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">
              <b className="font-medium text-white">{v.proje}</b> için gönderdiğin kartı aldık. Projene dört soruyla bakacağız; dönüşümüz <b className="font-medium text-white">{v.email}</b> adresine gelecek.
            </p>

            <ol className="mt-10 max-w-lg space-y-0">
              {[['Kartın ulaştı', 'PDF olarak masamızda.', true], ['Projene bakıyoruz', 'Problem, hedef kişi, kapsam ve para eden taraf.', false], ['Dönüş', 'Değerlendirmemiz e-postana gelir.', false]].map(([t, d, ok], i, a) => (
                <li key={t} className="relative flex gap-4 pb-7">
                  {i < a.length - 1 && <span className="absolute left-[11px] top-7 h-[calc(100%-20px)] w-px bg-white/15" />}
                  <span className={`relative mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs ${ok ? 'bg-white text-[#010101]' : 'bg-white/10 text-white/60 ring-1 ring-white/15'}`}>{ok ? <Check className="h-3.5 w-3.5" /> : i + 1}</span>
                  <div><div className="font-medium">{t}</div><div className="mt-0.5 text-sm text-white/50">{d}</div></div>
                </li>
              ))}
            </ol>

            {!uye && (
              <div className="mt-2 max-w-lg rounded-2xl bg-white/[0.05] p-6 ring-1 ring-white/10">
                <div className="font-medium">Yazılı rapor ve canlı inceleme Fight Club üyelerine.</div>
                <p className="mt-1 text-sm text-white/55">Şu an ayda 9$, istediğin an iptal edebilirsin. Katıldığında raporun hazırlanır.</p>
                <PrimaryLink href={SKOOL_ABOUT} target="_blank" rel="noopener" className="mt-4">Fight Club'a katıl <ArrowRight className="ml-1.5 h-4 w-4" /></PrimaryLink>
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {uye && <PrimaryLink href={SKOOL_HOME} target="_blank" rel="noopener">Skool'a dön</PrimaryLink>}
              <button type="button" onClick={yeni} className="cursor-pointer rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">Yeni kart oluştur</button>
              <button type="button" onClick={onClose} className="cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-white">Siteye dön</button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <span className="text-sm font-medium text-white/50">Proje kartı</span>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Projeni anlat, <em className="font-serif font-normal text-white/50">birlikte inceleyelim.</em>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
              On kısa alan, yaklaşık beş dakika. Kartın numaralanıp PDF olarak bize ulaşır; projene dört soruyla bakarız. Yazdıkların bu cihazda taslak olarak saklanır.
            </p>

            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input tabIndex={-1} autoComplete="off" value={v._honey} onChange={(e) => set('_honey', e.target.value)} />
            </div>

            <div className="mt-12 grid gap-10">
              <Section n="01" title="Sen" text="Dönüşümüzü nereye yapacağımızı bilelim.">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="k-ad" label="Ad soyad" error={err.ad}>
                    <input id="k-ad" className={inputCls(err.ad)} value={v.ad} maxLength={80} autoComplete="name" placeholder="Adın soyadın" onChange={(e) => set('ad', e.target.value)} />
                  </Field>
                  <Field id="k-email" label="E-posta" error={err.email}>
                    <input id="k-email" type="email" inputMode="email" className={inputCls(err.email)} value={v.email} maxLength={120} autoComplete="email" placeholder="ornek@mail.com" onChange={(e) => set('email', e.target.value)} />
                  </Field>
                </div>
              </Section>

              <Section n="02" title="Proje" text="Neyi, kim için çözüyorsun?">
                <Field id="k-proje" label="Proje adı" hint="Ne dersen de, hatırlaman yeter." error={err.proje}>
                  <input id="k-proje" className={inputCls(err.proje)} value={v.proje} maxLength={100} placeholder="Örn. Kuaför Randevu Asistanı" onChange={(e) => set('proje', e.target.value)} />
                </Field>
                <Field id="k-problem" label="Problem, tek cümle" hint="Kim, ne işi yaparken, ne sorun yaşıyor? İki cümle çıkıyorsa henüz problemi bulamamışsın; bu da bir bilgi." error={err.problem}
                  counter={<span className={`text-xs tabular-nums ${v.problem.length > 180 ? 'text-amber-300' : 'text-white/35'}`}>{v.problem.length}/200</span>}>
                  <textarea id="k-problem" rows={2} className={`${inputCls(err.problem)} resize-none leading-relaxed`} value={v.problem} maxLength={200} placeholder="Tek başına çalışan kuaförler, saç keserken gelen randevu mesajlarına cevap veremiyor." onChange={(e) => set('problem', e.target.value)} />
                </Field>
                <Field id="k-kim" label="Kim için?" hint={'"Herkes" yazma. Tek bir kişi tarif et.'} error={err.kim}>
                  <input id="k-kim" className={inputCls(err.kim)} value={v.kim} maxLength={200} placeholder="Örn. İstanbul'da tek koltuklu salon işleten bir kuaför" onChange={(e) => set('kim', e.target.value)} />
                </Field>
              </Section>

              <Section n="03" title="Durum" text="Şu an nerede olduğunu ve neyin seni durdurduğunu anlat.">
                <Field id="k-durum" label="Elinde ne var?" hint="Yok demek ayıp değil, ama neye bakacağımızı bilmemiz lazım." error={err.durum}>
                  <Segmented id="k-durum" options={DURUM} value={v.durum} onChange={(o) => set('durum', o)} error={err.durum} />
                </Field>
                {v.durum && v.durum !== 'Henüz yok' && (
                  <Field id="k-link" label={v.durum === 'Ekran kaydı' ? 'Ekran kaydının linki' : 'Link'} hint={v.durum === 'Ekran kaydı' ? 'Loom, Google Drive ya da liste dışı YouTube linki.' : 'Bakabileceğimiz canlı adres.'} error={err.link}>
                    <input id="k-link" type="url" inputMode="url" className={inputCls(err.link)} value={v.link} maxLength={300} placeholder="https://" onChange={(e) => set('link', e.target.value)} />
                  </Field>
                )}
                <Field id="k-takildim" label="Nerede takıldın?" hint={'Ne denedin, ne oldu, hata mesajı ne? "Olmuyor" yazma.'} error={err.takildim}
                  counter={v.takildim.length > 2500 && <span className="text-xs tabular-nums text-amber-300">{v.takildim.length}/3000</span>}>
                  <textarea id="k-takildim" rows={5} className={`${inputCls(err.takildim)} resize-y leading-relaxed`} value={v.takildim} maxLength={3000} placeholder="Ne denedim, ne oldu, hata mesajı ne?" onChange={(e) => set('takildim', e.target.value)} />
                </Field>
              </Section>

              <Section n="04" title="Beklenti" text="Bizden ne istediğini ve kartın nasıl kullanılabileceğini seç.">
                <Field id="k-istek" label="Bizden ne istiyorsun?" hint="Birden fazla seçebilirsin." error={err.istek}>
                  <div id="k-istek" tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
                    {ISTEK.map((o) => {
                      const on = v.istek.includes(o)
                      return (
                        <button key={o} type="button" aria-pressed={on} onClick={() => toggleIstek(o)}
                          className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors ${on ? 'bg-white text-[#010101] ring-white' : `bg-white/[0.06] text-white/70 hover:text-white ${err.istek ? 'ring-red-400/60' : 'ring-white/10 hover:ring-white/30'}`}`}>
                          {on && <Check className="h-3.5 w-3.5" />}{o}
                        </button>
                      )
                    })}
                  </div>
                </Field>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="k-yayin" label="Canlı yayında gösterilebilir mi?" hint="Gizli bilgi, müşteri verisi ya da API anahtarı varsa hayır de." error={err.yayin}>
                    <Segmented id="k-yayin" options={['Evet', 'Hayır']} value={v.yayin} onChange={(o) => set('yayin', o)} error={err.yayin} />
                  </Field>
                  <Field id="k-uye" label="Fight Club üyesi misin?" hint="Yazılı raporlar üyelere hazırlanıyor." error={err.uye}>
                    <Segmented id="k-uye" options={['Evet, içerideyim', 'Henüz değil']} value={v.uye} onChange={(o) => set('uye', o)} error={err.uye} />
                  </Field>
                </div>
              </Section>

              <div className="border-t border-white/10 pt-8">
                <label id="k-onay" tabIndex={-1} className={`flex cursor-pointer items-start gap-3 rounded-xl p-4 text-sm leading-relaxed text-white/70 outline-none ring-1 ${err.onay ? 'ring-red-400/60' : 'ring-white/10'}`}>
                  <input type="checkbox" checked={v.onay} onChange={(e) => set('onay', e.target.checked)} className="mt-1 h-4 w-4 flex-none accent-white" />
                  <span>
                    Bilgilerimin projemin incelenmesi için saklanmasını, bu amaçla yurt dışında bulunan e-posta ve barındırma hizmetlerine aktarılmasını ve bana e-posta gönderilmesini kabul ediyorum.{' '}
                    <a href="#kvkk" className="text-white underline underline-offset-2">Aydınlatma metni</a>
                  </span>
                </label>
                {err.onay && <p className="mt-2 text-[13px] text-red-300">{err.onay}</p>}

                {genel && <p role="alert" className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-400/30">{genel}</p>}
                {tried && Object.keys(err).length > 0 && !genel && (
                  <p role="alert" className="mt-5 text-sm text-red-300">{Object.keys(err).length} alan eksik ya da hatalı; işaretli yerleri düzelt.</p>
                )}

                <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-center text-xs text-white/40 sm:text-left">Kartın PDF olarak bize ulaşır.</span>
                  <button type="submit" disabled={sending}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-[#010101] transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
                    {sending ? 'Gönderiliyor…' : <>Kartı gönder <ArrowRight className="h-4 w-4" /></>}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-3 flex items-center justify-between text-xs text-white/40">
              <span>{sent ? 'Bize ulaşan kart' : 'Canlı önizleme'}</span>
              <span>PDF</span>
            </div>
            <Preview v={v} ref_={sent?.ref} done={!!sent} />
          </div>
        </aside>
      </div>
    </div>
  )
}
