'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const stats = [
  { v: '+15 años', l: 'Experiencia en producto y negocio digital' },
  { v: '+10.000', l: 'Seguidores en Linkedin' },
  { v: '+50', l: 'Mentorías en LATAM' },
  { v: '+40', l: 'Charlas, entrevistas y apariciones' },
]

export default function Numbers() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '64px 0' : '120px 0' }}>
      <div className="wrap">
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
          gap: isMobile ? 24 : 80, marginBottom: isMobile ? 40 : 64,
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— 006 · Números</div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1 }}>
              15 años.<br />En números.
            </h2>
          </div>
          <div style={{ alignSelf: 'end' }}>
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--ink-2)', maxWidth: 520 }}>
              Más de una década trabajando en producto y growth. Hoy estos números reflejan el alcance y la confianza que he construido.
            </p>
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)',
          borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: isMobile ? '28px 16px' : '40px 24px',
              borderRight: (isMobile ? i % 2 !== 1 : i < stats.length - 1) ? '1px solid var(--line)' : 'none',
              borderBottom: isMobile && i < 2 ? '1px solid var(--line)' : 'none',
            }}>
              <div className="serif" style={{ fontSize: isMobile ? 'clamp(44px, 12vw, 72px)' : 'clamp(56px, 6vw, 96px)', lineHeight: 0.95, marginBottom: 10, letterSpacing: '-0.03em' }}>{s.v}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
