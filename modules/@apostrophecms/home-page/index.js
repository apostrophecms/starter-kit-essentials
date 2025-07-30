export default {
  options: {
    label: 'Home Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              styles: [
                {
                  tag: 'p',
                  class: 'red',
                  label: 'Red P (Default, Edge Case)'
                },
                {
                  tag: 'p',
                  label: 'Plain Paragraph'
                },
                {
                  tag: 'p',
                  class: 'green',
                  label: 'Green P'
                },
                {
                  tag: 'h1',
                  label: 'H1'
                },
                {
                  tag: 'h2',
                  label: 'H2'
                },
                {
                  tag: 'h2',
                  class: 'red',
                  label: 'H2 Red'
                },
                {
                  tag: 'h2',
                  class: 'green',
                  label: 'H2 Green'
                }
              ]
            },
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
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
