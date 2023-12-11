module.exports = {
  extend: '@apostrophecms/widget-type',
  fields: {
    add: {
      left: {
        type: 'area',
        label: 'Left',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      },
      right: {
        type: 'area',
        label: 'Right',
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
