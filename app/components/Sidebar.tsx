"use client"

import type { User } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"
import { X, Home, BarChart2, Users, Bell, ChevronUp, ChevronDown, Rocket, Gift } from "lucide-react"
import { useState, useEffect } from "react"
import LogoutButton from "./LogoutButton"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

type SidebarProps = {
  user: User | null
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ user, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchUnreadNotifications()
    const channel = supabase
      .channel("onboarding_form_changes")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "onboarding_form" }, handleNotificationUpdate)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function fetchUnreadNotifications() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) return

      const { data, error } = await supabase
        .from("onboarding_form")
        .select("notifications")
        .eq("email", session.user.email)
        .single()

      if (error) throw error

      const unreadNotifications = data?.notifications?.filter((n: any) => !n.read) || []
      setUnreadCount(unreadNotifications.length)
    } catch (error) {
      console.error("Error fetching unread notifications:", error)
    }
  }

  function handleNotificationUpdate(payload: any) {
    if (payload.new && payload.new.notifications) {
      const unreadNotifications = payload.new.notifications.filter((n: any) => !n.read)
      setUnreadCount(unreadNotifications.length)
    }
  }

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shadow-lg ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Image src="/getmorepacklinks.png" alt="Logo" width={120} height={32} className="h-8 w-auto" />
          <button onClick={() => setSidebarOpen(false)} className="rounded-lg p-1.5 hover:bg-gray-100 md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <a
            href="/dashboard"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md bg-orange-50 text-orange-600"
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </a>

          <div className="space-y-1">
            <button className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              <BarChart2 className="mr-3 h-5 w-5" />
              Tools
            </button>
            <a
              href="/backlink-directory"
              className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50"
            >
              Backlink Directory
            </a>
            <a
              href="/landing-page-analyze"
              className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50"
            >
              Landing Page Analyze
            </a>
            <a
              href="/open-graph-validator"
              className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50"
            >
              Open Graph Validator
            </a>
            <a
              href="/meta-description-generator"
              className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50"
            >
              Meta Description Generator
            </a>
            <a
              href="/seo-audit-website"
              className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50"
            >
              SEO Audit Website
            </a>
          </div>

          <a
            href="/easylaunch"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
          >
            <Rocket className="mr-3 h-5 w-5" />
            LaunchFast
          </a>

          <a
            href="/hire-an-seo-expert"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
          >
            <Users className="mr-3 h-5 w-5" />
            Hire an SEO Expert
          </a>

          <a
            href="/notifications"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50"
          >
            <Bell className="mr-3 h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-auto bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </a>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="mb-4">
            <div className="flex items-center px-3 py-2 bg-orange-50 rounded-md">
              <Gift className="mr-3 h-5 w-5 text-orange-600" />
              <div>
                <div className="text-sm font-medium text-orange-600">Try Our Free Tools</div>
                <div className="text-xs text-gray-600">Boost your SEO with our complimentary resources.</div>
              </div>
            </div>
            <a
              href="/landing-page-analyze"
              className="mt-2 block w-full bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors text-center"
            >
              Explore Free Tools
            </a>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center px-3 py-2 w-full text-left"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.email ? user.email[0].toUpperCase() : "?"}
                  </span>
                </div>
              </div>
              <div className="ml-3 overflow-hidden flex-grow">
                <p className="text-xs font-medium text-gray-900 truncate">{user?.email || "Not logged in"}</p>
              </div>
              {showDropdown ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            {showDropdown && (
              <div className="absolute bottom-full left-0 w-full bg-white border border-gray-200 rounded-t-md shadow-lg">
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

