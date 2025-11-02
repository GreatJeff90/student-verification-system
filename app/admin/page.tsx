// app/admin/page.tsx
import DashboardStats from '../../components/AdminDashboard/DashboardStats'
import RecentActivity from '../../components/AdminDashboard/RecentActivity'
import SystemOverview from '../../components/AdminDashboard/SystemOverview'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Welcome to the UniPort Student Verification System admin panel
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-600">Last updated</p>
          <p className="text-sm font-medium text-gray-900">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Activity */}
        <div className="xl:col-span-2">
          <RecentActivity />
        </div>

        {/* System Overview */}
        <div className="xl:col-span-1">
          <SystemOverview />
        </div>
      </div>
    </div>
  )
}