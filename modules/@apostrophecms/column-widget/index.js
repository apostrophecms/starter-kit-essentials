export default {
  fields: {
    add: {
      columns: {
        type: 'area',
        // The "special" options for the area will be auto applied.
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
