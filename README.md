# Dev Journey Log

Portfolio sekaligus blog catatan belajar full-stack development. Project ini berawal dari repository HTML/CSS statis lama yang saya bangun ulang menjadi aplikasi full-stack, sebagai media latihan clean code, SQL, dan deployment.

**Live demo:** [Project Rust](https://projek-rust.vercel.app/)

## Fitur

- Halaman publik: Beranda, Tentang, Blog (daftar post) dan detail post berdasarkan slug
- Halaman admin yang dilindungi login (Supabase Auth)
- CRUD post dari dashboard admin: tambah, edit, hapus
- Slug otomatis dibuat dari judul saat menulis post
- Keamanan data lewat Row Level Security (RLS): publik hanya bisa membaca, hanya user login yang bisa menulis

## Tech Stack

| Bagian          | Teknologi                         |
| --------------- | --------------------------------- |
| Framework       | Next.js (App Router) + TypeScript |
| Styling         | Tailwind CSS + shadcn/ui          |
| Database & Auth | Supabase (PostgreSQL)             |
| Icon            | react-icons                       |
| Deployment      | Vercel                            |

## Struktur Folder

```
src/
├── app/
│   ├── layout.tsx            # Root layout (Navbar, Footer)
│   ├── page.tsx              # Beranda
│   ├── blog/                 # Daftar post + [slug]
│   ├── tentang/              # Halaman Tentang
│   ├── login/                # Login admin
│   └── admin/                # Dashboard, tambah & edit post (terproteksi)
├── components/
│   ├── ui/                   # Komponen shadcn/ui
│   └── shared/               # Navbar, Footer, LogoutButton, dll
└── lib/
    └── supabase/             # Supabase client (server & browser)
```

## Menjalankan di Lokal

1. Clone repository dan install dependency:

   ```bash
   git clone https://github.com/atheo810/NAMA_REPO.git
   cd NAMA_REPO
   npm install
   ```

2. Buat file `.env.local` di root project:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```

   Nilainya ada di dashboard Supabase: Project Settings, API.

3. Siapkan database (jalankan di SQL Editor Supabase):

   ```sql
   create table posts (
     id uuid default gen_random_uuid() primary key,
     title text not null,
     slug text unique not null,
     content text not null,
     created_at timestamptz default now()
   );

   alter table posts enable row level security;

   create policy "public can read posts"
   on posts for select using (true);

   create policy "authenticated can insert posts"
   on posts for insert to authenticated with check (true);

   create policy "authenticated can update posts"
   on posts for update to authenticated using (true);

   create policy "authenticated can delete posts"
   on posts for delete to authenticated using (true);
   ```

4. Buat satu user admin di Supabase: Authentication, Users, Add user.

5. Jalankan development server:

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000). Halaman admin ada di `/login`.

## Yang Saya Pelajari

- Routing dan nested layout di Next.js App Router, termasuk memisahkan halaman login dari layout yang diproteksi
- Perbedaan Supabase client untuk Server Component dan Client Component (`@supabase/ssr`)
- Membuat dan menguji Row Level Security policy
- Alur deployment: GitHub, Vercel, environment variable, dan konfigurasi Supabase untuk production

## Rencana Selanjutnya

- Render konten post sebagai Markdown
- Tag dan filter post
- Middleware untuk refresh session
- Kolom `updated_at`

## Author

Muhammad Patriot Bayu Santosa
[GitHub](https://github.com/atheo810) · [LinkedIn](https://linkedin.com/in/patriotsantosa)
