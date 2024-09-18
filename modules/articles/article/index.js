module.exports = {
  extend: '@apostrophecms/piece-type',
  fields: {
    add: {
      genre: {
        label: 'Genre',
        type: 'select',
        choices: 'getGenres()'
      },
      category: {
        label: 'Category',
        type: 'checkboxes',
        choices: 'getCategories()'
      }
    },
    group: {
      basics: {
        label: 'Basics',
        fields: [
          'title',
          'genre',
          'category'
        ]
      }
    }
  },
  methods() {
    return {
      async getGenres() {
        console.log('before getGenres');
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('getGenres');

        return [
          {
            label: 'Fantasy',
            value: 'fantasy'
          },
          {
            label: 'Science Fiction',
            value: 'science fiction'
          },
          {
            label: 'Horror',
            value: 'horror'
          },
          {
            label: 'Mystery',
            value: 'mystery'
          },
          {
            label: 'Thriller',
            value: 'thriller'
          },
          {
            label: 'Romance',
            value: 'romance'
          },
          {
            label: 'Western',
            value: 'western'
          },
          {
            label: 'Dystopian',
            value: 'dystopian'
          },
          {
            label: 'Historical',
            value: 'historical'
          },
          {
            label: 'Nonfiction',
            value: 'nonfiction'
          }
        ];
      },
      async getCategories() {
        console.log('before getCategories');
        await new Promise(resolve => setTimeout(resolve, 2500));
        console.log('getCategories');

        return [
          {
            label: 'News',
            value: 'news'
          },
          {
            label: 'Politics',
            value: 'politics'
          },
          {
            label: 'Sports',
            value: 'sports'
          },
          {
            label: 'Entertainment',
            value: 'entertainment'
          },
          {
            label: 'Technology',
            value: 'technology'
          },
          {
            label: 'Science',
            value: 'science'
          },
          {
            label: 'Health',
            value: 'health'
          },
          {
            label: 'Business',
            value: 'business'
          },
          {
            label: 'Opinion',
            value: 'opinion'
          }
        ];
      }
    };
  }
};
