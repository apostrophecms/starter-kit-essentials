module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      title: {
        label: 'Title',
        type: 'string',
        required: true
      },
      description: {
        label: 'Description',
        type: 'string'
      },
      test: {
        label: 'Test',
        type: 'boolean',
        required: true
      },
      object: {
        label: 'Object',
        type: 'object',
        fields: {
          add: {
            objectTitle: {
              label: 'Object Title',
              type: 'string',
              required: true
            },
            select: {
              label: 'Select',
              type: 'select',
              choices: [
                {
                  label: 'Oui',
                  value: true
                },
                {
                  label: 'Non',
                  value: false
                }
              ],
              def: false
            }

          }
        }
      },

      array: {
        label: 'Array',
        type: 'array',
        inline: true,
        fields: {
          add: {
            toto: {
              label: 'toto',
              type: 'string',
              if: {
                showToto: true
              }
            },
            showToto: {
              label: 'Require Toto',
              type: 'boolean',
              def: false
            }
          }
        }
      }
    },
    group: {
      basics: {
        fields: [ 'title', 'description', 'test', 'object', 'array' ]
      }
    }
  }
};
