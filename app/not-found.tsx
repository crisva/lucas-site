'use client'

import { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const frases = [
  'Esta página tomó una mentoría y nunca volvió.',
  'El roadmap no incluía esta URL.',
  'Parece que este producto no pasó el discovery.',
  'Houston, tenemos un 404.',
  'Esta página pivoteó hacia otro lugar.',
  'MVP no aprobado. Ruta no encontrada.',
]

export default function NotFound() {
  const [frase, setFrase] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setFrase(frases[Math.floor(Math.random() * frases.length)])
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Nav />
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Número 404 gigante de fondo */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          <div className="serif" style={{
            fontSize: 'clamp(200px, 35vw, 480px)',
            lineHeight: 1,
            color: 'var(--line)',
            letterSpacing: '-0.06em',
            opacity: 0.4,
            transition: 'opacity 1s ease',
          }}>
            404
          </div>
        </div>

        {/* Contenido centrado */}
        <div style={{
          position: 'relative',
          textAlign: 'center',
          maxWidth: 600,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <div className="mono" style={{
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 20,
          }}>
            — Error 404 · Página no encontrada
          </div>

          <h1 className="serif" style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            lineHeight: 1.05,
            marginBottom: 20,
          }}>
            Esto no estaba en<br />
            <em style={{ color: 'var(--accent)' }}>el roadmap.</em>
          </h1>

          <p style={{
            fontSize: 17,
            color: 'var(--ink-2)',
            lineHeight: 1.65,
            marginBottom: 12,
          }}>
            {frase}
          </p>

          <p style={{
            fontSize: 15,
            color: 'var(--muted)',
            marginBottom: 40,
          }}>
            Pero no te preocupes, puedes ir:
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/" style={{
              background: 'var(--ink)',
              color: 'var(--bg)',
              padding: '14px 28px',
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}>
              Volver al inicio
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L11 6L6 11M11 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/reservar" target="_blank" rel="noopener noreferrer" style={{
              padding: '14px 24px',
              borderRadius: 999,
              fontSize: 15,
              border: '1px solid var(--line)',
              color: 'var(--ink)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
            }}>
              Reservar sesión →
            </a>
          </div>

          {/* Easter egg */}
          <div className="mono" style={{
            marginTop: 48,
            fontSize: 11,
            color: 'var(--line)',
            letterSpacing: '0.08em',
          }}>
            Si llegaste acá, quizás es el momento de pedir ayuda. 😉
          </div>
        </div>

      </section>
      <Footer />
    </>
  )
}
