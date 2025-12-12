export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'My Widget'
    // stylesWrapper: false
  },
  styles(self, options) {
    console.log('options.myGenericColor', options.myGenericColor);
    return {
      add: {
        myBorder: 'border',
        alignment: 'alignment',
        backgroundColor: {
          type: 'color',
          property: 'background-color'
        },
        isBold: {
          type: 'boolean',
          class: 'bold-text'
        }
      }
    };
  },
  fields: {
    add: {
      title: {
        type: 'string',
        label: 'My Title'
      },
      image: {
        type: 'area',
        label: 'My Image',
        max: 1,
        options: {
          widgets: {
            '@apostrophecms/image': {
              aspectRatio: [ 16, 9 ],
              minSize: [ 1200, 675 ]
            }
          }
        }
      }
    }
  }
};
