import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import autoImport from 'unplugin-auto-import/vite'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: { assetsDir: 'assets' },
  plugins: [
    autoImport({
      imports: [
        'vue',
        'vue-router',
        {
          vuetify: ['useDisplay'],
          '@/plugins/stores': [
            'useAuthStore'
          ]
        }
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    }),
    vue({ 
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/vuetify.scss'
      }
    }),
    vueDevTools(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/styles/variable' as *;
          @use '@/styles/mixin' as *;
        `
      }
    }
  },
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router'
    ]
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
