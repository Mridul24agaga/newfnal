"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface OnboardingUser {
  email: string
}

// This is the secret password. In a real application, this should be stored securely.
const SECRET_PASSWORD = "MDH^,)ibZhp(w7:"

export default function AdminNotifications() {
  const [users, setUsers] = useState<OnboardingUser[]>([])
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers()
    }
  }, [isAuthenticated])

  async function fetchUsers() {
    try {
      const { data, error } = await supabase.from("onboarding_form").select("email")
      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error("Error fetching users:", error)
      setStatus("Failed to fetch users. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  async function sendEmail(to: string, subject: string, htmlContent: string) {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.NEXT_PUBLIC_BREVO_API_KEY!,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { email: "krissmann@markupxbrands.com", name: "GetMoreBacklinks" },
        to: [{ email: to }],
        subject,
        htmlContent,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to send email")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedUser || !title || !message) {
      setStatus("Please fill in all fields")
      return
    }

    setStatus("Sending notification...")
    try {
      // Add notification to the database
      const { error: notificationError } = await supabase.rpc("add_notification", {
        p_email: selectedUser,
        p_title: title,
        p_message: message,
      })
      if (notificationError) throw notificationError

      // Send email with updated HTML content
      await sendEmail(
        selectedUser,
        "New Notification in Your GetMoreBacklinks Dashboard",
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #F36516; font-size: 24px; text-align: center; margin-bottom: 20px;">New Notification</h2>
          <p style="font-size: 16px; text-align: center; margin-bottom: 30px;">You have a new notification in your GetMoreBacklinks dashboard.</p>
          <div style="text-align: center;">
            <a href="https://getmorebacklinks.org/auth-form" 
               style="background-color: #F36516; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 18px; display: inline-block;">
              View Notification
            </a>
          </div>
          <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #666;">
            <p><a href="getmorebacklinks.org/privacy-policy" style="color: #F36516; text-decoration: none;">Privacy Policy</a> • <a href="https://www.getmorebacklinks.org/terms" style="color: #F36516; text-decoration: none;">Terms & Conditions</a></p>
            <p>© 2025 MarkupX Technologies. All rights reserved.</p>
          </div>
        </div>
      `,
      )

      setStatus("Notification sent successfully")
      setTitle("")
      setMessage("")
      setSelectedUser("")
    } catch (error) {
      console.error("Error sending notification:", error)
      setStatus(`Failed to send notification: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      setStatus("Incorrect password. Please try again.")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Authentication</h1>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F36516] text-white py-2 px-4 rounded-md hover:bg-[#E55505] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F36516]"
          >
            Login
          </button>
        </form>
        {status && <p className="mt-4 p-2 text-center rounded bg-red-100 text-red-800">{status}</p>}
      </div>
    )
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>
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
          className="w-full bg-[#F36516] text-white py-2 px-4 rounded-md hover:bg-[#E55505] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F36516]"
        >
          Send Notification
        </button>
      </form>
      {status && (
        <p
          className={`mt-4 p-2 text-center rounded ${
            status.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  )
}

