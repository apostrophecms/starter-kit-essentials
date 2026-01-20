// This configures the @apostrophecms/page module to add a "home" page type to the
// pages menu

export default {
  options: {
    guestApiAccess: true,
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
