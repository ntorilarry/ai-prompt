"use client";
import { useState } from "react";
import type React from "react";

import ProtectedRoute from "@/utils/protectedRoute";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex flex-col lg:flex-row lg:h-screen bg-white">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 flex flex-col lg:ml-0 overflow-x-hidden">
          <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <div className="my-10 px-4 sm:px-6 lg:px-8"> {children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MainLayout;
