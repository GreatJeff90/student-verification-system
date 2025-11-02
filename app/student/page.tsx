// app/student/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Card from '../../components/UI/Card'
import Button from '../../components/UI/Button'
import { User, Shield, CheckCircle, XCircle, Clock, BarChart3, Zap, Scan, ArrowRight } from 'lucide-react'

interface StudentData {
  name: string
  matricNumber: string
  department: string
  email: string
  totalVerifications: number
  successfulVerifications: number
  lastVerification: string
  faceId: string
  enrollmentDate: string
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentData | null>(null)

  useEffect(() => {
    // Mock data - replace with API call
    const mockStudent: StudentData = {
      name: 'John Chukwuma',
      matricNumber: 'U2019/3045012',
      department: 'Computer Science',
      email: 'john.chukwuma@uniport.edu.ng',
      totalVerifications: 45,
      successfulVerifications: 42,
      lastVerification: '2024-01-20 09:30:15',
      faceId: 'FACE_7G8H9J0K',
      enrollmentDate: '2023-09-15'
    }
    setStudent(mockStudent)
  }, [])

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading student data...</p>
        </div>
      </div>
    )
  }

  const successRate = ((student.successfulVerifications / student.totalVerifications) * 100).toFixed(1)
  const failedVerifications = student.totalVerifications - student.successfulVerifications

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 py-8 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Student Dashboard
          </h1>
          <p className="text-blue-600 text-lg">Welcome to your FaceID portal</p>
        </div>

        {/* Welcome Card */}
        <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between p-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-300">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Welcome back, {student.name}!</h2>
                <p className="text-slate-600">Your FaceID verification portal</p>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-sm text-slate-500">Matric Number</p>
              <p className="text-lg font-semibold text-blue-700">{student.matricNumber}</p>
              <p className="text-sm text-slate-500 mt-1">Face ID: {student.faceId}</p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Verifications */}
          <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300 text-center shadow-lg">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-300">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700 mb-2">
                {student.totalVerifications}
              </div>
              <p className="text-slate-600 font-medium">Total Verifications</p>
            </div>
          </Card>

          {/* Successful Verifications */}
          <Card className="bg-white/90 backdrop-blur-2xl border border-green-300 text-center shadow-lg">
            <div className="p-6">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-300">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-700 mb-2">
                {student.successfulVerifications}
              </div>
              <p className="text-slate-600 font-medium">Successful</p>
            </div>
          </Card>

          {/* Failed Verifications */}
          <Card className="bg-white/90 backdrop-blur-2xl border border-red-300 text-center shadow-lg">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-red-300">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-red-700 mb-2">
                {failedVerifications}
              </div>
              <p className="text-slate-600 font-medium">Failed</p>
            </div>
          </Card>

          {/* Success Rate */}
          <Card className="bg-white/90 backdrop-blur-2xl border border-purple-300 text-center shadow-lg">
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-300">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-700 mb-2">
                {successRate}%
              </div>
              <p className="text-slate-600 font-medium">Success Rate</p>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-2xl border border-blue-300 shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                Quick Actions
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/verification" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium py-4">
                    <Scan className="w-5 h-5 mr-2" />
                    Verify Identity Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/student/profile" className="block">
                  <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10 font-medium py-4">
                    <User className="w-5 h-5 mr-2" />
                    View Profile
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300 shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-slate-800 text-sm">Last Verification</p>
                    <p className="text-slate-600 text-xs">{student.lastVerification}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Department:</span>
                    <span className="font-medium text-slate-800 text-sm">{student.department}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Email:</span>
                    <span className="font-medium text-slate-800 text-xs">{student.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm">Enrolled:</span>
                    <span className="font-medium text-slate-800 text-sm">{student.enrollmentDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Security Status */}
        <Card className="mt-8 bg-white/90 backdrop-blur-2xl border border-green-300 shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-300">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Security Status</h3>
                  <p className="text-slate-600">Your FaceID is active and secure</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                <span className="font-medium">All Systems Active</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}