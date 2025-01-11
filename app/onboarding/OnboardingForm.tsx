'use client'

import { useState } from 'react'
import { cn } from '@/app/lib/utils'
import { toast } from 'react-hot-toast'

const steps = [
  { name: 'Role', fields: ['role'] },
  { name: 'Company', fields: ['companyName', 'industry'] },
  { name: 'Details', fields: ['name', 'email'] },
]

const roles = [
  'Business Owner',
  'Engineering',
  'IT',
  'Marketing & Marketing Ops',
  'Sales Ops',
  'Customer Support Ops',
  'HR & Recruiting Ops',
  'Project Management',
  'Data Science',
  'Other',
]

const industries = [
  'SaaS',
  'E-commerce',
  'FinTech',
  'HealthTech',
  'EdTech',
  'Other',
]

type FormData = {
  role: string
  companyName: string
  industry: string
  name: string
  email: string
}

type OnboardingFormProps = {
  onComplete: (data: FormData) => void
  setCurrentStep: (step: number) => void
}

export default function OnboardingForm({ onComplete, setCurrentStep }: OnboardingFormProps) {
  const [currentStep, setCurrentStepLocal] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    role: '',
    companyName: '',
    industry: '',
    name: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }))
    handleNext()
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStepLocal((prev) => {
        const newStep = prev + 1
        setCurrentStep(newStep)
        return newStep
      })
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStepLocal((prev) => {
        const newStep = prev - 1
        setCurrentStep(newStep)
        return newStep
      })
    }
  }

  const isStepValid = () => {
    return steps[currentStep].fields.every((field) => formData[field as keyof FormData])
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onComplete(formData)
      toast.success('Onboarding completed successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
      toast.error('There was an error submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex space-x-2">
          {steps.map((step, index) => (
            <div
              key={step.name}
              className={`h-1 flex-1 rounded-full ${
                index <= currentStep ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {currentStep === 0 && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">What's your role?</h1>
            <p className="text-gray-500 mb-8">This helps us personalize your experience.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleSelect(role)}
                  className={cn(
                    "text-left px-4 py-3 rounded-full border text-sm transition-colors",
                    "hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                    formData.role === role
                      ? "border-orange-600 bg-orange-50 text-orange-600"
                      : "border-gray-200 text-gray-600"
                  )}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your company</h1>
            <p className="text-gray-500 mb-8">Help us understand your business better.</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select an industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Almost there!</h1>
            <p className="text-gray-500 mb-8">Just a few more details to get you started.</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex justify-between pt-8">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
          )}
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid() || isSubmitting}
              className={cn(
                "px-6 py-3 text-sm font-medium text-white bg-orange-600 rounded-lg",
                "hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
                (!isStepValid() || isSubmitting) && "opacity-50 cursor-not-allowed"
              )}
            >
              {isSubmitting ? 'Submitting...' : (currentStep === steps.length - 1 ? 'Complete' : 'Continue')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

