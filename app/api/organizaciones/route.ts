import { NextResponse } from 'next/server'
import { sfQuery } from '@/lib/salesforce'

export const revalidate = 300

export async function GET() {
  try {
    const data = await sfQuery(`
      SELECT Id, Name, url_pagina__c, categoria__c
      FROM MarketplaceOrg__c
      ORDER BY Name ASC
    `, 300)

    // Unity espera un array directo, no { orgs: [...] }
    const orgs = data.records.map((r: Record<string, unknown>) => ({
      nombre:    r.Name,
      url:       r.url_pagina__c || '#',
      categoria: (r.categoria__c as string)?.toLowerCase() || 'otra',
    }))

  return NextResponse.json({ orgs: orgs }, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, s-maxage=300',
  }
})
  } catch (error) {
    console.error('Error fetching organizaciones:', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
}