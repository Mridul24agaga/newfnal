'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AnalyzerForm } from './analyzer-form'
import Sidebar from '@/app/components/Sidebar'
import Footer from '../components/footer'
import { Menu } from 'lucide-react'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  return (
    <div className="flex h-screen bg-[#FCFAFF]">
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto min-h-[calc(100vh-73px)] flex flex-col">
          <div className="flex justify-between items-center p-4 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </button>
          </div>
          
          <div className="flex-grow flex items-center justify-center px-4">
            <div className="w-full max-w-md">
              <AnalyzerForm />
            </div>
          </div>
          
        </div>
      </main>
    </div>
  )
}

