export default {
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
            '@apostrophecms/rich-text': {},
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
