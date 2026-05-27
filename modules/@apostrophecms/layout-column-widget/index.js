export default {
  options: {
    // Do not display tabs when there is only one.
    // Since there is only one Styles tab, it will be hidden.
    hideSingleTab: true
  },
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
    },
    // Let the content be shown in the Styles tab schema.
    // Keep in mind this is only a visual change, no layout logic is affected.
    group: {
      styles: {
        fields: [ 'content' ]
      }
    }
  }
};
