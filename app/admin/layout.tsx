// app/admin/layout.tsx
'use client'
import { ReactNode, useState } from 'react'
import AdminSidebar from '../../components/UI/AdminSidebar'
import AdminHeader from '../../components/UI/AdminHeader'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader 
          onMenuToggle={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}