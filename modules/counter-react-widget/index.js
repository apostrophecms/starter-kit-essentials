export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'React Counter App'
  },
  build: {
    vite: {
      bundles: {
        'counter-react': {}
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
