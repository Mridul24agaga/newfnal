"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function SaasForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [message, setMessage] = useState("")
  const [expertChoice, setExpertChoice] = useState<string>("expert")
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
      expertChoice: expertChoice,
    }

    try {
      const { error } = await supabase.from("saas_submissions").insert([submissionData])

      if (error) throw error

      setMessage(
        "Submission successful! You will be redirected to the auth page. Please login with the same email you entered here.",
      )
      setIsRedirecting(true)

      // Delay the redirect to show the success message
      setTimeout(() => {
        router.push("/auth-form")
      }, 3000)
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

  useEffect(() => {
    if (isRedirecting) {
      const timer = setTimeout(() => {
        setIsRedirecting(false)
      }, 5000) // Set a timeout to reset isRedirecting after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [isRedirecting])

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] w-full max-w-md animate-fade-in relative z-10 border border-white/20 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Redirecting to Auth Page...</h2>
          <p className="text-gray-600 mb-4">Please login with the same email you entered in the form.</p>
          <div className="w-16 h-16 border-t-4 border-orange-500 border-solid rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

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
          <div className="space-y-3">
            <p className="font-medium text-gray-700">Expert Review:</p>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="expert"
                name="expertChoice"
                value="expert"
                checked={expertChoice === "expert"}
                onChange={(e) => setExpertChoice(e.target.value)}
                className="text-orange-500 focus:ring-orange-400"
              />
              <label htmlFor="expert" className="text-gray-700">
                Let the expert choose the directories
              </label>
            </div>
          </div>
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
            className={`mt-6 text-center text-lg font-medium ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

