import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react(),
  mdx(/* jsxImportSource: …, otherOptions… */),],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
