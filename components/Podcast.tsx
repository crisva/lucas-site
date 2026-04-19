'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const eps = [
  { cat: 'Producto',  min: '8 min', t: 'Cómo tomar decisiones de producto sin datos perfectos',    d: 'La realidad es que nunca tendrás toda la información. Aquí te muestro cómo avanzar con confianza.' },
  { cat: 'Growth',    min: '6 min', t: 'El error más común en estrategias de growth',               d: 'Muchos equipos confunden actividad con resultados. Te cuento cómo evitarlo.' },
  { cat: 'Liderazgo', min: '7 min', t: 'Liderar equipos de producto en startups vs corporaciones',  d: 'Los desafíos son distintos. Las herramientas también. Aquí está la diferencia.' },
]

export default function Podcast() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section id="podcast" style={{ padding: isMobile ? '64px 0' : '120px 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'end', marginBottom: isMobile ? 36 : 72, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— 008 · Podcast</div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1 }}>
              Hackeando <em style={{ color: 'var(--accent)' }}>Productos</em>.
            </h2>
          </div>
          <a style={{ fontSize: 14, borderBottom: '1px solid var(--ink)', paddingBottom: 2, alignSelf: 'flex-end' }}>Ver todos →</a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: 32,
        }}>
          {eps.map((e, i) => (
            <article key={i} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="ph" style={{ aspectRatio: '4 / 3', borderRadius: 8 }}>Episode cover</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="mono">
                <span style={{ fontSize: 10, background: 'var(--ink)', color: 'var(--bg)', padding: '3px 8px', borderRadius: 999, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{e.cat}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>· {e.min} lectura</span>
              </div>
              <h3 className="serif" style={{ fontSize: isMobile ? 22 : 24, lineHeight: 1.1 }}>{e.t}</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)' }}>{e.d}</p>
              <a style={{ fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)', fontWeight: 500 }}>Ver episodio →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
