# 🏥 Klinik Digital

Sistem Manajemen Pasien & Obat berbasis web, dibangun dengan **Next.js 14**, **PostgreSQL (Neon)**, dan **NextAuth.js (GitHub OAuth)**.

---

## 🚀 Deploy ke Vercel (Gratis)

### Langkah 1 — Setup Database Neon

1. Daftar/login di [neon.tech](https://neon.tech) menggunakan akun GitHub
2. Klik **"New Project"** → beri nama `klinik-db`
3. Setelah project dibuat, buka tab **"Connection Details"**
4. Copy **connection string** (format: `postgresql://user:pass@host/db?sslmode=require`)

### Langkah 2 — Buat GitHub OAuth App

1. Buka [github.com/settings/developers](https://github.com/settings/developers)
2. Klik **"New OAuth App"**
3. Isi form:
   - **Application name**: `Klinik Digital`
   - **Homepage URL**: `https://NAMA-PROJECT.vercel.app`
   - **Authorization callback URL**: `https://NAMA-PROJECT.vercel.app/api/auth/callback/github`
4. Klik **"Register application"**
5. Copy **Client ID** dan **Client Secret**

### Langkah 3 — Push ke GitHub

```bash
git add .
git commit -m "feat: initial klinik digital app"
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

### Langkah 4 — Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com) dan login dengan GitHub
2. Klik **"New Project"** → import repository Anda
3. Di bagian **"Environment Variables"**, tambahkan:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Connection string dari Neon |
| `NEXTAUTH_SECRET` | String random panjang |
| `NEXTAUTH_URL` | URL Vercel Anda (contoh: `https://klinik.vercel.app`) |
| `GITHUB_ID` | Client ID dari GitHub OAuth App |
| `GITHUB_SECRET` | Client Secret dari GitHub OAuth App |

4. Klik **"Deploy"**

### Langkah 5 — Inisialisasi Database

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

- Login GitHub OAuth
- Manajemen Pasien (CRUD + pencarian)
- Manajemen Obat (inventaris + tracking stok)
- Resep multi-obat (stok otomatis berkurang)
- Dashboard statistik realtime
