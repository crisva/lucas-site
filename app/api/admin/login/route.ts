import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USER = process.env.ADMIN_USER || 'admin'
const ADMIN_PASS = process.env.ADMIN_PASS || 'lucas2026'

export async function POST(req: NextRequest) {
  const { usuario, contrasena } = await req.json()

  if (usuario !== ADMIN_USER || contrasena !== ADMIN_PASS) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 horas
    path: '/',
  })
  return res
}
