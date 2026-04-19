'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface ServiceCardProps {
  tag: string
  t: string
  d: string
  meta: string
  idx: number
}

function ServiceCard({ tag, t, d, meta, idx }: ServiceCardProps) {
  const [hover, setHover] = useState(false)
  const { isMobile } = useBreakpoint()

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: isMobile ? 20 : 28,
        minHeight: isMobile ? 'auto' : 340,
        borderRight: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: hover ? 'var(--surface)' : 'transparent',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        transition: 'background 0.2s',
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 36 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {String(idx).padStart(2, '0')} · {tag}
          </span>
          <span style={{
            width: 26, height: 26, borderRadius: 999,
            background: hover ? 'var(--accent)' : 'transparent',
            border: hover ? 'none' : '1px solid var(--line)',
            color: hover ? 'var(--bg)' : 'var(--muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', flexShrink: 0,
          }}>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <h3 className="serif" style={{ fontSize: isMobile ? 26 : 30, lineHeight: 1, marginBottom: 12 }}>{t}</h3>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{d}</p>
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 32 }}>{meta}</div>
    </div>
  )
}

export default function Services() {
  const { isMobile, isTablet } = useBreakpoint()

  const items = [
    { tag: 'Core',        t: 'Mentorías 1:1',       d: 'Sesiones directas para decisiones puntuales, validación de estrategias y desbloqueos de carrera. Formato 60–90 min.',   meta: 'desde USD 180' },
    { tag: 'Programa',    t: 'Product coaching',     d: 'Procesos de acompañamiento profundo de 3 a 6 meses, con sesión introductoria gratuita y métricas claras.',               meta: '3–6 meses' },
    { tag: 'Formación',   t: 'Cursos síncronos',     d: 'Formación en growth, UX y fintech a través de Product Hub. Cohortes pequeñas, foco en aplicación real.',                 meta: 'Cohortes trimestrales' },
    { tag: 'Corporativo', t: 'Speaker corporativo',  d: 'Charlas sobre producto, growth y liderazgo para tu empresa. Keynote, workshop o jornada intensiva.',                      meta: 'ES · EN' },
  ]

  return (
    <section id="services" style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--bg-2)' }}>
      <div className="wrap">
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 24 : 80, alignItems: 'end', marginBottom: isMobile ? 40 : 72,
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— 003 · Servicios</div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1 }}>
              Acompañamiento<br />personalizado para tu<br /><em style={{ color: 'var(--accent)' }}>desarrollo profesional</em>.
            </h2>
          </div>
          <div>
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--ink-2)', marginBottom: 16 }}>
              Cada servicio está diseñado para resolver desafíos específicos. Desde mentorías puntuales hasta procesos de coaching profundos.
            </p>
            <a style={{ fontSize: 14, color: 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--ink)', paddingBottom: 2 }}>
              Ver todos los servicios <span>→</span>
            </a>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: 0, borderTop: '1px solid var(--line)', borderLeft: '1px solid var(--line)',
        }}>
          {items.map((it, i) => <ServiceCard key={i} {...it} idx={i + 1} />)}
        </div>
      </div>
    </section>
  )
}
