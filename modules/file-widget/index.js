export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'File'
  },
  fields: {
    add: {
      __file: {
        type: 'relationship',
        label: 'File',
        max: 1,
        required: true,
        withType: '@apostrophecms/file'
      }
    }
  }
}
