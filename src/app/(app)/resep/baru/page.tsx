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

  const pasienList = await prisma.pasien.findMany({
    orderBy: { nama: "asc" },
  });

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

      <div className="glass-card form-card" style={{ maxWidth: "800px" }}>
        <ResepForm pasienList={pasienList} defaultPasienId={pasienId} />
      </div>
    </div>
  );
}
