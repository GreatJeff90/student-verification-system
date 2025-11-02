// app/admin/security/page.tsx
'use client'
import { useState, useEffect } from 'react'
import Card from '../../../components/UI/Card'
import Button from '../../../components/UI/Button'
import { Shield, Lock, Eye, EyeOff, Key, Users, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface SecurityEvent {
  id: string
  type: 'login' | 'failed_attempt' | 'password_change' | 'system_alert'
  description: string
  timestamp: string
  severity: 'low' | 'medium' | 'high'
  user?: string
  ipAddress: string
}

interface SecuritySettings {
  requireTwoFactor: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  passwordExpiry: number
  ipWhitelist: string[]
  auditLogRetention: number
  enableBruteForceProtection: boolean
}

export default function SecurityPage() {
  const [settings, setSettings] = useState<SecuritySettings>({
    requireTwoFactor: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    auditLogRetention: 365,
    enableBruteForceProtection: true
  })
  const [events, setEvents] = useState<SecurityEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [newIp, setNewIp] = useState('')
  const [expandedSections, setExpandedSections] = useState({
    settings: true,
    events: true,
    status: true
  })

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    try {
      // Mock API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockEvents: SecurityEvent[] = [
        {
          id: '1',
          type: 'failed_attempt',
          description: 'Multiple failed login attempts',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          severity: 'high',
          user: 'admin@uniport.edu.ng',
          ipAddress: '192.168.1.100'
        },
        {
          id: '2',
          type: 'login',
          description: 'Successful admin login',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          severity: 'low',
          user: 'admin@uniport.edu.ng',
          ipAddress: '192.168.1.50'
        },
        {
          id: '3',
          type: 'system_alert',
          description: 'Unusual verification pattern detected',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          severity: 'medium',
          ipAddress: 'N/A'
        }
      ]
      
      setEvents(mockEvents)
    } catch (error) {
      console.error('Failed to load security data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addIpToWhitelist = () => {
    if (newIp && !settings.ipWhitelist.includes(newIp)) {
      setSettings({
        ...settings,
        ipWhitelist: [...settings.ipWhitelist, newIp]
      })
      setNewIp('')
    }
  }

  const removeIpFromWhitelist = (ip: string) => {
    setSettings({
      ...settings,
      ipWhitelist: settings.ipWhitelist.filter(i => i !== ip)
    })
  }

  const handleSaveSettings = async () => {
    // Save settings to API
    alert('Security settings updated successfully!')
  }

  const getSeverityColor = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Security Center</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage security settings and monitor system activity</p>
        </div>
        <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
          Save Security Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Security Settings - Main Column */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card className="overflow-hidden">
            {/* Collapsible Header */}
            <button
              onClick={() => toggleSection('settings')}
              className="w-full flex items-center justify-between p-4 sm:p-6 text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-gray-600 text-sm">Configure system security preferences</p>
                </div>
              </div>
              {expandedSections.settings ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedSections.settings && (
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
                {/* Settings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({
                        ...settings,
                        sessionTimeout: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="5"
                      max="480"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings({
                        ...settings,
                        maxLoginAttempts: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Expiry (days)
                    </label>
                    <input
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => setSettings({
                        ...settings,
                        passwordExpiry: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="30"
                      max="365"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Audit Log Retention (days)
                    </label>
                    <input
                      type="number"
                      value={settings.auditLogRetention}
                      onChange={(e) => setSettings({
                        ...settings,
                        auditLogRetention: parseInt(e.target.value)
                      })}
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="30"
                      max="1095"
                    />
                  </div>
                </div>

                {/* Toggle Settings */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-xl">
                    <div className="flex-1 mr-4">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">Two-Factor Authentication</p>
                      <p className="text-xs sm:text-sm text-gray-600">Require 2FA for admin access</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.requireTwoFactor}
                      onChange={(e) => setSettings({
                        ...settings,
                        requireTwoFactor: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-xl">
                    <div className="flex-1 mr-4">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">Brute Force Protection</p>
                      <p className="text-xs sm:text-sm text-gray-600">Automatically block suspicious activity</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.enableBruteForceProtection}
                      onChange={(e) => setSettings({
                        ...settings,
                        enableBruteForceProtection: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                </div>

                {/* IP Whitelist */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    IP Address Whitelist
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3 mb-3">
                    <input
                      type="text"
                      value={newIp}
                      onChange={(e) => setNewIp(e.target.value)}
                      placeholder="Enter IP address or range"
                      className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button onClick={addIpToWhitelist} variant="outline" className="sm:w-auto">
                      Add IP
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {settings.ipWhitelist.map((ip, index) => (
                      <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <span className="font-mono text-xs sm:text-sm break-all">{ip}</span>
                        <button
                          onClick={() => removeIpFromWhitelist(ip)}
                          className="text-red-600 hover:text-red-800 text-sm ml-2 flex-shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar - Security Events & Status */}
        <div className="space-y-4 sm:space-y-6">
          {/* System Status */}
          <Card>
            <button
              onClick={() => toggleSection('status')}
              className="w-full flex items-center justify-between mb-4"
            >
              <h3 className="font-semibold text-gray-900">System Security Status</h3>
              {expandedSections.status ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            
            {expandedSections.status && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Firewall</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Encryption</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Audit Logging</span>
                  <span className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Threat Detection</span>
                  <span className="flex items-center text-yellow-600 text-sm">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Monitoring
                  </span>
                </div>
              </div>
            )}
          </Card>

          {/* Recent Security Events */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Recent Events</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                View All
              </Button>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {events.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-xl">
                  <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${getSeverityColor(event.severity)}`}>
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 leading-tight">{event.description}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-1 text-xs text-gray-500">
                      <span>{new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {event.user && (
                        <span className="hidden sm:inline">•</span>
                      )}
                      {event.user && <span className="truncate">{event.user}</span>}
                      <span className="hidden sm:inline">•</span>
                      <span className="font-mono">{event.ipAddress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-blue-50 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm">
                <Key className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Rotate API Keys
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                View Audit Logs
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-xs sm:text-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Manage Admin Users
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}