module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'article',
    label: 'Recent Articles',
    icon: 'text-icon'
  },
  webpack: {
    bundles: {
      topic: {},
      carousel: {}
    }
  },
  build: {
    vite: {
      bundles: {
        topic: {},
        carousel: {}
      }
    }
  },
  fields: {
    add: {
      limit: {
        type: 'integer',
        label: 'Limit',
        def: 5
      }
    }
  },
  icons: {
    'text-icon': 'Text'
  }
};
