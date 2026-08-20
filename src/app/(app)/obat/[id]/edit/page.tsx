import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateObat } from "@/app/actions/obatActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Obat — Klinik Digital" };

export default async function EditObatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const obat = await prisma.obat.findUnique({ where: { id } });
  if (!obat) notFound();

  const action = updateObat.bind(null, id);

  return (
    <div className="content-area fade-in">
      <div className="page-header">
        <div>
          <Link
            href="/obat"
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
            <ArrowLeft size={14} /> Kembali ke Daftar Obat
          </Link>
          <h1 className="page-title">Edit Obat</h1>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "32px", maxWidth: "600px" }}>
        <form action={action}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="form-group">
              <label className="label" htmlFor="namaObat-edit">Nama Obat *</label>
              <input id="namaObat-edit" name="namaObat" required className="input-field" defaultValue={obat.namaObat} />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="label" htmlFor="satuan-edit">Satuan *</label>
                <select id="satuan-edit" name="satuan" required className="input-field" defaultValue={obat.satuan}>
                  <option value="tablet">Tablet</option>
                  <option value="kapsul">Kapsul</option>
                  <option value="ml">ml</option>
                  <option value="sachet">Sachet</option>
                  <option value="tube">Tube</option>
                  <option value="botol">Botol</option>
                  <option value="ampul">Ampul</option>
                  <option value="strip">Strip</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label" htmlFor="stok-edit">Stok *</label>
                <input
                  id="stok-edit"
                  name="stok"
                  type="number"
                  min="0"
                  required
                  className="input-field"
                  defaultValue={obat.stok}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="keterangan-edit">Keterangan</label>
              <textarea
                id="keterangan-edit"
                name="keterangan"
                rows={3}
                className="input-field"
                defaultValue={obat.keterangan ?? ""}
                style={{ resize: "vertical" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            <button type="submit" className="btn-primary" id="btn-update-obat">
              Simpan Perubahan
            </button>
            <Link href="/obat" className="btn-secondary">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
