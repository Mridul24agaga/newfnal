import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function usePayPalSubscription() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubscriptionSuccess = async (details: any, planName: string) => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User not found')
      }

      const { error: planError } = await supabase
        .from('user_plans')
        .upsert({ user_id: user.id, plan_name: planName, subscription_id: details.subscriptionID })

      if (planError) {
        throw planError
      }

      const { error: paymentError } = await supabase
        .from('payment_history')
        .insert({
          user_id: user.id,
          amount: details.amount,
          currency: details.currency,
          payment_method: 'PayPal',
          transaction_id: details.orderID,
          status: 'completed',
          plan_name: planName
        })

      if (paymentError) {
        throw paymentError
      }

      alert(`Successfully subscribed to ${planName} plan!`)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error processing subscription:', error)
      alert('There was an error processing your subscription. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return { handleSubscriptionSuccess, loading }
}

