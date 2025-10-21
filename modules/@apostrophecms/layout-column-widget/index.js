// Modify the layout column widget to allow the desired content types
// in the Layout widget.
export default {
  fields: {
    add: {
      content: {
        type: 'area',
        options: {
          '@apostrophecms/rich-text': {},
          '@apostrophecms/image': {},
          '@apostrophecms/video': {}
        }
      }
    }
  }
};
