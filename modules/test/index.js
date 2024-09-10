const objectField = (label, schema = {}, options = {}) => {
  return {
    type: 'object',
    label,
    fields: {
      add: {
        ...schema
      }
    },
    ...options
  };
};

module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      baseFieldWordings: {
        label: 'aposFormTranslationsConfiguration:baseFieldWordingsLabel',
        type: 'object',
        fields: {
          add: {
            required: {
              label: 'aposFormTranslationsConfiguration:baseFieldRequiredErrorLabel',
              type: 'string',
              def: 'default value'
            }
          }
        }
      },
      behaviorContact: objectField('Behavior', {
        topicOptions: {
          type: 'checkboxes',
          label: 'Topic options',
          choices: [
            {
              label: 'topic1',
              value: 'topic1'
            },
            {
              label: 'topic2',
              value: 'topic2'
            },
            {
              label: 'topic3',
              value: 'topic3'
            }
          ],
          required: true
        },
        firstname: objectField('Firstname', {
          display: {
            label: 'Display',
            type: 'boolean',
            required: true,
            def: false
          },
          test: objectField('Test', {
            testNested: {
              label: 'Test Nested',
              type: 'boolean',
              required: true,
              def: false
            }
          })
        }),
        lastname: objectField('Lastname', {
          display: {
            label: 'Display',
            type: 'boolean',
            required: true,
            def: true
          }
        }),
        email: objectField('Email', {
          display: {
            label: 'Display',
            type: 'boolean',
            required: true,
            def: true
          },
          emailRequired: {
            type: 'boolean',
            label: 'Email Required',
            required: true,
            def: true
          }
        }),
        phoneNumber: objectField('Phone Number', {
          display: {
            label: 'Display',
            type: 'boolean',
            required: true,
            def: true
          },
          phoneRequired: {
            type: 'boolean',
            label: 'Phone Required',
            required: true,
            def: true
          }
        }),
        address: objectField('Address', {
          display: {
            label: 'Display',
            type: 'boolean',
            required: true,
            def: true
          }
        }),
        city: objectField('City', {
          display: {
            label: 'Display',
            type: 'boolean',
            required: true,
            def: true
          }
        }),
        pinCode: objectField('Pincode', {
          display: {
            label: 'Display',
            type: 'boolean',
            required: true,
            def: true
          }
        })
      })
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'behaviorContact',
          'baseFieldWordings'
        ]
      }
    }
  }
};
