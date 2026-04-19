'use client'

import { useState, useEffect } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { isMobile, isTablet } = useBreakpoint()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  const links = ['Inicio', 'Coaching', 'Cursos', 'Podcast', 'Blog', 'Más']

  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    background: scrolled || open ? 'color-mix(in oklab, var(--bg) 92%, transparent)' : 'transparent',
    backdropFilter: scrolled || open ? 'blur(18px) saturate(1.2)' : 'none',
    borderBottom: scrolled || open ? '1px solid var(--line)' : '1px solid transparent',
    transition: 'all 0.25s ease',
  }

  return (
    <nav style={navStyle}>
      <div className="wrap" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '16px 20px' : isTablet ? '16px 32px' : '18px 48px',
      }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 60 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 999,
            background: 'var(--ink)', color: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Instrument Serif, serif', fontSize: 17, flexShrink: 0,
          }}>LP</div>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Lucas Patanó</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Product Coach</div>
          </div>
        </a>

        {/* Desktop links */}
        {!isMobile && !isTablet && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ padding: '8px 12px', fontSize: 14, color: 'var(--ink-2)', borderRadius: 999 }}>{l}</a>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        {!isMobile && !isTablet && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a href="#contact" style={{ fontSize: 14, color: 'var(--ink-2)', padding: '8px 12px' }}>Contactar</a>
            <a href="#book" style={{
              fontSize: 14, fontWeight: 500,
              background: 'var(--ink)', color: 'var(--bg)',
              padding: '10px 18px', borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Reservar
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        )}

        {/* Tablet CTA */}
        {isTablet && !isMobile && (
          <a href="#book" style={{
            fontSize: 13, fontWeight: 500,
            background: 'var(--ink)', color: 'var(--bg)',
            padding: '9px 16px', borderRadius: 999,
          }}>Reservar mentoría</a>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button onClick={() => setOpen(!open)} style={{ zIndex: 60, padding: 8 }}>
            {open
              ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              : <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            }
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && open && (
        <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--line)', padding: '20px 20px 28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 24 }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{ padding: '12px 4px', fontSize: 18, fontWeight: 500, borderBottom: '1px solid var(--line)' }}
              >{l}</a>
            ))}
          </div>
          <a href="#book" style={{
            display: 'block', textAlign: 'center',
            background: 'var(--ink)', color: 'var(--bg)',
            padding: '14px 20px', borderRadius: 999, fontSize: 15, fontWeight: 500,
          }}>Reservar mentoría →</a>
        </div>
      )}
    </nav>
  )
}
