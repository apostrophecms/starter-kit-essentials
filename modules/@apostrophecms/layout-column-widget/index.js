console.log('I AM HERE');

export default {
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
  },
  init(self) {
    console.log(JSON.stringify(self.schema, null, 2));
  }
};
