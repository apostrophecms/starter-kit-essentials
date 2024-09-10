module.exports = {
  extend: '@apostrophecms/widget-type',
  fields: {
    add: {
      title: {
        type: 'string',
        def: 'Cool Stuff'
      },
      address: {
        type: 'object',
        fields: {
          add: {
            street: {
              type: 'string',
              def: '1168 E Passyunk Ave'
            },
            city: {
              type: 'string',
              def: 'Philadelphia'
            },
            state: {
              type: 'string',
              def: 'Pennsylvania'
            }
          }
        }
      }
    }
  }
}