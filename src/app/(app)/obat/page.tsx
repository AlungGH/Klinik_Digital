import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Pill, Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { deleteObat } from "@/app/actions/obatActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Data Obat — Klinik Digital" };

export default async function ObatPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const obatList = await prisma.obat.findMany({
    where: q
      ? { namaObat: { contains: q, mode: "insensitive" } }
      : undefined,
    orderBy: { namaObat: "asc" },
    include: { _count: { select: { resepDetail: true } } },
  });

  return (
    <div className="content-area fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Data Obat</h1>
          <p className="page-subtitle">{obatList.length} jenis obat terdaftar</p>
        </div>
        <Link href="/obat/baru" className="btn-primary" id="btn-tambah-obat">
          <Plus size={16} />
          Tambah Obat
        </Link>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "24px" }}>
        <form method="GET">
          <div className="search-bar">
            <Search size={16} color="#475569" />
            <input
              name="q"
              defaultValue={q}
              placeholder="Cari nama obat..."
              id="search-obat"
            />
          </div>
        </form>
      </div>

      {/* Grid Cards */}
      {obatList.length === 0 ? (
        <div className="glass-card empty-state" style={{ padding: "60px" }}>
          <Pill size={48} />
          <h3 style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "600" }}>
            {q ? "Obat tidak ditemukan" : "Belum ada data obat"}
          </h3>
          <p>{q ? `Tidak ada hasil untuk "${q}"` : "Mulai dengan menambahkan obat pertama"}</p>
          {!q && (
            <Link href="/obat/baru" className="btn-primary" style={{ marginTop: "16px" }}>
              <Plus size={15} />
              Tambah Obat Pertama
            </Link>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {obatList.map((obat) => (
            <div key={obat.id} className="glass-card" style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(16,185,129,0.12)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Pill size={20} color="#34d399" />
                </div>
                <span
                  className={`badge ${obat.stok > 20 ? "badge-green" : obat.stok > 5 ? "badge-yellow" : "badge-red"}`}
                >
                  Stok: {obat.stok}
                </span>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    fontWeight: "700",
                    fontSize: "15px",
                    color: "#f1f5f9",
                    marginBottom: "4px",
                  }}
                >
                  {obat.namaObat}
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                  Satuan: <span style={{ color: "#60a5fa" }}>{obat.satuan}</span>
                </div>
              </div>

              {obat.keterangan && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#475569",
                    marginBottom: "14px",
                    lineHeight: "1.5",
                  }}
                >
                  {obat.keterangan}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "14px",
                  borderTop: "1px solid rgba(30,45,74,0.5)",
                }}
              >
                <span style={{ fontSize: "12px", color: "#475569" }}>
                  <Package size={12} style={{ display: "inline", marginRight: "4px" }} />
                  Dipakai {obat._count.resepDetail}x
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link
                    href={`/obat/${obat.id}/edit`}
                    className="btn-secondary"
                    style={{ padding: "5px 10px", fontSize: "12px" }}
                    id={`btn-edit-obat-${obat.id}`}
                  >
                    <Edit size={13} />
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteObat(obat.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="btn-danger"
                      style={{ padding: "5px 10px", fontSize: "12px" }}
                      id={`btn-hapus-obat-${obat.id}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
