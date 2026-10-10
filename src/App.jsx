import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4'
const SKOOL_ABOUT = 'https://www.skool.com/diffpov-akademi-8549/about'
const SKOOL_HOME = 'https://www.skool.com/diffpov-akademi-8549'
// Başvurular buraya gider (FormSubmit, ilk gönderimde onay maili ister)
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/diffpov2@outlook.com'

const NAV = [
  { label: 'Nasıl çalışıyor', href: '#nasil' },
  { label: 'Neye bakıyoruz', href: '#bakis' },
  { label: 'Topluluk', href: SKOOL_ABOUT, external: true, chevron: true },
  { label: 'Proje kartı', href: '#kart' },
]

const PANELS = ['nasil', 'bakis', 'kart']

function Logo({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" className={className} aria-hidden="true">
      <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
    </svg>
  )
}

function linkProps(item) {
  return item.external ? { href: item.href, target: '_blank', rel: 'noopener' } : { href: item.href }
}

function useHashPanel() {
  const read = () => {
    const id = window.location.hash.replace('#', '')
    return PANELS.includes(id) ? id : null
  }
  const [panel, setPanel] = useState(read)
  useEffect(() => {
    const onHash = () => setPanel(read())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  const close = useCallback(() => {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setPanel(null)
  }, [])
  return [panel, close]
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panel, closePanel] = useHashPanel()
  const [prefillEmail, setPrefillEmail] = useState('')
  const [heroEmail, setHeroEmail] = useState('')

  useEffect(() => {
    document.body.style.overflow = menuOpen || panel ? 'hidden' : ''
  }, [menuOpen, panel])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (panel) closePanel()
      else setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panel, closePanel])

  useEffect(() => {
    if (panel) setMenuOpen(false)
  }, [panel])

  const startCard = (e) => {
    e.preventDefault()
    setPrefillEmail(heroEmail.trim())
    window.location.hash = 'kart'
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Nav */}
        <nav className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
          <a href="#" className="flex items-center gap-2" aria-label="Fight Club">
            <Logo className="fill-[#010101] lg:fill-white" />
            <span className="text-lg font-semibold text-[#010101] lg:text-white">fight club</span>
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-lg">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  {...linkProps(item)}
                  className="flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                  {item.chevron && <ChevronDown className="h-3.5 w-3.5" />}
                </a>
              ))}
            </div>
            <a
              href="#kart"
              className="cta-gradient flex items-center self-stretch rounded-full px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Kartı gönder
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={menuOpen}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#010101] backdrop-blur-lg md:hidden lg:text-white"
          >
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100 text-white' : '-rotate-90 scale-0 opacity-0'}`}
            />
          </button>
        </nav>

        {/* Mobile overlay + drawer */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />
        <aside
          className={`fixed right-0 top-0 z-40 flex h-full w-72 flex-col bg-black/90 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          aria-hidden={!menuOpen}
        >
          <div className="flex flex-col gap-2 px-6 pt-24">
            {NAV.map((item, i) => (
              <a
                key={item.label}
                {...linkProps(item)}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                  transition: 'opacity 400ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1), background-color 150ms, color 150ms',
                  transitionDelay: menuOpen ? `${(i + 1) * 60}ms` : '0ms',
                }}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                {item.label}
                {item.chevron && <ChevronDown className="h-4 w-4" />}
              </a>
            ))}
          </div>
          <div
            className="mt-auto px-6 pb-10"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 400ms ease, transform 400ms ease',
              transitionDelay: menuOpen ? '300ms' : '0ms',
            }}
          >
            <a
              href="#kart"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="cta-gradient block w-full rounded-full px-6 py-3 text-center text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Kartı gönder
            </a>
          </div>
        </aside>

        {/* Bottom-anchored content */}
        <div className="mt-auto flex flex-col gap-6 px-5 pb-8 sm:gap-8 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-16">
          <div className="max-w-xl">
            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-[#010101] sm:text-4xl lg:text-[3.5rem] lg:text-white">
              Projeni getir, birlikte inceleyelim
            </h1>

            <form
              onSubmit={startCard}
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:inline-flex sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5"
            >
              <input
                type="email"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                placeholder="E-posta adresin"
                autoComplete="email"
                aria-label="E-posta adresin"
                className="rounded-full bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none sm:w-64 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-2"
              />
              <button
                type="submit"
                className="cta-gradient cursor-pointer rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:py-2.5"
              >
                Kartı doldur
              </button>
            </form>
          </div>

          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5">
            <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">
              <div
                className="text-3xl font-normal tracking-tight text-[#010101] sm:text-4xl lg:text-white"
                style={{ fontFamily: "'Silkscreen', cursive" }}
              >
                9$/ay
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#010101]/70 sm:mt-4 lg:text-white/70">
                Şu anki üyelik. Yapay zekayla fikrini projeye, projeni işe dönüştürenlerin kulübü.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-black text-xs font-bold text-white">F</span>
                <span className="text-sm font-semibold text-[#010101] lg:text-white">Proje kartı</span>
              </div>
              <p className="text-sm leading-relaxed text-[#010101]/80 lg:text-white/80">
                Problem ne, kim için, şu an ne var, nerede takıldın. Kartı gönder; projene bakıp sıradaki adımı yazılı olarak dönelim.
              </p>
              <div className="mt-4 flex items-center gap-3 sm:mt-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black">
                  <Logo className="h-4 w-4 fill-white" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-[#010101] lg:text-white">5 dakika</div>
                  <div className="text-xs text-[#010101]/60 lg:text-white/60">Rapor e-postana gelir</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Panel open={panel === 'nasil'} onClose={closePanel} label="Nasıl çalışıyor">
        <Eyebrow>Nasıl çalışıyor</Eyebrow>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Üç adım, beş dakika</h2>
        <List
          items={[
            ['Kartı doldur', 'Problem ne, kim için, şu an ne var, nerede takıldın. Beş dakika sürüyor.'],
            ['Projene bakıyoruz', 'Mantıklı mı, eksikler ne, sıradaki adım ne.'],
            ['Yazılı rapor', 'Fight Club üyelerine 5 maddelik raporu e-postayla gönderiyoruz. Talep olursa canlı yayında birlikte açıyoruz.'],
          ]}
        />
        <div className="mt-6 flex flex-wrap gap-2">
          <PrimaryLink href="#kart">Kartı doldur</PrimaryLink>
          <GhostLink href="#bakis">Neye bakıyoruz</GhostLink>
        </div>
      </Panel>

      <Panel open={panel === 'bakis'} onClose={closePanel} label="Neye bakıyoruz">
        <Eyebrow>İnceleme çerçevesi</Eyebrow>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Her projeye aynı dört soru</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Raporun bu dört soruya cevap verir. İstersen önce kendin cevapla, sonra raporla karşılaştır.
        </p>
        <List
          items={[
            ['Problem gerçek mi?', 'Birisi bu sorunu bugün yaşıyor ve çözmek için uğraşıyor mu?'],
            ['Kim için, net mi?', '"Herkes" değil; tarif edebileceğin tek bir kişi.'],
            ['Kapsam küçük mü?', 'İlk sürüm bu hafta bitecek kadar dar mı?'],
            ['Para eden taraf nerede?', 'Kim, neye, neden para öder?'],
          ]}
        />
        <div className="mt-6">
          <PrimaryLink href="#kart">Kartı doldur</PrimaryLink>
        </div>
      </Panel>

      <Panel open={panel === 'kart'} onClose={closePanel} label="Proje kartı">
        <CardForm open={panel === 'kart'} prefillEmail={prefillEmail} />
      </Panel>
    </section>
  )
}

/* ---------- panel parçaları ---------- */

function Panel({ open, onClose, label, children }) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => {
      const first = closeRef.current?.parentElement.querySelector('input:not([type=hidden]):not([tabindex="-1"]), textarea')
      ;(first || closeRef.current)?.focus({ preventScroll: true })
    }, 80)
    return () => clearTimeout(t)
  }, [open])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] flex items-end justify-center p-3 transition-opacity duration-300 sm:items-center sm:p-5 ${open ? 'opacity-100' : 'pointer-events-none invisible opacity-0'}`}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div
        className={`relative max-h-[calc(100dvh-24px)] w-full max-w-xl overflow-y-auto rounded-2xl bg-white/10 p-6 text-white ring-1 ring-white/10 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 ${open ? 'translate-y-0' : 'translate-y-4'}`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  )
}

function Eyebrow({ children }) {
  return <span className="mb-2 block text-xs font-medium text-white/50">{children}</span>
}

function List({ items }) {
  return (
    <ol className="mt-6 flex flex-col gap-2">
      {items.map(([title, text], i) => (
        <li key={title} className="flex gap-4 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
          <span className="pt-0.5 text-xs text-white/40 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <div className="text-[15px] font-medium">{title}</div>
            <p className="mt-1 text-sm leading-relaxed text-white/60">{text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function PrimaryLink({ href, children, ...rest }) {
  return (
    <a href={href} {...rest} className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#010101] transition-opacity hover:opacity-90">
      {children}
    </a>
  )
}

function GhostLink({ href, children, ...rest }) {
  return (
    <a href={href} {...rest} className="inline-flex items-center rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white">
      {children}
    </a>
  )
}

/* ---------- proje kartı formu ---------- */

const STEPS = [
  { key: 'ad', type: 'text', q: 'Adın ne?', placeholder: 'Adın soyadın', autoComplete: 'name' },
  { key: 'email', type: 'email', q: 'E-posta adresin', placeholder: 'ornek@mail.com', autoComplete: 'email', hint: 'Raporu buraya göndereceğiz.' },
  { key: 'proje', type: 'text', q: 'Projenin adı', placeholder: 'Proje adı', hint: 'Ne dersen de, hatırlaman yeter.' },
  { key: 'problem', type: 'textarea', max: 200, q: 'Problem, tek cümle', placeholder: '[Kim] [şu işi yaparken] [şu sorunu yaşıyor]', hint: 'İki cümle çıkıyorsa henüz problemi bulamamışsın; bu da bir bilgi.' },
  { key: 'kim', type: 'text', q: 'Kim için?', placeholder: 'Örn. tek başına çalışan bir diş hekimi', hint: '"Herkes" yazma. Tek bir kişi tarif et.' },
  { key: 'durum', type: 'radio', q: 'Şu an elinde ne var?', options: ['Çalışan bir link', 'Ekran kaydı', 'Henüz yok'], hint: 'Yok demek ayıp değil, ama neye bakacağımızı bilmemiz lazım.' },
  { key: 'takildim', type: 'textarea', q: 'Nerede takıldın?', placeholder: 'Ne denedim, ne oldu, hata mesajı ne?', hint: 'Net yaz: ne denedin, ne oldu, hata mesajı ne. "Olmuyor" yazma.' },
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

function CardForm({ open, prefillEmail }) {
  const [v, setV] = useState(EMPTY)
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const fieldRef = useRef(null)

  const step = STEPS[i]
  const last = i === STEPS.length - 1
  const needsLink = step.key === 'durum' && v.durum && v.durum !== 'Henüz yok'

  useEffect(() => {
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
    const card = {
      Ad: v.ad.trim(),
      'E-posta': v.email.trim(),
      'Proje adı': v.proje.trim(),
      'Problem (tek cümle)': v.problem.trim(),
      'Kim için': v.kim.trim(),
      'Şu an ne var': v.durum + (v.durum !== 'Henüz yok' && v.link ? ' – ' + v.link.trim() : ''),
      'Takıldığım yer': v.takildim.trim(),
      'Bizden ne istiyorum': v.istek.join(', '),
      'Yayında gösterilebilir mi': v.yayin,
      'Fight Club üyesi': v.uye,
      'KVKK onayı': 'Evet',
      Tarih: new Date().toLocaleString('tr-TR'),
    }
    if (v._honey) return setSent(true)
    setSending(true)
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ _subject: 'Proje Kartı – ' + card.Ad, _template: 'box', _captcha: 'false', email: card['E-posta'], ...card }),
      })
      if (!r.ok) throw new Error(String(r.status))
      setSent(true)
    } catch {
      setError('Gönderilemedi. Bağlantını kontrol edip tekrar dene.')
    } finally {
      setSending(false)
    }
  }

  const reset = () => {
    setV(EMPTY)
    setSent(false)
    setDir(1)
    setI(0)
  }

  const onKeyDown = (e) => {
    if (e.key !== 'Enter') return
    if (e.target.tagName === 'TEXTAREA' && !(e.ctrlKey || e.metaKey)) return
    if (e.target.tagName === 'BUTTON') return
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
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
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
            {step.max && (
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
            placeholder={v.durum === 'Ekran kaydı' ? 'Ekran kaydının linki (Loom, Drive, YouTube...)' : 'https://'}
            value={v.link}
            onChange={(e) => set('link', e.target.value)}
            className={`${inputCls} mt-3`}
          />
        )}

        {step.hint && <p className="mt-3 text-sm leading-relaxed text-white/50">{step.hint}</p>}

        {step.consent && (
          <>
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/80">
              <input type="checkbox" checked={v.onay} onChange={(e) => set('onay', e.target.checked)} className="mt-1 h-4 w-4 flex-none accent-white" />
              <span>Bilgilerimin projemin incelenmesi için saklanmasını ve bana e-posta gönderilmesini kabul ediyorum.</span>
            </label>
            <details className="mt-3 text-xs text-white/50">
              <summary className="cursor-pointer text-white/70">Aydınlatma metni</summary>
              <p className="mt-2 leading-relaxed">
                Bu formda verdiğin ad, e-posta ve proje bilgileri yalnızca projeni incelemek ve sana dönüş yapmak için kullanılır, üçüncü kişilerle paylaşılmaz. Bilgilerinin silinmesini istersen diffpov2@outlook.com adresine yazman yeterli.
              </p>
            </details>
          </>
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
