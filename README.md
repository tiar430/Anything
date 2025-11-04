# Anything - Build and Deploy Mobile Apps with AI

Aplikasi web full-stack yang dibangun dengan React Router 7, Hono server, dan PostgreSQL untuk membangun dan deploy aplikasi mobile menggunakan teknologi AI.

## 🚀 Quick Start

### Prasyarat

- [Bun](https://bun.sh) (versi terbaru)
- [PostgreSQL](https://www.postgresql.org/) (versi 15 atau lebih tinggi)
- Node.js 20+ (opsional, untuk kompatibilitas)

### Instalasi Otomatis

Gunakan script setup untuk instalasi cepat:

**Menggunakan Bash:**
```bash
chmod +x setup.sh
./setup.sh
```

**Menggunakan Node.js:**
```bash
node setup.js
```

Script ini akan:
- ✅ Membuat file `.env` dari template
- ✅ Generate `AUTH_SECRET` otomatis
- ✅ Install semua dependencies

### Setup Manual

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd anything
   ```

2. **Install dependencies**
   ```bash
   cd Web
   bun install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` dan update:
   - `DATABASE_URL`: PostgreSQL connection string Anda
   - `AUTH_SECRET`: Generate dengan `openssl rand -base64 32`

4. **Setup database**
   
   Jalankan SQL commands dari `replit.md` untuk membuat tabel:
   - `auth_users`, `auth_accounts`, `auth_sessions`, `auth_verification_token`
   - `brands`, `programs`

5. **Jalankan development server**
   ```bash
   bun run dev
   ```
   
   Akses aplikasi di `http://localhost:5000`

## 📁 Struktur Proyek

```
Web/
├── __create/           # Server setup dan middleware
│   ├── index.ts       # Konfigurasi Hono server
│   ├── adapter.ts     # PostgreSQL auth adapter
│   └── route-builder.ts
├── plugins/           # Vite plugins
├── src/
│   ├── app/           # Route dan halaman aplikasi
│   │   ├── api/       # API endpoints
│   │   │   ├── auth/  # Authentication
│   │   │   ├── brands/# Brand management
│   │   │   └── programs/# Program management
│   │   ├── layout.jsx # Root layout
│   │   └── page.jsx   # Home page
│   └── utils/         # Client utilities
└── package.json
```

## 🛠 Tech Stack

- **Frontend**: React 18 + React Router 7
- **Server**: Hono (Node.js)
- **Database**: PostgreSQL (Neon)
- **Auth**: Auth.js dengan Hono adapter
- **Styling**: Tailwind CSS 4 + Chakra UI
- **Build**: Vite 6
- **Runtime**: Bun

## 📝 Scripts Tersedia

Dari direktori `Web`:

```bash
# Development
bun run dev          # Start dev server (port 5000)

# Production
bun run build        # Build untuk production
bun run start        # Jalankan production server

# Utilities
bun run typecheck    # TypeScript type checking
bun run clean        # Bersihkan build artifacts
```

## 🔑 Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `AUTH_SECRET`: Secret key untuk JWT authentication

### Optional
- `CORS_ORIGINS`: Allowed CORS origins (comma-separated)
- `NEXT_PUBLIC_*`: Public environment variables

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signin/credentials-signin` - Login
- `POST /api/auth/signin/credentials-signup` - Register
- `GET /api/auth/session` - Get session

### Brands
- `POST /api/brands/create` - Buat brand baru
- `GET /api/brands/list` - List semua brands

### Programs
- `POST /api/programs/create` - Buat program baru
- `GET /api/programs/list` - List programs dengan filter
- `PATCH /api/programs/update` - Update program

## 🚢 Deployment

### Replit
Aplikasi sudah dikonfigurasi untuk Replit:
- **Deployment Type**: Autoscale
- **Build**: `cd Web && bun run build`
- **Run**: `cd Web && bun run start`
- **Port**: 5000

### GitHub Actions
CI/CD workflow sudah tersedia di `.github/workflows/ci.yml`:
- Type checking
- Build verification
- Automated testing (dengan PostgreSQL service)

## 🤝 Contributing

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan lengkap tentang:
- Development workflow
- Coding standards
- Pull request process
- Testing guidelines

## 📖 Dokumentasi Lengkap

Untuk informasi teknis lebih detail, lihat:
- [replit.md](replit.md) - Dokumentasi teknis lengkap
- [CONTRIBUTING.md](CONTRIBUTING.md) - Panduan kontribusi

## 🐛 Troubleshooting

### Port sudah digunakan
Jika port 5000 sudah digunakan, edit `Web/vite.config.ts`:
```typescript
server: {
  port: 3000, // Ganti dengan port yang tersedia
}
```

### Database connection error
- Pastikan PostgreSQL berjalan
- Cek `DATABASE_URL` di `.env`
- Pastikan database tables sudah dibuat

### Build errors
```bash
cd Web
bun run clean
bun install
bun run build
```

## 📄 License

[Sesuaikan dengan license proyek Anda]

## 👥 Team

[Tambahkan informasi team Anda]

---

Dibuat dengan ❤️ menggunakan React Router 7 + Hono + PostgreSQL
