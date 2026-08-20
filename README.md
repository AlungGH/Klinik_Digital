# 🏥 Klinik Digital

Sistem Manajemen Pasien & Obat berbasis web, dibangun dengan **Next.js 14**, **PostgreSQL (Neon)**, dan **NextAuth.js (GitHub OAuth)**.

---

## 🚀 Deploy ke Vercel (Gratis)

### Langkah 1 — Setup Database Neon

1. Daftar/login di [neon.tech](https://neon.tech) menggunakan akun GitHub
2. Klik **"New Project"** → beri nama `klinik-db`
3. Setelah project dibuat, buka tab **"Connection Details"**
4. Copy **connection string** (format: `postgresql://user:pass@host/db?sslmode=require`)



### Langkah 2 — Push ke GitHub

```bash
git add .
git commit -m "feat: initial klinik digital app"
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

### Langkah 3 — Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) dan login dengan akun Anda
2. Klik **"New Project"** → import repository Anda
3. Di bagian **"Environment Variables"**, tambahkan:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Connection string dari Neon |
| `NEXTAUTH_SECRET` | String random panjang (bisa pakai website generator) |
| `NEXTAUTH_URL` | URL Vercel Anda (contoh: `https://klinik.vercel.app`) |

4. Klik **"Deploy"**

### Langkah 4 — Inisialisasi Database

Setelah deploy berhasil, jalankan perintah ini sekali:

```bash
npx prisma db push
```

---

## 💻 Jalankan Lokal

```bash
npm install
cp .env.example .env.local
# Edit .env.local dengan nilai Anda
npx prisma db push
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## ✨ Fitur

- Login menggunakan Akun Demo
- Manajemen Pasien (CRUD + pencarian)
- Manajemen Obat (inventaris + tracking stok)
- Resep multi-obat (stok otomatis berkurang)
- Dashboard statistik realtime
