import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'Recipe Finder',
        short_name: 'Recipes',
        description: 'Discover, plan, and cook delicious meals with ingredients you already have.',
        theme_color: '#7c3aed',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // Cache TheMealDB API responses for offline use
            urlPattern: /^https:\/\/www\.themealdb\.com\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'mealdb-api',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache TheMealDB recipe images for offline use
            urlPattern: /^https:\/\/www\.themealdb\.com\/images\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'mealdb-images',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom'],
          // Animation library
          'vendor-motion': ['framer-motion'],
          // Supabase client
          'vendor-supabase': ['@supabase/supabase-js'],
          // Mock recipe data (split from main bundle)
          'data-recipes': ['./src/data/mockRecipes.js'],
        },
      },
    },
  },
})
