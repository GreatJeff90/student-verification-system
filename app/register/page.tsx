// app/register/page.tsx
'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import { ArrowLeft, Camera, CheckCircle, UserPlus, Shield, Zap, Scan, Brain, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'

interface StudentData {
  name: string
  matricNumber: string
  department: string
  email: string
  phone: string
  dateOfBirth: string
  password: string
}

type AuthMode = 'register' | 'login' | 'forgot-password'

export default function RegisterPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState<'form' | 'face-capture' | 'complete'>('form')
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [authMode, setAuthMode] = useState<AuthMode>('register')
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    matricNumber: '',
    password: ''
  })
  const [resetData, setResetData] = useState({
    email: ''
  })

  // Start camera for face capture
  const startCamera = async () => {
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
    } catch (err) {
      console.error('Error accessing camera:', err)
      alert('Camera access failed. Please ensure camera permissions are granted.')
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

  // Simulate face scanning progress
  const simulateFaceScan = () => {
    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            resolve()
            return 100
          }
          return prev + Math.random() * 20
        })
      }, 150)
    })
  }

  const handleFormSubmit = (data: StudentData) => {
    setStudentData(data)
    setStep('face-capture')
    startCamera()
  }

  const handleFaceCapture = async () => {
    setLoading(true)
    setScanProgress(0)
    
    try {
      // Simulate face scanning progress
      await simulateFaceScan()

      // Capture image from camera
      const video = videoRef.current
      const canvas = canvasRef.current
      if (video && canvas) {
        const context = canvas.getContext('2d')
        if (context) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          const faceData = canvas.toDataURL('image/jpeg')
          
          // Combine and submit registration
          const registrationData = {
            ...studentData,
            faceData,
            registeredAt: new Date().toISOString()
          }
          
          console.log('Registration data:', registrationData)
        }
      }
      
      // Show success and move to complete step
      setStep('complete')
      stopCamera()
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration failed. Please try again.')
    } finally {
      setLoading(false)
      setScanProgress(0)
    }
  }

  const handleLogin = async () => {
    setLoading(true)
    try {
      // Mock login API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate successful login
      console.log('Login attempt:', loginData)
      
      // Redirect to verification page on successful login
      router.push('/verification')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    setLoading(true)
    try {
      // Mock password reset API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate successful reset request
      console.log('Password reset requested for:', resetData.email)
      alert('Password reset link has been sent to your email.')
      setAuthMode('login')
    } catch (error) {
      console.error('Password reset failed:', error)
      alert('Password reset failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = () => {
    router.push('/verification')
  }

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  const renderAuthForm = () => {
    if (authMode === 'login') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-300">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">System Login</h2>
            <p className="text-slate-600 text-sm">Access FaceID Verification</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 font-medium text-sm mb-2">
                Matric Number
              </label>
              <input
                type="text"
                value={loginData.matricNumber}
                onChange={(e) => setLoginData({...loginData, matricNumber: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="U2019/3045012"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              loading={loading}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              {loading ? 'Authenticating...' : 'Access System'}
            </Button>

            <div className="text-center space-y-3">
              <button
                onClick={() => setAuthMode('forgot-password')}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Forgot Password?
              </button>
              <div className="border-t border-blue-200 pt-3">
                <button
                  onClick={() => setAuthMode('register')}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  New User? Activate Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (authMode === 'forgot-password') {
      return (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-300">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Password Recovery</h2>
            <p className="text-slate-600 text-sm">Reset your security credentials</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 font-medium text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={resetData.email}
                onChange={(e) => setResetData({...resetData, email: e.target.value})}
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="user@uniport.edu.ng"
              />
            </div>

            <Button
              onClick={handlePasswordReset}
              loading={loading}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              {loading ? 'Sending Link...' : 'Reset Password'}
            </Button>

            <div className="text-center">
              <button
                onClick={() => setAuthMode('login')}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Return to Login
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Registration form steps
    return (
      <>
        {step === 'form' && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-300">
                <UserPlus className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Activate Account</h2>
              <p className="text-slate-600 text-sm">Register your biometric identity</p>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium text-sm mb-2">
                    Matric Number
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="U2019/3045012"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium text-sm mb-2">
                  Department
                </label>
                <select className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="AI Development">AI Development</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-medium text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="user@uniport.edu.ng"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium text-sm mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="+2348012345678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                onClick={() => handleFormSubmit({
                  name: 'John Chukwuma',
                  matricNumber: 'U2019/3045012',
                  department: 'Computer Science',
                  email: 'john@uniport.edu.ng',
                  phone: '+2348012345678',
                  dateOfBirth: '2000-05-15',
                  password: 'password123'
                })}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Proceed to Face Scan
              </Button>

              <div className="text-center pt-4 border-t border-blue-200">
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  Existing User? Login Here
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'face-capture' && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-300">
                <Scan className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Face Registration</h2>
                <p className="text-slate-600 text-sm">Capture your biometric signature</p>
              </div>
            </div>

            <div className="bg-white rounded-xl aspect-video flex items-center justify-center mb-6 overflow-hidden border border-blue-200 shadow-md relative">
              {!isCapturing ? (
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-blue-500/10 rounded-full mx-auto mb-4 flex items-center justify-center border border-blue-300">
                    <Camera className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-slate-600 mb-4">Camera not activated</p>
                  <Button onClick={startCamera} variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600/10">
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
                    <div className="w-48 h-48 border-2 border-blue-500 rounded-full animate-pulse opacity-50"></div>
                  </div>
                  
                  {/* Scan Grid Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
                </>
              )}
              
              {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center text-slate-800">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-lg font-medium">Registering Face Data</p>
                    <p className="text-sm opacity-75">Processing...</p>
                    <div className="w-48 bg-blue-100 rounded-full h-2 mt-4">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-2">{scanProgress.toFixed(0)}%</p>
                  </div>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <div className="space-y-3">
              <Button 
                onClick={handleFaceCapture}
                disabled={!isCapturing || loading}
                loading={loading}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium"
              >
                <Scan className="w-4 h-4 mr-2" />
                {loading ? 'Processing...' : 'Capture and Register'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setStep('form')
                  stopCamera()
                }}
                disabled={loading}
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Information
              </Button>
            </div>

            <Card className="mt-6 bg-blue-50 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-3">Scan Guidelines</h3>
              <div className="space-y-2 text-sm text-slate-600 text-left">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse"></div>
                  <span>Ensure optimal lighting conditions</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse"></div>
                  <span>Remove face obstructions (glasses, masks)</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse"></div>
                  <span>Maintain neutral expression</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 animate-pulse"></div>
                  <span>Hold static position during capture</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === 'complete' && (
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-300">
              <CheckCircle className="w-10 h-10 text-blue-600 animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Registration Complete
            </h2>
            
            <p className="text-slate-600 mb-6 leading-relaxed">
              Your biometric identity has been successfully registered. 
              The FaceID system is now ready for verification.
            </p>

            {studentData && (
              <Card className="bg-blue-50 border border-blue-200 mb-6 text-left">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Registration Data
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Name:</span>
                    <span className="font-medium text-slate-800">{studentData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Matric Number:</span>
                    <span className="font-medium text-slate-800">{studentData.matricNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Department:</span>
                    <span className="font-medium text-slate-800">{studentData.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Email:</span>
                    <span className="font-medium text-slate-800 text-xs">{studentData.email}</span>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-3">
              <Button onClick={handleComplete} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Start Verification
              </Button>
              <Button variant="outline" onClick={() => router.push('/')} className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10">
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 py-8 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="relative">
              <img 
                src="https://www.uniport.edu.ng/wp-content/themes/unipix/assets/images/logo/uniport_logo1.png" 
                alt="University of Port Harcourt"
                className="h-12 w-auto"
              />
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">University of Port Harcourt</h1>
              <p className="text-sm text-blue-600">FaceID Verification System</p>
            </div>
          </div>

          {/* Auth Mode Tabs */}
          {authMode === 'register' && (
            <div className="flex justify-center space-x-8 mb-6">
              {(['register', 'login'] as AuthMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAuthMode(mode)}
                  className={`font-medium text-sm transition-all duration-300 ${
                    authMode === mode
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {mode === 'register' ? 'Activate Account' : 'System Login'}
                </button>
              ))}
            </div>
          )}
        </div>

        <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300 relative overflow-hidden shadow-xl">
          <div className="relative z-10 p-8">
            {renderAuthForm()}
          </div>
        </Card>
      </div>
    </div>
  )
}