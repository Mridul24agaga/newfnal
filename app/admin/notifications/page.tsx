'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface OnboardingUser {
  email: string
}

export default function AdminNotifications() {
  const [users, setUsers] = useState<OnboardingUser[]>([])
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setIsLoading(true)
    setError(null)
    try {
      console.log('Fetching users...')
      const { data, error } = await supabase
        .from('onboarding_form')
        .select('email')

      if (error) {
        throw error
      }

      if (data) {
        console.log('Users fetched successfully:', data)
        setUsers(data)
      } else {
        console.log('No users found')
        setUsers([])
      }
    } catch (error: any) {
      console.error('Error fetching users:', error.message || error)
      setError('Failed to fetch users. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!selectedUser || !title || !message) {
      setStatus('Please fill in all fields')
      return
    }

    try {
      const { data, error } = await supabase.rpc('add_notification', {
        p_email: selectedUser,
        p_title: title,
        p_message: message
      })

      if (error) throw error

      setStatus('Notification sent successfully')
      setTitle('')
      setMessage('')
      setSelectedUser('')
    } catch (error: any) {
      console.error('Error sending notification:', error)
      setStatus(`Failed to send notification: ${error.message || 'Unknown error'}`)
    }
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Send Notification</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient
          </label>
          <select
            id="recipient"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a user</option>
            {users.map((user, index) => (
              <option key={index} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Notification title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Notification
        </button>
      </form>
      {status && (
        <p className={`mt-4 p-2 text-center rounded ${
          status.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {status}
        </p>
      )}
    </div>
  )
}

