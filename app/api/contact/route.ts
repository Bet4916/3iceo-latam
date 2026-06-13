// app/api/contact/route.ts
// Ruta: POST /api/contact
// Recibe { email, mensaje } del footer y reenvía a info@somosawaq.org
// Usa el mismo patrón que /api/registro (Salesforce Web-to-Case)
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, mensaje } = body

    // Validación básica en servidor
    if (!email?.trim() || !mensaje?.trim()) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
    }

    // ── Envío a Salesforce Web-to-Case (mismo orgId que registro) ──
    const sfData = new URLSearchParams()
    sfData.append('orgid',      '00D7Q0000092UMO')
    sfData.append('retURL',     'https://congreso.somosawaq.org/')
    sfData.append('recordType', '0127Q000000AkEQQA0')
    sfData.append('name',       `Contacto Footer ${email}`)
    sfData.append('email',      email)
    sfData.append('subject',    `[Footer] Mensaje de ${email}`)
    sfData.append('description', mensaje)
    sfData.append('company',    'Contacto Web Footer')

    const sfResponse = await fetch(
      'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00D7Q0000092UMO',
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    sfData.toString(),
      }
    )

    console.log('Footer contact SF status:', sfResponse.status)

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error('Error en /api/contact:', error)
    return NextResponse.json(
      { error: 'No se pudo enviar el mensaje. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}
