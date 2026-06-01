'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useState, useEffect } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

type Servicio = 'introductoria' | 'mentoria'

const servicios = [
  { id: 'introductoria' as Servicio, label: 'Sesión introductoria', sub: '30 min · Gratuita',  namespace: 'sesion-introductoria', calLink: 'lucaspatano/sesion-introductoria?theme=dark&bg=14100C&text=F3EEE4' },
  { id: 'mentoria'      as Servicio, label: 'Mentoría 1:1',         sub: '60 min · USD 180',   namespace: 'mentoria1-1',           calLink: 'lucaspatano/mentoria1-1?theme=dark&bg=14100C&text=F3EEE4'           },
]

const audiencia = [
  { t: 'Quiero escalar mi carrera',             d: 'Decisiones, transiciones y siguiente nivel.' },
  { t: 'Necesito mejorar mi liderazgo',          d: 'Equipos, cultura y gestión.' },
  { t: 'Tengo un desafío de producto o negocio', d: 'Estrategia, priorización y growth.' },
]

const incluye = [
  'Preparación previa con contexto',
  'Sesión 1:1 por videollamada',
  'Resumen y próximos pasos post-sesión',
  'Horarios en GMT-3 (Santiago de Chile)',
]

export default function ReservarHero() {
  const { isMobile, isTablet } = useBreakpoint()
  const [activo, setActivo] = useState<Servicio>('introductoria')

  useEffect(() => {
    servicios.forEach(async s => {
      const cal = await getCalApi({ namespace: s.namespace })
      cal('ui', { hideEventTypeDetails: true, layout: 'month_view' })
    })
  }, [])

  return (
    <section style={{ padding: isMobile ? '40px 0 64px' : '56px 0 96px' }}>
      <div className="wrap">

        {/* Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: isMobile ? 32 : 48 }} className="mono">
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#4CAF50', boxShadow: '0 0 0 4px rgba(76,175,80,0.15)', flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Agenda abierta · {MESES[new Date().getMonth()]} {new Date().getFullYear()}
          </span>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1fr 1.4fr',
          gap: isMobile ? 48 : 72,
          alignItems: 'start',
        }}>

          {/* ── Izquierda ── */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— Reservar sesión</div>
            <h1 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(40px, 4vw, 60px)', lineHeight: 1.02, marginBottom: 20 }}>
              El primer paso es<br />
              <em style={{ color: 'var(--accent)' }}>agendar.</em>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 32, maxWidth: 480 }}>
              Elegí el tipo de sesión y seleccioná el horario que mejor te quede.
            </p>

            {/* Audiencia */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
              {audiencia.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--surface)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0, marginTop: 1 }}>→</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{a.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{a.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Incluye */}
            <div style={{ padding: '16px', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                Todas las sesiones incluyen
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {incluye.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink-2)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Derecha: selector + Cal ── */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>

            {/* Selector */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {servicios.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActivo(s.id)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                    border: activo === s.id ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                    background: activo === s.id ? 'color-mix(in oklab, var(--accent) 7%, var(--surface))' : 'var(--surface)',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ width: 14, height: 14, borderRadius: 999, flexShrink: 0, border: activo === s.id ? '4px solid var(--accent)' : '1.5px solid var(--line)', transition: 'all 0.15s' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 1 }}>{s.label}</div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{s.sub}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Cal embed */}
            <div style={{ borderRadius: 16, border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--surface)', minHeight: isMobile ? 600 : 700 }}>
              {servicios.map(s => (
                <div key={s.id} style={{ display: activo === s.id ? 'block' : 'none', height: '100%' }}>
                  <Cal
                    namespace={s.namespace}
                    calLink={s.calLink}
                    style={{ width: '100%', height: isMobile ? 600 : 700, overflow: 'scroll' }}
                    config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true' }}
                  />
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}