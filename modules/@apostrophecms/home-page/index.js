module.exports = {
  options: {
    label: 'Home Page'
  },
  fields: {
    add: {
      test: {
        type: 'test',
        label: 'Test'
      },
      main: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                '|',
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'bulletList',
                'orderedList'
              ],
              styles: [
                {
                  tag: 'p',
                  label: 'Paragraph (P)'
                },
                {
                  tag: 'h3',
                  label: 'Heading 3 (H3)'
                },
                {
                  tag: 'h4',
                  label: 'Heading 4 (H4)'
                }
              ],
              insert: [
                'table',
                'image'
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
          'main',
          'test'
        ]
      }
    }
  },
  init(self) {
    self.apos.schema.addFieldType({
      name: 'test',
      convert(req, field, data, object) {
        object[field.name] = self.apos.launder.string(data[field.name]);
      },
      vueComponent: 'TestField'
    });
  }
};
