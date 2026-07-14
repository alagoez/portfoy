import { useEffect, useState } from 'react'
import {
  Video, Library, Bot, Rocket, MessagesSquare, Target,
  Check, X, ShieldCheck, ArrowRight, Flame, Play,
} from 'lucide-react'
import {
  SKOOL_URL, WHATSAPP_URL, PRICE, FOUNDING_MEMBER_LIMIT, SHOW_VSL,
  hero, marqueeWords, rules, proofStats, story, projects, loop, whoFor,
  curriculum, communityFeatures, pricingChecklist, guarantee, faq,
} from './content.js'
import {
  PunchLink, MarqueeBand, FlipWord, SpinText,
  GrainOverlay, ScrollProgress, Cursor, MusicToggle, trackLead,
} from './ui.jsx'
import { initMotion } from './anim.js'
import storyImg from './assets/story.jpg'

const ICONS = {
  video: Video, library: Library, bot: Bot,
  rocket: Rocket, messages: MessagesSquare, target: Target,
}
const ICON_COLORS = ['text-accent bg-accent-light', 'text-orange-500 bg-orange-50', 'text-violet-500 bg-violet-50', 'text-emerald-500 bg-emerald-50', 'text-sky-500 bg-sky-50', 'text-pink-500 bg-pink-50']

function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`px-5 py-16 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}

function SectionTitle({ kicker, title, center = true }) {
  return (
    <div data-reveal className={`mb-10 sm:mb-14 ${center ? 'text-center' : ''}`}>
      {kicker && <p className="mb-3 font-hand text-2xl text-accent">{kicker}</p>}
      <h2 className="font-display text-4xl uppercase leading-[1.05] sm:text-6xl">{title}</h2>
    </div>
  )
}

// ── Bölümler ───────────────────────────────────────────────────────

function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <span className="font-display text-xl tracking-wide">
          2DIFF<span className="text-accent">POV</span>
        </span>
        <a
          href={SKOOL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={trackLead}
          className="btn-punch rounded-xl px-4 py-2 text-sm font-bold sm:px-5"
        >
          Katıl — ${PRICE.current}/ay
        </a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:pb-28 sm:pt-24">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[38rem] max-w-full -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      {/* Yüzen kulüp kartları — parallax */}
      <div data-float className="floaty pointer-events-none absolute left-[4%] top-32 hidden w-44 rotate-[-7deg] rounded-2xl p-4 text-white shadow-xl lg:block" style={{ '--r': '-7deg', background: 'linear-gradient(135deg, #dc2626, #f97316)' }}>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider opacity-80">Kural 01</p>
        <p className="mt-1 font-display text-lg leading-tight">ÜRETMEKTEN BAHSETME.</p>
      </div>
      <div data-float className="floaty pointer-events-none absolute right-[5%] top-40 hidden w-44 rotate-[6deg] rounded-2xl p-4 text-white shadow-xl lg:block" style={{ '--r': '6deg', animationDelay: '-2s', background: 'linear-gradient(135deg, #0891b2, #10b981)' }}>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider opacity-80">Bugünün görevi</p>
        <p className="mt-1 font-display text-lg leading-tight">1 VİDEO ÇEK 🎥</p>
      </div>
      <div data-float className="floaty pointer-events-none absolute bottom-40 right-[12%] hidden w-40 rotate-[-4deg] rounded-2xl p-4 text-white shadow-xl xl:block" style={{ '--r': '-4deg', animationDelay: '-3.5s', background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider opacity-80">Mod: Aksiyon</p>
        <p className="mt-1 font-display text-lg leading-tight">BAHANE YOK.</p>
      </div>
      <div data-float className="floaty pointer-events-none absolute bottom-36 left-[7%] hidden w-44 rotate-[5deg] rounded-2xl p-4 text-white shadow-xl lg:block" style={{ '--r': '5deg', animationDelay: '-1.2s', background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider opacity-80">İlk 30 gün</p>
        <p className="mt-1 font-display text-lg leading-tight">PROJEN YAYINDA →</p>
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <p className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500 shadow-sm backdrop-blur sm:text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {hero.eyebrow}
        </p>

        <h1 className="rise mx-auto font-hero leading-[1.02] tracking-tight" style={{ animationDelay: '0.08s' }}>
          <span className="block text-[clamp(2.5rem,15.5vw,3.75rem)] sm:text-9xl">{hero.titleTop}</span>
          <span className="block text-[clamp(2.5rem,15.5vw,3.75rem)] italic text-accent sm:text-9xl">
            <FlipWord words={hero.flipWords} />
          </span>
        </h1>

        <p
          className="rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg"
          style={{ animationDelay: '0.16s' }}
        >
          {hero.subtitle}
        </p>

        <div
          className="rise relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          style={{ animationDelay: '0.24s' }}
        >
          <PunchLink className="w-full sm:w-auto" sub={hero.ctaSub}>{hero.cta}</PunchLink>
          <a
            href="#kurallar"
            className="w-full rounded-2xl border border-neutral-200 px-8 py-4 text-base font-bold text-neutral-600 transition hover:border-neutral-400 hover:text-ink sm:w-auto"
          >
            {hero.secondaryCta}
          </a>
          <span className="pointer-events-none absolute -right-2 -top-9 hidden rotate-[8deg] font-hand text-2xl text-accent md:block">
            {hero.annotation} ↴
          </span>
        </div>

        <div
          className="rise mx-auto mt-12 grid max-w-lg grid-cols-3 divide-x divide-neutral-200 rounded-2xl border border-neutral-200 bg-white/90 py-4 shadow-sm backdrop-blur sm:mt-16 sm:py-5"
          style={{ animationDelay: '0.34s' }}
        >
          {proofStats.map((s) => (
            <div key={s.label} className="px-2">
              <p className="font-display text-3xl sm:text-4xl">
                <span data-count={s.value}>{s.value}</span>
              </p>
              <p className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-wide text-neutral-400 sm:text-[10px]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RedBand() {
  return (
    <div className="rotate-[-1.5deg] scale-105 bg-accent py-3 text-white shadow-lg">
      <MarqueeBand words={marqueeWords} speed="20s" />
    </div>
  )
}

function Rules() {
  return (
    <Section id="kurallar" className="relative overflow-hidden pt-20 sm:pt-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      <SectionTitle kicker="önce kurallar" title={rules.title} />
      <div className="mx-auto max-w-3xl">
        {rules.items.map((rule, i) => (
          <div
            key={rule}
            data-rule
            className="flex items-start gap-5 border-b border-neutral-200 py-6 last:border-0 sm:gap-8 sm:py-8"
          >
            <span className="mt-1 shrink-0 font-mono text-sm font-bold tabular-nums text-accent sm:text-base">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className={`font-display text-2xl uppercase leading-tight sm:text-4xl ${i === 1 ? 'glitch text-accent' : ''}`}>
              {rule}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Vsl() {
  if (!SHOW_VSL) return null
  return (
    <Section className="pt-0">
      <div data-reveal className="mx-auto aspect-video max-w-3xl overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950 shadow-2xl">
        {/* VSL hazır olunca YouTube embed veya <video> buraya */}
        <div className="flex h-full items-center justify-center gap-2 text-neutral-500">
          <Play className="h-5 w-5" /> Video yakında
        </div>
      </div>
    </Section>
  )
}

function Story() {
  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <SectionTitle kicker="hikayemiz" title={story.title} center={false} />
          <div data-reveal className="-mt-4 space-y-4 text-base leading-relaxed text-neutral-600 sm:-mt-8">
            {story.paragraphs.map((p, i) => (
              <p key={i} className={i === story.paragraphs.length - 1 ? 'font-bold text-ink' : ''}>
                {p}
              </p>
            ))}
          </div>
        </div>
        {/* Polaroid çerçeve */}
        <div data-reveal data-delay="0.15" className="relative mx-auto w-full max-w-sm">
          <div className="rotate-[3deg] rounded-lg bg-white p-3 pb-14 shadow-2xl transition-transform duration-500 hover:rotate-0">
            <img
              src={storyImg}
              alt="Fırat & Alperen — çekim arasında"
              className="aspect-square w-full rounded-sm object-cover"
            />
            <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-2xl text-neutral-600">
              iki farklı bakış açısı ✌
            </p>
          </div>
          <span className="absolute -left-3 -top-3 h-8 w-16 rotate-[-35deg] bg-accent/20 backdrop-blur-sm" />
          <span className="absolute -right-3 -top-2 h-8 w-16 rotate-[30deg] bg-accent/20 backdrop-blur-sm" />
        </div>
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <section data-hscroll className="flex flex-col justify-center overflow-hidden py-16 sm:py-0 md:h-screen">
      <div className="mx-auto w-full max-w-5xl px-5">
        <SectionTitle kicker="kanıt — kaydır" title="Bunları biz ürettik" center={false} />
      </div>
      <div
        data-hscroll-track
        className="hscroll-mobile flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:snap-none md:overflow-x-visible md:px-[8vw] md:pb-0"
      >
        {projects.map((p, i) => (
          <div
            key={p.name}
            className="relative flex h-[380px] w-[78vw] max-w-[400px] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[2rem] p-7 text-white shadow-xl md:h-[440px] md:w-[420px] md:max-w-none"
            style={{ background: p.gradient }}
          >
            <span className="pointer-events-none absolute -right-4 -top-10 font-display text-[9rem] leading-none text-white/15">
              {String(i + 1).padStart(2, '0')}
            </span>
            {p.shot && (
              <img
                src={p.shot}
                alt={`${p.name} ekran görüntüsü`}
                className="pointer-events-none absolute -bottom-16 -right-5 w-36 rotate-[7deg] rounded-[1.4rem] border-4 border-white/25 shadow-2xl md:w-40"
              />
            )}
            <div className="relative flex items-start justify-between">
              <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                {p.tag}
              </span>
              {p.status === 'CANLI' && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] font-semibold backdrop-blur">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  </span>
                  CANLI
                </span>
              )}
            </div>
            <div className="relative max-w-[65%]">
              {p.status === 'SATILDI' && (
                <span className="stamp mb-4 inline-block bg-white/90 text-xl">SATILDI</span>
              )}
              <p className="font-display text-4xl uppercase leading-none md:text-5xl">{p.name}</p>
            </div>
          </div>
        ))}
        {/* Kapanış kartı */}
        <div className="relative flex h-[380px] w-[78vw] max-w-[400px] shrink-0 snap-center flex-col items-center justify-center gap-5 rounded-[2rem] border-2 border-dashed border-neutral-300 p-7 text-center md:h-[440px] md:w-[420px] md:max-w-none">
          <p className="font-display text-3xl uppercase leading-tight text-neutral-400 md:text-4xl">
            Sıradaki proje<br />
            <span className="text-ink">seninki.</span>
          </p>
          <PunchLink>Kulübe Katıl</PunchLink>
        </div>
      </div>
    </section>
  )
}

function Loop() {
  return (
    <Section id="sistem" className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute right-6 top-6 hidden text-neutral-300 sm:block">
        <SpinText text="ÜRET • PAYLAŞ • SAT • TEKRARLA • " size={110}>
          <Flame className="h-6 w-6 text-accent" />
        </SpinText>
      </div>
      <SectionTitle kicker="sistem" title={loop.title} />
      <div className="grid gap-3 sm:gap-4 md:grid-cols-4">
        {loop.steps.map((s, i) => (
          <div key={s.n} data-reveal data-delay={i * 0.08} className="group relative">
            <div className="h-full rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition duration-300 group-hover:-translate-y-1.5 group-hover:border-accent/50 group-hover:shadow-lg sm:p-6">
              <p className="font-mono text-sm font-bold text-accent">{s.n}</p>
              <p className="mt-3 font-display text-2xl uppercase">{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">{s.desc}</p>
            </div>
            {i < loop.steps.length - 1 && (
              <span className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-neutral-300 md:block">→</span>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

function WhoFor() {
  return (
    <Section>
      <SectionTitle kicker="dürüst olalım" title="Herkes için değil" />
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <div data-reveal className="h-full rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
          <p className="mb-5 font-display text-2xl uppercase text-emerald-700">Tam sana göre:</p>
          <ul className="space-y-3.5">
            {whoFor.yes.map((t) => (
              <li key={t} className="flex gap-3 text-[15px] font-medium text-neutral-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal data-delay="0.12" className="h-full rounded-3xl border border-neutral-200 bg-neutral-50 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
          <p className="mb-5 font-display text-2xl uppercase text-neutral-400">Sana göre değil:</p>
          <ul className="space-y-3.5">
            {whoFor.no.map((t) => (
              <li key={t} className="flex gap-3 text-[15px] font-medium text-neutral-500">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

const PILLAR_BARS = ['linear-gradient(90deg, #dc2626, #f97316)', 'linear-gradient(90deg, #7c3aed, #2563eb)']

function Curriculum() {
  return (
    <Section>
      <SectionTitle kicker="içerik" title="İki ayak, tek hedef" />
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {curriculum.map((pillar, pi) => (
          <div key={pillar.pillar} data-reveal data-delay={pi * 0.12} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <div className="h-1.5" style={{ background: PILLAR_BARS[pi] }} />
            <div className="p-6 sm:p-8">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                {pillar.pillar}
              </p>
              <p className="mt-2 text-sm text-neutral-500">{pillar.desc}</p>
              <div className="mt-6 space-y-1">
                {pillar.modules.map((m, mi) => (
                  <div key={m.title} className="group flex gap-4 rounded-xl p-2.5 transition duration-200 hover:translate-x-1.5 hover:bg-neutral-50">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 font-mono text-[11px] font-bold text-neutral-500 transition group-hover:bg-accent group-hover:text-white">
                      {pi + 1}.{mi + 1}
                    </span>
                    <div>
                      <p className="font-bold leading-tight">{m.title}</p>
                      <p className="mt-0.5 text-sm text-neutral-500">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// 21st.dev (kokonutd/bento-grid) deseninden uyarlandı
function Community() {
  return (
    <Section>
      <SectionTitle kicker="kulüpte neler var" title="İçerisi dolu" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {communityFeatures.map((f, i) => {
          const Icon = ICONS[f.icon] ?? Flame
          return (
            <div
              key={f.title}
              data-reveal
              data-delay={i * 0.05}
              className={f.colSpan === 2 ? 'md:col-span-2' : 'col-span-1'}
            >
              <div
                className={`group relative h-full overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-4 transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:p-5 ${
                  f.featured ? '-translate-y-0.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]' : ''
                }`}
              >
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    f.featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    backgroundImage: 'radial-gradient(circle at center, rgba(0,0,0,0.02) 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }}
                />
                <div className="relative flex h-full flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 ${ICON_COLORS[i % ICON_COLORS.length]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="rounded-lg bg-black/5 px-2 py-1 font-mono text-[9px] font-bold tracking-wide text-neutral-600 transition-colors group-hover:bg-black/10">
                      {f.status}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-[15px] font-bold tracking-tight text-neutral-900">
                      {f.title}
                      <span className="ml-2 font-hand text-lg font-normal text-neutral-400">{f.meta}</span>
                    </h3>
                    <p className="text-sm leading-snug text-neutral-600">{f.desc}</p>
                  </div>
                  <div className="mt-auto flex items-center gap-2 pt-1 text-xs text-neutral-500">
                    {f.tags?.map((tag) => (
                      <span key={tag} className="rounded-md bg-black/5 px-2 py-1 font-mono text-[10px] transition-colors group-hover:bg-black/10">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

function Pricing() {
  return (
    <Section id="fiyat" className="relative">
      <div className="mx-auto max-w-xl">
        <div data-reveal className="spin-border shadow-2xl">
          <div className="overflow-hidden rounded-[calc(1.6rem-2.5px)] bg-white">
            <div className="relative bg-accent px-6 py-4 text-center sm:px-8">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 sm:text-xs">
                Kurucu üye fiyatı — ilk {FOUNDING_MEMBER_LIMIT} üyeye özel
              </p>
            </div>
            <div className="relative px-6 py-8 text-center sm:px-8 sm:py-10">
              <span className="stamp absolute right-3 top-4 text-xs sm:right-8 sm:top-6 sm:text-base">-%50</span>
              <div className="flex items-end justify-center gap-3">
                <span className="pb-2 text-2xl font-bold text-neutral-300 line-through">${PRICE.old}</span>
                <span className="font-display text-7xl sm:text-8xl">${PRICE.current}</span>
                <span className="pb-2 text-lg font-semibold text-neutral-400">/ay</span>
              </div>
              <p className="mt-3 text-sm font-medium text-neutral-500">
                İlk {FOUNDING_MEMBER_LIMIT} üyeden sonra fiyat ${PRICE.old}/ay olacak.
                <br />
                <span className="font-hand text-xl text-accent">şimdi katıl, fiyatını sonsuza kadar sabitle ✍</span>
              </p>
              <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
                {pricingChecklist.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] font-medium">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9">
                <PunchLink className="w-full" sub="Skool üzerinden güvenli ödeme · istediğin an iptal">
                  Kulübe Katıl
                </PunchLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Guarantee() {
  return (
    <Section>
      <div data-reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-3xl border-2 border-accent/20 bg-accent-light p-8 text-center sm:p-14">
        <SpinText text="30 GÜN GARANTİ • PARAN İADE • 30 GÜN GARANTİ • " size={150} className="text-accent" slow>
          <ShieldCheck className="h-10 w-10 text-accent" />
        </SpinText>
        <div>
          <h2 className="font-display text-3xl uppercase sm:text-5xl">{guarantee.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-neutral-700 sm:text-lg">
            {guarantee.text}
          </p>
          <p className="mt-4 text-sm text-neutral-500">{guarantee.note}</p>
        </div>
      </div>
    </Section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <Section>
      <SectionTitle kicker="sss" title="Aklına takılanlar" />
      <div className="mx-auto max-w-2xl space-y-3">
        {faq.map((item, i) => (
          <div key={item.q} data-reveal data-delay={i * 0.04}>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-neutral-300">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-bold sm:px-6 sm:py-5 sm:text-base"
              >
                {item.q}
                <span className={`shrink-0 font-mono text-lg text-accent transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`acc-body ${open === i ? 'open' : ''}`}>
                <div className="acc-inner">
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-neutral-600 sm:px-6">{item.a}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <p className="font-hand text-2xl text-neutral-500">başka sorun mu var?</p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-punch mt-3 rounded-2xl px-6 py-3 font-bold"
          style={{ boxShadow: '0 6px 0 #059669' }}
        >
          WhatsApp'tan yaz →
        </a>
      </div>
    </Section>
  )
}

function FinalCta() {
  return (
    <Section className="relative overflow-hidden py-24 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div data-zoom className="relative text-center" style={{ transformOrigin: '50% 60%' }}>
        <h2 className="mx-auto font-display uppercase leading-[0.95]">
          <span className="block text-5xl sm:text-8xl">Ya üretirsin.</span>
          <span className="block text-5xl text-accent sm:text-8xl">Ya da paran iade.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base text-neutral-500 sm:text-lg">
          Karar senin. Biz sistemi kurduk — sıra sende.
        </p>
        <div className="mt-10">
          <PunchLink className="w-full sm:w-auto" sub={`$${PRICE.current}/ay — kurucu üye fiyatı`}>
            Kulübe Katıl
          </PunchLink>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-neutral-100 px-5 pb-28 pt-10 sm:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-neutral-400 sm:flex-row">
        <span className="font-display text-lg tracking-wide text-ink">
          2DIFF<span className="text-accent">POV</span>
        </span>
        <p>
          © 2026 — <span className="font-hand text-lg text-neutral-500">Fırat & Alperen</span> · Tüm hakları saklıdır.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-ink">
          İletişim
        </a>
      </div>
    </footer>
  )
}

function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-neutral-200 bg-white/95 p-3 backdrop-blur-md sm:hidden">
      <a
        href={SKOOL_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackLead}
        className="btn-punch btn-shine w-full rounded-xl py-3.5 font-bold"
      >
        Kulübe Katıl — ${PRICE.current}/ay
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

export default function App() {
  useEffect(() => initMotion(), [])
  return (
    <>
      <ScrollProgress />
      <GrainOverlay />
      <Cursor />
      <TopBar />
      <main>
        <Hero />
        <RedBand />
        <Rules />
        <Vsl />
        <Story />
        <Projects />
        <div className="border-y border-neutral-200 py-3 text-neutral-400">
          <MarqueeBand words={marqueeWords} speed="26s" reverse separator="●" />
        </div>
        <Loop />
        <WhoFor />
        <Curriculum />
        <Community />
        <Pricing />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
      <MusicToggle />
    </>
  )
}
