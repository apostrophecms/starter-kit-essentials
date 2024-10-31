module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Vue Counter App'
  },
  build: {
    vite: {
      bundles: {
        'counter-vue': {}
      }
    }
  },
  fields: {
    add: {
      title: {
        label: 'Title',
        type: 'string',
        required: true
      }
    }
  }
};
