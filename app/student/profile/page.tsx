// app/student/profile/page.tsx
'use client'
import { useState } from 'react'
import Card from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import { User, Cpu, Shield, Zap, Edit3, Save, X, Scan, Brain } from 'lucide-react'

export default function StudentProfile() {
  const [student, setStudent] = useState({
    name: 'John Chukwuma',
    matricNumber: 'U2019/3045012',
    department: 'Computer Science',
    email: 'john.chukwuma@uniport.edu.ng',
    phone: '+2348012345678',
    dateOfBirth: '2000-05-15',
    faceId: 'FACE_7G8H9J0K',
    enrollmentDate: '2023-09-15',
    verificationCount: 156,
    lastVerification: '2024-01-20 09:30:15'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsEditing(false)
    setIsSaving(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 py-8 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Student Profile
          </h1>
          <p className="text-blue-600 text-lg">Face Identity Management</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <Card className="lg:col-span-2 bg-white/90 backdrop-blur-2xl border border-blue-300 relative overflow-hidden shadow-xl">
            <div className="relative z-10 p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-300">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Student Profile</h2>
                    <p className="text-blue-600 text-sm">Face pattern active</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "primary"}
                  className={isEditing ? 
                    "border-red-600 text-red-600 hover:bg-red-600/10 font-medium" :
                    "bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium"
                  }
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Cancel Edit
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Face ID */}
                  <div>
                    <label className="block text-slate-700 font-medium text-sm mb-2">
                      Face ID
                    </label>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-blue-700 font-medium">{student.faceId}</p>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-slate-700 font-medium text-sm mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) => setStudent({...student, name: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-slate-800">{student.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Matric Number */}
                  <div>
                    <label className="block text-slate-700 font-medium text-sm mb-2">
                      Matric Number
                    </label>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-slate-800 font-medium">{student.matricNumber}</p>
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-slate-700 font-medium text-sm mb-2">
                      Department
                    </label>
                    {isEditing ? (
                      <select
                        value={student.department}
                        onChange={(e) => setStudent({...student, department: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical Engineering">Electrical Engineering</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="AI Development">AI Development</option>
                        <option value="Data Science">Data Science</option>
                      </select>
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-slate-800">{student.department}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-slate-700 font-medium text-sm mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={student.email}
                        onChange={(e) => setStudent({...student, email: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-slate-800 text-sm">{student.email}</p>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-slate-700 font-medium text-sm mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={student.phone}
                        onChange={(e) => setStudent({...student, phone: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-slate-800">{student.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-slate-700 font-medium text-sm mb-2">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={student.dateOfBirth}
                        onChange={(e) => setStudent({...student, dateOfBirth: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-blue-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-slate-800">{student.dateOfBirth}</p>
                      </div>
                    )}
                  </div>

                  {/* Enrollment Date */}
                  <div>
                    <label className="block text-slate-700 font-medium text-sm mb-2">
                      Enrollment Date
                    </label>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-slate-800">{student.enrollmentDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 pt-6 border-t border-blue-200">
                  <Button
                    onClick={handleSave}
                    loading={isSaving}
                    className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white font-medium"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Update Profile'}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Verification Stats */}
            <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-300">
                  <Scan className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800">Verification Stats</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Total Scans:</span>
                  <span className="text-blue-700 font-bold">{student.verificationCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Last Scan:</span>
                  <span className="text-blue-700 text-xs">{student.lastVerification}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 text-sm">Success Rate:</span>
                  <span className="text-green-600 font-bold">98.7%</span>
                </div>
              </div>
            </Card>

            {/* Security Status */}
            <Card className="bg-white/90 backdrop-blur-2xl border border-green-300 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-300">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-800">Security Status</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm">Face Encryption:</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm">Data Protection:</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-sm">Data Integrity:</span>
                  <span className="text-green-600 font-medium">100%</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300 shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-300">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10 font-medium text-sm">
                  <Brain className="w-4 h-4 mr-2" />
                  Update Face Data
                </Button>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10 font-medium text-sm">
                  <Cpu className="w-4 h-4 mr-2" />
                  View Scan History
                </Button>
                <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10 font-medium text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}