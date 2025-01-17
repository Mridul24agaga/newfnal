'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Notification {
  id: string
  title: string
  message: string
  created_at: string
  read: boolean
}

export function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchNotifications()
    subscribeToNotifications()
  }, [])

  async function fetchNotifications() {
    const { data: userData } = await supabase
      .from('onboarding_form')
      .select('uuid')
      .single()

    if (userData) {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('recipient_id', userData.uuid)
        .order('created_at', { ascending: false })

      if (data) {
        setNotifications(data)
        setUnreadCount(data.filter(n => !n.read).length)
      }
    }
  }

  function subscribeToNotifications() {
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          setNotifications(current => [payload.new as Notification, ...current])
          setUnreadCount(count => count + 1)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }

  async function markAsRead(notificationId: string) {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)

    setNotifications(current =>
      current.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
    setUnreadCount(count => Math.max(0, count - 1))
  }

  return (
    <div className="relative">
      <button 
        className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        Notifications
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg max-h-96 overflow-y-auto z-50">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No notifications yet</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-200 cursor-pointer ${
                  notification.read ? 'bg-gray-50' : 'bg-white'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <small className="text-xs text-gray-400">
                  {new Date(notification.created_at).toLocaleDateString()}
                </small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

