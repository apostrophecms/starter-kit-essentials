export default {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Snippet'
  },
  fields: {
    add: {
      _snippet: {
        type: 'relationship',
        label: 'Snippet',
        withType: 'snippet',
        required: true,
        min: 1,
        max: 1
      }
    }
  }
}