module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    name: 'selected-article',
    label: 'Selected Articles',
    icon: 'text-icon',
    previewIcon: 'alpha-x-icon',
    previewImage: 'article.jpg'
  },
  webpack: {
    bundles: {
      tabs: {}
    }
  },
  build: {
    vite: {
      bundles: {
        tabs: {}
      }
    }
  },
  fields: {
    add: {
      _articles: {
        type: 'relationship',
        label: 'Articles'
      }
    }
  },
  icons: {
    'text-icon': 'Text'
  }
};
