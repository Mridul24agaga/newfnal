'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import DashboardLayout from './DashboardLayout'

type OnboardingData = {
  startupName: string
  industry: string
  name: string
  role: string
  email: string
  website: string
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push('/auth-form')
      }
    }

    const checkOnboarding = () => {
      const onboardingCompleted = localStorage.getItem('onboardingCompleted')
      if (onboardingCompleted !== 'true') {
        router.push('/onboarding')
      } else {
        const data = localStorage.getItem('onboardingData')
        if (data) {
          setOnboardingData(JSON.parse(data))
        }
      }
    }

    getUser()
    checkOnboarding()
  }, [router, supabase.auth])

  if (!user || !onboardingData) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  }

  return (
    <DashboardLayout user={user}>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome to your Dashboard, {onboardingData.name}!</h2>
        <p className="text-gray-600 mb-4">Here's a summary of your startup information:</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Startup Name</p>
            <p className="text-lg text-gray-800">{onboardingData.startupName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Industry</p>
            <p className="text-lg text-gray-800">{onboardingData.industry}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Your Role</p>
            <p className="text-lg text-gray-800">{onboardingData.role}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-lg text-gray-800">{onboardingData.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Website</p>
            <p className="text-lg text-gray-800">{onboardingData.website}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

