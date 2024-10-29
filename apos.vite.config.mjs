import { defineConfig } from '@apostrophecms/vite/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [ react() ]
});
