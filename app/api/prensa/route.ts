import { NextRequest, NextResponse } from 'next/server'

// ── Mapas de picklists exactos de Salesforce ──────────────────────────────────

// Valores exactos del API Name en SF (algunos sin tilde a propósito)
const TIPO_COLABORACION_MAP: Record<string, string> = {
  'Cobertura Periodística':        'Cobertura Periodística',
  'Entrevistas':                   'Entrevistas',
  'Difusión previa del congreso':  'Difusion previa del congreso',  // SF no tiene tilde
  'Alianza de medios':             'Alianza de medios',
  'Creación de contenido':         'Creación de contenido',
  'Otros':                         'Otros',
}

const TIPO_MEDIO_MAP: Record<string, string> = {
  'Periódico / Diario':            'Periódico / Diario',
  'Revista':                       'Revista',
  'Portal web / Medio digital':    'Portal web / Medio digital',
  'Radio':                         'Radio',
  'Televisión':                    'Televisión',
  'Podcast':                       'Podcast',
  'Agencia de noticias':           'Agencia de noticias',
  'Blog / Medio independiente':    'Blog / Medio independiente',
  'Redes sociales / Influencer':   'Redes sociales / Influencer',
  'Otro':                          'Otro',
}

const DIAS_COBERTURA_MAP: Record<string, string> = {
  'Día 1 (fecha)':    'Día 1 (fecha)',
  'Día 2 (fecha)':    'Día 2 (fecha)',
  'Día 3 (fecha)':    'Día 3 (fecha)',
  'Todos los días':   'Todos los días',
  'Solo inauguración': 'Solo inauguración',
  'Solo clausura':    'Solo clausura',
  'Por definir':      'Por definir',
}

function getPhoneCode(isoCode: string): string {
  const codes: Record<string, string> = {
    MX: '52', ES: '34', CO: '57', AR: '54', PE: '51', CL: '56',
    VE: '58', EC: '593', BO: '591', PY: '595', UY: '598',
    CR: '506', PA: '507', GT: '502', HN: '504', SV: '503',
    NI: '505', DO: '1',  CU: '53', US: '1',  BR: '55',
    FR: '33', DE: '49', IT: '39', GB: '44', PT: '351',
    NL: '31', BE: '32', AT: '43', SE: '46', NO: '47',
    AL: '355', AU: '61', CN: '86', KR: '82', AE: '971',
    PH: '63', IN: '91', IL: '972', JP: '81', MA: '212',
    NG: '234', NZ: '64', RU: '7',  SG: '65', ZA: '27',
    TH: '66', TR: '90', VN: '84', CH: '41',
  }
  return codes[isoCode] ?? '34'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('Prensa body recibido:', JSON.stringify(body, null, 2))

    // ── Validación mínima ──────────────────────────────────────────────────────
    if (!body.email || !body.nombre || !body.aceptaPrivacidad) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    // ── Nombre ─────────────────────────────────────────────────────────────────
    const nombreCompleto  = body.nombre.trim()
    const espacioIdx      = nombreCompleto.indexOf(' ')
    const primerNombre    = espacioIdx > -1 ? nombreCompleto.substring(0, espacioIdx) : nombreCompleto
    const apellido        = espacioIdx > -1 ? nombreCompleto.substring(espacioIdx + 1) : 'NN'
    const nameParaTrigger = espacioIdx > -1 ? nombreCompleto : `${nombreCompleto} NN`

    // ── Teléfono ───────────────────────────────────────────────────────────────
    const phoneCode    = body.codigoPais ? `+${getPhoneCode(body.codigoPais)}` : '+34'
    const telefonoFull = `${phoneCode} ${body.telefono || ''}`.trim()

    // ── Picklists SF ───────────────────────────────────────────────────────────
    const tipoColaboracionSF = TIPO_COLABORACION_MAP[body.tipoColaboracion] || body.tipoColaboracion || ''
    const tipoMedioSF        = TIPO_MEDIO_MAP[body.tipoMedio]               || body.tipoMedio        || ''
    const diasCoberturaSF    = DIAS_COBERTURA_MAP[body.diasCobertura]       || body.diasCobertura     || ''

    // ── Descripción ────────────────────────────────────────────────────────────
    const descripcion = [
      `Tipo de colaboración: ${tipoColaboracionSF}`,
      `Tipo de medio: ${tipoMedioSF}`,
      `Días de cobertura: ${diasCoberturaSF}`,
      body.sitioweb              ? `Sitio web: ${body.sitioweb}`                          : null,
      body.temasInteres          ? `Temas de interés: ${body.temasInteres}`               : null,
      body.comentariosAdicionales ? `Comentarios: ${body.comentariosAdicionales}`         : null,
    ].filter(Boolean).join('\n')

    // ── Payload Web-to-Case ────────────────────────────────────────────────────
    const sfData = new URLSearchParams()

    // Campos fijos
    sfData.append('orgid',      '00D7Q0000092UMO')
    sfData.append('retURL',     'https://congreso.somosawaq.org/')
    sfData.append('debug',      '1')
    sfData.append('debugEmail', 'bet4916@gmail.com')
    sfData.append('recordType', '0127Q000000AkEQQA0')

    // Campos estándar Web-to-Case
    sfData.append('name',    nameParaTrigger)
    sfData.append('email',   body.email)
    sfData.append('phone',   telefonoFull)
    sfData.append('company', body.nombreMedio || nombreCompleto)
    sfData.append('subject', `Acreditación de Prensa - 3ICEO 2027`)

    // Campos custom — identidad
    sfData.append('First_Name__c',        primerNombre)
    sfData.append('Last_Name__c',         apellido)
    sfData.append('Phone__c',             telefonoFull)
    sfData.append('Organization_Name__c', body.nombreMedio          || nombreCompleto)
    sfData.append('Country__c',           body.ubicacionPaisNombre  || '')
    sfData.append('City__c',              body.ciudad               || body.ubicacionPaisNombre || 'N/A')
    sfData.append('Country_Code__c',      phoneCode)
    sfData.append('Registration_Type__c', 'Prensa')
    sfData.append('Role__c',              body.cargoRol || '')

    // Campos custom — prensa
    sfData.append('Tipo_de_Formulario__c',           'Prensa y Medios - 3ICEO 2027')
    sfData.append('Nombre_del_medio_organizacion__c', body.nombreMedio       || '')
    sfData.append('Tipo_colaboracion__c',             tipoColaboracionSF)
    sfData.append('Tipo_medio__c',                    tipoMedioSF)
    sfData.append('Dias_cobertura__c',                diasCoberturaSF)

    // Consentimientos
    sfData.append('Privacy_Consent__c',   body.aceptaPrivacidad     ? 'true' : 'false')
    sfData.append('Marketing_consent__c', body.aceptaComunicaciones ? 'true' : 'false')

    // Descripción
    sfData.append('description', descripcion)

    console.log('Payload SF Prensa:', Object.fromEntries(sfData))

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
    console.error('Error en /api/prensa:', error)
    return NextResponse.json(
      { error: 'No se pudo enviar tu solicitud. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}