'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const items = [
  { t: 'Diagnóstico personalizado', d: 'Analizamos tu situación actual y establecemos objetivos claros para la sesión.' },
  { t: 'Mentalidad de producto y growth', d: 'Abordamos el problema desde la estrategia, no solo desde la ejecución.' },
  { t: 'Próximos pasos concretos', d: 'Salís con claridad sobre qué hacer, no solo con ideas. Sin frameworks vacíos.' },
]

export default function ReservarQueEsperar() {
  const { isMobile } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '56px 0' : '96px 0', borderTop: '1px solid var(--line)', background: 'var(--bg-2)' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'center',
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— Coaching</div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(36px, 3.5vw, 52px)', lineHeight: 1.05 }}>
              ¿Qué esperar de<br /><em style={{ color: 'var(--accent)' }}>nuestras sesiones?</em>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 999, flexShrink: 0,
                  background: 'color-mix(in oklab, var(--accent) 12%, var(--bg))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 2,
                }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{it.t}</div>
                  <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
