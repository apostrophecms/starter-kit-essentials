module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Svelte Counter App'
  },
  build: {
    vite: {
      bundles: {
        'counter-svelte': {}
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
