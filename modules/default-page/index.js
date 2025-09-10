export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: {
            // A standard layout widget
            '@apostrophecms/layout': {
              gap: '2rem'
            },
            // A custom layout widget, with custom options and columns
            'another-layout': {
              gap: '1rem'
            }
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main'
        ]
      }
    }
  }
};
