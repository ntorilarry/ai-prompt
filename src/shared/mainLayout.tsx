"use client";

import { useState } from "react";
import ProtectedRoute from "@/utils/protectedRoute";
import Sidebar from "@/components/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex flex-col lg:flex-row lg:h-screen bg-white">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 flex flex-col lg:ml-0">{children}</div>
      </div>
    </ProtectedRoute>
  );
};

export default MainLayout;
