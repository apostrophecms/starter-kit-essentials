// Part of the core.
module.exports = {
  methods(self) {
    return {
      // Public API. See `translation` module for more details.
      addTranslationProvider(provider) {
        self.apos.translation.addProvider(self, provider);
      }
    };
  }
};
