export default {
  extend: '@apostrophecms/layout-column-widget',
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      }
    }
  }
};
