module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Another Page'
  },
  fields: {
    add: {
      subtype: {
        type: 'select',
        label: 'Subtype',
        choices: [
          {
            label: 'One',
            value: 'one'
          },
          {
            label: 'Two',
            value: 'two'
          }
        ],
        def: 'default'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'subtype'
        ]
      }
    }
  }
};
