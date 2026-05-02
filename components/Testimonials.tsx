'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const items = [
  {
    q: 'Las sesiones con Lucas fueron un antes y un después en mi desarrollo profesional. Me ayudó a ordenar ideas, ganar claridad estratégica y aterrizar decisiones en acciones concretas — tanto en liderazgo como en negocio. Valoro su capacidad para desafiarte con criterio.',
    n: 'Joaquín Alarcón Berríos', cargo: 'Product Owner', empresa: 'Gauss', flag: 'cl',
    photo: '/testimonials/Joaquin_Alarcon.jpeg', tags: ['coaching', 'liderazgo'],
  },
  {
    q: 'Lucas me ayudó a ordenar mis objetivos laborales, mejorar la comunicación de mi perfil y trabajar el síndrome del impostor con herramientas muy prácticas. Un proceso cercano, claro y honesto que realmente genera impacto. Sin duda, volvería a trabajar con él.',
    n: 'Orianna Domínguez', cargo: 'Customer Success', empresa: 'Rinde Gastos', flag: 've',
    photo: '/testimonials/Orianna_Dominguez.png', tags: ['coaching', 'síndrome del impostor'],
  },
  {
    q: '30 minutos de puro valor. Lucas captó cada desafío, aportó referencias de la industria y usó analogías que hicieron todo simple. Un crack.',
    n: 'Matias Lezcano', cargo: 'CMO & CPO', empresa: 'Destacame', flag: 'cl',
    photo: '/testimonials/MAtias_Lezcano.jpeg', tags: ['fintech', 'mentoría'],
  },
  {
    q: 'Lucas combina una mirada estratégica con consejos prácticos y accionables, siempre desde la escucha. Me ayudó a abordar problemas complejos con más claridad y foco. Lo recomiendo totalmente para crecer en producto y tomar mejores decisiones.',
    n: 'Mateo Rodriguez Pintos', cargo: 'Product Manager', empresa: 'Ripio', flag: 'uy',
    photo: '/testimonials/Mateo_Rodriguez.jpeg', tags: ['fintech', 'producto'],
  },
  {
    q: 'Lucas tiene una claridad admirable para identificar los problemas clave de la industria y ofrecer soluciones aterrizadas y realistas. Me encantó cómo equilibra el entendimiento profundo del contexto con ideas concretas que pueden aplicarse de inmediato.',
    n: 'Lilia Solorzano', cargo: 'Growth Manager', empresa: 'Banco Azteca', flag: 'mx',
    photo: '/testimonials/Lilia_Solorzano.png', tags: ['fintech', 'banca', 'growth'],
  },
  {
    q: 'La mentoría con Lucas me ayudó a repensar mi carrera profesional y entender mis fortalezas y puntos de mejora. Las sesiones me permitieron reflexionar sobre lo que es importante para mí. Lucas trajo los conceptos con claridad y en el momento adecuado. Gran profesional y gran persona.',
    n: 'Federico Osovnikar', cargo: 'Product Owner', empresa: 'MercadoLibre', flag: 'ar',
    photo: '/testimonials/federico_osovnikar.jpeg', tags: ['coaching', 'carrera'],
  },
  {
    q: 'Lucas combina conocimiento profundo con experiencia real en desarrollo de productos. Lo que más valoré fue su interés genuino por compartir sus experiencias y resolver mis necesidades específicas. Si buscás a alguien que realmente aporte valor en tu iniciativa de producto, Lucas es la elección.',
    n: 'Faiber Calderon', cargo: 'Data-driven PM', empresa: 'Datawifi', flag: 'co',
    photo: '/testimonials/faiber_calderon.jpeg', tags: ['producto', 'innovación'],
  },
  {
    q: 'Lucas analizó un board de Mixpanel que le compartí antes de la sesión para llegar completamente contextualizado. Si buscás un experto en producto que entienda fintech y que realmente se interese por tus problemas, Lucas es el mentor.',
    n: 'Matteo Arango', cargo: 'Head of Growth & Co-founder', empresa: 'Trooper', flag: 'co',
    photo: '/testimonials/MAtteo_Arango.jpeg', tags: ['fintech', 'growth', 'mentoría'],
  },
  {
    q: 'Si están escalando una app financiera, no duden en agendar con Lucas. Su experiencia en ambas canchas — producto y growth — hace que encuentres los puntos de enlace cruciales. 30 minutos de mucho valor.',
    n: 'Omar Terrazas', cargo: 'Director de Growth', empresa: 'Bankaool', flag: 'mx',
    photo: '/testimonials/omar_terrazas.jpeg', tags: ['fintech', 'growth'],
  },
  {
    q: 'Lucas conectó de inmediato con mi necesidad, escuchó lo necesario y comenzó a profundizar. Los consejos fueron super prácticos y de impacto inmediato. Dejó la puerta abierta a seguir en contacto. Un gran mentor con experiencia real.',
    n: 'Jorge Nova', cargo: 'Senior UX Designer', empresa: 'BCI', flag: 'cl',
    photo: '/testimonials/Jorge_Nova.jpeg', tags: ['carrera', 'UX'],
  },
]

function Flag({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/20x15/${code}.png`}
      srcSet={`https://flagcdn.com/40x30/${code}.png 2x`}
      width={20} height={15} alt={code.toUpperCase()}
      style={{ borderRadius: 2, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    />
  )
}

const AUTOPLAY_MS = 4000

export default function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint()
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // Drag / swipe state
  const dragStart = useRef<number | null>(null)
  const isDragging = useRef(false)

  const visible = isMobile ? 1 : isTablet ? 2 : 3
  const total = items.length
  const maxIndex = total - visible

  const next = useCallback(() => setCurrent(c => c >= maxIndex ? 0 : c + 1), [maxIndex])
  const prev = useCallback(() => setCurrent(c => c <= 0 ? maxIndex : c - 1), [maxIndex])

  // Auto-avance cada 4 segundos
  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, next])

  // Drag handlers
  const onDragStart = (clientX: number) => {
    dragStart.current = clientX
    isDragging.current = false
    setPaused(true)
  }

  const onDragEnd = (clientX: number) => {
    if (dragStart.current === null) return
    const delta = dragStart.current - clientX
    if (Math.abs(delta) > 40) {
      isDragging.current = true
      delta > 0 ? next() : prev()
    }
    dragStart.current = null
    setTimeout(() => setPaused(false), 3000)
  }

  const visibleItems = items.slice(current, current + visible)

  return (
    <section
      id="testimonios"
      style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--ink)', color: 'var(--bg)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="wrap">

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'end',
          marginBottom: isMobile ? 40 : 64, flexWrap: 'wrap', gap: 20,
        }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
              — 005 · Testimonios
            </div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1, color: 'var(--bg)' }}>
              Historias <em style={{ color: 'var(--accent)' }}>reales</em>.
            </h2>
          </div>

          {/* Flechas */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={prev} style={{
              width: 40, height: 40, borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent', color: 'var(--bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={next} style={{
              width: 40, height: 40, borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent', color: 'var(--bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards — con drag/swipe */}
        <div
          style={{ display: 'grid', gridTemplateColumns: `repeat(${visible}, 1fr)`, gap: isMobile ? 16 : 24, cursor: 'grab' }}
          onMouseDown={e => onDragStart(e.clientX)}
          onMouseUp={e => onDragEnd(e.clientX)}
          onMouseLeave={e => { if (dragStart.current !== null) onDragEnd(e.clientX) }}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
        >
          {visibleItems.map((it, i) => (
            <div key={current + i} style={{
              padding: isMobile ? 24 : 32, borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 320,
              userSelect: 'none',
            }}>
              <div>
                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 44, lineHeight: 0.6, marginBottom: 20, color: 'var(--accent)' }}>
                  &ldquo;
                </div>
                <p className="serif" style={{ fontSize: isMobile ? 18 : 20, lineHeight: 1.35, color: 'var(--bg)' }}>
                  {it.q}
                </p>
              </div>

              <div style={{ marginTop: 28 }}>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 999, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <Image src={it.photo} alt={it.n} fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--bg)' }}>{it.n}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>
                        {it.cargo} · {it.empresa}
                      </span>
                      <Flag code={it.flag} />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {it.tags.map(tag => (
                    <span key={tag} className="mono" style={{
                      fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.12)', color: 'var(--muted)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navegación inferior */}
        <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}>

          {/* Barra de progreso */}
          <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${((current + 1) / (maxIndex + 1)) * 100}%`,
              background: 'var(--accent)',
              borderRadius: 999,
              transition: 'width 0.4s ease',
            }} />
          </div>

          {/* Dots — círculos vacíos con borde visible */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 4000) }}
                style={{
                  width: i === current ? 20 : 9,
                  height: 9,
                  borderRadius: 999,
                  background: i === current ? 'var(--accent)' : 'transparent',
                  border: i === current ? 'none' : '2px solid rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* Contador */}
          <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>
            {String(current + 1).padStart(2, '0')}<span style={{ opacity: 0.5 }}> / {String(total).padStart(2, '0')}</span>
          </div>

        </div>

      </div>
    </section>
  )
}