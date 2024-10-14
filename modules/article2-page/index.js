module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Article Page'
  },
  webpack: {
    bundles: {
      article2: {
        templates: [ 'show' ]
      }
    }
  },
  build: {
    vite: {
      bundles: {
        article2: {
          templates: [ 'show' ]
        }
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
