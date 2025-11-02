// app/admin/notifications/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Card from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import { Bell, Mail, MessageSquare, Settings, CheckCircle, XCircle, Filter } from 'lucide-react'

interface Notification {
  id: string
  type: 'system' | 'security' | 'verification' | 'maintenance'
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  action?: {
    label: string
    url: string
  }
}

interface NotificationSettings {
  emailEnabled: boolean
  smsEnabled: boolean
  pushEnabled: boolean
  categories: {
    system: boolean
    security: boolean
    verification: boolean
    maintenance: boolean
  }
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
  digestFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly'
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [settings, setSettings] = useState<NotificationSettings>({
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    categories: {
      system: true,
      security: true,
      verification: true,
      maintenance: true
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '06:00'
    },
    digestFrequency: 'realtime'
  })
  const [filter, setFilter] = useState<'all' | 'unread' | 'system' | 'security'>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'security',
          title: 'Multiple Failed Verification Attempts',
          message: '5 consecutive failed verification attempts detected from IP 192.168.1.100',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          read: false,
          priority: 'high',
          action: {
            label: 'Review Logs',
            url: '/admin/logs'
          }
        },
        {
          id: '2',
          type: 'system',
          title: 'System Performance Alert',
          message: 'CPU usage above 80% for the last 15 minutes',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          read: true,
          priority: 'medium'
        },
        {
          id: '3',
          type: 'verification',
          title: 'High Success Rate',
          message: 'Verification success rate is 98.2% for today',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          read: true,
          priority: 'low'
        },
        {
          id: '4',
          type: 'maintenance',
          title: 'Scheduled Maintenance',
          message: 'System maintenance scheduled for Saturday, 2:00 AM - 4:00 AM',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          read: false,
          priority: 'medium'
        }
      ]
      
      setNotifications(mockNotifications)
    } catch (error) {
      console.error('Failed to load notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id))
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notification.read
    if (filter === 'system') return notification.type === 'system'
    if (filter === 'security') return notification.type === 'security'
    return true
  })

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'security': return <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
      case 'system': return <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
      case 'verification': return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
      case 'maintenance': return <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
      default: return <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
    }
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
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">Notifications</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
            Manage system alerts and notification preferences
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button variant="outline" onClick={markAllAsRead} size="sm" className="text-xs sm:text-sm">
            Mark All as Read
          </Button>
          <Button size="sm" className="text-xs sm:text-sm">
            Save Settings
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Notifications List */}
        <Card className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Notifications</h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-2 sm:px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="system">System</option>
                <option value="security">Security</option>
              </select>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 border rounded-lg sm:rounded-xl transition-all duration-200 ${
                  notification.read
                    ? 'bg-white border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getTypeIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm sm:text-base ${
                        notification.read ? 'text-gray-900' : 'text-blue-900'
                      }`}>
                        {notification.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(notification.priority)} self-start sm:self-auto`}>
                      {notification.priority}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mt-3">
                    <span className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleDateString()} • {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex items-center space-x-2 flex-wrap gap-1">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap"
                        >
                          Mark Read
                        </button>
                      )}
                      {notification.action && (
                        <Button variant="ghost" size="sm" className="text-xs">
                          <a href={notification.action.url}>
                            {notification.action.label}
                          </a>
                        </Button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs text-red-600 hover:text-red-800 whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <Bell className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-500 text-sm sm:text-lg">No notifications found</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {filter !== 'all' ? 'Try changing your filter settings' : 'All caught up!'}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Notification Settings */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <div className="flex items-center space-x-3 mb-4 sm:mb-6 p-4 sm:p-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">Notification Settings</h2>
                <p className="text-gray-600 text-xs sm:text-sm">Configure how you receive alerts</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
              <div className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Email Notifications</p>
                  <p className="text-gray-600 text-xs sm:text-sm">Receive alerts via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailEnabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    emailEnabled: e.target.checked
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">SMS Notifications</p>
                  <p className="text-gray-600 text-xs sm:text-sm">Receive critical alerts via SMS</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.smsEnabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    smsEnabled: e.target.checked
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg sm:rounded-xl">
                <div className="min-w-0 flex-1 mr-3">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">Push Notifications</p>
                  <p className="text-gray-600 text-xs sm:text-sm">Browser and mobile push notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.pushEnabled}
                  onChange={(e) => setSettings({
                    ...settings,
                    pushEnabled: e.target.checked
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                />
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Notification Categories</h3>
              <div className="space-y-2 sm:space-y-3">
                {Object.entries(settings.categories).map(([category, enabled]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-700 capitalize">{category} Alerts</span>
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => setSettings({
                        ...settings,
                        categories: {
                          ...settings.categories,
                          [category]: e.target.checked
                        }
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <div className="p-4 sm:p-6">
              <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">Notification Stats</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-800">Total Notifications</span>
                  <span className="font-medium text-blue-900">{notifications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Unread</span>
                  <span className="font-medium text-blue-900">
                    {notifications.filter(n => !n.read).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">High Priority</span>
                  <span className="font-medium text-blue-900">
                    {notifications.filter(n => n.priority === 'high').length}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}