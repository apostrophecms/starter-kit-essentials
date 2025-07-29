export default {
  options: {
    session: {
      // If this still says `undefined`, set a real secret!
      secret: undefined
    },
    apiKeys: {
      // Use your own key value. Ideally use a strong, randomly generated
      // key.
      'testkey': {
        // The user role associated with this key
        role: 'guest'
      }
    }
  }
};
