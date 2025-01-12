'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import DashboardLayout from './DashboardLayout'

interface OnboardingData {
  startupName: string
  industry: string
  name: string
  role: string
  email: string
  website: string
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        await fetchOnboardingData(user.email || '')
      } else {
        router.push('/auth-form')
      }
    }

    getUser()
  }, [router, supabase.auth])

  const fetchOnboardingData = async (email: string) => {
    const { data, error } = await supabase
      .from('onboarding_form')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Error fetching onboarding data:', error)
      router.push('/onboarding')
    } else if (data) {
      setOnboardingData({
        startupName: data.company_name,
        industry: data.industry,
        name: data.name,
        role: data.role,
        email: data.email,
        website: data.website || ''
      })
      setLoading(false)
    } else {
      router.push('/onboarding')
    }
  }

  if (loading) {
    return (
      <DashboardLayout user={user}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout user={user}>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to your Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You have successfully completed the onboarding process.
          </p>
          {onboardingData && (
            <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.role}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Company</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.startupName}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Industry</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.industry}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900">{onboardingData.website}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

