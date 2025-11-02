// app/admin/analytics/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Card from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import { BarChart3, TrendingUp, Users, Clock, Download, Calendar, Filter } from 'lucide-react'

interface AnalyticsData {
  period: string
  verifications: number
  successRate: number
  averageResponse: number
  uniqueStudents: number
  peakHours: string[]
  departmentStats: {
    name: string
    verifications: number
    successRate: number
  }[]
  locationStats: {
    name: string
    verifications: number
    successRate: number
  }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [activeChart, setActiveChart] = useState<'overview' | 'department' | 'location'>('overview')

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const mockData: AnalyticsData = {
        period: timeRange === '7d' ? 'Last 7 Days' : 
                timeRange === '30d' ? 'Last 30 Days' :
                timeRange === '90d' ? 'Last 90 Days' : 'Last Year',
        verifications: timeRange === '7d' ? 1247 : 
                      timeRange === '30d' ? 5489 :
                      timeRange === '90d' ? 16432 : 65728,
        successRate: 0.968,
        averageResponse: 1240,
        uniqueStudents: timeRange === '7d' ? 845 : 
                       timeRange === '30d' ? 3247 :
                       timeRange === '90d' ? 9876 : 12847,
        peakHours: ['08:00-09:00', '12:00-13:00', '15:00-16:00'],
        departmentStats: [
          { name: 'Computer Science', verifications: 1247, successRate: 0.98 },
          { name: 'Electrical Engineering', verifications: 987, successRate: 0.96 },
          { name: 'Mechanical Engineering', verifications: 856, successRate: 0.95 },
          { name: 'Civil Engineering', verifications: 723, successRate: 0.97 },
          { name: 'Business Administration', verifications: 645, successRate: 0.94 },
        ],
        locationStats: [
          { name: 'Main Gate', verifications: 2345, successRate: 0.97 },
          { name: 'Library', verifications: 1876, successRate: 0.96 },
          { name: 'Science Building', verifications: 1567, successRate: 0.95 },
          { name: 'Exam Hall A', verifications: 1234, successRate: 0.98 },
          { name: 'Cafeteria', verifications: 987, successRate: 0.94 },
        ]
      }
      
      setData(mockData)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) {
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
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">System Analytics</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <Button variant="outline" className="flex items-center justify-center space-x-2 text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Total Verifications</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {data.verifications.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1 truncate">+12.4% from previous</p>
            </div>
            <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0 ml-2" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Success Rate</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {(data.successRate * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-green-600 mt-1 truncate">+2.1% improvement</p>
            </div>
            <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600 flex-shrink-0 ml-2" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Avg. Response</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {data.averageResponse}ms
              </p>
              <p className="text-xs text-green-600 mt-1 truncate">-8.7% faster</p>
            </div>
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600 flex-shrink-0 ml-2" />
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-600 truncate">Unique Students</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
                {data.uniqueStudents.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1 truncate">+5.2% active users</p>
            </div>
            <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-orange-600 flex-shrink-0 ml-2" />
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Chart Navigation */}
        <Card className="lg:col-span-1">
          <div className="p-3 sm:p-4">
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Analysis Views</h3>
            <div className="space-y-1 sm:space-y-2">
              <button
                onClick={() => setActiveChart('overview')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm ${
                  activeChart === 'overview'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                📊 Overview Metrics
              </button>
              <button
                onClick={() => setActiveChart('department')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm ${
                  activeChart === 'department'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                🎓 Department Analysis
              </button>
              <button
                onClick={() => setActiveChart('location')}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-colors text-xs sm:text-sm ${
                  activeChart === 'location'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                📍 Location Analysis
              </button>
            </div>

            {/* Peak Hours */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Peak Usage Hours</h4>
              <div className="space-y-1 sm:space-y-2">
                {data.peakHours.map((hour, index) => (
                  <div key={index} className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-600 truncate flex-1 mr-2">{hour}</span>
                    <span className="font-medium text-gray-900 whitespace-nowrap">High Activity</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Chart Content */}
        <Card className="lg:col-span-2">
          <div className="p-3 sm:p-4 lg:p-6">
            {activeChart === 'overview' && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Verification Overview</h3>
                <div className="space-y-4 sm:space-y-6">
                  {/* Mock Chart */}
                  <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
                    <div className="text-center text-gray-500">
                      <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
                      <p className="text-sm sm:text-base">Verification Trends Chart</p>
                      <p className="text-xs sm:text-sm">(Chart visualization would appear here)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl">
                      <p className="text-xs sm:text-sm text-green-600">Successful</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-700">
                        {Math.round(data.verifications * data.successRate).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-red-50 rounded-lg sm:rounded-xl">
                      <p className="text-xs sm:text-sm text-red-600">Failed</p>
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-700">
                        {Math.round(data.verifications * (1 - data.successRate)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeChart === 'department' && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Department Performance</h3>
                <div className="space-y-3 sm:space-y-4">
                  {data.departmentStats.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl">
                      <div className="min-w-0 flex-1 mr-3">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{dept.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{dept.verifications} verifications</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-green-600 text-sm sm:text-base">{(dept.successRate * 100).toFixed(1)}%</p>
                        <p className="text-xs text-gray-600 hidden sm:block">Success rate</p>
                        <p className="text-xs text-gray-600 sm:hidden">Rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeChart === 'location' && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Location Performance</h3>
                <div className="space-y-3 sm:space-y-4">
                  {data.locationStats.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl">
                      <div className="min-w-0 flex-1 mr-3">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{location.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{location.verifications} verifications</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-green-600 text-sm sm:text-base">{(location.successRate * 100).toFixed(1)}%</p>
                        <p className="text-xs text-gray-600 hidden sm:block">Success rate</p>
                        <p className="text-xs text-gray-600 sm:hidden">Rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}