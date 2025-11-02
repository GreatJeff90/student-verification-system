// app/admin/students/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Card from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import { Search, Plus, Users, Edit, Trash2, Download, Filter, MoreVertical, Phone, Mail, Calendar, UserCheck } from 'lucide-react'

interface Student {
  id: string
  name: string
  matricNumber: string
  department: string
  email: string
  phone: string
  registeredAt: string
  status: 'active' | 'inactive'
  lastVerification?: string
  verificationCount: number
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      // Mock API call - replace with actual API
      const mockStudents: Student[] = [
        {
          id: '1',
          name: 'John Chukwuma',
          matricNumber: 'U2019/3045012',
          department: 'Computer Science',
          email: 'john.chukwuma@uniport.edu.ng',
          phone: '+2348012345678',
          registeredAt: '2024-01-15',
          status: 'active',
          lastVerification: '2024-01-20 09:30:15',
          verificationCount: 45
        },
        {
          id: '2',
          name: 'Jane Okoro',
          matricNumber: 'U2020/2015006',
          department: 'Electrical Engineering',
          email: 'jane.okoro@uniport.edu.ng',
          phone: '+2348012345679',
          registeredAt: '2024-01-16',
          status: 'active',
          lastVerification: '2024-01-20 08:15:22',
          verificationCount: 32
        },
        {
          id: '3',
          name: 'Mike Adekunle',
          matricNumber: 'U2018/1042033',
          department: 'Mechanical Engineering',
          email: 'mike.adekunle@uniport.edu.ng',
          phone: '+2348012345680',
          registeredAt: '2024-01-10',
          status: 'inactive',
          lastVerification: '2024-01-18 14:20:05',
          verificationCount: 12
        }
      ]
      setStudents(mockStudents)
    } catch (error) {
      console.error('Failed to load students:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDeleteStudent = async (studentId: string) => {
    if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      return
    }

    try {
      // Mock API call - replace with actual API
      setStudents(students.filter(s => s.id !== studentId))
      // Show success message
      alert('Student deleted successfully!')
    } catch (error) {
      console.error('Failed to delete student:', error)
      alert('Failed to delete student. Please try again.')
    }
  }

  const handleToggleStatus = async (studentId: string, currentStatus: 'active' | 'inactive') => {
    try {
      // Mock API call - replace with actual API
      setStudents(students.map(s => 
        s.id === studentId 
          ? { ...s, status: currentStatus === 'active' ? 'inactive' : 'active' }
          : s
      ))
    } catch (error) {
      console.error('Failed to update student status:', error)
    }
  }

  const handleExportData = () => {
    // Mock export functionality
    const dataStr = JSON.stringify(filteredStudents, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `students-export-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage registered students and their facial data</p>
        </div>
        <Button size="lg" className="w-full sm:w-auto justify-center">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span>Add New Student</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Students</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Active</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {students.filter(s => s.status === 'active').length}
              </p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Inactive</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {students.filter(s => s.status === 'inactive').length}
              </p>
            </div>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Avg. Verifications</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {Math.round(students.reduce((acc, s) => acc + s.verificationCount, 0) / students.length)}
              </p>
            </div>
            <Filter className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card variant="elevated">
        <div className="p-4 sm:p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, matric number, or department..."
              className="w-full pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="sm:hidden flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-xl text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <div className={`${showMobileFilters ? 'flex' : 'hidden'} sm:flex items-center gap-3 flex-wrap`}>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={handleExportData} 
              className="w-full sm:w-auto justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Students List - Mobile Cards */}
        <div className="sm:hidden space-y-3 p-4">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{student.name}</h3>
                  <p className="text-xs text-gray-500">{student.matricNumber}</p>
                </div>
                <button
                  onClick={() => handleToggleStatus(student.id, student.status)}
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    student.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {student.status}
                </button>
              </div>

              {/* Department */}
              <div>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {student.department}
                </span>
              </div>

              {/* Contact Info */}
              <div className="space-y-1">
                <div className="flex items-center text-xs text-gray-600">
                  <Mail className="w-3 h-3 mr-2" />
                  <span className="truncate">{student.email}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <Phone className="w-3 h-3 mr-2" />
                  <span>{student.phone}</span>
                </div>
              </div>

              {/* Verification Stats */}
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center">
                  <UserCheck className="w-3 h-3 mr-1" />
                  <span>{student.verificationCount} verifications</span>
                </div>
                {student.lastVerification && (
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(student.lastVerification).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Registered: {new Date(student.registeredAt).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {/* Edit functionality */}}
                    className="text-blue-600 hover:text-blue-900 p-1"
                    title="Edit Student"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete Student"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Students Table - Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Stats
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.matricNumber}
                      </div>
                      <div className="text-xs text-gray-400">
                        Registered: {new Date(student.registeredAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.email}</div>
                    <div className="text-sm text-gray-500">{student.phone}</div>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {student.department}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {student.verificationCount} verifications
                    </div>
                    {student.lastVerification && (
                      <div className="text-xs text-gray-500">
                        Last: {new Date(student.lastVerification).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(student.id, student.status)}
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full cursor-pointer transition-colors ${
                        student.status === 'active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {student.status}
                    </button>
                  </td>
                  <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {/* Edit functionality */}}
                        className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                        title="Edit Student"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-900 transition-colors p-1"
                        title="Delete Student"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Users className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">No students found</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first student'
              }
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}