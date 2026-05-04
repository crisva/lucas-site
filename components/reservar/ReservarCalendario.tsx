'use client'

import { useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'

type Servicio = 'coaching' | 'mentoria'
type Step = 'calendar' | 'form' | 'payment' | 'confirm'
type PayMethod = 'mercadopago' | 'paypal' | 'card' | 'transfer'

const HORARIOS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DIAS_SEMANA = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

function getDiasDelMes(year: number, month: number) {
  const primero = new Date(year, month, 1).getDay()
  const offset = primero === 0 ? 6 : primero - 1
  const total = new Date(year, month + 1, 0).getDate()
  return { offset, total }
}

const payMethods: { id: PayMethod; label: string; sub: string; logo: string }[] = [
  {
    id: 'mercadopago',
    label: 'Mercado Pago',
    sub: 'Tarjeta, débito o saldo MP',
    logo: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <rect width="48" height="48" rx="10" fill="#009EE3"/>
      <path d="M8 24C8 15.163 15.163 8 24 8C32.837 8 40 15.163 40 24C40 32.837 32.837 40 24 40C15.163 40 8 32.837 8 24Z" fill="#009EE3"/>
      <path d="M14 24.5C14 19.253 18.253 15 23.5 15C26.114 15 28.484 16.054 30.2 17.77L34 14C31.284 11.527 27.568 10 23.5 10C15.492 10 9 16.492 9 24.5C9 32.508 15.492 39 23.5 39C27.568 39 31.284 37.473 34 35L30.2 31.23C28.484 32.946 26.114 34 23.5 34C18.253 34 14 29.747 14 24.5Z" fill="white"/>
      <path d="M38 24.5C38 27.042 37.187 29.396 35.8 31.3L39.6 35.1C41.724 32.434 43 29.116 43 25.5C43 21.884 41.724 18.566 39.6 15.9L35.8 19.7C37.187 21.604 38 23.958 38 26.5" fill="white" opacity="0.5"/>
    </svg>`,
  },
  {
    id: 'paypal',
    label: 'PayPal',
    sub: 'Cuenta PayPal o tarjeta',
    logo: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <rect width="48" height="48" rx="10" fill="#003087"/>
      <path d="M32.5 14H20.5C19.4 14 18.5 14.8 18.3 15.9L14 36H20L21 31H27C31.4 31 35 27.6 35 23.2C35 18.2 34.1 14 32.5 14Z" fill="#009CDE"/>
      <path d="M20 36L24.3 15.9C24.5 14.8 25.4 14 26.5 14H32.5C34.1 14 35 18.2 35 23.2C35 27.6 31.4 31 27 31H21L20 36Z" fill="#012169"/>
    </svg>`,
  },
  {
    id: 'card',
    label: 'Tarjeta de crédito o débito',
    sub: 'Visa · Mastercard · Amex',
    logo: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <rect width="48" height="48" rx="10" fill="#1A1F36"/>
      <rect x="8" y="14" width="32" height="20" rx="3" stroke="white" stroke-width="1.5"/>
      <rect x="8" y="20" width="32" height="5" fill="white" opacity="0.15"/>
      <rect x="12" y="27" width="8" height="3" rx="1" fill="white" opacity="0.6"/>
      <rect x="22" y="27" width="5" height="3" rx="1" fill="white" opacity="0.4"/>
    </svg>`,
  },
  {
    id: 'transfer',
    label: 'Transferencia bancaria',
    sub: 'Te enviamos los datos por email',
    logo: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <rect width="48" height="48" rx="10" fill="#F0F0F0"/>
      <path d="M10 30L24 14L38 30" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="16" y="30" width="6" height="8" rx="1" fill="#333" opacity="0.5"/>
      <rect x="26" y="30" width="6" height="8" rx="1" fill="#333" opacity="0.5"/>
      <rect x="10" y="30" width="28" height="2" fill="#333"/>
    </svg>`,
  },
]

export default function ReservarCalendario() {
  const { isMobile } = useBreakpoint()

  const hoy = new Date()
  const [mes, setMes] = useState(hoy.getMonth())
  const [año, setAño] = useState(hoy.getFullYear())
  const [dia, setDia] = useState<number | null>(null)
  const [hora, setHora] = useState<string | null>(null)
  const [servicio, setServicio] = useState<Servicio>('coaching')
  const [step, setStep] = useState<Step>('calendar')
  const [form, setForm] = useState({ nombre: '', email: '', contexto: '' })
  const [payMethod, setPayMethod] = useState<PayMethod | null>(null)
  const [paying, setPaying] = useState(false)

  const { offset, total } = getDiasDelMes(año, mes)
  const esPago = servicio === 'mentoria'

  const prevMes = () => {
    if (mes === 0) { setMes(11); setAño(a => a - 1) } else setMes(m => m - 1)
    setDia(null); setHora(null)
  }
  const nextMes = () => {
    if (mes === 11) { setMes(0); setAño(a => a + 1) } else setMes(m => m + 1)
    setDia(null); setHora(null)
  }
  const isPasado = (d: number) => {
    const f = new Date(año, mes, d); f.setHours(0, 0, 0, 0)
    const h = new Date(); h.setHours(0, 0, 0, 0)
    return f < h
  }
  const esFinde = (d: number) => { const dow = new Date(año, mes, d).getDay(); return dow === 0 || dow === 6 }

  const canProceed = dia !== null && hora !== null
  const servicioLabel = servicio === 'coaching' ? 'Sesión introductoria — Product Coaching' : 'Mentoría 1:1'
  const precioLabel = servicio === 'coaching' ? 'Gratuita' : 'USD 180'

  const resumen = [
    ['Servicio', servicioLabel],
    ['Fecha', dia ? `${dia} de ${MESES[mes]} ${año}` : '—'],
    ['Hora', hora ? `${hora} (GMT-3)` : '—'],
    ['Precio', precioLabel],
  ]

  const ResumenCard = () => (
    <div style={{ padding: 20, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', position: isMobile ? 'static' : 'sticky', top: 100 }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Tu selección</div>
      {resumen.map(([k, v]) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', gap: 12 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>{k}</span>
          <span style={{ fontSize: 13, fontWeight: 500, textAlign: 'right', color: v === '—' ? 'var(--muted)' : 'var(--ink)' }}>{v}</span>
        </div>
      ))}
    </div>
  )

  // ── CONFIRM ──
  if (step === 'confirm') return (
    <section id="calendario" style={{ padding: isMobile ? '56px 0' : '96px 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, background: 'color-mix(in oklab, var(--accent) 12%, var(--bg))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>✓</div>
        <h2 className="serif" style={{ fontSize: isMobile ? 32 : 44, lineHeight: 1, marginBottom: 16 }}>
          ¡Reserva <em style={{ color: 'var(--accent)' }}>confirmada!</em>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--ink-2)', marginBottom: 32, lineHeight: 1.6 }}>
          Te enviamos un email de confirmación a <strong>{form.email}</strong> con el link de la videollamada y todos los detalles.
        </p>
        <div style={{ padding: 24, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', marginBottom: 32, textAlign: 'left' }}>
          {resumen.map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', gap: 16 }}>
              <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{k}</span>
              <span style={{ fontSize: 14, fontWeight: 500, textAlign: 'right' }}>{v}</span>
            </div>
          ))}
        </div>
        <a href="/" style={{ fontSize: 14, padding: '12px 24px', borderRadius: 999, border: '1px solid var(--line)', color: 'var(--ink-2)' }}>Volver al inicio</a>
      </div>
    </section>
  )

  // ── PAYMENT ──
  if (step === 'payment') return (
    <section id="calendario" style={{ padding: isMobile ? '56px 0' : '96px 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 16 }}>— Paso 3 · Pago</div>
        <h2 className="serif" style={{ fontSize: isMobile ? 32 : 44, lineHeight: 1, marginBottom: 8 }}>Elegí cómo <em style={{ color: 'var(--accent)' }}>pagar.</em></h2>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 40 }}>Seleccioná tu método de pago preferido para confirmar la reserva.</p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? 32 : 56, alignItems: 'start' }}>
          <div>
            {/* Métodos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {payMethods.map(m => (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 20px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                    border: payMethod === m.id ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                    background: payMethod === m.id ? 'color-mix(in oklab, var(--accent) 6%, var(--surface))' : 'var(--surface)',
                    transition: 'all 0.15s',
                  }}
                >
                  {/* Logo */}
                  <div
                    style={{ width: 48, height: 48, borderRadius: 8, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    dangerouslySetInnerHTML={{ __html: m.logo }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)', marginBottom: 3 }}>{m.label}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>{m.sub}</div>
                  </div>
                  {/* Radio */}
                  <div style={{
                    width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                    border: payMethod === m.id ? '5px solid var(--accent)' : '1.5px solid var(--line)',
                    transition: 'all 0.15s',
                  }} />
                </button>
              ))}
            </div>

            {/* Info por método */}
            {payMethod === 'transfer' && (
              <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line)', marginBottom: 20 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Datos para transferencia</div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.8 }}>
                  Al confirmar, te enviamos los datos bancarios por email.<br />
                  La sesión se agenda una vez confirmado el pago.
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                disabled={!payMethod || paying}
                onClick={() => {
                  if (!payMethod) return
                  setPaying(true)
                  // Simular redirección/procesamiento
                  setTimeout(() => { setPaying(false); setStep('confirm') }, 1800)
                }}
                style={{
                  background: payMethod && !paying ? 'var(--ink)' : 'var(--line)',
                  color: payMethod && !paying ? 'var(--bg)' : 'var(--muted)',
                  padding: '14px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500,
                  cursor: payMethod && !paying ? 'pointer' : 'not-allowed',
                  border: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
                  transition: 'all 0.2s',
                }}
              >
                {paying ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  `Pagar USD 180 →`
                )}
              </button>
              <button onClick={() => setStep('form')} style={{ padding: '14px 20px', borderRadius: 999, fontSize: 14, border: '1px solid var(--line)', cursor: 'pointer' }}>
                ← Volver
              </button>
            </div>

            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 16, letterSpacing: '0.06em' }}>
              🔒 Pago seguro · Tus datos están protegidos
            </div>
          </div>

          <ResumenCard />
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </section>
  )

  // ── FORM ──
  if (step === 'form') return (
    <section id="calendario" style={{ padding: isMobile ? '56px 0' : '96px 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 16 }}>— Paso 2 · Tus datos</div>
        <h2 className="serif" style={{ fontSize: isMobile ? 32 : 44, lineHeight: 1, marginBottom: 8 }}>Casi listo.</h2>
        <p style={{ fontSize: 15, color: 'var(--ink-2)', marginBottom: 40 }}>Completá tus datos para continuar.</p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? 32 : 56, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { id: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'tu@correo.com' },
            ].map(f => (
              <div key={f.id}>
                <label className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>{f.label}</label>
                <input
                  type={f.type} placeholder={f.placeholder}
                  value={form[f.id as 'nombre' | 'email']}
                  onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                  style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--line)', borderRadius: 8, background: 'var(--surface)', color: 'var(--ink)', fontSize: 15, outline: 'none' }}
                />
              </div>
            ))}
            <div>
              <label className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>
                ¿Qué querés trabajar? <span style={{ opacity: 0.5 }}>(opcional)</span>
              </label>
              <textarea
                placeholder="Contame brevemente tu situación..."
                value={form.contexto}
                onChange={e => setForm(p => ({ ...p, contexto: e.target.value }))}
                rows={4}
                style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--line)', borderRadius: 8, background: 'var(--surface)', color: 'var(--ink)', fontSize: 15, outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                disabled={!form.nombre || !form.email}
                onClick={() => { if (form.nombre && form.email) setStep(esPago ? 'payment' : 'confirm') }}
                style={{
                  background: form.nombre && form.email ? 'var(--ink)' : 'var(--line)',
                  color: form.nombre && form.email ? 'var(--bg)' : 'var(--muted)',
                  padding: '14px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500,
                  cursor: form.nombre && form.email ? 'pointer' : 'not-allowed', border: 'none',
                }}
              >
                {esPago ? 'Continuar al pago →' : 'Confirmar reserva →'}
              </button>
              <button onClick={() => setStep('calendar')} style={{ padding: '14px 20px', borderRadius: 999, fontSize: 14, border: '1px solid var(--line)', cursor: 'pointer' }}>
                ← Volver
              </button>
            </div>
          </div>
          <ResumenCard />
        </div>
      </div>
    </section>
  )

  // ── CALENDAR ──
  return (
    <section id="calendario" style={{ padding: isMobile ? '56px 0' : '96px 0', borderTop: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className="eyebrow" style={{ marginBottom: 16 }}>— Paso 1 · Elegí fecha y hora</div>
        <h2 className="serif" style={{ fontSize: isMobile ? 32 : 44, lineHeight: 1, marginBottom: 40 }}>
          ¿Cuándo nos <em style={{ color: 'var(--accent)' }}>encontramos?</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 300px', gap: isMobile ? 32 : 28, alignItems: 'start' }}>

          {/* Servicio + Calendario */}
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Servicio</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {([
                { id: 'coaching', label: 'Sesión introductoria gratuita', sub: 'Product Coaching · 15 min · Gratuita' },
                { id: 'mentoria', label: 'Mentoría 1:1', sub: 'Sesión individual · 60 min · USD 180' },
              ] as { id: Servicio; label: string; sub: string }[]).map(s => (
                <button key={s.id} onClick={() => setServicio(s.id)} style={{
                  padding: '14px 16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer',
                  border: servicio === s.id ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                  background: servicio === s.id ? 'color-mix(in oklab, var(--accent) 6%, var(--surface))' : 'var(--surface)',
                  transition: 'all 0.15s',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{s.label}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>{s.sub}</div>
                </button>
              ))}
            </div>

            {/* Calendario */}
            <div style={{ marginTop: 28 }}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>Fecha</div>
              <div style={{ border: '1px solid var(--line)', borderRadius: 12, background: 'var(--surface)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
                  <button onClick={prevMes} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{MESES[mes]} {año}</span>
                  <button onClick={nextMes} style={{ width: 32, height: 32, borderRadius: 999, border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '8px 8px 0' }}>
                  {DIAS_SEMANA.map(d => <div key={d} className="mono" style={{ textAlign: 'center', fontSize: 9, color: 'var(--muted)', padding: '4px 0', letterSpacing: '0.06em' }}>{d}</div>)}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '4px 8px 12px', gap: 2 }}>
                  {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: total }).map((_, i) => {
                    const d = i + 1
                    const disabled = isPasado(d) || esFinde(d)
                    const selected = dia === d
                    return (
                      <button key={d} disabled={disabled} onClick={() => { setDia(d); setHora(null) }} style={{
                        aspectRatio: '1', borderRadius: 999, border: 'none',
                        background: selected ? 'var(--accent)' : 'transparent',
                        color: selected ? 'var(--bg)' : disabled ? 'var(--line)' : 'var(--ink)',
                        fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
                        fontWeight: selected ? 600 : 400, transition: 'all 0.15s', padding: 0,
                      }}>{d}</button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
              {dia ? `Horarios · ${dia} ${MESES[mes]}` : 'Horarios disponibles'}
            </div>
            {!dia ? (
              <div style={{ padding: '32px 0', color: 'var(--muted)', fontSize: 14 }}>Seleccioná una fecha para ver los horarios disponibles.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {HORARIOS.map(h => (
                  <button key={h} onClick={() => setHora(h)} style={{
                    padding: '12px 8px', borderRadius: 8, fontSize: 14,
                    border: hora === h ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                    background: hora === h ? 'color-mix(in oklab, var(--accent) 8%, var(--surface))' : 'var(--surface)',
                    color: hora === h ? 'var(--accent)' : 'var(--ink)',
                    cursor: 'pointer', fontWeight: hora === h ? 500 : 400, transition: 'all 0.15s',
                  }}>{h}</button>
                ))}
              </div>
            )}
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 16, letterSpacing: '0.06em' }}>
              Todos los horarios en GMT-3 · Buenos Aires / Santiago
            </div>
          </div>

          {/* Resumen + CTA */}
          <div style={{ padding: 20, borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface)', position: isMobile ? 'static' : 'sticky', top: 100 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Tu selección</div>
            {[
              ['Servicio', servicioLabel],
              ['Fecha', dia ? `${dia} de ${MESES[mes]} ${año}` : '—'],
              ['Hora', hora ? `${hora} (GMT-3)` : '—'],
              ['Precio', precioLabel],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', gap: 12 }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 500, textAlign: 'right', color: v === '—' ? 'var(--muted)' : 'var(--ink)' }}>{v}</span>
              </div>
            ))}
            <button disabled={!canProceed} onClick={() => setStep('form')} style={{
              width: '100%', marginTop: 20,
              background: canProceed ? 'var(--ink)' : 'var(--line)',
              color: canProceed ? 'var(--bg)' : 'var(--muted)',
              padding: '13px 20px', borderRadius: 999, fontSize: 14, fontWeight: 500,
              cursor: canProceed ? 'pointer' : 'not-allowed', border: 'none', transition: 'all 0.2s',
            }}>
              Continuar →
            </button>
            {!canProceed && (
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center', marginTop: 8, letterSpacing: '0.06em' }}>
                Seleccioná fecha y hora para continuar
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}