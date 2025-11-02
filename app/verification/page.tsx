// app/verification/page.tsx
'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import { ArrowLeft, Camera, Shield, CheckCircle, XCircle, RotateCcw, AlertTriangle, Zap, Cpu, Brain, Scan, User } from 'lucide-react'

interface VerificationResponse {
  success: boolean
  message: string
  student?: {
    id: string
    name: string
    matricNumber: string
    department: string
    level: string
    email: string
  }
  timestamp?: string
  confidence?: number
  location?: string
}

export default function VerificationPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [verificationResult, setVerificationResult] = useState<VerificationResponse | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [scanProgress, setScanProgress] = useState(0)

  // Start camera automatically when component mounts
  useEffect(() => {
    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Start camera
  const startCamera = async () => {
    try {
      setError(null)
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
    } catch (err) {
      console.error('Error accessing camera:', err)
      setError('Camera access failed. Please ensure camera permissions are granted.')
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setIsCapturing(false)
    }
  }

  // Simulate face detection and scanning progress
  const simulateFaceDetection = () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            resolve()
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)
    })
  }

  // Capture image from camera and verify
  const captureAndVerify = useCallback(async () => {
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
    setCapturedImage(imageData)

    // Start verification process
    await handleVerification(imageData)
  }, [])

  // Handle verification process
  const handleVerification = async (imageData: string) => {
    setIsVerifying(true)
    setError(null)
    setScanProgress(0)
    
    try {
      // Simulate face detection progress
      await simulateFaceDetection()

      // Simulate API call to backend
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: imageData,
          location: 'Main Entrance',
          timestamp: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error('Verification service offline')
      }

      const result: VerificationResponse = await response.json()
      setVerificationResult(result)
      
    } catch (err) {
      console.error('Verification error:', err)
      setError('Face verification service temporarily unavailable.')
    } finally {
      setIsVerifying(false)
      setScanProgress(0)
    }
  }

  // Mock verification function (fallback)
  const mockVerification = async () => {
    setIsVerifying(true)
    setScanProgress(0)
    
    // Simulate face detection progress
    await simulateFaceDetection()
    
    // Mock result - 85% success rate
    const isSuccess = Math.random() > 0.15
    
    const mockResult: VerificationResponse = {
      success: isSuccess,
      message: isSuccess 
        ? 'Identity verified successfully'
        : 'No face match found in database',
      student: isSuccess ? {
        id: 'FACE_ID_001',
        name: 'John Chukwuma',
        matricNumber: 'U2019/3045012',
        department: 'Computer Science',
        level: '500 Level',
        email: 'john.chukwuma@uniport.edu.ng'
      } : undefined,
      confidence: isSuccess ? 0.94 : 0.45,
      timestamp: new Date().toISOString(),
      location: 'Main Entrance'
    }
    
    setVerificationResult(mockResult)
    setIsVerifying(false)
    setScanProgress(0)
  }

  const resetVerification = () => {
    setVerificationResult(null)
    setCapturedImage(null)
    setError(null)
    setScanProgress(0)
    startCamera()
  }

  const proceedToProfile = () => {
    if (verificationResult?.student) {
      router.push('/student/profile')
    }
  }

  const recordAttendance = async () => {
    if (!verificationResult?.student) return

    try {
      // Mock API call to record attendance
      await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: verificationResult.student.id,
          timestamp: new Date().toISOString(),
          location: verificationResult.location,
          type: 'entry_scan'
        }),
      })
      
      alert('Attendance recorded successfully')
    } catch (err) {
      console.error('Failed to record attendance:', err)
      alert('Failed to log attendance')
    }
  }

  if (verificationResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 py-4 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <Card className="text-center bg-white/90 backdrop-blur-2xl border border-blue-300 relative overflow-hidden shadow-xl">
            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border-2 ${
                verificationResult.success 
                  ? 'bg-green-500/10 border-green-400' 
                  : 'bg-red-500/10 border-red-400'
              } backdrop-blur-sm`}>
                {verificationResult.success ? (
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 animate-pulse" />
                ) : (
                  <XCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 animate-pulse" />
                )}
              </div>

              <h1 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${
                verificationResult.success ? 'text-green-600' : 'text-red-600'
              }`}>
                {verificationResult.success ? 'Verification Successful' : 'Verification Failed'}
              </h1>

              <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {verificationResult.message}
              </p>

              {verificationResult.success && verificationResult.student && (
                <Card className="bg-blue-50 border border-blue-200 mb-4 sm:mb-6 text-left">
                  <h3 className="font-bold text-slate-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                    <Shield className="w-4 h-4 mr-2 text-blue-600" />
                    Identity Verified
                  </h3>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Name:</span>
                      <span className="font-medium text-slate-800 text-right">{verificationResult.student.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Matric Number:</span>
                      <span className="font-medium text-slate-800">{verificationResult.student.matricNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Department:</span>
                      <span className="font-medium text-slate-800 text-right">{verificationResult.student.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Level:</span>
                      <span className="font-medium text-slate-800">{verificationResult.student.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email:</span>
                      <span className="font-medium text-slate-800 text-xs text-right">{verificationResult.student.email}</span>
                    </div>
                    {verificationResult.confidence && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Confidence:</span>
                        <span className="font-medium text-green-600">
                          {(verificationResult.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                    {verificationResult.location && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Location:</span>
                        <span className="font-medium text-slate-800">{verificationResult.location}</span>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              <div className="space-y-2 sm:space-y-3">
                {verificationResult.success ? (
                  <>
                    <Button 
                      onClick={proceedToProfile}
                      className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium text-sm sm:text-base"
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button 
                      onClick={recordAttendance}
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-600/10 font-medium text-sm sm:text-base"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Record Attendance
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="outline" 
                    onClick={resetVerification} 
                    className="w-full flex items-center justify-center space-x-2 border-blue-600 text-blue-600 hover:bg-blue-600/10 font-medium text-sm sm:text-base"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </Button>
                )}
              </div>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-200">
                <Button 
                  variant="ghost"
                  onClick={resetVerification}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Scan Another Face
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 py-4 sm:py-8 px-3 sm:px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
          <Button 
            variant="ghost"
            onClick={() => router.push('/')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Back</span>
          </Button>
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-800 leading-tight">
              Face Verification
            </h1>
            <p className="text-blue-600 text-xs sm:text-sm">Identity Verification Portal</p>
          </div>
          <div className="w-10 sm:w-20"></div>
        </div>

        {error && (
          <Card className="mb-4 sm:mb-6 border-red-300 bg-red-50 backdrop-blur-xl">
            <div className="flex items-start space-x-3 p-3 sm:p-4">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 animate-pulse mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-red-600 font-medium text-sm">System Alert</p>
                <p className="text-red-500 text-xs sm:text-sm break-words">{error}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Camera Section */}
          <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300 relative overflow-hidden shadow-xl">
            <div className="relative z-10 p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-blue-300">
                  <Scan className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-1 sm:mb-2">Face Capture</h2>
                <p className="text-slate-600 text-xs sm:text-sm">Align face with scan area</p>
              </div>

              <div className="bg-white rounded-lg sm:rounded-xl aspect-video flex items-center justify-center mb-4 sm:mb-6 overflow-hidden border border-blue-200 shadow-md relative">
                {!isCapturing ? (
                  <div className="text-center p-4 sm:p-6 lg:p-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center border border-blue-300">
                      <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                    <p className="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base">Camera not activated</p>
                    <Button onClick={startCamera} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600/10 text-sm">
                      Activate Camera
                    </Button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Face Detection Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 sm:w-48 sm:h-48 border-2 border-blue-500 rounded-full animate-pulse opacity-50"></div>
                    </div>
                    
                    {/* Scan Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
                  </>
                )}
                
                {isVerifying && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center text-slate-800 p-4">
                      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
                      <p className="text-base sm:text-lg font-medium">Analyzing Face Pattern</p>
                      <p className="text-xs sm:text-sm opacity-75">Processing...</p>
                      <div className="w-32 sm:w-48 bg-blue-100 rounded-full h-2 mt-3 sm:mt-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs mt-1 sm:mt-2">{scanProgress.toFixed(0)}%</p>
                    </div>
                  </div>
                )}
              </div>

              <canvas ref={canvasRef} className="hidden" />

              <div className="space-y-2 sm:space-y-3">
                {isCapturing ? (
                  <>
                    <Button 
                      onClick={captureAndVerify}
                      disabled={isVerifying}
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium text-sm sm:text-base"
                    >
                      <Scan className="w-4 h-4 mr-2" />
                      Capture and Verify
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={stopCamera}
                      disabled={isVerifying}
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10 font-medium text-sm sm:text-base"
                    >
                      Turn Off Camera
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={mockVerification}
                    disabled={isVerifying}
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium text-sm sm:text-base"
                  >
                    {isVerifying ? (
                      <>
                        <Cpu className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Simulate Scan
                      </>
                    )}
                  </Button>
                )}
              </div>

              {capturedImage && !isVerifying && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-500/10 rounded-lg border border-blue-300">
                  <p className="text-blue-600 text-xs sm:text-sm text-center font-medium">
                    ✓ Face captured successfully
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300">
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-slate-800 mb-3 sm:mb-4 flex items-center text-sm sm:text-base">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                  Scan Instructions
                </h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse flex-shrink-0"></div>
                    <span className="leading-relaxed">Ensure good lighting conditions</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse flex-shrink-0"></div>
                    <span className="leading-relaxed">Remove hats or sunglasses</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse flex-shrink-0"></div>
                    <span className="leading-relaxed">Face the camera directly</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse flex-shrink-0"></div>
                    <span className="leading-relaxed">Keep a neutral expression</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse flex-shrink-0"></div>
                    <span className="leading-relaxed">Hold still during capture</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-blue-50 border border-blue-200">
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">System Status</h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <div className="flex justify-between items-center">
                    <span>Face Recognition:</span>
                    <span className="font-medium text-green-600 flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database:</span>
                    <span className="font-medium text-green-600 flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                      Connected
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Response Time:</span>
                    <span className="font-medium text-blue-600">&lt; 1.2s</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-green-50 border border-green-200">
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">Support</h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-2 sm:mb-3">
                  Need assistance with face scan?
                </p>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                  <p className="flex items-center">
                    <span className="mr-2">📞</span>
                    <span>Support: +234-XXX-XXXX</span>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">✉️</span>
                    <span>support@uniport.edu.ng</span>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">🏢</span>
                    <span>IT Help Desk, Main Building</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}