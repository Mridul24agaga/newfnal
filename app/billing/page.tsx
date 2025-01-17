'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Check } from 'lucide-react'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

interface PlanData {
  name: string
  price: number
  description: string
  features: string[]
  hostedButtonId: string
}

const plans: Record<string, PlanData> = {
  starter: {
    name: 'Starter',
    price: 149,
    description: '3 email accounts',
    features: [
      '3 email accounts',
      '60,000 credits/yr',
      '1 user',
      'Starter badge on dashboard',
      'Unlimited emails sent',
      'Unlimited campaigns',
      'Unlimited contacts'
    ],
    hostedButtonId: 'DDMCP5NAH9UMW'
  },
  pro: {
    name: 'Pro',
    price: 297,
    description: '10 email accounts',
    features: [
      '10 email accounts',
      '150,000 credits/yr',
      'Unlimited users',
      'Pro badge on dashboard',
      'Backlink progress tracking',
      'Premium campaign templates',
      'Dedicated success manager',
      'Strategy session',
      'Priority support'
    ],
    hostedButtonId: 'PRO_BUTTON_ID' // Replace with actual Pro plan button ID
  },
  scale: {
    name: 'Scale',
    price: 1997,
    description: 'Unlimited everything',
    features: [
      'Unlimited everything',
      '5 guaranteed backlinks/month',
      'Get 100% of your time back',
      'Scale badge on dashboard',
      'Advanced backlink progress tracking',
      'White-glove onboarding',
      'Private Slack channel access',
      'Account & email setup',
      'Dedicated SEO Specialist Services'
    ],
    hostedButtonId: 'SCALE_BUTTON_ID' // Replace with actual Scale plan button ID
  }
}

export default function PricingSection() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      }
    }

    getUser()
  }, [supabase.auth])

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).paypal && user) {
      Object.entries(plans).forEach(([planKey, plan]) => {
        const container = document.getElementById(`paypal-button-${plan.hostedButtonId}`)
        if (container) {
          // Clear existing buttons
          container.innerHTML = ''
          // Render new hosted button
          ;(window as any).paypal.HostedButtons({
            hostedButtonId: plan.hostedButtonId,
            onApprove: () => {
              handlePaymentSuccess(planKey)
            },
          }).render(container)
        }
      })
    }
  }, [user])

  const handlePaymentSuccess = async (planKey: string) => {
    setLoading(true)
    try {
      // Update the plan in onboarding_form
      const { error: updateError } = await supabase
        .from('onboarding_form')
        .update({ plan_name: planKey })
        .eq('email', user.email)

      if (updateError) {
        throw updateError
      }

      // Record the payment
      const { error: paymentError } = await supabase
        .from('payment_history')
        .insert({
          user_id: user.id,
          amount: plans[planKey].price,
          currency: 'USD',
          payment_method: 'PayPal',
          status: 'completed',
          plan_name: planKey
        })

      if (paymentError) {
        console.error('Error recording payment:', paymentError)
      }

      alert(`Successfully subscribed to ${plans[planKey].name} plan!`)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating plan:', error)
      alert('There was an error processing your subscription. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Script 
        src="https://www.paypal.com/sdk/js?client-id=BAAkrqzKloQIq4Fl5kq35mzMBy6IytVlaxJJSJoPcY2WSWDv_L_sY1StNeuHsX9ZsnMtTdjMjzgRxMSfh4&components=hosted-buttons&disable-funding=venmo&currency=USD"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('PayPal SDK script loaded')
        }}
      />
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Choose your perfect plan
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(plans).map(([planKey, plan]) => (
              <div key={planKey} className="rounded-3xl p-8 ring-1 ring-gray-200">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">{plan.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">${plan.price}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <ul role="list" className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 flex-none text-indigo-600" />
                      <span className="text-sm leading-6 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                {user ? (
                  <div className="mt-8">
                    <div 
                      id={`paypal-button-${plan.hostedButtonId}`} 
                      className="w-full"
                    />
                    {loading && <p className="mt-2 text-center text-sm text-gray-600">Processing your subscription...</p>}
                  </div>
                ) : (
                  <div className="mt-8">
                    <a
                      href="/auth-form"
                      className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign up to subscribe
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

