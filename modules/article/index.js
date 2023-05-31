module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      _topics: {
        withType: 'topic',
        type: 'relationship'
      }
    }
  }
};
