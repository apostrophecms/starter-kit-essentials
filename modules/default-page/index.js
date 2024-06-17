module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Default Page'
  },
  fields: {
    add: {
      testArray: {
        type: 'array',
        label: 'Test Array',
        fields: {
          add: {
            testObject: {
              type: 'object',
              label: 'Test Object',
              fields: {
                add: {
                  testRequiredString: {
                    type: 'string',
                    label: 'Test Required String',
                    required: true
                  },
                  testString: {
                    type: 'string',
                    label: 'Test Non Required String'
                    // required: true
                  },
                  testArray2: {
                    type: 'array',
                    label: 'Test Array 2',
                    fields: {
                      add: {
                        testObject2: {
                          type: 'object',
                          label: 'Test Object 2',
                          fields: {
                            add: {
                              testRequiredString2: {
                                type: 'string',
                                label: 'Test Required String 2',
                                required: true
                              },
                              testString2: {
                                type: 'string',
                                label: 'Test Non Required String 2',
                                required: true
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              required: true
            }
          }
        }
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
          'testArray',
          'main'
        ]
      }
    }
  }
};
