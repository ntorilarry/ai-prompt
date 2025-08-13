"use client"

import { IoNotifications, IoSearch, IoPersonCircle, IoMenu } from "react-icons/io5"
import { useAuth } from "@/contexts/auth-context"

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button (mobile) + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
          >
            <IoMenu className="shrink-0 size-3.5" />
            <span className="sr-only">Menu</span>
          </button>

          <div className="relative w-full">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full pl-10 pr-4 py-2 border text-sm border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <IoNotifications className="size-5" />
          </button>

          {/* User profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.email || "User"}</p>
              <p className="text-xs text-gray-500">Free Plan</p>
            </div>
            <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
              <IoPersonCircle className="size-8" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
