// app/admin/logs/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Card from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import { Search, Filter, Download, Calendar, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react'

interface VerificationLog {
  id: string
  studentName: string
  matricNumber: string
  timestamp: string
  status: 'success' | 'failed'
  location: string
  confidence: number
  device: string
  ipAddress: string
  responseTime: number
}

export default function LogsPage() {
  const [logs, setLogs] = useState<VerificationLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all')
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('today')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadLogs()
  }, [dateRange])

  const loadLogs = async () => {
    try {
      // Mock API call - replace with actual API
      const mockLogs: VerificationLog[] = [
        {
          id: '1',
          studentName: 'John Chukwuma',
          matricNumber: 'U2019/3045012',
          timestamp: new Date().toISOString(),
          status: 'success',
          location: 'Main Library - Gate A',
          confidence: 0.96,
          device: 'iPhone 13',
          ipAddress: '192.168.1.100',
          responseTime: 1240
        },
        {
          id: '2',
          studentName: 'Jane Okoro',
          matricNumber: 'U2020/2015006',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          status: 'failed',
          location: 'Science Building - Entrance',
          confidence: 0.45,
          device: 'Samsung Galaxy S21',
          ipAddress: '192.168.1.101',
          responseTime: 890
        },
        {
          id: '3',
          studentName: 'Mike Adekunle',
          matricNumber: 'U2018/1042033',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          status: 'success',
          location: 'Exam Hall A',
          confidence: 0.92,
          device: 'Web Camera',
          ipAddress: '192.168.1.102',
          responseTime: 1560
        },
        {
          id: '4',
          studentName: 'Sarah Bello',
          matricNumber: 'U2021/3018077',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          status: 'success',
          location: 'Campus Main Gate',
          confidence: 0.88,
          device: 'iPad Pro',
          ipAddress: '192.168.1.103',
          responseTime: 1340
        }
      ]
      setLogs(mockLogs)
    } catch (error) {
      console.error('Failed to load logs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.status === filter
    const matchesSearch = log.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusIcon = (status: 'success' | 'failed') => {
    return status === 'success' ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <XCircle className="w-4 h-4 text-red-500" />
  }

  const handleExportLogs = () => {
    // Mock export functionality
    const dataStr = JSON.stringify(filteredLogs, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `verification-logs-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Verification Logs</h1>
          <p className="text-gray-600 mt-2">Monitor all identity verification attempts and system activity</p>
        </div>
        <Button onClick={handleExportLogs} className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Logs</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
            </div>
            <Filter className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-gray-900">
                {logs.filter(l => l.status === 'success').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">
                {logs.filter(l => l.status === 'failed').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Response</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(logs.reduce((acc, l) => acc + l.responseTime, 0) / logs.length)}ms
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="elevated">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between p-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, matric number, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'success' ? 'primary' : 'outline'}
              onClick={() => setFilter('success')}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Success</span>
            </Button>
            <Button 
              variant={filter === 'failed' ? 'primary' : 'outline'}
              onClick={() => setFilter('failed')}
              className="flex items-center space-x-2"
            >
              <XCircle className="w-4 h-4" />
              <span>Failed</span>
            </Button>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-4 p-6">
          {filteredLogs.map((log) => (
            <div 
              key={log.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${
                log.status === 'success' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-shrink-0">
                  {getStatusIcon(log.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-900">{log.studentName}</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {log.matricNumber}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{log.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{log.responseTime}ms</span>
                    </div>
                    
                    <div className="text-sm font-medium">
                      Confidence: 
                      <span className={`ml-1 ${
                        log.confidence > 0.8 ? 'text-green-600' : 
                        log.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {(log.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">{log.device}</span>
                    <span className="text-xs text-gray-500">{log.ipAddress}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {getTimeAgo(log.timestamp)}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No logs found</p>
            <p className="text-gray-400 text-sm mt-1">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'No verification logs available for the selected period'
              }
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}