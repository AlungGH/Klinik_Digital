import { createPasien } from "@/app/actions/pasienActions";
import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tambah Pasien — Klinik Digital",
};

export default function TambahPasienPage() {
  return (
    <div className="content-area fade-in">
      <div className="page-header">
        <div>
          <Link
            href="/pasien"
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
            <ArrowLeft size={14} /> Kembali ke Daftar Pasien
          </Link>
          <h1 className="page-title">Tambah Pasien Baru</h1>
          <p className="page-subtitle">Isi data rekam medis pasien dengan lengkap</p>
        </div>
      </div>

      <div className="glass-card form-card" style={{ maxWidth: "720px" }}>
        <form action={createPasien}>
          <div className="form-grid">
            <div className="form-group">
              <label className="label" htmlFor="noRm">
                Nomor Rekam Medis *
              </label>
              <input
                id="noRm"
                name="noRm"
                required
                className="input-field"
                placeholder="Contoh: RM-2025-001"
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="nama">
                Nama Lengkap *
              </label>
              <input
                id="nama"
                name="nama"
                required
                className="input-field"
                placeholder="Nama lengkap pasien"
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="tanggalLahir">
                Tanggal Lahir *
              </label>
              <input
                id="tanggalLahir"
                name="tanggalLahir"
                type="date"
                required
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="jenisKelamin">
                Jenis Kelamin *
              </label>
              <select id="jenisKelamin" name="jenisKelamin" required className="input-field">
                <option value="">-- Pilih --</option>
                <option value="LAKI_LAKI">Laki-laki</option>
                <option value="PEREMPUAN">Perempuan</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="noTelepon">
                No. Telepon *
              </label>
              <input
                id="noTelepon"
                name="noTelepon"
                required
                className="input-field"
                placeholder="08xxxxxxxxxx"
              />
            </div>

            <div className="form-group full-width">
              <label className="label" htmlFor="alamat">
                Alamat *
              </label>
              <textarea
                id="alamat"
                name="alamat"
                required
                rows={3}
                className="input-field"
                placeholder="Alamat lengkap pasien"
                style={{ resize: "vertical" }}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" id="btn-simpan-pasien">
              <UserPlus size={16} />
              Simpan Pasien
            </button>
            <Link href="/pasien" className="btn-secondary">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
