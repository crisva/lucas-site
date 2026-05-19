import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const CONFIG_PATH = join(process.cwd(), 'data', 'config.json')

export async function GET() {
  try {
    const data = readFileSync(CONFIG_PATH, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch {
    return NextResponse.json({ error: 'No se pudo leer la configuración' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  // Leer cookie directamente del request (compatible con Next.js 16)
  const session = req.cookies.get('admin_session')?.value
  if (session !== 'authenticated') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    writeFileSync(CONFIG_PATH, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Error guardando config:', e)
    return NextResponse.json({ error: 'No se pudo guardar la configuración' }, { status: 500 })
  }
}
