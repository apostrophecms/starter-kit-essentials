export default {
  // Showcase extended layout column widget with custom content area
  extend: '@apostrophecms/layout-column-widget',
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      }
    }
  }
};
