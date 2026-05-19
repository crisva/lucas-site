'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Servicio = {
  id: string
  nombre: string
  descripcion: string
  duracion: number
  precio: number
  moneda: string
  activo: boolean
}

type Config = {
  servicios: Servicio[]
  horarios: string[]
  horariosActivos: string[]
  diasSemanaActivos: number[]
  fechasBloqueadas: string[]
  mensajeAgenda: string
}

const DURACIONES = [15, 30, 45, 60, 90, 120]
const DIAS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const TODOS_HORARIOS = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00']
const MESES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

type Tab = 'servicios' | 'horarios' | 'fechas' | 'config'

function Badge({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '4px 10px', borderRadius: 999, fontSize: 11, cursor: onClick ? 'pointer' : 'default',
      border: active ? 'none' : '1px solid var(--line)',
      background: active ? 'var(--accent)' : 'var(--bg-2)',
      color: active ? 'var(--bg)' : 'var(--ink-2)',
      fontFamily: 'inherit',
    }}>{children}</button>
  )
}

function Toggle({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!active)} style={{
      width: 44, height: 24, borderRadius: 999, border: 'none', cursor: 'pointer',
      background: active ? 'var(--accent)' : 'var(--line)',
      position: 'relative', transition: 'background 0.2s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: active ? 23 : 3,
        width: 18, height: 18, borderRadius: 999, background: 'white',
        transition: 'left 0.2s',
      }} />
    </button>
  )
}

const inp: React.CSSProperties = {
  padding: '9px 12px', border: '1px solid var(--line)', borderRadius: 8,
  background: 'var(--surface)', color: 'var(--ink)', fontSize: 14,
  outline: 'none', fontFamily: 'inherit', width: '100%',
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('servicios')
  const [config, setConfig] = useState<Config | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [newServicio, setNewServicio] = useState({ nombre: '', descripcion: '', duracion: 60, precio: 0, moneda: 'USD' })
  const [addingServicio, setAddingServicio] = useState(false)
  const [fechaInput, setFechaInput] = useState('')

  useEffect(() => {
    fetch('/api/admin/config').then(r => r.json()).then(setConfig)
  }, [])

  const save = async (cfg: Config) => {
    setSaving(true)
    await fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cfg),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const update = (patch: Partial<Config>) => {
    if (!config) return
    const next = { ...config, ...patch }
    setConfig(next)
    save(next)
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  if (!config) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>Cargando configuración...</div>
    </div>
  )

  const tabs: { id: Tab; label: string }[] = [
    { id: 'servicios', label: 'Servicios' },
    { id: 'horarios',  label: 'Horarios' },
    { id: 'fechas',    label: 'Fechas bloqueadas' },
    { id: 'config',    label: 'General' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Topbar */}
      <div style={{ borderBottom: '1px solid var(--line)', background: 'var(--surface)', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--ink)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Instrument Serif, serif', fontSize: 14 }}>LP</div>
          <div>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Panel Admin</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 8, letterSpacing: '0.08em' }}>lucaspatano.com</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {saved && <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>✓ Guardado</span>}
          {saving && <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>Guardando...</span>}
          <a href="/" target="_blank" style={{ fontSize: 13, color: 'var(--muted)', padding: '6px 12px', border: '1px solid var(--line)', borderRadius: 999 }}>Ver sitio ↗</a>
          <button onClick={logout} style={{ fontSize: 13, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}>Salir</button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 32, borderBottom: '1px solid var(--line)', paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className="mono" style={{
              fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '10px 16px', borderRadius: '8px 8px 0 0',
              border: '1px solid var(--line)',
              borderBottom: tab === t.id ? '1px solid var(--bg)' : '1px solid var(--line)',
              background: tab === t.id ? 'var(--bg)' : 'transparent',
              color: tab === t.id ? 'var(--ink)' : 'var(--muted)',
              cursor: 'pointer', marginBottom: tab === t.id ? -1 : 0,
              fontWeight: tab === t.id ? 500 : 400,
            }}>{t.label}</button>
          ))}
        </div>

        {/* ── TAB: SERVICIOS ── */}
        {tab === 'servicios' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Servicios</h2>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>Gestioná los servicios disponibles para reservar.</p>
              </div>
              <button onClick={() => setAddingServicio(true)} style={{
                padding: '9px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                background: 'var(--ink)', color: 'var(--bg)', border: 'none', cursor: 'pointer',
              }}>+ Nuevo servicio</button>
            </div>

            {/* Formulario nuevo servicio */}
            {addingServicio && (
              <div style={{ padding: 20, borderRadius: 10, border: '1px solid var(--accent)', background: 'color-mix(in oklab, var(--accent) 5%, var(--surface))', marginBottom: 20 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Nuevo servicio</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 5 }}>Nombre</label>
                    <input style={inp} placeholder="Ej: Consultoría estratégica" value={newServicio.nombre} onChange={e => setNewServicio(p => ({ ...p, nombre: e.target.value }))} />
                  </div>
                  <div>
                    <label className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 5 }}>Descripción corta</label>
                    <input style={inp} placeholder="Para equipos y empresas" value={newServicio.descripcion} onChange={e => setNewServicio(p => ({ ...p, descripcion: e.target.value }))} />
                  </div>
                  <div>
                    <label className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 5 }}>Duración</label>
                    <select style={inp} value={newServicio.duracion} onChange={e => setNewServicio(p => ({ ...p, duracion: Number(e.target.value) }))}>
                      {DURACIONES.map(d => <option key={d} value={d}>{d} min</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 5 }}>Precio (USD)</label>
                    <input style={inp} type="number" min={0} placeholder="0 = gratuito" value={newServicio.precio} onChange={e => setNewServicio(p => ({ ...p, precio: Number(e.target.value) }))} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => {
                    if (!newServicio.nombre) return
                    const s: Servicio = { ...newServicio, id: Date.now().toString(), moneda: 'USD', activo: true }
                    update({ servicios: [...config.servicios, s] })
                    setNewServicio({ nombre: '', descripcion: '', duracion: 60, precio: 0, moneda: 'USD' })
                    setAddingServicio(false)
                  }} style={{ padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500, background: 'var(--ink)', color: 'var(--bg)', border: 'none', cursor: 'pointer' }}>
                    Guardar servicio
                  </button>
                  <button onClick={() => setAddingServicio(false)} style={{ padding: '9px 14px', borderRadius: 999, fontSize: 13, color: 'var(--muted)', background: 'none', border: '1px solid var(--line)', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Lista servicios */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {config.servicios.map((s, i) => (
                <div key={s.id} style={{
                  padding: '16px 20px', borderRadius: 10,
                  border: '1px solid var(--line)', background: 'var(--surface)',
                  display: 'flex', alignItems: 'center', gap: 16,
                  opacity: s.activo ? 1 : 0.5,
                }}>
                  <Toggle active={s.activo} onChange={v => {
                    const next = [...config.servicios]
                    next[i] = { ...s, activo: v }
                    update({ servicios: next })
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{s.nombre}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2 }}>{s.descripcion}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                    <Badge>{s.duracion} min</Badge>
                    <Badge active={s.precio === 0}>{s.precio === 0 ? 'Gratis' : `${s.moneda} ${s.precio}`}</Badge>
                  </div>
                  {/* Edición inline precio */}
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input
                      type="number" min={0} value={s.precio}
                      onChange={e => {
                        const next = [...config.servicios]
                        next[i] = { ...s, precio: Number(e.target.value) }
                        setConfig({ ...config, servicios: next })
                      }}
                      onBlur={() => save(config)}
                      style={{ ...inp, width: 80, padding: '6px 8px', fontSize: 13 }}
                    />
                    <select value={s.duracion} onChange={e => {
                      const next = [...config.servicios]
                      next[i] = { ...s, duracion: Number(e.target.value) }
                      update({ servicios: next })
                    }} style={{ ...inp, width: 90, padding: '6px 8px', fontSize: 13 }}>
                      {DURACIONES.map(d => <option key={d} value={d}>{d} min</option>)}
                    </select>
                    <button onClick={() => {
                      if (confirm(`¿Eliminar "${s.nombre}"?`)) {
                        update({ servicios: config.servicios.filter((_, j) => j !== i) })
                      }
                    }} style={{ width: 28, height: 28, borderRadius: 999, border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', color: 'var(--muted)', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: HORARIOS ── */}
        {tab === 'horarios' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Horarios disponibles</h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Activá o desactivá los horarios que aparecen en el calendario de reservas. También podés configurar qué días de la semana están disponibles.</p>

            {/* Días de la semana */}
            <div style={{ marginBottom: 32 }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Días disponibles</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {DIAS.map((d, i) => {
                  const active = config.diasSemanaActivos.includes(i)
                  return (
                    <button key={i} onClick={() => {
                      const next = active
                        ? config.diasSemanaActivos.filter(x => x !== i)
                        : [...config.diasSemanaActivos, i].sort()
                      update({ diasSemanaActivos: next })
                    }} style={{
                      padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                      border: active ? 'none' : '1px solid var(--line)',
                      background: active ? 'var(--accent)' : 'var(--surface)',
                      color: active ? 'var(--bg)' : 'var(--muted)',
                      transition: 'all 0.15s',
                    }}>{d}</button>
                  )
                })}
              </div>
            </div>

            {/* Horarios */}
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Horarios (GMT-3)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {TODOS_HORARIOS.map(h => {
                  const active = config.horariosActivos.includes(h)
                  return (
                    <button key={h} onClick={() => {
                      const next = active
                        ? config.horariosActivos.filter(x => x !== h)
                        : [...config.horariosActivos, h].sort()
                      update({ horariosActivos: next })
                    }} style={{
                      padding: '10px', borderRadius: 8, fontSize: 14, cursor: 'pointer',
                      border: active ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                      background: active ? 'color-mix(in oklab, var(--accent) 10%, var(--surface))' : 'var(--surface)',
                      color: active ? 'var(--accent)' : 'var(--muted)',
                      fontWeight: active ? 600 : 400, transition: 'all 0.15s',
                    }}>{h}</button>
                  )
                })}
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', marginTop: 12 }}>
                {config.horariosActivos.length} horarios activos
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: FECHAS BLOQUEADAS ── */}
        {tab === 'fechas' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Fechas bloqueadas</h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Bloqueá días específicos (feriados, vacaciones, etc.). Esas fechas no aparecerán disponibles en el calendario.</p>

            {/* Agregar fecha */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <input
                type="date"
                value={fechaInput}
                onChange={e => setFechaInput(e.target.value)}
                style={{ ...inp, width: 'auto', flex: 1, maxWidth: 220 }}
              />
              <button
                disabled={!fechaInput || config.fechasBloqueadas.includes(fechaInput)}
                onClick={() => {
                  if (!fechaInput) return
                  update({ fechasBloqueadas: [...config.fechasBloqueadas, fechaInput].sort() })
                  setFechaInput('')
                }}
                style={{
                  padding: '9px 18px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                  background: 'var(--ink)', color: 'var(--bg)', border: 'none',
                  cursor: fechaInput ? 'pointer' : 'not-allowed',
                  opacity: fechaInput ? 1 : 0.5,
                }}
              >
                Bloquear fecha
              </button>
            </div>

            {/* Lista fechas bloqueadas */}
            {config.fechasBloqueadas.length === 0 ? (
              <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
                No hay fechas bloqueadas.
              </div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {config.fechasBloqueadas.map(f => {
                  const d = new Date(f + 'T12:00:00')
                  return (
                    <div key={f} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '8px 14px', borderRadius: 999,
                      border: '1px solid var(--line)', background: 'var(--surface)', fontSize: 13,
                    }}>
                      <span>{d.getDate()} {MESES[d.getMonth()]} {d.getFullYear()}</span>
                      <button onClick={() => update({ fechasBloqueadas: config.fechasBloqueadas.filter(x => x !== f) })}
                        style={{ width: 18, height: 18, borderRadius: 999, border: 'none', background: 'var(--line)', cursor: 'pointer', color: 'var(--muted)', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
                        ×
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: GENERAL ── */}
        {tab === 'config' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Configuración general</h2>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>Ajustes generales del sistema de reservas.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
              <div>
                <label className="mono" style={{ fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 }}>
                  Mensaje de agenda
                </label>
                <input
                  style={inp}
                  value={config.mensajeAgenda}
                  onChange={e => setConfig({ ...config, mensajeAgenda: e.target.value })}
                  onBlur={() => save(config)}
                  placeholder="Agenda abierta"
                />
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>
                  Aparece en el estado del sitio (Ej: &quot;Agenda abierta&quot;, &quot;Sin disponibilidad hasta junio&quot;)
                </div>
              </div>

              <div style={{ padding: '16px 20px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--surface)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Credenciales de acceso</div>
                <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>
                  Para cambiar usuario y contraseña, editá las variables de entorno <code style={{ background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>ADMIN_USER</code> y <code style={{ background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>ADMIN_PASS</code> en tu archivo <code style={{ background: 'var(--bg-2)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>.env.local</code>.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
