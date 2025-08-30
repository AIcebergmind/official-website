// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Alias comodi per import brevi
  alias: {
    '@layouts': '/src/layouts',
    '@components': '/src/components',
  },

  // Abilita Tailwind v4 via plugin Vite
  vite: {
    plugins: [tailwindcss()],
  },
});
