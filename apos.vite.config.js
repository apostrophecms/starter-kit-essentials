import { defineConfig } from '@apostrophecms/vite/vite';

// import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';

import path from 'node:path';

export default defineConfig({
  plugins: [
    // react(),
    vue(),
    svelte({
      // We need to tell Svelte where to find the config file,
      // because the Vite root is not the same as the Apostrophe root.
      configFile: path.join(__dirname, 'svelte.config.js')
    })
  ],
  server: {
    watch: {
      // So that Tailwind CSS changes in the nunjucks templates do not trigger Vite
      // page reloads. This is done by `nodemon` because we need a process restart.
      ignored: [
        // path.join(__dirname, 'modules/views/**/*.html'),
        // path.join(__dirname, 'views/**/*.html')
        '**/modules/views/**/*.html',
        '**/views/**/*.html'
      ]
    }
  }
});
