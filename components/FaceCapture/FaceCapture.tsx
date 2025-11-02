// components/FaceCapture/FaceCapture.tsx
'use client'
import { useRef, useState, useCallback } from 'react'

interface FaceCaptureProps {
  onCapture: (imageData: string) => void
  onQualityCheck: (issues: string[]) => void
}

interface ImageQuality {
  isAcceptable: boolean
  issues: string[]
  score: string
}

export default function FaceCapture({ onCapture, onQualityCheck }: FaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCapturing, setIsCapturing] = useState<boolean>(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [imageQuality, setImageQuality] = useState<ImageQuality | null>(null)

  const startCamera = async (): Promise<void> => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 1280, 
          height: 720,
          facingMode: 'user' 
        } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setStream(mediaStream)
      setIsCapturing(true)
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Cannot access camera. Please ensure you have granted camera permissions.')
    }
  }

  const stopCamera = (): void => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setIsCapturing(false)
    }
  }

  const captureImage = useCallback((): void => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Get image data
    const imageData = canvas.toDataURL('image/jpeg')

    // Basic quality check
    const quality = performQualityCheck(canvas)
    setImageQuality(quality)

    if (quality.isAcceptable) {
      onCapture(imageData)
    } else {
      onQualityCheck(quality.issues)
    }
  }, [onCapture, onQualityCheck])

  const performQualityCheck = (canvas: HTMLCanvasElement): ImageQuality => {
    const context = canvas.getContext('2d')
    if (!context) {
      return { isAcceptable: false, issues: ['Canvas context not available'], score: 'Poor' }
    }

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const issues: string[] = []

    // Check brightness (simplified)
    const brightness = calculateBrightness(imageData)
    if (brightness < 50) issues.push('Image too dark')
    if (brightness > 200) issues.push('Image too bright')

    // Check if image has reasonable dimensions
    if (canvas.width < 200 || canvas.height < 200) {
      issues.push('Image resolution too low')
    }

    return {
      isAcceptable: issues.length === 0,
      issues,
      score: issues.length === 0 ? 'Good' : 'Poor'
    }
  }

  const calculateBrightness = (imageData: ImageData): number => {
    let total = 0
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      total += (data[i] + data[i + 1] + data[i + 2]) / 3
    }
    return total / (data.length / 4)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Face Capture</h2>
        
        <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
          {!isCapturing ? (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Camera not active</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover"
            />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex gap-4 justify-center">
          {!isCapturing ? (
            <button
              onClick={startCamera}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Camera
            </button>
          ) : (
            <>
              <button
                onClick={captureImage}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Capture Image
              </button>
              <button
                onClick={stopCamera}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Stop Camera
              </button>
            </>
          )}
        </div>

        {imageQuality && (
          <div className={`mt-4 p-3 rounded-lg ${
            imageQuality.isAcceptable ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <p className={`font-medium ${
              imageQuality.isAcceptable ? 'text-green-800' : 'text-yellow-800'
            }`}>
              Image Quality: {imageQuality.score}
            </p>
            {imageQuality.issues.length > 0 && (
              <ul className="list-disc list-inside mt-2 text-sm">
                {imageQuality.issues.map((issue, index) => (
                  <li key={index} className="text-yellow-700">{issue}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}