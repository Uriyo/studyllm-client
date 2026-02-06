"use client";

import { UserButton } from "@clerk/nextjs";
import { Plus, Briefcase, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleProjectsClick = () => {
    router.push("/projects");
    onMobileClose?.();
  };

  const handleNewProject = () => {
    router.push("/projects");
    onMobileClose?.();
  };

  // Close mobile menu on route change
  useEffect(() => {
    onMobileClose?.();
  }, [pathname]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        onMobileClose?.();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileOpen, onMobileClose]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`drawer-overlay md:hidden ${isMobileOpen ? "open" : ""}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-50
          bg-[#0f0f0f] text-white flex flex-col
          transition-all duration-300 ease-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "md:w-16" : "md:w-64"}
          w-[280px] max-w-[85vw]
          border-r border-white/5
          safe-area-top
        `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          {(!isCollapsed || isMobileOpen) && (
            <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              R_
            </h1>
          )}
          
          {/* Close button - mobile only */}
          <button
            onClick={onMobileClose}
            className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors tap-highlight"
            aria-label="Close menu"
          >
            <X size={20} className="text-gray-400" />
          </button>

          {/* Collapse toggle - desktop only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-2 hover:bg-white/10 rounded-xl transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu size={18} className="text-gray-400" />
          </button>
        </div>

        {/* New Project Button */}
        <div className="px-3 pb-3">
          <button
            onClick={handleNewProject}
            className={`
              w-full bg-gradient-to-r from-white/8 to-white/4
              hover:from-white/12 hover:to-white/8
              border border-white/10 hover:border-white/20
              rounded-xl transition-all duration-200
              flex items-center gap-3
              ${isCollapsed && !isMobileOpen ? "p-3 justify-center" : "p-3.5"}
              tap-highlight
            `}
          >
            <Plus size={18} className="text-gray-300" />
            {(!isCollapsed || isMobileOpen) && (
              <span className="text-gray-200 font-medium">New project</span>
            )}
          </button>
        </div>

        {/* Navigation */}
        {(!isCollapsed || isMobileOpen) && (
          <nav className="px-3 pb-3 space-y-1">
            <button
              onClick={handleProjectsClick}
              className={`
                w-full flex items-center gap-3 p-3 text-sm rounded-xl
                transition-all duration-200 tap-highlight
                ${
                  pathname === "/projects" || pathname.startsWith("/projects/")
                    ? "bg-gradient-to-r from-blue-500/15 to-emerald-500/10 text-white border border-blue-500/20"
                    : "text-gray-400 hover:bg-white/8 hover:text-gray-200"
                }
              `}
            >
              <Briefcase size={18} />
              <span className="font-medium">Projects</span>
            </button>
          </nav>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Section */}
        <div className="p-4 border-t border-white/5">
          <div
            className={`flex items-center ${
              isCollapsed && !isMobileOpen ? "justify-center" : "gap-3"
            }`}
          >
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9"
                }
              }}
            />
            {(!isCollapsed || isMobileOpen) && (
              <span className="text-sm text-gray-400 font-medium">Profile</span>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

// Mobile hamburger menu button component
export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2.5 hover:bg-white/10 rounded-xl transition-colors tap-highlight"
      aria-label="Open menu"
    >
      <Menu size={22} className="text-gray-300" />
    </button>
  );
}