
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { DeveloperModeIndicator } from './DeveloperModeIndicator'
import { Skeleton } from '@/components/ui/skeleton'

export function MainLayout() {
  const [loading, setLoading] = useState(true)
  const [developerMode, setDeveloperMode] = useState(false)

  useEffect(() => {
    // Check if developer mode is active
    const devMode = localStorage.getItem('developerMode') === 'true'
    setDeveloperMode(devMode)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 border-r">
          <Skeleton className="h-16 w-full" />
          <div className="p-4 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <Skeleton className="h-16 w-full" />
          <div className="p-6">
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    )
  }

  // In developer mode, use mock user data
  const mockUser = {
    name: 'Desenvolvedor',
    email: 'dev@neuroclinic.com',
    role: 'admin',
    avatar: undefined
  }

  const handleLogout = () => {
    console.log('Logout em modo desenvolvedor')
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar userRole="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={mockUser}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <DeveloperModeIndicator isActive={developerMode} />
          <div className={developerMode ? "mt-4" : ""}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
