// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Estabilidade definitiva: Astro 6 + Tailwind v4 + React + Lucide Icons + Sitemap
export default defineConfig({
  site: 'https://tatabox.github.io',
  vite: {
    plugins: [tailwindcss()],
    // Garante que o lucide-react seja processado como ESM, evitando o erro 'undefined' no build
    ssr: {
      noExternal: ['lucide-react']
    },
    // Otimização para o dev server (Vite 6)
    optimizeDeps: {
      exclude: ['@tailwindcss/vite']
    }
  },
  integrations: [react(), sitemap()]
});
