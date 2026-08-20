import type { Metadata } from "next";
import { signIn } from "@/lib/auth";
import { Activity } from "lucide-react";

// Github SVG Component
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

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
          <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "32px" }}>
            Masuk dengan akun GitHub Anda untuk melanjutkan
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "linear-gradient(135deg, #24292e, #1a1f24)",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#f1f5f9",
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
              <GithubIcon size={20} />
              Masuk dengan GitHub
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
