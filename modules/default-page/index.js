export default {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page'
  },
  fields: {
    add: {
      preface: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'italic', 'bold' ]
            },
            '@apostrophecms/image': {
              minSize: [ 1024, 1024 ]
            }
          }
        }
      },
      main: {
        type: 'area',
        options: {
          expanded: true,
          groups: {
            basic: {
              label: 'Basic',
              widgets: {
                '@apostrophecms/rich-text': {}
              },
              columns: 2
            },
            media: {
              label: 'Media',
              widgets: {
                '@apostrophecms/image': {
                  minSize: [ 764, 764 ]
                },
                '@apostrophecms/video': {}
              }
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
