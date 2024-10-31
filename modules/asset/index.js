module.exports = {
  options: {
    // To not clash with the `@apostrophecms/asset` alias. Used in
    // the nunjucks templates.
    alias: '@app'
  },
  init(self) {
    // Add the React Refresh runtime to the head of the page.
    self.apos.template.prepend({
      where: 'head',
      when: 'hmr',
      bundler: 'vite',
      component: 'asset:reactRefresh'
    });

    // A helper to convert an object to an attribute value
    self.apos.template.addFilter({
      toAttributeValue: self.toAttributeValue
    });

    // Imitate a database
    self.counters = {};

    // Add `action` because we need a route to count the number of clicks.
    self.enableBrowserData();
  },

  components(self) {
    return {
      reactRefresh(req, data) {
        return {};
      }
    };
  },

  helpers(self) {
    return {
      counters(widgetId) {
        return self.counters[widgetId] || 0;
      }
    };
  },

  methods(self) {
    return {
      toAttributeValue(obj) {
        if (typeof obj === 'undefined' || obj === null) {
          obj = '';
        }
        const json = JSON.stringify(obj);
        return self.apos.template.safe(
          self.apos.util.escapeHtml(json, { single: true })
        );
      }
    };
  },

  extendMethods(self) {
    return {
      getBrowserData(_super, req) {
        const data = _super(req);
        return {
          ...data,
          action: self.action
        };
      }
    };
  },

  apiRoutes(self) {
    return {
      post: {
        async count(req) {
          const {
            count, id, type
          } = req.body;
          if (!id) {
            throw self.apos.error('invalid', 'Missing widget ID', {
              invalid: [ 'id' ]
            });
          }
          // Test and showcase frontend error handling
          if (count % 9 === 0) {
            throw self.apos.error('invalid', 'I don\'t like numbers that divide by 9 so I\'m rejecting it!', {
              invalid: [ 'id' ]
            });
          }
          self.counters[id] = count;
          return {
            ok: true,
            count,
            type
          };
        }
      }
    };
  }
};
