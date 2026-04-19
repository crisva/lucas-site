'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { isMobile } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--ink)', color: 'var(--bg)' }}>
      <div className="wrap" style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr',
        gap: isMobile ? 36 : 80,
        alignItems: 'center',
      }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>— Newsletter</div>
          <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 60px)' : 'clamp(40px, 4.5vw, 72px)', lineHeight: 1, color: 'var(--bg)' }}>
            Recibe contenido<br /><em style={{ color: 'var(--accent)' }}>directo</em>.
          </h2>
        </div>

        <div>
          <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--ink-2)', marginBottom: 20, opacity: 0.8 }}>
            Suscríbete para artículos, recursos y novedades sobre producto y liderazgo. Un email al mes, sin spam.
          </p>
          <div style={{
            display: 'flex', gap: 0, padding: 5,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.03)',
            flexDirection: isMobile ? 'column' : 'row',
            borderRadius: isMobile ? 12 : 999,
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              style={{
                flex: 1, background: 'transparent', border: 0, outline: 'none',
                color: 'var(--bg)', padding: isMobile ? '12px 16px' : '12px 20px',
                fontSize: 15, fontFamily: 'inherit',
              }}
            />
            <button type="button" style={{
              background: 'var(--accent)', color: 'white',
              padding: isMobile ? '12px 20px' : '12px 24px',
              borderRadius: 999, fontSize: 14, fontWeight: 500,
              margin: isMobile ? '0 4px 4px' : 0,
            }}>
              Suscribir →
            </button>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 12, letterSpacing: '0.04em' }}>
            Al suscribirte aceptas recibir contenido sobre producto, growth y desarrollo profesional.
          </div>
        </div>
      </div>
    </section>
  )
}
