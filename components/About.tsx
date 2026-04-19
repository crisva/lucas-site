'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

export default function About() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section id="about" style={{ padding: isMobile ? '64px 0' : '120px 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '0.8fr 1.2fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'start',
        }}>
          {/* Foto sticky */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>— 002 · Sobre mí</div>
            <div className="ph" style={{ aspectRatio: '1', borderRadius: 8, maxWidth: isMobile ? 280 : 'none', margin: isMobile ? '0 auto' : 0 }}>
              portrait · square
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1, marginBottom: 28, maxWidth: 720 }}>
              Referente regional en<br />producto y <em style={{ color: 'var(--accent)' }}>growth</em>.
            </h2>
            <p style={{ fontSize: isMobile ? 16 : 18, color: 'var(--ink-2)', maxWidth: 580, marginBottom: 20 }}>
              Trabajé en fintech, startups de alto crecimiento y corporaciones grandes.
              Soy coach ontológico certificado y he mentorizado a más de cincuenta profesionales en la región.
            </p>
            <p style={{ fontSize: isMobile ? 16 : 18, color: 'var(--ink-2)', maxWidth: 580, marginBottom: 36 }}>
              Hoy mi foco está en ayudarte a navegar desafíos complejos de liderazgo, carrera y producto.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? 16 : 24, paddingTop: 28, borderTop: '1px solid var(--line)', marginBottom: 32,
            }}>
              {[
                { k: 'Certificación', v: 'Coach ontológico' },
                { k: 'Industria',     v: 'Fintech · SaaS · B2B' },
                { k: 'Base',          v: 'Buenos Aires, AR' },
              ].map(x => (
                <div key={x.k}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{x.k}</div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{x.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a style={{ fontSize: 14, padding: '11px 20px', borderRadius: 999, border: '1px solid var(--ink)', color: 'var(--ink)' }}>Explorar →</a>
              <a style={{ fontSize: 14, padding: '11px 20px', borderRadius: 999, color: 'var(--ink-2)' }}>Contactar</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
