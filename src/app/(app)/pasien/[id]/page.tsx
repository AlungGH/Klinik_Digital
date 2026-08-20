import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Calendar,
  ClipboardList,
  Plus,
  Pill,
  Edit,
  Trash2,
} from "lucide-react";
import { deletePasien } from "@/app/actions/pasienActions";
import DeleteButton from "@/components/DeleteButton";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pasien = await prisma.pasien.findUnique({ where: { id }, select: { nama: true } });
  return { title: `${pasien?.nama ?? "Pasien"} — Klinik Digital` };
}

export default async function DetailPasienPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const pasien = await prisma.pasien.findUnique({
    where: { id },
    include: {
      resep: {
        orderBy: { tanggal: "desc" },
        include: {
          resepDetail: true,
        },
      },
    },
  });

  if (!pasien) notFound();

  const usia = Math.floor(
    (Date.now() - new Date(pasien.tanggalLahir).getTime()) /
      (365.25 * 24 * 3600 * 1000)
  );

  return (
    <div className="content-area fade-in">
      {/* Back */}
      <Link
        href="/pasien"
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
        <ArrowLeft size={14} /> Kembali ke Daftar Pasien
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Patient Info Card */}
        <div>
          <div className="glass-card" style={{ padding: "28px", marginBottom: "16px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${pasien.jenisKelamin === "LAKI_LAKI" ? "#3b82f6, #1d4ed8" : "#ec4899, #be185d"})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "white",
                  boxShadow: `0 8px 24px ${pasien.jenisKelamin === "LAKI_LAKI" ? "rgba(59,130,246,0.3)" : "rgba(236,72,153,0.3)"}`,
                }}
              >
                {pasien.nama[0].toUpperCase()}
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#f1f5f9",
                  marginBottom: "6px",
                }}
              >
                {pasien.nama}
              </h2>
              <span className="badge badge-blue">{pasien.noRm}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                {
                  icon: User,
                  label: "Jenis Kelamin",
                  value: pasien.jenisKelamin === "LAKI_LAKI" ? "Laki-laki" : "Perempuan",
                },
                {
                  icon: Calendar,
                  label: "Tanggal Lahir",
                  value: `${new Date(pasien.tanggalLahir).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} (${usia} tahun)`,
                },
                { icon: Phone, label: "No. Telepon", value: pasien.noTelepon },
                { icon: MapPin, label: "Alamat", value: pasien.alamat },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        background: "rgba(59,130,246,0.1)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={15} color="#60a5fa" />
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#475569", marginBottom: "2px" }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.4" }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link href={`/pasien/${id}/edit`} className="btn-secondary" id={`btn-edit-pasien-${id}`}>
              <Edit size={15} />
              Edit Data Pasien
            </Link>
            <form
              action={async () => {
                "use server";
                await deletePasien(id);
              }}
            >
              <DeleteButton 
                id={`btn-hapus-pasien-${id}`} 
                confirmMessage="Yakin hapus pasien ini? Semua resep akan ikut terhapus."
              />
            </form>
          </div>
        </div>

        {/* Prescription History */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#f1f5f9" }}>
                Riwayat Resep
              </h2>
              <p style={{ fontSize: "13px", color: "#94a3b8" }}>
                {pasien.resep.length} resep tercatat
              </p>
            </div>
            <Link href={`/resep/baru?pasienId=${id}`} className="btn-primary" id={`btn-buat-resep-pasien-${id}`}>
              <Plus size={15} />
              Buat Resep
            </Link>
          </div>

          {pasien.resep.length === 0 ? (
            <div
              className="glass-card empty-state"
              style={{ padding: "48px" }}
            >
              <ClipboardList size={40} />
              <h3 style={{ color: "#94a3b8", fontSize: "15px", fontWeight: "600" }}>
                Belum ada riwayat resep
              </h3>
              <p>Pasien ini belum pernah mendapat resep obat</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {pasien.resep.map((resep, idx) => (
                <Link
                  key={resep.id}
                  href={`/resep/${resep.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div className="glass-card" style={{ padding: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "14px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "13px",
                            color: "#60a5fa",
                            fontWeight: "600",
                            marginBottom: "4px",
                          }}
                        >
                          Kunjungan #{pasien.resep.length - idx}
                        </div>
                        <div style={{ fontWeight: "600", color: "#f1f5f9" }}>
                          {resep.diagnosa}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                          {new Date(resep.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Obat list */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {resep.resepDetail.map((detail) => (
                        <div
                          key={detail.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "5px 10px",
                            background: "rgba(16,185,129,0.1)",
                            border: "1px solid rgba(16,185,129,0.2)",
                            borderRadius: "8px",
                          }}
                        >
                          <Pill size={12} color="#34d399" />
                          <span style={{ fontSize: "12px", color: "#34d399", fontWeight: "500" }}>
                            {detail.namaObat} — {detail.jumlah} {detail.satuan}
                          </span>
                        </div>
                      ))}
                    </div>

                    {resep.catatan && (
                      <div
                        style={{
                          marginTop: "12px",
                          padding: "10px 14px",
                          background: "rgba(245,158,11,0.08)",
                          borderRadius: "8px",
                          borderLeft: "3px solid #f59e0b",
                          fontSize: "13px",
                          color: "#fbbf24",
                        }}
                      >
                        📝 {resep.catatan}
                      </div>
                    )}
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
