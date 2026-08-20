import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  Users,
  Pill,
  ClipboardList,
  TrendingUp,
  Plus,
  ArrowRight,
  Calendar,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Klinik Digital",
};

export default async function DashboardPage() {
  const session = await auth();

  const [totalPasien, totalObat, totalResep, resepHariIni, resepTerbaru] =
    await Promise.all([
      prisma.pasien.count(),
      prisma.obat.count(),
      prisma.resep.count(),
      prisma.resep.count({
        where: {
          tanggal: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.resep.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          pasien: { select: { nama: true, noRm: true } },
          resepDetail: {
            include: { obat: { select: { namaObat: true } } },
          },
        },
      }),
    ]);

  const stats = [
    {
      label: "Total Pasien",
      value: totalPasien,
      icon: Users,
      color: "blue",
      href: "/pasien",
    },
    {
      label: "Jenis Obat",
      value: totalObat,
      icon: Pill,
      color: "green",
      href: "/obat",
    },
    {
      label: "Total Resep",
      value: totalResep,
      icon: ClipboardList,
      color: "purple",
      href: "/resep",
    },
    {
      label: "Resep Hari Ini",
      value: resepHariIni,
      icon: TrendingUp,
      color: "yellow",
      href: "/resep",
    },
  ];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 17) return "Selamat Siang";
    return "Selamat Malam";
  };

  return (
    <div className="content-area fade-in">
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 className="page-title">
          {greeting()}, {session?.user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="page-subtitle">
          Berikut adalah ringkasan aktivitas klinik Anda hari ini,{" "}
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href} style={{ textDecoration: "none" }}>
              <div className={`stat-card ${stat.color}`}>
                <div className={`stat-icon ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div className="stat-value">{stat.value.toLocaleString("id-ID")}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions + Recent */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
        {/* Quick Actions */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#f1f5f9",
              marginBottom: "16px",
            }}
          >
            Aksi Cepat
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/pasien/baru" className="btn-primary" id="btn-tambah-pasien">
              <Plus size={16} />
              Tambah Pasien Baru
            </Link>
            <Link href="/resep/baru" className="btn-primary" id="btn-buat-resep" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
              <ClipboardList size={16} />
              Buat Resep Baru
            </Link>
            <Link href="/obat" className="btn-secondary" id="btn-kelola-obat">
              <Pill size={16} />
              Kelola Obat
            </Link>
          </div>
        </div>

        {/* Recent Prescriptions */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#f1f5f9" }}>
              Resep Terbaru
            </h2>
            <Link
              href="/resep"
              style={{
                fontSize: "13px",
                color: "#60a5fa",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Lihat Semua <ArrowRight size={13} />
            </Link>
          </div>

          {resepTerbaru.length === 0 ? (
            <div className="empty-state">
              <ClipboardList size={40} />
              <p>Belum ada resep</p>
              <Link href="/resep/baru" className="btn-primary" style={{ marginTop: "16px" }}>
                <Plus size={15} />
                Buat Resep Pertama
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {resepTerbaru.map((resep) => (
                <Link
                  key={resep.id}
                  href={`/resep/${resep.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "12px 14px",
                      background: "rgba(17,24,39,0.6)",
                      border: "1px solid rgba(30,45,74,0.5)",
                      borderRadius: "10px",
                      transition: "all 0.15s ease",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "rgba(59,130,246,0.12)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Calendar size={18} color="#60a5fa" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          color: "#f1f5f9",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {resep.pasien.nama}
                      </div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                        RM: {resep.pasien.noRm} •{" "}
                        {resep.resepDetail.length} obat
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "12px", color: "#475569" }}>
                        {new Date(resep.tanggal).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
