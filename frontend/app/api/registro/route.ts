import { NextRequest, NextResponse } from 'next/server'

// Mapeo de los valores internos del form a los valores exactos de Salesforce
const TIPO_MAP: Record<string, string> = {
  asistencia:  'Asistente',
  ponente:     'Ponente',
  colaboracion: 'Colaborador',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validación básica en backend (segunda línea de defensa)
    if (!body.email || !body.nombre || !body.aceptaPrivacidad) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    // Separar nombre y apellidos (el form los tiene en un solo campo)
    // Ejemplo: "María García López" → primerNombre="María", apellido="García López"
    const nombreCompleto = body.nombre.trim()
    const espacioIdx = nombreCompleto.indexOf(' ')
    const primerNombre = espacioIdx > -1 ? nombreCompleto.substring(0, espacioIdx) : nombreCompleto
    const apellido     = espacioIdx > -1 ? nombreCompleto.substring(espacioIdx + 1) : ''

    // Construir el teléfono completo
    const telefonoCompleto = `+${body.codigoPais || 'CO'} ${body.telefono || ''}`.trim()

    // Construir la descripción con toda la info extra que no tiene campo custom
    const descripcion = [
      `Tipo org: ${body.tipoOrg || '-'}${body.tipoOrg === 'Otra organización' ? ` (${body.tipoOrgEspecifica})` : ''}`,
      `Puesto: ${body.puesto || '-'}`,
      `País: ${body.ubicacionPaisCode || '-'}`,
      `Ciudad: ${body.ubicacionCiudad || '-'}`,
      `Quiere stand: ${body.quiereStand ? 'Sí' : 'No'}`,
      body.tipoSolicitud === 'ponente' && body.tituloPonencia
        ? `Ponencia: ${body.tituloPonencia} | Área: ${body.areaTematica}` : null,
      body.tipoSolicitud === 'ponente' && body.resumenPonencia
        ? `Resumen: ${body.resumenPonencia}` : null,
      body.tipoSolicitud === 'colaboracion' && body.tipoColaboracion
        ? `Colaboración: ${body.tipoColaboracion}` : null,
      body.tipoSolicitud === 'colaboracion' && body.descripcionColaboracion
        ? `Propuesta: ${body.descripcionColaboracion}` : null,
      body.mensaje ? `Mensaje: ${body.mensaje}` : null,
      `Acepta comunicaciones: ${body.aceptaComunicaciones ? 'Sí' : 'No'}`,
    ].filter(Boolean).join('\n')

    // Construir el FormData para Web-to-Case
    const sfData = new URLSearchParams()

    // ── Campos fijos ─────────────────────────────────────────────────────
    sfData.append('orgid',   '00D7Q0000092UMO')
    sfData.append('retURL',  'https://congreso.somosawaq.org/')

    // Descomenta estas dos líneas para hacer pruebas y ver qué llega a Salesforce:
    sfData.append('debug',      '1')
    sfData.append('debugEmail', 'tu_email@tec.mx')

    // ── Campos estándar ──────────────────────────────────────────────────
    sfData.append('name',        nombreCompleto)
    sfData.append('email',       body.email)
    sfData.append('phone',       telefonoCompleto)
    sfData.append('company',     body.nombreOrg || '')
    sfData.append('subject',     `Registro 3ICEO — ${TIPO_MAP[body.tipoSolicitud] || body.tipoSolicitud} — ${body.nombreOrg || nombreCompleto}`)
    sfData.append('description', descripcion)

    // ── Campos custom con los IDs reales de Salesforce ───────────────────
    sfData.append('00NP500000QQ1eD', primerNombre)           // Primer Nombre
    sfData.append('00NP500000QQ1kf', apellido)               // Apellido
    sfData.append('00NP500000QQ0gX', TIPO_MAP[body.tipoSolicitud] || '') // Tipo Registro
    sfData.append('00NP500000QPumQ', body.nombreOrg || '')   // Nombre Organización
    sfData.append('00NP500000QQ1sj', body.aceptaPrivacidad ? '1' : '')  // Consentimiento

    // ── Enviar a Salesforce ──────────────────────────────────────────────
    const sfResponse = await fetch(
  'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00D7Q0000092UMO',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: sfData.toString(),
      }
    )

    // Web-to-Case siempre devuelve 200 o 302, nunca un error útil.
    // Si no lanzó excepción, asumimos que llegó.
    console.log('Salesforce status:', sfResponse.status)

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error('Error en /api/registro:', error)
    return NextResponse.json(
      { error: 'No se pudo enviar tu solicitud. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}