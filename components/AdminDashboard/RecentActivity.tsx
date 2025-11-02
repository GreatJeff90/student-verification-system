// components/AdminDashboard/RecentActivity.tsx
import Card from '../UI/Card'
import { CheckCircle, XCircle, UserPlus, AlertTriangle, MoreVertical } from 'lucide-react'
import Button from '../UI/Button'

interface Activity {
  id: string
  student: string
  matricNumber: string
  action: string
  time: string
  status: 'success' | 'failed' | 'warning' | 'info'
  location: string
  confidence?: number
}

export default function RecentActivity() {
  const activities: Activity[] = [
    { 
      id: '1', 
      student: 'John Chukwuma', 
      matricNumber: 'U2019/3045012',
      action: 'Identity verified', 
      time: '2 minutes ago', 
      status: 'success',
      location: 'Main Library',
      confidence: 0.96
    },
    { 
      id: '2', 
      student: 'Jane Okoro', 
      matricNumber: 'U2020/2015006',
      action: 'Verification failed', 
      time: '5 minutes ago', 
      status: 'failed',
      location: 'Science Building',
      confidence: 0.45
    },
    { 
      id: '3', 
      student: 'Mike Adekunle', 
      matricNumber: 'U2018/1042033',
      action: 'Identity verified', 
      time: '12 minutes ago', 
      status: 'success',
      location: 'Exam Hall A',
      confidence: 0.92
    },
    { 
      id: '4', 
      student: 'Sarah Bello', 
      matricNumber: 'U2021/3018077',
      action: 'New student registration', 
      time: '25 minutes ago', 
      status: 'info',
      location: 'Admin Office'
    },
    { 
      id: '5', 
      student: 'David Okafor', 
      matricNumber: 'U2019/2045099',
      action: 'Multiple failed attempts', 
      time: '1 hour ago', 
      status: 'warning',
      location: 'Campus Gate',
      confidence: 0.38
    },
  ]

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info':
        return <UserPlus className="w-4 h-4 text-blue-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: Activity['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'failed':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <Card variant="elevated">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-gray-600 mt-1 text-sm">Latest verification attempts and system events</p>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          View All
        </Button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className={`flex items-start justify-between p-3 sm:p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${getStatusColor(activity.status)}`}
          >
            <div className="flex items-start space-x-3 flex-1 min-w-0">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(activity.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                  <p className="font-medium text-gray-900 truncate text-sm sm:text-base">{activity.student}</p>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full hidden sm:inline-block">
                    {activity.matricNumber}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{activity.action}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <span className="text-xs text-gray-500 flex items-center">
                    📍 {activity.location}
                  </span>
                  {activity.confidence && (
                    <span className={`text-xs font-medium ${
                      activity.confidence > 0.8 ? 'text-green-600' : 
                      activity.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      Confidence: {(activity.confidence * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                {/* Mobile-only matric number */}
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full sm:hidden mt-2 inline-block">
                  {activity.matricNumber}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0 ml-2">
              <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap hidden sm:block">
                {activity.time}
              </span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile time display */}
            <div className="sm:hidden w-full mt-2">
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2 sm:gap-0">
          <span className="text-gray-600 text-center sm:text-left">Showing 5 of 1,247 recent activities</span>
          <Button variant="ghost" size="sm" className="w-full sm:w-auto">
            Load More
          </Button>
        </div>
      </div>
    </Card>
  )
}