
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { supabase, getCurrentUser, getUserProfile } from '@/lib/supabase'
import { Database } from '@/types/database'
import { Skeleton } from '@/components/ui/skeleton'

type UserProfile = Database['public']['Tables']['profiles']['Row']

export function MainLayout() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        const userProfile = await getUserProfile(currentUser.id)
        setProfile(userProfile)
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

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

  if (!user || !profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground">Você precisa estar logado para acessar o sistema.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar userRole={profile.role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={{
            name: profile.name,
            email: profile.email,
            role: profile.role,
            avatar: profile.avatar_url
          }}
          onLogout={handleLogout}
        />
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
