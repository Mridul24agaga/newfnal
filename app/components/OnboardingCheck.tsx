'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import OnboardingForm from '../onboarding/OnboardingForm'
import AuthForm from '@/app/auth-form/page'

const supabaseUrl = 'https://btsviospebmgeezlwztr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c3Zpb3NwZWJtZ2Vlemx3enRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjkwODUsImV4cCI6MjA0OTE0NTA4NX0.V96q01xxjGM-rGh_CVgT7k3JoRjXyf6C-5KzL6TkmNw'

const supabase = createClient(supabaseUrl, supabaseKey)

export default function OnboardingCheck({ children }: { children: React.ReactNode }) {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      if (user.email) {
        checkOnboardingStatus(user.email)
      } else {
        console.error('User email is undefined')
        setIsOnboarded(false)
      }
    } else {
      setIsOnboarded(null)
    }
  }

  const checkOnboardingStatus = async (email: string) => {
    const { data, error } = await supabase
      .from('onboarding_form')
      .select('onboarded')
      .eq('email', email)
      .single()

    if (error) {
      console.error('Error checking onboarding status:', error)
      setIsOnboarded(false)
    } else {
      setIsOnboarded(data?.onboarded || false)
    }
  }

  const handleOnboardingComplete = async (formData: any) => {
    if (!user || !user.email) {
      console.error('User or user email is undefined')
      return
    }

    const { error } = await supabase
      .from('onboarding_form')
      .upsert({ 
        email: user.email,
        role: formData.role,
        company_name: formData.companyName,
        industry: formData.industry,
        name: formData.name,
        onboarded: true
      })

    if (error) {
      console.error('Error updating onboarding status:', error)
    } else {
      setIsOnboarded(true)
      router.push('/dashboard')
    }
  }

  if (!user) {
    return <AuthForm />
  }

  if (isOnboarded === null) {
    return <div>Loading...</div>
  }

  if (!isOnboarded) {
    return <OnboardingForm onComplete={handleOnboardingComplete} setCurrentStep={(step: number) => {}} />
  }

  return <>{children}</>
}

