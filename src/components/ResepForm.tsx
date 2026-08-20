"use client";

import { useState } from "react";
import { createResep } from "@/app/actions/resepActions";
import { Plus, Trash2 } from "lucide-react";

interface Obat {
  id: string;
  namaObat: string;
  satuan: string;
  stok: number;
}

interface Pasien {
  id: string;
  nama: string;
  noRm: string;
}

interface ResepFormProps {
  obatList: Obat[];
  pasienList: Pasien[];
  defaultPasienId?: string;
}

export default function ResepForm({
  obatList,
  pasienList,
  defaultPasienId,
}: ResepFormProps) {
  const [obatItems, setObatItems] = useState([
    { obatId: "", jumlah: 1, aturanPakai: "" },
  ]);

  const addObatRow = () => {
    setObatItems([...obatItems, { obatId: "", jumlah: 1, aturanPakai: "" }]);
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
                  gridTemplateColumns: "2fr 100px 1fr auto",
                  gap: "10px",
                  alignItems: "end",
                  padding: "14px",
                  background: "rgba(17,24,39,0.6)",
                  border: "1px solid rgba(30,45,74,0.5)",
                  borderRadius: "10px",
                }}
              >
                {/* Obat dropdown */}
                <div>
                  <label className="label" style={{ fontSize: "11px" }}>
                    Nama Obat
                  </label>
                  <select
                    name="obatId"
                    required
                    className="input-field"
                    value={item.obatId}
                    onChange={(e) => updateObatRow(index, "obatId", e.target.value)}
                    id={`obat-select-${index}`}
                  >
                    <option value="">-- Pilih Obat --</option>
                    {obatList.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.namaObat} (Stok: {o.stok} {o.satuan})
                      </option>
                    ))}
                  </select>
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
