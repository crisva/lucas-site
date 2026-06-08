'use client'

import { useBreakpoint } from '@/hooks/useBreakpoint'

const cols = [
  {
    t: 'Servicios', l: [
      { label: 'Coaching',   href: '/#services' },
      { label: 'Mentorías',  href: '/#services' },
      { label: 'Cursos',     href: 'https://www.producthub.com.ar/cursos-online/growth', external: true },
      { label: 'Speaker',    href: 'mailto:lucaspatano@gmail.com' },
    ]
  },
  {
    t: 'Contenido', l: [
      { label: 'Podcast',     href: 'https://www.youtube.com/@hackeandoproductos', external: true },
      { label: 'Artículos',   href: 'https://www.linkedin.com/in/lucaspatano/recent-activity/articles/', external: true },
      { label: 'Apariciones', href: '/#contenido' },
      { label: 'Testimonios', href: '/#testimonios' },
    ]
  },
  {
    t: 'Sígueme', l: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lucaspatano/',              external: true },
      { label: 'YouTube',  href: 'https://www.youtube.com/@hackeandoproductos',            external: true },
      { label: 'Spotify',  href: 'https://open.spotify.com/show/6MSn0GCobgEfJNlddXg0eW', external: true },
    ]
  },
]

export default function Footer() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <footer style={{ padding: isMobile ? '48px 0 28px' : '72px 0 36px', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        {/* Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1.6fr 1fr 1fr 1fr',
          gap: isMobile ? 36 : 48,
          marginBottom: isMobile ? 48 : 72,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 999,
                background: 'var(--ink)', color: 'var(--bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Instrument Serif, serif', fontSize: 20, flexShrink: 0,
              }}>LP</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>Lucas Patanó</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Product Coach</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-2)', maxWidth: 340, marginBottom: 16 }}>
              Producto, growth y liderazgo que genera impacto real en LATAM.
            </p>
          </div>

          {/* Link cols */}
          {cols.map(c => (
            <div key={c.t}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{c.t}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {c.l.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...('external' in item && item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      style={{ fontSize: 14, color: 'var(--ink-2)' }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div style={{ borderTop: '1px solid var(--line)', padding: isMobile ? '32px 0 24px' : '48px 0 32px' }}>
          <div className="serif" style={{ fontSize: 60, lineHeight: 0.9, letterSpacing: '-0.04em', textAlign: 'center' }}>
            Lucas <em style={{ color: 'var(--accent)' }}>Patanó</em>
          </div>
        </div>

        {/* Legal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid var(--line)', flexWrap: 'wrap', gap: 10 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>© 2026 Lucas Patanó. Todos los derechos reservados.</div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }} className="mono">
            {['Privacidad', 'Términos', 'Cookies'].map(item => (
              <a key={item} style={{ fontSize: 11, color: 'var(--muted)' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}