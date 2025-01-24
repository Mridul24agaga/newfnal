'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingForm from './OnboardingForm'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Loader2 } from 'lucide-react'

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/auth-form')
          return
        }

        const { data, error } = await supabase
          .from('onboarding_form')
          .select('onboarded')
          .eq('email', user.email)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking onboarding status:', error)
          setError('Error checking onboarding status. Please try again.')
          return
        }

        if (data && data.onboarded) {
          router.push('/dashboard')
        } else {
          setShowForm(true)
        }
      } catch (error) {
        console.error('Unexpected error during onboarding check:', error)
        setError('An unexpected error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    checkOnboardingStatus()
  }, [router, supabase])

  const handleOnboardingComplete = async (formData: any) => {
    try {
      setLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

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
        console.error('Error saving onboarding data:', error)
        setError(`Error saving onboarding data: ${error.message}`)
        return
      }

      router.push('/dashboard')
    } catch (error: any) {
      console.error('Error saving onboarding data:', error)
      setError(`Error saving onboarding data: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const getStepImage = () => {
    switch (currentStep) {
      case 0:
        return "/placeholder.svg?height=500&width=500"
      case 1:
        return "/placeholder.svg?height=500&width=500"
      case 2:
        return "/placeholder.svg?height=500&width=500"
      default:
        return "/placeholder.svg?height=500&width=500"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      ) : showForm ? (
        <>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl">
              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              <OnboardingForm onComplete={handleOnboardingComplete} setCurrentStep={setCurrentStep} />
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-1 relative bg-orange-50">
            <Image
              src={getStepImage()}
              alt="Onboarding step illustration"
              width={500}
              height={500}
              objectFit="contain"
              className="p-12"
            />
          </div>
        </>
      ) : null}
    </div>
  )
}

