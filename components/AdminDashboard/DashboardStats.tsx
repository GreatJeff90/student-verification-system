// components/AdminDashboard/DashboardStats.tsx
import { Users, Camera, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react'
import Card from '../UI/Card'

interface StatCard {
  label: string
  value: string
  change: string
  icon: React.ReactNode
  trend: 'up' | 'down'
  description: string
}

export default function DashboardStats() {
  const stats: StatCard[] = [
    { 
      label: 'Total Students', 
      value: '12,847', 
      change: '+12.4%', 
      trend: 'up',
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: 'Registered in system'
    },
    { 
      label: 'Verifications Today', 
      value: '1,247', 
      change: '+5.2%', 
      trend: 'up',
      icon: <Camera className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: 'Successful verifications'
    },
    { 
      label: 'Success Rate', 
      value: '96.8%', 
      change: '+1.3%', 
      trend: 'up',
      icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: 'Accuracy rate'
    },
    { 
      label: 'Failed Attempts', 
      value: '42', 
      change: '-8.7%', 
      trend: 'down',
      icon: <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: 'Today\'s failures'
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} hover className="p-4 sm:p-6 group">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className={`p-2 sm:p-3 rounded-xl ${
              index === 0 ? 'bg-blue-100 text-blue-600' :
              index === 1 ? 'bg-green-100 text-green-600' :
              index === 2 ? 'bg-emerald-100 text-emerald-600' :
              'bg-red-100 text-red-600'
            } group-hover:scale-110 transition-transform duration-200`}>
              {stat.icon}
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-xs sm:text-sm">{stat.change}</span>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-base sm:text-lg font-semibold text-gray-700">{stat.label}</p>
            <p className="text-xs sm:text-sm text-gray-500">{stat.description}</p>
          </div>

          {/* Progress bar for success rate */}
          {stat.label === 'Success Rate' && (
            <div className="mt-3 sm:mt-4">
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-emerald-500 h-1.5 sm:h-2 rounded-full transition-all duration-1000" 
                  style={{ width: stat.value }}
                ></div>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}