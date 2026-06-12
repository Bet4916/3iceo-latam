import { NextResponse } from 'next/server'
import { sfQuery } from '@/lib/salesforce'

export const revalidate = 300

export async function GET() {
  try {
    const data = await sfQuery(`
      SELECT
        Id,
        Name,
        url_pagina__c,
        categoria__c
      FROM MarketplaceOrg__c
      ORDER BY Name ASC
    `, 300)

    const orgs = data.records.map((r: Record<string, unknown>) => ({
      id:        r.Id,
      nombre:    r.Name,
      url:       r.url_pagina__c || '#',
      categoria: r.categoria__c  || 'Otra',
    }))

    return NextResponse.json(
      { orgs, updatedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=300, stale-while-revalidate=60',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching marketplace:', error)
    return NextResponse.json(
      { orgs: [], error: 'SF unavailable' },
      { status: 200 }
    )
  }
}