'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

export default function CTABand() {
  const { isMobile } = useBreakpoint()

  return (
    <section style={{
      padding: isMobile ? '48px 0' : '80px 0',
      background: 'var(--bg-2)',
      borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
    }}>
      <div className="wrap" style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 28 : 40,
      }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>— Coaching</div>
          <h3 className="serif" style={{ fontSize: isMobile ? 'clamp(28px, 8vw, 44px)' : 44, lineHeight: 1.05, maxWidth: 700 }}>
            Reservá tu mentoría o sesión introductoria de coaching, <em style={{ color: 'var(--accent)' }}>sin compromiso</em>.
          </h3>
        </div>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0, flexWrap: 'wrap' }}>
          <a style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '14px 24px', borderRadius: 999, fontSize: 14, fontWeight: 500 }}>Reservar →</a>
          <a style={{ padding: '14px 20px', borderRadius: 999, fontSize: 14, border: '1px solid var(--ink)' }}>Consultar</a>
        </div>
      </div>
    </section>
  )
}
