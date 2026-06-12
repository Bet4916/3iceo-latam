import { NextResponse } from 'next/server'
import { sfQuery } from '@/lib/salesforce'

export const revalidate = 604800

function detectSocialType(url: string): 'linkedin' | 'instagram' {
  if (!url) return 'linkedin'
  if (url.includes('instagram.com')) return 'instagram'
  return 'linkedin'
}

export async function GET() {
  try {
    const data = await sfQuery(`
  SELECT
    Id,
    Name,
    organizacion__c,
    rol__c,
    pais__c,
    link_social__c,
    url_foto__c
  FROM Ponente__c
  ORDER BY Name ASC
`, 604800)

    const ponentes = data.records.map((r: Record<string, unknown>) => ({
      id:         r.Id,
      nombre:     r.Name,
      org:        r.organizacion__c,
      rol:        r.rol__c,
      pais:       (r.pais__c as string)?.toLowerCase() || 'es',
      foto:       r.url_foto__c    || '/icons/default-avatar.svg',
      social:     r.link_social__c || '#',
      socialType: detectSocialType(r.link_social__c as string),
    }))

    return NextResponse.json(
      { ponentes, updatedAt: new Date().toISOString() },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=604800, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching ponentes:', error)
    return NextResponse.json(
      { ponentes: [], error: 'SF unavailable', updatedAt: null },
      { status: 200 }
    )
  }
}