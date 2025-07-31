"use client"

import { IoAdd, IoChatbubble, IoDownload, IoSend, IoMenu } from "react-icons/io5"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const sidebarItems = [
    { icon: IoAdd, label: "New chat", href: "#" },
    { icon: IoChatbubble, label: "Preline AI Discord", href: "#" },
    { icon: IoDownload, label: "Save conversation", href: "#" },
    { icon: IoSend, label: "Updates & FAQ", href: "#" },
  ]

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-neutral-700">
        <button
          onClick={onToggle}
          className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          <IoMenu className="shrink-0 size-3.5" />
          <span>Sidebar</span>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-700 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <nav className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center pt-4 pe-4 ps-7">
            <a href="#" className="flex-none focus:outline-none focus:opacity-80">
              <div className="w-28 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">Preline</span>
              </div>
            </a>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1.5">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 dark:focus:bg-neutral-800 dark:focus:text-neutral-300"
                  >
                    <item.icon className="shrink-0 size-4" />
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 dark:focus:bg-neutral-800 dark:focus:text-neutral-300"
                >
                  <div className="shrink-0 size-4 text-blue-600">⚡</div>
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    Upgrade Plan
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto">
            <div className="py-2.5 px-7">
              <p className="inline-flex items-center gap-x-2 text-xs text-green-600">
                <span className="block size-1.5 rounded-full bg-green-600"></span>
                Active 12,320 people
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
              <a
                href="#"
                className="flex justify-between items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
              >
                Sign in
                <IoSend className="shrink-0 size-4" />
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onToggle} />}
    </>
  )
}
