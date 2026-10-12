import { useCallback, useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Plus, X } from 'lucide-react'
import { Eyebrow, GhostLink, Logo, Panel, PrimaryLink, Reveal } from './ui.jsx'
import CardForm from './CardForm.jsx'
import { FAQ, INSIDE, INSTAGRAM, MAIL, NAV, PROJECTS, QUESTIONS, SKOOL_ABOUT, STATS, STEPS, TIKTOK, VIDEO_URL } from './content.js'

const PANELS = ['kart', 'kvkk']
const STATUS_LABEL = { canli: 'Yayında', satildi: 'Satıldı', askida: 'Askıya alındı' }

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

function EmailCta({ value, onChange, onSubmit, dark = false }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-3 sm:inline-flex sm:flex-row sm:items-center sm:gap-0 sm:rounded-full sm:bg-white sm:p-1.5"
    >
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="E-posta adresin"
        autoComplete="email"
        aria-label="E-posta adresin"
        className={`rounded-full bg-white px-5 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none sm:w-64 sm:rounded-none sm:bg-transparent sm:px-4 sm:py-2 ${dark ? 'ring-1 ring-white/10 sm:ring-0' : ''}`}
      />
      <button type="submit" className="cta-gradient cursor-pointer rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:py-2.5">
        Kartı doldur
      </button>
    </form>
  )
}

function SectionHead({ eyebrow, title, accent, text }) {
  return (
    <Reveal className="max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
        {title} {accent && <em className="font-serif text-[1.08em] font-normal tracking-tight text-white/50">{accent}</em>}
      </h2>
      {text && <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">{text}</p>}
    </Reveal>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [panel, closePanel] = useHashPanel()
  const [prefillEmail, setPrefillEmail] = useState('')
  const [heroEmail, setHeroEmail] = useState('')
  const [endEmail, setEndEmail] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const startCard = (email) => (e) => {
    e.preventDefault()
    setPrefillEmail(email.trim())
    window.location.hash = 'kart'
  }

  // Kaydırınca nav koyulaşır; küçük ekranda video açık renkli olduğu için yazılar o zamana kadar koyu
  const navInk = scrolled ? 'text-white' : 'text-[#010101] lg:text-white'
  const logoInk = scrolled ? 'fill-white' : 'fill-[#010101] lg:fill-white'

  return (
    <div className="bg-[#050505] text-white">
      {/* Nav */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-black/70 backdrop-blur-xl ring-1 ring-white/10' : ''}`}>
        <nav className={`mx-auto flex items-center justify-between px-5 transition-[padding] duration-300 sm:px-8 lg:px-12 ${scrolled ? 'py-3' : 'py-5 sm:py-6'}`}>
          <a href="#top" className="flex items-center gap-2" aria-label="Fight Club">
            <Logo className={`transition-colors ${logoInk}`} />
            <span className={`text-lg font-semibold transition-colors ${navInk}`}>fight club</span>
          </a>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-1 rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-lg">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className="rounded-full px-4 py-1.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
            <a href="#kart" className="cta-gradient flex items-center self-stretch rounded-full px-5 text-sm font-medium text-white ring-1 ring-white/10 transition-opacity hover:opacity-90">
              Kartı gönder
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={menuOpen}
            className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-lg md:hidden ${navInk}`}
          >
            <Menu className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
            <X className={`absolute h-5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 text-white opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
          </button>
        </nav>
      </header>

      {/* Mobil menü */}
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
              key={item.href}
              href={item.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(24px)',
                transition: 'opacity 400ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1), background-color 150ms, color 150ms',
                transitionDelay: menuOpen ? `${(i + 1) * 60}ms` : '0ms',
              }}
              className="rounded-xl px-4 py-3.5 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div
          className="mt-auto px-6 pb-10"
          style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 400ms ease, transform 400ms ease', transitionDelay: menuOpen ? '300ms' : '0ms' }}
        >
          <a href="#kart" tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="block w-full rounded-full bg-white px-6 py-3 text-center text-sm font-medium text-[#010101]">
            Kartı gönder
          </a>
        </div>
      </aside>

      <main>
        {/* Hero */}
        <section id="top" className="relative flex min-h-[100svh] w-full flex-col overflow-hidden">
          <video className="absolute inset-0 h-full w-full object-cover" src={VIDEO_URL} autoPlay loop muted playsInline />
          <div className="relative z-10 mt-auto flex flex-col gap-6 px-5 pb-8 pt-28 sm:gap-8 sm:px-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-16">
            <div className="max-w-xl">
              <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-[#010101] sm:text-4xl lg:text-[3.5rem] lg:text-white">
                Projeni getir, birlikte inceleyelim
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-[#010101]/70 sm:text-base lg:text-white/70">
                Yapay zekayla fikrini projeye, projeni işe dönüştür. Proje kartını doldur, projene bakalım.
              </p>
              <div className="mt-6 sm:mt-8">
                <EmailCta value={heroEmail} onChange={setHeroEmail} onSubmit={startCard(heroEmail)} />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5">
              <div className="flex flex-col justify-between rounded-2xl bg-white/10 p-5 backdrop-blur-lg sm:w-64 sm:p-6">
                <div className="font-pixel text-3xl tracking-tight text-[#010101] sm:text-4xl lg:text-white">9$/ay</div>
                <p className="mt-3 text-sm leading-relaxed text-[#010101]/70 sm:mt-4 lg:text-white/70">
                  Fight Club üyeliği. Yapay zekayla fikrini projeye, projeni işe dönüştürenlerin kulübü.
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
                    <div className="text-xs text-[#010101]/60 lg:text-white/60">9 kısa soru</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nasıl çalışıyor */}
        <section id="nasil" className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHead eyebrow="Nasıl çalışıyor" title="Üç adım." accent="Beş dakika." text="Kartı sen dolduruyorsun, gerisini biz düzenliyoruz. Projen hangi aşamada olursa olsun gönderebilirsin." />
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 90} className="rounded-2xl bg-white/[0.04] p-7 ring-1 ring-white/10 sm:p-8">
                  <span className="font-pixel text-2xl text-white/40">{s.n}</span>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/60">{s.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Neye bakıyoruz */}
        <section id="bakis" className="scroll-mt-20 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead eyebrow="İnceleme çerçevesi" title="Her projeye" accent="aynı dört soru." text="Raporun bu dört soruya cevap verir. İstersen önce kendin cevapla, sonra raporla karşılaştır." />
              <ol className="mt-10 grid gap-3">
                {QUESTIONS.map((x, i) => (
                  <Reveal as="li" key={x.q} delay={i * 70} className="flex gap-5 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                    <span className="pt-0.5 text-sm text-white/40 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <div className="font-medium">{x.q}</div>
                      <p className="mt-1 text-sm leading-relaxed text-white/55">{x.a}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Rapor önizlemesi */}
            <Reveal delay={120} className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-10 rounded-[3rem] bg-white/[0.03] blur-2xl" />
              <div className="relative rotate-[-2deg] overflow-hidden rounded-2xl bg-white text-[#0a0a0a] shadow-2xl shadow-black/60">
                <div className="bg-[#0a0a0a] px-6 pb-6 pt-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold"><Logo className="h-4 w-4 fill-white" />fight club</span>
                    <span className="text-[10px] font-semibold tracking-wider text-white/60">PROJE KARTI</span>
                  </div>
                  <div className="mt-5 text-2xl font-bold tracking-tight">Kuaför Randevu Asistanı</div>
                  <div className="mt-1 text-xs text-white/50">FC-261012-K7Q2</div>
                </div>
                <div className="space-y-4 px-6 py-5">
                  <div className="grid grid-cols-3 gap-2">
                    {[['Elinde', 'Çalışan link'], ['Yayın', 'Evet'], ['Üye', 'Evet']].map(([a, b]) => (
                      <div key={a} className="rounded-md bg-neutral-100 px-2.5 py-2 ring-1 ring-neutral-200">
                        <div className="text-[9px] text-neutral-500">{a}</div>
                        <div className="text-xs font-semibold">{b}</div>
                      </div>
                    ))}
                  </div>
                  {[['Problem', [92, 64]], ['Kim için', [78]], ['Nerede takıldı', [95, 88, 52]]].map(([l, bars]) => (
                    <div key={l}>
                      <div className="border-b border-neutral-200 pb-1 text-[10px] font-semibold text-neutral-500">{l}</div>
                      <div className="mt-2 space-y-1.5">{bars.map((w, i) => <div key={i} className="h-1.5 rounded-full bg-neutral-300" style={{ width: `${w}%` }} />)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-2 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-xl sm:-right-8">
                <div className="text-xs text-white/50">Kartın bize böyle ulaşır</div>
                <div className="mt-1 text-sm font-semibold">PDF · numaralı · düzenli</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Biz kimiz */}
        <section id="biz" className="scroll-mt-20 border-t border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
              <SectionHead eyebrow="2diffpov · iki farklı bakış açısı" title="Fikirden yayına giden yolu" accent="biz de yürüdük." />
              <Reveal delay={100} className="space-y-5 text-base leading-relaxed text-white/65 sm:text-lg">
                <p>Yapay zekayla proje yapıyoruz. Bir kısmını sattık, bir kısmında ortak olduk; müşterilerimiz için yaptıklarımız bugün onlara para kazandırıyor.</p>
                <p>Her şey ilk denemede olmadı. İlk startup'ımıza altı ay verdik, bir yarışmada dördüncü olduk ve o projeyi bıraktık. Bırakmadığımız tek şey üretmekti: bir sonrakini yaptık, sonra bir sonrakini.</p>
                <p>Fight Club'ı bu yüzden kurduk. Anlattığımız şeyler eski hikâye değil; şu an ne yapıyorsak onu anlatıyoruz.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <GhostLink href={INSTAGRAM} target="_blank" rel="noopener">Instagram <ArrowUpRight className="ml-1 h-4 w-4" /></GhostLink>
                  <GhostLink href={TIKTOK} target="_blank" rel="noopener">TikTok <ArrowUpRight className="ml-1 h-4 w-4" /></GhostLink>
                </div>
              </Reveal>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 80} className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-7">
                  <div className="font-pixel text-3xl tracking-tight sm:text-4xl">{s.value}</div>
                  <div className="mt-3 text-sm leading-snug text-white/55">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Projeler */}
        <section id="projeler" className="scroll-mt-20 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <SectionHead eyebrow="Projelerimiz" title="Yaptıklarımız," accent="satılanlar dahil." text="Bir kısmı yayında, bir kısmını sattık, bazılarını beklemeye aldık." />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PROJECTS.map((p, i) => {
                const Card = p.url ? 'a' : 'div'
                return (
                  <Reveal key={p.name} delay={(i % 4) * 70}>
                    <Card
                      {...(p.url ? { href: p.url, target: '_blank', rel: 'noopener' } : {})}
                      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/10 transition-colors hover:bg-white/[0.07]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-white/[0.06] to-transparent">
                        <img
                          src={p.shot}
                          alt={`${p.name} ekran görüntüsü`}
                          loading="lazy"
                          className="absolute left-1/2 top-6 w-[46%] -translate-x-1/2 rounded-[1.1rem] shadow-2xl shadow-black/60 ring-1 ring-white/15 transition-transform duration-500 group-hover:-translate-y-1"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold tracking-tight">{p.name}</h3>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${p.status === 'satildi' ? 'bg-white text-[#010101]' : p.status === 'askida' ? 'bg-white/5 text-white/50 ring-1 ring-white/10' : 'bg-white/10 text-white/80'}`}>
                            {p.status === 'canli' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                            {STATUS_LABEL[p.status]}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-white/40">{p.tag}</div>
                        <p className="mt-3 text-sm leading-relaxed text-white/60">{p.text}</p>
                        {p.url && (
                          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-white/80 group-hover:text-white">
                            Siteye git <ArrowUpRight className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    </Card>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Fight Club */}
        <section id="fightclub" className="scroll-mt-20 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.09] to-white/[0.02] ring-1 ring-white/10">
            <div className="grid gap-12 p-7 sm:p-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:p-16">
              <div>
                <Eyebrow>Skool topluluğu</Eyebrow>
                <h2 className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
                  Fight Club. <em className="font-serif text-[1.08em] font-normal text-white/50">Birinci kural: üreteceksin.</em>
                </h2>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {INSIDE.map((b) => (
                    <div key={b.title}>
                      <h3 className="font-semibold">{b.title}</h3>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-white/60">
                        {b.items.map((it) => <li key={it} className="flex gap-2"><span className="text-white/30">—</span>{it}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between rounded-2xl bg-black/40 p-7 ring-1 ring-white/10">
                <div>
                  <div className="text-sm text-white/50">Şu anki üyelik</div>
                  <div className="mt-3 flex items-baseline gap-2"><span className="font-pixel text-6xl tracking-tight">9$</span><span className="text-white/50">/ ay</span></div>
                  <p className="mt-4 text-sm leading-relaxed text-white/60">İstediğin an Skool üzerinden iptal edersin. Taahhüt yok.</p>
                </div>
                <div className="mt-8 flex flex-col gap-2">
                  <PrimaryLink href={SKOOL_ABOUT} target="_blank" rel="noopener" className="py-3">Fight Club'a katıl</PrimaryLink>
                  <GhostLink href="#kart" className="py-3">Önce kartı gönder</GhostLink>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SSS */}
        <section id="sss" className="scroll-mt-20 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <SectionHead eyebrow="Sıkça sorulanlar" title="Aklındaki" accent="sorular." text={<>Burada olmayan bir şey mi var? <a href={`mailto:${MAIL}`} className="text-white underline underline-offset-4">{MAIL}</a></>} />
            <div className="divide-y divide-white/10 border-y border-white/10">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium sm:text-lg">
                    {f.q}
                    <Plus className="h-5 w-5 flex-none text-white/50 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Kapanış */}
        <section className="px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Projeni getir, <em className="font-serif font-normal text-white/50">birlikte inceleyelim.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white/55">Dokuz kısa soru, beş dakika. Projen hangi aşamada olursa olsun.</p>
            <div className="mt-8 flex justify-center">
              <EmailCta value={endEmail} onChange={setEndEmail} onSubmit={startCard(endEmail)} dark />
            </div>
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2"><Logo className="fill-white" /><span className="text-lg font-semibold">fight club</span></div>
            <p className="mt-3 text-sm leading-relaxed text-white/50">Yapay zekayla fikrini projeye, projeni işe dönüştürenlerin kulübü.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <div className="text-white/40">Site</div>
              <ul className="mt-3 space-y-2">{NAV.map((n) => <li key={n.href}><a href={n.href} className="text-white/70 hover:text-white">{n.label}</a></li>)}</ul>
            </div>
            <div>
              <div className="text-white/40">Bağlantılar</div>
              <ul className="mt-3 space-y-2">
                <li><a href={SKOOL_ABOUT} target="_blank" rel="noopener" className="text-white/70 hover:text-white">Skool</a></li>
                <li><a href={INSTAGRAM} target="_blank" rel="noopener" className="text-white/70 hover:text-white">Instagram</a></li>
                <li><a href={TIKTOK} target="_blank" rel="noopener" className="text-white/70 hover:text-white">TikTok</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white/40">İletişim</div>
              <ul className="mt-3 space-y-2">
                <li><a href={`mailto:${MAIL}`} className="break-all text-white/70 hover:text-white">{MAIL}</a></li>
                <li><a href="#kvkk" className="text-white/70 hover:text-white">Aydınlatma metni</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl text-xs text-white/35">© {new Date().getFullYear()} Alta AI Teknoloji Ltd. Şti. · 2diffpov · Birinci kural: üreteceksin.</div>
      </footer>

      <Panel open={panel === 'kart'} onClose={closePanel} label="Proje kartı">
        <CardForm open={panel === 'kart'} prefillEmail={prefillEmail} />
      </Panel>

      <Panel open={panel === 'kvkk'} onClose={closePanel} label="Aydınlatma metni" wide>
        <Kvkk />
      </Panel>
    </div>
  )
}

function Kvkk() {
  const H = ({ children }) => <h3 className="mt-6 font-semibold">{children}</h3>
  return (
    <div className="text-sm leading-relaxed text-white/70">
      <span className="mb-2 block text-xs font-medium text-white/50">KVKK</span>
      <h2 className="pr-10 text-2xl font-semibold tracking-tight text-white">Kişisel verilerin işlenmesine ilişkin aydınlatma metni</h2>
      <p className="mt-4">Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, proje kartı formu aracılığıyla paylaştığın kişisel verilerin nasıl işlendiğini açıklar.</p>
      <H>Veri sorumlusu</H>
      <p>Alta AI Teknoloji Ltd. Şti. (2diffpov · Fight Club)<br />MERSİS: 0059142841500001<br />Mecidiyeköy Mah. Selahattin Pınar Aralığı Sok. Hüseyin Özer İş Merkezi No:3 D:8 Şişli / İstanbul<br />E-posta: <a href={`mailto:${MAIL}`} className="text-white underline underline-offset-2">{MAIL}</a></p>
      <H>İşlenen veriler</H>
      <p>Adın, e-posta adresin, projene ilişkin yazdığın bilgiler (problem, hedef kitle, link, takıldığın yer, isteklerin), canlı yayın tercihin ve Fight Club üyelik durumun.</p>
      <H>İşleme amacı ve hukuki sebep</H>
      <p>Verilerin projeni incelemek, sana e-postayla dönüş yapmak ve istersen kartını canlı yayında ele almak amacıyla, formda verdiğin açık rızaya dayanarak işlenir.</p>
      <H>Aktarım</H>
      <p>Form içeriği, e-posta gönderimi ve sitenin barındırılması için hizmet aldığımız, sunucuları yurt dışında bulunan sağlayıcılara (e-posta altyapısı ve barındırma hizmeti) aktarılır. Bu aktarım formdaki açık rızana dayanır. Veriler üçüncü kişilerle reklam ya da pazarlama amacıyla paylaşılmaz.</p>
      <H>Saklama süresi</H>
      <p>Kartın, inceleme süreci ve sonrasındaki iletişim için en fazla iki yıl saklanır; daha önce silinmesini istersen talebin üzerine silinir.</p>
      <H>Hakların</H>
      <p>Kanun'un 11. maddesi uyarınca verilerinin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini ya da silinmesini isteme ve açık rızanı geri alma hakların var. Taleplerini {MAIL} adresine iletebilirsin.</p>
      <div className="mt-8">
        <a href="#kart" className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#010101]">Forma dön</a>
      </div>
    </div>
  )
}
