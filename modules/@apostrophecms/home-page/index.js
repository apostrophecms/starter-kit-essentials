module.exports = {
  options: {
    label: 'Home Page'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'styles',
                '|',
                'bold',
                'italic',
                'strike',
                'link',
                '|',
                'bulletList',
                'orderedList'
              ],
              styles: [
                {
                  tag: 'p',
                  label: 'Paragraph (P)'
                },
                {
                  tag: 'h3',
                  label: 'Heading 3 (H3)'
                },
                {
                  tag: 'h4',
                  label: 'Heading 4 (H4)'
                }
              ]
            },
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'main'
        ]
      }
    }
  },
  handlers(self) {
    return {
      // This will fail, that is expected, we are looking for the warning
      'apostrophe:modulesRegistered': {
        async getArticles() {
          console.log('=================> init article <=================');
          const req = self.apos.task.getReq();
          const articles = await self.apos.modules.article.find(req, {}).toArray();
          console.log('articles', require('util').inspect(articles, {
            colors: true,
            depth: 2
          }));
        }
      }
    };
  }
};
