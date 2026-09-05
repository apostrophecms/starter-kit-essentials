export default {
  handlers(self) {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = (process.env.NODE_ENV !== 'production');
        }
      }
    };
  },
  apiRoutes(self) {
    return {
      get: {
        bundleMarkup(req) {
          let content = 'scripts\nstylesheets';
          content = self.apos.template.insertBundlesMarkup({
            scene: 'public',
            content,
            scriptsPlaceholder: 'scripts',
            stylesheetsPlaceholder: 'stylesheets',
            widgetsBundles: {}
          });
          return content;
        }
      }
    };
  }
};
