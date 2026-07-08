import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' makes the built asset paths relative, so the site works
// whether it's hosted at a root domain (Netlify) or a sub-path (GitHub Pages).
// The proxy sends /api requests to the Express server during "npm run dev"
// so I don't have to deal with CORS locally.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
