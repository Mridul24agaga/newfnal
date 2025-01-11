'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import OnboardingForm from './OnboardingForm'
import Image from 'next/image'

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)

  const handleOnboardingComplete = (formData: any) => {
    // Store the onboarding data in localStorage
    localStorage.setItem('onboardingData', JSON.stringify(formData))
    localStorage.setItem('onboardingCompleted', 'true')
    router.push('/dashboard')
  }

  const getStepImage = () => {
    switch (currentStep) {
      case 0:
        return "/role-image.svg"
      case 1:
        return "/company-image.svg"
      case 2:
        return "/details-image.svg"
      default:
        return "/default-image.svg"
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
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
    </div>
  )
}

