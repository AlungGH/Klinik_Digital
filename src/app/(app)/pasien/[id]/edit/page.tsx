import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updatePasien } from "@/app/actions/pasienActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Pasien — Klinik Digital" };

export default async function EditPasienPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pasien = await prisma.pasien.findUnique({ where: { id } });
  if (!pasien) notFound();

  const action = async (formData: FormData) => {
    "use server";
    await updatePasien(id, formData);
  };

  return (
    <div className="content-area fade-in">
      <div className="page-header">
        <div>
          <Link
            href={`/pasien/${id}`}
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
            <ArrowLeft size={14} /> Kembali ke Detail Pasien
          </Link>
          <h1 className="page-title">Edit Data Pasien</h1>
          <p className="page-subtitle">RM: {pasien.noRm}</p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "32px", maxWidth: "720px" }}>
        <form action={action}>
          <div className="form-grid">
            <div className="form-group">
              <label className="label">Nomor Rekam Medis</label>
              <input
                className="input-field"
                value={pasien.noRm}
                disabled
                style={{ opacity: 0.5, cursor: "not-allowed" }}
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="nama-edit">Nama Lengkap *</label>
              <input
                id="nama-edit"
                name="nama"
                required
                className="input-field"
                defaultValue={pasien.nama}
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="tanggalLahir-edit">Tanggal Lahir *</label>
              <input
                id="tanggalLahir-edit"
                name="tanggalLahir"
                type="date"
                required
                className="input-field"
                defaultValue={pasien.tanggalLahir.toISOString().split("T")[0]}
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="jenisKelamin-edit">Jenis Kelamin *</label>
              <select
                id="jenisKelamin-edit"
                name="jenisKelamin"
                required
                className="input-field"
                defaultValue={pasien.jenisKelamin}
              >
                <option value="LAKI_LAKI">Laki-laki</option>
                <option value="PEREMPUAN">Perempuan</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label" htmlFor="noTelepon-edit">No. Telepon *</label>
              <input
                id="noTelepon-edit"
                name="noTelepon"
                required
                className="input-field"
                defaultValue={pasien.noTelepon}
              />
            </div>

            <div className="form-group full-width">
              <label className="label" htmlFor="alamat-edit">Alamat *</label>
              <textarea
                id="alamat-edit"
                name="alamat"
                required
                rows={3}
                className="input-field"
                defaultValue={pasien.alamat}
                style={{ resize: "vertical" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
            <button type="submit" className="btn-primary" id="btn-update-pasien">
              Simpan Perubahan
            </button>
            <Link href={`/pasien/${id}`} className="btn-secondary">Batal</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
