"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session) {
          const isOnboarded = await checkOnboardingStatus(session.user.id)
          if (isOnboarded) {
            router.push("/dashboard")
          } else {
            router.push("/onboarding")
          }
        }
      } catch (error) {
        console.error("Error in checkUser:", error)
      }
    }
    checkUser()
  }, [router, supabase.auth])

  const checkOnboardingStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("onboarding_form").select("onboarded").eq("email", userId).single()

      if (error) {
        console.error("Error checking onboarding status:", error.message, error.details, error.hint)
        return false
      }

      return data?.onboarded ?? false
    } catch (error) {
      console.error("Unexpected error in checkOnboardingStatus:", error)
      return false
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)

      let authResult
      if (isLogin) {
        authResult = await supabase.auth.signInWithPassword({
          email,
          password,
        })
      } else {
        authResult = await supabase.auth.signUp({
          email,
          password,
        })
        if (!authResult.error) {
          setIsLogin(true)
          setShowConfirmationPopup(true)
          return
        }
      }

      if (authResult.error) throw authResult.error

      if (authResult.data.user) {
        const isOnboarded = await checkOnboardingStatus(authResult.data.user.id)
        if (isOnboarded) {
          router.push("/dashboard")
        } else {
          router.push("/onboarding")
        }
      }
    } catch (error: any) {
      console.error("Error in handleAuth:", error)
      setError(error.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center text-gray-600 hover:text-[#F78226] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Home</span>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-center">
            <Image src="/getmorepacklinks.png" alt="Logo" width={200} height={64} className="h-16 w-auto" />
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex border-b border-gray-300">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  isLogin ? "text-[#F78226] bg-orange-50" : "text-gray-500 hover:text-[#F78226] hover:bg-orange-50"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  !isLogin ? "text-[#F78226] bg-orange-50" : "text-gray-500 hover:text-[#F78226] hover:bg-orange-50"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuth} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F78226] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F78226] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#F78226] hover:bg-[#FF4405] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F78226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : isLogin ? (
                  "Log In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>

          <div className="mt-4 text-xs text-center text-gray-500">
            By creating an account or logging in, you agree to our{" "}
            <Link href="/terms" className="text-[#F78226] hover:text-[#FF4405] transition-colors">
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-[#F78226] hover:text-[#FF4405] transition-colors">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
      {showConfirmationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-[#F78226] mb-2">Confirmation Email Sent</h3>
            <p className="text-gray-600 mb-4">
              We've sent you a confirmation email. Please check your inbox and follow the instructions to verify your
              account.
            </p>
            <button
              onClick={() => setShowConfirmationPopup(false)}
              className="w-full px-4 py-2 bg-[#F78226] text-white rounded-lg hover:bg-[#FF4405] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

