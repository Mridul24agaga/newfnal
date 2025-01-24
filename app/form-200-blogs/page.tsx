"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { X } from "lucide-react"

export default function SaasForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const supabase = createClient(
    "https://btsviospebmgeezlwztr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0c3Zpb3NwZWJtZ2Vlemx3enRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NjkwODUsImV4cCI6MjA0OTE0NTA4NX0.V96q01xxjGM-rGh_CVgT7k3JoRjXyf6C-5KzL6TkmNw",
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setMessage("")

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const submissionData = {
      ...data,
      expertChoice: "expert", // Default to expert choice
    }

    try {
      const { error } = await supabase.from("saas_submissions").insert([submissionData])

      if (error) throw error

      setShowSuccessPopup(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/auth-form")
      }, 7000)
    } catch (error: unknown) {
      console.error("Submission Error:", JSON.stringify(error, null, 2))
      console.error("Submitted Data:", JSON.stringify(submissionData, null, 2))
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`)
      } else if (typeof error === "object" && error !== null && "message" in error) {
        setMessage(`Error: ${(error as { message: string }).message}`)
      } else {
        setMessage("An unknown error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Success Popup Component
  const SuccessPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative animate-fade-in">
        <button
          onClick={() => setShowSuccessPopup(false)}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Submission Successful!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your submission. You will be redirected to the dashboard in a few seconds.
          </p>
          <p className="text-sm text-gray-500">
            You can Sign Up using the email address you provided to access your reports and messages. NOTE: PLEASE NOTE THAT FOR THE BLOG SERVICE WE WILL REACH OUT TO YOU PERSONALLY AND TAKE ALL THE INFORMATION. THESE BLOGS ARE NOT AI GENERATED. A REAL HUMAN WRITES IT. THANKS
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 p-4 relative">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[length:40px_40px]" />

      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] w-full max-w-md animate-fade-in relative z-10 border border-white/20">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 tracking-tight">SaaS Submission Form</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Name"
            required
            className="w-full px-4 py-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-black bg-white/50 backdrop-blur-sm transition-all placeholder:text-gray-400"
          />
          <input
            name="saas_name"
            placeholder="SaaS Name"
            required
            className="w-full px-4 py-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-black bg-white/50 backdrop-blur-sm transition-all placeholder:text-gray-400"
          />
          <input
            name="saas_link"
            placeholder="SaaS Link"
            type="url"
            required
            className="w-full px-4 py-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-black bg-white/50 backdrop-blur-sm transition-all placeholder:text-gray-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            className="w-full px-4 py-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-black bg-white/50 backdrop-blur-sm transition-all h-24 resize-none placeholder:text-gray-400"
          ></textarea>
          <input
            name="email"
            placeholder="Email ID"
            type="email"
            required
            className="w-full px-4 py-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-black bg-white/50 backdrop-blur-sm transition-all placeholder:text-gray-400"
          />
          <textarea
            name="comments"
            placeholder="Comments/Remarks"
            className="w-full px-4 py-3 border border-orange-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-black bg-white/50 backdrop-blur-sm transition-all h-24 resize-none placeholder:text-gray-400"
          ></textarea>
          <p className="text-sm text-gray-600 italic">
            Note: You'll be able to login to the dashboard using this email address to access your reports and messages.
          </p>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 px-4 rounded-xl hover:from-orange-500 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-all disabled:opacity-50 relative shadow-lg shadow-orange-500/25 font-medium text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="opacity-0">Submit</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {message && (
          <p
            className={`mt-6 text-center text-lg font-medium ${message.includes("error") ? "text-red-500" : "text-green-500"}`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Success Popup */}
      {showSuccessPopup && <SuccessPopup />}
    </div>
  )
}

