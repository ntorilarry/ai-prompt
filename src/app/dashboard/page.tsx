"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import ChatArea from "./components/chat-area";
import ProtectedRoute from "@/utils/protectedRoute";

export default function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex flex-col lg:flex-row lg:h-screen bg-white">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 flex flex-col lg:ml-0">
          <ChatArea />
        </div>
      </div>
    </ProtectedRoute>
  );
}
