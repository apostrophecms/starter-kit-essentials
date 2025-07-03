import { defineConfig } from '@apostrophecms/vite/vite';

export default defineConfig({
  server: {
    hmr: {
      protocol: 'wss',
      host: 'b75daf165449.ngrok.app',
    },
    origin: 'https://b75daf165449.ngrok.app',
    cors: true,
    strictPort: true
  }
});