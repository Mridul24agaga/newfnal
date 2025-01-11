'use client'

import { User } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { X, Home, BarChart2, Users, Mail, Settings, Building2, CreditCard, Coins, ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import LogoutButton from './LogoutButton'

type SidebarProps = {
  user: User | null
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ user, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 flex w-72 flex-col bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Image
            src="/getmorepacklinks.png"
            alt="Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
          <button 
            onClick={() => setSidebarOpen(false)} 
            className="rounded-lg p-1.5 hover:bg-gray-100 md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <a href="/dashboard" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md bg-orange-50 text-orange-600">
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </a>

          <div className="space-y-1">
            <a href="/campaigns" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
              <BarChart2 className="mr-3 h-5 w-5" />
              Tools
            </a>
            <a href="/backlink-directory" className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50">
              Backlink Directory
            </a>
            <a href="/landing-page-analyze" className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50">
              Landing Page Analyze
            </a>
            <a href="/directory" className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50">
              Backlink Directory
            </a>
          </div>

          <a href="/contacts" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
            <Users className="mr-3 h-5 w-5" />
            Contacts
          </a>

          <a href="/email" className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50">
            <Mail className="mr-3 h-5 w-5" />
            Email Accounts
          </a>

          <a href="/settings" className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </a>

          <a href="/organization" className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50">
            <Building2 className="mr-3 h-5 w-5" />
            Organization
          </a>

          <a href="/billing" className="flex items-center px-3 py-2.5 text-sm font-medium pl-11 rounded-md text-gray-600 hover:bg-gray-50">
            <CreditCard className="mr-3 h-5 w-5" />
            Billing
          </a>
        </nav>

        {/* Credits Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="mb-4">
            <div className="flex items-center px-3 py-2">
              <Coins className="mr-3 h-5 w-5 text-orange-600" />
              <div>
                <div className="text-sm font-medium">Credits</div>
                <div className="text-xs text-gray-500">Add credits to your account to start using the platform.</div>
              </div>
            </div>
            <button className="mt-2 w-full bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 transition-colors">
              Add credits
            </button>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center px-3 py-2 w-full text-left"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.email ? user.email[0].toUpperCase() : '?'}
                  </span>
                </div>
              </div>
              <div className="ml-3 overflow-hidden flex-grow">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {user?.email || 'Not logged in'}
                </p>
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

