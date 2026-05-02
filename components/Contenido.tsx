'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const cards = [
  {
    tag: '007.A · Podcast',
    t: 'Hackeando Productos',
    d: 'Conversaciones sin filtro sobre producto, growth y lo que nadie te enseña en un MBA. Cada episodio es una excusa para ir a fondo en los temas que más importan a quienes construyen productos en LATAM.',
    cta: 'Escuchar el podcast',
    href: '#',
  },
  {
    tag: '007.B · Artículos',
    t: 'Lo que pienso, por escrito.',
    d: 'Reflexiones, análisis y aprendizajes sobre producto, liderazgo y growth. Sin periodicidad fija — solo cuando hay algo que vale la pena decir.',
    cta: 'Leer los artículos',
    href: '#',
  },
  {
    tag: '007.C · Apariciones',
    t: 'Cuando me invitan a hablar, acepto.',
    d: 'Charlas en eventos, participaciones como invitado en podcasts de terceros y apariciones en medios y artículos periodísticos. Todo en un solo lugar.',
    cta: 'Ver todas las apariciones',
    href: '#',
  },
]

export default function Contenido() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section id="contenido" style={{ padding: isMobile ? '64px 0' : '120px 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ marginBottom: isMobile ? 40 : 72 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>— 007 · Contenido</div>
          <h2 className="serif" style={{
            fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)',
            lineHeight: 1, maxWidth: 700,
          }}>
            Contenido que no se queda en la{' '}
            <em style={{ color: 'var(--accent)' }}>teoría.</em>
          </h2>
        </div>

        {/* 3 Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 20 : 24,
        }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              padding: isMobile ? 24 : 32,
              borderRadius: 12,
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              minHeight: isMobile ? 'auto' : 320,
            }}>
              <div>
                <div className="mono" style={{
                  fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--muted)', marginBottom: 20,
                }}>
                  {c.tag}
                </div>
                <h3 className="serif" style={{
                  fontSize: isMobile ? 26 : 30, lineHeight: 1.05, marginBottom: 16,
                }}>
                  {c.t}
                </h3>
                <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65 }}>
                  {c.d}
                </p>
              </div>

              <div style={{ marginTop: 32 }}>
                <div style={{ height: 1, background: 'var(--line)', marginBottom: 20 }} />
                <a href={c.href} style={{
                  fontSize: 14, fontWeight: 500,
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: 'var(--ink)',
                  borderBottom: '1px solid var(--ink)', paddingBottom: 2,
                }}>
                  {c.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}