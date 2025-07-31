"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import ChatArea from "./components/chat-area";

export default function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white dark:bg-neutral-900">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex flex-col lg:ml-0">
        <ChatArea />
      </div>
    </div>
  );
}
