"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Pill,
  ClipboardList,
  Activity,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  userName?: string | null;
  userImage?: string | null;
  onSignOut: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pasien", label: "Pasien", icon: Users },
  { href: "/obat", label: "Obat", icon: Pill },
  { href: "/resep", label: "Resep", icon: ClipboardList },
];

export default function Sidebar({ userName, userImage, onSignOut }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 16px rgba(59,130,246,0.3)",
            }}
          >
            <Activity size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "15px", color: "#f1f5f9" }}>
              Klinik Digital
            </div>
            <div style={{ fontSize: "11px", color: "#475569" }}>Manajemen Klinik</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-label">Menu Utama</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="sidebar-footer">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "10px",
            background: "rgba(30,45,74,0.5)",
            marginBottom: "8px",
          }}
        >
          {userImage ? (
            <img
              src={userImage}
              alt={userName ?? "User"}
              style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #1e2d4a" }}
            />
          ) : (
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
                flexShrink: 0,
              }}
            >
              {userName?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#f1f5f9",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {userName ?? "User"}
            </div>
            <div style={{ fontSize: "11px", color: "#475569" }}>Administrator</div>
          </div>
        </div>
        <button
          onClick={onSignOut}
          className="nav-item"
          style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
