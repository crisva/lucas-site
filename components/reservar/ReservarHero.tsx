'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

export default function ReservarHero() {
  const { isMobile } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '48px 0 40px' : '72px 0 64px', borderBottom: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 16 }}>— Reservar sesión</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 20 : 80,
          alignItems: 'end',
        }}>
          <h1 className="serif" style={{
            fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)',
            lineHeight: 1.02,
          }}>
            El primer paso es<br />
            <em style={{ color: 'var(--accent)' }}>agendar.</em>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--ink-2)', lineHeight: 1.65 }}>
            Elegí el formato que más te hace sentido, seleccioná una fecha y listo.
            Si tenés dudas sobre cuál es el adecuado para vos, empezá por la sesión introductoria gratuita.
          </p>
        </div>
      </div>
    </section>
  )
}
