import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const image = formData.get('image') as File

  if (!image) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 })
  }

  const apiKey = process.env.STABILITY_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const payload = new FormData()
  payload.append('image', image)
  payload.append('output_format', 'webp')

  try {
    const response = await fetch('https://api.stability.ai/v2beta/stable-image/edit/remove-background', {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'image/*',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const base64Image = Buffer.from(arrayBuffer).toString('base64')
    const processedImageUrl = `data:image/webp;base64,${base64Image}`

    return NextResponse.json({ processedImageUrl })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 })
  }
}
