'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

type Servicio = 'coaching' | 'mentoria'
type WidgetStep = 'booking' | 'datos' | 'pago' | 'confirm'

const HORARIOS = ['09:00', '11:00', '14:00', '16:00', '18:00', '19:00']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DIAS_SEMANA_SHORT = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

function getDiasDelMes(year: number, month: number) {
  const primero = new Date(year, month, 1).getDay()
  const offset = primero === 0 ? 6 : primero - 1
  const total = new Date(year, month + 1, 0).getDate()
  return { offset, total }
}

const audiencia = [
  { t: 'CEOs & Founders', d: 'Estrategia de negocio y liderazgo.' },
  { t: 'CPOs & Heads', d: 'Equipos, roadmap y decisiones de producto.' },
  { t: 'Leads & Seniors', d: 'Crecimiento profesional y siguiente salto.' },
]

const payMethods = [
  { id: 'mp', label: 'Mercado Pago', sub: 'Tarjeta, débito o saldo MP', color: '#009EE3' },
  { id: 'paypal', label: 'PayPal', sub: 'Cuenta PayPal o tarjeta', color: '#003087' },
  { id: 'card', label: 'Tarjeta', sub: 'Visa · Mastercard · Amex', color: '#1A1F36' },
  { id: 'transfer', label: 'Transferencia', sub: 'Datos por email', color: '#888' },
]

export default function ReservarHero() {
  const { isMobile, isTablet } = useBreakpoint()

  const hoy = new Date()
  const [mes, setMes] = useState(hoy.getMonth())
  const [año, setAño] = useState(hoy.getFullYear())
  const [dia, setDia] = useState<number | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [servicio, setServicio] = useState<Servicio>('coaching')
  const [wStep, setWStep] = useState<WidgetStep>('booking')
  const [form, setForm] = useState({ nombre: '', email: '', contexto: '' })
  const [payMethod, setPayMethod] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)

  const { offset, total } = getDiasDelMes(año, mes)
  const esPago = servicio === 'mentoria'
  const precio = esPago ? 'USD 180' : 'Gratis'

  const prevMes = () => { if (mes === 0) { setMes(11); setAño(a => a - 1) } else setMes(m => m - 1); setDia(null); setHora(null) }
  const nextMes = () => { if (mes === 11) { setMes(0); setAño(a => a + 1) } else setMes(m => m + 1); setDia(null); setHora(null) }
  const isPasado = (d: number) => { const f = new Date(año, mes, d); f.setHours(0, 0, 0, 0); const h = new Date(); h.setHours(0, 0, 0, 0); return f < h }
  const esFinde = (d: number) => { const dow = new Date(año, mes, d).getDay(); return dow === 0 || dow === 6 }

  const canBook = dia !== null && hora !== null
  const canDatos = form.nombre.trim() !== '' && form.email.trim() !== ''

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px',
    border: '1px solid var(--line)', borderRadius: 8,
    background: 'var(--surface)', color: 'var(--ink)',
    fontSize: 14, outline: 'none', fontFamily: 'inherit',
  }

  return (
    <section style={{ padding: isMobile ? '40px 0 64px' : '56px 0 96px' }}>
      <div className="wrap">
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1.1fr 0.9fr',
          gap: isMobile ? 48 : 72,
          alignItems: 'start',
        }}>

          {/* Copy izquierda */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>— Reservar sesión</div>
            <h1 className="serif" style={{ fontSize: isMobile ? 'clamp(36px, 10vw, 52px)' : 'clamp(40px, 4.5vw, 64px)', lineHeight: 1.02, marginBottom: 20 }}>
              El primer paso es<br /><em style={{ color: 'var(--accent)' }}>agendar.</em>
            </h1>
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 36, maxWidth: 520 }}>
              Elegí el servicio, seleccioná una fecha y hora, completá tus datos y listo.
              Si no sabés cuál es el formato adecuado, empezá por la sesión introductoria gratuita.
            </p>

            {/* Audiencia */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {audiencia.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '13px 16px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--surface)' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0, marginTop: 1 }}>→</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{a.t}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{a.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Incluye */}
            <div style={{ padding: '18px', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                Todas las sesiones incluyen
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  'Preparación previa con contexto',
                  'Sesión 1:1 por videollamada',
                  'Resumen y próximos pasos post-sesión',
                  'Horarios en GMT-3 (Buenos Aires / Santiago)',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: 'var(--ink-2)' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Widget derecha */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 100 }}>
            <div style={{ border: '1px solid var(--line)', borderRadius: 16, background: 'var(--surface)', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}>

              {/* Header con stepper */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 1V3M11 1V3M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Agendá tu sesión</span>
                </div>
                {/* Stepper */}
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[
                    { id: 'booking', label: '1. Fecha' },
                    { id: 'datos', label: '2. Datos' },
                    ...(esPago ? [{ id: 'pago', label: '3. Pago' }] : []),
                  ].map((s, i, arr) => {
                    const steps: WidgetStep[] = ['booking', 'datos', 'pago', 'confirm']
                    const stepIdx = steps.indexOf(s.id as WidgetStep)
                    const curIdx = steps.indexOf(wStep)
                    const done = stepIdx < curIdx
                    const active = stepIdx === curIdx
                    return (
                      <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: i < arr.length - 1 ? '1' : 'initial' }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          opacity: done || active ? 1 : 0.4,
                        }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                            background: done ? 'var(--accent)' : active ? 'var(--ink)' : 'var(--line)',
                            color: done || active ? 'var(--bg)' : 'var(--muted)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, fontWeight: 600,
                          }}>
                            {done ? '✓' : stepIdx + 1}
                          </div>
                          <span className="mono" style={{ fontSize: 9, letterSpacing: '0.06em', color: active ? 'var(--ink)' : 'var(--muted)', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>
                            {s.label}
                          </span>
                        </div>
                        {i < arr.length - 1 && (
                          <div style={{ flex: 1, height: 1, background: done ? 'var(--accent)' : 'var(--line)', margin: '0 4px' }} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ── STEP 1: Fecha y hora ── */}
              {wStep === 'booking' && (
                <div style={{ padding: '16px 20px' }}>
                  {/* Selector servicio */}
                  <div style={{ marginBottom: 14 }}>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>Servicio</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                      {([
                        { id: 'coaching', label: 'Intro gratuita', sub: '15 min · Gratis' },
                        { id: 'mentoria', label: 'Mentoría 1:1', sub: '60 min · USD 180' },
                      ] as { id: Servicio; label: string; sub: string }[]).map(s => (
                        <button key={s.id} onClick={() => setServicio(s.id)} style={{
                          padding: '10px', borderRadius: 8, textAlign: 'left', cursor: 'pointer',
                          border: servicio === s.id ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                          background: servicio === s.id ? 'color-mix(in oklab, var(--accent) 8%, var(--surface))' : 'var(--bg)',
                          transition: 'all 0.15s',
                        }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{s.label}</div>
                          <div className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{s.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calendario mini */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{MESES[mes]} {año}</span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {[prevMes, nextMes].map((fn, i) => (
                          <button key={i} onClick={fn} style={{ width: 24, height: 24, borderRadius: 999, border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                              {i === 0 ? <path d="M7 2L3 5L7 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> : <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, marginBottom: 2 }}>
                      {DIAS_SEMANA_SHORT.map(d => (
                        <div key={d} className="mono" style={{ textAlign: 'center', fontSize: 8, color: 'var(--muted)', padding: '2px 0', letterSpacing: '0.04em' }}>{d}</div>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                      {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                      {Array.from({ length: total }).map((_, i) => {
                        const d = i + 1
                        const disabled = isPasado(d) || esFinde(d)
                        const sel = dia === d
                        return (
                          <button key={d} disabled={disabled} onClick={() => { setDia(d); setHora(null) }} style={{
                            aspectRatio: '1', borderRadius: 6, border: 'none', fontSize: 11,
                            background: sel ? 'var(--accent)' : 'transparent',
                            color: sel ? 'var(--bg)' : disabled ? 'var(--line)' : 'var(--ink)',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            fontWeight: sel ? 600 : 400, padding: 0,
                          }}>{d}</button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Horarios */}
                  {dia && (
                    <div style={{ marginBottom: 14 }}>
                      <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                        Horarios (GMT-3)
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
                        {HORARIOS.map(h => (
                          <button key={h} onClick={() => setHora(h)} style={{
                            padding: '7px 4px', borderRadius: 8, fontSize: 12,
                            border: hora === h ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                            background: hora === h ? 'color-mix(in oklab, var(--accent) 8%, var(--surface))' : 'var(--bg)',
                            color: hora === h ? 'var(--accent)' : 'var(--ink)',
                            cursor: 'pointer', fontWeight: hora === h ? 600 : 400,
                          }}>{h}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    disabled={!canBook}
                    onClick={() => setWStep('datos')}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                      background: canBook ? 'var(--ink)' : 'var(--line)',
                      color: canBook ? 'var(--bg)' : 'var(--muted)',
                      border: 'none', cursor: canBook ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                    }}
                  >
                    Continuar →
                  </button>
                  {!canBook && (
                    <p className="mono" style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center', marginTop: 8 }}>
                      Seleccioná fecha y hora para continuar
                    </p>
                  )}
                </div>
              )}

              {/* ── STEP 2: Datos personales ── */}
              {wStep === 'datos' && (
                <div style={{ padding: '16px 20px' }}>
                  {/* Resumen fecha */}
                  <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line)', marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: 'var(--muted)' }}>{dia} {MESES[mes]} · {hora} GMT-3</span>
                      <button onClick={() => setWStep('booking')} style={{ fontSize: 11, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        Cambiar
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                    <div>
                      <label className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 5 }}>
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={e => setForm(p => ({ ...p, nombre: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 5 }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="tu@correo.com"
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 5 }}>
                        ¿Qué querés trabajar? <span style={{ opacity: 0.5 }}>(opcional)</span>
                      </label>
                      <textarea
                        placeholder="Contame brevemente tu situación o el desafío que querés resolver..."
                        value={form.contexto}
                        onChange={e => setForm(p => ({ ...p, contexto: e.target.value }))}
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>
                  </div>

                  <button
                    disabled={!canDatos}
                    onClick={() => setWStep(esPago ? 'pago' : 'confirm')}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                      background: canDatos ? 'var(--ink)' : 'var(--line)',
                      color: canDatos ? 'var(--bg)' : 'var(--muted)',
                      border: 'none', cursor: canDatos ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                    }}
                  >
                    {esPago ? 'Continuar al pago →' : 'Confirmar sesión gratuita →'}
                  </button>
                  <button onClick={() => setWStep('booking')} style={{ width: '100%', marginTop: 8, padding: '10px', borderRadius: 10, fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    ← Volver
                  </button>
                </div>
              )}

              {/* ── STEP 3: Pago ── */}
              {wStep === 'pago' && (
                <div>
                  <div style={{ padding: '12px 20px 0' }}>
                    {/* Resumen */}
                    <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line)', marginBottom: 14 }}>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>{form.nombre} · {form.email}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{dia} {MESES[mes]} · {hora} GMT-3</div>
                    </div>

                    {/* Selector de método */}
                    <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                      Método de pago
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                      {payMethods.map(m => (
                        <button key={m.id} onClick={() => setPayMethod(m.id)} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '9px 12px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                          border: payMethod === m.id ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                          background: payMethod === m.id ? 'color-mix(in oklab, var(--accent) 6%, var(--surface))' : 'var(--bg)',
                          transition: 'all 0.15s',
                        }}>
                          <div style={{ width: 8, height: 8, borderRadius: 999, background: m.color, flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--ink)' }}>{m.label}</div>
                            <div className="mono" style={{ fontSize: 9, color: 'var(--muted)' }}>{m.sub}</div>
                          </div>
                          <div style={{ width: 14, height: 14, borderRadius: 999, flexShrink: 0, border: payMethod === m.id ? '4px solid var(--accent)' : '1.5px solid var(--line)', transition: 'all 0.15s' }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Footer pago */}
                  <div style={{ background: 'var(--bg-2)', padding: '14px 20px', borderTop: '1px solid var(--line)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</span>
                      <span className="serif" style={{ fontSize: 22 }}>USD 180</span>
                    </div>
                    <button
                      disabled={!payMethod || paying}
                      onClick={() => {
                        if (!payMethod) return
                        setPaying(true)
                        setTimeout(() => { setPaying(false); setWStep('confirm') }, 1800)
                      }}
                      style={{
                        width: '100%', padding: '12px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                        background: payMethod && !paying ? 'var(--ink)' : 'var(--line)',
                        color: payMethod && !paying ? 'var(--bg)' : 'var(--muted)',
                        border: 'none', cursor: payMethod && !paying ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      }}
                    >
                      {paying ? (
                        <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" /><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> Procesando...</>
                      ) : 'Reservar y pagar →'}
                    </button>
                    <button onClick={() => setWStep('datos')} style={{ width: '100%', marginTop: 6, padding: '8px', fontSize: 12, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      ← Volver
                    </button>
                  </div>
                </div>
              )}

              {/* ── CONFIRM ── */}
              {wStep === 'confirm' && (
                <div style={{ padding: '32px 20px', textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 999, background: 'color-mix(in oklab, var(--accent) 12%, var(--bg))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 22 }}>✓</div>
                  <h3 className="serif" style={{ fontSize: 24, lineHeight: 1.1, marginBottom: 10 }}>
                    ¡Reserva <em style={{ color: 'var(--accent)' }}>confirmada!</em>
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 20, lineHeight: 1.6 }}>
                    Te enviamos los detalles a <strong>{form.email}</strong>.
                  </p>
                  {[
                    ['Nombre', form.nombre],
                    ['Servicio', servicio === 'coaching' ? 'Intro gratuita' : 'Mentoría 1:1'],
                    ['Fecha', `${dia} ${MESES[mes]} · ${hora} GMT-3`],
                    ['Precio', precio],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--line)', gap: 8 }}>
                      <span className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{k}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}