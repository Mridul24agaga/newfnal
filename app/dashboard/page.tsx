"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import DashboardLayout from "./DashboardLayout"
import Link from "next/link"

interface OnboardingData {
  startupName: string
  industry: string
  name: string
  role: string
  email: string
  website: string
}

interface BacklinkData {
  domain: string
  backlinks: number
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [backlinkData, setBacklinkData] = useState<BacklinkData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        await fetchOnboardingData(user.email || "")
        await fetchBacklinkData()
      } else {
        router.push("/auth-form")
      }
    }

    getUser()
  }, [router, supabase.auth])

  const fetchOnboardingData = async (email: string) => {
    const { data, error } = await supabase.from("onboarding_form").select("*").eq("email", email).single()

    if (error) {
      console.error("Error fetching onboarding data:", error)
      router.push("/onboarding")
    } else if (data) {
      setOnboardingData({
        startupName: data.company_name,
        industry: data.industry,
        name: data.name,
        role: data.role,
        email: data.email,
        website: data.website || "",
      })
      setLoading(false)
    } else {
      router.push("/onboarding")
    }
  }

  const fetchBacklinkData = async () => {
    // This is a mock function. In a real application, you would fetch this data from your backend or an API
    const mockData: BacklinkData[] = [
      { domain: "example.com", backlinks: 150 },
      { domain: "sample.org", backlinks: 89 },
      { domain: "test.net", backlinks: 76 },
      { domain: "demo.io", backlinks: 54 },
      { domain: "mockup.com", backlinks: 32 },
    ]
    setBacklinkData(mockData)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  const handleRefresh = () => {
    setLoading(true)
    fetchBacklinkData().then(() => setLoading(false))
  }

  if (loading) {
    return (
      <DashboardLayout user={user}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  const totalBacklinks = backlinkData.reduce((sum, item) => sum + item.backlinks, 0)

  return (
    <DashboardLayout user={user}>
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, {onboardingData?.name}!</h1>

        

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{onboardingData?.name}</p>
            </div>
            <div>
              <p className="font-semibold">Role:</p>
              <p>{onboardingData?.role}</p>
            </div>
            <div>
              <p className="font-semibold">Company:</p>
              <p>{onboardingData?.startupName}</p>
            </div>
            <div>
              <p className="font-semibold">Industry:</p>
              <p>{onboardingData?.industry}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{onboardingData?.email}</p>
            </div>
            <div>
              <p className="font-semibold">Website:</p>
              <p>{onboardingData?.website}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

