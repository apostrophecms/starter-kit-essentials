module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'article2',
    label: 'Article 2',
    pluralLabel: 'Articles 2',
    shortcut: 'G,Shift+A'
  },
  fields: {
    add: {
      blurb: {
        type: 'area',
        label: 'Blurb',
        help: 'A short summary.',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [ 'Bold', 'Italic' ]
            }
          }
        }
      },
      main: {
        label: 'Content',
        type: 'area',
        options: {
          widgets: require('../../lib/area.js')
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'blurb'
        ]
      },
      main: {
        label: 'Content',
        fields: [
          'main'
        ]
      }
    }
  },
  components(self) {
    return {
      async recent(req, data) {
        return {
          articles: await self.find(req)
            .limit(data.limit)
            .sort({ createdAt: -1 })
            .toArray()
        };
      }
    };
  }
};
