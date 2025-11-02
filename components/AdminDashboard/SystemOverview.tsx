// components/AdminDashboard/SystemOverview.tsx
import Card from '../UI/Card'
import { Server, Cpu, Database, Network, Clock, Shield } from 'lucide-react'

interface SystemMetric {
  name: string
  value: string
  status: 'online' | 'warning' | 'error'
  icon: React.ReactNode
  description: string
}

export default function SystemOverview() {
  const metrics: SystemMetric[] = [
    {
      name: 'API Server',
      value: '99.9%',
      status: 'online',
      icon: <Server className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Response time: 124ms'
    },
    {
      name: 'Face Recognition',
      value: '98.2%',
      status: 'online',
      icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Processing: 890ms avg'
    },
    {
      name: 'Database',
      value: '100%',
      status: 'online',
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Queries: 12.4k/min'
    },
    {
      name: 'Network',
      value: '99.7%',
      status: 'online',
      icon: <Network className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: 'Latency: 45ms'
    },
  ]

  const getStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'error':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <Card variant="elevated">
      <div className="flex items-center space-x-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">System Health</h2>
          <p className="text-gray-600 text-xs sm:text-sm">Real-time system metrics</p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`p-1.5 sm:p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                {metric.icon}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm sm:text-base">{metric.name}</p>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-base sm:text-lg font-bold ${
                metric.status === 'online' ? 'text-green-600' :
                metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {metric.value}
              </span>
              <div className={`w-2 h-2 rounded-full mt-1 mx-auto ${
                metric.status === 'online' ? 'bg-green-500' :
                metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Uptime Stats */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>System Uptime</span>
          </div>
          <span className="font-semibold text-gray-900">99.95%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
          <div className="bg-green-500 h-1.5 sm:h-2 rounded-full" style={{ width: '99.95%' }}></div>
        </div>
      </div>
    </Card>
  )
}