export default {
  extend: '@apostrophecms/layout-widget',
  options: {
    label: 'Nested Layout',
    columns: 6,
    minSpan: 2,
    defaultSpan: 3
  },
  fields: {
    add: {
      columns: {
        type: 'area',
        options: {
          widgets: {
            'nested-column': {}
          }
        }
      }
    }
  }
};
