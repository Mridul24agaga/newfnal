import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { recipientId, title, message } = await req.json()
    const supabase = createRouteHandlerClient({ cookies })

    // Verify recipient exists in onboarding_form
    const { data: recipient } = await supabase
      .from('onboarding_form')
      .select('uuid, notifications_enabled, notification_preferences')
      .eq('uuid', recipientId)
      .single()

    if (!recipient) {
      return NextResponse.json(
        { error: 'Recipient not found' },
        { status: 404 }
      )
    }

    // Check if notifications are enabled for this user
    if (!recipient.notifications_enabled || !recipient.notification_preferences.in_app) {
      return NextResponse.json(
        { error: 'Notifications are disabled for this user' },
        { status: 400 }
      )
    }

    // Create notification
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        recipient_id: recipientId,
        title,
        message
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

