// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

export default {
  options: {
    cache: {
      page: {
        // In seconds (60 * 60 = 1 hour)
        maxAge: 3600
      }
    },
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      }
    ]
  }
};
