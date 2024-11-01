export default {

  init(self) {
    // A nunjucks filter to convert an object to an attribute value
    self.apos.template.addFilter({
      toAttributeValue: self.toAttributeValue
    });

    // Imitate a database
    self.counters = {};
  },

  components(self) {
    return {
      // This component is generating the rooot element used for mounting the counter
      // app. It also serializes the data to be used in the client-side app and
      // assigns it to the `data-` attributes of the root element.
      // The client side code then reads and deserializes this data and
      // sends it to the respective `APP.xxx` component via `props`.
      async counterApp(req, {
        framework, widget, page, options
      }) {
        // You might fetch some data from the DB here.
        return {
          framework,
          widget,
          page,
          options,
          counter: self.counters[widget._id] || 0
        };
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
