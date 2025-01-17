import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  console.log('Received webhook:', body)

  const event = JSON.parse(body)

  if (event.event_type === 'BILLING.SUBSCRIPTION.CREATED') {
    console.log('Subscription created:', event)
    const subscriptionId = event.resource.id
    const planId = event.resource.plan_id
    const userId = event.resource.custom_id // Assuming you set the user ID as custom_id when creating the subscription

    // Map PayPal plan ID to your plan names
    const planMap: Record<string, string> = {
      'P-3RX065706M3469222L5IFM4I': 'starter',
      'P-5ML4271244454362XXL5IFNI': 'pro',
      'P-0E979355YA744374PXL5IFQA': 'scale'
    }

    const planName = planMap[planId]

    if (planName) {
      const { error: planError } = await supabase
        .from('user_plans')
        .upsert({ user_id: userId, plan_name: planName, subscription_id: subscriptionId })

      if (planError) {
        console.error('Error updating user plan:', planError)
        return NextResponse.json({ error: 'Failed to update user plan' }, { status: 500 })
      }

      // Record the payment in the payment_history table
      const { error: paymentError } = await supabase
        .from('payment_history')
        .insert({
          user_id: userId,
          amount: event.resource.amount.value,
          currency: event.resource.amount.currency_code,
          payment_method: 'PayPal',
          transaction_id: event.resource.id,
          status: 'completed',
          plan_name: planName
        })

      if (paymentError) {
        console.error('Error recording payment:', paymentError)
        return NextResponse.json({ error: 'Failed to record payment' }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}

