import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    // Enviar email a Lucas via mailto no funciona server-side.
    // Usamos fetch a un servicio de email simple (Resend o similar).
    // Por ahora usamos el servicio gratuito de Formspree o similar.
    const res = await fetch('https://formspree.io/f/xqeowwjz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        email,
        message: `Nueva suscripción al newsletter de lucaspatano.com: ${email}`,
        _replyto: email,
      }),
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Error enviando' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
