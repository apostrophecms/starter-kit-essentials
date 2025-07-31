export default {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Snippet',
    pluralLabel: 'Snippets'
  },
  fields: {
    add: {
      content: {
        type: 'area',
        label: 'Content',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {}
          }
        }
      }
    }
  }  
}