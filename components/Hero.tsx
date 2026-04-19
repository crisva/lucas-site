'use client'

import Image from 'next/image'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const brands = ['BICE', 'Falabella', 'Global66', 'Ualá', 'Mercado Pago', 'Rappi', 'Platzi', 'Globant']

export default function Hero() {
  const { isMobile, isTablet } = useBreakpoint()
  const pad = isMobile ? '28px 0 56px' : isTablet ? '40px 0 72px' : '40px 0 80px'

  return (
    <section style={{ padding: pad }}>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="wrap">
        {/* Status row */}
        <div style={{
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          alignItems: 'center', marginBottom: isMobile ? 32 : 56, gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }} className="mono">
            <span style={{ width: 8, height: 8, borderRadius: 999, background: '#4CAF50', boxShadow: '0 0 0 4px rgba(76,175,80,0.15)', flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Agenda abierta · Mayo 2026</span>
          </div>
          {!isMobile && (
            <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Buenos Aires · LATAM</div>
          )}
        </div>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'end',
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>— 001 · Mentoría para product leaders</div>
            <h1 className="serif" style={{
              fontSize: isMobile ? 'clamp(48px, 13vw, 72px)' : 'clamp(56px, 7vw, 104px)',
              lineHeight: 0.98, marginBottom: 24, letterSpacing: '-0.03em',
            }}>
              Producto, growth<br />
              y liderazgo que<br />
              <em style={{ color: 'var(--accent)' }}>genera impacto</em><br />
              real.
            </h1>
            <p style={{ fontSize: isMobile ? 16 : 18, color: 'var(--ink-2)', maxWidth: 520, marginBottom: 32, lineHeight: 1.5 }}>
              Más de diez años trabajando con startups y corporaciones en LATAM.
              Hoy acompaño profesionales que buscan escalar su carrera, liderar equipos
              de producto y tomar decisiones que importan.
            </p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#book" style={{
                background: 'var(--ink)', color: 'var(--bg)',
                padding: isMobile ? '14px 22px' : '16px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                Reservar mentoría
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
              <a href="#services" style={{
                padding: isMobile ? '14px 18px' : '16px 24px', borderRadius: 999, fontSize: 15,
                border: '1px solid var(--line)', color: 'var(--ink)',
              }}>Conocer servicios</a>
            </div>
          </div>

          {/* Portrait — solo desktop */}
          {!isMobile && (
            <div>
              <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                <Image
                  src="/lucas-patano.jpg"
                  alt="Lucas Patanó — Product Coach"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }} className="mono">
                <span style={{ color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Fig. 01 — portrait</span>
                <span style={{ color: 'var(--muted)' }}>↓ scroll</span>
              </div>
            </div>
          )}
        </div>

        {/* Brands marquee */}
        <div style={{
          marginTop: isMobile ? 48 : 80,
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}>
          {/* Label fijo */}
          <div className="mono" style={{
            fontSize: 11, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase',
            flexShrink: 0, padding: '20px 32px 20px 0',
            borderRight: '1px solid var(--line)', marginRight: 40,
            whiteSpace: 'nowrap',
          }}>
            Experiencia con
          </div>

          {/* Track con loop: duplicamos la lista para el efecto infinito */}
          <div style={{ overflow: 'hidden', flex: 1 }}>
            <div className="marquee-track">
              {[...brands, ...brands].map((c, i) => (
                <span
                  key={i}
                  className="serif"
                  style={{
                    fontSize: isMobile ? 18 : 22,
                    color: 'var(--ink-2)',
                    opacity: 0.7,
                    whiteSpace: 'nowrap',
                    paddingRight: isMobile ? 40 : 64,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}