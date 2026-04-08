export default {
  styles: {
    add: {
      background: 'background'
    }
  },
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {},
            'nested-layout': {}
          }
        }
      }
    }
  }
};
