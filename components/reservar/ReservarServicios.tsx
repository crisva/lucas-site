'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const servicios = [
  {
    id: 'coaching',
    tag: 'Programa',
    t: 'Product Coaching',
    badge: 'Sesión intro gratuita',
    precio: 'Packs desde USD 450',
    duracion: '3–6 meses',
    descripcion: 'Para líderes que quieren un cambio de fondo. Trabajamos juntos en estrategia, liderazgo y desarrollo profesional — con objetivos claros y resultados medibles.',
    ideal: 'CEOs, founders y líderes de producto que sienten que algo importante está trancado.',
    incluye: [
      'Sesión introductoria gratuita de 15 min',
      'Diagnóstico inicial de situación',
      'Sesiones regulares con agenda y seguimiento',
      'Objetivos y métricas definidos',
      'Acompañamiento entre sesiones por mensaje',
      'Acceso a recursos y materiales',
    ],
    cta: 'Reservar sesión introductoria gratuita',
    ctaHref: '#calendario',
    ctaNote: 'Sin cargo · Sin compromiso',
    accent: true,
  },
  {
    id: 'mentoria',
    tag: 'Core',
    t: 'Mentoría 1:1',
    badge: 'Reserva con pago online',
    precio: 'Desde USD 180',
    duracion: 'Hasta 60 min',
    descripcion: 'Para decisiones que no pueden esperar. Una sesión de hasta 1 hora para destrabar algo concreto — sin rodeos, con foco en lo que importa.',
    ideal: 'PMs, founders y profesionales con un desafío puntual de carrera, producto o equipo.',
    incluye: [
      'Sesión individual de hasta 60 min',
      'Preparación previa con contexto',
      'Foco en el problema que traés',
      'Resumen y próximos pasos post-sesión',
    ],
    cta: 'Reservar mentoría',
    ctaHref: '#calendario',
    ctaNote: 'Pago al momento de la reserva',
    accent: false,
  },
]

export default function ReservarServicios() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '56px 0' : '96px 0', background: 'var(--bg-2)' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 16 }}>— Servicios disponibles</div>
        <h2 className="serif" style={{
          fontSize: isMobile ? 'clamp(32px, 8vw, 48px)' : 'clamp(36px, 3.5vw, 56px)',
          lineHeight: 1, marginBottom: isMobile ? 36 : 56,
        }}>
          ¿Cuál es el formato<br />
          <em style={{ color: 'var(--accent)' }}>adecuado para vos?</em>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1fr',
          gap: isMobile ? 20 : 28,
        }}>
          {servicios.map(s => (
            <div key={s.id} style={{
              padding: isMobile ? 24 : 36,
              borderRadius: 12,
              border: s.accent ? '1.5px solid var(--accent)' : '1px solid var(--line)',
              background: s.accent ? 'color-mix(in oklab, var(--accent) 5%, var(--surface))' : 'var(--surface)',
              display: 'flex', flexDirection: 'column', gap: 0,
              position: 'relative',
            }}>
              {/* Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 12 }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  {s.tag}
                </span>
                <span className="mono" style={{
                  fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 999,
                  background: s.accent ? 'var(--accent)' : 'var(--bg-2)',
                  color: s.accent ? 'var(--bg)' : 'var(--muted)',
                  border: s.accent ? 'none' : '1px solid var(--line)',
                  flexShrink: 0,
                }}>
                  {s.badge}
                </span>
              </div>

              {/* Título + precio */}
              <h3 className="serif" style={{ fontSize: isMobile ? 28 : 34, lineHeight: 1, marginBottom: 8 }}>{s.t}</h3>
              <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>{s.precio}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>· {s.duracion}</span>
              </div>

              {/* Descripción */}
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 16 }}>{s.descripcion}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 24 }}>
                <strong style={{ color: 'var(--ink-2)' }}>Ideal para: </strong>{s.ideal}
              </p>

              {/* Incluye */}
              <div style={{
                padding: '16px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
                marginBottom: 24,
              }}>
                <div className="mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
                  Incluye
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {s.incluye.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--ink-2)' }}>
                      <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <a href={s.ctaHref} style={{
                display: 'block', textAlign: 'center',
                background: s.accent ? 'var(--ink)' : 'transparent',
                color: s.accent ? 'var(--bg)' : 'var(--ink)',
                border: s.accent ? 'none' : '1px solid var(--ink)',
                padding: '13px 20px', borderRadius: 999,
                fontSize: 14, fontWeight: 500,
                marginBottom: 10,
              }}>
                {s.cta}
              </a>
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center', letterSpacing: '0.06em' }}>
                {s.ctaNote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
