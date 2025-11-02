// components/UI/AdminSidebar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  Shield,
  BarChart3,
  Bell,
  X
} from 'lucide-react'

interface MenuItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
}

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  // THIS IS WHERE THE menuItems ARRAY GOES ↓
  const menuItems: MenuItem[] = [
    { 
      href: '/admin', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" /> 
    },
    { 
      href: '/admin/students', 
      label: 'Students', 
      icon: <Users className="w-5 h-5" />,
      badge: 1247
    },
    { 
      href: '/admin/logs', 
      label: 'Verification Logs', 
      icon: <FileText className="w-5 h-5" />,
      badge: 89
    },
    { 
      href: '/admin/analytics', 
      label: 'Analytics', 
      icon: <BarChart3 className="w-5 h-5" /> 
    },
    { 
      href: '/admin/notifications', 
      label: 'Notifications', 
      icon: <Bell className="w-5 h-5" />,
      badge: 3  // This shows the notification count in the sidebar
    },
    { 
      href: '/admin/security', 
      label: 'Security', 
      icon: <Shield className="w-5 h-5" /> 
    },
    { 
      href: '/admin/settings', 
      label: 'Settings', 
      icon: <Settings className="w-5 h-5" /> 
    },
  ]
  // END OF menuItems ARRAY ↑

  // Mobile sidebar classes
  const mobileClasses = `
    fixed lg:static inset-y-0 left-0 z-50
    transform transition-transform duration-300 ease-in-out
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0
  `

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`${mobileClasses} w-64 lg:w-64 bg-white/95 lg:bg-white/80 backdrop-blur-md border-r border-gray-200 h-screen sticky top-0 overflow-y-auto`}>
        {/* Logo Section */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="https://www.uniport.edu.ng/wp-content/themes/unipix/assets/images/logo/uniport_logo1.png" 
                alt="University of Port Harcourt"
                className="h-8 lg:h-10 w-auto"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900">UniPort</h2>
                <p className="text-xs text-gray-600 hidden lg:block">Admin System</p>
                <p className="text-xs text-gray-600 lg:hidden">Admin</p>
              </div>
            </div>
            
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    // Close mobile sidebar when a link is clicked
                    if (onClose) {
                      onClose()
                    }
                  }}
                  className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-50 border border-blue-200 text-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`transition-colors ${
                      isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`}>
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full min-w-6 text-center ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* System Status */}
          <div className="mt-6 lg:mt-8 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">System Status</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs opacity-90">All systems operational</p>
            <div className="flex items-center justify-between mt-3 text-xs">
              <span>Uptime: 99.9%</span>
              <span>Users: 1.2k</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Verifications Today</span>
              <span className="font-semibold text-gray-900">156</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-semibold text-green-600">94.8%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Avg. Response</span>
              <span className="font-semibold text-gray-900">1.2s</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}