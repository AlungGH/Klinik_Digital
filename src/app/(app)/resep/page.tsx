import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ClipboardList, Plus, Calendar } from "lucide-react";
import { deleteResep } from "@/app/actions/resepActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Data Resep — Klinik Digital" };

export default async function ResepPage() {
  const resepList = await prisma.resep.findMany({
    orderBy: { tanggal: "desc" },
    include: {
      pasien: { select: { nama: true, noRm: true } },
      resepDetail: {
        include: { obat: { select: { namaObat: true, satuan: true } } },
      },
    },
  });

  const grouped = resepList.reduce<Record<string, typeof resepList>>(
    (acc, resep) => {
      const dateKey = new Date(resep.tanggal).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(resep);
      return acc;
    },
    {}
  );

  return (
    <div className="content-area fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Data Resep</h1>
          <p className="page-subtitle">{resepList.length} resep tercatat</p>
        </div>
        <Link href="/resep/baru" className="btn-primary" id="btn-buat-resep-baru">
          <Plus size={16} />
          Buat Resep Baru
        </Link>
      </div>

      {resepList.length === 0 ? (
        <div className="glass-card empty-state" style={{ padding: "60px" }}>
          <ClipboardList size={48} />
          <h3 style={{ color: "#94a3b8", fontSize: "16px", fontWeight: "600" }}>
            Belum ada resep
          </h3>
          <p>Buat resep pertama untuk pasien Anda</p>
          <Link href="/resep/baru" className="btn-primary" style={{ marginTop: "16px" }}>
            <Plus size={15} />
            Buat Resep Pertama
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {Object.entries(grouped).map(([date, reseps]) => (
            <div key={date}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <Calendar size={15} color="#60a5fa" />
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#60a5fa" }}>
                  {date}
                </span>
                <div style={{ flex: 1, height: "1px", background: "#1e2d4a" }} />
                <span className="badge badge-blue">{reseps.length} resep</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {reseps.map((resep) => (
                  <Link
                    key={resep.id}
                    href={`/resep/${resep.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="glass-card"
                      style={{
                        padding: "18px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "44px",
                          height: "44px",
                          background: "rgba(59,130,246,0.12)",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <ClipboardList size={20} color="#60a5fa" />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontWeight: "700",
                            color: "#f1f5f9",
                            fontSize: "15px",
                            marginBottom: "3px",
                          }}
                        >
                          {resep.pasien.nama}
                        </div>
                        <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                          RM: {resep.pasien.noRm} — {resep.diagnosa}
                        </div>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxWidth: "300px" }}>
                        {resep.resepDetail.slice(0, 3).map((d) => (
                          <span key={d.id} className="badge badge-green" style={{ fontSize: "11px" }}>
                            {d.obat.namaObat}
                          </span>
                        ))}
                        {resep.resepDetail.length > 3 && (
                          <span className="badge badge-blue" style={{ fontSize: "11px" }}>
                            +{resep.resepDetail.length - 3} lagi
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
