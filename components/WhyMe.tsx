'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const rows = [
  {
    n: '01',
    e: 'Experiencia real',
    k: 'Producto',
    t: 'Empecé desde abajo. Llegué hasta arriba. Y sé lo que pasa en cada escalón.',
    d: 'Comencé como Analista de Producto y fui pasando por todos los roles — Product Owner, PM, CPO — en corporaciones y startups. No adapto teorías: traigo lo que aprendí tomando decisiones reales en cada etapa.',
  },
  {
    n: '02',
    e: 'Industrias diversas',
    k: 'Fintech',
    t: 'El contexto cambia. Los desafíos de fondo, no tanto.',
    d: 'Trabajé con profesionales de retail, SaaS, healthtech, edtech, marketplace y más. Los desafíos de liderazgo, negocio y producto son más parecidos de lo que parece, sin importar la industria.',
  },
  {
    n: '03',
    e: 'Producto + Coaching',
    k: 'Coaching',
    t: 'Estrategia y persona, en el mismo proceso.',
    d: 'Soy coach ontológico certificado. Eso me permite trabajar no solo el qué hacer sino el cómo ser. Porque los problemas de producto y liderazgo casi siempre tienen algo humano en la raíz.',
  },
  {
    n: '04',
    e: 'Contexto local',
    k: 'LATAM',
    t: 'No importo frameworks. Trabajo desde adentro del contexto.',
    d: 'Toda mi carrera fue en LATAM. Entiendo los mercados, las estructuras, la cultura de equipos y los tiempos de la región. Eso hace una diferencia real cuando el acompañamiento tiene que funcionar acá, no en Silicon Valley.',
  },
]

export default function WhyMe() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '64px 0' : '120px 0' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 16 }}>— 004 · Por qué conmigo</div>
        <h2 className="serif" style={{
          fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)',
          lineHeight: 1.02, marginBottom: isMobile ? 40 : 72, maxWidth: 900,
        }}>
          No hay atajos. Pero hay alguien que ya{' '}
          <em style={{ color: 'var(--accent)' }}>recorrió el camino.</em>
        </h2>

        <div>
          {rows.map((r, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '60px 1fr' : '80px 180px 1fr 1fr',
              gap: isMobile ? 12 : 32,
              padding: isMobile ? '28px 0' : '36px 0',
              borderTop: '1px solid var(--line)',
              borderBottom: i === rows.length - 1 ? '1px solid var(--line)' : 'none',
              alignItems: 'start',
            }}>
              {/* Número */}
              <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', paddingTop: 4 }}>{r.n}</div>

              {/* Etiqueta + keyword */}
              {!isMobile && (
                <div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{r.e}</div>
                  <div className="serif" style={{ fontSize: 22, fontStyle: 'italic', color: 'var(--accent)' }}>{r.k}</div>
                </div>
              )}

              {/* Título */}
              <div>
                <h3 className="serif" style={{ fontSize: isMobile ? 24 : 28, lineHeight: 1.1, marginBottom: 10 }}>{r.t}</h3>
                {isMobile && <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6 }}>{r.d}</p>}
              </div>

              {/* Descripción desktop */}
              {!isMobile && (
                <div>
                  <p style={{ fontSize: 15, color: 'var(--ink-2)', maxWidth: 420, lineHeight: 1.65 }}>{r.d}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}