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
            '@apostrophecms/layout': {
              columns: 12,
              gap: '0 32px',
              minSpan: 2
            }
            // '@apostrophecms/rich-text': {},
            // '@apostrophecms/image': {},
            // '@apostrophecms/video': {}
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
