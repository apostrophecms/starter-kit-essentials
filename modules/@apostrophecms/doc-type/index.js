module.exports = {
  extendMethods(self) {
    return {
      async localize(_super, req, draft, toLocale, options = { update: false }) {
        const fromLocale = draft.aposLocale.split(':')[0];
        await self.emit('beforeLocalized', req, draft, {
          source: fromLocale,
          target: toLocale,
          options
        });

        const result = await _super(req, draft, toLocale, options);

        await self.emit('afterLocalized', req, draft, result, {
          source: fromLocale,
          target: toLocale,
          options
        });
      }
    };
  }
};
