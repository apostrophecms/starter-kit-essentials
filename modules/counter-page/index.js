module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'Counter Apps Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: {
            'counter-react': {
              example: 'options from the page schema'
            },
            'counter-svelte': {
              example: 'options from the page schema'
            },
            'counter-vue': {
              example: 'options from the page schema'
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
