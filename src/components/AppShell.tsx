"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

interface AppShellProps {
  userName?: string | null;
  userImage?: string | null;
  onSignOut: () => void;
  children: React.ReactNode;
}

export default function AppShell({
  userName,
  userImage,
  onSignOut,
  children,
}: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on page change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 48,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Sidebar Wrapper */}
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="mobile-close-btn"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        <Sidebar
          userName={userName}
          userImage={userImage}
          onSignOut={onSignOut}
        />
      </div>

      {/* Main Content Area */}
      <main className="main-content-wrapper" style={{ flex: 1, minWidth: 0 }}>
        {/* Topbar */}
        <div className="topbar-wrapper">
          {/* Hamburger Menu on Mobile */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="mobile-menu-btn"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          
          <ThemeToggle />
        </div>

        {/* Content Area */}
        <div className="content-padding">
          {children}
        </div>
      </main>
    </div>
  );
}
