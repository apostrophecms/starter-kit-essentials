module.exports = {
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
      },
      aposTranslationMeta: {
        type: 'tmeta',
        label: 'Translation meta debug',
        help: 'It is here because apos needs field in ' +
          'order to save our meta (it needs a core fix). It also showcases ' +
          'the meta data saved in the DB for the need of the demo.'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main'
        ]
      },
      debug: {
        label: 'Debug',
        fields: [
          'aposTranslationMeta'
        ]
      }
    }
  },

  init(self) {
    self.apos.schema.addFieldType({
      name: 'tmeta',
      vueComponent: 'TranslationMetaField',
      async convert(req, field, data, destination) {
        destination[field.name] = data[field.name];
      },
      def: null
    });
  }
};
