console.log('loading');

module.exports = {
  options: {
    forbiddenSlugs: [
      '/evil-page',
      'evil-piece'
    ]
  },
  handlers(self) {
    return {
      beforeSave: {
        checkForbiddenSlugs(req, doc) {
          console.log(doc.slug);
          if (self.options.forbiddenSlugs.includes(doc.slug)) {
            const e = self.apos.error('invalid', 'That slug is reserved.');
            e.path = 'slug';
            throw self.apos.error('invalid', {
              errors: [
                e
              ]
            });
          }
        }
      }
    }
  }
};
