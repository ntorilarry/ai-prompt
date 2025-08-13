"use client";

import { IoAdd, IoChatbubble } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const sidebarItems = [
    { icon: IoAdd, label: "New chat", href: "/chat-prompt" },
    { icon: IoChatbubble, label: "Prompts", href: "/prompts" },
  ];

  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };
  return (
    <>
      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200  transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:inset-0
      `}
      >
        <nav className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center pt-4 pe-4 ps-7">
            <a
              href="#"
              className="flex-none focus:outline-none focus:opacity-80"
            >
              <div className="w-28 h-8 rounded flex items-center justify-center">
                <span className="text-black font-bold text-lg">AI Prompt</span>
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
                    className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                  >
                    <item.icon className="shrink-0 size-4" />
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
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
            <div className="p-4 border-t border-gray-200 ">
              <button
                type="button"
                onClick={handleLogout}
                className="flex justify-between w-full items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
}
