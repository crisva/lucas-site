'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Usuario o contraseña incorrectos.')
      setLoading(false)
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    border: '1px solid var(--line)', borderRadius: 8,
    background: 'var(--surface)', color: 'var(--ink)',
    fontSize: 15, outline: 'none', fontFamily: 'inherit',
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 999,
            background: 'var(--ink)', color: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Instrument Serif, serif', fontSize: 22,
            margin: '0 auto 12px',
          }}>LP</div>
          <div style={{ fontSize: 15, fontWeight: 500 }}>Lucas Patanó</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>Panel de administración</div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
              Usuario
            </label>
            <input
              type="text"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              placeholder="admin"
              required
              style={inp}
            />
          </div>
          <div>
            <label className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
              placeholder="••••••••"
              required
              style={inp}
            />
          </div>

          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'color-mix(in oklab, red 10%, var(--bg))', border: '1px solid color-mix(in oklab, red 30%, var(--line))', fontSize: 13, color: 'red' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px', borderRadius: 999, fontSize: 15, fontWeight: 600,
              background: loading ? 'var(--line)' : 'var(--ink)',
              color: loading ? 'var(--muted)' : 'var(--bg)',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 4,
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar →'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/" style={{ fontSize: 13, color: 'var(--muted)' }}>← Volver al sitio</a>
        </div>
      </div>
    </div>
  )
}
