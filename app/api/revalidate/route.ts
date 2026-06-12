import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    )
  }

  const body  = await request.json()
  const paths = body.paths || [
    '/marketing/agenda',
    '/marketing/aliados',
    '/marketing/comunicaciones',
    '/marketing/marketplace',
  ]

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    revalidated: paths,
    at: new Date().toISOString(),
  })
}