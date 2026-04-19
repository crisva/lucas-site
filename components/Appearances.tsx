'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const items = [
  { d: 'Oct 2026', t: 'Keynote — Product Hub LATAM Summit', l: 'Buenos Aires · 500 asistentes' },
  { d: 'Ago 2026', t: 'Panelista — Fintech Americas',       l: 'Miami · Mesa de growth' },
  { d: 'Jun 2026', t: 'Invitado — Pivotea Podcast',         l: 'Liderazgo en equipos distribuidos' },
  { d: 'May 2026', t: 'Workshop — Platzi Conf',             l: 'Medellín · Growth para PMs' },
]

export default function Appearances() {
  const { isMobile } = useBreakpoint()

  return (
    <section style={{ padding: isMobile ? '64px 0' : '120px 0', background: 'var(--bg-2)' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 16 }}>— 009 · Apariciones</div>
        <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1, marginBottom: isMobile ? 36 : 72, maxWidth: 900 }}>
          Charlas y eventos donde<br />he <em style={{ color: 'var(--accent)' }}>participado</em>.
        </h2>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {items.map((it, i) => (
            <a key={i} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '120px 1fr auto',
              gap: isMobile ? 6 : 32,
              padding: isMobile ? '20px 0' : '24px 0',
              borderBottom: '1px solid var(--line)',
              cursor: 'pointer',
            }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{it.d}</div>
              <div>
                <div className="serif" style={{ fontSize: isMobile ? 18 : 24, lineHeight: 1.1, marginBottom: isMobile ? 4 : 0 }}>{it.t}</div>
                {isMobile && <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>{it.l}</div>}
              </div>
              {!isMobile && <div style={{ fontSize: 14, color: 'var(--ink-2)', alignSelf: 'center' }}>{it.l}</div>}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
