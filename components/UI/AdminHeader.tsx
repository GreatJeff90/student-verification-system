// components/UI/AdminHeader.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, LogOut, User, Search, Menu, X, Home } from 'lucide-react'
import Button from './Button'

interface AdminHeaderProps {
  onMenuToggle?: () => void
  sidebarOpen?: boolean
}

export default function AdminHeader({ onMenuToggle, sidebarOpen }: AdminHeaderProps) {
  const router = useRouter()
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  const handleNotificationClick = () => {
    router.push('/admin/notifications')
  }

  const handleHomeClick = () => {
    router.push('/')
  }

  const handleLogout = () => {
    console.log('Logging out...')
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
      <div className="flex justify-between items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
        {/* Left Section - Logo & Menu Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Home Button - Mobile */}
          <button
            onClick={handleHomeClick}
            className="lg:hidden p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Go to homepage"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img 
              src="https://www.uniport.edu.ng/wp-content/themes/unipix/assets/images/logo/uniport_logo1.png" 
              alt="University of Port Harcourt"
              className="h-6 sm:h-7 lg:h-8 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-sm lg:text-base xl:text-lg font-semibold text-gray-900 leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-600 hidden lg:block">Student Verification System</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-semibold text-gray-900">
                Admin
              </h1>
            </div>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-3 lg:mx-6 xl:mx-8">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search students, logs, settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 text-sm"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 xl:space-x-4">
          {/* Search Toggle - Mobile & Tablet */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Notifications */}
          <button 
            onClick={handleNotificationClick}
            className="relative p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          {/* User Profile - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-600 hidden xl:block">System Administrator</p>
            </div>
            <div className="w-7 h-7 xl:w-8 xl:h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white" />
            </div>
          </div>

          {/* User Profile - Tablet */}
          <div className="hidden sm:block lg:hidden">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
            </div>
          </div>

          {/* User Profile - Mobile */}
          <div className="sm:hidden">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
            </div>
          </div>

          {/* Logout - Desktop */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden lg:flex text-gray-600 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
          </Button>

          {/* Logout - Tablet */}
          <button 
            onClick={handleLogout}
            className="hidden sm:block lg:hidden p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Logout - Mobile */}
          <button 
            onClick={handleLogout}
            className="sm:hidden p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Logout"
          >
            <LogOut className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden px-3 sm:px-4 pb-2 sm:pb-3 border-t border-gray-200 bg-white/95">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search students, logs, settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowMobileSearch(false)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Close search"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  )
}