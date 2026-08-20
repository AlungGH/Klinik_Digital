import { createObat } from "@/app/actions/obatActions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tambah Obat — Klinik Digital" };

export default function TambahObatPage() {
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
          <h1 className="page-title">Tambah Obat Baru</h1>
          <p className="page-subtitle">Daftarkan obat baru ke dalam inventaris klinik</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "32px", maxWidth: "600px" }}>
        <form action={createObat}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="form-group">
              <label className="label" htmlFor="namaObat">Nama Obat *</label>
              <input id="namaObat" name="namaObat" required className="input-field" placeholder="Contoh: Paracetamol 500mg" />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="label" htmlFor="satuan">Satuan *</label>
                <select id="satuan" name="satuan" required className="input-field">
                  <option value="">-- Pilih Satuan --</option>
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
                <label className="label" htmlFor="stok">Stok Awal *</label>
                <input
                  id="stok"
                  name="stok"
                  type="number"
                  min="0"
                  required
                  className="input-field"
                  placeholder="0"
                  defaultValue="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="keterangan">Keterangan</label>
              <textarea
                id="keterangan"
                name="keterangan"
                rows={3}
                className="input-field"
                placeholder="Deskripsi obat, indikasi, dll. (opsional)"
                style={{ resize: "vertical" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            <button type="submit" className="btn-primary" id="btn-simpan-obat">
              Simpan Obat
            </button>
            <Link href="/obat" className="btn-secondary">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
