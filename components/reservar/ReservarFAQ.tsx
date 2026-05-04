'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const faqs = [
  {
    q: '¿Cuál es la diferencia entre la mentoría y el coaching?',
    a: 'La mentoría 1:1 es una sesión puntual para resolver algo concreto — una decisión, una situación específica, un desbloqueo. El Product Coaching es un proceso de mediano o largo plazo con sesiones regulares, objetivos definidos y seguimiento. Si no sabés cuál necesitás, empezá por la sesión introductoria gratuita.',
  },
  {
    q: '¿La sesión introductoria de coaching es realmente gratuita?',
    a: 'Sí. Es una sesión de 15 minutos sin cargo y sin compromiso. El objetivo es que nos conozcamos, que cuentes tu situación y que veas si el proceso de coaching tiene sentido para vos.',
  },
  {
    q: '¿Cómo se realizan las sesiones?',
    a: 'Todas las sesiones son por videollamada (Google Meet o Zoom). Al confirmar la reserva te llega un email con el link correspondiente.',
  },
  {
    q: '¿En qué zona horaria están los horarios?',
    a: 'Todos los horarios están en GMT-3 (Buenos Aires / Santiago de Chile). Si estás en otra zona horaria, convertí el horario antes de reservar.',
  },
  {
    q: '¿Puedo reprogramar o cancelar una sesión?',
    a: 'Sí, con al menos 24 horas de anticipación. Escribime directamente a lucaspatano@gmail.com o por WhatsApp para coordinar.',
  },
  {
    q: '¿En qué idioma son las sesiones?',
    a: 'En español. Puedo hacer sesiones en inglés si es necesario, pero el foco está en la comunidad hispanohablante de LATAM.',
  },
]

export default function ReservarFAQ() {
  const { isMobile } = useBreakpoint()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: isMobile ? '56px 0' : '96px 0', background: 'var(--bg-2)' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
          gap: isMobile ? 36 : 80,
          alignItems: 'start',
        }}>
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— Preguntas frecuentes</div>
            <h2 className="serif" style={{ fontSize: isMobile ? 32 : 44, lineHeight: 1.05, marginBottom: 16 }}>
              Antes de<br /><em style={{ color: 'var(--accent)' }}>reservar.</em>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              Si no encontrás la respuesta que buscás, escribime directo.
            </p>
            <a href="mailto:lucaspatano@gmail.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 14, marginTop: 20,
              borderBottom: '1px solid var(--ink)', paddingBottom: 2,
            }}>
              lucaspatano@gmail.com →
            </a>
          </div>

          <div style={{ borderTop: '1px solid var(--line)' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', gap: 16,
                    padding: isMobile ? '18px 0' : '22px 0',
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: isMobile ? 15 : 16, fontWeight: 500, color: 'var(--ink)', lineHeight: 1.4 }}>
                    {f.q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: 24, height: 24,
                    border: '1px solid var(--line)', borderRadius: 999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--muted)', marginTop: 2,
                    transform: open === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </button>
                {open === i && (
                  <div style={{ paddingBottom: 20, paddingRight: 40 }}>
                    <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
