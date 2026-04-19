'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const items = [
  { q: 'Lucas me ayudó a tomar la decisión más importante de mi carrera. Su enfoque fue directo y sin filtros.',                                   n: 'Martín García',   r: 'Head de Producto · Startup B2B' },
  { q: 'Las sesiones de coaching transformaron cómo lidera mi equipo. Ahora tengo claridad en decisiones que antes me paralizaban.',                n: 'Carolina López',  r: 'Product Manager · Corporación' },
  { q: 'No es solo mentoría. Es alguien que entiende el contexto real de LATAM y te ayuda a navegar con inteligencia.',                            n: 'Diego Fernández', r: 'Senior PM · Fintech' },
]

export default function Testimonials() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--ink)', color: 'var(--bg)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'end', marginBottom: isMobile ? 40 : 72, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>— 005 · Testimonios</div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1, color: 'var(--bg)' }}>
              Historias <em style={{ color: 'var(--accent)' }}>reales</em>.
            </h2>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 16 : 28,
        }}>
          {items.map((it, i) => (
            <div key={i} style={{
              padding: isMobile ? 24 : 32, borderRadius: 12,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 280,
            }}>
              <div>
                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 48, lineHeight: 0.5, marginBottom: 18, color: 'var(--accent)' }}>&ldquo;</div>
                <p className="serif" style={{ fontSize: isMobile ? 20 : 22, lineHeight: 1.25, color: 'var(--bg)' }}>{it.q}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28 }}>
                <div className="ph" style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }}>
                  {it.n.split(' ').map(w => w[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{it.n}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>{it.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
