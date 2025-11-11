export default {
  extend: '@apostrophecms/widget-type',
  fields: {
    add: {
      cards: {
        type: 'array',
        inline: true,
        style: 'table',
        fields: {
          add: {
            text: {
              type: 'string',
              textarea: true
            },
          }
        }
      },
      stylesMain: {
        label: 'Main',
        type: 'object',
        fields: {
          add: {
            padding: {
              type: 'boolean',
              def: false
            },
            border: {
              type: 'boolean',
              def: false
            }
          }
        }
      },
      stylesCards: {
        label: 'Cards',
        type: 'object',
        fields: {
          add: {
            padding: {
              type: 'boolean',
              def: false
            },
            border: {
              type: 'boolean',
              def: true
            }
          }
        }
      }
    },
    group: {
      content: {
        label: 'Content',
        fields: [ 'cards' ]
      },
      styles: {
        label: 'Styles',
        fields: [ 'stylesMain', 'stylesCards' ]
      }
    }
  }
}