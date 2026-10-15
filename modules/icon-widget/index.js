export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Icon',
    icon: 'shape-icon'
  },
  fields: {
    add: {
      icon: {
        type: 'iconPicker',
        label: 'Icon',
        required: true
      },
      label: {
        type: 'string',
        label: 'Accessible label',
        help: 'Describe what the icon means. Leave empty if it is purely decorative.'
      }
    }
  }
};
