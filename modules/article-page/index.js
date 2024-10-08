module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Article Page'
  },
  webpack: {
    bundles: {
      main: {}
    }
  },
  build: {
    vite: {
      bundles: {
        main: {}
      }
    }
  },
  fields: {
    add: {
      intro: {
        type: 'area',
        label: 'Introduction',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'Bold', 'Italic' ]
            }
          }
        }
      }
    }
  }
};
