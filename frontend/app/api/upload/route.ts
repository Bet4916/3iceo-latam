import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const R2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file     = formData.get('file') as File
    const folder   = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json(
        { error: 'No se envió ningún archivo' },
        { status: 400 }
      )
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { error: 'Solo JPG, PNG, WebP o SVG' },
        { status: 400 }
      )
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Máximo 5MB' },
        { status: 400 }
      )
    }

    const ext      = file.name.split('.').pop()
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const buffer   = Buffer.from(await file.arrayBuffer())

    await R2.send(new PutObjectCommand({
      Bucket:      process.env.R2_BUCKET_NAME!,
      Key:         filename,
      Body:        buffer,
      ContentType: file.type,
    }))

    const url = `${process.env.R2_PUBLIC_URL}/${filename}`
    return NextResponse.json({ url, filename })

  } catch (error) {
    console.error('Error uploading:', error)
    return NextResponse.json(
      { error: 'Error al subir el archivo' },
      { status: 500 }
    )
  }
}