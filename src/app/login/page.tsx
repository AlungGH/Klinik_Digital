import type { Metadata } from "next";
import { signIn } from "@/lib/auth";
import { Activity, LogIn } from "lucide-react";

export const metadata: Metadata = {
  title: "Login — Klinik Digital",
  description: "Login ke sistem manajemen klinik digital.",
};

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse at 60% 20%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.06) 0%, transparent 50%), #0a0f1e",
        padding: "20px",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(30,45,74,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30,45,74,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "420px",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 8px 32px rgba(59,130,246,0.35)",
            }}
          >
            <Activity size={36} color="white" />
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "#f1f5f9",
              marginBottom: "8px",
              letterSpacing: "-0.5px",
            }}
          >
            Klinik Digital
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px" }}>
            Sistem Manajemen Pasien & Obat
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "#111827",
            border: "1px solid #1e2d4a",
            borderRadius: "20px",
            padding: "40px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#f1f5f9",
              marginBottom: "8px",
            }}
          >
            Selamat Datang
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "28px" }}>
            Masukkan kredensial Anda untuk mengakses sistem
          </p>

          <form
            action={async (formData: FormData) => {
              "use server";
              await signIn("credentials", {
                username: formData.get("username"),
                password: formData.get("password"),
                redirectTo: "/dashboard",
              });
            }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#94a3b8", marginBottom: "6px" }}>
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                placeholder="Masukkan username..."
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "rgba(17,24,39,0.8)",
                  border: "1px solid rgba(30,45,74,0.8)",
                  borderRadius: "10px",
                  color: "#f1f5f9",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#94a3b8", marginBottom: "6px" }}>
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Masukkan password..."
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  background: "rgba(17,24,39,0.8)",
                  border: "1px solid rgba(30,45,74,0.8)",
                  borderRadius: "10px",
                  color: "#f1f5f9",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px 20px",
                marginTop: "8px",
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.2s ease",
              }}
            >
              <LogIn size={18} />
              Masuk
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              color: "#475569",
              fontSize: "12px",
              marginTop: "24px",
              lineHeight: "1.6",
            }}
          >
            Hanya pengguna yang diizinkan dapat mengakses sistem ini
          </p>
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            color: "#334155",
            fontSize: "12px",
            marginTop: "24px",
          }}
        >
          © 2025 Klinik Digital. All rights reserved.
        </p>
      </div>
    </div>
  );
}
