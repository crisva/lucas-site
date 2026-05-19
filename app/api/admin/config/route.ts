import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const DEFAULT_CONFIG = {
  servicios: [
    { id: 'coaching', nombre: 'Sesión introductoria gratuita', descripcion: 'Product Coaching', duracion: 15, precio: 0,   moneda: 'USD', activo: true },
    { id: 'mentoria', nombre: 'Mentoría 1:1',                  descripcion: 'Sesión individual', duracion: 60, precio: 180, moneda: 'USD', activo: true },
  ],
  horariosActivos:   ['09:00', '11:00', '14:00', '16:00', '18:00', '19:00'],
  diasSemanaActivos: [1, 2, 3, 4, 5],
  fechasBloqueadas:  [],
  mensajeAgenda:     'Agenda abierta',
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('booking_config')
      .select('config')
      .eq('id', 'main')
      .single()

    if (error || !data) return NextResponse.json(DEFAULT_CONFIG)
    return NextResponse.json(data.config)
  } catch {
    return NextResponse.json(DEFAULT_CONFIG)
  }
}

export async function POST(req: NextRequest) {
  const session = req.cookies.get('admin_session')?.value
  if (session !== 'authenticated') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { error } = await supabase
      .from('booking_config')
      .upsert({ id: 'main', config: body })

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Error guardando config:', e)
    return NextResponse.json({ error: 'No se pudo guardar' }, { status: 500 })
  }
}
