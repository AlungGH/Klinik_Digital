import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResepForm from "@/components/ResepForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Buat Resep — Klinik Digital" };

export default async function BuatResepPage({
  searchParams,
}: {
  searchParams: Promise<{ pasienId?: string }>;
}) {
  const { pasienId } = await searchParams;

  const [pasienList, obatList] = await Promise.all([
    prisma.pasien.findMany({ orderBy: { nama: "asc" }, select: { id: true, nama: true, noRm: true } }),
    prisma.obat.findMany({ where: { stok: { gt: 0 } }, orderBy: { namaObat: "asc" } }),
  ]);

  return (
    <div className="content-area fade-in">
      <div className="page-header">
        <div>
          <Link
            href="/resep"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#94a3b8",
              textDecoration: "none",
              fontSize: "13px",
              marginBottom: "8px",
            }}
          >
            <ArrowLeft size={14} /> Kembali ke Daftar Resep
          </Link>
          <h1 className="page-title">Buat Resep Baru</h1>
          <p className="page-subtitle">Catat kunjungan dan obat yang diberikan kepada pasien</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "32px", maxWidth: "800px" }}>
        {obatList.length === 0 && (
          <div
            style={{
              padding: "14px 18px",
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: "10px",
              marginBottom: "24px",
              fontSize: "13px",
              color: "#fbbf24",
            }}
          >
            ⚠️ Belum ada obat dengan stok tersedia.{" "}
            <Link href="/obat/baru" style={{ color: "#60a5fa", textDecoration: "underline" }}>
              Tambah obat terlebih dahulu
            </Link>
          </div>
        )}

        <ResepForm
          obatList={obatList}
          pasienList={pasienList}
          defaultPasienId={pasienId}
        />
      </div>
    </div>
  );
}
