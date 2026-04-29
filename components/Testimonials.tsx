'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

// Códigos ISO 3166-1 alpha-2 para flagcdn.com
const items = [
  {
    q: 'Las sesiones con Lucas fueron un antes y un después en mi desarrollo profesional. Me ayudó a ordenar ideas, ganar claridad estratégica y aterrizar decisiones en acciones concretas — tanto en liderazgo como en negocio. Valoro su capacidad para desafiarte con criterio.',
    n: 'Joaquín Alarcón Berríos',
    cargo: 'Product Owner',
    empresa: 'Gauss',
    flag: 'cl',
    tags: ['coaching', 'liderazgo'],
  },
  {
    q: 'Lucas me ayudó a ordenar mis objetivos laborales, mejorar la comunicación de mi perfil y trabajar el síndrome del impostor con herramientas muy prácticas. Un proceso cercano, claro y honesto que realmente genera impacto. Sin duda, volvería a trabajar con él.',
    n: 'Orianna Domínguez',
    cargo: 'Customer Success',
    empresa: 'Rinde Gastos',
    flag: 've',
    tags: ['coaching', 'síndrome del impostor'],
  },
  {
    q: '30 minutos de puro valor. Lucas captó cada desafío, aportó referencias de la industria y usó analogías que hicieron todo simple. Un crack.',
    n: 'Matias Lezcano',
    cargo: 'CMO & CPO',
    empresa: 'Destacame',
    flag: 'cl',
    tags: ['fintech', 'mentoría'],
  },
  {
    q: 'Lucas combina una mirada estratégica con consejos prácticos y accionables, siempre desde la escucha. Me ayudó a abordar problemas complejos con más claridad y foco. Lo recomiendo totalmente para crecer en producto y tomar mejores decisiones.',
    n: 'Mateo Rodriguez Pintos',
    cargo: 'Product Manager',
    empresa: 'Ripio',
    flag: 'uy',
    tags: ['fintech', 'producto'],
  },
  {
    q: 'Lucas tiene una claridad admirable para identificar los problemas clave de la industria y ofrecer soluciones aterrizadas y realistas. Me encantó cómo equilibra el entendimiento profundo del contexto con ideas concretas que pueden aplicarse de inmediato.',
    n: 'Lilia Solorzano',
    cargo: 'Growth Manager',
    empresa: 'Banco Azteca',
    flag: 'mx',
    tags: ['fintech', 'banca', 'growth'],
  },
  {
    q: 'La mentoría con Lucas me ayudó a repensar mi carrera profesional y entender mis fortalezas y puntos de mejora. Las sesiones me permitieron reflexionar sobre lo que es importante para mí. Lucas trajo los conceptos con claridad y en el momento adecuado. Gran profesional y gran persona.',
    n: 'Federico Osovnikar',
    cargo: 'Product Owner',
    empresa: 'MercadoLibre',
    flag: 'ar',
    tags: ['coaching', 'carrera'],
  },
  {
    q: 'Lucas combina conocimiento profundo con experiencia real en desarrollo de productos. Lo que más valoré fue su interés genuino por compartir sus experiencias y resolver mis necesidades específicas. Si buscás a alguien que realmente aporte valor en tu iniciativa de producto, Lucas es la elección.',
    n: 'Faiber Calderon',
    cargo: 'Data-driven PM',
    empresa: 'Datawifi',
    flag: 'co',
    tags: ['producto', 'innovación'],
  },
  {
    q: 'Lucas analizó un board de Mixpanel que le compartí antes de la sesión para llegar completamente contextualizado. Si buscás un experto en producto que entienda fintech y que realmente se interese por tus problemas, Lucas es el mentor.',
    n: 'Matteo Arango',
    cargo: 'Head of Growth & Co-founder',
    empresa: 'Trooper',
    flag: 'co',
    tags: ['fintech', 'growth', 'mentoría'],
  },
  {
    q: 'Si están escalando una app financiera, no duden en agendar con Lucas. Su experiencia en ambas canchas — producto y growth — hace que encuentres los puntos de enlace cruciales. 30 minutos de mucho valor.',
    n: 'Omar Terrazas',
    cargo: 'Director de Growth',
    empresa: 'Bankaool',
    flag: 'mx',
    tags: ['fintech', 'growth'],
  },
  {
    q: 'Lucas conectó de inmediato con mi necesidad, escuchó lo necesario y comenzó a profundizar. Los consejos fueron super prácticos y de impacto inmediato. Dejó la puerta abierta a seguir en contacto. Un gran mentor con experiencia real.',
    n: 'Jorge Nova',
    cargo: 'Senior UX Designer',
    empresa: 'BCI',
    flag: 'cl',
    tags: ['carrera', 'UX'],
  },
]

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('')
}

function Flag({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/20x15/${code}.png`}
      srcSet={`https://flagcdn.com/40x30/${code}.png 2x`}
      width={20}
      height={15}
      alt={code.toUpperCase()}
      style={{ borderRadius: 2, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    />
  )
}

export default function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint()
  const [current, setCurrent] = useState(0)

  const visible = isMobile ? 1 : isTablet ? 2 : 3
  const total = items.length
  const maxIndex = total - visible

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1))

  const visibleItems = items.slice(current, current + visible)

  return (
    <section id="testimonios" style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--ink)', color: 'var(--bg)' }}>
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

          {/* Controles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginRight: 8 }}>
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
            <button onClick={prev} disabled={current === 0} style={{
              width: 40, height: 40, borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent', color: 'var(--bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current === 0 ? 'not-allowed' : 'pointer',
              opacity: current === 0 ? 0.3 : 1, transition: 'opacity 0.2s',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={next} disabled={current >= maxIndex} style={{
              width: 40, height: 40, borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent', color: 'var(--bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: current >= maxIndex ? 'not-allowed' : 'pointer',
              opacity: current >= maxIndex ? 0.3 : 1, transition: 'opacity 0.2s',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${visible}, 1fr)`,
          gap: isMobile ? 16 : 24,
        }}>
          {visibleItems.map((it, i) => (
            <div key={current + i} style={{
              padding: isMobile ? 24 : 32, borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 320,
            }}>
              {/* Quote */}
              <div>
                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 44, lineHeight: 0.6, marginBottom: 20, color: 'var(--accent)' }}>
                  &ldquo;
                </div>
                <p className="serif" style={{ fontSize: isMobile ? 18 : 20, lineHeight: 1.35, color: 'var(--bg)' }}>
                  {it.q}
                </p>
              </div>

              {/* Footer de la card */}
              <div style={{ marginTop: 28 }}>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 20 }} />

                {/* Avatar + Nombre + Cargo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 999, flexShrink: 0,
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Instrument Serif, serif', fontSize: 13, color: 'var(--bg)',
                  }}>
                    {getInitials(it.n)}
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

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {it.tags.map(tag => (
                    <span key={tag} className="mono" style={{
                      fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '4px 10px', borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'var(--muted)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 36 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: i === current ? 24 : 6, height: 6, borderRadius: 999,
              background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
              border: 0, cursor: 'pointer', transition: 'all 0.25s ease', padding: 0,
            }} />
          ))}
        </div>

      </div>
    </section>
  )
}