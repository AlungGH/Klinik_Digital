import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Calendar,
  Stethoscope,
  Pill,
  Trash2,
  ClipboardList,
} from "lucide-react";
import { deleteResep } from "@/app/actions/resepActions";
import DeleteButton from "@/components/DeleteButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Detail Resep — Klinik Digital" };

export default async function DetailResepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const resep = await prisma.resep.findUnique({
    where: { id },
    include: {
      pasien: true,
      resepDetail: true,
    },
  });

  if (!resep) notFound();

  return (
    <div className="content-area fade-in">
      <Link
        href="/resep"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "#94a3b8",
          textDecoration: "none",
          fontSize: "13px",
          marginBottom: "20px",
        }}
      >
        <ArrowLeft size={14} /> Kembali ke Daftar Resep
      </Link>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Resep Info */}
        <div className="glass-card" style={{ padding: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(59,130,246,0.12)",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ClipboardList size={24} color="#60a5fa" />
            </div>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9" }}>
                Detail Resep
              </h2>
              <div style={{ fontSize: "12px", color: "#475569" }}>
                ID: {resep.id.slice(0, 8)}...
              </div>
            </div>
          </div>

          {[
            {
              icon: User,
              label: "Pasien",
              value: `${resep.pasien.nama} (RM: ${resep.pasien.noRm})`,
              color: "#60a5fa",
            },
            {
              icon: Calendar,
              label: "Tanggal Kunjungan",
              value: new Date(resep.tanggal).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              color: "#a78bfa",
            },
            {
              icon: Stethoscope,
              label: "Diagnosa",
              value: resep.diagnosa,
              color: "#34d399",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "18px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "9px",
                    background: "rgba(30,45,74,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} color={item.color} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#475569", marginBottom: "2px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "14px", color: "#f1f5f9", fontWeight: "500" }}>
                    {item.value}
                  </div>
                </div>
              </div>
            );
          })}

          {resep.catatan && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "10px",
                marginTop: "8px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#f59e0b", marginBottom: "4px", fontWeight: "600" }}>
                CATATAN
              </div>
              <div style={{ fontSize: "13px", color: "#fbbf24", lineHeight: "1.5" }}>
                {resep.catatan}
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(30,45,74,0.5)",
            }}
          >
            <Link
              href={`/pasien/${resep.pasienId}`}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: "center" }}
              id={`btn-lihat-pasien-${resep.pasienId}`}
            >
              <User size={14} />
              Lihat Profil Pasien
            </Link>
            <form
              action={async () => {
                "use server";
                await deleteResep(id);
              }}
            >
              <DeleteButton
                id={`btn-hapus-resep-${id}`}
                confirmMessage="Yakin hapus resep ini?"
              />
            </form>
          </div>
        </div>

        {/* Obat List */}
        <div className="glass-card" style={{ padding: "28px" }}>
          <h2
            style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#f1f5f9",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Pill size={18} color="#34d399" />
            Daftar Obat ({resep.resepDetail.length})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {resep.resepDetail.map((detail, idx) => (
              <div
                key={detail.id}
                style={{
                  padding: "16px",
                  background: "rgba(16,185,129,0.05)",
                  border: "1px solid rgba(16,185,129,0.15)",
                  borderRadius: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ fontWeight: "700", color: "#f1f5f9", fontSize: "15px" }}>
                    {idx + 1}. {detail.namaObat}
                  </div>
                  <span className="badge badge-green">
                    {detail.jumlah} {detail.satuan}
                  </span>
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                  Aturan pakai:{" "}
                  <span style={{ color: "#60a5fa", fontWeight: "500" }}>
                    {detail.aturanPakai}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
