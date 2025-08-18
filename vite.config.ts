import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// import 'vuetify/styles'

// https://vite.dev/config/
export default defineConfig({
   base: '/GestorDeTareas/',
  plugins: [vue(), vueDevTools()],
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'], // importante para las fuentes
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
