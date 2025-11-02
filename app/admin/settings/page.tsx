// app/admin/settings/page.tsx
'use client'
import { useState } from 'react'
import Card from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import { Save, Shield, Bell, Cpu, Database, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'

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
  const [showMobileMenu, setShowMobileMenu] = useState(false)

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

  const currentTab = tabs.find(tab => tab.id === activeTab)

  return (
    <div className="space-y-4 sm:space-y-6 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Configure system preferences and security settings</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto justify-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <Button onClick={handleSave} loading={saving} className="w-full sm:w-auto justify-center">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Mobile Tab Selector */}
        <div className="lg:hidden">
          <Card className="p-0 overflow-hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center space-x-3">
                {currentTab && (
                  <>
                    <currentTab.icon className="w-5 h-5" />
                    <span className="font-medium text-gray-900">{currentTab.label}</span>
                  </>
                )}
              </div>
              {showMobileMenu ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {showMobileMenu && (
              <nav className="border-t border-gray-200">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any)
                        setShowMobileMenu(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            )}
          </Card>
        </div>

        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block lg:w-1/4">
          <Card>
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
        </div>

        {/* Settings Content */}
        <div className="lg:w-3/4">
          <Card>
            <div className="p-4 sm:p-6">
              {activeTab === 'verification' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Verification Settings</h2>
                  </div>
                  
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      Higher values increase security but may cause more false rejections. Recommended: 80-90%
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="10"
                        max="300"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-xl">
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
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Enable liveness detection
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        Prevents photo spoofing by requiring live facial movement
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="5"
                        max="480"
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-xl">
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
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5 flex-shrink-0"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Require two-factor authentication
                      </label>
                      <p className="text-sm text-gray-500 mt-1">
                        Additional security layer for admin access
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex-1 mr-4">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Email Notifications</p>
                        <p className="text-sm text-gray-600 mt-1">Receive system alerts via email</p>
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
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 flex-shrink-0"
                      />
                    </div>

                    <div className="flex items-start justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex-1 mr-4">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">SMS Notifications</p>
                        <p className="text-sm text-gray-600 mt-1">Receive critical alerts via SMS</p>
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
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 flex-shrink-0"
                      />
                    </div>

                    <div className="flex items-start justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex-1 mr-4">
                        <p className="font-medium text-gray-900 text-sm sm:text-base">Failed Attempt Alerts</p>
                        <p className="text-sm text-gray-600 mt-1">Get notified of failed verification attempts</p>
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
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 flex-shrink-0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'system' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Cpu className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
                  </div>
                  
                  <div className="flex items-start justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex-1 mr-4">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">Maintenance Mode</p>
                      <p className="text-sm text-gray-600 mt-1">Put system in maintenance mode</p>
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
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 flex-shrink-0"
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="error">Error</option>
                      <option value="warn">Warning</option>
                      <option value="info">Info</option>
                      <option value="debug">Debug</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}