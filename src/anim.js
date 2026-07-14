import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// Tüm scroll/animasyon kurulumu — App mount olduğunda bir kez çağrılır,
// dönen fonksiyon unmount'ta temizlik yapar (StrictMode çift mount güvenli).
export function initMotion() {
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  window.__lenis = lenis
  window.__ST = ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // Çapa linkleri Lenis ile kaydır
  const anchorHandler = (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const target = document.querySelector(a.getAttribute('href'))
    if (!target) return
    e.preventDefault()
    lenis.scrollTo(target, { offset: -70 })
  }
  document.addEventListener('click', anchorHandler)

  // Scroll progress bar
  const bar = document.querySelector('.scroll-progress')
  if (bar) {
    ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => { bar.style.transform = `scaleX(${self.progress})` },
    })
  }

  // Genel reveal'lar
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 48, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9,
        ease: 'power3.out',
        delay: parseFloat(el.dataset.delay || 0),
        scrollTrigger: { trigger: el, start: 'top 88%' },
      },
    )
  })

  // Sayaçlar
  gsap.utils.toArray('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count)
    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: target, duration: 1.6, ease: 'power1.out',
        snap: { innerText: 1 },
        scrollTrigger: { trigger: el, start: 'top 92%' },
      },
    )
  })

  // Damgalar
  gsap.utils.toArray('.stamp').forEach((el) => {
    ScrollTrigger.create({
      trigger: el, start: 'top 88%', once: true,
      onEnter: () => el.classList.add('stamped'),
    })
  })

  const mm = gsap.matchMedia()

  mm.add('(min-width: 768px)', () => {
    // Yatay proje galerisi — pinli scrub
    const wrap = document.querySelector('[data-hscroll]')
    const track = document.querySelector('[data-hscroll-track]')
    if (wrap && track) {
      gsap.to(track, {
        x: () => -(track.scrollWidth - wrap.clientWidth + 40),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${track.scrollWidth - wrap.clientWidth + 40}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      })
    }

    // Kurallar — scroll'la yanarak belirir
    gsap.utils.toArray('[data-rule]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0.12, x: -30 },
        {
          opacity: 1, x: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 82%', end: 'top 48%', scrub: true },
        },
      )
    })

    // Final CTA — scroll'la büyür
    const zoom = document.querySelector('[data-zoom]')
    if (zoom) {
      gsap.fromTo(
        zoom,
        { scale: 0.82, opacity: 0.4 },
        {
          scale: 1, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: zoom, start: 'top 98%', end: 'top 62%', scrub: true },
        },
      )
    }

    // Hero yüzen kartlar — mouse parallax
    const floats = gsap.utils.toArray('[data-float]')
    const onMove = (e) => {
      const cx = e.clientX / window.innerWidth - 0.5
      const cy = e.clientY / window.innerHeight - 0.5
      floats.forEach((el, i) => {
        const depth = (i % 3 + 1) * 14
        gsap.to(el, { x: cx * depth, y: cy * depth, duration: 0.8, ease: 'power2.out' })
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  })

  // Pin spacer'lar sayfa yüksekliğini değiştirir — Lenis'in ölçüsünü tazele,
  // yoksa sayfanın dibi kaydırmayla ulaşılamaz kalır. Fontlar (Anton vb.)
  // geç yüklenip yükseklikleri değiştirdiği için birkaç noktada senkronla.
  const syncLenis = () => lenis.resize()
  ScrollTrigger.addEventListener('refresh', syncLenis)
  requestAnimationFrame(() => ScrollTrigger.refresh())
  const refreshAll = () => {
    ScrollTrigger.refresh()
    lenis.resize()
  }
  if (document.fonts?.ready) document.fonts.ready.then(refreshAll)
  window.addEventListener('load', refreshAll)
  const lateSync = setTimeout(refreshAll, 1200)

  mm.add('(max-width: 767px)', () => {
    gsap.utils.toArray('[data-rule]').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -24 },
        {
          opacity: 1, x: 0, duration: 0.6, delay: (i % 6) * 0.04,
          scrollTrigger: { trigger: el, start: 'top 92%' },
        },
      )
    })
  })

  return () => {
    document.removeEventListener('click', anchorHandler)
    ScrollTrigger.removeEventListener('refresh', syncLenis)
    window.removeEventListener('load', refreshAll)
    clearTimeout(lateSync)
    mm.revert()
    ScrollTrigger.getAll().forEach((t) => t.kill())
    gsap.ticker.remove(raf)
    lenis.destroy()
  }
}
