import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { imageToWebpPlugin } from 'vite-plugin-image-to-webp'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    imageToWebpPlugin({
      imageFormats: ['jpg', 'jpeg', 'png'],
      webpQuality: {},
      destinationFolder: 'dist',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
