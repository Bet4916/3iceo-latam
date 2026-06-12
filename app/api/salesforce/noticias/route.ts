import { NextResponse } from 'next/server'
import { sfQuery } from '@/lib/salesforce'

export const revalidate = 3600

function formatFecha(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getFullYear()).slice(2)}`
}

function defaultEmoji(categoria: string): string {
  const map: Record<string, string> = {
    video:            '🎥',
    streaming:        '📡',
    'notas sociales': '📰',
    anuncio:          '📢',
  }
  return map[categoria] || '📄'
}

function defaultGradient(i: number): string {
  const gradients = [
    'linear-gradient(135deg, #09344e 0%, #437287 100%)',
    'linear-gradient(135deg, #1C495C 0%, #74B4A7 100%)',
    'linear-gradient(135deg, #097589 0%, #AEE5DA 100%)',
    'linear-gradient(135deg, #437287 0%, #09344e 100%)',
  ]
  return gradients[i % gradients.length]
}

export async function GET() {
  try {
    const data = await sfQuery(`
      SELECT
        Id,
        Name,
        extracto__c,
        categoria__c,
        fecha__c,
        imagen_url__c,
        url_redirect__c,
        tipo_redirect__c
      FROM Noticia__c
      ORDER BY fecha__c DESC
      LIMIT 50
    `, 3600)

    const noticias = data.records.map((r: Record<string, unknown>, i: number) => ({
      id:           r.Id,
      titulo:       r.Name,
      extracto:     r.extracto__c     || '',
      categoria:    r.categoria__c    || 'anuncio',
      fecha:        formatFecha(r.fecha__c as string),
      img:          (r.imagen_url__c && r.imagen_url__c !== 'N/A')
                      ? r.imagen_url__c
                      : defaultEmoji(r.categoria__c as string),
      imgBg:        defaultGradient(i),
      slug:         r.Id,
      url_redirect:  r.url_redirect__c  || 'N/A',
      tipo_redirect: r.tipo_redirect__c || 'web',
    }))

    return NextResponse.json(
      { noticias, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600' } }
    )
  } catch (error) {
    console.error('Error fetching noticias:', error)
    return NextResponse.json(
      { noticias: [], error: 'SF unavailable', updatedAt: null },
      { status: 200 }
    )
  }
}