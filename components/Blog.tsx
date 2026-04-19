'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const posts = [
  { cat: 'Producto',  min: '8 min', t: 'Cómo tomar decisiones de producto sin datos perfectos',    d: 'La realidad es que nunca tendrás toda la información. Aquí te muestro cómo avanzar con confianza.' },
  { cat: 'Growth',    min: '6 min', t: 'El error más común en estrategias de growth',               d: 'Muchos equipos confunden actividad con resultados. Te cuento cómo evitarlo.' },
  { cat: 'Liderazgo', min: '7 min', t: 'Liderar equipos de producto en startups vs corporaciones',  d: 'Los desafíos son distintos. Las herramientas también. Aquí está la diferencia.' },
]

export default function Blog() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section id="blog" style={{ padding: isMobile ? '64px 0' : '120px 0' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'end', marginBottom: isMobile ? 36 : 72, gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— 010 · Blog</div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1 }}>
              Contenido <em style={{ color: 'var(--accent)' }}>de valor</em>.
            </h2>
          </div>
          <a style={{ fontSize: 14, borderBottom: '1px solid var(--ink)', paddingBottom: 2, alignSelf: 'flex-end' }}>Ver todos →</a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1.3fr 1fr 1fr',
          gap: isMobile ? 36 : 40,
        }}>
          {posts.map((p, i) => (
            <article key={i} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="ph" style={{ aspectRatio: (!isMobile && i === 0) ? '4 / 5' : '4 / 3', borderRadius: 8 }}>Article image</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="mono">
                <span style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>{p.cat}</span>
                <span style={{ width: 3, height: 3, borderRadius: 999, background: 'var(--muted)' }} />
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{p.min} lectura</span>
              </div>
              <h3 className="serif" style={{ fontSize: (!isMobile && i === 0) ? 32 : 22, lineHeight: 1.05 }}>{p.t}</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)' }}>{p.d}</p>
              <a style={{ fontSize: 13, fontWeight: 500, borderBottom: '1px solid var(--ink)', paddingBottom: 2, alignSelf: 'start' }}>Leer más →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
