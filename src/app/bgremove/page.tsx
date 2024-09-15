'use client'

import { Heading } from '@/components/heading'
import { useState } from 'react'
import { ApplicationLayout } from '../application-layout'

export default function Page() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setOriginalImage(URL.createObjectURL(file))

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to process image')
      }

      const data = await response.json()
      setProcessedImage(data.processedImageUrl)
    } catch (error) {
      console.error('Error processing image:', error)
      alert('Failed to process image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ApplicationLayout events={[]}>
      <div className="container mx-auto px-4 py-8">
        <Heading>Background Removal Tool</Heading>

        <div className="mt-8">
          <label htmlFor="imageUpload" className="mb-2 block text-sm font-medium text-gray-900">
            Upload an image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none"
          />
        </div>

        {isLoading && (
          <div className="mt-8 text-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}

        {(originalImage || processedImage) && (
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {originalImage && (
              <div>
                <h2 className="mb-2 text-lg font-semibold">Original Image</h2>
                <img src={originalImage} alt="Original" className="h-auto w-full rounded-lg shadow-md" />
              </div>
            )}
            {processedImage && (
              <div>
                <h2 className="mb-2 text-lg font-semibold">Processed Image</h2>
                <img src={processedImage} alt="Processed" className="h-auto w-full rounded-lg shadow-md" />
              </div>
            )}
          </div>
        )}
      </div>
    </ApplicationLayout>
  )
}
