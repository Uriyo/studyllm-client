"use client";

import { useState } from "react";
import { Sidebar, MobileMenuButton } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-30 md:hidden bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-white/5 safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)} />
          <h1 className="text-base font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Ragment_
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden pt-14 md:pt-0">
        {children}
      </main>
    </div>
  );
}