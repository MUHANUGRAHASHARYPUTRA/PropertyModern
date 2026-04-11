<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/23fa9d0d-80f6-4a33-93d0-106410472525

## Run Locally\n\n**Prerequisites:** Node.js\n\n1. Install dependencies: `npm install`\n2. Copy `.env.example` to `.env.local` and fill any required keys (e.g., Google Maps API).\n3. Run development: `npm run dev`\n4. Run production: `npm run build && npm start`\n\n## Deploy ke Vercel\n\n1. **Push ke GitHub:**\n   ```bash\ngit init\ngit add .\ngit commit -m \"Prepare for Vercel deploy\"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USERNAME/property-modern.git\ngit push -u origin main\n   ```\n   (Ganti YOUR_USERNAME dan buat repo di GitHub dulu)\n\n2. **Vercel Account:** Daftar di [vercel.com](https://vercel.com) (gratis).\n\n3. **Deploy:**\n   - Login Vercel → New Project → Import GitHub repo.\n   - Configure: Framework = Next.js, Root Dir = `./` (default).\n   - Environment Vars: Tambah dari `.env.example` jika ada (e.g., NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).\n   - Deploy! Auto-build on push.\n\n4. **Custom Domain (opsional):** Tambah di Vercel dashboard.\n\n**Catatan:**\n- Build berhasil lokal (Next.js 15).\n- `output: 'standalone'` di next.config.ts optimal untuk Vercel.\n- Cek Google Maps (components/MapSection): Butuh API key untuk marker.\n- Site live di preview URL Vercel.
