// app/admin/settings/page.tsx
'use client'
import { useState } from 'react'
import Card from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import { Save, Shield, Bell, Cpu, Database, RefreshCw } from 'lucide-react'

interface SystemSettings {
  verification: {
    confidenceThreshold: number
    maxAttempts: number
    timeoutDuration: number
    enableLivenessCheck: boolean
  }
  security: {
    autoLogout: number
    sessionTimeout: number
    requireTwoFactor: boolean
    ipWhitelist: string[]
  }
  notifications: {
    emailEnabled: boolean
    smsEnabled: boolean
    failedAttempts: boolean
    systemAlerts: boolean
    dailyReports: boolean
  }
  system: {
    maintenanceMode: boolean
    dataRetention: number
    backupFrequency: string
    logLevel: 'error' | 'warn' | 'info' | 'debug'
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    verification: {
      confidenceThreshold: 0.85,
      maxAttempts: 3,
      timeoutDuration: 30,
      enableLivenessCheck: true
    },
    security: {
      autoLogout: 30,
      sessionTimeout: 60,
      requireTwoFactor: false,
      ipWhitelist: ['192.168.1.0/24']
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      failedAttempts: true,
      systemAlerts: true,
      dailyReports: false
    },
    system: {
      maintenanceMode: false,
      dataRetention: 365,
      backupFrequency: 'daily',
      logLevel: 'info'
    }
  })
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<'verification' | 'security' | 'notifications' | 'system'>('verification')

  const handleSave = async () => {
    setSaving(true)
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Show success message
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      // Reset to default settings
      setSettings({
        verification: {
          confidenceThreshold: 0.85,
          maxAttempts: 3,
          timeoutDuration: 30,
          enableLivenessCheck: true
        },
        security: {
          autoLogout: 30,
          sessionTimeout: 60,
          requireTwoFactor: false,
          ipWhitelist: ['192.168.1.0/24']
        },
        notifications: {
          emailEnabled: true,
          smsEnabled: false,
          failedAttempts: true,
          systemAlerts: true,
          dailyReports: false
        },
        system: {
          maintenanceMode: false,
          dataRetention: 365,
          backupFrequency: 'daily',
          logLevel: 'info'
        }
      })
    }
  }

  const tabs = [
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System', icon: Cpu }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-2">Configure system preferences and security settings</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleSave} loading={saving} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </Card>

        {/* Settings Content */}
        <Card className="lg:col-span-3">
          {activeTab === 'verification' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Verification Settings</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Confidence Threshold: {(settings.verification.confidenceThreshold * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.05"
                  value={settings.verification.confidenceThreshold}
                  onChange={(e) => setSettings({
                    ...settings,
                    verification: {
                      ...settings.verification,
                      confidenceThreshold: parseFloat(e.target.value)
                    }
                  })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Higher values increase security but may cause more false rejections. Recommended: 80-90%
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Attempts
                  </label>
                  <input
                    type="number"
                    value={settings.verification.maxAttempts}
                    onChange={(e) => setSettings({
                      ...settings,
                      verification: {
                        ...settings.verification,
                        maxAttempts: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeout Duration (seconds)
                  </label>
                  <input
                    type="number"
                    value={settings.verification.timeoutDuration}
                    onChange={(e) => setSettings({
                      ...settings,
                      verification: {
                        ...settings.verification,
                        timeoutDuration: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="10"
                    max="300"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.verification.enableLivenessCheck}
                  onChange={(e) => setSettings({
                    ...settings,
                    verification: {
                      ...settings.verification,
                      enableLivenessCheck: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Enable liveness detection (prevents photo spoofing)
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto Logout (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.security.autoLogout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        autoLogout: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        sessionTimeout: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="5"
                    max="480"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.security.requireTwoFactor}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: {
                        ...settings.security,
                        requireTwoFactor: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Require two-factor authentication for admin access
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive system alerts via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.emailEnabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        emailEnabled: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive critical alerts via SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.smsEnabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        smsEnabled: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <div>
                    <p className="font-medium text-gray-900">Failed Attempt Alerts</p>
                    <p className="text-sm text-gray-600">Get notified of failed verification attempts</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.failedAttempts}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        failedAttempts: e.target.checked
                      }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Maintenance Mode</p>
                  <p className="text-sm text-gray-600">Put system in maintenance mode</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.system.maintenanceMode}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: {
                      ...settings.system,
                      maintenanceMode: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Retention Period (days)
                </label>
                <input
                  type="number"
                  value={settings.system.dataRetention}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: {
                      ...settings.system,
                      dataRetention: parseInt(e.target.value)
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="30"
                  max="1095"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Log Level
                </label>
                <select
                  value={settings.system.logLevel}
                  onChange={(e) => setSettings({
                    ...settings,
                    system: {
                      ...settings.system,
                      logLevel: e.target.value as any
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="error">Error</option>
                  <option value="warn">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}