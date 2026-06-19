'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const podcasts = [
  { id: 'DtsIF4ki2NM', titulo: 'Growth Rockstar Podcast',         sub: 'Con Dylan Rosemberg' },
  { id: 'N3PbxzL4vJc', titulo: 'Hablemos de Producto',            sub: 'Episodio especial' },
  { id: '3ifYJJswR98', titulo: 'Fintech Latam Podcast',            sub: 'Producto en fintech' },
  { id: '7cluAaR4r64', titulo: 'Product Thinking',                 sub: 'Liderazgo en producto' },
  { id: 'Iz2YQlABW4I', titulo: 'Innovación en la banca',              sub: 'Con Ricardo Araya Gautier' },
  { id: '3i5W6JQsLF0', titulo: 'Hackeando Negocios',               sub: 'Growth y estrategia' },
  { id: 'a39DuRNyPfg', titulo: 'Product Leaders LATAM',            sub: 'Panel de líderes' },
  { id: 'c8V5vw-PJEU', titulo: 'Construyendo Producto',            sub: 'Decisiones sin datos' },
  { id: 'SpeN9puPGl0', titulo: 'The Product Mindset',              sub: 'Mentalidad de producto' },
  { id: 'WCzFNqk-sHI', titulo: 'SaaS Latam Show',                  sub: 'Equipos de alto impacto' },
  { id: 'DMIIX7vNeDs', titulo: 'PM Sessions',                      sub: 'Carrera en producto' },
]

const fotos = [
  { src: '/apariciones/evento-1.jpg', titulo: 'Product Hub LATAM Summit', sub: 'Buenos Aires · 2024', placeholder: true },
  { src: '/apariciones/evento-2.jpg', titulo: 'Fintech Americas',           sub: 'Miami · 2024',        placeholder: true },
  { src: '/apariciones/evento-3.jpg', titulo: 'Platzi Conf',                sub: 'Medellín · 2024',     placeholder: true },
  { src: '/apariciones/evento-4.jpg', titulo: 'Growth Rockstar Live',       sub: 'Buenos Aires · 2023', placeholder: true },
]

const papers = [
  { label: 'Informe Domus 2025',             sub: 'Paper · it.domus.global',  href: 'https://it.domus.global/informe-2025' },
  { label: 'Cultura en Entornos Ágiles 2025', sub: 'Ebook · Unlearni',        href: 'https://unlearni.com/ebook-cultura-en-entornos-agiles-2025/' },
]

function ModalApariciones({ onClose }: { onClose: () => void }) {
  const { isMobile } = useBreakpoint()

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
      {label}
    </div>
  )

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? 16 : 32, backdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 960, maxHeight: '90vh', background: 'var(--bg)', borderRadius: 16, border: '1px solid var(--line)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>007.C · Apariciones</div>
            <h3 className="serif" style={{ fontSize: isMobile ? 22 : 28, lineHeight: 1 }}>Cuando me invitan a hablar, <em style={{ color: 'var(--accent)' }}>acepto</em></h3>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Scroll content */}
        <div style={{ overflowY: 'auto', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>

          {/* PODCASTS */}
          <div>
            <SectionLabel label="Podcast y entrevistas" />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 16 }}>
              {podcasts.map(p => (
                <a
                  key={p.id}
                  href={`https://www.youtube.com/watch?v=${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)', textDecoration: 'none', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
                >
                  <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--bg-2)' }}>
                    <img src={`https://img.youtube.com/vi/${p.id}/mqdefault.jpg`} alt={p.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' }}>
                      <div style={{ width: 34, height: 34, borderRadius: 999, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="11" height="13" viewBox="0 0 12 14" fill="none"><path d="M1 1L11 7L1 13V1Z" fill="#14100C"/></svg>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '10px 12px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2, lineHeight: 1.3 }}>{p.titulo}</div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{p.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* FOTOS */}
          <div>
            <SectionLabel label="Eventos como speaker" />
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 14 }}>
              {fotos.map((f, i) => (
                <div key={i} style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid var(--line)' }}>
                  <div style={{ aspectRatio: '4/3', background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {f.placeholder ? (
                      <div style={{ textAlign: 'center', padding: 12 }}>
                        <div style={{ fontSize: 20, marginBottom: 6, opacity: 0.3 }}>📷</div>
                      </div>
                    ) : (
                      <img src={f.src} alt={f.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                  <div style={{ padding: '10px 12px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 2, lineHeight: 1.3 }}>{f.titulo}</div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>

          {/* PAPERS */}
          <div>
            <SectionLabel label="Papers y recursos" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {papers.map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--surface)', textDecoration: 'none', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 2 }}>{item.label}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--muted)' }}>{item.sub}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const cards = [
  {
    tag: '007.A · Podcast',
    t: 'Hackeando Productos',
    d: 'Conversaciones sin filtro sobre producto, growth y lo que nadie te enseña en un MBA. Cada episodio es una excusa para ir a fondo en los temas que más importan a quienes construyen productos en LATAM.',
    cta: 'Escuchar el podcast',
    href: 'https://www.youtube.com/@hackeandoproductos',
    external: true,
  },
  {
    tag: '007.B · Artículos',
    t: 'Lo que pienso, por escrito.',
    d: 'Reflexiones, análisis y aprendizajes sobre producto, liderazgo y growth. Sin periodicidad fija, solo cuando hay algo que vale la pena decir.',
    cta: 'Leer los artículos',
    href: 'https://www.linkedin.com/in/lucaspatano/recent-activity/articles/',
    external: true,
  },
  {
    tag: '007.C · Apariciones',
    t: 'Cuando me invitan a hablar, acepto.',
    d: 'Charlas en eventos, participaciones como invitado en podcasts de terceros y apariciones en medios y artículos periodísticos. Todo en un solo lugar.',
    cta: 'Ver todas las apariciones',
    href: '#',
    external: false,
    modal: true,
  },
]

export default function Contenido() {
  const { isMobile, isTablet } = useBreakpoint()
  const [showModal, setShowModal] = useState(false)

  return (
    <section id="contenido" style={{ padding: isMobile ? '64px 0' : '120px 0', borderTop: '1px solid var(--line)' }}>
      {showModal && <ModalApariciones onClose={() => setShowModal(false)} />}

      <div className="wrap">
        <div style={{ marginBottom: isMobile ? 40 : 72 }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>007 · Contenido</div>
          <h2 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)', lineHeight: 1, maxWidth: 700 }}>
            Contenido que no se queda en la{' '}
            <em style={{ color: 'var(--accent)' }}>teoría</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(3, 1fr)', gap: isMobile ? 20 : 24 }}>
          {cards.map((c, i) => (
            <div key={i} style={{ padding: isMobile ? 24 : 32, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: isMobile ? 'auto' : 320 }}>
              <div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>{c.tag}</div>
                <h3 className="serif" style={{ fontSize: isMobile ? 26 : 30, lineHeight: 1.05, marginBottom: 16 }}>{c.t}</h3>
                <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65 }}>{c.d}</p>
              </div>
              <div style={{ marginTop: 32 }}>
                <div style={{ height: 1, background: 'var(--line)', marginBottom: 20 }} />
                {c.modal ? (
                  <button
                    onClick={() => setShowModal(true)}
                    style={{ fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--ink)', background: 'none', border: 'none', borderBottom: '1px solid var(--ink)', cursor: 'pointer', padding: '0 0 2px 0' }}
                  >
                    {c.cta} →
                  </button>
                ) : (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--ink)', borderBottom: '1px solid var(--ink)', padding: '0 0 2px 0' }}>
                    {c.cta} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}