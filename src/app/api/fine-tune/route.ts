import { NextResponse } from 'next/server'
import sharp from 'sharp'

async function preprocessImage(image: File): Promise<Buffer> {
  const buffer = await image.arrayBuffer()
  return sharp(buffer).resize(1024, 1024, { fit: 'inside' }).toBuffer()
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get('jobId')

  if (!jobId) {
    return NextResponse.json({ error: 'No job ID provided' }, { status: 400 })
  }

  const apiKey = process.env.STABILITY_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    const response = await fetch(`https://api.stability.ai/v1/fine-tune/${jobId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    return NextResponse.json({
      jobId: result.id,
      status: result.status,
      name: result.name,
      created_at: result.created_at,
      updated_at: result.updated_at,
      mode: result.mode,
      engine_id: result.engine_id,
    })
  } catch (error) {
    console.error('Error checking fine-tuning status:', error)
    return NextResponse.json({ error: 'Failed to check fine-tuning status' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const images = formData.getAll('images') as File[]
  const userId = formData.get('userId') as string
  const modelName = formData.get('modelName') as string

  if (!images || images.length < 4) {
    return NextResponse.json({ error: 'At least 4 images are required for face fine-tuning' }, { status: 400 })
  }

  if (!userId) {
    return NextResponse.json({ error: 'User ID not provided' }, { status: 400 })
  }

  if (!modelName) {
    return NextResponse.json({ error: 'Model name not provided' }, { status: 400 })
  }

  const apiKey = process.env.STABILITY_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  const payload = new FormData()

  // Preprocess and add images
  for (let i = 0; i < images.length; i++) {
    const processedImage = await preprocessImage(images[i])
    payload.append(`image_${i}`, new Blob([processedImage]), `image_${i}.png`)
  }

  payload.append('name', modelName)
  payload.append('mode', 'face')
  payload.append('engine_id', 'stable-diffusion-xl-1024-v1-0')

  try {
    const response = await fetch('https://api.stability.ai/v1/fine-tune', {
      method: 'POST',
      body: payload,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    return NextResponse.json({
      message: 'Face fine-tuning process initiated',
      jobId: result.id,
      status: result.status,
    })
  } catch (error) {
    console.error('Error initiating face fine-tuning:', error)
    return NextResponse.json({ error: 'Failed to initiate face fine-tuning process' }, { status: 500 })
  }
}
