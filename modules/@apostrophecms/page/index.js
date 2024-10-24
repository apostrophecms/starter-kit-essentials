// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

module.exports = {
  options: {
    types: [
      {
        name: 'todoapp',
        label: 'React Page'
      },
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: 'article-page',
        label: 'Article Page'
      },
      {
        name: 'article2-page',
        label: 'Article 2 Page'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  }
};
