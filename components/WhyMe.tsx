'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const rows = [
  { n: '01', e: 'Experiencia comprobada', k: 'Fintech',  t: 'Más de una década en producto y growth',  d: 'He liderado equipos de producto en startups de alto crecimiento y corporaciones grandes. Conozco los desafíos reales de la industria.' },
  { n: '02', e: 'Enfoque personalizado',  k: 'Coaching', t: 'Cada profesional es diferente',            d: 'No hay soluciones genéricas. Mi formación como coach ontológico me permite entender tu contexto real y diseñar acompañamiento a medida.' },
  { n: '03', e: 'Resultados medibles',    k: 'Impacto',  t: 'Decisiones que importan',                  d: 'Trabajamos con métricas claras. Desde transiciones de carrera exitosas hasta equipos que escalan, el acompañamiento siempre tiene objetivo concreto.' },
]

export default function WhyMe() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '64px 0' : '120px 0' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 16 }}>— 004 · Por qué conmigo</div>
        <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1, marginBottom: isMobile ? 40 : 72, maxWidth: 900 }}>
          Un enfoque probado en <em style={{ color: 'var(--accent)' }}>tres dimensiones</em>.
        </h2>
        <div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '60px 1fr' : '80px 180px 1fr 1fr',
              gap: isMobile ? 12 : 32, padding: isMobile ? '28px 0' : '36px 0',
              borderTop: '1px solid var(--line)',
              borderBottom: i === rows.length - 1 ? '1px solid var(--line)' : 'none',
              alignItems: 'start',
            }}>
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{r.n}</div>
              {!isMobile && (
                <div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{r.e}</div>
                  <div className="serif" style={{ fontSize: 22, fontStyle: 'italic', color: 'var(--accent)' }}>{r.k}</div>
                </div>
              )}
              <div>
                <h3 className="serif" style={{ fontSize: isMobile ? 26 : 30, lineHeight: 1.05, marginBottom: 10 }}>{r.t}</h3>
                {isMobile && <p style={{ fontSize: 15, color: 'var(--ink-2)' }}>{r.d}</p>}
              </div>
              {!isMobile && (
                <div>
                  <p style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 420 }}>{r.d}</p>
                  <a style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, marginTop: 14, borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>
                    {i === 0 ? 'Explorar' : i === 1 ? 'Conocer más' : 'Ver casos'} →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
