module.exports = {
  // When not in production, refresh the page on restart
  options: {
    refreshOnRestart: true,
    rebundleModules: {
      // Everything from article-page goes in article bundle
      // (including ui/src/index.js)
      'article-page': 'article',
      // Everything from article-widget goes in main Apostrophe bundle,
      // loaded on every page
      'article-widget': 'main',
      // Remap the "tabs" bundle of "selected-article-widget" module to
      // a bundle "tools".
      'selected-article-widget:tabs': 'tools',
      // Single bundle remapping + demonstrating the "main" word gotcha.
      // The REGULAR "main" bundle of "home-page" goes to the Apostrophe "main"
      // bundle - that is the "public-module-bundle", loaded on every page.
      // Note the my- part of the name. This is currently the only way to target
      // local project modules. '@apostrophecms/home-page:main' would target the
      // the original npm module build only.
      '@apostrophecms/my-home-page:main': 'main'
    }
  }
};
