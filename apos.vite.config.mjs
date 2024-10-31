import { defineConfig } from '@apostrophecms/vite/vite';

import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    vue(),
    svelte({
      // Why Svelte? Why it's not a default?
      preprocess: vitePreprocess()
    })
  ],
  server: {
    watch: {
      // So that Tailwind CSS changes in the nunjucks templates do not trigger
      // page reloads. This is done by `nodemon` because we need a process restart.
      ignored: [
        path.join(__dirname, 'modules/views/**/*.html'),
        path.join(__dirname, 'views/**/*.html')
      ]
    }
  }
});
