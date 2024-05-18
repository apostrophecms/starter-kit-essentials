module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Tabs'
  },
  fields: {
    add: {
      fieldOne: {
        type: 'string',
        label: 'Field One'
      },
      fieldTwo: {
        type: 'string',
        label: 'Field Two',
        required: true
      },
      fieldThree: {
        type: 'string',
        label: 'Field Three',
        min: 5
      },
      fieldFour: {
        type: 'string',
        label: 'Field Four'
      },
      fieldFive: {
        type: 'string',
        label: 'Field Five'
      },
      fieldSix: {
        type: 'string',
        label: 'Field Six'
      },
      fieldSeven: {
        type: 'string',
        label: 'Field Seven',
        required: true
      },
      fieldEight: {
        type: 'string',
        label: 'Field Eight'
      },
      fieldNine: {
        type: 'string',
        label: 'Field Nine',
        min: 5
      },
      fieldTen: {
        type: 'string',
        label: 'Field Ten'
      }
    },
    group: {
      one: {
        label: 'One',
        fields: [
          'fieldOne'
        ]
      },
      two: {
        label: 'Two',
        fields: [
          'fieldTwo'
        ]
      },
      three: {
        label: 'Three',
        fields: [
          'fieldThree'
        ]
      },
      four: {
        label: 'Four',
        fields: [
          'fieldFour'
        ]
      },
      five: {
        label: 'Five',
        fields: [
          'fieldFive'
        ]
      },
      six: {
        label: 'Six',
        fields: [
          'fieldSix'
        ]
      },
      seven: {
        label: 'Seven',
        fields: [
          'fieldSeven'
        ]
      },
      eight: {
        label: 'Eight',
        fields: [
          'fieldEight'
        ]
      },
      nine: {
        label: 'Nine',
        fields: [
          'fieldNine'
        ]
      },
      ten: {
        label: 'Ten',
        fields: [
          'fieldTen'
        ]
      }
    }
  }
};
