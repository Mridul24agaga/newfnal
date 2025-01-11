'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router, supabase.auth])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
      }
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <Link 
          href="/"
          className="flex items-center text-gray-600 hover:text-[#F78226] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Home</span>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-center">
            <Image
              src="/getmorepacklinks.png"
              alt="Logo"
              width={200}
              height={64}
              className="h-16 w-auto"
            />
          </div>

          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex border-b border-gray-300">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  isLogin
                    ? 'text-[#F78226] bg-orange-50'
                    : 'text-gray-500 hover:text-[#F78226] hover:bg-orange-50'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  !isLogin
                    ? 'text-[#F78226] bg-orange-50'
                    : 'text-gray-500 hover:text-[#F78226] hover:bg-orange-50'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleAuth} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#F78226] hover:bg-[#FF4405] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F78226] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  isLogin ? 'Log In' : 'Sign Up'
                )}
              </button>

              
            </form>
          </div>

          <div className="mt-4 text-xs text-center text-gray-500">
            By creating an account or logging in, you agree to our{' '}
            <Link href="/terms" className="text-[#F78226] hover:text-[#FF4405] transition-colors">
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#F78226] hover:text-[#FF4405] transition-colors">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  )
}

