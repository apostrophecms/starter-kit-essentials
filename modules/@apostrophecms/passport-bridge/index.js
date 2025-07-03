export default {
  options: {
    // optional
    create: {
      role: 'guest'
    },
    strategies: [
      {
        // You must npm install --save this module in your project first
        module: 'passport-google-oauth20',
        options: {
          // Options for passport-google-oauth20
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        // Ignore users whose email address does not match this domain
        // according to the identity provider
        emailDomain: 'apostrophecms.com',
        // Use the user's email address as their identity
        match: 'email',
        // Strategy-specific options that must be passed to the authenticate middleware.
        // See the documentation of the strategy module you are using
        authenticate: {
          // 'email' for the obvious, 'profile' for the displayName (for the create option)
          scope: [ 'email', 'profile' ]
        }
      }
    ]
  }
}