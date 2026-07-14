import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Music2 } from 'lucide-react'
import { SKOOL_URL } from './content.js'

export function trackLead() {
  if (typeof window.fbq === 'function') window.fbq('track', 'Lead')
}

// ── Uiverse tarzı basmalı CTA ──────────────────────────────────────
export function PunchLink({ children, sub, className = '', invert = false, href = SKOOL_URL }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackLead}
      className={`btn-punch btn-shine ${invert ? 'btn-invert' : ''} flex-col gap-0.5 px-8 py-4 ${className}`}
    >
      <span className="inline-flex items-center gap-2 text-base font-bold tracking-tight sm:text-lg">
        {children}
        <ArrowRight className="h-4 w-4" />
      </span>
      {sub && <span className="text-xs font-medium opacity-60">{sub}</span>}
    </a>
  )
}

// ── Kayan bant ─────────────────────────────────────────────────────
export function MarqueeBand({ words, className = '', speed = '22s', reverse = false, separator = '✕' }) {
  // Her yarı, en geniş ekrandan bile uzun olsun diye kelime grubu 3 kez
  // tekrarlanır — yoksa bant yarıda boşlukla "kesilmiş" görünür.
  const group = Array.from({ length: 3 }, () => words.flatMap((w) => [w, separator])).flat()
  return (
    <div
      className={`marquee ${reverse ? 'marquee-reverse' : ''} ${className}`}
      style={{ '--marquee-speed': speed }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {group.map((w, i) => (
              <span
                key={`${half}-${i}`}
                className={`px-4 font-display text-lg uppercase tracking-wide sm:text-xl ${
                  w === separator ? 'opacity-40' : ''
                }`}
              >
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Dönen kelime (hero) ────────────────────────────────────────────
export function FlipWord({ words, interval = 2000, className = '' }) {
  const [idx, setIdx] = useState(0)
  const [prev, setPrev] = useState(null)
  const [width, setWidth] = useState(null)
  const currentRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((v) => {
        setPrev(v)
        return (v + 1) % words.length
      })
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  // Kutu genişliği aktif kelimeye yumuşakça uyum sağlar
  useEffect(() => {
    if (currentRef.current) setWidth(currentRef.current.offsetWidth)
  }, [idx])

  // Sabit satır kutusu + clip: kelimeler kayarken satır dışına taşamaz.
  return (
    <span
      className={`relative inline-block overflow-hidden whitespace-nowrap align-bottom ${className}`}
      style={{
        height: '1.12em',
        lineHeight: '1.12em',
        width: width ? `${width}px` : 'auto',
        transition: 'width 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {prev !== null && (
        <span
          key={`out-${prev}`}
          className="word-exit absolute inset-x-0 top-0 text-center"
          aria-hidden="true"
        >
          {words[prev]}
        </span>
      )}
      <span key={`in-${idx}`} ref={currentRef} className="word-enter">
        {words[idx]}
      </span>
    </span>
  )
}

// ── Dairesel dönen yazı rozeti ─────────────────────────────────────
export function SpinText({ text, size = 130, className = '', slow = false, children }) {
  const id = useRef(`circ-${Math.random().toString(36).slice(2, 8)}`)
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={slow ? 'spin-slower' : 'spin-slow'}
      >
        <defs>
          <path id={id.current} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="font-mono" style={{ fontSize: 8.4, letterSpacing: 1.6, fill: 'currentColor', fontWeight: 600 }}>
          <textPath href={`#${id.current}`}>{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

// ── Müzik butonu (eski portfolyodaki parça) ────────────────────────
export function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const ensure = () => {
    if (!audioRef.current) {
      const a = new Audio('/v2/portses.m4a')
      a.loop = true
      a.volume = 0.45
      audioRef.current = a
    }
    return audioRef.current
  }

  useEffect(() => {
    // Site açılır açılmaz çalmayı dene; tarayıcı engellerse ilk
    // etkileşimde (tık/dokunma/tuş) otomatik başlat.
    const a = ensure()
    let started = false
    const start = () => {
      if (started) return
      a.play().then(() => {
        started = true
        setPlaying(true)
        events.forEach((e) => window.removeEventListener(e, start))
      }).catch(() => {})
    }
    const events = ['pointerdown', 'touchend', 'keydown']
    events.forEach((e) => window.addEventListener(e, start))
    start()
    return () => {
      events.forEach((e) => window.removeEventListener(e, start))
      a.pause()
    }
  }, [])

  const toggle = () => {
    const a = ensure()
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Müziği durdur' : 'Müziği çal'}
      title={playing ? 'Müziği durdur' : 'Müziği çal'}
      className="fixed bottom-20 right-4 z-50 flex h-24 w-24 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-xl backdrop-blur transition duration-200 hover:scale-110 hover:border-accent/50 sm:bottom-6 sm:right-6"
    >
      {playing ? (
        <span className="spin-fast relative flex h-14 w-14 items-center justify-center rounded-full bg-ink">
          <span className="absolute left-[6px] top-1/2 h-px w-4 -translate-y-1/2 bg-white/30" />
          <span className="absolute right-[6px] top-1/2 h-px w-4 -translate-y-1/2 bg-white/30" />
          <span className="absolute top-[6px] left-1/2 w-px h-4 -translate-x-1/2 bg-white/20" />
          <span className="absolute bottom-[6px] left-1/2 w-px h-4 -translate-x-1/2 bg-white/20" />
          <span className="h-4 w-4 rounded-full bg-accent" />
        </span>
      ) : (
        <Music2 className="h-10 w-10 text-ink" />
      )}
    </button>
  )
}

// ── Film greni + scroll progress + özel imleç ──────────────────────
export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />
}

export function ScrollProgress() {
  return <div className="scroll-progress" aria-hidden="true" />
}

export function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    let x = -100, y = -100, rx = -100, ry = -100
    let rafId
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate(${x}px, ${y}px)`
    }
    const loop = () => {
      rx += (x - rx) * 0.14
      ry += (y - ry) * 0.14
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      rafId = requestAnimationFrame(loop)
    }
    const over = (e) => {
      if (e.target.closest('a, button')) ring.classList.add('grow')
      else ring.classList.remove('grow')
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    rafId = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(rafId)
    }
  }, [])
  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
