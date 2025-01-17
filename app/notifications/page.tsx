'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import { Bell, CheckCircle, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { User } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface Notification {
  id: string
  title: string
  message: string
  created_at: string
  read: boolean
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthChecking, setIsAuthChecking] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    if (user) {
      fetchNotifications()
      const channel = supabase
        .channel('onboarding_form_changes')
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'onboarding_form' }, handleNotificationUpdate)
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [user])

  async function fetchUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error('Error fetching user:', error)
    } finally {
      setIsAuthChecking(false)
    }
  }

  async function fetchNotifications() {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth-form')
        return
      }

      const { data, error } = await supabase
        .from('onboarding_form')
        .select('notifications')
        .eq('email', session.user.email)
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(error.message || 'Failed to fetch notifications')
      }

      const fetchedNotifications = data?.notifications || []
      setNotifications(fetchedNotifications)
      setUnreadCount(fetchedNotifications.filter((n: Notification) => !n.read).length)
    } catch (error: any) {
      console.error('Error fetching notifications:', error)
      setError(error.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  function handleNotificationUpdate(payload: any) {
    if (payload.new && payload.new.notifications) {
      const updatedNotifications = payload.new.notifications
      setNotifications(updatedNotifications)
      setUnreadCount(updatedNotifications.filter((n: Notification) => !n.read).length)
    }
  }

  async function markAsRead(notificationId: string) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { error } = await supabase.rpc('mark_notification_as_read', {
        p_email: session.user.email,
        p_notification_id: notificationId
      })

      if (error) throw error

      setNotifications(current =>
        current.map(n => n.id === notificationId ? { ...n, read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error: any) {
      console.error('Error marking notification as read:', error)
    }
  }

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <li
      className={`p-4 rounded-lg transition-all duration-300 ease-in-out ${
        notification.read ? 'bg-white' : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500'
      }`}
      onClick={() => markAsRead(notification.id)}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {notification.read ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <Bell className="h-6 w-6 text-orange-500" />
          )}
        </div>
        <div className="ml-3 flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{notification.title}</h2>
          <p className="mt-1 text-gray-600">{notification.message}</p>
          <p className="mt-2 text-sm text-gray-400">
            {new Date(notification.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </li>
  )

  const Content = () => {
    if (isAuthChecking) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      )
    }

    if (!user) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6">
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
              <Lock className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-4">
              To view your notifications, please sign in or create an account. It's quick, easy, and free!
            </p>
          </div>
          <div className="space-y-4">
            <Link
              href="/auth-form"
              className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/auth-form"
              className="w-full bg-white text-orange-500 px-6 py-3 rounded-lg font-medium border-2 border-orange-500 hover:bg-orange-50 transition-colors flex items-center justify-center"
            >
              Create an Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      )
    }

    if (loading) return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )

    if (error) return (
      <div className="text-center py-4 text-red-500">
        <p>Error: {error}</p>
        <p className="text-sm mt-2">Please try refreshing the page or contact support if the problem persists.</p>
      </div>
    )

    return (
      <div className="space-y-6">
        {unreadCount > 0 && (
          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-lg" role="alert">
            <p className="font-bold">You have {unreadCount} unread message{unreadCount > 1 ? 's' : ''}!</p>
            <p>Click on a notification to mark it as read.</p>
          </div>
        )}
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">You have no notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notification: Notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#FBFCFE]">
      <Sidebar user={user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Notifications</h1>
            <Content />
          </div>
        </main>
      </div>
    </div>
  )
}

