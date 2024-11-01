import apostrophe from 'apostrophe';

apostrophe({
  shortName: 'a4-playground',
  root: import.meta,
  modules: {
    // Apostrophe module configuration
    // *******************************
    //
    // NOTE: most configuration occurs in the respective modules' directories.
    // See modules/@apostrophecms/page/index.js for an example.
    //
    // Any modules that are not present by default in Apostrophe must at least
    // have a minimal configuration here to turn them on: `moduleName: {}`
    // ***********************************************************************
    // `className` options set custom CSS classes for Apostrophe core widgets.
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 'bp-rich-text'
      }
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'bp-image-widget'
      }
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'bp-video-widget'
      }
    },
    // use vite for asset bundling and HMR in development
    '@apostrophecms/vite': {},
    // The project's first custom page type.
    'default-page': {},

    // `asset` supports the project's build for client-side assets.
    // Adds a filter to the Nunjucks template engine for converting objects to
    // HTML attribute strings and an API route for storing counter apps.
    // Alias (nunjucks): `app`
    asset: {},

    // `vite-react` adds React support to the project's Vite configuration.
    // Also adds the React Refresh runtime to the head of the page in HMR mode.
    // All other frameworks are configured in the `apos.vite.config.js` file.
    'vite-react': {},

    // The page for all counter app widgets. It also takes care of injecting the
    // framework specific HMR code.
    'counter-page': {},
    // The counter app widgets
    'counter-react-widget': {},
    'counter-svelte-widget': {},
    'counter-vue-widget': {}
  }
});
