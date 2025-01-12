export type FormData = {
    role: string
    companyName: string
    industry: string
    name: string
    email: string
  }
  
  export type OnboardingFormProps = {
    onComplete: (data: FormData) => void
    setCurrentStep: (step: number) => void
    userId: string
  }
  
  