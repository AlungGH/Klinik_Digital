"use client";

import { useState } from "react";
import { createResep } from "@/app/actions/resepActions";
import { Plus, Trash2 } from "lucide-react";



interface Pasien {
  id: string;
  nama: string;
  noRm: string;
}

interface ResepFormProps {
  pasienList: Pasien[];
  defaultPasienId?: string;
}

export default function ResepForm({
  pasienList,
  defaultPasienId,
}: ResepFormProps) {
  const [obatItems, setObatItems] = useState([
    { namaObat: "", satuan: "", jumlah: 1, aturanPakai: "" },
  ]);

  const addObatRow = () => {
    setObatItems([...obatItems, { namaObat: "", satuan: "", jumlah: 1, aturanPakai: "" }]);
  };

  const removeObatRow = (index: number) => {
    if (obatItems.length === 1) return;
    setObatItems(obatItems.filter((_, i) => i !== index));
  };

  const updateObatRow = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...obatItems];
    updated[index] = { ...updated[index], [field]: value };
    setObatItems(updated);
  };

  return (
    <form action={createResep}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Pasien */}
        <div className="form-group">
          <label className="label" htmlFor="pasienId">
            Pasien *
          </label>
          <select
            id="pasienId"
            name="pasienId"
            required
            className="input-field"
            defaultValue={defaultPasienId ?? ""}
          >
            <option value="">-- Pilih Pasien --</option>
            {pasienList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama} (RM: {p.noRm})
              </option>
            ))}
          </select>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="label" htmlFor="tanggal">
              Tanggal Kunjungan *
            </label>
            <input
              id="tanggal"
              name="tanggal"
              type="date"
              required
              className="input-field"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="diagnosa">
              Diagnosa *
            </label>
            <input
              id="diagnosa"
              name="diagnosa"
              required
              className="input-field"
              placeholder="Contoh: ISPA, Hipertensi, dll."
            />
          </div>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="catatan">
            Catatan (opsional)
          </label>
          <textarea
            id="catatan"
            name="catatan"
            rows={2}
            className="input-field"
            placeholder="Catatan tambahan untuk pasien..."
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Daftar Obat */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <label className="label" style={{ margin: 0 }}>
              Daftar Obat *
            </label>
            <button
              type="button"
              onClick={addObatRow}
              className="btn-secondary"
              style={{ padding: "6px 12px", fontSize: "13px" }}
              id="btn-tambah-baris-obat"
            >
              <Plus size={14} />
              Tambah Obat
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {obatItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 100px 100px 1fr auto",
                  gap: "10px",
                  alignItems: "end",
                  padding: "14px",
                  background: "var(--bg-item)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "10px",
                }}
              >
                {/* Obat text */}
                <div>
                  <label className="label" style={{ fontSize: "11px" }}>
                    Nama Obat
                  </label>
                  <input
                    name="namaObat"
                    type="text"
                    required
                    className="input-field"
                    placeholder="Contoh: Paracetamol"
                    value={item.namaObat}
                    onChange={(e) => updateObatRow(index, "namaObat", e.target.value)}
                    id={`namaObat-${index}`}
                  />
                </div>

                {/* Satuan */}
                <div>
                  <label className="label" style={{ fontSize: "11px" }}>
                    Satuan
                  </label>
                  <input
                    name="satuan"
                    type="text"
                    required
                    className="input-field"
                    placeholder="Contoh: tablet"
                    value={item.satuan}
                    onChange={(e) => updateObatRow(index, "satuan", e.target.value)}
                    id={`satuan-${index}`}
                  />
                </div>

                {/* Jumlah */}
                <div>
                  <label className="label" style={{ fontSize: "11px" }}>
                    Jumlah
                  </label>
                  <input
                    name="jumlah"
                    type="number"
                    min="1"
                    required
                    className="input-field"
                    value={item.jumlah}
                    onChange={(e) =>
                      updateObatRow(index, "jumlah", parseInt(e.target.value))
                    }
                    id={`jumlah-${index}`}
                  />
                </div>

                {/* Aturan pakai */}
                <div>
                  <label className="label" style={{ fontSize: "11px" }}>
                    Aturan Pakai
                  </label>
                  <input
                    name="aturanPakai"
                    required
                    className="input-field"
                    placeholder="Contoh: 3x1 sesudah makan"
                    value={item.aturanPakai}
                    onChange={(e) =>
                      updateObatRow(index, "aturanPakai", e.target.value)
                    }
                    id={`aturan-${index}`}
                  />
                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeObatRow(index)}
                  className="btn-danger"
                  style={{ padding: "10px", width: "40px", justifyContent: "center" }}
                  disabled={obatItems.length === 1}
                  id={`btn-hapus-baris-${index}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <button type="submit" className="btn-primary" id="btn-simpan-resep">
            Simpan Resep
          </button>
        </div>
      </div>
    </form>
  );
}
