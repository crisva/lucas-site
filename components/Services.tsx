'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface ServiceCardProps {
  idx: number
  tag: string
  t: string
  d: string
  meta: string
  cta: string
  ctaHref: string
  ctaSecondary?: string
  ctaSecondaryHref?: string
  muted?: boolean
}

function ServiceCard({ idx, tag, t, d, meta, cta, ctaHref, ctaSecondary, ctaSecondaryHref, muted }: ServiceCardProps) {
  const [hover, setHover] = useState(false)
  const { isMobile } = useBreakpoint()

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: isMobile ? 24 : 32,
        borderRight: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: hover ? 'var(--surface)' : 'transparent',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: isMobile ? 'auto' : 380,
        transition: 'background 0.2s',
        opacity: muted ? 0.65 : 1,
      }}
    >
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            {String(idx).padStart(2, '0')} · {tag}
          </span>
          <span style={{
            width: 26, height: 26, borderRadius: 999, flexShrink: 0,
            background: hover ? 'var(--accent)' : 'transparent',
            border: hover ? 'none' : '1px solid var(--line)',
            color: hover ? 'var(--bg)' : 'var(--muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}>
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {/* Título */}
        <h3 className="serif" style={{ fontSize: isMobile ? 24 : 28, lineHeight: 1.05, marginBottom: 12 }}>{t}</h3>

        {/* Descripción */}
        <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>{d}</p>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 28 }}>
        <div style={{ height: 1, background: 'var(--line)', marginBottom: 20 }} />
        <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
          {meta}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href={ctaHref} style={{
            fontSize: 13, fontWeight: 500,
            background: muted ? 'transparent' : 'var(--ink)', color: muted ? 'var(--ink)' : 'var(--bg)',
            padding: '10px 16px', borderRadius: 999,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            border: muted ? '1px solid var(--line)' : 'none',
            textAlign: 'center',
          }}>
            {cta}
          </a>
          {ctaSecondary && (
            <a href={ctaSecondaryHref} style={{
              fontSize: 12, color: 'var(--muted)',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              borderBottom: '1px solid var(--line)', paddingBottom: 1, alignSelf: 'flex-start',
            }}>
              {ctaSecondary} →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const items = [
  {
    tag: 'Programa',
    t: 'Product Coaching',
    d: 'Para líderes que quieren un cambio de fondo. Trabajamos juntos en estrategia, liderazgo y desarrollo profesional — con objetivos claros y resultados medibles.',
    meta: 'Sesión introductoria gratuita de 15 min · Packs desde USD 450',
    cta: 'Reservar sesión gratuita',
    ctaHref: '#book-coaching',
  },
  {
    tag: 'Core',
    t: 'Mentorías 1:1',
    d: 'Para decisiones que no pueden esperar. Una sesión de hasta 1 hora para destrabar algo concreto — sin rodeos, con foco en lo que importa.',
    meta: 'Desde USD 180 · Sesión individual · Reserva con pago online',
    cta: 'Reservar mentoría',
    ctaHref: '#book-mentoria',
  },
  {
    tag: 'Formación',
    t: 'Cursos',
    d: 'Cohortes sincrónicas para PMs que quieren crecer o quienes quieren entrar al mundo del producto. Growth, UX, Liderazgo y Fintech. En asociación con Product Hub.',
    meta: 'Ver próximas cohortes en Product Hub',
    cta: 'Ver en Product Hub',
    ctaHref: 'https://producthub.la',
  },
  {
    tag: 'Corporativo',
    t: 'Speaker',
    d: 'Charlas de 45 min a 1 hora sobre producto, growth y liderazgo. Desde experiencia real, no teoría. Para eventos corporativos y conferencias.',
    meta: 'Sin precio publicado · Consultar disponibilidad',
    cta: 'Consultar disponibilidad',
    ctaHref: 'mailto:lucaspatano@gmail.com',
  },
  {
    tag: 'Otros',
    t: '¿Algo más en mente?',
    d: 'Dependiendo del proyecto y el contexto, puedo ayudarte de otras formas. Escribime y lo conversamos.',
    meta: 'Contacto directo',
    cta: 'Escribime',
    ctaHref: 'mailto:lucaspatano@gmail.com',
    muted: true,
  },
]

export default function Services() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section id="services" style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--bg-2)' }}>
      <div className="wrap">

        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 24 : 80,
          alignItems: 'end',
          marginBottom: isMobile ? 40 : 72,
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— 003 · Servicios</div>
            <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1 }}>
              Hay más de una forma de{' '}
              <em style={{ color: 'var(--accent)' }}>trabajar juntos.</em>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--ink-2)', lineHeight: 1.6 }}>
              Según dónde estés parado, hay un formato que tiene más sentido. Desde una sesión puntual para destrabar algo concreto hasta un proceso de mediano y largo plazo para cambiar cómo liderás.
            </p>
          </div>
        </div>

        {/* Grid de cards — 4 principales + 1 muted */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: 0,
          borderTop: '1px solid var(--line)',
          borderLeft: '1px solid var(--line)',
          marginBottom: 0,
        }}>
          {items.slice(0, 4).map((it, i) => (
            <ServiceCard key={i} {...it} idx={i + 1} />
          ))}
        </div>

        {/* Card "Otros" — ancho completo, baja visibilidad */}
        <div style={{
          borderLeft: '1px solid var(--line)',
          borderRight: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
        }}>
          <ServiceCard {...items[4]} idx={5} />
        </div>

      </div>
    </section>
  )
}