import { NextRequest, NextResponse } from 'next/server'

const TIPO_MAP: Record<string, string> = {
  asistencia:   'Asistente',
  ponente:      'Ponente',
  colaboracion: 'Colaborador',
}

// Valores EXACTOS del picklist de Salesforce (con tildes correctas)
const TIPO_ORG_MAP: Record<string, string> = {
  'Universidad':             'Universidad',
  'Empresa privada':         'Empresa Privada',
  'Administración pública':  'Administración Pública',  // ← con tildes
  'Persona independiente':   'Persona Independiente',
  'Asociación / ONG':        'Organización / ONG',
  'Otra organización':       'Otra Organización',
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('Body recibido:', JSON.stringify(body, null, 2))

    if (!body.email || !body.nombre || !body.aceptaPrivacidad) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }

    const nombreCompleto = body.nombre.trim()
    const espacioIdx     = nombreCompleto.indexOf(' ')
    const primerNombre   = espacioIdx > -1 ? nombreCompleto.substring(0, espacioIdx) : nombreCompleto
    const apellido       = espacioIdx > -1 ? nombreCompleto.substring(espacioIdx + 1) : 'NN'

    // Asegura siempre 2 palabras para el trigger CreateContactFromCase
    const nameParaTrigger = espacioIdx > -1 ? nombreCompleto : `${nombreCompleto} NN`

    const tipoOrgSF = TIPO_ORG_MAP[body.tipoOrg || ''] || body.tipoOrg || ''

    // Código de país telefónico desde el form
    const phoneCode = body.codigoPais 
      ? `+${getPhoneCode(body.codigoPais)}` 
      : ''

    const sfData = new URLSearchParams()

    // ── Campos fijos ──────────────────────────────────────────────
    sfData.append('orgid',      '00D7Q0000092UMO')
    sfData.append('retURL',     'https://congreso.somosawaq.org/')
    sfData.append('debug',      '1')
    sfData.append('debugEmail', 'bet4916@gmail.com')
    sfData.append('recordType', '0127Q000000AkEQQA0')

    // ── Campos estándar Web-to-Case ───────────────────────────────
    sfData.append('name',    nameParaTrigger)   // ← siempre 2 palabras
    sfData.append('email',   body.email)
    sfData.append('phone',   body.telefono  || '')
    sfData.append('company', body.nombreOrg || nombreCompleto)
    sfData.append('subject',
      `ICEO - ${TIPO_MAP[body.tipoSolicitud] || body.tipoSolicitud} - ${body.nombreOrg || nombreCompleto}`
    )

    // ── Campos custom requeridos ──────────────────────────────────
    sfData.append('First_Name__c',        primerNombre)
    sfData.append('Last_Name__c',         apellido)
    sfData.append('Phone__c',             body.telefono            || '')
    sfData.append('Organization_Name__c', body.nombreOrg           || nombreCompleto)
    sfData.append('Country__c',           body.ubicacionPaisNombre || 'España')
    sfData.append('City__c',              body.ubicacionCiudad     || body.ubicacionPaisNombre || 'N/A')  // ← NUEVO Required
    sfData.append('Country_Code__c',      phoneCode                || '+34')                              // ← NUEVO Required
    sfData.append('Registration_Type__c', TIPO_MAP[body.tipoSolicitud] || body.tipoSolicitud || '')
    sfData.append('Role__c',              body.puesto || '')

    // ── Campos custom opcionales ──────────────────────────────────
    sfData.append('Organization_Type__c', tipoOrgSF)
    sfData.append('Privacy_Consent__c',   body.aceptaPrivacidad     ? 'true' : 'false')
    sfData.append('Marketing_consent__c', body.aceptaComunicaciones ? 'true' : 'false')

    // ── Descripción ───────────────────────────────────────────────
    const descripcion = [
      body.tipoSolicitud === 'asistencia' && body.quiereStand
        ? 'Solicita stand en marketplace: Sí' : null,
      body.tipoSolicitud === 'ponente' && body.tituloPonencia
        ? `Ponencia: ${body.tituloPonencia}` : null,
      body.tipoSolicitud === 'ponente' && body.areaTematica
        ? `Área: ${body.areaTematica}` : null,
      body.tipoSolicitud === 'ponente' && body.resumenPonencia
        ? `Resumen: ${body.resumenPonencia}` : null,
      body.tipoSolicitud === 'colaboracion' && body.tipoColaboracion
        ? `Colaboración: ${body.tipoColaboracion}` : null,
      body.tipoSolicitud === 'colaboracion' && body.descripcionColaboracion
        ? `Propuesta: ${body.descripcionColaboracion}` : null,
      body.mensaje
        ? `Mensaje: ${body.mensaje}` : null,
    ].filter(Boolean).join('\n')

    sfData.append('description', descripcion)

    console.log('Payload a Salesforce:', Object.fromEntries(sfData))

    const sfResponse = await fetch(
      'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00D7Q0000092UMO',
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    sfData.toString(),
      }
    )

    const sfText = await sfResponse.text()
    console.log('SF status:', sfResponse.status)
    console.log('SF response:', sfText.substring(0, 500))

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error('Error en /api/registro:', error)
    return NextResponse.json(
      { error: 'No se pudo enviar tu solicitud. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}

// Convierte código ISO a código telefónico
function getPhoneCode(isoCode: string): string {
  const codes: Record<string, string> = {
    MX: '52', ES: '34', CO: '57', AR: '54', PE: '51', CL: '56',
    VE: '58', EC: '593', BO: '591', PY: '595', UY: '598',
    CR: '506', PA: '507', GT: '502', HN: '504', SV: '503',
    NI: '505', DO: '1', CU: '53', US: '1', BR: '55',
    FR: '33', DE: '49', IT: '39', GB: '44', PT: '351',
    NL: '31', BE: '32', AT: '43', SE: '46', NO: '47',
    AL: '355', AU: '61', CN: '86', KR: '82', AE: '971',
    PH: '63', IN: '91', IL: '972', JP: '81', MA: '212',
    NG: '234', NZ: '64', RU: '7', SG: '65', ZA: '27',
    TH: '66', TR: '90', VN: '84', CH: '41',
  }
  return codes[isoCode] ?? '34'
}