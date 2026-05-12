import { NextRequest, NextResponse } from 'next/server'

// Obtiene token de acceso de Salesforce (OAuth 2.0 Client Credentials)
async function getSalesforceToken(): Promise<string> {
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.SALESFORCE_CLIENT_ID!,
    client_secret: process.env.SALESFORCE_CLIENT_SECRET!,
  })
  const res = await fetch(`${process.env.SALESFORCE_TOKEN_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  const data = await res.json()
  return data.access_token
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validación básica en backend
    if (!body.email || !body.nombre || !body.tipoSolicitud || !body.aceptaPrivacidad) {
      return NextResponse.json({ error: 'Campos obligatorios incompletos' }, { status: 400 })
    }

    const token = await getSalesforceToken()
    const instanceUrl = process.env.SALESFORCE_INSTANCE_URL

    // Crear el Case en Salesforce (Web-to-Case equivalente vía API)
    const casePayload = {
      Subject: `Registro 3ICEO — ${body.tipoSolicitud} — ${body.nombreOrg || body.nombre}`,
      Description: `Tipo: ${body.tipoSolicitud} | Org: ${body.nombreOrg} | País: ${body.pais}`,
      Origin: 'Web',
      Status: 'New',
      // Campos custom del Case (debes crearlos en Salesforce primero):
      Tipo_Solicitud__c: body.tipoSolicitud,
      Email_Solicitante__c: body.email,
      Nombre__c: `${body.nombre} ${body.apellidos}`,
      Nombre_Org__c: body.nombreOrg,
      Tipo_Org__c: body.tipoOrg,
      Pais__c: body.pais,
      Ciudad__c: body.ciudad,
      Quiere_Stand__c: body.quiereStand || false,
    }

    const sfRes = await fetch(`${instanceUrl}/services/data/v59.0/sobjects/Case`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(casePayload),
    })

    if (!sfRes.ok) {
      const err = await sfRes.json()
      console.error('Salesforce error:', err)
      return NextResponse.json({ error: 'Error al guardar en Salesforce' }, { status: 500 })
    }

    const sfData = await sfRes.json()
    return NextResponse.json({ success: true, caseId: sfData.id }, { status: 201 })

  } catch (error) {
    console.error('Error interno:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}