'use client'

import Image from 'next/image'
import { useBreakpoint } from '@/hooks/useBreakpoint'

const bio = [
  `Soy Lucas Patanó. Más de 15 años en producto y growth en startups, fintechs y corporaciones de LATAM — con equipos que escalaron de cero a millones de usuarios.`,
  `Fui CPO de Global66, donde construí el área de producto de 4 a más de 30 personas, lideré el desarrollo de la primera billetera multimoneda de LATAM y los envíos de dinero internacional instantáneos, y contribuí a cerrar una Serie A de USD 12M. También fui parte del equipo que diseñó las bases de UalaBis en Ualá.`,
  `Hoy soy Gerente de Innovación en BICECORP, construyendo nuevos negocios digitales dentro de uno de los holdings financieros más grandes de Chile.`,
  `Acompaño a CEOs, founders y líderes de producto a resolver lo que más los traba — estrategia, equipos o decisiones de carrera. Mi especialización es fintech, pero trabajo con múltiples industrias. Soy coach ontológico certificado: no solo trabajo el qué hacer, también el cómo ser.`,
]

const quickData = [
  { k: 'Especialización', v: 'Producto · Growth · Negocio · Desarrollo profesional' },
  { k: 'Industrias', v: 'Fintech · SaaS · Retail · Marketplace · Edtech · Wellness' },
  { k: 'Público', v: 'CEOs · Founders · CPOs · Heads · Leads · Semi Senior' },
  { k: 'Formatos', v: 'Mentorías · Coaching · Cursos · Speaker' },
  { k: 'Base', v: 'Santiago, Chile · LATAM hispanohablante' },
]

export default function About() {
  const { isMobile, isTablet } = useBreakpoint()

  return (
    <section id="about" style={{ padding: isMobile ? '64px 0' : '120px 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '0.75fr 1.25fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'start',
        }}>

          {/* Columna izquierda: foto + card de datos */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>
            <div className="eyebrow" style={{ marginBottom: 20 }}>— 002 · Sobre mí</div>

            {/* Foto */}
            <div style={{
              position: 'relative',
              aspectRatio: '1',
              borderRadius: 8,
              overflow: 'hidden',
              maxWidth: isMobile ? 280 : 'none',
              margin: isMobile ? '0 auto 24px' : '0 0 24px',
            }}>
              <Image
                src="/lucas-sobre-mi.jpg"
                alt="Lucas Patanó dando una charla"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center center' }}
              />
            </div>

            {/* Card datos rápidos */}
            <div style={{ borderRadius: 10, border: '1px solid var(--line)', overflow: 'hidden' }}>
              {quickData.map((d, i) => (
                <div key={d.k} style={{
                  padding: '14px 16px',
                  borderBottom: i < quickData.length - 1 ? '1px solid var(--line)' : 'none',
                  display: 'grid', gridTemplateColumns: '100px 1fr',
                  gap: 12, alignItems: 'start',
                }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', paddingTop: 2 }}>{d.k}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.5 }}>{d.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: bio */}
          <div>
            <h2 className="serif" style={{
              fontSize: isMobile ? 'clamp(36px, 10vw, 56px)' : 'clamp(40px, 4.5vw, 68px)',
              lineHeight: 1.02, marginBottom: 28, maxWidth: 720,
            }}>
              No voy a darte un framework.{' '}
              <em style={{ color: 'var(--accent)' }}>Voy a moverme contigo.</em>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
              {bio.map((para, i) => (
                <p key={i} style={{ fontSize: isMobile ? 16 : 17, color: 'var(--ink-2)', maxWidth: 600, lineHeight: 1.65 }}>
                  {para}
                </p>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href="#services" style={{ fontSize: 14, padding: '11px 20px', borderRadius: 999, background: 'var(--ink)', color: 'var(--bg)', fontWeight: 500 }}>
                Quiero trabajar con Lucas →
              </a>
              <a href="https://www.linkedin.com/in/lucaspatano/" style={{ fontSize: 14, padding: '11px 20px', borderRadius: 999, border: '1px solid var(--line)', color: 'var(--ink-2)' }}>
                Seguime en LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}