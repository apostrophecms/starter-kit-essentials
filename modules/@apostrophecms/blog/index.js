export default {
  options: {
    label: 'Article',
    pluralLabel: 'Articles'
  },
  fields: {
    add: {
      main: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
            '@apostrophecms/image': {},
            '@apostrophecms/video': {}
          }
        }
      },
      _categories: {
        type: 'relationship',
        withType: 'category'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'publishedAt',
          'main',
          '_categories'
        ]
      }
    }
  },
  tasks(self) {
    return {
      generate: {
        usage: 'Invoke this task to generate sample docs of this type. Use the --total option to control how many are added to the database.\nYou can remove them all later with the --remove option.',
        async task(argv) {
          if (argv.remove) {
            return remove();
          } else {
            return generate();
          }
          async function generate() {
            const total = argv.total || 10;
            const req = self.apos.task.getReq();
            for (let i = 0; i < total; i++) {
              const piece = await self.generate(req, i);
              piece.aposSampleData = true;
              await self.insert(req, piece);
            }
          }
          async function remove() {
            return self.apos.doc.db.deleteMany({
              type: self.name,
              aposSampleData: true
            });
          }
        }
      }
    }
  },
  methods(self) {
    return {
      async generate(req, i) {
        const categories = await self.apos.category.find(req).toArray();
        const category = categories[Math.floor(Math.random() * categories.length)];
        const piece = {
          ...self.newInstance(),
          title: `Post ${i}`,
          _categories: [ category ],
          publishedAt: (new Date(
            Date.now() - 86400 * Math.random() * 365 * 3
          )).toISOString().substring(0, '2024-01-01'.length)
        };
        return piece;
      }
    }
  }
}

