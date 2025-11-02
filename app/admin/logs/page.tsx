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
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">Verification Logs</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
            Monitor all identity verification attempts and system activity
          </p>
        </div>
        <Button onClick={handleExportLogs} className="flex items-center justify-center space-x-2 text-sm">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export Logs</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Total Logs</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">{logs.length}</p>
            </div>
            <Filter className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0 ml-2" />
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Successful</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {logs.filter(l => l.status === 'success').length}
              </p>
            </div>
            <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 flex-shrink-0 ml-2" />
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Failed</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {logs.filter(l => l.status === 'failed').length}
              </p>
            </div>
            <XCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-600 flex-shrink-0 ml-2" />
          </div>
        </Card>
        <Card className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Avg. Response</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {Math.round(logs.reduce((acc, l) => acc + l.responseTime, 0) / logs.length)}ms
              </p>
            </div>
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0 ml-2" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card variant="elevated">
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, matric number, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
              className="text-xs sm:text-sm"
            >
              All
            </Button>
            <Button 
              variant={filter === 'success' ? 'primary' : 'outline'}
              onClick={() => setFilter('success')}
              size="sm"
              className="flex items-center space-x-1 text-xs sm:text-sm"
            >
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Success</span>
            </Button>
            <Button 
              variant={filter === 'failed' ? 'primary' : 'outline'}
              onClick={() => setFilter('failed')}
              size="sm"
              className="flex items-center space-x-1 text-xs sm:text-sm"
            >
              <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Failed</span>
            </Button>
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-3 sm:space-y-4 p-4 sm:p-6">
          {filteredLogs.map((log) => (
            <div 
              key={log.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-200 hover:shadow-sm ${
                log.status === 'success' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start sm:items-center space-x-3 flex-1 mb-2 sm:mb-0">
                <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                  {getStatusIcon(log.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{log.studentName}</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full self-start sm:self-auto">
                      {log.matricNumber}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-1 sm:gap-2 mt-1 sm:mt-2">
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{log.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{log.responseTime}ms</span>
                    </div>
                    
                    <div className="text-xs sm:text-sm font-medium">
                      Confidence: 
                      <span className={`ml-1 ${
                        log.confidence > 0.8 ? 'text-green-600' : 
                        log.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {(log.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1">
                    <span className="text-xs text-gray-500 truncate">{log.device}</span>
                    <span className="text-xs text-gray-500 hidden sm:inline">{log.ipAddress}</span>
                    <span className="text-xs text-gray-500 sm:hidden truncate">IP: {log.ipAddress}</span>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right flex-shrink-0">
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
          <div className="text-center py-8 sm:py-12">
            <Filter className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-sm sm:text-lg">No logs found</p>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
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