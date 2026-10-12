import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

export function Logo({ className = '' }) {
  return (
    <svg width="24" height="24" viewBox="0 0 256 256" className={className} aria-hidden="true">
      <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
    </svg>
  )
}

export function PrimaryLink({ href, children, className = '', ...rest }) {
  return (
    <a href={href} {...rest} className={`inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#010101] transition-opacity hover:opacity-90 ${className}`}>
      {children}
    </a>
  )
}

export function GhostLink({ href, children, className = '', ...rest }) {
  return (
    <a href={href} {...rest} className={`inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/20 hover:text-white ${className}`}>
      {children}
    </a>
  )
}

export function Eyebrow({ children }) {
  return <span className="mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/50 sm:text-sm">{children}</span>
}

// Kaydırınca yumuşakça beliren blok
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return setShown(true)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} ${className}`}
    >
      {children}
    </Tag>
  )
}

export function Panel({ open, onClose, label, wide = false, children }) {
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
        className={`relative max-h-[calc(100dvh-24px)] w-full ${wide ? 'max-w-2xl' : 'max-w-xl'} overflow-y-auto rounded-2xl bg-white/10 p-6 text-white ring-1 ring-white/10 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8 ${open ? 'translate-y-0' : 'translate-y-4'}`}
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
