const path = require('node:path');
module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'Article Page'
  },
  webpack: {
    bundles: {
      main: {}
    },
    extensions: {
      topic: {
        resolve: {
          alias: {
            Utils: path.join(process.cwd(), 'lib/utils/')
          }
        }
      },
      ext1 ({ mode, alias = {} }) {
        return {
          mode,
          resolve: {
            alias: {
              ext1: 'ext1-path',
              ...alias
            }
          }
        };
      }
    },
    extensionOptions: {
      ext1: {
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
      }
    }
  },
  build: {
    vite: {
      bundles: {
        main: {}
      },
      extensions: {
        topic: {
          resolve: {
            alias: {
              Utils: path.join(process.cwd(), 'lib/utils/')
            }
          }
        },
        ext1 ({ mode, alias = {} }) {
          return {
            mode,
            resolve: {
              alias: {
                ext1: 'ext1-path',
                ...alias
              }
            }
          };
        }
      },
      extensionOptions: {
        ext1: {
          mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
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
