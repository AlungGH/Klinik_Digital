import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, Plus, Search, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Pasien — Klinik Digital",
};

export default async function PasienPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page: pageStr } = await searchParams;
  const page = parseInt(pageStr || "1", 10);
  const pageSize = 10;

  const whereCondition = q
    ? {
        OR: [
          { nama: { contains: q, mode: "insensitive" } },
          { noRm: { contains: q, mode: "insensitive" } },
          { noTelepon: { contains: q } },
        ],
      }
    : undefined;

  const totalPasien = await prisma.pasien.count({ where: whereCondition as any });
  const totalPages = Math.ceil(totalPasien / pageSize);

  const pasienList = await prisma.pasien.findMany({
    where: whereCondition as any,
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { resep: true } },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div className="content-area fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Data Pasien</h1>
          <p className="page-subtitle">{totalPasien} pasien terdaftar</p>
        </div>
        <Link href="/pasien/baru" className="btn-primary" id="btn-tambah-pasien-baru">
          <Plus size={16} />
          Tambah Pasien
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
              placeholder="Cari nama, nomor RM, atau telepon..."
              id="search-pasien"
            />
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        {pasienList.length === 0 ? (
          <div className="empty-state">
            <Users size={48} />
            <h3 style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "600" }}>
              {q ? "Pasien tidak ditemukan" : "Belum ada pasien"}
            </h3>
            <p>{q ? `Tidak ada hasil untuk "${q}"` : "Mulai dengan menambahkan pasien pertama"}</p>
            {!q && (
              <Link href="/pasien/baru" className="btn-primary" style={{ marginTop: "16px" }}>
                <Plus size={15} />
                Tambah Pasien Pertama
              </Link>
            )}
          </div>
        ) : (
          <div className="table-wrapper" style={{ border: "none", borderRadius: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>No. RM</th>
                  <th>Nama Pasien</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Lahir</th>
                  <th>No. Telepon</th>
                  <th>Total Resep</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pasienList.map((pasien) => (
                  <tr key={pasien.id}>
                    <td>
                      <span className="badge badge-blue">{pasien.noRm}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: "600", color: "#f1f5f9" }}>
                        {pasien.nama}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${pasien.jenisKelamin === "LAKI_LAKI" ? "badge-blue" : "badge-yellow"}`}
                      >
                        {pasien.jenisKelamin === "LAKI_LAKI" ? "Laki-laki" : "Perempuan"}
                      </span>
                    </td>
                    <td style={{ color: "#94a3b8" }}>
                      {new Date(pasien.tanggalLahir).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td style={{ color: "#94a3b8" }}>{pasien.noTelepon}</td>
                    <td>
                      <span className="badge badge-green">
                        {pasien._count.resep} resep
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/pasien/${pasien.id}`}
                        className="btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "13px" }}
                        id={`btn-detail-pasien-${pasien.id}`}
                      >
                        <Eye size={14} />
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", padding: "16px", borderTop: "1px solid #1e293b" }}>
            {page > 1 ? (
              <Link href={`/pasien?page=${page - 1}${q ? `&q=${q}` : ""}`} className="btn-secondary">
                Sebelumnya
              </Link>
            ) : (
              <div style={{ width: "114.73px" }} /> // Placeholder to center text
            )}
            
            <span style={{ fontSize: "14px", color: "#94a3b8", fontWeight: "500", minWidth: "120px", textAlign: "center" }}>
              Halaman {page} dari {totalPages}
            </span>
            
            {page < totalPages ? (
              <Link href={`/pasien?page=${page + 1}${q ? `&q=${q}` : ""}`} className="btn-secondary">
                Selanjutnya
              </Link>
            ) : (
              <div style={{ width: "114.73px" }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
