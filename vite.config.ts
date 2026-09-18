import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import {fileURLToPath, URL} from 'node:url';

const apiProxyTarget =
  process.env.VITE_API_PROXY_TARGET?.trim() ||
  process.env.API_PROXY_TARGET?.trim() ||
  'http://127.0.0.1:3002';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@shared': fileURLToPath(new URL('./packages/shared/src', import.meta.url)),
      '@training/shared': fileURLToPath(new URL('./packages/shared/src', import.meta.url)),
    },
  },
  server: {
    host: true,
    allowedHosts: true,
    watch: {
      ignored: ['**/_tmp_auth_sync/**', '**/_tmp_*/**', '**/public/imagePhone/**'],
    },
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'safari15',
  },
});
