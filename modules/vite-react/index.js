import { defineConfig } from '@apostrophecms/vite/vite';
import react from '@vitejs/plugin-react';

// NOTE: The Vite configuration is needed only when building
// (task or development application boot).
//
// In a production boot (`NODE_ENV=production node app`), the configuration is never used.
// You might want to use dynamic imports here (`await import(...)`) to
// prevent development dependencies from being included in production mode.
// This can be achieved by conditionally assign `enableReact = defineConfig({ ... })`
// based on an environment variable. Keep in mind root level async/await is supported
// only in ESM projects ("type": "module" in package.json).
//
// For example the following only sends configuration
// to Vite when not in production or when in a CI environment:
// let enableReact = {};
// if (process.env.NODE_ENV !== 'production' || process.env.CI === '1') {
//   const { defineConfig } = await import('@apostrophecms/vite/vite');
//   const react = await import('@vitejs/plugin-react');
//   enableReact = defineConfig({ plugins: [ react.default() ] });
// }
//
// and below in the build object:
// vite: {
//   extensions: {
//     enableReact
//   }
// }

export default {
  build: {
    vite: {
      extensions: {
        enableRact: defineConfig({
          plugins: [ react() ]
        })
        // This is the same as:
        // enableRact: {
        //   plugins: [ react() ]
        // }
      }
    }
  },
  init(self) {
    // Add the React Refresh runtime to the head of the page
    // but only in HMR mode.
    self.apos.template.prepend({
      where: 'head',
      when: 'hmr:public',
      bundler: 'vite',
      component: 'vite-react:reactRefresh'
    });
  },
  components(self) {
    return {
      reactRefresh(req, data) {
        return {};
      }
    };
  }
};
