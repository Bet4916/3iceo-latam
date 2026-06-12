import { NextResponse } from 'next/server'
import { sfQuery } from '@/lib/salesforce'

export const revalidate = 604800

export async function GET() {
  try {
    const data = await sfQuery(`
      SELECT
        Id,
        Name,
        descripcion__c,
        logo_url__c,
        url_pagina__c
      FROM Socio__c
      ORDER BY Name ASC
    `, 604800)

    const socios = data.records.map((r: Record<string, unknown>) => ({
      id:       r.Id,
      name:     r.Name,
      desc:     r.descripcion__c || '',
      logo:     r.logo_url__c    || '',
      href:     r.url_pagina__c  || '#',
      accentBg: '#097589',
      isJpg:    false,
    }))

    return NextResponse.json(
      { socios, updatedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=604800, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching socios:', error)
    return NextResponse.json(
      { socios: [], error: 'SF unavailable', updatedAt: null },
      { status: 200 }
    )
  }
}